import DailyForecast from './components/cards/DailyForecast';
import HourlyForecast from './components/cards/HourlyForecast';
import CurrentWeather from './components/cards/CurrentWeather';
import AdditionalInfo from './components/cards/AdditionalInfo';
import Map from './components/map/Map';
import { Suspense, useState } from 'react';
import type { Coords } from './types';
import LocationDropdown from './components/dropdowns/LocationDropdown';
import { getGeocode } from './api';
import { useQuery } from '@tanstack/react-query';
import MapTypeDropdown from './components/dropdowns/MapTypeDropdown';
import CurrentSkeleton from './components/skeletons/CurrentSkeleton';
import HourlyForecastSkeleton from './components/skeletons/HourlySkeleton';
import AdditionalInfoSkeleton from './components/skeletons/AdditionalSkeleton';
import DailyForecastSkeleton from './components/skeletons/DailySkeleton';
import SidePanel from './components/side-panel/SidePanel';

function App() {
  const [coordinates, setCoords] = useState<Coords>({
    lat: -18.9743,
    lon: -49.4621,
  });
  const [location, setLocation] = useState<string>('ituiutaba');
  const [mapType, setMapType] = useState<string>('clouds_new');

  const { data: geocodeData } = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation('custom');
  };

  const coords =
    location === 'custom'
      ? coordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <LocationDropdown location={location} setLocation={setLocation} />
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>
        <Suspense fallback={<HourlyForecastSkeleton />}>
          <HourlyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<DailyForecastSkeleton />}>
          <DailyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionalInfo coords={coords} />
        </Suspense>
      </div>
      <SidePanel coords={coords}/>
    </>
  );
}

export default App;
