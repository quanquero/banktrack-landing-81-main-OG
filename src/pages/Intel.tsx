import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Download, Building2, Shield, Globe, Database, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PSPProviderCard from "@/components/intel/PSPProviderCard";
import PSPSearchForm from "@/components/intel/PSPSearchForm";
import IntelStats from "@/components/intel/IntelStats";
import LeafletCountryMap from "@/components/intel/LeafletCountryMap";

const Intel = () => {
const [searchResults, setSearchResults] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
const [pspData, setPspData] = useState<any[]>([]);
const [lastJurisdiction, setLastJurisdiction] = useState<string>("");

  // Универсальная функция загрузки данных по стране
const loadCountryData = useCallback(async (countryCodeOrName: string) => {
  if (countryCodeOrName.toLowerCase() === "cy" || countryCodeOrName.toLowerCase() === "cyprus") {
    const res = await fetch("/psp_cyprus.json");
    const data = await res.json();
    setPspData(data);
    setSearchResults(data.filter((item: any) => item.is_relevant));
    setLastJurisdiction("cy");
  } else {
    setPspData([]);
    setSearchResults([]);
    setLastJurisdiction("");
  }
}, []);

// Загружаем данные при выборе страны на карте
useEffect(() => {
  if (selectedCountries.length > 0) {
    const code = selectedCountries[selectedCountries.length - 1];
    loadCountryData(code);
  }
}, [selectedCountries, loadCountryData]);

// Обновляем результаты поиска по фильтру
const handleSearch = async (searchParams: any) => {
  setIsLoading(true);

  // Если выбран Кипр — всегда подгружаем данные
  if (searchParams.jurisdiction === "cy" || searchParams.jurisdiction === "Cyprus") {
    // Если данные ещё не загружены, загружаем
    let data = pspData;
    if (!pspData.length) {
      const res = await fetch("/psp_cyprus.json");
      data = await res.json();
      setPspData(data);
    }
    setSearchResults(
      data.filter((item: any) =>
        item.is_relevant &&
        (!searchParams.service || searchParams.service === "" || item.services.includes(searchParams.service))
      )
    );
  } else {
    setSearchResults([]);
  }
  setIsLoading(false);
};



  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountries(prev => [...prev, countryCode]);
  };

  const handleCountryDeselect = (countryCode: string) => {
    setSelectedCountries(prev => prev.filter(code => code !== countryCode));
  };

  // Перемещаю features и isVisible выше JSX
  const features = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "PSP Database",
      description: "Comprehensive database of PSP providers from UK, Lithuania, and Singapore."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "License Verification",
      description: "Real-time license status and regulatory compliance information."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Coverage",
      description: "Multi-jurisdiction PSP providers with detailed service offerings."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Export",
      description: "Export PSP data in CSV format for B2B integration and analysis."
    }
  ];

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-20 pb-8 md:pt-28 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="staggered-animate">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-medium bg-bank-blue/10 text-bank-blue border-bank-blue/20">
                B2B PSP Intelligence Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                BankTrack Intel
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Comprehensive database of PSP providers with license verification, service offerings, and regulatory compliance data for B2B clients.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Global PSP Coverage Map Section */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Global PSP Coverage</h2>
            <p className="text-muted-foreground">
              Explore PSP providers across different jurisdictions
            </p>
          </div>
          <LeafletCountryMap
            selected={selectedCountries}
            onSelect={handleCountrySelect}
            onDeselect={handleCountryDeselect}
          />
        </div>
      </section>
      {/* Search Section */}
      <section className="py-6 pb-12 bg-bank-blue/5">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto">
            <div className="glass-card border-primary/20 shadow-soft p-6 rounded-xl bg-white ring-2 ring-bank-blue/20 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-center text-bank-blue">Find PSP Providers</h2>
              <PSPSearchForm onSearch={handleSearch} isLoading={isLoading} selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />
            </div>
          </div>
        </div>
      </section>
      {/* Results Section (перемещено сразу после поиска) */}
      {searchResults.length > 0 && (
        <section className="py-8 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((provider, index) => (
                <PSPProviderCard key={index} provider={provider} />
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Stats Section */}
      <section className="py-8 bg-bank-lightGray/30">
        <div className="container mx-auto px-4">
          <IntelStats />
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose BankTrack Intel?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get access to verified PSP provider data with real-time license status and comprehensive service information.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glass-card p-6 rounded-xl hover-lift ${
                  isVisible ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-lg bg-bank-blue/10 flex items-center justify-center text-bank-blue mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bank-blue to-bank-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to access PSP intelligence?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Get comprehensive data on PSP providers, licenses, and services for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-white text-bank-blue hover:bg-gray-100 w-full sm:w-auto">
                Start Free Trial
              </Button>
              <Button variant="sales" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Intel; 