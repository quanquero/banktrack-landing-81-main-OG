
import { Check, AlertCircle } from "lucide-react";

interface GoogleSheetsStatusProps {
  isUsingSheets: boolean;
  isLoadingSheets?: boolean;
}

const GoogleSheetsStatus = ({ isUsingSheets, isLoadingSheets = false }: GoogleSheetsStatusProps) => {
  if (isLoadingSheets) {
    return (
      <div className="mb-4 p-2 bg-blue-50 text-blue-800 rounded-md text-sm flex items-center">
        <div className="animate-spin h-4 w-4 mr-2 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        Loading AI-powered transfer data...
      </div>
    );
  }
  
  if (!isUsingSheets) {
    return (
      <div className="mb-4 p-2 bg-amber-50 text-amber-800 rounded-md text-sm flex items-center">
        <AlertCircle className="h-4 w-4 mr-2" />
        AI-powered transfer data unavailable
      </div>
    );
  }
  
  return (
    <div className="mb-4 p-2 bg-green-50 text-green-800 rounded-md text-sm flex items-center">
      <Check className="h-4 w-4 mr-2" />
      AI-powered transfer data successfully loaded
    </div>
  );
};

export default GoogleSheetsStatus;
