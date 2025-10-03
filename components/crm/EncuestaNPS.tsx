'use client';

import { useState } from 'react';

interface EncuestaNPSProps {
  clienteNombre: string;
  propiedadDireccion: string;
  agenteNombre: string;
  onEnviar: (datos: {
    puntuacion: number;
    comentario: string;
    aspectosPositivos: string[];
    aspectosMejorar: string[];
    aceptaReferidos: boolean;
  }) => void;
  darkMode?: boolean;
}

export default function EncuestaNPS({
  clienteNombre,
  propiedadDireccion,
  agenteNombre,
  onEnviar,
  darkMode = true
}: EncuestaNPSProps) {
  const [puntuacion, setPuntuacion] = useState<number | null>(null);
  const [comentario, setComentario] = useState('');
  const [aspectosPositivos, setAspectosPositivos] = useState<string[]>([]);
  const [aspectosMejorar, setAspectosMejorar] = useState<string[]>([]);
  const [aceptaReferidos, setAceptaReferidos] = useState(false);
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [enviado, setEnviado] = useState(false);

  const aspectosPositivosOpciones = [
    'Comunicación clara y constante',
    'Profesionalismo y conocimiento',
    'Tiempo de respuesta rápido',
    'Negociación efectiva',
    'Documentación organizada',
    'Atención personalizada',
    'Disponibilidad',
    'Asesoría legal'
  ];

  const aspectosMejorarOpciones = [
    'Tiempo de respuesta',
    'Comunicación',
    'Conocimiento del mercado',
    'Negociación',
    'Documentación',
    'Puntualidad',
    'Seguimiento',
    'Asesoría'
  ];

  const toggleAspectoPositivo = (aspecto: string) => {
    if (aspectosPositivos.includes(aspecto)) {
      setAspectosPositivos(aspectosPositivos.filter(a => a !== aspecto));
    } else {
      setAspectosPositivos([...aspectosPositivos, aspecto]);
    }
  };

  const toggleAspectoMejorar = (aspecto: string) => {
    if (aspectosMejorar.includes(aspecto)) {
      setAspectosMejorar(aspectosMejorar.filter(a => a !== aspecto));
    } else {
      setAspectosMejorar([...aspectosMejorar, aspecto]);
    }
  };

  const getCategoria = (score: number): { nombre: string; color: string; emoji: string } => {
    if (score >= 9) {
      return { nombre: 'Promotor', color: 'emerald', emoji: '😍' };
    } else if (score >= 7) {
      return { nombre: 'Pasivo', color: 'yellow', emoji: '😐' };
    } else {
      return { nombre: 'Detractor', color: 'red', emoji: '😞' };
    }
  };

  const handleEnviar = () => {
    if (puntuacion === null) {
      alert('⚠️ Por favor selecciona una puntuación');
      return;
    }

    onEnviar({
      puntuacion,
      comentario,
      aspectosPositivos,
      aspectosMejorar,
      aceptaReferidos
    });

    setEnviado(true);
  };

  const displayScore = hoverScore !== null ? hoverScore : puntuacion;

  if (enviado) {
    return (
      <div className="text-center py-12">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
          darkMode ? 'bg-emerald-600' : 'bg-emerald-500'
        }`}>
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          ¡Gracias por tu feedback!
        </h3>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Tu opinión nos ayuda a mejorar nuestro servicio
        </p>
        {aceptaReferidos && (
          <div className={`inline-block px-6 py-3 rounded-lg border ${
            darkMode
              ? 'bg-blue-600/10 border-blue-600/30 text-blue-300'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <p className="text-sm font-medium">
              🎁 Gracias por aceptar ser parte de nuestro programa de referidos
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-4 rounded-lg border ${
        darkMode 
          ? 'bg-purple-600/10 border-purple-600/30' 
          : 'bg-purple-50 border-purple-200'
      }`}>
        <h3 className={`font-bold text-lg ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
          Encuesta de Satisfacción - NPS
        </h3>
        <p className={`text-sm mt-1 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
          Tu opinión es muy importante para nosotros
        </p>
        <div className={`text-xs mt-2 space-y-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          <p>Cliente: <span className="font-semibold">{clienteNombre}</span></p>
          <p>Propiedad: {propiedadDireccion}</p>
          <p>Agente: {agenteNombre}</p>
        </div>
      </div>

      {/* Pregunta Principal - NPS Score */}
      <div>
        <h4 className={`text-base font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          ¿Qué tan probable es que recomiendes nuestros servicios a un amigo o colega?
        </h4>
        
        {/* Escala 0-10 */}
        <div className="flex justify-between items-center gap-2 mb-3">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => {
            const isSelected = puntuacion === score;
            const isHovered = hoverScore === score;
            const categoria = getCategoria(score);
            
            return (
              <button
                key={score}
                onClick={() => setPuntuacion(score)}
                onMouseEnter={() => setHoverScore(score)}
                onMouseLeave={() => setHoverScore(null)}
                className={`flex-1 h-12 rounded-lg border-2 font-bold text-lg transition-all transform ${
                  isSelected || isHovered
                    ? `scale-110 shadow-lg ${
                        score >= 9
                          ? 'bg-emerald-500 border-emerald-600 text-white'
                          : score >= 7
                          ? 'bg-yellow-400 border-yellow-500 text-gray-900'
                          : 'bg-red-500 border-red-600 text-white'
                      }`
                    : darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {score}
              </button>
            );
          })}
        </div>

        {/* Etiquetas */}
        <div className="flex justify-between text-xs">
          <span className={darkMode ? 'text-red-400' : 'text-red-600'}>
            Nada probable
          </span>
          <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>
            Extremadamente probable
          </span>
        </div>

        {/* Feedback Visual */}
        {displayScore !== null && (
          <div className={`mt-4 p-4 rounded-lg border text-center transition-all ${
            displayScore >= 9
              ? darkMode
                ? 'bg-emerald-600/20 border-emerald-600/40'
                : 'bg-emerald-50 border-emerald-200'
              : displayScore >= 7
              ? darkMode
                ? 'bg-yellow-600/20 border-yellow-600/40'
                : 'bg-yellow-50 border-yellow-200'
              : darkMode
              ? 'bg-red-600/20 border-red-600/40'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">{getCategoria(displayScore).emoji}</span>
              <div className="text-left">
                <p className={`text-lg font-bold ${
                  displayScore >= 9
                    ? darkMode ? 'text-emerald-300' : 'text-emerald-900'
                    : displayScore >= 7
                    ? darkMode ? 'text-yellow-300' : 'text-yellow-900'
                    : darkMode ? 'text-red-300' : 'text-red-900'
                }`}>
                  {getCategoria(displayScore).nombre}
                </p>
                <p className={`text-xs ${
                  displayScore >= 9
                    ? darkMode ? 'text-emerald-200' : 'text-emerald-700'
                    : displayScore >= 7
                    ? darkMode ? 'text-yellow-200' : 'text-yellow-700'
                    : darkMode ? 'text-red-200' : 'text-red-700'
                }`}>
                  {displayScore >= 9
                    ? '¡Excelente! Clientes que recomiendan activamente'
                    : displayScore >= 7
                    ? 'Cliente satisfecho pero no activamente promotor'
                    : 'Cliente insatisfecho con riesgo de reseñas negativas'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Aspectos Positivos */}
      <div>
        <label className={`block text-sm font-semibold mb-3 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          ¿Qué aspectos destacarías de nuestro servicio? (Selecciona todos los que apliquen)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {aspectosPositivosOpciones.map((aspecto) => {
            const isSelected = aspectosPositivos.includes(aspecto);
            return (
              <button
                key={aspecto}
                onClick={() => toggleAspectoPositivo(aspecto)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all text-left ${
                  isSelected
                    ? darkMode
                      ? 'bg-emerald-600/20 border-emerald-600/50 text-emerald-300'
                      : 'bg-emerald-100 border-emerald-400 text-emerald-800'
                    : darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {isSelected && '✓ '}
                {aspecto}
              </button>
            );
          })}
        </div>
      </div>

      {/* Aspectos a Mejorar */}
      {puntuacion !== null && puntuacion < 9 && (
        <div>
          <label className={`block text-sm font-semibold mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            ¿En qué podríamos mejorar? (Opcional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {aspectosMejorarOpciones.map((aspecto) => {
              const isSelected = aspectosMejorar.includes(aspecto);
              return (
                <button
                  key={aspecto}
                  onClick={() => toggleAspectoMejorar(aspecto)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all text-left ${
                    isSelected
                      ? darkMode
                        ? 'bg-orange-600/20 border-orange-600/50 text-orange-300'
                        : 'bg-orange-100 border-orange-400 text-orange-800'
                      : darkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {isSelected && '⚠️ '}
                  {aspecto}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Comentarios */}
      <div>
        <label className={`block text-sm font-semibold mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Comentarios adicionales (opcional)
        </label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={4}
          placeholder="Cuéntanos más sobre tu experiencia..."
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
          }`}
        />
      </div>

      {/* Programa de Referidos */}
      {puntuacion !== null && puntuacion >= 7 && (
        <div className={`p-4 rounded-lg border ${
          darkMode
            ? 'bg-blue-600/10 border-blue-600/30'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={aceptaReferidos}
              onChange={(e) => setAceptaReferidos(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
            />
            <div>
              <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                🎁 Acepto participar en el programa de referidos
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Si conoces a alguien interesado en comprar o vender, nos encantaría poder ayudarle. 
                Podemos ofrecerte incentivos por cada referido exitoso.
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Botón de Envío */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
        <button
          onClick={handleEnviar}
          disabled={puntuacion === null}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-medium shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📤 Enviar Encuesta
        </button>
      </div>
    </div>
  );
}
