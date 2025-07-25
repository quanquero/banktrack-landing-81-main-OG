
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CountrySelect from "@/components/ui/CountrySelect";
import { TransferFormState } from "@/types/transfer";

interface SimpleTransferFormProps {
  formState: TransferFormState;
  amount: string;
  setAmount: (amount: string) => void;
  onChange: (updates: Partial<TransferFormState>) => void;
}

const SimpleTransferForm = ({ 
  formState, 
  amount, 
  setAmount, 
  onChange 
}: SimpleTransferFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CountrySelect
          label="Sending from country"
          value={formState.fromCountry}
          onChange={(value) => onChange({ fromCountry: value })}
        />
        
        <CountrySelect
          label="Sending to country"
          value={formState.toCountry}
          onChange={(value) => onChange({ toCountry: value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount to transfer</Label>
        <Input 
          id="amount" 
          type="number" 
          placeholder="Enter amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SimpleTransferForm;
