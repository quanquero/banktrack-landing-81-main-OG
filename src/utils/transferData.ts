export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export interface Bank {
  id: string;
  name: string;
  logo: string;
  countryId: string;
}

export interface TransferMethod {
  id: string;
  name: string;
  description: string;
}

export interface TransferType {
  id: string;
  name: string;
  description: string;
}

export interface TransferRule {
  fromCountryId: string;
  toCountryId: string;
  fromBankId?: string;
  toBankId?: string;
  fromBankName?: string;
  toBankName?: string;
  methodId: string;
  typeId: string;
  available: boolean;
  fee: string;
  processingTime: string;
  minAmount?: string;
  maxAmount?: string;
  limitations?: string;
  reliabilityData?: {
    days: string[];
    values: number[];
    dates?: string[];
    reliability?: number;
  };
  statistics?: TransferStatistic;
}

export interface TransferStatistic {
  fromCountryId: string;
  toCountryId: string;
  fromBankId?: string;
  toBankId?: string;
  methodId: string;
  typeId: string;
  successRate: number;
  averageTime: string;
  totalTransactions: number;
  averageAmount: string;
  lastMonthGrowth: number;
  popularDays: string[];
  reliabilityData?: {
    days: string[];
    values: number[];
    dates?: string[];
  };
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  fromCountry: string;
  toCountry: string;
  method: string;
}

export const countries: Country[] = [
  { id: "1", name: "United States", code: "US", flag: "🇺🇸" },
  { id: "2", name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { id: "3", name: "Germany", code: "DE", flag: "🇩🇪" },
  { id: "4", name: "France", code: "FR", flag: "🇫🇷" },
  { id: "5", name: "Italy", code: "IT", flag: "🇮🇹" },
  { id: "6", name: "Spain", code: "ES", flag: "🇪🇸" },
  { id: "7", name: "China", code: "CN", flag: "🇨🇳" },
  { id: "8", name: "Japan", code: "JP", flag: "🇯🇵" },
  { id: "9", name: "Russia", code: "RU", flag: "🇷🇺" },
  { id: "10", name: "India", code: "IN", flag: "🇮🇳" },
  { id: "11", name: "Brazil", code: "BR", flag: "🇧🇷" },
  { id: "12", name: "Canada", code: "CA", flag: "🇨🇦" },
  { id: "13", name: "Australia", code: "AU", flag: "🇦🇺" },
  { id: "14", name: "South Korea", code: "KR", flag: "🇰🇷" },
  { id: "15", name: "Singapore", code: "SG", flag: "🇸🇬" },
  { id: "16", name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
];

export const banks: Bank[] = [
  { id: "1", name: "Bank of America", logo: "/bank-logos/bofa.svg", countryId: "1" },
  { id: "2", name: "Chase", logo: "/bank-logos/chase.svg", countryId: "1" },
  { id: "3", name: "Wells Fargo", logo: "/bank-logos/wells-fargo.svg", countryId: "1" },
  { id: "4", name: "HSBC UK", logo: "/bank-logos/hsbc.svg", countryId: "2" },
  { id: "5", name: "Barclays", logo: "/bank-logos/barclays.svg", countryId: "2" },
  { id: "6", name: "Lloyds Bank", logo: "/bank-logos/lloyds.svg", countryId: "2" },
  { id: "7", name: "Deutsche Bank", logo: "/bank-logos/deutsche.svg", countryId: "3" },
  { id: "8", name: "Commerzbank", logo: "/bank-logos/commerzbank.svg", countryId: "3" },
  { id: "9", name: "BNP Paribas", logo: "/bank-logos/bnp.svg", countryId: "4" },
  { id: "10", name: "Société Générale", logo: "/bank-logos/socgen.svg", countryId: "4" },
  { id: "11", name: "UniCredit", logo: "/bank-logos/unicredit.svg", countryId: "5" },
  { id: "12", name: "Intesa Sanpaolo", logo: "/bank-logos/intesa.svg", countryId: "5" },
  { id: "13", name: "Santander", logo: "/bank-logos/santander.svg", countryId: "6" },
  { id: "14", name: "BBVA", logo: "/bank-logos/bbva.svg", countryId: "6" },
  { id: "15", name: "Bank of China", logo: "/bank-logos/boc.svg", countryId: "7" },
  { id: "16", name: "ICBC", logo: "/bank-logos/icbc.svg", countryId: "7" },
  { id: "17", name: "Mitsubishi UFJ", logo: "/bank-logos/mufj.svg", countryId: "8" },
  { id: "18", name: "Mizuho Bank", logo: "/bank-logos/mizuho.svg", countryId: "8" },
  { id: "19", name: "Sberbank", logo: "/bank-logos/sberbank.svg", countryId: "9" },
  { id: "20", name: "VTB Bank", logo: "/bank-logos/vtb.svg", countryId: "9" },
  { id: "21", name: "State Bank of India", logo: "/bank-logos/sbi.svg", countryId: "10" },
  { id: "22", name: "HDFC Bank", logo: "/bank-logos/hdfc.svg", countryId: "10" },
  { id: "23", name: "Banco do Brasil", logo: "/bank-logos/bb.svg", countryId: "11" },
  { id: "24", name: "Itaú Unibanco", logo: "/bank-logos/itau.svg", countryId: "11" },
  { id: "25", name: "Royal Bank of Canada", logo: "/bank-logos/rbc.svg", countryId: "12" },
  { id: "26", name: "TD Bank", logo: "/bank-logos/td.svg", countryId: "12" },
  { id: "27", name: "Commonwealth Bank", logo: "/bank-logos/cba.svg", countryId: "13" },
  { id: "28", name: "ANZ", logo: "/bank-logos/anz.svg", countryId: "13" },
  { id: "29", name: "KB Kookmin Bank", logo: "/bank-logos/kb.svg", countryId: "14" },
  { id: "30", name: "Shinhan Bank", logo: "/bank-logos/shinhan.svg", countryId: "14" },
  { id: "31", name: "DBS Bank", logo: "/bank-logos/dbs.svg", countryId: "15" },
  { id: "32", name: "OCBC Bank", logo: "/bank-logos/ocbc.svg", countryId: "15" },
  { id: "33", name: "Emirates NBD", logo: "/bank-logos/enbd.svg", countryId: "16" },
  { id: "34", name: "First Abu Dhabi Bank", logo: "/bank-logos/fab.svg", countryId: "16" },
];

export const transferMethods: TransferMethod[] = [
  { 
    id: "1", 
    name: "SWIFT", 
    description: "Standard international bank transfer system used by most banks worldwide." 
  },
  { 
    id: "2", 
    name: "SPFS", 
    description: "Russian alternative to SWIFT for domestic and international payments." 
  },
  { 
    id: "3", 
    name: "Domestic transfer", 
    description: "Direct transfers within the same country's banking system." 
  },
];

export const transferTypes: TransferType[] = [
  { 
    id: "1", 
    name: "Local", 
    description: "Transfers within the same local financial system." 
  },
  { 
    id: "2", 
    name: "International", 
    description: "Transfers between different countries and financial systems." 
  },
  { 
    id: "3", 
    name: "Euro Transfer", 
    description: "Transfers within the European Union using the SEPA system." 
  },
];

export const transferRules: TransferRule[] = [
  {
    fromCountryId: "1",
    toCountryId: "2",
    methodId: "1",
    typeId: "1",
    available: true,
    fee: "25 USD + 0.5%",
    processingTime: "1-3 business days",
    limitations: "Maximum 10,000 USD per transaction"
  },
  
  {
    fromCountryId: "1",
    toCountryId: "2",
    methodId: "1",
    typeId: "2",
    available: true,
    fee: "40 USD + 0.3%",
    processingTime: "1-2 business days",
    minAmount: "100",
    maxAmount: "1000000"
  },
  
  {
    fromCountryId: "2",
    toCountryId: "1",
    methodId: "1",
    typeId: "1",
    available: true,
    fee: "20 GBP + 0.4%",
    processingTime: "1-3 business days",
    limitations: "Maximum 7,500 GBP per transaction"
  },
  
  {
    fromCountryId: "9",
    toCountryId: "7",
    methodId: "2",
    typeId: "2",
    available: true,
    fee: "1500 RUB + 0.3%",
    processingTime: "2-5 business days",
    limitations: "Documentation required for transactions over 600,000 RUB"
  },
  
  {
    fromCountryId: "1",
    toCountryId: "9",
    methodId: "1",
    typeId: "1",
    available: false,
    fee: "N/A",
    processingTime: "N/A",
    limitations: "Transfers currently restricted due to sanctions"
  },
  
  {
    fromCountryId: "10",
    toCountryId: "1",
    methodId: "3",
    typeId: "1",
    available: true,
    fee: "300 INR flat",
    processingTime: "1-2 business days",
    maxAmount: "100000",
    limitations: "KYC verification required"
  },
  
  {
    fromCountryId: "3",
    toCountryId: "4",
    methodId: "1",
    typeId: "1",
    available: true,
    fee: "5 EUR + 0.1%",
    processingTime: "1 business day",
    limitations: "SEPA transfer within EU"
  },
  
  {
    fromCountryId: "8",
    toCountryId: "1",
    methodId: "1",
    typeId: "2",
    available: true,
    fee: "3000 JPY + 0.4%",
    processingTime: "2-3 business days",
    limitations: "Foreign exchange declaration required for amounts over 5 million JPY"
  },
  
  {
    fromCountryId: "7",
    toCountryId: "9",
    methodId: "2",
    typeId: "2",
    available: true,
    fee: "200 CNY + 0.3%",
    processingTime: "3-5 business days",
    limitations: "Special documentation requirements apply"
  },
  
  {
    fromCountryId: "1",
    toCountryId: "10",
    methodId: "3",
    typeId: "1",
    available: true,
    fee: "10 USD flat",
    processingTime: "Same day to 1 business day",
    limitations: "Maximum 2,000 USD per day"
  },
  
  {
    fromCountryId: "16",
    toCountryId: "2",
    methodId: "1",
    typeId: "2",
    available: true,
    fee: "75 AED + 0.4%",
    processingTime: "2-4 business days",
    limitations: "Source of funds declaration required for amounts over 100,000 AED"
  },
  
  {
    fromCountryId: "11",
    toCountryId: "6",
    methodId: "1",
    typeId: "1",
    available: true,
    fee: "50 BRL + 1.2%",
    processingTime: "3-5 business days",
    limitations: "Tax declaration required"
  },
  
  {
    fromCountryId: "13",
    toCountryId: "15",
    methodId: "1",
    typeId: "2",
    available: true,
    fee: "20 AUD + 0.5%",
    processingTime: "1-3 business days",
    limitations: "None"
  },
];

export const transferStatistics: TransferStatistic[] = [
  {
    fromCountryId: "1",
    toCountryId: "2",
    methodId: "1",
    typeId: "1",
    successRate: 97.4,
    averageTime: "1.7 days",
    totalTransactions: 15482,
    averageAmount: "$4,235",
    lastMonthGrowth: 3.2,
    popularDays: ["Monday", "Thursday"]
  },
  
  {
    fromCountryId: "1",
    toCountryId: "2",
    methodId: "1",
    typeId: "2",
    successRate: 99.1,
    averageTime: "1.3 days",
    totalTransactions: 27896,
    averageAmount: "$67,120",
    lastMonthGrowth: 5.7,
    popularDays: ["Tuesday", "Wednesday"]
  },
  
  {
    fromCountryId: "2",
    toCountryId: "1",
    methodId: "1",
    typeId: "1",
    successRate: 98.3,
    averageTime: "1.6 days",
    totalTransactions: 12490,
    averageAmount: "£3,127",
    lastMonthGrowth: 2.8,
    popularDays: ["Monday", "Friday"]
  },
  
  {
    fromCountryId: "9",
    toCountryId: "7",
    methodId: "2",
    typeId: "2",
    successRate: 93.7,
    averageTime: "3.2 days",
    totalTransactions: 8753,
    averageAmount: "₽785,420",
    lastMonthGrowth: 12.4,
    popularDays: ["Wednesday", "Thursday"]
  },
  
  {
    fromCountryId: "10",
    toCountryId: "1",
    methodId: "3",
    typeId: "1",
    successRate: 94.5,
    averageTime: "1.1 days",
    totalTransactions: 31267,
    averageAmount: "₹42,750",
    lastMonthGrowth: 8.3,
    popularDays: ["Friday", "Saturday"]
  },
  
  {
    fromCountryId: "3",
    toCountryId: "4",
    methodId: "1",
    typeId: "1",
    successRate: 99.8,
    averageTime: "0.8 days",
    totalTransactions: 45891,
    averageAmount: "€1,870",
    lastMonthGrowth: 1.5,
    popularDays: ["Monday", "Wednesday"]
  },
  
  {
    fromCountryId: "8",
    toCountryId: "1",
    methodId: "1",
    typeId: "2",
    successRate: 98.9,
    averageTime: "2.1 days",
    totalTransactions: 9672,
    averageAmount: "¥1,250,000",
    lastMonthGrowth: 4.2,
    popularDays: ["Tuesday", "Thursday"]
  },
  
  {
    fromCountryId: "7",
    toCountryId: "9",
    methodId: "2",
    typeId: "2",
    successRate: 92.6,
    averageTime: "3.5 days",
    totalTransactions: 7431,
    averageAmount: "¥520,000",
    lastMonthGrowth: 15.7,
    popularDays: ["Monday", "Thursday"]
  },
  
  {
    fromCountryId: "1",
    toCountryId: "10",
    methodId: "3",
    typeId: "1",
    successRate: 95.2,
    averageTime: "0.9 days",
    totalTransactions: 28945,
    averageAmount: "$1,120",
    lastMonthGrowth: 7.4,
    popularDays: ["Friday", "Sunday"]
  },
  
  {
    fromCountryId: "11",
    toCountryId: "6",
    methodId: "1",
    typeId: "1",
    successRate: 94.3,
    averageTime: "2.8 days",
    totalTransactions: 6127,
    averageAmount: "R$4,850",
    lastMonthGrowth: 3.6,
    popularDays: ["Tuesday", "Friday"]
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    name: "David Chen",
    avatar: "/lovable-uploads/eab3b092-1e43-49e1-a8b1-2c5b85a0d673.png",
    rating: 5,
    date: "2023-05-15",
    text: "Transferred money from Chase (US) to Barclays (UK) using SWIFT. The process was smooth and funds arrived in just 2 days. The fee was exactly as predicted by this platform.",
    fromCountry: "United States",
    toCountry: "United Kingdom",
    method: "SWIFT"
  },
  {
    id: "2",
    name: "Emma Watson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    date: "2023-06-22",
    text: "Used the P2P method to send money from India to my son in the US. It was much faster than traditional bank transfers I had used before. Very convenient!",
    fromCountry: "India",
    toCountry: "United States",
    method: "P2P"
  },
  {
    id: "3",
    name: "Alexei Petrov",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 3,
    date: "2023-04-10",
    text: "Business transfer from Russia to China through SPFS. Documentation requirements were extensive but the service correctly warned me about this. Transfer completed successfully after 4 days.",
    fromCountry: "Russia",
    toCountry: "China",
    method: "SPFS"
  },
  {
    id: "4",
    name: "Sophia Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 5,
    date: "2023-07-05",
    text: "Sent money from Santander (Spain) to my family in Brazil. The fee prediction was spot on and the money arrived in 3 days as estimated. Will definitely use this service again!",
    fromCountry: "Spain",
    toCountry: "Brazil",
    method: "SWIFT"
  },
  {
    id: "5",
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 2,
    date: "2023-03-30",
    text: "Tried to send money from US to Russia but was correctly informed that restrictions were in place. Saved me time and potential issues by knowing ahead of time. Good service but frustrating situation.",
    fromCountry: "United States",
    toCountry: "Russia",
    method: "SWIFT"
  },
];

export const getBanksForCountry = (countryId: string): Bank[] => {
  return banks.filter(bank => bank.countryId === countryId);
};

export const checkTransferAvailability = (
  fromCountryId: string,
  toCountryId: string,
  methodId: string,
  typeId: string,
  fromBankId?: string,
  toBankId?: string
): TransferRule | undefined => {
  // First try to find a specific rule for the given banks
  let rule = transferRules.find(r => 
    r.fromCountryId === fromCountryId &&
    r.toCountryId === toCountryId &&
    r.methodId === methodId &&
    r.typeId === typeId &&
    r.fromBankId === fromBankId &&
    r.toBankId === toBankId
  );
  
  // If no specific rule for these banks, try to find a general rule for the countries
  if (!rule) {
    rule = transferRules.find(r => 
      r.fromCountryId === fromCountryId &&
      r.toCountryId === toCountryId &&
      r.methodId === methodId &&
      r.typeId === typeId &&
      !r.fromBankId &&
      !r.toBankId
    );
  }
  
  return rule;
};

export const getTransferStatistics = (
  fromCountryId: string,
  toCountryId: string,
  methodId: string,
  typeId: string,
  fromBankId?: string,
  toBankId?: string
): TransferStatistic | undefined => {
  // First try to find a specific statistic for the given banks
  let stat = transferStatistics.find(s => 
    s.fromCountryId === fromCountryId &&
    s.toCountryId === toCountryId &&
    s.methodId === methodId &&
    s.typeId === typeId &&
    s.fromBankId === fromBankId &&
    s.toBankId === toBankId
  );
  
  // If no specific statistic for these banks, try to find a general statistic for the countries
  if (!stat) {
    stat = transferStatistics.find(s => 
      s.fromCountryId === fromCountryId &&
      s.toCountryId === toCountryId &&
      s.methodId === methodId &&
      s.typeId === typeId &&
      !s.fromBankId &&
      !s.toBankId
    );
  }
  
  return stat;
};
