import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect, useState } from 'react';

interface Props {
  selected: string[];
  onSelect: (code: string) => void;
  onDeselect: (code: string) => void;
}

// Список ISO-кодов стран, для которых есть данные
const availableCountries = ["cy", "uk", "lt", "sg"];

export default function LeafletCountryMap({ selected, onSelect, onDeselect }: Props) {
  const mapRef = useRef(null);
  const [geojson, setGeojson] = useState<any>(null);

  useEffect(() => {
    fetch('/world-countries.json')
      .then(res => res.json())
      .then(setGeojson);
  }, []);

  function onEachCountry(feature: any, layer: any) {
    const code = (feature.properties.ISO_A2 || feature.properties.iso_a2 || "").toLowerCase();
    const hasData = availableCountries.includes(code);
    const isSelected = selected.includes(code);

    layer.setStyle({
      fillColor: hasData ? (isSelected ? '#1e40af' : '#3b82f6') : '#fff',
      fillOpacity: hasData ? (isSelected ? 0.9 : 0.7) : 0.2,
      color: hasData ? '#1e40af' : '#e5e7eb',
      weight: hasData ? 2 : 1,
      dashArray: hasData ? '2' : '1',
      cursor: hasData ? 'pointer' : 'default',
      transition: 'all 0.2s',
    });

    layer.bindTooltip(feature.properties.ADMIN || feature.properties.name, { sticky: true });

    if (hasData) {
      layer.on({
        click: () => {
          if (isSelected) onDeselect(code);
          else onSelect(code);
        },
        mouseover: function () {
          layer.setStyle({ fillOpacity: 1 });
        },
        mouseout: function () {
          layer.setStyle({ fillOpacity: isSelected ? 0.9 : 0.7 });
        }
      });
    } else {
      layer.on({
        mouseover: function () {
          layer.setStyle({ fillOpacity: 0.4 });
        },
        mouseout: function () {
          layer.setStyle({ fillOpacity: 0.2 });
        }
      });
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg border border-bank-blue/20 mb-4 bg-white">
      <MapContainer
        center={[30, 20]}
        zoom={2}
        style={{ height: 400, width: '100%', background: 'white', borderRadius: 18 }}
        scrollWheelZoom={false}
        ref={mapRef}
        dragging={true}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.8}
        />
        {geojson && <GeoJSON data={geojson} onEachFeature={onEachCountry} />}
      </MapContainer>
      {/* Легенда */}
      <div className="absolute bottom-2 left-2 bg-white/90 rounded-lg p-2 text-xs shadow">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-bank-blue rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
          <span>No data</span>
        </div>
      </div>
    </div>
  );
} 