// app/map/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Search, Filter, BarChart3, MapPin, Users, Building2,
  TrendingUp, Eye, EyeOff, Calendar, DollarSign, MapIcon,
  Activity, Shield, Car, ChevronUp, ChevronDown
} from "lucide-react";

// Importar dinámicamente el componente Map y MapLayers
const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });
const MapLayers = dynamic(() => import("../../components/map/MapLayers"), { ssr: false });

// Tipos
type ActiveLayer = "urbania" | "districts" | "urbanAreas";

export default function ClientMapPage() {
  // Estado para verificar si estamos en el cliente
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false); // móvil

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Todos");
  const [priceRange, setPriceRange] = useState({ min: null as number | null, max: null as number | null });

  // Estado para datos reales
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [filteredStats, setFilteredStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [districtsList, setDistrictsList] = useState<Array<{name: string, count: number}>>([]);
  const [filteredCount, setFilteredCount] = useState<number | null>(null);
  const [filterOptions, setFilterOptions] = useState<any>(null);
  
  // Filtros de segmentación
  const [selectedSource, setSelectedSource] = useState("Todos");
  const [selectedOperationType, setSelectedOperationType] = useState("Todos");
  const [selectedPropertyType, setSelectedPropertyType] = useState("Todos");
  const [colorBy, setColorBy] = useState<'fuente' | 'tipo_operacion' | 'tipo_propiedad'>('fuente');

  // Fetch datos reales del dashboard
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setDashboardStats(data);
        }
      } catch (error) {
        console.error('Error al obtener estadísticas del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDistricts = async () => {
      try {
        const response = await fetch('/api/districts');
        if (response.ok) {
          const data = await response.json();
          setDistrictsList(data.districts);
        }
      } catch (error) {
        console.error('Error al obtener distritos:', error);
      }
    };

    const fetchFilters = async () => {
      try {
        const response = await fetch('/api/filters');
        if (response.ok) {
          const data = await response.json();
          setFilterOptions(data);
        }
      } catch (error) {
        console.error('Error al obtener filtros:', error);
      }
    };

    fetchDashboardStats();
    fetchDistricts();
    fetchFilters();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchDashboardStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Sincronizar conteo filtrado con total cuando no hay filtros activos
  useEffect(() => {
    const hasActiveFilters = searchTerm || 
                           selectedDistrict !== 'Todos' || 
                           priceRange.min || 
                           priceRange.max || 
                           selectedSource !== 'Todos' || 
                           selectedOperationType !== 'Todos' || 
                           selectedPropertyType !== 'Todos';
    
    if (!hasActiveFilters && dashboardStats?.metrics?.totalProperties && filteredCount === null) {
      setFilteredCount(dashboardStats.metrics.totalProperties);
    }
  }, [dashboardStats, searchTerm, selectedDistrict, priceRange, selectedSource, selectedOperationType, selectedPropertyType, filteredCount]);

  // Determinar si hay filtros activos
  const hasActiveFilters = searchTerm || 
                         selectedDistrict !== 'Todos' || 
                         priceRange.min || 
                         priceRange.max || 
                         selectedSource !== 'Todos' || 
                         selectedOperationType !== 'Todos' || 
                         selectedPropertyType !== 'Todos';

  // Estadísticas con datos reales (usar filtradas si hay filtros activos)
  const currentStats = hasActiveFilters ? filteredStats : dashboardStats;
  const mapStats = currentStats?.metrics ? {
    totalProperties: currentStats.metrics.totalProperties || 0,
    avgPrice: currentStats.metrics.averagePrice || 0,
    activeLeads: currentStats.metrics.activeLeads || 0,
    closedDeals: 12, // Este se mantiene simulado
    avgROI: currentStats.metrics.roiPercentage || 0
  } : {
    totalProperties: 0,
    avgPrice: 0,
    activeLeads: 0,
    closedDeals: 0,
    avgROI: 0
  };

  const districts = [
    "Todos", "Miraflores", "San Isidro", "Barranco", "Surco", "La Molina",
    "San Borja", "Jesús María", "Magdalena", "Pueblo Libre"
  ];

  // Construye query de puntos (Urbania) según filtros
  const propertyFilters = useMemo(() => {
    let url = "/api/map/urbania?limit=2000"; // Límite para visualización
    const params = new URLSearchParams();
    
    if (searchTerm && searchTerm.trim()) {
      params.append("q", searchTerm.trim());
    }
    
    if (selectedDistrict && selectedDistrict !== "Todos") {
      params.append("district", selectedDistrict);
    }
    
    if (priceRange.min && priceRange.min > 0) {
      params.append("min_price", String(priceRange.min));
    }
    
    if (priceRange.max && priceRange.max > 0) {
      params.append("max_price", String(priceRange.max));
    }
    
    // Nuevos filtros de segmentación
    if (selectedSource && selectedSource !== "Todos") {
      params.append("source", selectedSource);
    }
    
    if (selectedOperationType && selectedOperationType !== "Todos") {
      params.append("operation_type", selectedOperationType);
    }
    
    if (selectedPropertyType && selectedPropertyType !== "Todos") {
      params.append("property_type", selectedPropertyType);
    }
    
    const qs = params.toString();
    return qs ? `${url}&${qs}` : url;
  }, [searchTerm, selectedDistrict, priceRange, selectedSource, selectedOperationType, selectedPropertyType]);

  // Crear URL para conteo total (sin límite)
  const countFilters = useMemo(() => {
    let url = "/api/properties-count";
    const params = new URLSearchParams();
    
    if (searchTerm && searchTerm.trim()) {
      params.append("q", searchTerm.trim());
    }
    
    if (selectedDistrict && selectedDistrict !== "Todos") {
      params.append("district", selectedDistrict);
    }
    
    if (priceRange.min && priceRange.min > 0) {
      params.append("min_price", String(priceRange.min));
    }
    
    if (priceRange.max && priceRange.max > 0) {
      params.append("max_price", String(priceRange.max));
    }
    
    if (selectedSource && selectedSource !== "Todos") {
      params.append("source", selectedSource);
    }
    
    if (selectedOperationType && selectedOperationType !== "Todos") {
      params.append("operation_type", selectedOperationType);
    }
    
    if (selectedPropertyType && selectedPropertyType !== "Todos") {
      params.append("property_type", selectedPropertyType);
    }
    
    const qs = params.toString();
    return qs ? `${url}?${qs}` : url;
  }, [searchTerm, selectedDistrict, priceRange, selectedSource, selectedOperationType, selectedPropertyType]);

  // Crear URL para estadísticas filtradas
  const filteredStatsUrl = useMemo(() => {
    let url = "/api/dashboard/filtered-stats";
    const params = new URLSearchParams();
    
    if (searchTerm && searchTerm.trim()) {
      params.append("q", searchTerm.trim());
    }
    
    if (selectedDistrict && selectedDistrict !== "Todos") {
      params.append("district", selectedDistrict);
    }
    
    if (priceRange.min && priceRange.min > 0) {
      params.append("min_price", String(priceRange.min));
    }
    
    if (priceRange.max && priceRange.max > 0) {
      params.append("max_price", String(priceRange.max));
    }
    
    if (selectedSource && selectedSource !== "Todos") {
      params.append("source", selectedSource);
    }
    
    if (selectedOperationType && selectedOperationType !== "Todos") {
      params.append("operation_type", selectedOperationType);
    }
    
    if (selectedPropertyType && selectedPropertyType !== "Todos") {
      params.append("property_type", selectedPropertyType);
    }
    
    const qs = params.toString();
    return qs ? `${url}?${qs}` : url;
  }, [searchTerm, selectedDistrict, priceRange, selectedSource, selectedOperationType, selectedPropertyType]);

  // Obtener estadísticas filtradas
  useEffect(() => {
    const fetchFilteredStats = async () => {
      try {
        const response = await fetch(filteredStatsUrl);
        if (response.ok) {
          const data = await response.json();
          setFilteredStats(data);
          setFilteredCount(data.metrics?.totalProperties || 0);
          // Actualizar lista de distritos con datos filtrados
          if (data.topDistricts) {
            setDistrictsList(data.topDistricts);
          }
        }
      } catch (error) {
        console.error('Error al obtener estadísticas filtradas:', error);
      }
    };

    // Debounce el fetch para evitar demasiadas llamadas
    const timeoutId = setTimeout(fetchFilteredStats, 300);
    return () => clearTimeout(timeoutId);
  }, [filteredStatsUrl]);

  // Obtener conteo total de propiedades filtradas (backup)
  useEffect(() => {
    if (filteredCount === null) {
      const fetchFilteredCount = async () => {
        try {
          const response = await fetch(countFilters);
          if (response.ok) {
            const data = await response.json();
            setFilteredCount(data.count || 0);
          }
        } catch (error) {
          console.error('Error al obtener conteo filtrado:', error);
        }
      };

      // Debounce el fetch para evitar demasiadas llamadas
      const timeoutId = setTimeout(fetchFilteredCount, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [countFilters, filteredCount]);

  return (
    <div className="h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:w-96 md:flex-col bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
        <SidebarContent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          mapStats={mapStats}
          loading={loading}
          districtsList={districtsList}
          filterOptions={filterOptions}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          selectedOperationType={selectedOperationType}
          setSelectedOperationType={setSelectedOperationType}
          selectedPropertyType={selectedPropertyType}
          setSelectedPropertyType={setSelectedPropertyType}
          colorBy={colorBy}
          setColorBy={setColorBy}
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
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  mapStats={mapStats}
                  loading={loading}
                  districtsList={districtsList}
                  filterOptions={filterOptions}
                  selectedSource={selectedSource}
                  setSelectedSource={setSelectedSource}
                  selectedOperationType={selectedOperationType}
                  setSelectedOperationType={setSelectedOperationType}
                  selectedPropertyType={selectedPropertyType}
                  setSelectedPropertyType={setSelectedPropertyType}
                  colorBy={colorBy}
                  setColorBy={setColorBy}
                />
              </div>
            </div>
          </>
        )}

        {/* Mapa: ocupa todo */}
        <div className="h-full w-full p-3">
          {/* Indicador de filtros activos */}
          {(searchTerm || selectedDistrict !== 'Todos' || priceRange.min || priceRange.max || selectedSource !== 'Todos' || selectedOperationType !== 'Todos' || selectedPropertyType !== 'Todos') && (
            <div className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-2 shadow-lg max-w-sm">
              <div className="text-sm font-medium text-gray-800 flex items-center space-x-2">
                <Filter className="w-4 h-4 text-orange-600" />
                <span>Filtros aplicados</span>
                {filteredCount !== null && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {filteredCount.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                <div className="flex items-center space-x-1 mb-1">
                  <span>Coloreado por:</span>
                  <span className="font-medium">{colorBy.replace('_', ' ')}</span>
                </div>
                {searchTerm && <span>"{searchTerm}" • </span>}
                {selectedDistrict !== 'Todos' && <span>{selectedDistrict} • </span>}
                {selectedSource !== 'Todos' && <span>{selectedSource} • </span>}
                {selectedOperationType !== 'Todos' && <span>{selectedOperationType} • </span>}
                {selectedPropertyType !== 'Todos' && <span>{selectedPropertyType} • </span>}
                {(priceRange.min || priceRange.max) && (
                  <span>
                    S/ {priceRange.min ? priceRange.min.toLocaleString() : 'Min'} - {priceRange.max ? priceRange.max.toLocaleString() : 'Max'}
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="h-full">
            {isMounted && (
              <Map center={[-12.05, -77.05]} zoom={10} className="h-full">
                <MapLayers propertyFilters={propertyFilters} colorBy={colorBy} />
              </Map>
            )}
          </div>

          {/* Leyenda Dinámica dentro del mapa (izquierda abajo) */}
          <div className="absolute bottom-6 left-6 z-[1100]">
            <DynamicLegend 
              colorBy={colorBy}
              filterOptions={filterOptions}
              selectedSource={selectedSource}
              selectedOperationType={selectedOperationType}
              selectedPropertyType={selectedPropertyType}
              filteredCount={filteredCount}
            />
          </div>
        </div>

        {/* Panel de info flotante (izquierda superior) */}
        <div className="absolute top-4 left-4 z-[1100] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 max-w-xs border border-gray-200">
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
        
        /* Asegurar que la leyenda dinámica siempre esté visible */
        .dynamic-legend {
          position: relative !important;
          z-index: 1100 !important;
          pointer-events: auto !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        /* Estilos mejorados para tooltips de precios */
        .price-tooltip {
          background: rgba(15, 58, 141, 0.9) !important; /* azul marino intermedio */
          border: none !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(15, 58, 141, 0.4) !important;
          padding: 8px 12px !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          color: white !important;
          backdrop-filter: blur(10px) !important;
          margin: 0 !important;
        }
        
        .price-tooltip::before {
          border-top-color: rgba(15, 58, 141, 0.9) !important;
        }
        
        .leaflet-tooltip-top.price-tooltip::before {
          border-top-color: rgba(15, 58, 141, 0.9) !important;
        }
        
        .leaflet-tooltip-bottom.price-tooltip::before {
          border-bottom-color: rgba(15, 58, 141, 0.9) !important;
        }
        
        .leaflet-tooltip-left.price-tooltip::before {
          border-left-color: rgba(15, 58, 141, 0.9) !important;
        }
        
        .leaflet-tooltip-right.price-tooltip::before {
          border-right-color: rgba(15, 58, 141, 0.9) !important;
        }
      `}</style>
    </div>
  );
}

/* ======================= DynamicLegend ======================= */

type DynamicLegendProps = {
  colorBy: 'fuente' | 'tipo_operacion' | 'tipo_propiedad';
  filterOptions: any;
  selectedSource: string;
  selectedOperationType: string;
  selectedPropertyType: string;
  filteredCount: number | null;
};

function DynamicLegend({ 
  colorBy, 
  filterOptions, 
  selectedSource, 
  selectedOperationType, 
  selectedPropertyType,
  filteredCount 
}: DynamicLegendProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Debug: verificar que el componente se esté renderizando
  useEffect(() => {
    console.log('🗺️ DynamicLegend renderizada:', { colorBy, filteredCount, filterOptions: !!filterOptions });
  }, [colorBy, filteredCount, filterOptions]);
  
  // Esquemas de colores (debe coincidir con PointsLayer)
  const COLOR_SCHEMES = {
    fuente: {
      'urbania.pe': '#f97316', // orange-500
      'default': '#6b7280' // gray-500
    },
    tipo_operacion: {
      'venta': '#10b981', // emerald-500
      'alquiler': '#3b82f6', // blue-500
      'alquilar': '#3b82f6', // blue-500 (alias)
      'default': '#6b7280' // gray-500
    },
    tipo_propiedad: {
      'departamento': '#8b5cf6', // violet-500
      'casa': '#f59e0b', // amber-500
      'oficina': '#06b6d4', // cyan-500
      'terreno': '#84cc16', // lime-500
      'apartment': '#8b5cf6', // violet-500 (alias)
      'default': '#6b7280' // gray-500
    }
  };

  // Obtener icono y título para el criterio de coloración
  const getColorCriteriaInfo = () => {
    switch (colorBy) {
      case 'fuente':
        return { icon: '🏢', title: 'por Fuente', description: 'Origen de los datos' };
      case 'tipo_operacion':
        return { icon: '💰', title: 'por Operación', description: 'Venta o alquiler' };
      case 'tipo_propiedad':
        return { icon: '🏠', title: 'por Tipo', description: 'Categoría de propiedad' };
      default:
        return { icon: '🏢', title: 'por Fuente', description: 'Origen de los datos' };
    }
  };

  // Obtener opciones disponibles según el criterio de coloración
  const getColorLegendItems = () => {
    if (!filterOptions) return [];

    let options: string[] = [];

    switch (colorBy) {
      case 'fuente':
        options = Array.isArray(filterOptions.sources) ? filterOptions.sources : [];
        break;
      case 'tipo_operacion':
        options = Array.isArray(filterOptions.operationTypes) ? filterOptions.operationTypes : [];
        break;
      case 'tipo_propiedad':
        options = Array.isArray(filterOptions.propertyTypes) ? filterOptions.propertyTypes : [];
        break;
    }

    const scheme = COLOR_SCHEMES[colorBy];
    if (!scheme) return [];
    
    return options.map(option => {
      const optionStr = String(option || '');
      const normalizedOption = optionStr.toLowerCase().trim();
      const color = scheme[normalizedOption as keyof typeof scheme] || scheme.default;
      
      return {
        label: optionStr,
        color: color,
        isActive: (
          (colorBy === 'fuente' && (selectedSource === 'Todos' || selectedSource === optionStr)) ||
          (colorBy === 'tipo_operacion' && (selectedOperationType === 'Todos' || selectedOperationType === optionStr)) ||
          (colorBy === 'tipo_propiedad' && (selectedPropertyType === 'Todos' || selectedPropertyType === optionStr))
        )
      };
    });
  };

  const colorLegendItems = getColorLegendItems();
  const criteriaInfo = getColorCriteriaInfo();

  // Capas geográficas estáticas
  const staticLayers = [
    { color: '#f59e0b', label: 'Área Urbana', shape: 'square', description: 'Delimitación urbana' },
    { color: '#10b981', label: 'Viviendas', shape: 'square', description: 'Sectores residenciales' },
    { color: '#3b82f6', label: 'Oferta de Vivienda', shape: 'square', description: 'Proyectos inmobiliarios' },
    { color: '#f97316', label: 'Tendencias Económicas', shape: 'square', description: 'Análisis económico' }
  ];

  return (
    <div 
      className="dynamic-legend bg-white border-2 border-orange-500 rounded-xl shadow-2xl max-w-xs min-w-[280px] transition-all duration-300"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(249, 115, 22, 0.5)'
      }}
    >
      {/* Header de la leyenda - Siempre visible */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900 text-sm flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
            Leyenda del Mapa
          </h4>
          <div className="flex items-center space-x-2">
            {filteredCount !== null && (
              <div className="flex items-center space-x-1">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {filteredCount.toLocaleString()}
                </span>
                <div className="text-xs text-gray-500">props</div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              aria-label={isCollapsed ? "Expandir leyenda" : "Colapsar leyenda"}
            >
              {isCollapsed ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
        {/* Criterio actual de coloración - Siempre visible */}
        <div className="mt-2 text-xs text-gray-600 flex items-center">
          <span className="mr-1">{criteriaInfo.icon}</span>
          <span className="font-medium">Coloreado {criteriaInfo.title}</span>
          <span className="mx-1">•</span>
          <span>{criteriaInfo.description}</span>
        </div>
      </div>

      {/* Contenido expansible */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Segmentación de Propiedades */}
          {colorLegendItems.length > 0 ? (
            <div>
              <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <span className="mr-1">{criteriaInfo.icon}</span>
                Propiedades {criteriaInfo.title}
              </h5>
              <div className="space-y-1.5">
                {colorLegendItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-2 text-xs transition-all duration-200 ${
                      item.isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                    }`}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0 transition-all duration-200 ${
                        item.isActive ? 'ring-2 ring-offset-1 ring-gray-300' : ''
                      }`}
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className={`text-gray-700 flex-1 ${item.isActive ? 'font-medium' : ''}`}>
                      {item.label}
                    </span>
                    {item.isActive && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-500 text-center py-2">
              <div className="animate-pulse">Cargando opciones de filtro...</div>
            </div>
          )}

          {/* Separador */}
          {colorLegendItems.length > 0 && (
            <div className="border-t border-gray-100"></div>
          )}

          {/* Capas Geográficas */}
          <div>
            <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
              🗺️ Capas Geográficas
              <span className="ml-2 text-gray-400 font-normal">(Opcional)</span>
            </h5>
            <div className="space-y-1.5">
              {staticLayers.map((layer, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs group hover:bg-gray-50 rounded p-1 transition-colors">
                  <div 
                    className={`w-3 h-3 border border-white shadow-sm flex-shrink-0 ${
                      layer.shape === 'square' ? 'rounded-sm' : 'rounded-full'
                    }`}
                    style={{ backgroundColor: layer.color }}
                  ></div>
                  <div className="flex-1">
                    <span className="text-gray-700 font-medium">{layer.label}</span>
                    <div className="text-gray-500 text-[10px]">{layer.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="border-t border-gray-100 pt-3">
            <div className="text-xs text-gray-500 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Filtro activo</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <span>Disponible</span>
                </div>
              </div>
              <div className="text-gray-400 text-[10px] leading-relaxed">
                💡 Usa el control de capas (esquina superior derecha) para activar/desactivar las capas geográficas
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================= SidebarContent ======================= */

type SidebarProps = {
  searchTerm: string; setSearchTerm: (v: string) => void;
  selectedDistrict: string; setSelectedDistrict: (v: string) => void;
  priceRange: { min: number | null; max: number | null };
  setPriceRange: (v: { min: number | null; max: number | null }) => void;
  mapStats: { totalProperties: number; avgPrice: number; activeLeads: number; closedDeals: number; avgROI: number; };
  loading: boolean;
  districtsList: Array<{name: string, count: number}>;
  filterOptions: any;
  selectedSource: string; setSelectedSource: (v: string) => void;
  selectedOperationType: string; setSelectedOperationType: (v: string) => void;
  selectedPropertyType: string; setSelectedPropertyType: (v: string) => void;
  colorBy: 'fuente' | 'tipo_operacion' | 'tipo_propiedad';
  setColorBy: (v: 'fuente' | 'tipo_operacion' | 'tipo_propiedad') => void;
};

function SidebarContent({
  searchTerm, setSearchTerm,
  selectedDistrict, setSelectedDistrict,
  priceRange, setPriceRange,
  mapStats,
  loading,
  districtsList,
  filterOptions,
  selectedSource, setSelectedSource,
  selectedOperationType, setSelectedOperationType,
  selectedPropertyType, setSelectedPropertyType,
  colorBy, setColorBy
}: SidebarProps) {

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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-blue-50">
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
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 w-5 h-5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
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
            <div className="text-2xl font-bold text-blue-700">
              {loading ? (
                <div className="animate-pulse bg-blue-300 h-8 w-16 rounded"></div>
              ) : (
                mapStats.totalProperties.toLocaleString()
              )}
            </div>
            <div className="text-xs text-blue-600 font-medium">Propiedades</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {loading ? (
                <div className="animate-pulse bg-green-300 h-8 w-20 rounded"></div>
              ) : (
                `$${(mapStats.avgPrice/1000).toFixed(0)}K`
              )}
            </div>
            <div className="text-xs text-green-600 font-medium">Precio Prom.</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
            <div className="text-2xl font-bold text-orange-700">
              {loading ? (
                <div className="animate-pulse bg-orange-300 h-8 w-12 rounded"></div>
              ) : (
                mapStats.activeLeads
              )}
            </div>
            <div className="text-xs text-orange-600 font-medium">Leads Activos</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <div className="text-2xl font-bold text-purple-700">
              {loading ? (
                <div className="animate-pulse bg-purple-300 h-8 w-16 rounded"></div>
              ) : (
                `${(mapStats.avgROI / 100000000).toFixed(1)}%`
              )}
            </div>
            <div className="text-xs text-purple-600 font-medium">ROI Promedio</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
          <Filter className="w-5 h-5 mr-3 text-orange-600" />
          Filtros y Segmentación
        </h3>

        {/* Segmentación Visual - Prioridad Alta */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-orange-800 flex items-center">
              🎨 Colorear Mapa
            </label>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-sm"></div>
          </div>
          <select
            value={colorBy}
            onChange={(e) => setColorBy(e.target.value as 'fuente' | 'tipo_operacion' | 'tipo_propiedad')}
            className="w-full p-3 border border-orange-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 bg-white shadow-sm font-medium hover:border-orange-400 transition-colors"
          >
            <option value="fuente">🏢 Por Fuente de Datos</option>
            <option value="tipo_operacion">💰 Por Tipo de Operación</option>
            <option value="tipo_propiedad">🏠 Por Tipo de Propiedad</option>
          </select>
        </div>

        {/* Filtros de Búsqueda Organizados */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {/* Distrito */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-blue-600" />
                Distrito
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="Todos">Todos</option>
                {districtsList.map(district => (
                  <option key={district.name} value={district.name}>
                    {district.name} ({district.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Fuente */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <Building2 className="w-3 h-3 mr-1 text-purple-600" />
                Fuente
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              >
                <option value="Todos">Todas</option>
                {filterOptions?.sources?.map((source: any) => (
                  <option key={source.name} value={source.name}>
                    {source.name} ({source.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Tipo de Operación */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-3 h-3 mr-1 text-green-600" />
                Operación
              </label>
              <select
                value={selectedOperationType}
                onChange={(e) => setSelectedOperationType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="Todos">Todas</option>
                {filterOptions?.operationTypes?.map((type: any) => (
                  <option key={type.name} value={type.name}>
                    {type.name} ({type.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Propiedad */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <Building2 className="w-3 h-3 mr-1 text-amber-600" />
                Tipo
              </label>
              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
              >
                <option value="Todos">Todos</option>
                {filterOptions?.propertyTypes?.map((type: any) => (
                  <option key={type.name} value={type.name}>
                    {type.name} ({type.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Rango de Precios */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm">
          <label className="block text-sm font-semibold text-green-800 mb-3 flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            💰 Rango de Precios
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-green-700 mb-1 font-medium">Mínimo</label>
              <input
                type="number"
                placeholder="S/ 0"
                value={priceRange.min || ''}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || null })}
                className="w-full p-2 border border-green-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs text-green-700 mb-1 font-medium">Máximo</label>
              <input
                type="number"
                placeholder="S/ ∞"
                value={priceRange.max || ''}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || null })}
                className="w-full p-2 border border-green-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Botón para limpiar filtros */}
        <div className="mb-6">
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDistrict('Todos');
              setPriceRange({ min: null, max: null });
              setSelectedSource('Todos');
              setSelectedOperationType('Todos');
              setSelectedPropertyType('Todos');
            }}
            className="w-full px-4 py-3 text-sm bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-700 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm border border-red-200 hover:border-red-300 font-medium"
          >
            <Filter className="w-4 h-4" />
            <span>🧹 Limpiar Todos los Filtros</span>
          </button>
        </div>

        {/* Leyenda de colores dinámica */}
        <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl shadow-sm">
          <div className="text-sm font-semibold text-indigo-800 mb-3 flex items-center">
            🎯 Leyenda de Colores ({colorBy.replace('_', ' ')})
          </div>
          <div className="space-y-2 text-xs">
            {colorBy === 'fuente' && (
              <>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-orange-500 shadow-sm border border-orange-600"></div>
                  <span className="font-medium text-gray-700">urbania.pe</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-gray-500 shadow-sm border border-gray-600"></div>
                  <span className="font-medium text-gray-700">Otras fuentes</span>
                </div>
              </>
            )}
            {colorBy === 'tipo_operacion' && (
              <>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm border border-emerald-600"></div>
                  <span className="font-medium text-gray-700">Venta</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm border border-blue-600"></div>
                  <span className="font-medium text-gray-700">Alquiler</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-gray-500 shadow-sm border border-gray-600"></div>
                  <span className="font-medium text-gray-700">Otros</span>
                </div>
              </>
            )}
            {colorBy === 'tipo_propiedad' && (
              <>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-violet-500 shadow-sm border border-violet-600"></div>
                  <span className="font-medium text-gray-700">Departamento</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-amber-500 shadow-sm border border-amber-600"></div>
                  <span className="font-medium text-gray-700">Casa</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-sm border border-cyan-600"></div>
                  <span className="font-medium text-gray-700">Oficina</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-lime-500 shadow-sm border border-lime-600"></div>
                  <span className="font-medium text-gray-700">Terreno</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-lg">
                  <div className="w-4 h-4 rounded-full bg-gray-500 shadow-sm border border-gray-600"></div>
                  <span className="font-medium text-gray-700">Otros</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Estado actual de filtros */}
        {(searchTerm || selectedDistrict !== 'Todos' || priceRange.min || priceRange.max || selectedSource !== 'Todos' || selectedOperationType !== 'Todos' || selectedPropertyType !== 'Todos') && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg shadow-sm">
            <div className="text-xs font-semibold text-blue-800 mb-2 flex items-center">
              ✅ Filtros Activos:
            </div>
            <div className="space-y-1 text-xs text-blue-700">
              {searchTerm && <div className="bg-white/50 p-1 rounded">• Búsqueda: "{searchTerm}"</div>}
              {selectedDistrict !== 'Todos' && <div className="bg-white/50 p-1 rounded">• Distrito: {selectedDistrict}</div>}
              {selectedSource !== 'Todos' && <div className="bg-white/50 p-1 rounded">• Fuente: {selectedSource}</div>}
              {selectedOperationType !== 'Todos' && <div className="bg-white/50 p-1 rounded">• Operación: {selectedOperationType}</div>}
              {selectedPropertyType !== 'Todos' && <div className="bg-white/50 p-1 rounded">• Tipo: {selectedPropertyType}</div>}
              {(priceRange.min || priceRange.max) && (
                <div className="bg-white/50 p-1 rounded">• Precio: {priceRange.min ? `S/ ${priceRange.min.toLocaleString()}` : 'Min'} - {priceRange.max ? `S/ ${priceRange.max.toLocaleString()}` : 'Max'}</div>
              )}
            </div>
          </div>
        )}
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
