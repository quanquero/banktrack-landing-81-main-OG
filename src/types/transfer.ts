
import { TransferRule, TransferStatistic } from "@/utils/transferData";
import { ProcessedTransferData } from "@/services/googleSheetsApi";

export interface TransferFormState {
  fromCountry: string;
  toCountry: string;
  fromBank: string;
  toBank: string;
  transferMethod: string;
  transferType: string;
}

export const initialFormState: TransferFormState = {
  fromCountry: "",
  toCountry: "",
  fromBank: "",
  toBank: "",
  transferMethod: "",
  transferType: "",
};

// Updated ReliabilityData interface to include reliability property
export interface ReliabilityData {
  days: string[];
  values: number[];
  dates?: string[];
  reliability: number;
}

// Augment the TransferRule from utils/transferData.ts to include statistics
declare module "@/utils/transferData" {
  interface TransferRule {
    statistics?: TransferStatistic;
  }
}
