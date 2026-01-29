import Card from './Card';
import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { Coords } from '../../types';

type props = {
  coords: Coords
};

export default function DailyForecast({ coords }: props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card title="Previsão diária" childrenClassName="p-0">
      <div className="p-4">
        {/* Header da Tabela (Discreto e Semântico) */}
        <div className="grid grid-cols-5 mb-2 px-2 text-xs uppercase tracking-wider font-bold text-muted-foreground">
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
              group grid grid-cols-5 items-center py-3 px-2 transition-all duration-0 border-b border-border last:border-0
              
              /* Estados Padrão */
              text-muted-foreground // Default text color
              
              /* Estados de Hover (Alto Contraste) */
              hover:bg-accent hover:rounded-lg hover:text-accent-foreground
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
                  className="size-10 drop-shadow-md transition-transform"
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </div>

              {/* Temperatura Média */}
              <p className="text-center font-medium">
                {Math.round(day.temp.day)}°
              </p>

              {/* Máxima (Destaque visual sutil) */}
              <p className="text-center font-bold text-foreground">
                {Math.round(day.temp.max)}°
              </p>

              {/* Mínima (Visual mais leve) */}
              <p className="text-center font-medium text-muted-foreground">
                {Math.round(day.temp.min)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
