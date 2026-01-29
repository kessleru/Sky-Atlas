import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel } from '../ui/field';

type Props = {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Field className="w-[220px]">
      <FieldLabel>Localização</FieldLabel>
      <Select value={location} onValueChange={(value) => setLocation(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma cidade" />
        </SelectTrigger>
        <SelectContent className="z-[1001] max-h-[300px]">
          {location === 'custom' && (
            <SelectItem value="custom" className="hidden">
              -
            </SelectItem>
          )}
          {locations.map((city) => (
            <SelectItem key={city.value} value={city.value}>
              {city.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
const locations = [
  { value: 'ituiutaba', label: 'Ituiutaba, MG' },
  { value: 'sao-paulo', label: 'São Paulo, SP' },
  { value: 'rio-de-janeiro', label: 'Rio de Janeiro, RJ' },
  { value: 'belo-horizonte', label: 'Belo Horizonte, MG' },
  { value: 'salvador', label: 'Salvador, BA' },
  { value: 'curitiba', label: 'Curitiba, PR' },
  { value: 'brasilia', label: 'Brasília, DF' },
  { value: 'fortaleza', label: 'Fortaleza, CE' },
  { value: 'new-york', label: 'Nova York, EUA' },
  { value: 'paris', label: 'Paris, França' },
  { value: 'london', label: 'Londres, Reino Unido' },
  { value: 'tokyo', label: 'Tóquio, Japão' },
  { value: 'dubai', label: 'Dubai, EAU' },
  { value: 'roma', label: 'Roma, Itália' },
  { value: 'lisboa', label: 'Lisboa, Portugal' },
];
