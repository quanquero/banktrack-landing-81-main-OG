export interface PSPProvider {
  id: string;
  name: string;
  jurisdiction: "uk" | "lt" | "sg";
  licenseType: "emi" | "pi" | "orchestration" | "white-label" | "full-stack";
  licenseNumber: string;
  licenseStatus: "active" | "revoked" | "suspended";
  licenseDate: string;
  website: string;
  email?: string;
  phone?: string;
  contactForm?: string;
  services: PSPService[];
  paymentMethods: PaymentMethod[];
  description?: string;
  regulator: string;
  regionOfOperation: string;
  lastUpdated: string;
}

export interface PSPService {
  id: string;
  name: string;
  description?: string;
  category: "card-acquiring" | "payouts" | "fx" | "api" | "e-wallet" | "crypto" | "other";
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "card" | "bank-transfer" | "local-payment" | "crypto" | "other";
  networks?: string[];
}

export interface PSPSearchParams {
  jurisdiction?: string;
  licenseType?: string;
  service?: string;
  paymentMethod?: string;
  status?: string;
  search?: string;
}

export interface PSPSearchResult {
  providers: PSPProvider[];
  total: number;
  page: number;
  limit: number;
}

export interface PSPExportData {
  providers: PSPProvider[];
  format: "csv" | "json";
  includeContacts: boolean;
  includeServices: boolean;
}

// Mock data for development
export const mockPSPProviders: PSPProvider[] = [
  {
    id: "1",
    name: "Revolut",
    jurisdiction: "uk",
    licenseType: "emi",
    licenseNumber: "EMI-123456",
    licenseStatus: "active",
    licenseDate: "2015-12-15",
    website: "https://revolut.com",
    email: "business@revolut.com",
    phone: "+44 20 3326 6300",
    services: [
      { id: "1", name: "Card Acquiring", category: "card-acquiring" },
      { id: "2", name: "Payouts", category: "payouts" },
      { id: "3", name: "Foreign Exchange", category: "fx" },
      { id: "4", name: "API Services", category: "api" }
    ],
    paymentMethods: [
      { id: "1", name: "Visa", type: "card", networks: ["Visa"] },
      { id: "2", name: "Mastercard", type: "card", networks: ["Mastercard"] },
      { id: "3", name: "SEPA", type: "bank-transfer", networks: ["SEPA"] }
    ],
    regulator: "FCA",
    regionOfOperation: "UK, EU, US",
    lastUpdated: "2024-01-15"
  },
  {
    id: "2",
    name: "TransferWise",
    jurisdiction: "uk",
    licenseType: "pi",
    licenseNumber: "PI-789012",
    licenseStatus: "active",
    licenseDate: "2011-01-01",
    website: "https://wise.com",
    email: "support@wise.com",
    phone: "+44 20 3695 0999",
    services: [
      { id: "1", name: "International Transfers", category: "payouts" },
      { id: "2", name: "Foreign Exchange", category: "fx" },
      { id: "3", name: "Multi-currency Accounts", category: "e-wallet" }
    ],
    paymentMethods: [
      { id: "1", name: "Bank Transfer", type: "bank-transfer", networks: ["SWIFT", "SEPA"] },
      { id: "2", name: "Local Payment Methods", type: "local-payment" }
    ],
    regulator: "FCA",
    regionOfOperation: "Global",
    lastUpdated: "2024-01-10"
  },
  {
    id: "3",
    name: "PaySera",
    jurisdiction: "lt",
    licenseType: "emi",
    licenseNumber: "EMI-LT-345678",
    licenseStatus: "active",
    licenseDate: "2011-06-01",
    website: "https://paysera.com",
    email: "info@paysera.com",
    phone: "+370 5 212 7474",
    services: [
      { id: "1", name: "Card Acquiring", category: "card-acquiring" },
      { id: "2", name: "Payouts", category: "payouts" },
      { id: "3", name: "E-Wallet", category: "e-wallet" },
      { id: "4", name: "API Services", category: "api" }
    ],
    paymentMethods: [
      { id: "1", name: "Visa", type: "card", networks: ["Visa"] },
      { id: "2", name: "Mastercard", type: "card", networks: ["Mastercard"] },
      { id: "3", name: "SEPA", type: "bank-transfer", networks: ["SEPA"] }
    ],
    regulator: "LB.lt",
    regionOfOperation: "EU",
    lastUpdated: "2024-01-12"
  }
]; 