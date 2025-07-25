
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, AlertTriangle, Building, MapPin, Zap, ChevronDown, ChevronUp, DollarSign } from "lucide-react";
import { TransferRule } from "@/utils/transferData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { banks, countries, transferMethods, transferTypes } from "@/utils/transferData";
import TransferStatistics from "./TransferStatistics";

interface TransferResultProps {
  transferRule: TransferRule;
  isLoading?: boolean;
  isRecommended?: boolean;
  amount?: string;
}

// Extend the TransferRule type to include commission
declare module "@/utils/transferData" {
  interface TransferRule {
    commission?: string;
  }
}

const TransferResult = ({ transferRule, isLoading = false, isRecommended = false, amount = "" }: TransferResultProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    if (transferRule || isLoading) {
      setShowAnimation(true);
    }
  }, [transferRule, isLoading]);

  // Get country and bank information
  const getCountryName = (countryId?: string) => {
    if (!countryId) return "Unknown";
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : "Unknown";
  };

  const getBankName = (bankId?: string, customBankName?: string) => {
    // First try to use the custom bank name if provided
    if (customBankName) return customBankName;
    
    // Then try to find the bank by ID in our predefined banks array
    if (bankId) {
      const bank = banks.find(b => b.id === bankId);
      return bank ? bank.name : "";
    }
    
    return "";
  };

  const getMethodName = (methodId?: string) => {
    if (!methodId) return "";
    const method = transferMethods.find(m => m.id === methodId);
    return method ? method.name : "";
  };

  const getTypeName = (typeId?: string) => {
    if (!typeId) return "";
    const type = transferTypes.find(t => t.id === typeId);
    return type ? type.name : "";
  };

  // Determine if a transfer supports instant pay
  const supportsInstantPay = (transferRule?: TransferRule): boolean => {
    if (!transferRule || !transferRule.available) return false;
    
    // Check processing time contains "same day" or <= 1 day
    const processingTime = transferRule.processingTime.toLowerCase();
    const isFast = processingTime.includes("same day") || 
                   processingTime.includes("instant") ||
                   (processingTime.includes("1") && processingTime.includes("day")) ||
                   processingTime.includes("hour");
    
    return isFast;
  };

  // Get background gradient based on transfer method
  const getMethodGradient = (methodId?: string): string => {
    if (!methodId) return "bg-gradient-to-r from-blue-500/20 to-purple-500/20";
    
    // Assign different gradients based on method type
    switch(methodId) {
      case "swift":
        return "bg-gradient-to-r from-blue-400/20 to-blue-600/20";
      case "sepa":
        return "bg-gradient-to-r from-green-400/20 to-emerald-600/20";
      case "wise":
        return "bg-gradient-to-r from-teal-400/20 to-cyan-600/20";
      case "paypal":
        return "bg-gradient-to-r from-blue-400/20 to-indigo-600/20";
      case "crypto":
        return "bg-gradient-to-r from-amber-400/20 to-orange-600/20";
      default:
        return "bg-gradient-to-r from-violet-400/20 to-purple-600/20";
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full border-primary/20 overflow-hidden animate-pulse">
        <CardHeader className="pb-2 space-y-0">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Checking availability...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="h-6 bg-muted rounded animate-pulse w-1/2"></div>
            <div className="h-6 bg-muted rounded animate-pulse w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!transferRule) {
    return null;
  }

  // Bank and country info
  const fromCountry = getCountryName(transferRule.fromCountryId);
  const toCountry = getCountryName(transferRule.toCountryId);
  
  // Use custom bank names if available
  const fromBank = getBankName(transferRule.fromBankId, transferRule.fromBankName) || "Any Bank";
  const toBank = getBankName(transferRule.toBankId, transferRule.toBankName) || "Any Bank";
  
  const method = getMethodName(transferRule.methodId);
  const type = getTypeName(transferRule.typeId);
  
  // Check if this transfer supports instant pay
  const isInstantPay = supportsInstantPay(transferRule);

  // Use fee data for commission if available
  const commission = transferRule.commission || transferRule.fee || "";
  
  // Get method-specific gradient
  const methodGradient = getMethodGradient(transferRule.methodId);

  return (
    <Card className={`w-full border-primary/20 overflow-hidden rounded-xl shadow-md ${showAnimation ? 'animate-fade-in' : ''} ${methodGradient}`}>
      <CardHeader className="pb-2 space-y-0 bg-white/80 backdrop-blur-sm">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">{fromBank} to {toBank}</span>
            {method && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                {method}
              </Badge>
            )}
            {type && (
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                {type}
              </Badge>
            )}
          </div>
          {transferRule.available ? (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              Available
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
              <XCircle className="h-3.5 w-3.5" />
              Unavailable
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Enhanced Transfer Visualization with Larger Bank Icons */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {/* From Bank - Larger logo and better styling */}
            <div className="flex flex-col items-start space-y-2 w-1/3">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground">{fromBank}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{fromCountry}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Line - Enhanced animation */}
            <div className="flex-1 relative mx-4">
              {transferRule.available ? (
                <>
                  {/* Available Transfer Animation with improved visuals */}
                  <div className="relative h-2.5 w-full rounded-full overflow-hidden">
                    {/* Base gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 opacity-60"></div>
                    
                    {/* Animated flowing particles */}
                    <div 
                      className="absolute inset-0 w-[200%]"
                      style={{ 
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
                        animation: "flow-particles 1.8s linear infinite",
                        backgroundSize: "200% 100%"
                      }}
                    ></div>
                    
                    {/* Glowing effect */}
                    <div className="absolute inset-0 rounded-full animate-pulse-subtle"></div>
                  </div>
                  
                  {/* Money transfer animation */}
                  <div className="absolute inset-y-0 w-full flex items-center justify-center">
                    <div className="relative">
                      <div className={`h-5 w-5 absolute left-0 rounded-full bg-white shadow-md flex items-center justify-center
                        ${isInstantPay ? 'animate-transfer-fast' : 'animate-transfer'}`}
                        style={{ 
                          boxShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(59,130,246,0.6)"
                        }}
                      >
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Instant Pay Badge */}
                  {isInstantPay && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
                      <Badge variant="outline" className="bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0 shadow-md animate-pulse-subtle">
                        <Zap className="h-3 w-3 mr-1" />
                        Instant Pay
                      </Badge>
                    </div>
                  )}
                </>
              ) : (
                /* Unavailable Transfer Line */
                <div className="h-0.5 w-full bg-red-300 rounded-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 bg-white rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* To Bank - Larger logo and better styling */}
            <div className="flex flex-col items-end space-y-2 w-1/3">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-base font-bold text-foreground text-right">{toBank}</p>
                  <div className="flex items-center justify-end text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{toCountry}</span>
                  </div>
                </div>
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                  <Building className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Details - Enhanced with better visuals */}
        <div className="space-y-5 bg-white/70 backdrop-blur-sm rounded-lg p-4">
          {transferRule.available ? (
            <>
              {/* Key Benefits/Features */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Processing Time</p>
                    <p className="font-semibold">{transferRule.processingTime}</p>
                  </div>
                </div>
                
                {(transferRule.minAmount || transferRule.maxAmount) && (
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Amount Limits</p>
                      <p className="font-semibold">
                        {transferRule.minAmount ? `Min: ${transferRule.minAmount}` : ''} 
                        {transferRule.minAmount && transferRule.maxAmount ? ' / ' : ''}
                        {transferRule.maxAmount ? `Max: ${transferRule.maxAmount}` : ''}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Information Section (Limitations and Commission) */}
              {(transferRule.limitations || commission) && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Limitations Section */}
                    {transferRule.limitations && (
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Limitations:</p>
                          <p className="text-xs text-foreground font-medium bg-amber-50 dark:bg-amber-950/30 p-2 rounded-md mt-1 border border-amber-200 dark:border-amber-800/50">
                            {transferRule.limitations}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Commission Section */}
                    {commission && (
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Commission:</p>
                          <p className="text-xs text-foreground font-medium bg-green-50 dark:bg-green-950/30 p-2 rounded-md mt-1 border border-green-200 dark:border-green-800/50">
                            {commission}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Statistics Toggle Button */}
              {transferRule.statistics && (
                <button
                  onClick={() => setShowStatistics(!showStatistics)}
                  className="w-full mt-4 pt-4 border-t border-border flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>Transfer Statistics</span>
                  {showStatistics ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              )}

              {/* Expandable Statistics */}
              {showStatistics && transferRule.statistics && (
                <div className="pt-2 transition-all duration-300 ease-in-out">
                  <TransferStatistics statistics={transferRule.statistics} />
                </div>
              )}
            </>
          ) : (
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Transfer not available</p>
                <p className="text-sm text-muted-foreground">{transferRule.limitations || "This transfer method is currently not available between the selected countries."}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransferResult;
