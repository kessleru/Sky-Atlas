import React from 'react';
import Card from './Card';
import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {};

export default function DailyForecast({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 0, lon: 0 }),
  });

  return (
    <div>
      <Card title="Previsão diária" childrenClassName="flex flex-col gap-4">
        {data?.daily.map((day, index) => (
          <div key={index} className="flex justify-between">
            <p className='w-9'>{new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short'})}</p>
            <img
              className="size-8"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="weather icon"
            />
            <p>{Math.round(day.temp.day)}°C</p>
            <p className='text-gray-500/75'>{Math.round(day.temp.min)}°C</p>
            <p className='text-gray-500/75'>{Math.round(day.temp.max)}°C</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
