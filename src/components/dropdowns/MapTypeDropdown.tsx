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
  mapType: string;
  setMapType: React.Dispatch<React.SetStateAction<string>>;
};

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Field className="w-[220px]">
      <FieldLabel>Tipo de Mapa</FieldLabel>
      <Select value={mapType} onValueChange={(value) => setMapType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um tipo de mapa" />
        </SelectTrigger>
        <SelectContent className="z-[1001] max-h-[300px]">
          {types.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

const types = [
  { value: 'clouds_new', label: 'Nuvens' },
  { value: 'precipitation_new', label: 'Precipitação' },
  { value: 'pressure_new', label: 'Pressão' },
  { value: 'wind_new', label: 'Vento' },
  { value: 'temp_new', label: 'Temperatura' },
];
