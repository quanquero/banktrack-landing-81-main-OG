
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { countries, Country } from "@/utils/transferData";

interface CountrySelectProps {
  value: string;
  onChange: (countryId: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
}

const CountrySelect = ({ 
  value, 
  onChange, 
  label, 
  placeholder = "Select a country",
  className = ""
}: CountrySelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

  useEffect(() => {
    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm]);

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={`country-select-${label.toLowerCase().replace(/\s+/g, "-")}`}>
        {label}
      </Label>
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <div className="p-2 mb-2 sticky top-0 bg-background z-10 backdrop-blur-sm">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No countries found</p>
            ) : (
              filteredCountries.map(country => (
                <SelectItem 
                  key={country.id} 
                  value={country.id}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </SelectItem>
              ))
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;
