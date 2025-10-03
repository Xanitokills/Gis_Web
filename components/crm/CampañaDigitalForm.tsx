"use client";

import { useState } from 'react';

type CampañaDigitalFormProps = {
  propiedadId: number;
  onCrear?: (campana: any) => void;
  darkMode?: boolean;
};

export default function CampañaDigitalForm({ propiedadId, onCrear, darkMode = true }: CampañaDigitalFormProps) {
  const [campana, setCampana] = useState({
    plataforma: 'Facebook',
    presupuesto: 500,
    duracion: 14,
    audiencia: {
      edad: { min: 25, max: 45 },
      ubicacion: 'Lima Metropolitana',
      intereses: [] as string[]
    },
    creativos: {
      titulo: '',
      descripcion: '',
      callToAction: 'Más información'
    }
  });

  const plataformas = [
    { id: 'Facebook', nombre: 'Facebook', icono: '📘', costo: 'S/ 0.50 - 1.50 por clic' },
    { id: 'Instagram', nombre: 'Instagram', icono: '📷', costo: 'S/ 0.80 - 2.00 por clic' },
    { id: 'Google', nombre: 'Google Ads', icono: '🔍', costo: 'S/ 1.00 - 3.00 por clic' },
    { id: 'LinkedIn', nombre: 'LinkedIn', icono: '💼', costo: 'S/ 3.00 - 8.00 por clic' }
  ];

  const interesesSugeridos = [
    'Bienes raíces', 'Inversiones', 'Decoración del hogar', 'Arquitectura',
    'Finanzas personales', 'Familia', 'Mudanzas', 'Construcción'
  ];

  const callsToAction = [
    'Más información', 'Agendar visita', 'Contactar ahora', 'Ver inmueble', 
    'Solicitar información', 'Descargar brochure'
  ];

  const estimacion = {
    alcance: Math.round((campana.presupuesto / 0.05) * 10),
    clics: Math.round((campana.presupuesto / 1.2) * 0.8),
    leadsEstimados: Math.round((campana.presupuesto / 1.2) * 0.8 * 0.15)
  };

  const handleCrear = () => {
    if (!campana.creativos.titulo || !campana.creativos.descripcion) {
      alert('Completa el título y descripción de la campaña');
      return;
    }
    onCrear?.(campana);
  };

  return (
    <div className="space-y-6">
      {/* Selección de plataforma */}
      <div>
        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Plataforma de Publicidad
        </label>
        <div className="grid grid-cols-2 gap-3">
          {plataformas.map((plat) => (
            <button
              key={plat.id}
              onClick={() => setCampana({ ...campana, plataforma: plat.id })}
              className={`p-4 rounded-lg border-2 transition-all ${
                campana.plataforma === plat.id
                  ? 'border-emerald-500 bg-emerald-600/10'
                  : darkMode
                    ? 'border-[#3A3A3A] bg-[#1E1E1E] hover:border-[#4A4A4A]'
                    : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">{plat.icono}</div>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plat.nombre}</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{plat.costo}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Presupuesto y duración */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Presupuesto (S/)
          </label>
          <input
            type="number"
            value={campana.presupuesto}
            onChange={(e) => setCampana({ ...campana, presupuesto: parseInt(e.target.value) || 0 })}
            min="100"
            step="50"
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode 
                ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                : 'bg-white border-gray-400 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Duración (días)
          </label>
          <input
            type="number"
            value={campana.duracion}
            onChange={(e) => setCampana({ ...campana, duracion: parseInt(e.target.value) || 1 })}
            min="1"
            max="90"
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode 
                ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                : 'bg-white border-gray-400 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Audiencia */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
        <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Audiencia Objetivo</h4>
        
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Rango de Edad
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={campana.audiencia.edad.min}
                onChange={(e) => setCampana({
                  ...campana,
                  audiencia: { ...campana.audiencia, edad: { ...campana.audiencia.edad, min: parseInt(e.target.value) }}
                })}
                className={`w-20 px-3 py-2 border rounded-lg text-center ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                    : 'bg-white border-gray-400 text-gray-900'
                }`}
              />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>-</span>
              <input
                type="number"
                value={campana.audiencia.edad.max}
                onChange={(e) => setCampana({
                  ...campana,
                  audiencia: { ...campana.audiencia, edad: { ...campana.audiencia.edad, max: parseInt(e.target.value) }}
                })}
                className={`w-20 px-3 py-2 border rounded-lg text-center ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                    : 'bg-white border-gray-400 text-gray-900'
                }`}
              />
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>años</span>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Intereses (selecciona varios)
            </label>
            <div className="flex flex-wrap gap-2">
              {interesesSugeridos.map((interes) => (
                <button
                  key={interes}
                  onClick={() => {
                    const intereses = campana.audiencia.intereses.includes(interes)
                      ? campana.audiencia.intereses.filter(i => i !== interes)
                      : [...campana.audiencia.intereses, interes];
                    setCampana({ ...campana, audiencia: { ...campana.audiencia, intereses }});
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    campana.audiencia.intereses.includes(interes)
                      ? 'bg-emerald-500 text-white'
                      : darkMode
                        ? 'bg-[#2A2A2A] text-gray-400 hover:bg-[#3A3A3A]'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {interes}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Creativos */}
      <div>
        <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contenido del Anuncio</h4>
        
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Título del Anuncio *
            </label>
            <input
              type="text"
              value={campana.creativos.titulo}
              onChange={(e) => setCampana({ ...campana, creativos: { ...campana.creativos, titulo: e.target.value }})}
              placeholder="Ej: Departamento en Miraflores - Vista al Mar"
              maxLength={60}
              className={`w-full px-4 py-2 border rounded-lg ${
                darkMode 
                  ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                  : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
              }`}
            />
            <p className={`text-xs mt-1 text-right ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {campana.creativos.titulo.length}/60
            </p>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Descripción *
            </label>
            <textarea
              value={campana.creativos.descripcion}
              onChange={(e) => setCampana({ ...campana, creativos: { ...campana.creativos, descripcion: e.target.value }})}
              placeholder="Describe las características más atractivas del inmueble..."
              maxLength={200}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg ${
                darkMode 
                  ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                  : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
              }`}
            />
            <p className={`text-xs mt-1 text-right ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {campana.creativos.descripcion.length}/200
            </p>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Call to Action
            </label>
            <select
              value={campana.creativos.callToAction}
              onChange={(e) => setCampana({ ...campana, creativos: { ...campana.creativos, callToAction: e.target.value }})}
              className={`w-full px-4 py-2 border rounded-lg ${
                darkMode 
                  ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                  : 'bg-white border-gray-400 text-gray-900'
              }`}
            >
              {callsToAction.map(cta => (
                <option key={cta} value={cta}>{cta}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Estimación */}
      <div className={`p-6 rounded-lg border ${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'}`}>
        <h4 className={`font-bold mb-4 ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
          📊 Estimación de Resultados
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Alcance</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
              {(estimacion.alcance / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Clics Est.</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
              {estimacion.clics}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Leads Est.</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
              {estimacion.leadsEstimados}
            </p>
          </div>
        </div>
        <p className={`text-xs mt-4 text-center ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
          Basado en promedios de campañas similares en {campana.plataforma}
        </p>
      </div>

      {/* Botones */}
      <div className="flex space-x-3">
        <button
          onClick={handleCrear}
          className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all font-semibold shadow-lg shadow-emerald-600/20"
        >
          Crear Campaña
        </button>
        <button
          className={`px-6 py-3 border rounded-lg transition-colors font-semibold ${
            darkMode 
              ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A]' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Vista Previa
        </button>
      </div>
    </div>
  );
}
