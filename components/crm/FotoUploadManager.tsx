"use client";

import { useState } from 'react';

type FotoUploadProps = {
  propiedadId: number;
  onSuccess?: () => void;
  darkMode?: boolean;
};

export default function FotoUploadManager({ propiedadId, onSuccess, darkMode = true }: FotoUploadProps) {
  const [fotos, setFotos] = useState<Array<{ url: string; calidad: number; tipo: string }>>([]);
  const [uploading, setUploading] = useState(false);

  const tiposFoto = [
    'Fachada', 'Sala', 'Cocina', 'Comedor', 'Dormitorio Principal',
    'Dormitorios', 'Baños', 'Terraza/Balcón', 'Vista', 'Extras'
  ];

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);
    
    // Simular análisis de calidad de imagen
    const nuevasFotos = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      calidad: Math.floor(Math.random() * 20) + 80, // 80-100
      tipo: tiposFoto[Math.floor(Math.random() * tiposFoto.length)]
    }));

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFotos([...fotos, ...nuevasFotos]);
    setUploading(false);
  };

  const calidadPromedio = fotos.length > 0 
    ? Math.round(fotos.reduce((sum, f) => sum + f.calidad, 0) / fotos.length)
    : 0;

  const eliminarFoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Fotos</p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{fotos.length}</p>
        </div>
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calidad Promedio</p>
          <p className={`text-2xl font-bold ${calidadPromedio >= 90 ? 'text-emerald-500' : calidadPromedio >= 75 ? 'text-amber-500' : 'text-red-500'}`}>
            {calidadPromedio}%
          </p>
        </div>
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estado</p>
          <p className={`text-sm font-bold ${fotos.length >= 12 ? 'text-emerald-500' : 'text-amber-500'}`}>
            {fotos.length >= 12 ? '✓ Completo' : 'Mín. 12 fotos'}
          </p>
        </div>
      </div>

      {/* Recomendaciones */}
      {fotos.length < 12 && (
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-amber-600/10 border-amber-600/30' : 'bg-amber-50 border-amber-200'}`}>
          <p className={`font-semibold mb-2 ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
            💡 Recomendaciones para fotos de calidad
          </p>
          <ul className={`text-sm space-y-1 ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
            <li>• Usa luz natural siempre que sea posible</li>
            <li>• Captura todos los ángulos importantes de cada ambiente</li>
            <li>• Incluye fotos de la fachada y áreas comunes</li>
            <li>• Resolución mínima: 1920x1080 px</li>
          </ul>
        </div>
      )}

      {/* Upload Area */}
      <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
        uploading 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:border-emerald-500'
      } ${darkMode ? 'border-[#3A3A3A] bg-[#1E1E1E]' : 'border-gray-300 bg-gray-50'}`}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          disabled={uploading}
          className="hidden"
          id="foto-upload"
        />
        <label htmlFor="foto-upload" className="cursor-pointer">
          <svg className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {uploading ? 'Subiendo fotos...' : 'Haz clic para subir fotos'}
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            o arrastra y suelta aquí
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            JPG, PNG hasta 10MB por archivo
          </p>
        </label>
      </div>

      {/* Galería de fotos */}
      {fotos.length > 0 && (
        <div>
          <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Fotos Cargadas ({fotos.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fotos.map((foto, index) => (
              <div key={index} className={`relative rounded-lg overflow-hidden border group ${darkMode ? 'border-[#3A3A3A]' : 'border-gray-200'}`}>
                <img 
                  src={foto.url} 
                  alt={`Foto ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
                  <button
                    onClick={() => eliminarFoto(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 p-2 ${darkMode ? 'bg-black/70' : 'bg-white/90'}`}>
                  <p className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{foto.tipo}</p>
                  <div className="flex items-center space-x-1">
                    <div className={`flex-1 h-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <div 
                        className={`h-full rounded ${foto.calidad >= 90 ? 'bg-emerald-500' : foto.calidad >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${foto.calidad}%` }}
                      />
                    </div>
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{foto.calidad}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fotos.length >= 12 && (
        <button
          onClick={() => onSuccess?.()}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all font-semibold shadow-lg shadow-emerald-600/20"
        >
          Confirmar y Guardar Fotos
        </button>
      )}
    </div>
  );
}
