import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';
import Card from './Card';

export default function CurrentWeather() {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 0, lon: 0 }),
  });

  return (
    <Card title="Tempo Atual" childrenClassName="p-6">
      {/* Header: Temperatura e Condição Principal */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            className="size-24 drop-shadow-md"
            src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}@4x.png`}
            alt="weather icon"
          />
        </div>
        <div className="text-center">
          <h2 className="text-7xl font-bold tracking-tighter text-slate-900 dark:text-white">
            {Math.round(data?.current.temp)}°C
          </h2>
          <h3 className="capitalize text-lg font-medium text-slate-500 mt-1">
            {data?.current.weather[0].description}
          </h3>
        </div>
      </div>

      {/* Horário Local com Badge */}
      <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-3 px-6 mb-8 border border-slate-100 dark:border-slate-700">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          Horário Local
        </p>
        <h3 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">
          {new Intl.DateTimeFormat('pt-br', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: data?.timezone,
          }).format(new Date(data!.current.dt * 1000))}
        </h3>
      </div>

      {/* Grid de Detalhes Adicionais */}
      <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Sensação
          </span>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
            {Math.round(data?.current.feels_like)}°C
          </p>
        </div>

        <div className="flex flex-col items-center text-center border-x border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Umidade
          </span>
          <p className="text-lg font-bold text-blue-500">
            {Math.round(data?.current.humidity)}%
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Vento
          </span>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
            {Math.round(data?.current.wind_speed)}{' '}
            <small className="text-[10px]">m/s</small>
          </p>
        </div>
      </div>
    </Card>
  );
}
