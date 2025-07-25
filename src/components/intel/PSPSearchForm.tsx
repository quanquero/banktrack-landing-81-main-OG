import { useState } from "react";
import { Search, Filter, Building2, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface PSPSearchFormProps {
  onSearch: (searchParams: any) => void;
  isLoading: boolean;
  selectedCountries: string[];
  setSelectedCountries: (codes: string[]) => void;
}

const PSPSearchForm = ({ onSearch, isLoading, selectedCountries, setSelectedCountries }: PSPSearchFormProps) => {
  const [searchParams, setSearchParams] = useState({
    jurisdiction: "",
    licenseType: "",
    service: "",
    paymentMethod: "",
    status: ""
  });

  const jurisdictions = [
    { value: "uk", label: "United Kingdom" },
    { value: "lt", label: "Lithuania" },
    { value: "sg", label: "Singapore" },
    { value: "cy", label: "Cyprus" }
  ];

  const licenseTypes = [
    { value: "emi", label: "EMI (Electronic Money Institution)" },
    { value: "pi", label: "PI (Payment Institution)" },
    { value: "orchestration", label: "Orchestration" },
    { value: "white-label", label: "White-label" },
    { value: "full-stack", label: "Full-stack" }
  ];

  const services = [
    { value: "card-acquiring", label: "Card Acquiring" },
    { value: "payouts", label: "Payouts" },
    { value: "fx", label: "Foreign Exchange" },
    { value: "api", label: "API Services" },
    { value: "e-wallet", label: "E-Wallet" },
    { value: "crypto", label: "Cryptocurrency" }
  ];

  const paymentMethods = [
    { value: "visa", label: "Visa" },
    { value: "mastercard", label: "Mastercard" },
    { value: "sepa", label: "SEPA" },
    { value: "swift", label: "SWIFT" },
    { value: "local-apm", label: "Local APM" }
  ];

  const statuses = [
    { value: "active", label: "Active" },
    { value: "revoked", label: "Revoked" },
    { value: "suspended", label: "Suspended" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      jurisdiction: "",
      licenseType: "",
      service: "",
      paymentMethod: "",
      status: ""
    });
    setSelectedCountries([]);
  };

  // Синхронизация выбора страны с фильтром
  const handleCountrySelect = (countryCode: string) => {
    const newSelected = [...selectedCountries, countryCode];
    setSelectedCountries(newSelected);
    // Map country codes to jurisdiction values
    const jurisdictionMap: { [key: string]: string } = {
      "GB": "uk",
      "LT": "lt", 
      "SG": "sg"
    };
    const jurisdiction = jurisdictionMap[countryCode];
    if (jurisdiction) {
      setSearchParams(prev => ({ ...prev, jurisdiction }));
    }
  };
  const handleCountryDeselect = (countryCode: string) => {
    const newSelected = selectedCountries.filter(code => code !== countryCode);
    setSelectedCountries(newSelected);
    if (newSelected.length === 0) {
      setSearchParams(prev => ({ ...prev, jurisdiction: "" }));
    }
  };

  const hasActiveFilters = Object.values(searchParams).some(value => value !== "");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Jurisdiction</label>
          <Select
            value={searchParams.jurisdiction}
            onValueChange={(value) => setSearchParams(prev => ({ ...prev, jurisdiction: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              {jurisdictions.map((jurisdiction) => (
                <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                  {jurisdiction.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">License Type</label>
          <Select
            value={searchParams.licenseType}
            onValueChange={(value) => setSearchParams(prev => ({ ...prev, licenseType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select license type" />
            </SelectTrigger>
            <SelectContent>
              {licenseTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Service</label>
          <Select
            value={searchParams.service}
            onValueChange={(value) => setSearchParams(prev => ({ ...prev, service: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
          <Select
            value={searchParams.paymentMethod}
            onValueChange={(value) => setSearchParams(prev => ({ ...prev, paymentMethod: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">License Status</label>
          <Select
            value={searchParams.status}
            onValueChange={(value) => setSearchParams(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {Object.entries(searchParams).map(([key, value]) => {
            if (!value) return null;
            let label = "";
            switch (key) {
              case "jurisdiction":
                label = jurisdictions.find(j => j.value === value)?.label || value;
                break;
              case "licenseType":
                label = licenseTypes.find(l => l.value === value)?.label || value;
                break;
              case "service":
                label = services.find(s => s.value === value)?.label || value;
                break;
              case "paymentMethod":
                label = paymentMethods.find(p => p.value === value)?.label || value;
                break;
              case "status":
                label = statuses.find(s => s.value === value)?.label || value;
                break;
              default:
                label = value;
            }
            return (
              <Badge key={key} variant="secondary" className="text-xs">
                {label}
              </Badge>
            );
          })}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="flex-1 sm:flex-none flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          {isLoading ? "Searching..." : "Search PSP Providers"}
        </Button>
        {hasActiveFilters && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            className="flex-1 sm:flex-none flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-bank-blue">50+</div>
          <div className="text-sm text-muted-foreground">PSP Providers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-bank-blue">3</div>
          <div className="text-sm text-muted-foreground">Jurisdictions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-bank-blue">24/7</div>
          <div className="text-sm text-muted-foreground">Data Updates</div>
        </div>
      </div>
    </form>
  );
};

export default PSPSearchForm; 