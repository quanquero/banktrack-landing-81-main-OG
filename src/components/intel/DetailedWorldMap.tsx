import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface DetailedWorldMapProps {
  selectedCountries: string[];
  onCountrySelect: (countryCode: string) => void;
  onCountryDeselect: (countryCode: string) => void;
}

interface Country {
  code: string;
  name: string;
  path: string;
  jurisdiction: "uk" | "lt" | "sg" | "none";
  x: number;
  y: number;
}

const DetailedWorldMap = ({ selectedCountries, onCountrySelect, onCountryDeselect }: DetailedWorldMapProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Более детальные координаты стран
  const countries: Country[] = [
    {
      code: "GB",
      name: "United Kingdom",
      path: "M 4.8 4.2 L 4.8 4.8 L 5.2 4.8 L 5.2 4.2 Z M 4.6 4.4 L 4.8 4.4 L 4.8 4.6 L 4.6 4.6 Z",
      jurisdiction: "uk",
      x: 5,
      y: 4.5
    },
    {
      code: "LT",
      name: "Lithuania",
      path: "M 5.8 3.8 L 5.8 4.2 L 6.2 4.2 L 6.2 3.8 Z",
      jurisdiction: "lt",
      x: 6,
      y: 4
    },
    {
      code: "SG",
      name: "Singapore",
      path: "M 10.8 7.2 L 10.8 7.6 L 11.2 7.6 L 11.2 7.2 Z",
      jurisdiction: "sg",
      x: 11,
      y: 7.4
    }
  ];

  const getCountryColor = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    
    if (!country) return "#e5e7eb";
    
    if (selectedCountries.includes(countryCode)) {
      return "#1e40af"; // Bank blue for selected
    }
    
    if (country.jurisdiction !== "none") {
      return "#3b82f6"; // Light blue for PSP countries
    }
    
    return "#e5e7eb";
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
      return;
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
      <div className="relative bg-white rounded-lg shadow-lg p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-bank-blue mb-2">Global PSP Coverage</h3>
          <p className="text-sm text-muted-foreground">
            Click on highlighted countries to filter PSP providers by jurisdiction
          </p>
        </div>
        
        {/* World Map Container */}
        <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg overflow-hidden border border-gray-200">
          <svg
            viewBox="0 0 12 8"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
          >
            {/* World continents (simplified) */}
            <g className="continents">
              {/* Europe */}
              <path
                d="M 3 2.5 L 6 2.5 L 6 4 L 3 4 Z"
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="0.05"
              />
              
              {/* Asia */}
              <path
                d="M 6 2 L 11 2 L 11 5 L 6 5 Z"
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="0.05"
              />
              
              {/* North America */}
              <path
                d="M 1 2 L 3 2 L 3 4.5 L 1 4.5 Z"
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="0.05"
              />
              
              {/* South America */}
              <path
                d="M 2 4.5 L 3.5 4.5 L 3.5 7 L 2 7 Z"
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="0.05"
              />
              
              {/* Africa */}
              <path
                d="M 4.5 4 L 6.5 4 L 6.5 6.5 L 4.5 6.5 Z"
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="0.05"
              />
              
              {/* Australia */}
              <path
                d="M 9 6 L 11 6 L 11 7.5 L 9 7.5 Z"
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="0.05"
              />
            </g>
            
            {/* Interactive countries */}
            {countries.map((country) => (
              <g key={country.code} className="country-group">
                <path
                  d={country.path}
                  fill={getCountryColor(country.code)}
                  stroke={getCountryStroke(country.code)}
                  strokeWidth="0.1"
                  className={`transition-all duration-300 cursor-pointer ${
                    country.jurisdiction !== "none" ? "hover:stroke-2 hover:scale-105" : ""
                  }`}
                  onClick={() => handleCountryClick(country.code)}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
                
                {/* Country label */}
                <text
                  x={country.x}
                  y={country.y + 0.3}
                  className="text-xs font-bold fill-current pointer-events-none"
                  style={{ 
                    fill: selectedCountries.includes(country.code) ? "#ffffff" : "#374151",
                    fontSize: "0.4px",
                    textShadow: selectedCountries.includes(country.code) ? "1px 1px 2px rgba(0,0,0,0.5)" : "none"
                  }}
                  textAnchor="middle"
                >
                  {country.code}
                </text>
                
                {/* Pulse effect for selected countries */}
                {selectedCountries.includes(country.code) && (
                  <circle
                    cx={country.x}
                    cy={country.y}
                    r="0.3"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="0.05"
                    className="animate-ping opacity-75"
                  />
                )}
              </g>
            ))}
            
            {/* Grid lines for reference */}
            <g className="grid" opacity="0.1">
              <line x1="0" y1="2" x2="12" y2="2" stroke="#9ca3af" strokeWidth="0.02" />
              <line x1="0" y1="4" x2="12" y2="4" stroke="#9ca3af" strokeWidth="0.02" />
              <line x1="0" y1="6" x2="12" y2="6" stroke="#9ca3af" strokeWidth="0.02" />
              <line x1="3" y1="0" x2="3" y2="8" stroke="#9ca3af" strokeWidth="0.02" />
              <line x1="6" y1="0" x2="6" y2="8" stroke="#9ca3af" strokeWidth="0.02" />
              <line x1="9" y1="0" x2="9" y2="8" stroke="#9ca3af" strokeWidth="0.02" />
            </g>
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-bank-blue rounded-full animate-pulse"></div>
              <span className="font-medium">Selected</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>PSP Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>No Data</span>
            </div>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-bank-blue">{selectedCountries.length}</div>
              <div className="text-gray-600">Selected</div>
            </div>
          </div>
        </div>
        
        {/* Selected Countries Display */}
        {selectedCountries.length > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-bank-blue/5 to-indigo-50 rounded-lg border border-bank-blue/20">
            <h4 className="text-sm font-medium text-bank-blue mb-3 flex items-center gap-2">
              <span>🌍</span>
              Selected Countries ({selectedCountries.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((countryCode) => {
                const country = countries.find(c => c.code === countryCode);
                return (
                  <Badge
                    key={countryCode}
                    variant="secondary"
                    className="bg-bank-blue/10 text-bank-blue border-bank-blue/20 hover:bg-bank-blue/20 transition-colors"
                  >
                    <span className="mr-1">
                      {countryCode === "GB" ? "🇬🇧" : countryCode === "LT" ? "🇱🇹" : "🇸🇬"}
                    </span>
                    {country?.name || countryCode}
                    <button
                      onClick={() => onCountryDeselect(countryCode)}
                      className="ml-2 hover:text-red-600 transition-colors font-bold"
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
            className="absolute bg-gray-900 text-white text-xs px-3 py-2 rounded-lg pointer-events-none z-20 shadow-lg"
            style={{
              left: `${countries.find(c => c.code === hoveredCountry)?.x * 8.33}%`,
              top: `${countries.find(c => c.code === hoveredCountry)?.y * 12.5}%`,
              transform: "translate(-50%, -120%)"
            }}
          >
            <div className="font-medium">
              {getCountryTooltip(hoveredCountry)}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedWorldMap; 