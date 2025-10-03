'use client';

import React, { useState } from 'react';
import { X, XCircle, MessageSquare, Send } from 'lucide-react';

interface RechazarOfertaProps {
  oferta: any;
  onClose: () => void;
  onSave?: (data: any) => void;
  darkMode: boolean;
}

export default function RechazarOferta({ oferta, onClose, onSave, darkMode }: RechazarOfertaProps) {
  const [motivo, setMotivo] = useState('');
  const [mensajePersonalizado, setMensajePersonalizado] = useState('');
  const [guardarContacto, setGuardarContacto] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const motivos = [
    'Oferta muy baja',
    'Condiciones no aceptables',
    'Propietario rechazó la oferta',
    'Ya se aceptó otra oferta',
    'Comprador no cumple requisitos',
    'Otro'
  ];

  const handleEnviar = async () => {
    setEnviando(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSave?.({ motivo, mensajePersonalizado, guardarContacto });
    setEnviando(false);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border max-w-lg w-full`}>
        
        <div className={`${darkMode ? 'bg-gradient-to-r from-red-900 to-rose-900' : 'bg-gradient-to-r from-red-600 to-rose-600'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <XCircle className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Rechazar Oferta</h2>
              <p className="text-red-100 text-sm">Oferta: ${oferta?.monto?.toLocaleString()}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Motivo del Rechazo *
            </label>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">Selecciona un motivo</option>
              {motivos.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Mensaje Personalizado (opcional)
            </label>
            <textarea
              value={mensajePersonalizado}
              onChange={(e) => setMensajePersonalizado(e.target.value)}
              rows={4}
              placeholder="Agrega un mensaje personalizado para el comprador..."
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={guardarContacto}
                onChange={(e) => setGuardarContacto(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded"
              />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mantener en base de datos para futuras oportunidades
              </span>
            </label>
          </div>

          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              💡 <strong>Tip:</strong> Aunque rechaces la oferta, mantén una comunicación profesional. 
              El comprador podría estar interesado en otras propiedades.
            </p>
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
            onClick={handleEnviar}
            disabled={enviando || !motivo}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
              enviando || !motivo ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700'
            } text-white`}
          >
            {enviando ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Rechazar Oferta
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
