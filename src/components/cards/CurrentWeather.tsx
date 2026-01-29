import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';
import Card from './Card';
import type { Coords } from '../../types';

type props = {
  coords: Coords
};

export default function CurrentWeather({ coords }: props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card title="Tempo Atual" childrenClassName="p-6">
      {/* Header: Temperatura e Condição Principal */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            className="size-24 drop-shadow-lg filter"
            src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}@4x.png`}
            alt="weather icon"
          />
        </div>
        <div className="text-center">
          <h2 className="text-7xl font-bold tracking-tighter text-foreground">
            {Math.round(data?.current.temp)}°C
          </h2>
          <h3 className="capitalize text-lg font-medium text-muted-foreground mt-1">
            {data?.current.weather[0].description}
          </h3>
        </div>
      </div>

      {/* Horário Local com Badge */}
      <div className="flex flex-col items-center bg-muted/50 rounded-2xl py-3 px-6 mb-8 border border-border">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
          Horário Local
        </p>
        <h3 className="text-3xl font-semibold text-foreground">
          {new Intl.DateTimeFormat('pt-br', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: data?.timezone,
          }).format(new Date(data!.current.dt * 1000))}
        </h3>
      </div>

      {/* Grid de Detalhes Adicionais */}
      <div className="grid grid-cols-2 border-t border-border mt-6">
        {/* Sensação - Row 1, Col 1 */}
        <div className="flex flex-col items-center text-center py-6 border-b border-border">
          <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-tight">
            Sensação
          </span>
          <p className="text-lg font-bold text-foreground">
            {Math.round(data?.current.feels_like)}°C
          </p>
        </div>

        {/* Umidade - Row 1, Col 2 */}
        <div className="flex flex-col items-center text-center py-6 border-l border-b border-border">
          <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-tight">
            Umidade
          </span>
          <p className="text-lg font-bold text-blue-500">
            {Math.round(data?.current.humidity)}%
          </p>
        </div>

        {/* Vento - Row 2, Col 1 */}
        <div className="flex flex-col items-center text-center py-6">
          <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-tight">
            Vento
          </span>
          <p className="text-lg font-bold text-foreground">
            {Math.round(data?.current.wind_speed * 3.6)}{' '}
            <small className="text-[10px] font-normal">km/h</small>
          </p>
        </div>

        {/* Chuva - Row 2, Col 2 */}
        <div className="flex flex-col items-center text-center py-6 border-l border-border">
          <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-tight">
            Chuva
          </span>
          <p className="text-lg font-bold text-cyan-500">
            {Math.round((data?.hourly[0].pop || 0) * 100)}%
          </p>
        </div>
      </div>
    </Card>
  );
}
