
import { useState } from "react";
import { TransferFormState, initialFormState } from "@/types/transfer";

export const useTransferForm = () => {
  const [formState, setFormState] = useState<TransferFormState>(initialFormState);
  const [isChecked, setIsChecked] = useState(false);

  const handleReset = () => {
    setFormState(initialFormState);
    setIsChecked(false);
  };
  
  const isFormValid = Boolean(formState.fromCountry && formState.toCountry);

  return {
    formState,
    setFormState,
    isChecked,
    setIsChecked,
    isFormValid,
    handleReset
  };
};
