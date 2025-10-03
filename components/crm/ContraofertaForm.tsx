'use client';

import React, { useState } from 'react';
import { X, Save, TrendingUp, DollarSign, MessageSquare, AlertCircle } from 'lucide-react';

interface ContraofertaFormProps {
  oferta: any;
  propiedadId: number;
  onClose: () => void;
  onSave?: (data: any) => void;
  darkMode: boolean;
}

export default function ContraofertaForm({ oferta, propiedadId, onClose, onSave, darkMode }: ContraofertaFormProps) {
  const [monto, setMonto] = useState(oferta?.monto || '');
  const [condiciones, setCondiciones] = useState('');
  const [plazoRespuesta, setPlazoRespuesta] = useState('48');
  const [modificarArras, setModificarArras] = useState(false);
  const [montoArras, setMontoArras] = useState('');
  const [guardando, setGuardando] = useState(false);

  const ofertaOriginal = parseFloat(oferta?.monto || '0');
  const contraofertaActual = parseFloat(monto) || 0;
  const diferencia = contraofertaActual - ofertaOriginal;
  const porcentajeDiferencia = ofertaOriginal > 0 ? ((diferencia / ofertaOriginal) * 100).toFixed(2) : '0';

  const handleGuardar = async () => {
    setGuardando(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSave?.({ monto, condiciones, plazoRespuesta, modificarArras, montoArras });
    setGuardando(false);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-orange-900 to-red-900' : 'bg-gradient-to-r from-orange-600 to-red-600'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Enviar Contraoferta</h2>
              <p className="text-orange-100 text-sm">Propiedad #{propiedadId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Oferta Original */}
          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Oferta Original Recibida:
              </span>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ${ofertaOriginal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Contraoferta */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <DollarSign className="w-4 h-4 inline mr-1" />
              Monto de Contraoferta
            </label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ingresa el monto"
              className={`w-full px-4 py-3 rounded-lg border text-lg font-bold ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              }`}
            />
            
            {/* Diferencia */}
            {contraofertaActual > 0 && (
              <div className={`mt-2 p-3 rounded-lg ${
                diferencia > 0 
                  ? darkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'
                  : diferencia < 0
                    ? darkMode ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'
                    : darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    diferencia > 0 ? 'text-green-600 dark:text-green-400' :
                    diferencia < 0 ? 'text-red-600 dark:text-red-400' :
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Diferencia:
                  </span>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      diferencia > 0 ? 'text-green-600 dark:text-green-400' :
                      diferencia < 0 ? 'text-red-600 dark:text-red-400' :
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {diferencia > 0 ? '+' : ''} ${diferencia.toLocaleString()}
                    </span>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ({parseFloat(porcentajeDiferencia) > 0 ? '+' : ''}{porcentajeDiferencia}%)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Condiciones */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Condiciones de la Contraoferta
            </label>
            <textarea
              value={condiciones}
              onChange={(e) => setCondiciones(e.target.value)}
              rows={4}
              placeholder="Ej: Pago en efectivo, sin financiamiento. Entrega inmediata. Incluye muebles de cocina..."
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Plazo de Respuesta (horas)
              </label>
              <input
                type="number"
                value={plazoRespuesta}
                onChange={(e) => setPlazoRespuesta(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer p-3">
                <input
                  type="checkbox"
                  checked={modificarArras}
                  onChange={(e) => setModificarArras(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded"
                />
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Modificar arras
                </span>
              </label>
            </div>
          </div>

          {modificarArras && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Nuevo Monto de Arras
              </label>
              <input
                type="number"
                value={montoArras}
                onChange={(e) => setMontoArras(e.target.value)}
                placeholder="Ingresa el monto de arras"
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
          )}

          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex gap-3">
              <AlertCircle className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <div>
                <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>
                  Recomendaciones para negociar:
                </div>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                  <li>• Justifica tu contraoferta con datos del mercado</li>
                  <li>• Sé flexible pero mantén un margen razonable</li>
                  <li>• Destaca las ventajas que ofreces (rapidez, seguridad)</li>
                  <li>• Mantén una comunicación profesional y cordial</li>
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
            disabled={guardando || !monto || !condiciones}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
              guardando || !monto || !condiciones ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
            } text-white`}
          >
            {guardando ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Enviar Contraoferta
              </>
            )}
          </button>
        </div>
      </div>
  );
}
