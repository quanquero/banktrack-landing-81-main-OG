
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CountrySelect from "@/components/ui/CountrySelect";
import BankSelect from "@/components/ui/BankSelect";
import { TransferFormState } from "@/types/transfer";
import { transferMethods, transferTypes } from "@/utils/transferData";

interface TransferSelectionFormProps {
  formState: TransferFormState;
  onChange: (updates: Partial<TransferFormState>) => void;
}

const TransferSelectionForm = ({ formState, onChange }: TransferSelectionFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CountrySelect
            label="Sending from country"
            value={formState.fromCountry}
            onChange={(value) => onChange({ fromCountry: value })}
          />
          
          <BankSelect
            label="Sending from bank"
            value={formState.fromBank}
            countryId={formState.fromCountry}
            onChange={(value) => onChange({ fromBank: value })}
          />
        </div>
        
        <div className="space-y-6">
          <CountrySelect
            label="Sending to country"
            value={formState.toCountry}
            onChange={(value) => onChange({ toCountry: value })}
          />
          
          <BankSelect
            label="Sending to bank"
            value={formState.toBank}
            countryId={formState.toCountry}
            onChange={(value) => onChange({ toBank: value })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="transfer-type">Transfer Type</Label>
          <Select
            value={formState.transferType}
            onValueChange={(value) => onChange({ transferType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transfer type" />
            </SelectTrigger>
            <SelectContent>
              {transferTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transfer-method">Transfer Method</Label>
          <Select
            value={formState.transferMethod}
            onValueChange={(value) => onChange({ transferMethod: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transfer method" />
            </SelectTrigger>
            <SelectContent>
              {transferMethods.map(method => (
                <SelectItem key={method.id} value={method.id}>
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TransferSelectionForm;
