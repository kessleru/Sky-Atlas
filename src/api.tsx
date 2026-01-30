import { AirPollutionSchema } from './schemas/airPollutionSchema';
import { GeocodeSchema } from './schemas/geocodeSchema';
import { OneCallSchema } from './schemas/weatherSchema';

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(
    `/api/weather?lat=${lat}&lon=${lon}`
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Weather API error: ${res.statusText}`);
  }

  const data = await res.json();
  return OneCallSchema.parse(data);
}

export async function getGeocode(location: string) {
  const res = await fetch(
    `/api/geocode?q=${location}`
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Geocode API error: ${res.statusText}`);
  }

  const data = await res.json();
  return GeocodeSchema.parse(data);
}

export async function getAirPollution({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(
    `/api/pollution?lat=${lat}&lon=${lon}`
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Air Pollution API error: ${res.statusText}`);
  }

  const data = await res.json();
  return AirPollutionSchema.parse(data);
}
