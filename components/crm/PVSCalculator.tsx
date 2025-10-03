"use client";

import { useState } from 'react';

type CMAAnalysis = {
  precioPromedio: number;
  precioMinimo: number;
  precioMaximo: number;
  propiedadesSimilares: number;
  recomendacion: string;
};

type PVSCalculatorProps = {
  propiedad: {
    direccion: string;
    distrito: string;
    area: number;
    habitaciones: number;
    baños: number;
  };
  onConfirmar?: (pvs: number, justificacion: string) => void;
  darkMode?: boolean;
};

export default function PVSCalculator({ propiedad, onConfirmar, darkMode = true }: PVSCalculatorProps) {
  const [cmaData] = useState<CMAAnalysis>({
    precioPromedio: 320000,
    precioMinimo: 280000,
    precioMaximo: 380000,
    propiedadesSimilares: 12,
    recomendacion: 'Basado en el análisis de propiedades similares en la zona, el rango de precio sugerido está alineado con el mercado actual.'
  });

  const [pvsSeleccionado, setPvsSeleccionado] = useState(cmaData.precioPromedio);
  const [justificacion, setJustificacion] = useState('');
  const [mostrarGrafico, setMostrarGrafico] = useState(true);

  const precioPorM2 = Math.round(pvsSeleccionado / propiedad.area);

  const handleConfirmar = () => {
    if (!justificacion.trim()) {
      alert('Por favor ingrese una justificación para el PVS');
      return;
    }
    onConfirmar?.(pvsSeleccionado, justificacion);
  };

  return (
    <div className="space-y-6">
      {/* Info del inmueble */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
        <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Información del Inmueble</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Distrito</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{propiedad.distrito}</p>
          </div>
          <div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Área</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{propiedad.area} m²</p>
          </div>
          <div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Habitaciones</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{propiedad.habitaciones}</p>
          </div>
          <div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Baños</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{propiedad.baños}</p>
          </div>
        </div>
      </div>

      {/* CMA Analysis */}
      <div className={`p-6 rounded-lg border ${darkMode ? 'bg-blue-600/10 border-blue-600/30' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className={`font-bold text-lg ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              Análisis Comparativo de Mercado (CMA)
            </h4>
            <p className={`text-sm mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              Datos de SUNARP y portales inmobiliarios
            </p>
          </div>
          <button 
            onClick={() => setMostrarGrafico(!mostrarGrafico)}
            className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            {mostrarGrafico ? 'Ocultar' : 'Mostrar'} gráfico
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Precio Mínimo</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              S/ {cmaData.precioMinimo.toLocaleString()}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'}`}>
            <p className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Precio Promedio</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
              S/ {cmaData.precioPromedio.toLocaleString()}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Precio Máximo</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              S/ {cmaData.precioMaximo.toLocaleString()}
            </p>
          </div>
        </div>

        {mostrarGrafico && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
            <div className="relative h-20 flex items-end justify-between">
              {[cmaData.precioMinimo, cmaData.precioPromedio, cmaData.precioMaximo].map((precio, idx) => {
                const altura = (precio / cmaData.precioMaximo) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full mx-2 rounded-t transition-all ${
                        idx === 1 ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}
                      style={{ height: `${altura}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Mín</span>
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Promedio</span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Máx</span>
            </div>
          </div>
        )}

        <p className={`text-sm mt-4 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          📊 {cmaData.propiedadesSimilares} propiedades similares analizadas en la zona
        </p>
        <p className={`text-sm mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
          {cmaData.recomendacion}
        </p>
      </div>

      {/* Selector de PVS */}
      <div>
        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Precio de Venta Sugerido (PVS)
        </label>
        
        <div className={`p-6 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={`text-3xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                S/ {pvsSeleccionado.toLocaleString()}
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                S/ {precioPorM2.toLocaleString()} por m²
              </p>
            </div>
          </div>

          <input
            type="range"
            min={cmaData.precioMinimo}
            max={cmaData.precioMaximo}
            step={5000}
            value={pvsSeleccionado}
            onChange={(e) => setPvsSeleccionado(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          
          <div className="flex justify-between text-xs mt-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              S/ {cmaData.precioMinimo.toLocaleString()}
            </span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              S/ {cmaData.precioMaximo.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Justificación */}
      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Justificación del Precio *
        </label>
        <textarea
          value={justificacion}
          onChange={(e) => setJustificacion(e.target.value)}
          placeholder="Ej: Precio basado en ubicación privilegiada, estado excelente del inmueble, y comparables recientes en la zona..."
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            darkMode 
              ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
              : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
          }`}
          rows={4}
        />
      </div>

      {/* Botón confirmar */}
      <button
        onClick={handleConfirmar}
        disabled={!justificacion.trim()}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          justificacion.trim()
            ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/20'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
      >
        Confirmar PVS
      </button>
    </div>
  );
}
