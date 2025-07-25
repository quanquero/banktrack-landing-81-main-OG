
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBanksForCountry } from "@/utils/transferData";

interface BankSelectProps {
  value: string;
  onChange: (bankId: string) => void;
  label: string;
  countryId: string;
  placeholder?: string;
  className?: string;
}

const BankSelect = ({ 
  value, 
  onChange, 
  label, 
  countryId, 
  placeholder = "Select a bank",
  className = ""
}: BankSelectProps) => {
  const availableBanks = countryId ? getBanksForCountry(countryId) : [];

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={`bank-select-${label.toLowerCase().replace(/\s+/g, "-")}`}>
        {label}
      </Label>
      <Select 
        value={value || ""} 
        onValueChange={onChange} 
        disabled={!countryId || availableBanks.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={countryId ? placeholder : "Select a country first"} />
        </SelectTrigger>
        <SelectContent>
          {availableBanks.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              {countryId ? "No banks available for selected country" : "Please select a country first"}
            </p>
          ) : (
            availableBanks.map(bank => (
              <SelectItem 
                key={bank.id} 
                value={bank.id}
                className="cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-secondary rounded-full">
                    <span className="text-sm font-semibold">{bank.name.charAt(0)}</span>
                  </div>
                  <span>{bank.name}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BankSelect;
