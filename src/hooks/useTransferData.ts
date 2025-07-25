
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchTransferDataFromGoogleSheets, 
  ProcessedTransferData 
} from "@/services/googleSheetsApi";
import {
  checkTransferAvailability,
  getTransferStatistics,
  TransferRule,
  TransferStatistic,
  banks,
  transferMethods,
  transferTypes,
  countries
} from "@/utils/transferData";
import { useTransferForm } from "./useTransferForm";
import { 
  findTransferDataFromSheets, 
  convertSheetsDataToTransferRule,
  convertSheetsDataToTransferStatistic
} from "@/utils/googleSheetsAdapter";
import { TransferFormState, ReliabilityData } from "@/types/transfer";

export const useTransferData = () => {
  const { toast } = useToast();
  const {
    formState,
    setFormState,
    isChecked,
    setIsChecked,
    isFormValid,
    handleReset
  } = useTransferForm();
  
  const [result, setResult] = useState<TransferRule | undefined>(undefined);
  const [statistics, setStatistics] = useState<TransferStatistic | undefined>(undefined);
  const [allTransferOptions, setAllTransferOptions] = useState<TransferRule[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<TransferRule[]>([]);
  const [fromBankOptions, setFromBankOptions] = useState<string[]>([]);
  const [toBankOptions, setToBankOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sheetsData, setSheetsData] = useState<ProcessedTransferData[]>([]);
  const [isUsingSheets, setIsUsingSheets] = useState(false);
  const [isLoadingSheets, setIsLoadingSheets] = useState(true);
  const [dataSource, setDataSource] = useState<"sheets" | "none">("none");

  useEffect(() => {
    const loadSheetsData = async () => {
      setIsLoadingSheets(true);
      try {
        console.log("Fetching data from Google Sheets...");
        const data = await fetchTransferDataFromGoogleSheets();
        if (data && data.length > 0) {
          console.log(`Successfully loaded ${data.length} rows from Google Sheets`);
          setSheetsData(data);
          setIsUsingSheets(true);
          
          // Logging data for debugging
          console.log("Sample sheets data:", data.slice(0, 2));
        } else {
          console.warn("No data fetched from Google Sheets");
          setIsUsingSheets(false);
        }
      } catch (error) {
        console.error("Error loading data from Google Sheets:", error);
        toast({
          title: "Error loading data",
          description: "Could not load data from Google Sheets.",
          variant: "destructive",
        });
        setIsUsingSheets(false);
      } finally {
        setIsLoadingSheets(false);
      }
    };
    
    loadSheetsData();
  }, [toast]);

  // Update bank options whenever transfer data changes
  useEffect(() => {
    if (allTransferOptions.length > 0) {
      // Extract unique bank names
      const fromBanks = Array.from(new Set(
        allTransferOptions
          .map(option => option.fromBankName)
          .filter(bank => bank && bank.trim() !== "")
      ));
      
      const toBanks = Array.from(new Set(
        allTransferOptions
          .map(option => option.toBankName)
          .filter(bank => bank && bank.trim() !== "")
      ));
      
      setFromBankOptions(fromBanks as string[]);
      setToBankOptions(toBanks as string[]);
      setFilteredTransfers(allTransferOptions);
    } else {
      setFromBankOptions([]);
      setToBankOptions([]);
      setFilteredTransfers([]);
    }
  }, [allTransferOptions]);

  const handleCheck = () => {
    if (!formState.fromCountry || !formState.toCountry) {
      toast({
        title: "Please fill the form",
        description: "Please select both countries",
        variant: "destructive",
      });
      return;
    }
    
    setResult(undefined);
    setStatistics(undefined);
    setAllTransferOptions([]);
    setDataSource("none");
    setError(null);
    
    setIsLoading(true);
    setIsChecked(true);
    
    // Get country names for logging
    const fromCountryName = countries.find(c => c.id === formState.fromCountry)?.name || "";
    const toCountryName = countries.find(c => c.id === formState.toCountry)?.name || "";
    
    console.log(`Checking transfers between ${fromCountryName} and ${toCountryName}:`, formState);
    
    setTimeout(() => {
      try {
        const options: TransferRule[] = [];
        
        // Only use Google Sheets data, no fallback to hardcoded data
        if (isUsingSheets && sheetsData.length > 0) {
          console.log("Checking Google Sheets data for transfer options...");
          
          // Filter data by matching countries - use more flexible matching
          const matchingData = sheetsData.filter(data => {
            const fromCountry = countries.find(c => c.id === formState.fromCountry);
            const toCountry = countries.find(c => c.id === formState.toCountry);
            
            if (!fromCountry || !toCountry) return false;
            
            // Case-insensitive matching with flexible comparison
            const fromMatches = matchCountryName(data.fromCountry, fromCountry.name, fromCountry.code);
            const toMatches = matchCountryName(data.toCountry, toCountry.name, toCountry.code);
            
            return fromMatches && toMatches;
          });
          
          console.log(`Found ${matchingData.length} matching country entries in Google Sheets`);
          
          if (matchingData.length > 0) {
            console.log("Using data exclusively from Google Sheets:", matchingData);
            setDataSource("sheets");
            
            // Convert Google Sheets data to TransferRule
            matchingData.forEach(data => {
              const rule = convertSheetsDataToTransferRule(data, formState);
              const stats = convertSheetsDataToTransferStatistic(data, formState);
              
              // Make sure to create a valid transfer rule even if available is not explicitly set
              if (rule) {
                if (stats) {
                  rule.statistics = stats;
                }
                // Set fee as commission if not already set
                if (data.fee && !rule.commission) {
                  rule.commission = data.fee;
                }
                options.push(rule);
                console.log("Added transfer option from Google Sheets:", {
                  fromBank: rule.fromBankName || "Any Bank",
                  toBank: rule.toBankName || "Any Bank",
                  available: rule.available,
                  fee: rule.fee,
                  commission: rule.commission
                });
              }
            });
          } else {
            console.log("No matching data found in Google Sheets for the selected countries");
            
            // Try a more aggressive search - match either from or to country
            const partialMatches = sheetsData.filter(data => {
              const fromCountry = countries.find(c => c.id === formState.fromCountry);
              const toCountry = countries.find(c => c.id === formState.toCountry);
              
              if (!fromCountry || !toCountry) return false;
              
              // Find matches where at least one country matches
              const fromMatches = matchCountryName(data.fromCountry, fromCountry.name, fromCountry.code);
              const toMatches = matchCountryName(data.toCountry, toCountry.name, toCountry.code);
              
              return fromMatches || toMatches;
            });
            
            if (partialMatches.length > 0) {
              console.log("Found partial country matches:", partialMatches);
              setDataSource("sheets");
              
              // Convert these partial matches
              partialMatches.forEach(data => {
                const rule = convertSheetsDataToTransferRule(data, formState);
                const stats = convertSheetsDataToTransferStatistic(data, formState);
                
                if (rule) {
                  if (stats) {
                    rule.statistics = stats;
                  }
                  // Set fee as commission if not already set
                  if (data.fee && !rule.commission) {
                    rule.commission = data.fee;
                  }
                  options.push(rule);
                }
              });
              
              // If we found matches, show them but with a warning
              if (options.length > 0) {
                toast({
                  title: "Approximate matches found",
                  description: "Showing similar transfer routes as exact match was not found.",
                  variant: "default",
                });
              }
            } else {
              setError("No transfer data found between the selected countries.");
              toast({
                title: "No data available",
                description: "No transfer data found between the selected countries in Google Sheets.",
                variant: "destructive",
              });
            }
          }
        } else {
          console.log("Google Sheets data not available");
          
          if (isLoadingSheets) {
            toast({
              title: "Loading data",
              description: "Please wait while we load data from Google Sheets.",
              variant: "default",
            });
          } else {
            setError("Could not load data from Google Sheets.");
            toast({
              title: "Data source unavailable",
              description: "Could not load data from Google Sheets.",
              variant: "destructive",
            });
          }
        }
        
        console.log(`Found ${options.length} available transfer options from Google Sheets`);
        
        // Sort options by reliability if available
        options.sort((a, b) => {
          if (a.statistics?.reliabilityData && b.statistics?.reliabilityData) {
            // Make sure we have the reliability property
            const aData = a.statistics.reliabilityData as ReliabilityData;
            const bData = b.statistics.reliabilityData as ReliabilityData;
            
            const reliabilityA = aData.reliability !== undefined ? 
              aData.reliability : calculateAverageReliability(aData.values);
              
            const reliabilityB = bData.reliability !== undefined ? 
              bData.reliability : calculateAverageReliability(bData.values);
              
            return reliabilityB - reliabilityA;
          }
          return 0;
        });
        
        if (options.length > 0) {
          setResult(options[0]);
          setStatistics(options[0].statistics);
          setAllTransferOptions(options);
          
          toast({
            title: `Found ${options.length} transfer options`,
            description: `We found ${options.length} ways to transfer money between the selected countries using Google Sheets data.`,
            variant: "default",
          });
        } else {
          setError("No transfer options available between these countries.");
          toast({
            title: "Transfers unavailable",
            description: "We couldn't find any available transfer options between these countries in Google Sheets.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error checking transfer:", error);
        setError("Error processing your request. Please try again.");
        toast({
          title: "Error checking transfer",
          description: "There was a problem processing your request. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  // Function for more flexible country matching
  const matchCountryName = (dataCountry: string | undefined, countryName: string, countryCode: string | undefined): boolean => {
    if (!dataCountry) return false;
    
    const normalizedData = dataCountry.trim().toUpperCase();
    const normalizedName = countryName.trim().toUpperCase();
    const normalizedCode = countryCode ? countryCode.trim().toUpperCase() : '';
    
    // Check direct match with name or code
    if (normalizedData === normalizedName || normalizedData === normalizedCode) {
      return true;
    }
    
    // Check if dataCountry contains country name or code
    if (normalizedData.includes(normalizedName) || (normalizedCode && normalizedData.includes(normalizedCode))) {
      return true;
    }
    
    // Dictionary of common country name abbreviations and variants
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
    
    // Check for country name variants
    for (const [key, variants] of Object.entries(countryVariants)) {
      if (normalizedName === key || variants.includes(normalizedName)) {
        if (variants.some(v => normalizedData.includes(v)) || normalizedData.includes(key)) {
          return true;
        }
      }
    }
    
    // For aggressive matching, check first 3-4 letters
    if (normalizedName.length >= 4 && normalizedData.includes(normalizedName.substring(0, 4))) {
      return true;
    }
    
    return false;
  };

  // Helper function to calculate average reliability
  const calculateAverageReliability = (values: number[] = []): number => {
    if (!values || values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Number((sum / values.length).toFixed(1));
  };

  return {
    formState,
    setFormState,
    result,
    statistics,
    allTransferOptions,
    filteredTransfers,
    fromBankOptions,
    toBankOptions,
    isLoading,
    error,
    isChecked,
    isUsingSheets,
    isLoadingSheets,
    dataSource,
    isFormValid,
    handleCheck,
    handleReset
  };
};
