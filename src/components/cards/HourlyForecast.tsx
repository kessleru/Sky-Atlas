import React, { useRef, useState } from 'react';
import Card from './Card';
import { getWeather } from '../../api';
import { useQuery } from '@tanstack/react-query';

export default function HourlyForecast() {
  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 0, lon: 0 }),
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
    <Card title="Previsão horária">
      <div
        ref={containerRef}
        className={`flex gap-6 overflow-x-auto select-none  ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
        onWheel={(e) => {
          e.preventDefault();
          e.currentTarget.scrollLeft += e.deltaY;
        }}
      >
        {data?.hourly.map((hour, index) => (
          <div key={index} className="flex flex-col items-center mb-4">
            <p>
              {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <img
              draggable={false}
              className="size-8 pointer-events-none"
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt="weather icon"
            />
            <p>{Math.round(hour.temp)}°C</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
