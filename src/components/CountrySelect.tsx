import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { countries } from '@/data/countries';

interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CountrySelect = ({ value, onValueChange }: CountrySelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-14 bg-card border-input-border text-muted-foreground data-[state=open]:border-accent">
        <SelectValue placeholder="Select Country" />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <span className="flex items-center gap-2">
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
