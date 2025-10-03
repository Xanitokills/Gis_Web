'use client';

import React, { useState } from 'react';
import { X, Save, Home, Users, Calendar, Clock, MapPin, Tag, Mail, Phone, AlertCircle } from 'lucide-react';

interface OpenHouseSchedulerProps {
  propiedadId: number;
  onClose: () => void;
  onSave?: (data: any) => void;
  darkMode: boolean;
}

export default function OpenHouseScheduler({ propiedadId, onClose, onSave, darkMode }: OpenHouseSchedulerProps) {
  const [formData, setFormData] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    cupoMaximo: '20',
    descripcion: '',
    incluirRefrigerio: true,
    enviarRecordatorios: true,
    publicarEnRedes: true,
    requiereRegistro: true
  });

  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async () => {
    setGuardando(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSave?.(formData);
    setGuardando(false);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border max-w-2xl w-full`}>
        
        <div className={`${darkMode ? 'bg-gradient-to-r from-pink-900 to-rose-900' : 'bg-gradient-to-r from-pink-600 to-rose-600'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Programar Open House</h2>
              <p className="text-pink-100 text-sm">Propiedad #{propiedadId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha del Evento *
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Users className="w-4 h-4 inline mr-1" />
                Cupo Máximo
              </label>
              <input
                type="number"
                value={formData.cupoMaximo}
                onChange={(e) => setFormData({...formData, cupoMaximo: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Clock className="w-4 h-4 inline mr-1" />
                Hora de Inicio
              </label>
              <input
                type="time"
                value={formData.horaInicio}
                onChange={(e) => setFormData({...formData, horaInicio: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Hora de Fin
              </label>
              <input
                type="time"
                value={formData.horaFin}
                onChange={(e) => setFormData({...formData, horaFin: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Descripción del Evento
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              rows={3}
              placeholder="Describe qué incluye el open house, qué podrán ver los visitantes..."
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requiereRegistro}
                  onChange={(e) => setFormData({...formData, requiereRegistro: e.target.checked})}
                  className="w-4 h-4 text-pink-600 rounded"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Requiere registro previo
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.incluirRefrigerio}
                  onChange={(e) => setFormData({...formData, incluirRefrigerio: e.target.checked})}
                  className="w-4 h-4 text-pink-600 rounded"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Incluir refrigerio
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enviarRecordatorios}
                  onChange={(e) => setFormData({...formData, enviarRecordatorios: e.target.checked})}
                  className="w-4 h-4 text-pink-600 rounded"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enviar recordatorios automáticos
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.publicarEnRedes}
                  onChange={(e) => setFormData({...formData, publicarEnRedes: e.target.checked})}
                  className="w-4 h-4 text-pink-600 rounded"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Publicar automáticamente en redes sociales
                </span>
              </label>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${
            darkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex gap-3">
              <AlertCircle className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                  Tips para un Open House exitoso:
                </div>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                  <li>• Programa para fines de semana (mejor asistencia)</li>
                  <li>• Prepara material promocional y fichas técnicas</li>
                  <li>• Asegúrate de que la propiedad esté impecable</li>
                  <li>• Ten lista información de financiamiento</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-4 border-t flex justify-end gap-3`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg border font-medium ${
              darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'
            }`}
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando || !formData.fecha || !formData.horaInicio}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
              guardando || !formData.fecha || !formData.horaInicio
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700'
            } text-white`}
          >
            {guardando ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Programar Open House
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
