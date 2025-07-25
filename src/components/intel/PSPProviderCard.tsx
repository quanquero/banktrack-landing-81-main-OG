import { Building2, Shield, Globe, Mail, Phone, ExternalLink, Download, Globe2, Linkedin, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PSPProvider {
  legal_name: string;
  commercial_name: string;
  country: string;
  description: string;
  license_services: string[];
  license_regulator: string;
  license_number: string;
  license_date: string;
  website: string;
  contact_email: string;
  contact_form_url: string;
  linkedin_url: string;
  crunchbase_url: string;
  services: string[];
  target_clients: string[];
  supported_regions: string[];
  ceo_name: string;
  cto_name: string;
  cmo_name: string;
  languages: string[];
  is_relevant: boolean;
}

interface PSPProviderCardProps {
  provider: PSPProvider;
}

const PSPProviderCard = ({ provider }: PSPProviderCardProps) => {
  return (
    <Card className="glass-card hover-lift transition-all duration-300 border-2 border-bank-blue/10 bg-white/80 shadow-xl">
      <CardHeader className="pb-3 flex flex-row items-start gap-4">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg font-bold mb-1 text-bank-blue truncate flex items-center gap-2">
            <Building2 className="h-5 w-5 text-bank-blue/80" />
            {provider.commercial_name || provider.legal_name}
            {provider.is_relevant ? (
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 border-green-200 text-xs">B2B</Badge>
            ) : (
              <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-800 border-gray-200 text-xs">Not Relevant</Badge>
            )}
          </CardTitle>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline" className="text-xs bg-bank-blue/10 text-bank-blue border-bank-blue/20">
              {provider.country}
            </Badge>
            {provider.license_regulator && (
              <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                {provider.license_regulator}
              </Badge>
            )}
            {provider.license_services && provider.license_services.length > 0 && (
              <Badge variant="outline" className="text-xs bg-indigo-100 text-indigo-800 border-indigo-200">
                {provider.license_services.join(", ")}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end min-w-fit">
          {provider.website && (
            <a href={provider.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <Button size="icon" variant="ghost" className="text-bank-blue">
                <Globe2 className="h-5 w-5" />
              </Button>
            </a>
          )}
          {provider.linkedin_url && (
            <a href={provider.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <Button size="icon" variant="ghost" className="text-bank-blue">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
          )}
          {provider.crunchbase_url && (
            <a href={provider.crunchbase_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <Button size="icon" variant="ghost" className="text-bank-blue">
                <Link className="h-5 w-5" />
              </Button>
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Описание */}
        <div className="text-sm text-muted-foreground mb-2 line-clamp-3">
          {provider.description}
        </div>
        {/* Услуги и регионы */}
        <div className="flex flex-wrap gap-2 mb-2">
          {provider.services && provider.services.length > 0 && (
            <>
              {provider.services.slice(0, 4).map((service, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-bank-blue border-bank-blue/20">
                  {service}
                </Badge>
              ))}
              {provider.services.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-blue-50 text-bank-blue border-bank-blue/20">
                  +{provider.services.length - 4} more
                </Badge>
              )}
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {provider.supported_regions && provider.supported_regions.length > 0 && (
            <>
              {provider.supported_regions.map((region, idx) => (
                <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-800 border-green-200">
                  {region}
                </Badge>
              ))}
            </>
          )}
        </div>
        {/* Целевые клиенты и языки */}
        <div className="flex flex-wrap gap-2 mb-2">
          {provider.target_clients && provider.target_clients.length > 0 && (
            <>
              {provider.target_clients.map((client, idx) => (
                <Badge key={idx} variant="outline" className="text-xs bg-purple-50 text-purple-800 border-purple-200">
                  {client}
                </Badge>
              ))}
            </>
          )}
          {provider.languages && provider.languages.length > 0 && (
            <>
              {provider.languages.map((lang, idx) => (
                <Badge key={idx} variant="outline" className="text-xs bg-gray-50 text-gray-800 border-gray-200">
                  {lang}
                </Badge>
              ))}
            </>
          )}
        </div>
        {/* Контакты */}
        <div className="flex flex-col gap-1 text-xs text-muted-foreground mt-2">
          {provider.contact_email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-bank-blue/70" />
              <span>{provider.contact_email}</span>
            </div>
          )}
          {provider.contact_form_url && (
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-bank-blue/70" />
              <a href={provider.contact_form_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Contact Form
              </a>
            </div>
          )}
        </div>
        {/* Руководство */}
        {(provider.ceo_name || provider.cto_name || provider.cmo_name) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {provider.ceo_name && (
              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-800 border-yellow-200">CEO: {provider.ceo_name}</Badge>
            )}
            {provider.cto_name && (
              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-800 border-yellow-200">CTO: {provider.cto_name}</Badge>
            )}
            {provider.cmo_name && (
              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-800 border-yellow-200">CMO: {provider.cmo_name}</Badge>
            )}
          </div>
        )}
        {/* Кнопка подробнее */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 bg-bank-blue text-white hover:bg-bank-navy">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PSPProviderCard; 