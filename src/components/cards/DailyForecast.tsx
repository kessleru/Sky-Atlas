import Card from './Card';
import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function DailyForecast() {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: -18.9743, lon: -49.4621 }),
  });

  return (
    <Card title="Previsão diária" childrenClassName="p-0">
      <div className="p-4">
        {/* Header da Tabela (Discreto e Semântico) */}
        <div className="grid grid-cols-5 mb-2 px-2 text-xs uppercase tracking-wider font-bold text-slate-400">
          <p className="text-left pl-2">Dia</p>
          <p className="text-center">Clima</p>
          <p className="text-center">Méd</p>
          <p className="text-center">Máx</p>
          <p className="text-center">Min</p>
        </div>

        <div className="flex flex-col">
          {data?.daily.map((day, index) => (
            <div
              key={index}
              className={`
              group grid grid-cols-5 items-center py-3 px-2 rounded-lg transition-all duration-200 border-b border-slate-100 last:border-0
              
              /* Estados Padrão */
              text-slate-600 dark:text-slate-300 dark:border-slate-800
              
              /* Estados de Hover (Alto Contraste) */
              hover:bg-slate-200 hover:text-slate-900 
              dark:hover:bg-slate-700 dark:hover:text-slate-100
            `}
            >
              {/* Dia da Semana */}
              <p className="text-left pl-2 font-semibold capitalize">
                {index === 0
                  ? 'Hoje'
                  : new Date(day.dt * 1000).toLocaleDateString(undefined, {
                      weekday: 'short',
                    })}
              </p>

              {/* Ícone */}
              <div className="flex justify-center">
                <img
                  className="size-10 drop-shadow-sm transition-transform"
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </div>

              {/* Temperatura Média */}
              <p className="text-center font-medium">
                {Math.round(day.temp.day)}°
              </p>

              {/* Máxima (Destaque visual sutil) */}
              <p className="text-center font-bold text-slate-800 dark:text-slate-500">
                {Math.round(day.temp.max)}°
              </p>

              {/* Mínima (Visual mais leve) */}
              <p className="text-center font-medium text-slate-400 dark:text-slate-500">
                {Math.round(day.temp.min)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
