"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import dinámico del mapa
const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });
const GeoLayer = dynamic(() => import("../../components/map/GeoLayer"), { ssr: false });

type DashboardMetrics = {
  totalProperties: number;
  averagePrice: number;
  activeLeads: number;
  roiPercentage: number;
  newPropertiesThisMonth: number;
};

export default function SuperDashboardPage() {
  const [activeTab, setActiveTab] = useState('ecosystem');
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch datos reales
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setMetrics(data.metrics);
        }
      } catch (error) {
        console.error('Error al obtener métricas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const ecosystemMetrics = metrics ? {
    totalUsers: 15420, // Este se mantiene como simulado
    activeTransactions: metrics.activeLeads,
    totalServicesActivated: 1247, // Este se mantiene como simulado
    monthlyRevenue: 287000, // Este se mantiene como simulado
    smartMarketIndex: (metrics.roiPercentage / 100).toFixed(2),
    certifiedProperties: metrics.totalProperties,
    avgPrice: metrics.averagePrice
  } : {
    totalUsers: 0,
    activeTransactions: 0,
    totalServicesActivated: 0,
    monthlyRevenue: 0,
    smartMarketIndex: '0.00',
    certifiedProperties: 0,
    avgPrice: 0
  };

  const integrations = [
    { name: 'BBVA', status: 'active', transactions: 45, revenue: 18000 },
    { name: 'Interbank', status: 'active', transactions: 32, revenue: 12800 },
    { name: 'TasaPerú', status: 'active', transactions: 67, revenue: 13400 },
    { name: 'Mudanzas Rápida', status: 'active', transactions: 28, revenue: 4200 },
    { name: 'Sunarp', status: 'active', transactions: 156, revenue: 0 },
    { name: 'Mapfre', status: 'warning', transactions: 12, revenue: 960 }
  ];

  const alerts = [
    { type: 'critical', message: 'Mudanza XYZ recibió 3 quejas esta semana', action: 'Revisar y reemplazar' },
    { type: 'warning', message: 'Tasa de aprobación BBVA bajó al 68%', action: 'Contactar banco' },
    { type: 'info', message: 'Nuevo índice SmartMarket™ disponible', action: 'Revisar datos' }
  ];

  const reports = [
    { name: 'Reporte Mensual Ecosistema', date: '2025-01-31', status: 'generated' },
    { name: 'Análisis de Mercado Lima', date: '2025-01-28', status: 'generated' },
    { name: 'Certificación SMARTCORE', date: '2025-01-25', status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Super Usuario</h1>
                <p className="text-sm text-gray-600">Arquitecto del Ecosistema SMARTCORE BI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Generar Reporte
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
                Configurar APIs
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
              { id: 'ecosystem', label: 'Ecosistema' },
              { id: 'integrations', label: 'Integraciones' },
              { id: 'map', label: 'Mapa Inteligente' },
              { id: 'analytics', label: 'Análisis' },
              { id: 'certification', label: 'Certificación' },
              { id: 'reports', label: 'Reportes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
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
        {activeTab === 'ecosystem' && (
          <>
            {/* KPIs del Ecosistema */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-blue-600 text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <span className="animate-pulse bg-gray-300 h-8 w-20 block rounded"></span>
                      ) : (
                        ecosystemMetrics.totalUsers.toLocaleString()
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-green-600 text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Precio Promedio</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <span className="animate-pulse bg-gray-300 h-8 w-32 block rounded"></span>
                      ) : (
                        `S/ ${ecosystemMetrics.avgPrice.toLocaleString('es-PE')}`
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-purple-600 text-2xl">🔗</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Servicios Activados</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <span className="animate-pulse bg-gray-300 h-8 w-16 block rounded"></span>
                      ) : (
                        ecosystemMetrics.totalServicesActivated
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <span className="text-orange-600 text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">SmartMarket Index™</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <span className="animate-pulse bg-gray-300 h-8 w-12 block rounded"></span>
                      ) : (
                        ecosystemMetrics.smartMarketIndex
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-yellow-600 text-2xl">🏠</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Propiedades Certificadas</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <span className="animate-pulse bg-gray-300 h-8 w-20 block rounded"></span>
                      ) : (
                        ecosystemMetrics.certifiedProperties.toLocaleString()
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <span className="text-red-600 text-2xl">⚡</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Leads Activos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? (
                        <span className="animate-pulse bg-gray-300 h-8 w-16 block rounded"></span>
                      ) : (
                        ecosystemMetrics.activeTransactions
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas Críticas */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-600">🚨 Alertas del Ecosistema</h3>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${
                        alert.type === 'critical' ? 'text-red-800' :
                        alert.type === 'warning' ? 'text-yellow-800' :
                        'text-blue-800'
                      }`}>
                        {alert.message}
                      </p>
                      <button className={`px-3 py-1 text-sm rounded ${
                        alert.type === 'critical' ? 'bg-red-600 text-white hover:bg-red-700' :
                        alert.type === 'warning' ? 'bg-yellow-600 text-white hover:bg-yellow-700' :
                        'bg-blue-600 text-white hover:bg-blue-700'
                      }`}>
                        {alert.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa de Zonas Calientes */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Mapa de Zonas Calientes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Zona Verde - Alta Demanda</h4>
                  <p className="text-sm text-green-600">San Isidro, Miraflores</p>
                  <p className="text-lg font-bold text-green-800 mt-2">¡Vender Ahora!</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Zona Roja - Sobreoferta</h4>
                  <p className="text-sm text-red-600">Callao, Ate</p>
                  <p className="text-lg font-bold text-red-800 mt-2">Ajustar Precios</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Zona Naranja - Burbuja</h4>
                  <p className="text-sm text-orange-600">Surco, La Molina</p>
                  <p className="text-lg font-bold text-orange-800 mt-2">Monitorear</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'integrations' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Gestión de Integraciones</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Nueva Integración
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Socio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transacciones
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ingresos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {integrations.map((integration, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{integration.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          integration.status === 'active' ? 'bg-green-100 text-green-800' :
                          integration.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {integration.status === 'active' ? 'Activo' :
                           integration.status === 'warning' ? 'Advertencia' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {integration.transactions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        S/ {integration.revenue.toLocaleString('es-PE')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Configurar</button>
                        <button className="text-red-600 hover:text-red-900">Desactivar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Mapa Inteligente - SmartMarket Index™</h3>
            <div className="h-96 rounded-lg overflow-hidden mb-4">
              <Map center={[-12.0464, -77.0428]} zoom={11} className="h-full">
                {/* Capa SmartMarket Index */}
                <GeoLayer
                  url="/api/map/smartmarket-index"
                  style={{
                    fillOpacity: 0.7,
                    weight: 2
                  }}
                  hoverStyle={{
                    weight: 3,
                    fillOpacity: 0.9
                  }}
                  popupFields={[
                    { key: "district", label: "Distrito" },
                    { key: "smartMarketIndex", label: "SmartMarket Index™" },
                    { key: "avgPrice", label: "Precio Promedio" },
                    { key: "demandLevel", label: "Nivel de Demanda" },
                    { key: "bubbleRisk", label: "Riesgo Burbuja" }
                  ]}
                />
              </Map>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-green-100 rounded-lg border-2 border-green-300">
                <div className="text-lg font-bold text-green-800">Zona Verde</div>
                <div className="text-sm text-green-700">Demanda Alta</div>
                <div className="text-xs text-green-600 mt-1">¡Vender Ahora!</div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg border-2 border-blue-300">
                <div className="text-lg font-bold text-blue-800">Zona Azul</div>
                <div className="text-sm text-blue-700">Estable</div>
                <div className="text-xs text-blue-600 mt-1">Monitorear</div>
              </div>
              <div className="text-center p-3 bg-orange-100 rounded-lg border-2 border-orange-300">
                <div className="text-lg font-bold text-orange-800">Zona Naranja</div>
                <div className="text-sm text-orange-700">Sobreprecios</div>
                <div className="text-xs text-orange-600 mt-1">Riesgo Moderado</div>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg border-2 border-red-300">
                <div className="text-lg font-bold text-red-800">Zona Roja</div>
                <div className="text-sm text-red-700">Sobreoferta</div>
                <div className="text-xs text-red-600 mt-1">Ajustar Precios</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">SmartMarket Index™ Actual: {ecosystemMetrics.smartMarketIndex}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Demanda vs Oferta:</span> 1.23 (Equilibrado)
                </div>
                <div>
                  <span className="font-medium">Precios Reales:</span> S/ {ecosystemMetrics.avgPrice.toLocaleString('es-PE')}
                </div>
                <div>
                  <span className="font-medium">Riesgo Burbuja:</span> Bajo
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Análisis Predictivo del Ecosistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Predicción de Demanda</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lima Norte</span>
                    <span className="font-medium text-green-600">+15% en 3 meses</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lima Sur</span>
                    <span className="font-medium text-red-600">-8% en 3 meses</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lima Este</span>
                    <span className="font-medium text-blue-600">Estable</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Riesgos de Burbuja</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Departamentos 3 hab</span>
                    <span className="font-medium text-orange-600">Alto riesgo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Casas familiares</span>
                    <span className="font-medium text-yellow-600">Riesgo moderado</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oficinas</span>
                    <span className="font-medium text-green-600">Bajo riesgo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certification' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Sistema de Certificación SMARTCORE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2 text-green-600">✅ Propiedades Certificadas</h4>
                <p className="text-2xl font-bold text-green-600 mb-2">{ecosystemMetrics.certifiedProperties}</p>
                <p className="text-sm text-gray-600">Cumplen estándares de transparencia</p>
                <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Ver Lista Completa
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-600">🔄 En Proceso de Auditoría</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">156</p>
                <p className="text-sm text-gray-600">Propiedades siendo verificadas</p>
                <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Gestionar Auditorías
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Reportes del Ecosistema</h3>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Generar Nuevo Reporte
              </button>
            </div>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-gray-600">Generado: {report.date}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report.status === 'generated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status === 'generated' ? 'Disponible' : 'Pendiente'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">Descargar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}