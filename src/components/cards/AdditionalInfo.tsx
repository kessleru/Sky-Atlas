import Card from './Card';
import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';
import Sunrise from '../../assets/icons/sunrise.svg?react';
import Sunset from '../../assets/icons/sunset.svg?react';
import Rain from '../../assets/icons/rain.svg?react';
import Uv from '../../assets/icons/uv-index.svg?react';
import Wind from '../../assets/icons/wind.svg?react';
import Pressure from '../../assets/icons/pressure.svg?react';
import DewPoint from '../../assets/icons/dew.svg?react';
import Clouds from '../../assets/icons/clouds.svg?react';
import type { Coords } from '../../types';

interface WeatherRow {
  label: string;
  value: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  shouldRotate?: boolean;
}

const rows: WeatherRow[] = [
  { label: 'Nascer do sol', value: 'sunrise', Icon: Sunrise },
  { label: 'Pôr do sol', value: 'sunset', Icon: Sunset },
  { label: 'Chuva (1h)', value: 'rain', Icon: Rain },
  { label: 'Índice UV', value: 'uvi', Icon: Uv },
  { label: 'Direção do vento', value: 'wind_deg', Icon: Wind, shouldRotate: true },
  { label: 'Pressão atmosférica', value: 'pressure', Icon: Pressure },
  { label: 'Ponto de orvalho', value: 'dew_point', Icon: DewPoint },
  { label: 'Nebulosidade', value: 'clouds', Icon: Clouds },
] as const;

type props = {
  coords: Coords
};

export default function AdditionalInfo({ coords }: props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  const current = data?.current;

  return (
    <Card title="Informações Adicionais" childrenClassName="p-4">
      <div className="flex flex-col">
        {/* Linhas de Informação */}
        {rows.map(({ label, value, Icon, shouldRotate }) => {
          const rotationValue = shouldRotate ? (current as any)?.[value] : 0;

          return (
            <div
              key={value}
              className="flex justify-between items-center py-3 border-b border-border last:border-0 hover:bg-accent/50 px-2 hover:rounded-lg transition-all duration-0"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
              {/* Valor e Ícone */}
              <span className="text-sm font-medium flex items-center gap-2 text-foreground">
                <Icon
                  className="size-4 transition-transform duration-500"
                  style={shouldRotate ? { transform: `rotate(${rotationValue}deg)` } : {}}
                />
                <FormatValue value={value} data={data} />
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function FormatValue({ value, data }: { value: string; data: any }) {
  const current = data?.current;
  const val = current?.[value];

  if (value === 'rain') {
    const rainAmount = current?.rain?.['1h'] ?? 0;
    return `${rainAmount} mm`;
  }


  if (val === undefined || val === null) return '--';

  if (value === 'sunrise' || value === 'sunset') {
    return new Date(val * 1000).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }


  switch (value) {
    case 'wind_deg':
      return `${val}°`;
    case 'pressure':
      return `${val} hPa`;
    case 'dew_point':
      return `${Math.round(val)}°C`;
    case 'clouds':
      return `${val}%`;
    case 'uvi':
      return val.toFixed(1);
    default:
      return String(val);
  }
}
