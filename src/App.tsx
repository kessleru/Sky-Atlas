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
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" attribute="class">
      {/* Main content area */}
      <div className="flex flex-col gap-6 p-4 lg:p-6 lg:mr-(--sidebar-width)">
        {/* Header com dropdowns */}
        <div className="flex flex-wrap gap-4 items-end">
          <LocationDropdown location={location} setLocation={setLocation} />
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          <ModeToggle />
        </div>

        {/* Map - ocupa toda largura */}
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />

        {/* Grid de cards responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
          {/* Current Weather - esquerda */}
          <div className="md:col-span-1 xl:col-span-3">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>

          {/* Centro: Hourly + Additional */}
          <div className="md:col-span-1 xl:col-span-5 flex flex-col gap-6">
            <Suspense fallback={<HourlyForecastSkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>

          {/* Daily Forecast - direita */}
          <div className="md:col-span-2 xl:col-span-4">
            <Suspense fallback={<DailyForecastSkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <SidePanel coords={coords} />
    </ThemeProvider>
  );
}

export default App;
