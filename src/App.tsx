import { useQuery } from '@tanstack/react-query';
import { getWeather } from './api';
import Card from './components/cards/Card';
import DailyForecast from './components/cards/DailyForecast';

function App() {
  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 0, lon: 0 }),
  });

  return (
  <div className='flex flex-col gap-8'>
  {/* <Card title='Current weather'>{JSON.stringify(data?.current)}</Card>
  <Card title='Hourly forecast (48 hours)'>{JSON.stringify(data?.hourly)}</Card> */}
  <DailyForecast />
  </div>
);
}

export default App;
