"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import dinámico del mapa
const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });
const PointsLayer = dynamic(() => import("../../components/map/PointsLayer"), { ssr: false });

export default function SearchPropertiesPage() {
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    propertyType: ''
  });

  const [properties] = useState([
    {
      id: 1,
      title: 'Departamento en San Isidro',
      price: 250000,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      location: 'San Isidro',
      image: '/icons/marker-orange.png',
      smartScore: 85
    },
    // Más propiedades de ejemplo
  ]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Sidebar de filtros */}
      <aside className="hidden md:flex md:w-96 md:flex-col bg-white border-r border-gray-200 shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Buscar Propiedades</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Ej: San Isidro"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio Mín
                </label>
                <input
                  type="number"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                  placeholder="S/"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio Máx
                </label>
                <input
                  type="number"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                  placeholder="S/"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dormitorios
              </label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Todos</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Propiedad
              </label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Todos</option>
                <option value="departamento">Departamento</option>
                <option value="casa">Casa</option>
                <option value="oficina">Oficina</option>
              </select>
            </div>

            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
              Buscar
            </button>
          </div>

          {/* Servicios del Ecosistema */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Servicios Disponibles</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span className="text-2xl">🏦</span>
                <div className="text-left">
                  <div className="font-medium">Crédito Preaprobado</div>
                  <div className="text-sm text-gray-500">BBVA - Hasta S/ 500,000</div>
                </div>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span className="text-2xl">💎</span>
                <div className="text-left">
                  <div className="font-medium">Tasación Profesional</div>
                  <div className="text-sm text-gray-500">TasaPerú - 2 horas</div>
                </div>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span className="text-2xl">🚚</span>
                <div className="text-left">
                  <div className="font-medium">Mudanza Confiable</div>
                  <div className="text-sm text-gray-500">Mudanzas Rápida - S/ 150</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mapa y resultados */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Buscar Propiedades</h1>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              Publicar Propiedad
            </button>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="flex-1 flex">
          {/* Mapa */}
          <div className="flex-1 relative">
            <Map center={[-12.0464, -77.0428]} zoom={12} className="h-full">
              <PointsLayer
                url="/api/map/properties"
                popupFields={[
                  { key: "title", label: "Propiedad" },
                  { key: "price", label: "Precio" },
                  { key: "district", label: "Distrito" },
                  { key: "bedrooms", label: "Dormitorios" }
                ]}
                renderAs="marker"
                iconUrl="/icons/marker-orange.png"
                autoFit={true}
              />
            </Map>
          </div>

          {/* Panel de resultados */}
          <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Resultados ({properties.length})</h3>
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gray-200 rounded mb-3 relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
                        SMARTSCORE™ {property.smartScore}
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm mb-2">{property.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                      <span>{property.bedrooms} dorm</span>
                      <span>{property.bathrooms} baños</span>
                      <span>{property.area} m²</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-600">
                        S/ {property.price.toLocaleString('es-PE')}
                      </span>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                        Ver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}