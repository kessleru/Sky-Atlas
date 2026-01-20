import { useQuery } from '@tanstack/react-query';
import { getWeather } from './api';
import Card from './components/cards/card';

function App() {
  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 0, lon: 0 }),
  });

  return (
  <div className='flex flex-col gap-8'>
  <Card title='Current weather'>{JSON.stringify(data?.current).slice(0, 100)}</Card>
  <Card title='Hourly forecast (48 hours)'>{JSON.stringify(data?.hourly).slice(0, 100)}</Card>
  <Card title='Daily forecast'>{JSON.stringify(data?.daily).slice(0, 100)}</Card>
  </div>
);
}

export default App;
