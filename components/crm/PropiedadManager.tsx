'use client';

import React, { useState } from 'react';
import { X, Home, Edit, Trash2, Eye, Share2, BarChart3, Settings, AlertCircle } from 'lucide-react';

interface PropiedadManagerProps {
  propiedad: any;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  darkMode: boolean;
}

export default function PropiedadManager({ propiedad, onClose, onEdit, onDelete, darkMode }: PropiedadManagerProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'estadisticas' | 'configuracion'>('general');

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
        
        <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Home className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Gestionar Propiedad</h2>
              <p className="text-blue-100 text-sm">{propiedad?.direccion || `Propiedad #${propiedad?.id}`}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b`}>
          <div className="flex">
            {[
              { id: 'general', label: 'General', icon: Home },
              { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
              { id: 'configuracion', label: 'Configuración', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? darkMode ? 'text-blue-400' : 'text-blue-600'
                    : darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4 inline mr-2" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Estado
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      propiedad?.estado === 'activa'
                        ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                    }`}>
                      {propiedad?.estado || 'Activa'}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Fase Actual
                  </div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {propiedad?.fase || 'Preparación'}
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Acciones Rápidas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onEdit}
                    className={`p-3 rounded-lg border font-medium text-sm transition-colors ${
                      darkMode
                        ? 'bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30'
                        : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    <Edit className="w-4 h-4 inline mr-2" />
                    Editar Información
                  </button>
                  <button
                    className={`p-3 rounded-lg border font-medium text-sm transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    Vista Previa
                  </button>
                  <button
                    className={`p-3 rounded-lg border font-medium text-sm transition-colors ${
                      darkMode
                        ? 'bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30'
                        : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    <Share2 className="w-4 h-4 inline mr-2" />
                    Compartir
                  </button>
                  <button
                    onClick={onDelete}
                    className={`p-3 rounded-lg border font-medium text-sm transition-colors ${
                      darkMode
                        ? 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30'
                        : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    Archivar
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'estadisticas' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Visitas', value: '24', color: 'blue' },
                  { label: 'Leads', value: '12', color: 'green' },
                  { label: 'Ofertas', value: '3', color: 'purple' },
                ].map((stat) => (
                  <div key={stat.label} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                    <div className={`text-3xl font-bold text-${stat.color}-500`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex gap-3">
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div>
                    <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                      Rendimiento de la Propiedad
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                      Esta propiedad tiene un rendimiento por encima del promedio con un 45% de tasa de conversión de visitas a leads.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'configuracion' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Configuración de Publicación
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Publicar en portales inmobiliarios
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Compartir en redes sociales automáticamente
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Permitir visitas sin cita previa
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-4 border-t flex justify-end`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg border font-medium ${
              darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'
            }`}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
