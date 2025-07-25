import { ProcessedTransferData } from "@/services/googleSheetsApi";
import { TransferFormState } from "@/types/transfer";
import { 
  countries, 
  banks, 
  transferMethods, 
  transferTypes,
  TransferRule,
  TransferStatistic
} from "@/utils/transferData";

export const findTransferDataFromSheets = (
  formState: TransferFormState,
  sheetsData: ProcessedTransferData[],
  isUsingSheets: boolean
): ProcessedTransferData | undefined => {
  if (!isUsingSheets || !sheetsData || sheetsData.length === 0) {
    console.log("No sheets data available or not using sheets");
    return undefined;
  }
  
  // Get country codes and method/type names from IDs
  const fromCountry = countries.find(c => c.id === formState.fromCountry);
  const toCountry = countries.find(c => c.id === formState.toCountry);

  if (!fromCountry || !toCountry) {
    console.log("Cannot find country data for selected IDs:", formState.fromCountry, formState.toCountry);
    return undefined;
  }

  const fromCountryCode = fromCountry.code || "";
  const toCountryCode = toCountry.code || "";
  const fromCountryName = fromCountry.name || "";
  const toCountryName = toCountry.name || "";
  
  const method = transferMethods.find(m => m.id === formState.transferMethod)?.name || "";
  const type = transferTypes.find(t => t.id === formState.transferType)?.name || "";
  
  // Get bank names from IDs
  let fromBankName = "";
  let toBankName = "";
  
  if (formState.fromBank) {
    const bank = banks.find(b => b.id === formState.fromBank);
    if (bank) fromBankName = bank.name;
  }
  
  if (formState.toBank) {
    const bank = banks.find(b => b.id === formState.toBank);
    if (bank) toBankName = bank.name;
  }
  
  console.log("Searching for data:", { 
    fromCountry: fromCountryCode, 
    fromCountryName,
    toCountry: toCountryCode, 
    toCountryName,
    fromBankName, 
    toBankName, 
    method, 
    type,
    sheetsDataLength: sheetsData.length
  });
  
  // Function to check for more flexible country matching
  const matchesCountry = (dataCountry: string | undefined, countryName: string, countryCode: string | undefined): boolean => {
    if (!dataCountry) return false;
    
    const normalizedData = dataCountry.trim().toUpperCase();
    const normalizedName = countryName.trim().toUpperCase();
    const normalizedCode = countryCode ? countryCode.trim().toUpperCase() : '';
    
    // Проверяем прямое совпадение с именем или кодом
    if (normalizedData === normalizedName || normalizedData === normalizedCode) {
      return true;
    }
    
    // Проверяем, содержит ли dataCountry имя или код страны
    if (normalizedData.includes(normalizedName) || (normalizedCode && normalizedData.includes(normalizedCode))) {
      return true;
    }
    
    // Словарь общих сокращений и вариантов названий стран
    const countryVariants: Record<string, string[]> = {
      'UNITED STATES': ['USA', 'US', 'СОЕДИНЕННЫЕ ШТАТЫ', 'США', 'АМЕРИКА'],
      'UNITED KINGDOM': ['UK', 'GB', 'ВЕЛИКОБРИТАНИЯ', 'АНГЛИЯ', 'СОЕДИНЕННОЕ КОРОЛЕВСТВО'],
      'RUSSIA': ['RU', 'РФ', 'РОССИЙСКАЯ ФЕДЕРАЦИЯ', 'РОССИЯ'],
      'GERMANY': ['DE', 'ГЕРМАНИЯ', 'ФРГ', 'НЕМЕЦКИЙ'],
      'FRANCE': ['FR', 'ФРАНЦИЯ', 'ФРАНЦУЗСКИЙ'],
      'CHINA': ['CN', 'КИТАЙ', 'КНР', 'КИТАЙСКИЙ'],
      'JAPAN': ['JP', 'ЯПОНИЯ', 'ЯПОНСКИЙ'],
      'INDIA': ['IN', 'ИНДИЯ', 'ИНДИЙСКИЙ'],
      'BRAZIL': ['BR', 'БРАЗИЛИЯ', 'БРАЗИЛЬСКИЙ'],
      'CANADA': ['CA', 'КАНАДА', 'КАНАДСКИЙ'],
      'AUSTRALIA': ['AU', 'АВСТРАЛИЯ', 'АВСТРАЛИЙСКИЙ'],
      'SOUTH KOREA': ['KR', 'КОРЕЯ', 'ЮЖНАЯ КОРЕЯ', 'КОРЕЙСКИЙ'],
      'SINGAPORE': ['SG', 'СИНГАПУР'],
      'UNITED ARAB EMIRATES': ['AE', 'UAE', 'ОАЭ', 'ЭМИРАТЫ', 'АРАБСКИЕ ЭМИРАТЫ'],
      'SPAIN': ['ES', 'ИСПАНИЯ', 'ИСПАНСКИЙ'],
      'ITALY': ['IT', 'ИТАЛИЯ', 'ИТАЛЬЯНСКИЙ']
    };
    
    // Проверяем варианты названий
    for (const [key, variants] of Object.entries(countryVariants)) {
      if (normalizedName === key || variants.includes(normalizedName)) {
        if (variants.some(v => normalizedData.includes(v)) || normalizedData.includes(key)) {
          return true;
        }
      }
    }
    
    // Для очень агрессивного сопоставления можно проверить первые 3-4 буквы
    if (normalizedName.length >= 4 && normalizedData.includes(normalizedName.substring(0, 4))) {
      return true;
    }
    
    return false;
  };
  
  const matchesMethod = (dataMethod: string | undefined, methodName: string) => {
    if (!dataMethod || !methodName) return false;
    
    const normalizedData = dataMethod.trim().toUpperCase();
    const normalizedMethod = methodName.trim().toUpperCase();
    
    // Direct match by name
    if (normalizedData === normalizedMethod) return true;
    
    // Additional check for transfer types
    if (normalizedMethod === "PERSONAL" && 
        (normalizedData.includes("PERSONAL") || normalizedData.includes("ЛИЧНЫЙ"))) {
      return true;
    }
    
    if (normalizedMethod === "BUSINESS" && 
        (normalizedData.includes("BUSINESS") || normalizedData.includes("БИЗНЕС") || 
         normalizedData.includes("CORPORATE") || normalizedData.includes("КОРПОРАТИВ"))) {
      return true;
    }
    
    if (normalizedMethod === "SWIFT" && normalizedData.includes("SWIFT")) {
      return true;
    }
    
    // More flexible matching for general terms
    if (normalizedMethod === "LOCAL" && 
        (normalizedData.includes("LOCAL") || normalizedData.includes("DOMESTIC"))) {
      return true;
    }
    
    if (normalizedMethod === "INTERNATIONAL" && 
        normalizedData.includes("INTERNATIONAL")) {
      return true;
    }
    
    return false;
  };
  
  const matchesBank = (dataBank: string | undefined, bankName: string) => {
    if (!dataBank || !bankName) return !dataBank && !bankName;
    
    const normalizedData = dataBank.trim().toUpperCase();
    const normalizedBank = bankName.trim().toUpperCase();
    
    return normalizedData === normalizedBank || 
           normalizedData.includes(normalizedBank) || 
           normalizedBank.includes(normalizedData);
  };

  // Log first few entries to help debug
  console.log("First few rows from sheets data:", 
    sheetsData.slice(0, 3).map(d => ({
      fromCountry: d.fromCountry,
      toCountry: d.toCountry,
      method: d.method,
      transferType: d.transferType
    }))
  );
  
  // Try to find match by countries only first (most important)
  const countriesOnlyMatch = sheetsData.find(data => 
    matchesCountry(data.fromCountry, fromCountryName, fromCountryCode) &&
    matchesCountry(data.toCountry, toCountryName, toCountryCode)
  );
  
  // Log if we found a match just by countries
  if (countriesOnlyMatch) {
    console.log("Found match by countries only:", countriesOnlyMatch);
    
    // Now try to find a more specific match with method and type
    if (method && type) {
      const methodTypeMatch = sheetsData.find(data => 
        matchesCountry(data.fromCountry, fromCountryName, fromCountryCode) &&
        matchesCountry(data.toCountry, toCountryName, toCountryCode) &&
        (matchesMethod(data.method, method) || !method) &&
        (matchesMethod(data.transferType, type) || !type)
      );
      
      if (methodTypeMatch) {
        console.log("Found more specific match with method and type:", methodTypeMatch);
        
        // Finally, try to find the most specific match with banks
        if (fromBankName && toBankName) {
          const exactMatch = sheetsData.find(data => 
            matchesCountry(data.fromCountry, fromCountryName, fromCountryCode) &&
            matchesCountry(data.toCountry, toCountryName, toCountryCode) &&
            (matchesMethod(data.method, method) || !method) &&
            (matchesMethod(data.transferType, type) || !type) &&
            (matchesBank(data.fromBank, fromBankName) || !fromBankName) &&
            (matchesBank(data.toBank, toBankName) || !toBankName)
          );
          
          if (exactMatch) {
            console.log("Found exact match with banks:", exactMatch);
            return exactMatch;
          }
        }
        
        return methodTypeMatch;
      }
    }
    
    return countriesOnlyMatch;
  }
  
  // No match found
  console.log("No matching transfer data found in Google Sheets");
  return undefined;
};

export const convertSheetsDataToTransferRule = (
  data: ProcessedTransferData, 
  formState: TransferFormState
): TransferRule => {
  
  // We will not try to map to existing banks, instead use exactly what's in the sheets
  console.log("Converting to TransferRule:", {
    fromCountryId: formState.fromCountry,
    toCountryId: formState.toCountry,
    available: data.available,
    fromBank: data.fromBank,
    toBank: data.toBank,
    fee: data.fee,
    processingTime: data.processingTime,
    reliabilityData: data.reliabilityData ? 'present' : 'absent'
  });
  
  return {
    fromCountryId: formState.fromCountry,
    toCountryId: formState.toCountry,
    // Don't try to map to bankId, just use the names directly
    fromBankId: undefined,
    toBankId: undefined,
    // Use original bank names from Google Sheets
    fromBankName: data.fromBank,
    toBankName: data.toBank,
    methodId: formState.transferMethod,
    typeId: formState.transferType,
    available: data.available,
    fee: data.fee,
    processingTime: data.processingTime || "1-3 business days",
    limitations: data.limitations,
    commission: data.fee, // Set commission equal to fee for display
    reliabilityData: data.reliabilityData
  };
};

export const convertSheetsDataToTransferStatistic = (
  data: ProcessedTransferData, 
  formState: TransferFormState
): TransferStatistic | undefined => {
  if (!data.successRate && !data.totalTransactions && !data.averageTime && !data.reliabilityData) {
    console.log("No statistics available in sheet data");
    return undefined; // No statistics data
  }
  
  console.log("Converting to TransferStatistic:", {
    fromCountryId: formState.fromCountry,
    toCountryId: formState.toCountry,
    successRate: data.successRate,
    totalTransactions: data.totalTransactions,
    reliabilityData: data.reliabilityData ? 'present' : 'absent'
  });
  
  // Create a properly structured reliabilityData object without the reliability property
  const reliabilityData = data.reliabilityData ? {
    days: data.reliabilityData.days || [],
    values: data.reliabilityData.values || [],
    dates: data.reliabilityData.dates || []
  } : undefined;
  
  return {
    fromCountryId: formState.fromCountry,
    toCountryId: formState.toCountry,
    fromBankId: undefined, // Don't use bank IDs anymore
    toBankId: undefined,
    methodId: formState.transferMethod,
    typeId: formState.transferType,
    successRate: data.successRate || 95.0,
    averageTime: data.averageTime || "1-3 business days",
    totalTransactions: data.totalTransactions || 1000,
    averageAmount: data.averageAmount || "N/A",
    lastMonthGrowth: data.lastMonthGrowth || 0,
    popularDays: data.popularDays || ["Monday", "Friday"], 
    reliabilityData: reliabilityData,
    notes: data.limitations // Use limitations as notes for additional information display
  };
};

// Utility function to calculate average reliability
function calculateAverageReliability(values: number[] = []): number {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Number((sum / values.length).toFixed(1));
}
