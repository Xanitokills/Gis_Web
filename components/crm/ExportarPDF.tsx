'use client';

import React, { useState } from 'react';
import { X, FileText, Download, Check } from 'lucide-react';

interface ExportarPDFProps {
  propiedadId: number;
  onClose: () => void;
  darkMode: boolean;
}

export default function ExportarPDF({ propiedadId, onClose, darkMode }: ExportarPDFProps) {
  const [opciones, setOpciones] = useState({
    incluirFotos: true,
    incluirVisitas: true,
    incluirOfertas: true,
    incluirTimeline: true,
    incluirDocumentos: false,
    incluirAnalisisMercado: true,
  });
  const [generando, setGenerando] = useState(false);

  const handleGenerar = async () => {
    setGenerando(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Simular descarga
    setGenerando(false);
    onClose();
  };

  const toggleOpcion = (key: keyof typeof opciones) => {
    setOpciones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border max-w-md w-full`}>
        
        <div className={`${darkMode ? 'bg-gradient-to-r from-red-900 to-pink-900' : 'bg-gradient-to-r from-red-600 to-pink-600'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Exportar Reporte PDF</h2>
              <p className="text-red-100 text-sm">Propiedad #{propiedadId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Selecciona la información que deseas incluir en el reporte:
          </p>

          <div className="space-y-2">
            {[
              { key: 'incluirFotos', label: '📸 Galería de fotos', desc: 'Incluir todas las fotos de la propiedad' },
              { key: 'incluirVisitas', label: '👥 Registro de visitas', desc: 'Historial completo de visitas' },
              { key: 'incluirOfertas', label: '💰 Ofertas recibidas', desc: 'Todas las ofertas y su estado' },
              { key: 'incluirTimeline', label: '📅 Línea de tiempo', desc: 'Cronología de eventos importantes' },
              { key: 'incluirDocumentos', label: '📄 Documentos legales', desc: 'Contratos y documentación' },
              { key: 'incluirAnalisisMercado', label: '📊 Análisis de mercado', desc: 'Comparativa y estadísticas' },
            ].map((opcion) => (
              <button
                key={opcion.key}
                onClick={() => toggleOpcion(opcion.key as keyof typeof opciones)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  opciones[opcion.key as keyof typeof opciones]
                    ? darkMode
                      ? 'bg-red-500/20 border-red-500/50 text-red-300'
                      : 'bg-red-50 border-red-300 text-red-700'
                    : darkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm mb-0.5">{opcion.label}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {opcion.desc}
                    </div>
                  </div>
                  {opciones[opcion.key as keyof typeof opciones] && (
                    <Check className="w-5 h-5 flex-shrink-0 ml-2" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className={`p-3 rounded-lg border ${darkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
            <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              El reporte se generará en formato PDF de alta calidad, optimizado para impresión.
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
            onClick={handleGenerar}
            disabled={generando}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
              generando ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
            } text-white`}
          >
            {generando ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Generar PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
