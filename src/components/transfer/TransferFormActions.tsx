
import { Button } from "@/components/ui/button";
import { RefreshCw, Search } from "lucide-react";

interface TransferFormActionsProps {
  isFormValid: boolean;
  isLoading: boolean;
  onCheck: () => void;
  onReset: () => void;
}

const TransferFormActions = ({ 
  isFormValid, 
  isLoading, 
  onCheck, 
  onReset 
}: TransferFormActionsProps) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <Button
        variant="outline"
        onClick={onReset}
        disabled={isLoading}
        className="text-muted-foreground"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Reset
      </Button>
      
      <Button
        onClick={onCheck}
        disabled={!isFormValid || isLoading}
        className="bg-bank-blue hover:bg-bank-navy text-white"
      >
        {isLoading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Check Transfer
          </>
        )}
      </Button>
    </div>
  );
};

export default TransferFormActions;
