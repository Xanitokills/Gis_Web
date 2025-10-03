'use client';

import React, { useState } from 'react';
import { X, Save, Eye, FileText, MapPin, Home, Ruler, DollarSign, Calendar, Tag, Image, Check, AlertTriangle } from 'lucide-react';

interface FichaComercialEditorProps {
  propiedadId: number;
  onClose: () => void;
  onSave?: (data: any) => void;
  darkMode: boolean;
}

interface FichaData {
  // Datos básicos
  titulo: string;
  descripcion: string;
  tipoPropiedad: string;
  operacion: string;
  
  // Ubicación
  direccion: string;
  distrito: string;
  provincia: string;
  referencia: string;
  
  // Características
  areaTotal: string;
  areaConstruida: string;
  dormitorios: string;
  banos: string;
  estacionamientos: string;
  antiguedad: string;
  
  // Precios
  precioVenta: string;
  precioAlquiler: string;
  moneda: string;
  mantenimiento: string;
  
  // Características adicionales
  amenidades: string[];
  estadoPropiedad: string;
  
  // Marketing
  tituloDestacado: string;
  fraseClave: string;
  etiquetas: string[];
}

export default function FichaComercialEditor({ propiedadId, onClose, onSave, darkMode }: FichaComercialEditorProps) {
  const [activeTab, setActiveTab] = useState<'basico' | 'detalles' | 'marketing'>('basico');
  const [ficha, setFicha] = useState<FichaData>({
    titulo: 'Departamento en Miraflores',
    descripcion: 'Moderno departamento con excelente ubicación...',
    tipoPropiedad: 'departamento',
    operacion: 'venta',
    
    direccion: 'Av. Larco 1234',
    distrito: 'Miraflores',
    provincia: 'Lima',
    referencia: 'A 2 cuadras del Parque Kennedy',
    
    areaTotal: '120',
    areaConstruida: '110',
    dormitorios: '3',
    banos: '2',
    estacionamientos: '2',
    antiguedad: '5',
    
    precioVenta: '450000',
    precioAlquiler: '',
    moneda: 'USD',
    mantenimiento: '350',
    
    amenidades: ['Piscina', 'Gimnasio', 'Seguridad 24h'],
    estadoPropiedad: 'excelente',
    
    tituloDestacado: '¡Oportunidad Única en Miraflores!',
    fraseClave: 'Vive donde siempre soñaste',
    etiquetas: ['Estreno', 'Vista al mar', 'Pet friendly']
  });

  const [guardando, setGuardando] = useState(false);
  const [vistaPrevia, setVistaPrevia] = useState(false);

  const amenidadesDisponibles = [
    'Piscina', 'Gimnasio', 'Seguridad 24h', 'Ascensor', 'Estacionamiento visitas',
    'Salón de eventos', 'Área de juegos', 'Terraza', 'Lavandería', 'Depósito',
    'Portero eléctrico', 'Cámaras de seguridad', 'Área verde', 'Parrilla'
  ];

  const etiquetasDisponibles = [
    'Estreno', 'Remodelado', 'Vista al mar', 'Vista a parque', 'Pet friendly',
    'Amoblado', 'Cerca al metro', 'Zona comercial', 'Cerca a colegios',
    'Inversión', 'Oportunidad', 'Precio negociable'
  ];

  const updateField = (field: keyof FichaData, value: any) => {
    setFicha(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenidad = (amenidad: string) => {
    setFicha(prev => ({
      ...prev,
      amenidades: prev.amenidades.includes(amenidad)
        ? prev.amenidades.filter(a => a !== amenidad)
        : [...prev.amenidades, amenidad]
    }));
  };

  const toggleEtiqueta = (etiqueta: string) => {
    setFicha(prev => ({
      ...prev,
      etiquetas: prev.etiquetas.includes(etiqueta)
        ? prev.etiquetas.filter(e => e !== etiqueta)
        : [...prev.etiquetas, etiqueta]
    }));
  };

  const handleGuardar = async () => {
    setGuardando(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSave?.(ficha);
    setGuardando(false);
    onClose();
  };

  const calcularCompletitud = () => {
    const campos = [
      ficha.titulo, ficha.descripcion, ficha.direccion, ficha.distrito,
      ficha.areaTotal, ficha.dormitorios, ficha.banos,
      ficha.precioVenta || ficha.precioAlquiler,
      ficha.amenidades.length > 0,
      ficha.tituloDestacado
    ];
    const completos = campos.filter(Boolean).length;
    return Math.round((completos / campos.length) * 100);
  };

  const completitud = calcularCompletitud();

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
        
        {/* Header */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-cyan-900 border-gray-700' : 'bg-gradient-to-r from-blue-600 to-cyan-600 border-gray-200'} px-6 py-4 border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Editor de Ficha Comercial</h2>
              <p className="text-blue-100 text-sm">Propiedad #{propiedadId}</p>
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
              Completitud de la Ficha
            </span>
            <span className={`text-sm font-bold ${
              completitud >= 80 ? 'text-green-600 dark:text-green-400' :
              completitud >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {completitud}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                completitud >= 80 ? 'bg-green-500' :
                completitud >= 50 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${completitud}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b`}>
          <div className="flex">
            {[
              { id: 'basico', label: 'Datos Básicos', icon: Home },
              { id: 'detalles', label: 'Detalles', icon: Ruler },
              { id: 'marketing', label: 'Marketing', icon: Tag }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? darkMode
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-900'
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Tab: Datos Básicos */}
          {activeTab === 'basico' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tipo de Propiedad *
                  </label>
                  <select
                    value={ficha.tipoPropiedad}
                    onChange={(e) => updateField('tipoPropiedad', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="departamento">Departamento</option>
                    <option value="casa">Casa</option>
                    <option value="oficina">Oficina</option>
                    <option value="local">Local Comercial</option>
                    <option value="terreno">Terreno</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Operación *
                  </label>
                  <select
                    value={ficha.operacion}
                    onChange={(e) => updateField('operacion', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="venta">Venta</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="ambos">Venta y Alquiler</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Título de la Publicación *
                </label>
                <input
                  type="text"
                  value={ficha.titulo}
                  onChange={(e) => updateField('titulo', e.target.value)}
                  placeholder="Ej: Moderno departamento en Miraflores"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                />
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {ficha.titulo.length}/100 caracteres
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Descripción Completa *
                </label>
                <textarea
                  value={ficha.descripcion}
                  onChange={(e) => updateField('descripcion', e.target.value)}
                  rows={5}
                  placeholder="Describe las características principales de la propiedad..."
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                />
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {ficha.descripcion.length}/2000 caracteres
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={ficha.direccion}
                    onChange={(e) => updateField('direccion', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Distrito *
                  </label>
                  <input
                    type="text"
                    value={ficha.distrito}
                    onChange={(e) => updateField('distrito', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Referencia de Ubicación
                </label>
                <input
                  type="text"
                  value={ficha.referencia}
                  onChange={(e) => updateField('referencia', e.target.value)}
                  placeholder="Ej: A 2 cuadras del Parque Kennedy"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Tab: Detalles */}
          {activeTab === 'detalles' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Área Total (m²) *
                  </label>
                  <input
                    type="number"
                    value={ficha.areaTotal}
                    onChange={(e) => updateField('areaTotal', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Área Construida (m²)
                  </label>
                  <input
                    type="number"
                    value={ficha.areaConstruida}
                    onChange={(e) => updateField('areaConstruida', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Antigüedad (años)
                  </label>
                  <input
                    type="number"
                    value={ficha.antiguedad}
                    onChange={(e) => updateField('antiguedad', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Dormitorios *
                  </label>
                  <input
                    type="number"
                    value={ficha.dormitorios}
                    onChange={(e) => updateField('dormitorios', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Baños *
                  </label>
                  <input
                    type="number"
                    value={ficha.banos}
                    onChange={(e) => updateField('banos', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Estacionamientos
                  </label>
                  <input
                    type="number"
                    value={ficha.estacionamientos}
                    onChange={(e) => updateField('estacionamientos', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Precio de Venta
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={ficha.moneda}
                      onChange={(e) => updateField('moneda', e.target.value)}
                      className={`px-3 py-2 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      <option value="USD">USD</option>
                      <option value="PEN">PEN</option>
                    </select>
                    <input
                      type="number"
                      value={ficha.precioVenta}
                      onChange={(e) => updateField('precioVenta', e.target.value)}
                      placeholder="450000"
                      className={`flex-1 px-4 py-2 rounded-lg border ${
                        darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Precio de Alquiler (mensual)
                  </label>
                  <input
                    type="number"
                    value={ficha.precioAlquiler}
                    onChange={(e) => updateField('precioAlquiler', e.target.value)}
                    placeholder="2500"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mantenimiento Mensual
                </label>
                <input
                  type="number"
                  value={ficha.mantenimiento}
                  onChange={(e) => updateField('mantenimiento', e.target.value)}
                  placeholder="350"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Estado de la Propiedad
                </label>
                <select
                  value={ficha.estadoPropiedad}
                  onChange={(e) => updateField('estadoPropiedad', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="estreno">A Estrenar</option>
                  <option value="excelente">Excelente</option>
                  <option value="bueno">Buen Estado</option>
                  <option value="remodelado">Remodelado</option>
                  <option value="remodelar">Por Remodelar</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Amenidades y Servicios ({ficha.amenidades.length} seleccionadas)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {amenidadesDisponibles.map((amenidad) => (
                    <button
                      key={amenidad}
                      onClick={() => toggleAmenidad(amenidad)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        ficha.amenidades.includes(amenidad)
                          ? darkMode
                            ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                            : 'bg-blue-50 border-blue-500 text-blue-700'
                          : darkMode
                            ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {ficha.amenidades.includes(amenidad) && (
                        <Check className="w-3 h-3 inline mr-1" />
                      )}
                      {amenidad}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Marketing */}
          {activeTab === 'marketing' && (
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Título Destacado
                </label>
                <input
                  type="text"
                  value={ficha.tituloDestacado}
                  onChange={(e) => updateField('tituloDestacado', e.target.value)}
                  placeholder="¡Oportunidad Única en Miraflores!"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                />
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Este título aparecerá en grande en la publicación
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Frase Clave / Slogan
                </label>
                <input
                  type="text"
                  value={ficha.fraseClave}
                  onChange={(e) => updateField('fraseClave', e.target.value)}
                  placeholder="Vive donde siempre soñaste"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Tag className="w-4 h-4 inline mr-1" />
                  Etiquetas Promocionales ({ficha.etiquetas.length} seleccionadas)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {etiquetasDisponibles.map((etiqueta) => (
                    <button
                      key={etiqueta}
                      onClick={() => toggleEtiqueta(etiqueta)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        ficha.etiquetas.includes(etiqueta)
                          ? darkMode
                            ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                            : 'bg-purple-50 border-purple-500 text-purple-700'
                          : darkMode
                            ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {ficha.etiquetas.includes(etiqueta) && (
                        <Check className="w-3 h-3 inline mr-1" />
                      )}
                      {etiqueta}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                darkMode ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex gap-3">
                  <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <div>
                    <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>
                      Tips de Marketing:
                    </div>
                    <ul className={`text-sm space-y-1 ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                      <li>• Usa títulos que destaquen beneficios, no solo características</li>
                      <li>• Las etiquetas como "Estreno" o "Oportunidad" aumentan las visitas en 40%</li>
                      <li>• Menciona cercanía a servicios importantes (metro, colegios, parques)</li>
                      <li>• Incluye frases emocionales que conecten con el comprador ideal</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Vista Previa */}
              <div className={`p-6 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Vista Previa de Publicación
                  </h3>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  {ficha.etiquetas.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ficha.etiquetas.map((etiqueta) => (
                        <span key={etiqueta} className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                          {etiqueta}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {ficha.tituloDestacado || ficha.titulo}
                  </h2>
                  {ficha.fraseClave && (
                    <p className={`italic mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      "{ficha.fraseClave}"
                    </p>
                  )}
                  <div className={`flex flex-wrap gap-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span>🏠 {ficha.dormitorios} dorms</span>
                    <span>🚿 {ficha.banos} baños</span>
                    <span>📐 {ficha.areaTotal}m²</span>
                    <span>🚗 {ficha.estacionamientos} estac.</span>
                  </div>
                  <div className={`mt-3 text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {ficha.moneda} {parseInt(ficha.precioVenta).toLocaleString()}
                  </div>
                  <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    📍 {ficha.distrito}, {ficha.provincia}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} px-6 py-4 border-t flex items-center justify-between`}>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Completitud: {completitud}% • 
            {completitud >= 80 ? ' ✅ Ficha lista para publicar' : 
             completitud >= 50 ? ' ⚠️ Completa más campos' : 
             ' ❌ Faltan datos importantes'}
          </div>
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
              disabled={guardando || completitud < 50}
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                guardando || completitud < 50
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
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
                  Guardar Ficha
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
