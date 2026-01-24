import React, { useRef, useState } from 'react';
import Card from './Card';
import { getWeather } from '../../api';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { Coords } from '../../types';


type props = {
  coords: Coords
};

export default function HourlyForecast({ coords }: props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // velocidade
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  }

  function onMouseUpOrLeave() {
    setIsDragging(false);
  }

  return (
    <Card title="Previsão horária" childrenClassName="p-0">
      <div
        ref={containerRef}
        className={`
        flex gap-4 overflow-x-auto px-6 py-6 select-none
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] 
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
      `}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
      >
        {data?.hourly.map((hour, index) => {
          const isCurrent = index === 0;

          return (
            <div
              key={index}
              className={`
              group shrink-0 flex flex-col items-center justify-between
              min-w-20 p-4 rounded-full border transition-all duration-200
              
              ${
                isCurrent
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105'
                  : `
                   bg-slate-50 border-slate-200 text-slate-500
                   dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400
                   
                   /* HOVER STATES - Foco em contraste */
                   hover:bg-slate-200 hover:border-slate-300 hover:text-slate-900
                   dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:hover:text-slate-100
                    hover:shadow-md
                  `
              }
            `}
            >
              {/* Hora */}
              <p
                className={`text-xs font-semibold ${isCurrent ? 'text-blue-100' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}
              >
                {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>

              {/* Ícone */}
              <img
                draggable={false}
                className="size-10 my-2 drop-shadow-sm transition-transform group-hover:scale-110"
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
              />

              {/* Temperatura */}
              <p className="text-lg font-bold">{Math.round(hour.temp)}°</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
