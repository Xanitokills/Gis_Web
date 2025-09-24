"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import dinámico del mapa
const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });
const PointsLayer = dynamic(() => import("../../components/map/PointsLayer"), { ssr: false });

export default function AgentDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tasks = [
    { id: 1, title: 'Llamar a Juan Pérez', time: '10:00 AM', priority: 'high' },
    { id: 2, title: 'Mostrar propiedad en Miraflores', time: '2:00 PM', priority: 'medium' },
    { id: 3, title: 'Enviar propuesta a María García', time: '4:00 PM', priority: 'low' }
  ];

  const leads = [
    { id: 1, name: 'Ana López', status: 'Interesado', lastActivity: 'Hace 2 horas', value: 180000 },
    { id: 2, name: 'Carlos Ruiz', status: 'Contactado', lastActivity: 'Hace 1 día', value: 250000 },
    { id: 3, name: 'Sofia Mendoza', status: 'Negociando', lastActivity: 'Hace 30 min', value: 320000 }
  ];

  const properties = [
    { id: 1, title: 'Dept 3 hab San Isidro', price: 280000, status: 'Activa', views: 45 },
    { id: 2, title: 'Casa familiar Barranco', price: 450000, status: 'Vendida', views: 120 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Agente</h1>
                <p className="text-sm text-gray-600">Juan Silva - Inmobiliaria Del Sol</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Smart Capture
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Nuevo Lead
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
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'leads', label: 'Leads' },
              { id: 'properties', label: 'Propiedades' },
              { id: 'map', label: 'Mapa' },
              { id: 'crm', label: 'CRM' },
              { id: 'reports', label: 'Reportes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
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
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* KPIs */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-2xl">📈</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Leads Activos</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Comisiones Este Mes</p>
                  <p className="text-2xl font-bold text-gray-900">S/ 8,500</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-2xl">🏠</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Propiedades Activas</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <span className="text-orange-600 text-2xl">⭐</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tasa de Cierre</p>
                  <p className="text-2xl font-bold text-gray-900">68%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tareas del Día */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Tareas de Hoy</h3>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.time}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">Completar</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Leads Calientes */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Leads de Alto Interés</h3>
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.status} • {lead.lastActivity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-orange-600">S/ {lead.value.toLocaleString('es-PE')}</p>
                      <button className="text-sm text-blue-600 hover:text-blue-800">Contactar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Gestión de Leads</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Nuevo Lead
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Última Actividad
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          lead.status === 'Negociando' ? 'bg-green-100 text-green-800' :
                          lead.status === 'Interesado' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        S/ {lead.value.toLocaleString('es-PE')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.lastActivity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                        <button className="text-green-600 hover:text-green-900">Contactar</button>
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Mis Propiedades</h3>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Publicar Nueva
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{property.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      property.status === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600 mb-2">
                    S/ {property.price.toLocaleString('es-PE')}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">{property.views} visualizaciones</p>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">Ver Detalles</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Mapa de Propiedades y Leads</h3>
            <div className="h-96 rounded-lg overflow-hidden">
              <Map center={[-12.0464, -77.0428]} zoom={12} className="h-full">
                {/* Propiedades del agente */}
                <PointsLayer
                  url="/api/map/agent-properties"
                  popupFields={[
                    { key: "title", label: "Propiedad" },
                    { key: "price", label: "Precio" },
                    { key: "status", label: "Estado" },
                    { key: "views", label: "Visualizaciones" }
                  ]}
                  renderAs="marker"
                  iconUrl="/icons/marker-orange.png"
                  autoFit={true}
                />
                {/* Leads activos */}
                <PointsLayer
                  url="/api/map/agent-leads"
                  popupFields={[
                    { key: "name", label: "Cliente" },
                    { key: "value", label: "Valor Estimado" },
                    { key: "status", label: "Estado" }
                  ]}
                  renderAs="circle"
                  circleStyle={{
                    color: '#10b981',
                    fillColor: '#10b981',
                    fillOpacity: 0.6,
                    radius: 8
                  }}
                />
              </Map>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Mis Propiedades</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Leads Activos</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">CRM - Gestión de Clientes</h3>
            <p className="text-gray-600">Funcionalidad completa de CRM integrada próximamente.</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Reportes y KPIs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">VTC (Valor Total del Cliente)</h4>
                <p className="text-2xl font-bold text-green-600">S/ 3,120</p>
                <p className="text-sm text-gray-600">Comisión venta + servicios</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Tasa de Conversión</h4>
                <p className="text-2xl font-bold text-blue-600">68%</p>
                <p className="text-sm text-gray-600">Leads → Cierres</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}