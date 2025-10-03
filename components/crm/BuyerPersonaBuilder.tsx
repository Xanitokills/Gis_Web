"use client";

import { useState } from 'react';

type BuyerPersona = 'familia-joven' | 'inversionista' | 'familia-grande' | 'jubilado' | 'ejecutivo' | 'personalizado';

type BuyerPersonaBuilderProps = {
  propiedadId: number;
  onConfirmar?: (persona: BuyerPersona, detalle: any) => void;
  darkMode?: boolean;
};

const personasPredefinidas = {
  'familia-joven': {
    nombre: 'Familia Joven Profesional',
    descripcion: 'Pareja de 30-40 años con 1-2 hijos, ingresos medios-altos',
    caracteristicas: ['Primera vivienda', 'Buscan colegios cercanos', 'Valoran seguridad', 'Áreas verdes'],
    enfoqueMarketing: 'Destacar espacios familiares, cercanía a colegios, parques y seguridad del vecindario'
  },
  'inversionista': {
    nombre: 'Inversionista',
    descripcion: 'Persona o empresa buscando ROI, 35-55 años',
    caracteristicas: ['Rentabilidad', 'Ubicación premium', 'Potencial de revalorización', 'Estado del inmueble'],
    enfoqueMarketing: 'Análisis de ROI, proyección de plusvalía, comparables de renta en la zona'
  },
  'familia-grande': {
    nombre: 'Familia Grande',
    descripcion: 'Familia de 4+ miembros, requieren espacio',
    caracteristicas: ['3+ dormitorios', 'Múltiples baños', 'Áreas comunes amplias', 'Estacionamiento'],
    enfoqueMarketing: 'Espacios amplios, funcionalidad, distribución inteligente'
  },
  'jubilado': {
    nombre: 'Adulto Mayor / Jubilado',
    descripcion: 'Persona mayor de 60 años, busca tranquilidad',
    caracteristicas: ['Primer piso o ascensor', 'Poco mantenimiento', 'Zona tranquila', 'Cerca de servicios médicos'],
    enfoqueMarketing: 'Accesibilidad, tranquilidad, bajo mantenimiento, servicios cercanos'
  },
  'ejecutivo': {
    nombre: 'Ejecutivo Soltero/a',
    descripcion: 'Profesional 25-40 años, sin hijos',
    caracteristicas: ['Ubicación céntrica', 'Cerca de oficinas', 'Amenidades modernas', 'Bajo mantenimiento'],
    enfoqueMarketing: 'Ubicación estratégica, modernidad, lifestyle urbano'
  }
};

export default function BuyerPersonaBuilder({ propiedadId, onConfirmar, darkMode = true }: BuyerPersonaBuilderProps) {
  const [personaSeleccionada, setPersonaSeleccionada] = useState<BuyerPersona | null>(null);
  const [personaCustom, setPersonaCustom] = useState({
    nombre: '',
    edad: '',
    ingresos: '',
    motivacion: '',
    caracteristicas: ''
  });

  const handleConfirmar = () => {
    if (!personaSeleccionada) {
      alert('Selecciona un buyer persona');
      return;
    }

    const detalle = personaSeleccionada === 'personalizado'
      ? personaCustom
      : personasPredefinidas[personaSeleccionada];

    onConfirmar?.(personaSeleccionada, detalle);
  };

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'bg-blue-600/10 border-blue-600/30' : 'bg-blue-50 border-blue-200'}`}>
        <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          <strong>¿Qué es un Buyer Persona?</strong> Es el perfil ideal del comprador para esta propiedad. 
          Nos ayuda a enfocar el marketing y las estrategias de venta de manera más efectiva.
        </p>
      </div>

      {/* Perfiles predefinidos */}
      <div>
        <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Selecciona un Perfil
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(personasPredefinidas) as BuyerPersona[]).map((key) => {
            const persona = personasPredefinidas[key];
            return (
              <button
                key={key}
                onClick={() => setPersonaSeleccionada(key)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  personaSeleccionada === key
                    ? 'border-emerald-500 bg-emerald-600/10'
                    : darkMode
                      ? 'border-[#3A3A3A] bg-[#1E1E1E] hover:border-[#4A4A4A]'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <h5 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {persona.nombre}
                </h5>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {persona.descripcion}
                </p>
                <div className="flex flex-wrap gap-2">
                  {persona.caracteristicas.slice(0, 3).map((car, idx) => (
                    <span 
                      key={idx}
                      className={`text-xs px-2 py-1 rounded ${
                        personaSeleccionada === key
                          ? 'bg-emerald-500 text-white'
                          : darkMode
                            ? 'bg-[#2A2A2A] text-gray-400'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {car}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}

          {/* Personalizado */}
          <button
            onClick={() => setPersonaSeleccionada('personalizado')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              personaSeleccionada === 'personalizado'
                ? 'border-emerald-500 bg-emerald-600/10'
                : darkMode
                  ? 'border-[#3A3A3A] bg-[#1E1E1E] hover:border-[#4A4A4A]'
                  : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <h5 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Personalizado
            </h5>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Define tu propio buyer persona
            </p>
          </button>
        </div>
      </div>

      {/* Detalle del perfil seleccionado */}
      {personaSeleccionada && personaSeleccionada !== 'personalizado' && (
        <div className={`p-6 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
          <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {personasPredefinidas[personaSeleccionada].nombre}
          </h4>
          
          <div className="space-y-4">
            <div>
              <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Características Clave:
              </p>
              <ul className={`space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {personasPredefinidas[personaSeleccionada].caracteristicas.map((car, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="text-emerald-500 mr-2">✓</span>
                    {car}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Enfoque de Marketing:
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {personasPredefinidas[personaSeleccionada].enfoqueMarketing}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulario personalizado */}
      {personaSeleccionada === 'personalizado' && (
        <div className={`p-6 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
          <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Define tu Buyer Persona
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Nombre del Perfil
              </label>
              <input
                type="text"
                value={personaCustom.nombre}
                onChange={(e) => setPersonaCustom({ ...personaCustom, nombre: e.target.value })}
                placeholder="Ej: Pareja de profesores"
                className={`w-full px-4 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                    : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Rango de Edad
              </label>
              <input
                type="text"
                value={personaCustom.edad}
                onChange={(e) => setPersonaCustom({ ...personaCustom, edad: e.target.value })}
                placeholder="Ej: 30-45 años"
                className={`w-full px-4 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                    : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Nivel de Ingresos
              </label>
              <select
                value={personaCustom.ingresos}
                onChange={(e) => setPersonaCustom({ ...personaCustom, ingresos: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                    : 'bg-white border-gray-400 text-gray-900'
                }`}
              >
                <option value="">Seleccionar...</option>
                <option value="bajo">Bajo (S/ 2,000 - 5,000)</option>
                <option value="medio">Medio (S/ 5,000 - 12,000)</option>
                <option value="alto">Alto (S/ 12,000 - 25,000)</option>
                <option value="muy-alto">Muy Alto (S/ 25,000+)</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Motivación de Compra
              </label>
              <textarea
                value={personaCustom.motivacion}
                onChange={(e) => setPersonaCustom({ ...personaCustom, motivacion: e.target.value })}
                placeholder="¿Qué busca este comprador? ¿Por qué compraría esta propiedad?"
                className={`w-full px-4 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                    : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                }`}
                rows={3}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Características que Valora
              </label>
              <textarea
                value={personaCustom.caracteristicas}
                onChange={(e) => setPersonaCustom({ ...personaCustom, caracteristicas: e.target.value })}
                placeholder="Ej: ubicación, precio, espacios amplios..."
                className={`w-full px-4 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                    : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                }`}
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Botón confirmar */}
      {personaSeleccionada && (
        <button
          onClick={handleConfirmar}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all font-semibold shadow-lg shadow-emerald-600/20"
        >
          Confirmar Buyer Persona
        </button>
      )}
    </div>
  );
}
