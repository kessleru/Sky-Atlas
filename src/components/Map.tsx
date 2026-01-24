import { MapContainer } from 'react-leaflet/MapContainer';
import { Marker } from 'react-leaflet/Marker';
import { TileLayer } from 'react-leaflet/TileLayer';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet/hooks';
import type { Coords } from '../types';

type Props = {
  coords: Coords
  onMapClick: (lat: number, lon: number) => void
};

export default function Map({ coords, onMapClick }: Props) {
  return (
    <MapContainer
      center={[coords.lat, coords.lon]}
      zoom={12}
      style={{ width: '700px', height: '700px' }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lon]} />
    </MapContainer>
  );
}

function MapClick({ onMapClick }: { onMapClick: (lat: number, lon: number) => void }) {
  const map = useMap();
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
    onMapClick(lat, lng);
  });

  return null;
}
