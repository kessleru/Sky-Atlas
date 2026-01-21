import Card from './Card';
import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function DailyForecast() {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 0, lon: 0 }),
  });

  return (
    <div>
      <Card title="Previsão diária" childrenClassName="flex flex-col gap-4">
        <div className="grid grid-cols-5 p-2 rounded-xl bg-zinc-800 text-center items-center font-medium">
          <p className="text-left pl-4">Dia</p>
          <p>Condição</p>
          <p>Média</p>
          <p>Máx</p>
          <p>Min</p>
        </div>

        {data?.daily.map((day, index) => (
          <div
            key={index}
            className="grid grid-cols-5 mx-2 items-center text-center"
          >
            <p className="text-left pl-4 capitalize">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: 'short',
              })}
            </p>

            <div className="flex justify-center">
              <img
                className="size-10"
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="weather icon"
              />
            </div>

            <p>{Math.round(day.temp.day)}°C</p>
            <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
            <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
