"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import dinámico del mapa
const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });
const GeoLayer = dynamic(() => import("../../components/map/GeoLayer"), { ssr: false });

export default function JefeDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const teamStats = {
    totalAgents: 15,
    activeAgents: 13,
    totalSales: 28,
    monthlyRevenue: 1250000,
    avgClosingDays: 18,
    topAgent: 'María González'
  };

  const agents = [
    { id: 1, name: 'María González', sales: 8, revenue: 340000, score: 92 },
    { id: 2, name: 'Carlos Ruiz', sales: 6, revenue: 280000, score: 88 },
    { id: 3, name: 'Ana López', sales: 5, revenue: 220000, score: 85 },
    { id: 4, name: 'Pedro Sánchez', sales: 4, revenue: 180000, score: 78 },
    { id: 5, name: 'Laura Torres', sales: 3, revenue: 150000, score: 75 }
  ];

  const leads = [
    { id: 1, name: 'Roberto Mendoza', agent: 'Sin asignar', value: 450000, source: 'Portal Web' },
    { id: 2, name: 'Patricia Vega', agent: 'María González', value: 320000, source: 'Redes Sociales' },
    { id: 3, name: 'Diego Castro', agent: 'Carlos Ruiz', value: 280000, source: 'Referido' }
  ];

  const properties = [
    { id: 1, title: 'Dept 4 hab San Isidro', agent: 'María González', status: 'Vendida', price: 520000 },
    { id: 2, title: 'Casa Barranco', agent: 'Carlos Ruiz', status: 'En negociación', price: 380000 },
    { id: 3, title: 'Oficina Miraflores', agent: 'Ana López', status: 'Activa', price: 650000 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Jefe de Agentes</h1>
                <p className="text-sm text-gray-600">Inmobiliaria Del Sol - Gestión de Equipo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
                Nuevo Agente
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Reporte Mensual
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Resumen' },
              { id: 'agents', label: 'Agentes' },
              { id: 'leads', label: 'Leads Corporativos' },
              { id: 'properties', label: 'Propiedades' },
              { id: 'map', label: 'Mapa de Rendimiento' },
              { id: 'analytics', label: 'Análisis' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <>
            {/* KPIs Generales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-blue-600 text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Agentes Activos</p>
                    <p className="text-2xl font-bold text-gray-900">{teamStats.activeAgents}/{teamStats.totalAgents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-green-600 text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ventas Este Mes</p>
                    <p className="text-2xl font-bold text-gray-900">{teamStats.totalSales}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-purple-600 text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ingresos Mensuales</p>
                    <p className="text-2xl font-bold text-gray-900">S/ {teamStats.monthlyRevenue.toLocaleString('es-PE')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <span className="text-orange-600 text-2xl">⭐</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Días Promedio Cierre</p>
                    <p className="text-2xl font-bold text-gray-900">{teamStats.avgClosingDays}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ranking de Agentes */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4">Ranking de Agentes - Este Mes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ventas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingresos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score Ecosistema
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {agents.map((agent, index) => (
                      <tr key={agent.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{agent.name}</div>
                              {index === 0 && <span className="text-xs text-green-600">🏆 Top Performer</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {agent.sales}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          S/ {agent.revenue.toLocaleString('es-PE')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            agent.score >= 90 ? 'bg-green-100 text-green-800' :
                            agent.score >= 80 ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {agent.score}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Ver Detalle</button>
                          <button className="text-green-600 hover:text-green-900">Contactar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alertas y Acciones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-red-600">🚨 Alertas Críticas</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800">3 agentes con tasa de conversión &lt; 10%</p>
                    <p className="text-xs text-red-600 mt-1">Necesitan capacitación urgente</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">12 leads sin asignar hace &gt;24h</p>
                    <p className="text-xs text-yellow-600 mt-1">Asignar automáticamente</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-green-600">✅ Acciones Recomendadas</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Enviar felicitación a María González</p>
                    <p className="text-xs text-green-600 mt-1">8 ventas este mes - récord histórico</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Reasignar zona sur a Carlos Ruiz</p>
                    <p className="text-xs text-blue-600 mt-1">Mejor desempeño en esa área</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'agents' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Gestión de Agentes</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Invitar Nuevo Agente
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div key={agent.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{agent.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{agent.name}</h4>
                      <p className="text-sm text-gray-600">Score: {agent.score}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Ventas:</span>
                      <span className="font-medium">{agent.sales}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Ingresos:</span>
                      <span className="font-medium">S/ {agent.revenue.toLocaleString('es-PE')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Ver Perfil</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">CRM Corporativo - Leads</h3>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Asignar Leads
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agente Asignado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Estimado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fuente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          lead.agent === 'Sin asignar' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {lead.agent}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        S/ {lead.value.toLocaleString('es-PE')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Asignar</button>
                        <button className="text-green-600 hover:text-green-900">Ver Detalle</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Propiedades Corporativas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{property.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      property.status === 'Vendida' ? 'bg-green-100 text-green-800' :
                      property.status === 'En negociación' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Agente: {property.agent}</p>
                  <p className="text-2xl font-bold text-orange-600 mb-2">
                    S/ {property.price.toLocaleString('es-PE')}
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">Ver Historial</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Mapa de Rendimiento por Distrito</h3>
            <div className="h-96 rounded-lg overflow-hidden mb-4">
              <Map center={[-12.0464, -77.0428]} zoom={11} className="h-full">
                {/* Capa de distritos con colores según rendimiento */}
                <GeoLayer
                  url="/api/map/districts-performance"
                  style={{
                    fillOpacity: 0.6,
                    weight: 2
                  }}
                  hoverStyle={{
                    weight: 3,
                    fillOpacity: 0.8
                  }}
                  popupFields={[
                    { key: "district", label: "Distrito" },
                    { key: "sales", label: "Ventas" },
                    { key: "avgPrice", label: "Precio Promedio" },
                    { key: "performance", label: "Rendimiento" }
                  ]}
                />
              </Map>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">Alta</div>
                <div className="text-sm text-green-700">Rendimiento Excelente</div>
                <div className="text-xs text-green-600 mt-1">San Isidro, Miraflores</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">Media</div>
                <div className="text-sm text-yellow-700">Rendimiento Regular</div>
                <div className="text-xs text-yellow-600 mt-1">Surco, La Molina</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">Baja</div>
                <div className="text-sm text-red-700">Oportunidad de Crecimiento</div>
                <div className="text-xs text-red-600 mt-1">Callao, Ate</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Análisis de Ecosistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Fuentes de Leads</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Portal Web</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Redes Sociales</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Referidos</span>
                    <span className="font-medium">25%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Conversión por Distrito</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>San Isidro</span>
                    <span className="font-medium text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Miraflores</span>
                    <span className="font-medium text-blue-600">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Barranco</span>
                    <span className="font-medium text-yellow-600">52%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}