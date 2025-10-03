"use client";

import { useState } from 'react';

type Oferta = {
  id: number;
  cliente: string;
  monto: number;
  fecha: string;
  estado: 'Pendiente' | 'Aceptada' | 'Rechazada' | 'Contraofertar';
  validez: string;
  condiciones?: string[];
};

type GestionOfertasProps = {
  propiedad: {
    id: number;
    pvs: number;
    direccion: string;
  };
  ofertas: Oferta[];
  onAccion?: (accion: string, ofertaId: number, data?: any) => void;
  darkMode?: boolean;
};

export default function GestionOfertas({ propiedad, ofertas, onAccion, darkMode = true }: GestionOfertasProps) {
  const [mostrarContraoferta, setMostrarContraoferta] = useState<number | null>(null);
  const [contraofertaMonto, setContraofertaMonto] = useState('');
  const [mostrarArras, setMostrarArras] = useState(false);
  const [arrasData, setArrasData] = useState({
    monto: '',
    metodoPago: 'transferencia' as 'transferencia' | 'cheque' | 'efectivo',
    clausulas: [] as string[]
  });

  const clausulasStandard = [
    'Devolución del 100% si el comprador no obtiene financiamiento en 30 días',
    'Pérdida total de las arras si el comprador desiste sin causa justificada',
    'Las arras se aplicarán al precio final de venta',
    'Firma de escritura pública en un plazo máximo de 60 días'
  ];

  const handleContraofertar = (ofertaId: number) => {
    if (!contraofertaMonto) {
      alert('Ingresa el monto de la contraoferta');
      return;
    }
    onAccion?.('contraofertar', ofertaId, { monto: parseInt(contraofertaMonto) });
    setMostrarContraoferta(null);
    setContraofertaMonto('');
  };

  const handleFirmarArras = (ofertaId: number) => {
    if (!arrasData.monto) {
      alert('Ingresa el monto de las arras');
      return;
    }
    if (arrasData.clausulas.length === 0) {
      alert('Selecciona al menos una cláusula');
      return;
    }
    onAccion?.('firmar-arras', ofertaId, arrasData);
    setMostrarArras(false);
  };

  const calcularDesviacion = (monto: number) => {
    const desviacion = ((monto - propiedad.pvs) / propiedad.pvs) * 100;
    return desviacion.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Info de la propiedad */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Propiedad</p>
        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{propiedad.direccion}</p>
        <p className={`text-lg font-bold mt-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          PVS: S/ {propiedad.pvs.toLocaleString()}
        </p>
      </div>

      {/* Lista de ofertas */}
      <div className="space-y-4">
        {ofertas.map((oferta) => (
          <div 
            key={oferta.id} 
            className={`p-6 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {oferta.cliente}
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Oferta recibida: {new Date(oferta.fecha).toLocaleDateString('es-PE')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                oferta.estado === 'Aceptada' 
                  ? 'bg-emerald-100 text-emerald-800'
                  : oferta.estado === 'Rechazada'
                    ? 'bg-red-100 text-red-800'
                    : oferta.estado === 'Contraofertar'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
              }`}>
                {oferta.estado}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#252525]' : 'bg-gray-50'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monto Ofrecido</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  S/ {oferta.monto.toLocaleString()}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#252525]' : 'bg-gray-50'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Desviación del PVS</p>
                <p className={`text-2xl font-bold ${
                  parseFloat(calcularDesviacion(oferta.monto)) >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {calcularDesviacion(oferta.monto)}%
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#252525]' : 'bg-gray-50'}`}>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Validez</p>
                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Hasta {new Date(oferta.validez).toLocaleDateString('es-PE')}
                </p>
              </div>
            </div>

            {oferta.condiciones && oferta.condiciones.length > 0 && (
              <div className="mb-4">
                <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Condiciones:
                </p>
                <ul className={`space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {oferta.condiciones.map((cond, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="mr-2">•</span>
                      {cond}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Acciones */}
            {oferta.estado === 'Pendiente' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => onAccion?.('aceptar', oferta.id)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all font-medium"
                >
                  ✓ Aceptar
                </button>
                <button
                  onClick={() => setMostrarContraoferta(oferta.id)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-all font-medium"
                >
                  ↔ Contraofertar
                </button>
                <button
                  onClick={() => onAccion?.('rechazar', oferta.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all font-medium"
                >
                  ✕ Rechazar
                </button>
              </div>
            )}

            {oferta.estado === 'Aceptada' && (
              <button
                onClick={() => setMostrarArras(true)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all font-medium"
              >
                📝 Firmar Arras
              </button>
            )}

            {/* Formulario de contraoferta */}
            {mostrarContraoferta === oferta.id && (
              <div className={`mt-4 p-4 rounded-lg border ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
                <h5 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Realizar Contraoferta
                </h5>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nuevo Monto (S/)
                    </label>
                    <input
                      type="number"
                      value={contraofertaMonto}
                      onChange={(e) => setContraofertaMonto(e.target.value)}
                      placeholder={propiedad.pvs.toString()}
                      className={`w-full px-4 py-2 border rounded-lg ${
                        darkMode 
                          ? 'bg-[#1E1E1E] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                          : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                      }`}
                    />
                  </div>
                  <div className="pt-7">
                    <button
                      onClick={() => handleContraofertar(oferta.id)}
                      className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-all font-medium"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
                {contraofertaMonto && (
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Diferencia: S/ {(parseInt(contraofertaMonto) - oferta.monto).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de Arras */}
      {mostrarArras && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${darkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
            <div className={`p-6 border-b ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Firma de Contrato de Arras
              </h3>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Monto de las Arras (S/) *
                </label>
                <input
                  type="number"
                  value={arrasData.monto}
                  onChange={(e) => setArrasData({ ...arrasData, monto: e.target.value })}
                  placeholder="Típicamente 5-10% del precio de venta"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                      : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                  }`}
                />
                {arrasData.monto && (
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {((parseInt(arrasData.monto) / propiedad.pvs) * 100).toFixed(2)}% del precio de venta
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Método de Pago
                </label>
                <select
                  value={arrasData.metodoPago}
                  onChange={(e) => setArrasData({ ...arrasData, metodoPago: e.target.value as any })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                      : 'bg-white border-gray-400 text-gray-900'
                  }`}
                >
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="cheque">Cheque de gerencia</option>
                  <option value="efectivo">Efectivo</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cláusulas del Contrato *
                </label>
                <div className="space-y-2">
                  {clausulasStandard.map((clausula, idx) => (
                    <label key={idx} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={arrasData.clausulas.includes(clausula)}
                        onChange={(e) => {
                          const clausulas = e.target.checked
                            ? [...arrasData.clausulas, clausula]
                            : arrasData.clausulas.filter(c => c !== clausula);
                          setArrasData({ ...arrasData, clausulas });
                        }}
                        className="mt-1 w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {clausula}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-amber-600/10 border-amber-600/30' : 'bg-amber-50 border-amber-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                  <strong>Importante:</strong> Las arras son un depósito vinculante. Asegúrate de revisar todas las cláusulas antes de firmar.
                </p>
              </div>
            </div>

            <div className={`p-6 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'} flex space-x-3`}>
              <button
                onClick={() => setMostrarArras(false)}
                className={`flex-1 py-2 border rounded-lg transition-colors font-medium ${
                  darkMode 
                    ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A]' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleFirmarArras(ofertas[0].id)}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all font-medium"
              >
                Firmar Arras
              </button>
            </div>
          </div>
        </div>
      )}

      {ofertas.length === 0 && (
        <div className={`p-8 rounded-lg border text-center ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Aún no se han recibido ofertas para esta propiedad
          </p>
        </div>
      )}
    </div>
  );
}
