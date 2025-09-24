// app/map/page.tsx
"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { LayersControl } from "react-leaflet";
import {
  Search, Filter, BarChart3, MapPin, Users, Building2,
  TrendingUp, Eye, EyeOff, Calendar, DollarSign, MapIcon,
  Activity, Shield, Car
} from "lucide-react";

// Import dinámico (ssr off) de nuestros componentes de mapa
const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });
const GeoLayer = dynamic(() => import("../../components/map/GeoLayer"), { ssr: false });
const PointsLayer = dynamic(() => import("../../components/map/PointsLayer"), { ssr: false });

// Tipos
type ActiveLayer = "urbania" | "districts" | "urbanAreas";

export default function ClientMapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // móvil
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>("urbania");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showDemographics, setShowDemographics] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  const [mapStats] = useState({
    totalProperties: 2000,
    avgPrice: 385000,
    activeLeads: 47,
    closedDeals: 12,
    avgROI: 8.5,
  });

  const layerOptions = [
    { id: "urbania", label: "Propiedades Urbania", icon: Building2, color: "text-orange-600" },
    { id: "districts", label: "Distritos", icon: MapIcon, color: "text-blue-600" },
    { id: "urbanAreas", label: "Áreas Urbanas", icon: Building2, color: "text-amber-600" },
  ] as const;

  const serviceTypes = [
    { id: "banks", label: "Bancos", icon: DollarSign, color: "text-blue-500" },
    { id: "hospitals", label: "Hospitales", icon: Activity, color: "text-red-500" },
    { id: "malls", label: "C. Comerciales", icon: Building2, color: "text-green-500" },
    { id: "transport", label: "Transporte", icon: Car, color: "text-purple-500" },
    { id: "security", label: "Comisarías", icon: Shield, color: "text-gray-600" },
  ];

  const districts = [
    "Todos", "Miraflores", "San Isidro", "Barranco", "Surco", "La Molina",
    "San Borja", "Jesús María", "Magdalena", "Pueblo Libre"
  ];

  // Construye query de puntos (Urbania) según filtros
  const propertyFilters = useMemo(() => {
    let url = "/api/map/urbania?limit=2000";
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedDistrict && selectedDistrict !== "Todos") params.append("district", selectedDistrict);
    if (priceRange.min > 0) params.append("minPrice", String(priceRange.min));
    if (priceRange.max < 1000000) params.append("maxPrice", String(priceRange.max));
    const qs = params.toString();
    return qs ? `${url}&${qs}` : url;
  }, [searchTerm, selectedDistrict, priceRange]);

  return (
    <div className="h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:w-96 md:flex-col bg-white border-r border-gray-200 shadow-lg">
        <SidebarContent
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
          showHeatmap={showHeatmap}
          setShowHeatmap={setShowHeatmap}
          showDemographics={showDemographics}
          setShowDemographics={setShowDemographics}
          showServices={showServices}
          setShowServices={setShowServices}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          mapStats={mapStats}
        />
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 relative">
        {/* Botón abrir sidebar en móvil */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden absolute top-4 left-4 z-50 bg-white p-3 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          aria-label="Abrir filtros"
        >
          <Eye className="w-5 h-5 text-gray-600" />
        </button>

        {/* Backdrop + Sidebar móvil */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 shadow-2xl z-50 md:hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm font-bold text-gray-900">SmartCore BI</h1>
                    <p className="text-[11px] text-gray-600 -mt-0.5">Mapa Inteligente</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-50 rounded-lg"
                  aria-label="Cerrar filtros"
                >
                  <EyeOff className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="h-[calc(100vh-64px)] overflow-auto">
                <SidebarContent
                  activeLayer={activeLayer}
                  setActiveLayer={(l) => { setActiveLayer(l); setSidebarOpen(false); }}
                  showHeatmap={showHeatmap}
                  setShowHeatmap={setShowHeatmap}
                  showDemographics={showDemographics}
                  setShowDemographics={setShowDemographics}
                  showServices={showServices}
                  setShowServices={setShowServices}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  mapStats={mapStats}
                />
              </div>
            </div>
          </>
        )}

        {/* Mapa: ocupa todo */}
        <div className="h-full w-full p-3">
          <div className="h-full">
            <Map center={[-12.05, -77.05]} zoom={10} className="h-full">
              <LayersControl position="topright">
                {/* Monta/desmonta capas por estado */}
                {activeLayer === "urbania" && (
                  <LayersControl.Overlay name="🏠 Propiedades Urbania" checked>
                    <PointsLayer
                      url={propertyFilters}
                      popupFields={[
                        { key: "titulo", label: "Título" },
                        { key: "precio", label: "Precio" },
                        { key: "moneda", label: "Moneda" },
                        { key: "distrito", label: "Distrito" },
                        { key: "tipo_operacion", label: "Operación" },
                        { key: "tipo_propiedad", label: "Tipo" },
                        { key: "area_total_m2", label: "Área total (m²)" },
                        { key: "habitaciones", label: "Dormitorios" },
                        { key: "banos", label: "Baños" },
                        { key: "cocheras", label: "Cocheras" },
                        { key: "url_original", label: "URL" },
                      ]}
                    />
                  </LayersControl.Overlay>
                )}

                {activeLayer === "districts" && (
                  <LayersControl.Overlay name="🗺️ Distritos" checked>
                    <GeoLayer
                      url="/api/map/distritos?simplify=60"
                      style={{
                        color: "#2563eb",
                        weight: 2,
                        fillOpacity: showHeatmap ? 0.1 : 0.04,
                        className: "district-layer",
                      }}
                      hoverStyle={{
                        color: "#1d4ed8",
                        weight: 3,
                        fillOpacity: 0.15,
                      }}
                      popupFields={[
                        { key: "ubigeo", label: "UBIGEO" },
                        { key: "nombdist", label: "Distrito" },
                        { key: "nombprov", label: "Provincia" },
                        { key: "area_km2", label: "Área (km²)" },
                      ]}
                    />
                  </LayersControl.Overlay>
                )}

                {activeLayer === "urbanAreas" && (
                  <LayersControl.Overlay name="🏙️ Áreas Urbanas" checked>
                    <GeoLayer
                      url="/api/map/area-urbana?simplify=40"
                      style={{
                        color: "#f59e0b",
                        weight: 1,
                        fillOpacity: 0.08,
                        className: "urban-areas-layer",
                        dashArray: "5, 5",
                      }}
                      hoverStyle={{
                        color: "#d97706",
                        weight: 3,
                        fillOpacity: 0.15,
                      }}
                      popupFields={[
                        { key: "cod_au", label: "Código AU" },
                        { key: "nom_au", label: "Nombre AU" },
                        { key: "nombdist", label: "Distrito" },
                        { key: "area_has", label: "Área (ha)" },
                      ]}
                    />
                  </LayersControl.Overlay>
                )}

                {/* Placeholder para Heatmap si showHeatmap === true */}
                {showHeatmap && (
                  <LayersControl.Overlay name="🔥 Mapa de Calor" checked>
                    {/* Implementar con datos reales (heatmap.js / Leaflet.heat u otro) */}
                    <div />
                  </LayersControl.Overlay>
                )}
              </LayersControl>
            </Map>
          </div>
        </div>

        {/* Panel de info flotante (derecha) */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 max-w-xs border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Activity className="w-4 h-4 mr-2 text-orange-500" />
            Estado del Mercado
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Propiedades activas:</span>
              <span className="font-medium">{mapStats.totalProperties.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Precio m² promedio:</span>
              <span className="font-medium">${(mapStats.avgPrice/100).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tendencia:</span>
              <span className="font-medium text-green-600">↗ +5.2%</span>
            </div>
          </div>
        </div>

        {/* Leyenda (izquierda abajo) */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Leyenda</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-orange-500 rounded-full border border-white shadow-sm"></div>
              <span className="text-gray-700">Propiedades Urbania</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 border-2 border-blue-500 rounded-sm"></div>
              <span className="text-gray-700">Límites distritales</span>
            </div>
            {showHeatmap && (
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-red-500 rounded-sm"></div>
                <span className="text-gray-700">Densidad de precios</span>
              </div>
            )}
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl shadow-lg transition-colors">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-lg transition-colors">
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Estilos Leaflet afinados */}
      <style jsx global>{`
        .leaflet-container {
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        }
        .leaflet-control-layers {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-radius: 0.75rem;
          border: 1px solid rgba(229,231,235,0.8);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .leaflet-popup-content-wrapper {
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .district-layer:hover {
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
        }
      `}</style>
    </div>
  );
}

/* ======================= SidebarContent ======================= */

type SidebarProps = {
  activeLayer: "urbania"|"districts"|"urbanAreas";
  setActiveLayer: (l: "urbania"|"districts"|"urbanAreas") => void;
  showHeatmap: boolean; setShowHeatmap: (v: boolean) => void;
  showDemographics: boolean; setShowDemographics: (v: boolean) => void;
  showServices: boolean; setShowServices: (v: boolean) => void;
  searchTerm: string; setSearchTerm: (v: string) => void;
  selectedDistrict: string; setSelectedDistrict: (v: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (v: { min: number; max: number }) => void;
  mapStats: { totalProperties: number; avgPrice: number; activeLeads: number; closedDeals: number; avgROI: number; };
};

function SidebarContent({
  activeLayer, setActiveLayer,
  showHeatmap, setShowHeatmap,
  showDemographics, setShowDemographics,
  showServices, setShowServices,
  searchTerm, setSearchTerm,
  selectedDistrict, setSelectedDistrict,
  priceRange, setPriceRange,
  mapStats
}: SidebarProps) {

  const layerOptions = [
    { id: "urbania", label: "Propiedades Urbania", icon: Building2, color: "text-orange-600" },
    { id: "districts", label: "Distritos", icon: MapIcon, color: "text-blue-600" },
    { id: "urbanAreas", label: "Áreas Urbanas", icon: Building2, color: "text-amber-600" },
  ] as const;

  const districts = [
    "Todos", "Miraflores", "San Isidro", "Barranco", "Surco", "La Molina",
    "San Borja", "Jesús María", "Magdalena", "Pueblo Libre"
  ];

  const serviceTypes = [
    { id: "banks", label: "Bancos", icon: DollarSign, color: "text-blue-500" },
    { id: "hospitals", label: "Hospitales", icon: Activity, color: "text-red-500" },
    { id: "malls", label: "C. Comerciales", icon: Building2, color: "text-green-500" },
    { id: "transport", label: "Transporte", icon: Car, color: "text-purple-500" },
    { id: "security", label: "Comisarías", icon: Shield, color: "text-gray-600" },
  ];

  return (
    <div className="flex-1 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              <a href="http://localhost:3008/" className="text-inherit">SmartCore BI</a>
            </h1>
            <p className="text-xs text-gray-600">Mapa Inteligente</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar propiedades, distritos…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
          <BarChart3 className="w-4 h-4 mr-2" />
          Dashboard Ejecutivo
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{mapStats.totalProperties.toLocaleString()}</div>
            <div className="text-xs text-blue-600 font-medium">Propiedades</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-green-700">${(mapStats.avgPrice/1000).toFixed(0)}K</div>
            <div className="text-xs text-green-600 font-medium">Precio Prom.</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
            <div className="text-2xl font-bold text-orange-700">{mapStats.activeLeads}</div>
            <div className="text-xs text-orange-600 font-medium">Leads Activos</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <div className="text-2xl font-bold text-purple-700">{mapStats.avgROI}%</div>
            <div className="text-xs text-purple-600 font-medium">ROI Promedio</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="p-6 border-b border-gray-200 max-h-64 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filtros Avanzados
        </h3>

        {/* Distrito */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">Distrito</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
          >
            {["Todos", "Miraflores", "San Isidro", "Barranco", "Surco", "La Molina", "San Borja", "Jesús María", "Magdalena", "Pueblo Libre"].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Rango Precio */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">Rango de Precio</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min || ''}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max || ''}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Capas */}
      <div className="p-6 border-b border-gray-200 flex-1 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Capas del Mapa</h3>

        <div className="space-y-3 mb-6">
          {layerOptions.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as ActiveLayer)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-50 to-blue-50 border-2 border-orange-200 shadow-sm'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : layer.color}`} />
                <span className={`font-medium text-sm ${isActive ? 'text-orange-900' : 'text-gray-700'}`}>
                  {layer.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Servicios (placeholder de botones) */}
        {showServices && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-600 mb-3">Servicios Cercanos</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "banks", label: "Bancos", icon: DollarSign, color: "text-blue-500" },
                { id: "hospitals", label: "Hospitales", icon: Activity, color: "text-red-500" },
                { id: "malls", label: "C. Comerciales", icon: Building2, color: "text-green-500" },
                { id: "transport", label: "Transporte", icon: Car, color: "text-purple-500" },
                { id: "security", label: "Comisarías", icon: Shield, color: "text-gray-600" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <button key={s.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Icon className={`w-4 h-4 ${s.color}`} />
                    <span className="text-xs text-gray-700">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Switches */}
        <div className="space-y-4">
          <Toggle
            label={<><TrendingUp className="w-4 h-4 mr-2 text-red-500" />Mapa de Calor</>}
            value={showHeatmap}
            onChange={setShowHeatmap}
          />
          <Toggle
            label={<><Users className="w-4 h-4 mr-2 text-green-500" />Demografía</>}
            value={showDemographics}
            onChange={setShowDemographics}
          />
          <Toggle
            label={<><MapPin className="w-4 h-4 mr-2 text-purple-500" />Servicios</>}
            value={showServices}
            onChange={setShowServices}
          />
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: React.ReactNode;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between">
      <span className="text-sm text-gray-700 flex items-center">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? 'bg-orange-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
}
