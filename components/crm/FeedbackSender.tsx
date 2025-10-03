'use client';

import React, { useState } from 'react';
import { X, Send, MessageSquare, ThumbsUp, ThumbsDown, Star, Save } from 'lucide-react';

interface FeedbackSenderProps {
  propiedadId: number;
  propietario: string;
  onClose: () => void;
  onSave?: (data: any) => void;
  darkMode: boolean;
}

export default function FeedbackSender({ propiedadId, propietario, onClose, onSave, darkMode }: FeedbackSenderProps) {
  const [mensaje, setMensaje] = useState('');
  const [templateSeleccionado, setTemplateSeleccionado] = useState('');
  const [enviando, setEnviando] = useState(false);

  const templates = {
    visitas_realizadas: `Hola ${propietario},\n\nTe informo que esta semana realizamos 3 visitas a tu propiedad. Los interesados destacaron la ubicación y amplitud de los espacios. Te mantendré informado de los avances.\n\n¡Saludos!`,
    precio_sugerencia: `Hola ${propietario},\n\nDespués de analizar el mercado y el feedback de los visitantes, te sugiero considerar un ajuste en el precio para aumentar el interés. ¿Podríamos agendar una reunión para conversar al respecto?\n\n¡Saludos!`,
    oferta_recibida: `Hola ${propietario},\n\n¡Excelentes noticias! Hemos recibido una oferta formal por tu propiedad. Te llamaré pronto para revisar los detalles y tu opinión.\n\n¡Saludos!`,
    sin_visitas: `Hola ${propietario},\n\nEsta semana no tuvimos visitas, pero estamos ajustando la estrategia de marketing. He planificado nuevas acciones que implementaré pronto. Te mantendré informado.\n\n¡Saludos!`,
  };

  const handleTemplateSelect = (key: string) => {
    setTemplateSeleccionado(key);
    setMensaje(templates[key as keyof typeof templates]);
  };

  const handleEnviar = async () => {
    setEnviando(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSave?.({ propiedadId, mensaje, fecha: new Date().toISOString() });
    setEnviando(false);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border max-w-2xl w-full`}>
        
        <div className={`${darkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-600 to-purple-600'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Enviar Feedback al Propietario</h2>
              <p className="text-indigo-100 text-sm">Propiedad #{propiedadId} - {propietario}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          <div>
            <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Plantillas Rápidas
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'visitas_realizadas', label: '✅ Visitas Realizadas', icon: ThumbsUp },
                { key: 'oferta_recibida', label: '⭐ Oferta Recibida', icon: Star },
                { key: 'precio_sugerencia', label: '💰 Sugerencia de Precio', icon: MessageSquare },
                { key: 'sin_visitas', label: '📊 Reporte sin Visitas', icon: ThumbsDown },
              ].map((template) => (
                <button
                  key={template.key}
                  onClick={() => handleTemplateSelect(template.key)}
                  className={`p-3 rounded-lg border text-sm font-medium text-left transition-all ${
                    templateSeleccionado === template.key
                      ? darkMode
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-purple-500 bg-purple-50 text-purple-700'
                      : darkMode
                        ? 'border-gray-700 text-gray-400 hover:border-gray-600'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {template.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Mensaje
            </label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={8}
              placeholder="Escribe tu mensaje al propietario..."
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
              }`}
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {mensaje.length} caracteres
            </p>
          </div>

          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              💡 <strong>Tip:</strong> Mantén una comunicación constante con el propietario. 
              Los reportes semanales aumentan la confianza y mejoran la relación.
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
            disabled={enviando || !mensaje}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
              enviando || !mensaje ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
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
                Enviar Feedback
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
