"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import dinámico del mapa
const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });
const PointsLayer = dynamic(() => import("../../components/map/PointsLayer"), { ssr: false });

export default function ClientDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [interestLevel] = useState('Alto'); // Simulado
  const [agentAssigned] = useState({
    name: "Ana García",
    phone: "+51 999 123 456",
    status: "Disponible",
    photo: "/icons/marker-orange.png"
  });

  const [savedProperties] = useState([
    {
      id: 1,
      title: 'Departamento en San Isidro',
      price: 250000,
      bedrooms: 3,
      location: 'San Isidro',
      saved: '2 días atrás',
      smartScore: 85
    },
    {
      id: 2,
      title: 'Casa en Miraflores',
      price: 450000,
      bedrooms: 4,
      location: 'Miraflores',
      saved: '1 semana atrás',
      smartScore: 92
    }
  ]);

  const [activeProcesses] = useState([
    {
      id: 1,
      property: 'Departamento San Isidro',
      phase: 'Documentación',
      progress: 60,
      nextStep: 'Subir certificado de ingresos',
      dueDate: '2025-09-25'
    },
    {
      id: 2,
      property: 'Casa Miraflores',
      phase: 'Negociación',
      progress: 30,
      nextStep: 'Respuesta a contraoferta',
      dueDate: '2025-09-24'
    }
  ]);

  const [documents] = useState([
    { id: 1, name: 'DNI.pdf', type: 'Identificación', status: 'Aprobado', date: '2025-09-20' },
    { id: 2, name: 'Boletas de pago.pdf', type: 'Ingresos', status: 'Pendiente', date: '2025-09-22' },
    { id: 3, name: 'Carta laboral.pdf', type: 'Ingresos', status: 'Aprobado', date: '2025-09-21' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Mi Dashboard</h1>
              <p className="text-sm text-gray-500">Portal del Cliente SMARTCORE BI</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Juan Pérez</div>
              <div className="text-xs text-gray-500">Cliente Premium</div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'properties', label: 'Mis Propiedades', icon: '🏠' },
              { id: 'processes', label: 'Trámites', icon: '📋' },
              { id: 'documents', label: 'Documentos', icon: '📄' },
              { id: 'agent', label: 'Mi Agente', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Nivel de Interés</p>
                    <p className="text-2xl font-bold text-gray-900">{interestLevel}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">💾</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Propiedades Guardadas</p>
                    <p className="text-2xl font-bold text-gray-900">{savedProperties.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Trámites Activos</p>
                    <p className="text-2xl font-bold text-gray-900">{activeProcesses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">🏦</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Crédito Pre-Aprobado</p>
                    <p className="text-lg font-bold text-gray-900">S/ 350,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">¿Necesitas ayuda?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span className="text-2xl">👤</span>
                  <div className="text-left">
                    <div className="font-medium">Conectar con Agente</div>
                    <div className="text-sm text-gray-500">Asignación automática</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span className="text-2xl">🔍</span>
                  <div className="text-left">
                    <div className="font-medium">Buscar Propiedades</div>
                    <div className="text-sm text-gray-500">Portal inteligente</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span className="text-2xl">💬</span>
                  <div className="text-left">
                    <div className="font-medium">Soporte 24/7</div>
                    <div className="text-sm text-gray-500">Chat en vivo</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Servicios del Ecosistema */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Servicios Disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300">
                  <span className="text-2xl">🏦</span>
                  <div className="text-left">
                    <div className="font-medium">Crédito Pre-Aprobado</div>
                    <div className="text-sm text-gray-500">BBVA & Interbank</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300">
                  <span className="text-2xl">💎</span>
                  <div className="text-left">
                    <div className="font-medium">Tasación Profesional</div>
                    <div className="text-sm text-gray-500">TasaPerú - 2 horas</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300">
                  <span className="text-2xl">🚚</span>
                  <div className="text-left">
                    <div className="font-medium">Mudanza Confiable</div>
                    <div className="text-sm text-gray-500">Mudanzas Rápida</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300">
                  <span className="text-2xl">🏠</span>
                  <div className="text-left">
                    <div className="font-medium">Seguro de Hogar</div>
                    <div className="text-sm text-gray-500">Mapfre & La Positiva</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300">
                  <span className="text-2xl">📜</span>
                  <div className="text-left">
                    <div className="font-medium">Notaría Digital</div>
                    <div className="text-sm text-gray-500">Firma electrónica</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300">
                  <span className="text-2xl">💰</span>
                  <div className="text-left">
                    <div className="font-medium">SMARTCORE Pay</div>
                    <div className="text-sm text-gray-500">Billetera integrada</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mis Propiedades Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Mis Propiedades Guardadas</h2>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Buscar Más Propiedades
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        SMART {property.smartScore}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600 mb-2">
                      S/ {property.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-2">{property.bedrooms} dormitorios • {property.location}</p>
                    <p className="text-sm text-gray-500 mb-4">Guardado {property.saved}</p>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">
                        Ver Detalles
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50">
                        Comparar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trámites Tab */}
        {activeTab === 'processes' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mis Trámites Activos</h2>

            <div className="space-y-4">
              {activeProcesses.map((process) => (
                <div key={process.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{process.property}</h3>
                      <p className="text-gray-600">Fase: {process.phase}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {process.progress}%
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progreso</span>
                      <span>{process.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${process.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Próximo paso:</p>
                      <p className="text-sm text-gray-600">{process.nextStep}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Vence:</p>
                      <p className="text-sm font-medium text-red-600">{process.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documentos Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Mis Documentos</h2>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Subir Documento
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{doc.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          doc.status === 'Aprobado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {doc.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <button className="text-orange-600 hover:text-orange-900 mr-4">
                          Ver
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Descargar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mi Agente Tab */}
        {activeTab === 'agent' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mi Agente Asignado</h2>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{agentAssigned.name}</h3>
                  <p className="text-gray-600">{agentAssigned.phone}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    {agentAssigned.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100">
                  <span className="text-green-600">📞</span>
                  <span className="text-green-700 font-medium">Llamar</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100">
                  <span className="text-blue-600">💬</span>
                  <span className="text-blue-700 font-medium">Chat</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100">
                  <span className="text-purple-600">📅</span>
                  <span className="text-purple-700 font-medium">Agendar Cita</span>
                </button>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Historial de Comunicación</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 text-sm">👤</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Te envié 3 propiedades que coinciden con tu búsqueda en San Isidro.</p>
                      <p className="text-xs text-gray-500">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">👤</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">¿Te interesa programar una visita para mañana?</p>
                      <p className="text-xs text-gray-500">Hace 1 día</p>
                    </div>
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