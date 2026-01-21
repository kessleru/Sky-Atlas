import { OneCallSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({lat, lon}: {lat: number; lon: number}) {
  const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&lang=pt_br&appid=${API_KEY}`);
  const data = await res.json();
  return OneCallSchema.parse(data);
}