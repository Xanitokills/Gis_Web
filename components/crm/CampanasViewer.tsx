'use client';

import React, { useState } from 'react';
import { X, TrendingUp, Eye, Users, MousePointerClick, Share2, Calendar, BarChart3, Target, DollarSign } from 'lucide-react';

interface CampañasViewerProps {
  propiedadId: number;
  onClose: () => void;
  darkMode: boolean;
}

interface Campaña {
  id: number;
  nombre: string;
  plataforma: string;
  estado: 'activa' | 'pausada' | 'finalizada';
  fechaInicio: string;
  fechaFin: string;
  presupuesto: number;
  gastado: number;
  alcance: number;
  impresiones: number;
  clics: number;
  leads: number;
  costo_por_lead: number;
}

export default function CampañasViewer({ propiedadId, onClose, darkMode }: CampañasViewerProps) {
  const [campanasActivas] = useState<Campaña[]>([
    {
      id: 1,
      nombre: 'Facebook Ads - Miraflores',
      plataforma: 'Facebook',
      estado: 'activa',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-02-15',
      presupuesto: 800,
      gastado: 520,
      alcance: 45000,
      impresiones: 128000,
      clics: 3400,
      leads: 87,
      costo_por_lead: 5.98
    },
    {
      id: 2,
      nombre: 'Google Ads - Departamentos Lima',
      plataforma: 'Google',
      estado: 'activa',
      fechaInicio: '2024-01-10',
      fechaFin: '2024-02-10',
      presupuesto: 1200,
      gastado: 950,
      alcance: 62000,
      impresiones: 185000,
      clics: 5200,
      leads: 142,
      costo_por_lead: 6.69
    },
    {
      id: 3,
      nombre: 'Instagram Stories - Premium',
      plataforma: 'Instagram',
      estado: 'activa',
      fechaInicio: '2024-01-20',
      fechaFin: '2024-02-05',
      presupuesto: 600,
      gastado: 380,
      alcance: 28000,
      impresiones: 95000,
      clics: 1800,
      leads: 52,
      costo_por_lead: 7.31
    },
    {
      id: 4,
      nombre: 'Urbania Premium Listing',
      plataforma: 'Urbania',
      estado: 'pausada',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-03-01',
      presupuesto: 400,
      gastado: 200,
      alcance: 18000,
      impresiones: 42000,
      clics: 950,
      leads: 34,
      costo_por_lead: 5.88
    }
  ]);

  const totalGastado = campanasActivas.reduce((sum, c) => sum + c.gastado, 0);
  const totalPresupuesto = campanasActivas.reduce((sum, c) => sum + c.presupuesto, 0);
  const totalLeads = campanasActivas.reduce((sum, c) => sum + c.leads, 0);
  const totalClics = campanasActivas.reduce((sum, c) => sum + c.clics, 0);
  const promedioConversion = totalClics > 0 ? ((totalLeads / totalClics) * 100).toFixed(2) : 0;
  const costoPromedioLead = totalLeads > 0 ? (totalGastado / totalLeads).toFixed(2) : 0;

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa': return darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-50 text-green-700 border-green-200';
      case 'pausada': return darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'finalizada': return darkMode ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
      default: return '';
    }
  };

  const getPlataformaIcon = (plataforma: string) => {
    const colors = {
      'Facebook': 'bg-blue-500',
      'Instagram': 'bg-pink-500',
      'Google': 'bg-red-500',
      'Urbania': 'bg-orange-500',
      'TikTok': 'bg-black'
    };
    return colors[plataforma as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="flex flex-col h-full">
        
        {/* Header */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-orange-900 to-red-900 border-gray-700' : 'bg-gradient-to-r from-orange-600 to-red-600 border-gray-200'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Panel de Campañas</h2>
              <p className="text-orange-100 text-sm">Propiedad #{propiedadId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* KPIs Summary */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-4 border-b`}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Presupuesto
                </span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ${totalGastado}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                de ${totalPresupuesto}
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Users className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Leads
                </span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalLeads}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                conversiones
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-1">
                <MousePointerClick className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Clics
                </span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {totalClics.toLocaleString()}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                interacciones
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Target className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Conversión
                </span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {promedioConversion}%
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                promedio
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  CPL
                </span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ${costoPromedioLead}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                por lead
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {campanasActivas.map((campana) => {
              const progreso = (campana.gastado / campana.presupuesto) * 100;
              const ctr = ((campana.clics / campana.impresiones) * 100).toFixed(2);
              const conversion = ((campana.leads / campana.clics) * 100).toFixed(2);

              return (
                <div
                  key={campana.id}
                  className={`p-5 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg ${getPlataformaIcon(campana.plataforma)} flex items-center justify-center text-white font-bold`}>
                        {campana.plataforma[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {campana.nombre}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEstadoColor(campana.estado)}`}>
                            {campana.estado.charAt(0).toUpperCase() + campana.estado.slice(1)}
                          </span>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {new Date(campana.fechaInicio).toLocaleDateString()} - {new Date(campana.fechaFin).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Presupuesto
                      </span>
                      <span className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        ${campana.gastado} / ${campana.presupuesto}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          progreso >= 90 ? 'bg-red-500' : progreso >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(progreso, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Eye className="w-3 h-3 inline mr-1" />
                        Alcance
                      </div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(campana.alcance / 1000).toFixed(1)}K
                      </div>
                    </div>

                    <div>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Impresiones
                      </div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(campana.impresiones / 1000).toFixed(1)}K
                      </div>
                    </div>

                    <div>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <MousePointerClick className="w-3 h-3 inline mr-1" />
                        Clics
                      </div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {campana.clics.toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        CTR
                      </div>
                      <div className={`text-lg font-bold ${
                        parseFloat(ctr) >= 2 
                          ? 'text-green-500' 
                          : parseFloat(ctr) >= 1 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                      }`}>
                        {ctr}%
                      </div>
                    </div>

                    <div>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Users className="w-3 h-3 inline mr-1" />
                        Leads
                      </div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {campana.leads}
                      </div>
                    </div>

                    <div>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <DollarSign className="w-3 h-3 inline mr-1" />
                        CPL
                      </div>
                      <div className={`text-lg font-bold ${
                        campana.costo_por_lead <= 5 
                          ? 'text-green-500' 
                          : campana.costo_por_lead <= 8 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                      }`}>
                        ${campana.costo_por_lead}
                      </div>
                    </div>
                  </div>

                  {/* Conversion Rate Badge */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <TrendingUp className="w-4 h-4" />
                      <span>Tasa de conversión: <strong>{conversion}%</strong></span>
                    </div>
                    <div className="flex gap-2">
                      <button className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        darkMode
                          ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200'
                      }`}>
                        Ver Detalles
                      </button>
                      {campana.estado === 'activa' && (
                        <button className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                          darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}>
                          Pausar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-4 border-t flex items-center justify-between`}>
          <button
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              darkMode
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            Exportar Reporte
          </button>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg border font-medium ${
              darkMode
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                : 'border-gray-300 hover:bg-gray-100 text-gray-700'
            }`}
          >
            Cerrar
          </button>
        </div>
      </div>
  );
}
