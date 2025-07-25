import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface WorldMapProps {
  selectedCountries: string[];
  onCountrySelect: (countryCode: string) => void;
  onCountryDeselect: (countryCode: string) => void;
}

interface Country {
  code: string;
  name: string;
  path: string;
  jurisdiction: "uk" | "lt" | "sg" | "none";
}

const WorldMap = ({ selectedCountries, onCountrySelect, onCountryDeselect }: WorldMapProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Определяем страны с PSP-провайдерами
  const countries: Country[] = [
    {
      code: "GB",
      name: "United Kingdom",
      path: "M 0.5 8.5 L 0.5 9.5 L 1.5 9.5 L 1.5 8.5 Z",
      jurisdiction: "uk"
    },
    {
      code: "LT",
      name: "Lithuania", 
      path: "M 10.5 6.5 L 10.5 7.5 L 11.5 7.5 L 11.5 6.5 Z",
      jurisdiction: "lt"
    },
    {
      code: "SG",
      name: "Singapore",
      path: "M 18.5 12.5 L 18.5 13.5 L 19.5 13.5 L 19.5 12.5 Z",
      jurisdiction: "sg"
    }
  ];

  const getCountryColor = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    
    if (!country) return "#e5e7eb"; // Gray for non-PSP countries
    
    if (selectedCountries.includes(countryCode)) {
      return "#1e40af"; // Bank blue for selected
    }
    
    if (country.jurisdiction !== "none") {
      return "#3b82f6"; // Light blue for PSP countries
    }
    
    return "#e5e7eb"; // Gray for others
  };

  const getCountryStroke = (countryCode: string) => {
    if (selectedCountries.includes(countryCode)) {
      return "#1e40af";
    }
    if (hoveredCountry === countryCode) {
      return "#3b82f6";
    }
    return "#9ca3af";
  };

  const handleCountryClick = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    
    if (!country || country.jurisdiction === "none") {
      return; // Only allow selection of PSP countries
    }
    
    if (selectedCountries.includes(countryCode)) {
      onCountryDeselect(countryCode);
    } else {
      onCountrySelect(countryCode);
    }
  };

  const getCountryTooltip = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (!country) return null;
    
    if (country.jurisdiction === "none") {
      return `${country.name} - No PSP data available`;
    }
    
    const isSelected = selectedCountries.includes(countryCode);
    return `${country.name} - ${isSelected ? 'Selected' : 'Click to select'}`;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Map Container */}
      <div className="relative bg-white rounded-lg shadow-lg p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-bank-blue mb-2">Select Countries</h3>
          <p className="text-sm text-muted-foreground">
            Click on countries to filter PSP providers by jurisdiction
          </p>
        </div>
        
        {/* World Map SVG */}
        <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
          <svg
            viewBox="0 0 20 15"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
          >
            {/* Background continents (simplified) */}
            <path
              d="M 1 3 L 6 3 L 6 8 L 1 8 Z M 8 4 L 12 4 L 12 9 L 8 9 Z M 14 5 L 18 5 L 18 10 L 14 10 Z"
              fill="#f3f4f6"
              stroke="#d1d5db"
              strokeWidth="0.1"
            />
            
            {/* Interactive countries */}
            {countries.map((country) => (
              <g key={country.code}>
                <path
                  d={country.path}
                  fill={getCountryColor(country.code)}
                  stroke={getCountryStroke(country.code)}
                  strokeWidth="0.2"
                  className={`transition-all duration-200 cursor-pointer ${
                    country.jurisdiction !== "none" ? "hover:stroke-2" : ""
                  }`}
                  onClick={() => handleCountryClick(country.code)}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
                
                {/* Country label */}
                <text
                  x={country.code === "GB" ? "1" : country.code === "LT" ? "11" : "19"}
                  y={country.code === "GB" ? "9" : country.code === "LT" ? "7" : "13"}
                  className="text-xs font-medium fill-current"
                  style={{ 
                    fill: selectedCountries.includes(country.code) ? "#ffffff" : "#374151",
                    fontSize: "0.6px"
                  }}
                  textAnchor="middle"
                >
                  {country.code}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-bank-blue rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>PSP Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span>No Data</span>
            </div>
          </div>
        </div>
        
        {/* Selected Countries Display */}
        {selectedCountries.length > 0 && (
          <div className="mt-4 p-3 bg-bank-blue/5 rounded-lg">
            <h4 className="text-sm font-medium text-bank-blue mb-2">Selected Countries:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((countryCode) => {
                const country = countries.find(c => c.code === countryCode);
                return (
                  <Badge
                    key={countryCode}
                    variant="secondary"
                    className="bg-bank-blue/10 text-bank-blue border-bank-blue/20"
                  >
                    {country?.name || countryCode}
                    <button
                      onClick={() => onCountryDeselect(countryCode)}
                      className="ml-1 hover:text-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Tooltip */}
        {hoveredCountry && (
          <div
            className="absolute bg-gray-900 text-white text-xs px-2 py-1 rounded pointer-events-none z-10"
            style={{
              left: hoveredCountry === "GB" ? "10%" : hoveredCountry === "LT" ? "50%" : "85%",
              top: hoveredCountry === "GB" ? "30%" : hoveredCountry === "LT" ? "40%" : "70%",
              transform: "translate(-50%, -100%)"
            }}
          >
            {getCountryTooltip(hoveredCountry)}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMap; 