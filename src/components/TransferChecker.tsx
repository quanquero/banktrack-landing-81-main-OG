import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransferResult from "@/components/ui/TransferResult";
import SimpleTransferForm from "@/components/transfer/SimpleTransferForm";
import TransferSelectionForm from "@/components/transfer/TransferSelectionForm";
import TransferFormActions from "@/components/transfer/TransferFormActions";
import { useToast } from "@/hooks/use-toast";
import { useTransferData } from "@/hooks/useTransferData";
import { FilterX, ChevronRight } from "lucide-react";
import { TransferFormState } from "@/types/transfer";

function TransferChecker() {
  const [formTab, setFormTab] = useState("simple");
  const [sortOption, setSortOption] = useState("recommended");
  const [showResults, setShowResults] = useState(false);
  const [selectedFromBank, setSelectedFromBank] = useState("any-bank");
  const [selectedToBank, setSelectedToBank] = useState("any-bank");
  const [isFilteringByBankPair, setIsFilteringByBankPair] = useState(false);
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  
  const {
    formState,
    setFormState,
    isLoading,
    error,
    isFormValid,
    handleCheck,
    handleReset,
    fromBankOptions,
    toBankOptions,
    filteredTransfers
  } = useTransferData();
  
  const resetBankPairs = () => {
    setSelectedFromBank("any-bank");
    setSelectedToBank("any-bank");
    setIsFilteringByBankPair(false);
  };
  
  useEffect(() => {
    resetBankPairs();
  }, [formState.fromCountry, formState.toCountry]);
  
  const handleFormSubmit = () => {
    if (!formState.fromCountry || !formState.toCountry) {
      toast({
        title: "Missing Information",
        description: "Please select both countries before checking transfers.",
        variant: "destructive"
      });
      return;
    }
    
    handleCheck();
    setShowResults(true);
  };
  
  const applyBankPairFilter = () => {
    if (selectedFromBank === "any-bank" && selectedToBank === "any-bank") {
      setIsFilteringByBankPair(false);
      toast({
        title: "Filter Cleared",
        description: "Showing all available transfer options."
      });
    } else {
      setIsFilteringByBankPair(true);
      toast({
        title: "Filter Applied",
        description: `Showing transfers ${selectedFromBank !== "any-bank" ? `from ${selectedFromBank}` : 'from any bank'} ${selectedToBank !== "any-bank" ? `to ${selectedToBank}` : 'to any bank'}.`
      });
    }
  };
  
  const getFilteredAndSortedTransfers = () => {
    if (!filteredTransfers) return [];
    
    let results = [...filteredTransfers];
    
    if (isFilteringByBankPair) {
      results = results.filter(transfer => {
        const fromBankMatch = selectedFromBank === "any-bank" || transfer.fromBankName === selectedFromBank;
        const toBankMatch = selectedToBank === "any-bank" || transfer.toBankName === selectedToBank;
        return fromBankMatch && toBankMatch;
      });
    }
    
    if (!isFilteringByBankPair) {
      switch (sortOption) {
        case "fastest":
          results.sort((a, b) => {
            const getTimeValue = (time) => {
              if (time.includes("Instant")) return 0;
              if (time.includes("1")) return 1;
              if (time.includes("2")) return 2;
              return parseInt(time.match(/\d+/) || [5]);
            };
            return getTimeValue(a.processingTime) - getTimeValue(b.processingTime);
          });
          break;
        case "cheapest":
          results.sort((a, b) => {
            const getFeeValue = (fee) => {
              if (fee === "N/A" || fee === "$0") return 0;
              if (fee.includes("$0-")) return 5;
              return parseInt(fee.match(/\d+/) || [50]);
            };
            return getFeeValue(a.fee) - getFeeValue(b.fee);
          });
          break;
        case "reliable":
          results.sort((a, b) => parseFloat(b.successRate) - parseFloat(a.successRate));
          break;
        case "recommended":
        default:
          results.sort((a, b) => {
            const aScore = parseFloat(a.successRate) * 0.5 + 
                         (a.processingTime.includes("Instant") ? 30 : 0) +
                         (a.fee === "$0" ? 20 : 0);
            const bScore = parseFloat(b.successRate) * 0.5 + 
                         (b.processingTime.includes("Instant") ? 30 : 0) +
                         (b.fee === "$0" ? 20 : 0);
            return bScore - aScore;
          });
      }
    }
    
    return results;
  };
  
  const sortedTransfers = getFilteredAndSortedTransfers();
  
  const handleFormStateChange = (updates: Partial<TransferFormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };
  
  return (
    <div className="w-full">
      {!showResults ? (
        <div className="space-y-6">
          <Tabs value={formTab} onValueChange={setFormTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="simple">Simple</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simple" className="space-y-4">
              <SimpleTransferForm 
                formState={formState}
                amount={amount}
                setAmount={setAmount}
                onChange={handleFormStateChange}
              />
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              <TransferSelectionForm 
                formState={formState}
                onChange={handleFormStateChange}
              />
            </TabsContent>
          </Tabs>
          
          <TransferFormActions 
            isFormValid={isFormValid}
            isLoading={isLoading}
            onCheck={handleFormSubmit}
            onReset={handleReset}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <div>
              <h3 className="text-xl font-semibold mb-1">Transfer Options</h3>
              <p className="text-muted-foreground text-sm">
                From {formState.fromCountry} to {formState.toCountry}
                {formState.transferMethod !== "any" && ` via ${formState.transferMethod}`}
                {formState.transferType !== "any" && ` (${formState.transferType})`}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowResults(false)}
                className="w-full sm:w-auto"
              >
                Edit Search
              </Button>
              
              <Select
                value={sortOption}
                onValueChange={setSortOption}
                disabled={isFilteringByBankPair}
              >
                <SelectTrigger className={`w-full sm:w-[180px] ${isFilteringByBankPair ? 'opacity-60' : ''}`}>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="fastest">Fastest</SelectItem>
                  <SelectItem value="cheapest">Cheapest</SelectItem>
                  <SelectItem value="reliable">Most Reliable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 p-3 border rounded-lg bg-slate-50">
            <h4 className="text-sm font-medium my-1">Filter by Banks:</h4>
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <Select 
                  value={selectedFromBank} 
                  onValueChange={setSelectedFromBank}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="From Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-bank">Any Bank</SelectItem>
                    {fromBankOptions.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-center">
                <ChevronRight className="hidden sm:block text-muted-foreground h-4 w-4" />
              </div>
              
              <div className="flex-1">
                <Select 
                  value={selectedToBank} 
                  onValueChange={setSelectedToBank}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="To Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-bank">Any Bank</SelectItem>
                    {toBankOptions.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  onClick={applyBankPairFilter} 
                  size="sm" 
                  variant={isFilteringByBankPair ? "default" : "outline"}
                  className="flex-1 sm:flex-none"
                >
                  Apply Filter
                </Button>
                
                {isFilteringByBankPair && (
                  <Button 
                    onClick={resetBankPairs} 
                    size="sm" 
                    variant="outline"
                    className="p-2 h-9 w-9"
                  >
                    <FilterX className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {isFilteringByBankPair && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="filter-pulse bg-blue-50 border-blue-200 text-blue-700 px-3 py-1">
                Filtering by bank pair
              </Badge>
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-8">Loading transfer options...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : sortedTransfers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg font-medium mb-2">No transfer options found</p>
              <p className="text-muted-foreground">Try changing your search criteria or bank filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedTransfers.map((transfer, index) => (
                <TransferResult 
                  key={index}
                  transferRule={transfer}
                  isRecommended={sortOption === "recommended" && index === 0 && !isFilteringByBankPair}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { TransferChecker };
