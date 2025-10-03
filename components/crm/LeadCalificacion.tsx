"use client";

import { useState } from 'react';

type LeadCalificacionProps = {
  lead: {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    scoring?: number;
  };
  onCalificar?: (leadId: number, data: any) => void;
  darkMode?: boolean;
};

export default function LeadCalificacion({ lead, onCalificar, darkMode = true }: LeadCalificacionProps) {
  const [calificacion, setCalificacion] = useState({
    scoring: lead.scoring || 3,
    precalificado: false,
    presupuesto: '',
    urgencia: 'media' as 'baja' | 'media' | 'alta',
    financiamiento: 'contado' as 'contado' | 'credito' | 'mixto',
    notas: ''
  });

  const [precalificacionData, setPrecalificacionData] = useState({
    banco: '',
    montoAprobado: '',
    validez: ''
  });

  const handleCalificar = () => {
    onCalificar?.(lead.id, {
      ...calificacion,
      precalificacionData: calificacion.precalificado ? precalificacionData : null
    });
  };

  return (
    <div className="space-y-6">
      {/* Info del Lead */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
        <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lead.nombre}</h4>
        <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>📧 {lead.email}</p>
          <p>📱 {lead.telefono}</p>
        </div>
      </div>

      {/* Scoring */}
      <div>
        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Scoring del Lead (1-5 ⭐)
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => setCalificacion({ ...calificacion, scoring: score })}
              className={`p-4 rounded-lg border-2 transition-all ${
                calificacion.scoring >= score
                  ? 'border-amber-500 bg-amber-600/20'
                  : darkMode
                    ? 'border-[#3A3A3A] bg-[#1E1E1E] hover:border-[#4A4A4A]'
                    : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <span className={`text-2xl ${calificacion.scoring >= score ? 'text-amber-400' : darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                ★
              </span>
            </button>
          ))}
        </div>
        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          1 = Bajo interés | 5 = Listo para comprar
        </p>
      </div>

      {/* Presupuesto */}
      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Presupuesto Estimado (S/)
        </label>
        <input
          type="number"
          value={calificacion.presupuesto}
          onChange={(e) => setCalificacion({ ...calificacion, presupuesto: e.target.value })}
          placeholder="Ej: 300000"
          className={`w-full px-4 py-2 border rounded-lg ${
            darkMode 
              ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
              : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
          }`}
        />
      </div>

      {/* Urgencia y Financiamiento */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Urgencia
          </label>
          <select
            value={calificacion.urgencia}
            onChange={(e) => setCalificacion({ ...calificacion, urgencia: e.target.value as any })}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode 
                ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                : 'bg-white border-gray-400 text-gray-900'
            }`}
          >
            <option value="baja">Baja (exploración)</option>
            <option value="media">Media (1-3 meses)</option>
            <option value="alta">Alta (inmediato)</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Financiamiento
          </label>
          <select
            value={calificacion.financiamiento}
            onChange={(e) => setCalificacion({ ...calificacion, financiamiento: e.target.value as any })}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode 
                ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                : 'bg-white border-gray-400 text-gray-900'
            }`}
          >
            <option value="contado">Contado</option>
            <option value="credito">Crédito bancario</option>
            <option value="mixto">Mixto</option>
          </select>
        </div>
      </div>

      {/* Precalificación Bancaria */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Precalificación Bancaria
          </h4>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={calificacion.precalificado}
              onChange={(e) => setCalificacion({ ...calificacion, precalificado: e.target.checked })}
              className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {calificacion.precalificado ? '✓ Precalificado' : 'No precalificado'}
            </span>
          </label>
        </div>

        {calificacion.precalificado && (
          <div className="space-y-3 mt-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Banco
              </label>
              <input
                type="text"
                value={precalificacionData.banco}
                onChange={(e) => setPrecalificacionData({ ...precalificacionData, banco: e.target.value })}
                placeholder="Ej: BCP, Interbank, BBVA"
                className={`w-full px-4 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                    : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Monto Aprobado (S/)
              </label>
              <input
                type="number"
                value={precalificacionData.montoAprobado}
                onChange={(e) => setPrecalificacionData({ ...precalificacionData, montoAprobado: e.target.value })}
                placeholder="350000"
                className={`w-full px-4 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                    : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Validez de la Precalificación
              </label>
              <input
                type="date"
                value={precalificacionData.validez}
                onChange={(e) => setPrecalificacionData({ ...precalificacionData, validez: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg ${
                  darkMode 
                    ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                    : 'bg-white border-gray-400 text-gray-900'
                }`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Notas */}
      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Notas Adicionales
        </label>
        <textarea
          value={calificacion.notas}
          onChange={(e) => setCalificacion({ ...calificacion, notas: e.target.value })}
          placeholder="Observaciones sobre el lead, necesidades específicas, objeciones, etc..."
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg ${
            darkMode 
              ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
              : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
          }`}
        />
      </div>

      {/* Recomendaciones basadas en scoring */}
      {calificacion.scoring >= 4 && (
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'}`}>
          <p className={`font-semibold mb-2 ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
            ✓ Lead de Alta Calidad
          </p>
          <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
            Recomendación: Programar visita en las próximas 24-48 horas. Prioridad alta.
          </p>
        </div>
      )}

      {/* Botón */}
      <button
        onClick={handleCalificar}
        className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all font-semibold shadow-lg shadow-emerald-600/20"
      >
        Guardar Calificación
      </button>
    </div>
  );
}
