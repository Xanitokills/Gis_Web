'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, User, MapPin, Phone, Mail, Check, X as XIcon } from 'lucide-react';

interface CalendarioVisitasProps {
  propiedadId: number;
  onClose: () => void;
  darkMode: boolean;
}

interface Visita {
  id: number;
  fecha: string;
  hora: string;
  cliente: string;
  telefono: string;
  email: string;
  estado: 'programada' | 'confirmada' | 'cancelada' | 'completada';
}

export default function CalendarioVisitas({ propiedadId, onClose, darkMode }: CalendarioVisitasProps) {
  const [visitas] = useState<Visita[]>([
    {
      id: 1,
      fecha: '2024-02-15',
      hora: '10:00',
      cliente: 'Juan Pérez',
      telefono: '+51 999 888 777',
      email: 'juan@email.com',
      estado: 'confirmada'
    },
    {
      id: 2,
      fecha: '2024-02-15',
      hora: '15:00',
      cliente: 'María García',
      telefono: '+51 988 777 666',
      email: 'maria@email.com',
      estado: 'programada'
    },
    {
      id: 3,
      fecha: '2024-02-16',
      hora: '11:00',
      cliente: 'Carlos López',
      telefono: '+51 977 666 555',
      email: 'carlos@email.com',
      estado: 'programada'
    },
  ]);

  const getEstadoBadge = (estado: string) => {
    const styles = {
      programada: darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200',
      confirmada: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-50 text-green-700 border-green-200',
      cancelada: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200',
      completada: darkMode ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return styles[estado as keyof typeof styles];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-cyan-900 to-blue-900' : 'bg-gradient-to-r from-cyan-600 to-blue-600'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Calendario de Visitas</h2>
              <p className="text-cyan-100 text-sm">Propiedad #{propiedadId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-4 border-b`}>
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Programadas
              </div>
              <div className={`text-2xl font-bold text-blue-500`}>
                2
              </div>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Confirmadas
              </div>
              <div className={`text-2xl font-bold text-green-500`}>
                1
              </div>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Esta Semana
              </div>
              <div className={`text-2xl font-bold text-purple-500`}>
                3
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {visitas.map((visita) => (
              <div
                key={visita.id}
                className={`p-5 rounded-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      darkMode ? 'bg-cyan-500/20' : 'bg-cyan-100'
                    }`}>
                      <User className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {visita.cliente}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoBadge(visita.estado)}`}>
                          {visita.estado.charAt(0).toUpperCase() + visita.estado.slice(1)}
                        </span>
                        <span className={`text-sm flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Calendar className="w-4 h-4" />
                          {new Date(visita.fecha).toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </span>
                        <span className={`text-sm flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Clock className="w-4 h-4" />
                          {visita.hora}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-3 pt-3 mt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Phone className="w-3 h-3 inline mr-1" />
                    {visita.telefono}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Mail className="w-3 h-3 inline mr-1" />
                    {visita.email}
                  </div>
                </div>

                {visita.estado === 'programada' && (
                  <div className="flex gap-2 mt-4">
                    <button className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                      darkMode
                        ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30'
                        : 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      <Check className="w-4 h-4 inline mr-1" />
                      Confirmar
                    </button>
                    <button className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                      darkMode
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30'
                        : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      <XIcon className="w-4 h-4 inline mr-1" />
                      Cancelar
                    </button>
                  </div>
                )}

                {visita.estado === 'confirmada' && (
                  <button className={`w-full mt-4 px-3 py-2 rounded-lg text-sm font-medium ${
                    darkMode
                      ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Ver Ubicación en Mapa
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-4 border-t flex justify-between`}>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              darkMode
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            }`}
          >
            + Nueva Visita
          </button>
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
  );
}
