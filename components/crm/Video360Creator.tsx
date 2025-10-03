'use client';

import React, { useState } from 'react';
import { X, Upload, Video, Camera, Eye, Link, MapPin, Save, AlertCircle, Check } from 'lucide-react';

interface Video360CreatorProps {
  propiedadId: number;
  onClose: () => void;
  onSave?: (data: any) => void;
  darkMode: boolean;
}

interface VideoSection {
  id: string;
  nombre: string;
  tipo: '360' | 'video' | 'foto';
  archivo?: File;
  url?: string;
  descripcion: string;
  orden: number;
}

export default function Video360Creator({ propiedadId, onClose, onSave, darkMode }: Video360CreatorProps) {
  const [tipoTour, setTipoTour] = useState<'matterport' | 'fotos360' | 'video' | 'mixto'>('matterport');
  const [secciones, setSecciones] = useState<VideoSection[]>([
    { id: '1', nombre: 'Sala', tipo: '360', descripcion: '', orden: 1 },
    { id: '2', nombre: 'Cocina', tipo: '360', descripcion: '', orden: 2 },
    { id: '3', nombre: 'Dormitorio Principal', tipo: '360', descripcion: '', orden: 3 },
    { id: '4', nombre: 'Baño', tipo: '360', descripcion: '', orden: 4 },
  ]);
  const [matterportUrl, setMatterportUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [descripcionGeneral, setDescripcionGeneral] = useState('');
  const [mostrarEnPortada, setMostrarEnPortada] = useState(true);
  const [publicarEnRedes, setPublicarEnRedes] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [vistaPrevia, setVistaPrevia] = useState(false);

  const agregarSeccion = () => {
    const nuevaSeccion: VideoSection = {
      id: Date.now().toString(),
      nombre: '',
      tipo: '360',
      descripcion: '',
      orden: secciones.length + 1
    };
    setSecciones([...secciones, nuevaSeccion]);
  };

  const eliminarSeccion = (id: string) => {
    setSecciones(secciones.filter(s => s.id !== id));
  };

  const actualizarSeccion = (id: string, campo: keyof VideoSection, valor: any) => {
    setSecciones(secciones.map(s => 
      s.id === id ? { ...s, [campo]: valor } : s
    ));
  };

  const handleFileUpload = (id: string, file: File) => {
    actualizarSeccion(id, 'archivo', file);
    // Simular preview
    const url = URL.createObjectURL(file);
    actualizarSeccion(id, 'url', url);
  };

  const handleGuardar = async () => {
    setGuardando(true);
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const tourData = {
      propiedadId,
      tipoTour,
      matterportUrl,
      youtubeUrl,
      descripcionGeneral,
      secciones: secciones.filter(s => s.url || s.archivo),
      mostrarEnPortada,
      publicarEnRedes,
      fechaCreacion: new Date().toISOString()
    };
    
    onSave?.(tourData);
    setGuardando(false);
    onClose();
  };

  const seccionesConArchivo = secciones.filter(s => s.url || s.archivo).length;
  const progreso = (seccionesConArchivo / secciones.length) * 100;

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
        
        {/* Header */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-purple-900 to-indigo-900 border-gray-700' : 'bg-gradient-to-r from-purple-600 to-indigo-600 border-gray-200'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Crear Tour Virtual 360°</h2>
              <p className="text-purple-100 text-sm">Propiedad #{propiedadId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-3 border-b`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Progreso del Tour
            </span>
            <span className={`text-sm font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {seccionesConArchivo}/{secciones.length} secciones
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Tipo de Tour */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Tipo de Tour Virtual
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'matterport', label: 'Matterport', icon: Camera, desc: 'Tour 3D profesional' },
                { value: 'fotos360', label: 'Fotos 360°', icon: Camera, desc: 'Fotografías panorámicas' },
                { value: 'video', label: 'Video Tour', icon: Video, desc: 'Recorrido en video' },
                { value: 'mixto', label: 'Mixto', icon: MapPin, desc: 'Combinar formatos' }
              ].map((tipo) => (
                <button
                  key={tipo.value}
                  onClick={() => setTipoTour(tipo.value as any)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    tipoTour === tipo.value
                      ? darkMode
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-purple-600 bg-purple-50'
                      : darkMode
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <tipo.icon className={`w-6 h-6 mx-auto mb-2 ${
                    tipoTour === tipo.value
                      ? darkMode ? 'text-purple-400' : 'text-purple-600'
                      : darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <div className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {tipo.label}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {tipo.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Enlaces externos */}
          {(tipoTour === 'matterport' || tipoTour === 'mixto') && (
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Link className="w-4 h-4 inline mr-2" />
                URL de Matterport
              </label>
              <input
                type="url"
                value={matterportUrl}
                onChange={(e) => setMatterportUrl(e.target.value)}
                placeholder="https://my.matterport.com/show/?m=..."
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
          )}

          {(tipoTour === 'video' || tipoTour === 'mixto') && (
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Video className="w-4 h-4 inline mr-2" />
                URL de YouTube
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
          )}

          {/* Secciones del Tour */}
          {(tipoTour === 'fotos360' || tipoTour === 'mixto') && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Secciones del Tour ({secciones.length})
                </label>
                <button
                  onClick={agregarSeccion}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    darkMode
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  + Agregar Sección
                </button>
              </div>

              <div className="space-y-4">
                {secciones.map((seccion, index) => (
                  <div
                    key={seccion.id}
                    className={`p-4 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={seccion.nombre}
                            onChange={(e) => actualizarSeccion(seccion.id, 'nombre', e.target.value)}
                            placeholder="Nombre de la sección"
                            className={`px-3 py-2 rounded-lg border text-sm ${
                              darkMode 
                                ? 'bg-gray-900 border-gray-600 text-white' 
                                : 'bg-white border-gray-300'
                            }`}
                          />
                          <select
                            value={seccion.tipo}
                            onChange={(e) => actualizarSeccion(seccion.id, 'tipo', e.target.value)}
                            className={`px-3 py-2 rounded-lg border text-sm ${
                              darkMode 
                                ? 'bg-gray-900 border-gray-600 text-white' 
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            <option value="360">Foto 360°</option>
                            <option value="video">Video</option>
                            <option value="foto">Foto Normal</option>
                          </select>
                        </div>

                        <input
                          type="text"
                          value={seccion.descripcion}
                          onChange={(e) => actualizarSeccion(seccion.id, 'descripcion', e.target.value)}
                          placeholder="Descripción (opcional)"
                          className={`w-full px-3 py-2 rounded-lg border text-sm ${
                            darkMode 
                              ? 'bg-gray-900 border-gray-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        />

                        {/* Upload Area */}
                        <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                          seccion.url
                            ? darkMode ? 'border-green-500 bg-green-500/10' : 'border-green-600 bg-green-50'
                            : darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          {seccion.url ? (
                            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                              <Check className="w-5 h-5" />
                              <span className="text-sm font-medium">
                                {seccion.archivo?.name || 'Archivo cargado'}
                              </span>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(seccion.id, file);
                                }}
                                className="hidden"
                              />
                              <Upload className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Click para subir {seccion.tipo === 'video' ? 'video' : 'imagen'}
                              </div>
                            </label>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => eliminarSeccion(seccion.id)}
                        className={`p-2 rounded-lg ${
                          darkMode
                            ? 'hover:bg-red-500/20 text-red-400'
                            : 'hover:bg-red-50 text-red-600'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Descripción General */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Descripción General del Tour
            </label>
            <textarea
              value={descripcionGeneral}
              onChange={(e) => setDescripcionGeneral(e.target.value)}
              rows={3}
              placeholder="Describe las características principales que se pueden ver en el tour..."
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>

          {/* Opciones */}
          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className="flex items-center gap-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={mostrarEnPortada}
                onChange={(e) => setMostrarEnPortada(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mostrar en portada de la propiedad
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={publicarEnRedes}
                onChange={(e) => setPublicarEnRedes(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Compartir automáticamente en redes sociales
              </span>
            </label>
          </div>

          {/* Info Box */}
          <div className={`mt-4 p-4 rounded-lg border ${
            darkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex gap-3">
              <AlertCircle className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                  Tips para un tour exitoso:
                </div>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                  <li>• Iluminación natural mejora la calidad de las fotos 360°</li>
                  <li>• Ordena y limpia cada espacio antes de capturar</li>
                  <li>• Incluye vistas destacadas (balcón, terraza, vistas)</li>
                  <li>• Videos cortos (30-60 seg) mantienen mejor la atención</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-4 border-t flex items-center justify-between`}>
          <button
            onClick={() => setVistaPrevia(!vistaPrevia)}
            className={`px-4 py-2 rounded-lg border font-medium ${
              darkMode
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                : 'border-gray-300 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Vista Previa
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg border font-medium ${
                darkMode
                  ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                  : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              disabled={guardando || seccionesConArchivo === 0}
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                guardando || seccionesConArchivo === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
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
                  Guardar Tour
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
