import Card from './Card';
import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';

const rows = [
  { label: 'Nascer do sol', value: 'sunrise' },
  { label: 'Pôr do sol', value: 'sunset' },
  { label: 'Chuva (1h)', value: 'rain' },
  { label: 'Índice UV', value: 'uvi' },
  { label: 'Direção do vento', value: 'wind_deg' },
  { label: 'Pressão atmosférica', value: 'pressure' },
  { label: 'Visibilidade', value: 'visibility' },
  { label: 'Ponto de orvalho', value: 'dew_point' },
  { label: 'Nebulosidade', value: 'clouds' },
] as const;

export default function AdditionalInfo() {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: -18.9743, lon: -49.4621 }),
  });

  return (
    <Card title="Informações Adicionais" childrenClassName="p-4">
      <div className="flex flex-col">
        {rows.map(({ label, value }) => (
          <div 
            key={value}
            className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 px-2 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {label}
            </span>
            <span className="text-sm font-medium">
              <FormatValue value={value} data={data} />
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FormatValue({ value, data }: { value: string; data: any }) {
  const current = data?.current;
  const val = current[value];


  if (value === 'rain') {
    return `${current?.rain?.['1h'] || 0} mm`;
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
    case 'visibility':
      return val >= 1000 ? `${(val / 1000).toFixed(1)} km` : `${val} m`;
    case 'dew_point':
      return `${Math.round(val)}°C`;
    case 'clouds':
      return `${val}%`;
    case 'uvi':
      return val.toFixed(1);
    default:
      return val;
  }
}
