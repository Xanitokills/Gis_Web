"use client";

import { useState } from 'react';

type EtapaCierreStatus = 'Completado' | 'En Proceso' | 'Pendiente' | 'Retrasado';

type EtapaCierre = {
  nombre: string;
  status: EtapaCierreStatus;
  fecha: string | null;
  responsable?: string;
  notas?: string;
  documentos?: Array<{ nombre: string; url: string }>;
};

type LineaTiempoCierreProps = {
  propiedad: {
    id: number;
    direccion: string;
    comprador: string;
    precioFinal: number;
  };
  etapas: {
    tasacion: EtapaCierre;
    notaria: EtapaCierre;
    escritura: EtapaCierre;
    entregaLlaves: EtapaCierre;
  };
  onActualizar?: (etapa: string, data: any) => void;
  darkMode?: boolean;
};

export default function LineaTiempoCierre({ propiedad, etapas, onActualizar, darkMode = true }: LineaTiempoCierreProps) {
  const [etapaSeleccionada, setEtapaSeleccionada] = useState<string | null>(null);
  const [formulario, setFormulario] = useState({
    status: 'Pendiente' as EtapaCierreStatus,
    fecha: '',
    notas: ''
  });

  const getStatusColor = (status: EtapaCierreStatus) => {
    switch (status) {
      case 'Completado':
        return darkMode ? 'bg-emerald-500' : 'bg-emerald-600';
      case 'En Proceso':
        return darkMode ? 'bg-blue-500' : 'bg-blue-600';
      case 'Retrasado':
        return darkMode ? 'bg-red-500' : 'bg-red-600';
      default:
        return darkMode ? 'bg-gray-600' : 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: EtapaCierreStatus) => {
    switch (status) {
      case 'Completado':
        return '✓';
      case 'En Proceso':
        return '⟳';
      case 'Retrasado':
        return '⚠';
      default:
        return '○';
    }
  };

  const etapasArray = [
    { key: 'tasacion', data: etapas.tasacion, icono: '📊', nombre: 'Tasación Bancaria' },
    { key: 'notaria', data: etapas.notaria, icono: '🏛️', nombre: 'Coordinación Notaría' },
    { key: 'escritura', data: etapas.escritura, icono: '📝', nombre: 'Firma Escritura' },
    { key: 'entregaLlaves', data: etapas.entregaLlaves, icono: '🔑', nombre: 'Entrega de Llaves' }
  ];

  const calcularProgreso = () => {
    const completadas = etapasArray.filter(e => e.data.status === 'Completado').length;
    return (completadas / etapasArray.length) * 100;
  };

  const diasEstimados = () => {
    const hoy = new Date();
    let diasTotal = 0;
    
    etapasArray.forEach(etapa => {
      if (etapa.data.status !== 'Completado' && etapa.data.fecha) {
        const fechaEtapa = new Date(etapa.data.fecha);
        const diff = Math.ceil((fechaEtapa.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > diasTotal) diasTotal = diff;
      }
    });
    
    return diasTotal;
  };

  const handleActualizar = () => {
    if (!etapaSeleccionada) return;
    onActualizar?.(etapaSeleccionada, formulario);
    setEtapaSeleccionada(null);
    setFormulario({ status: 'Pendiente', fecha: '', notas: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header con info de la propiedad */}
      <div className={`p-6 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-start justify-between">
          <div>
            <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {propiedad.direccion}
            </h4>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Comprador: {propiedad.comprador}
            </p>
            <p className={`text-lg font-bold mt-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Precio Final: S/ {propiedad.precioFinal.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progreso General</p>
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {calcularProgreso().toFixed(0)}%
            </p>
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {diasEstimados() > 0 ? `${diasEstimados()} días estimados` : 'Próximo a completar'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mt-4 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`}>
          <div 
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${calcularProgreso()}%` }}
          />
        </div>
      </div>

      {/* Timeline Visual */}
      <div className="relative">
        {/* Línea conectora */}
        <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-[#3A3A3A]' : 'bg-gray-300'}`} />

        {/* Etapas */}
        <div className="space-y-6">
          {etapasArray.map((etapa, index) => (
            <div key={etapa.key} className="relative pl-20">
              {/* Icono en la timeline */}
              <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                darkMode ? 'border-[#1A1A1A] bg-[#2A2A2A]' : 'border-white bg-gray-100'
              } ${getStatusColor(etapa.data.status)}`}>
                <span className="text-2xl">{etapa.icono}</span>
              </div>

              {/* Contenido de la etapa */}
              <div className={`p-6 rounded-lg border transition-all ${
                etapa.data.status === 'Completado'
                  ? darkMode 
                    ? 'bg-emerald-600/10 border-emerald-600/30'
                    : 'bg-emerald-50 border-emerald-200'
                  : etapa.data.status === 'Retrasado'
                    ? darkMode
                      ? 'bg-red-600/10 border-red-600/30'
                      : 'bg-red-50 border-red-200'
                    : darkMode
                      ? 'bg-[#1E1E1E] border-[#3A3A3A]'
                      : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {etapa.nombre}
                    </h5>
                    {etapa.data.responsable && (
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Responsable: {etapa.data.responsable}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                    etapa.data.status === 'Completado'
                      ? 'bg-emerald-100 text-emerald-800'
                      : etapa.data.status === 'En Proceso'
                        ? 'bg-blue-100 text-blue-800'
                        : etapa.data.status === 'Retrasado'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}>
                    <span>{getStatusIcon(etapa.data.status)}</span>
                    <span>{etapa.data.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Fecha programada</p>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {etapa.data.fecha ? new Date(etapa.data.fecha).toLocaleDateString('es-PE') : 'Por definir'}
                    </p>
                  </div>
                  {etapa.data.status === 'Retrasado' && (
                    <div>
                      <p className={`text-xs text-red-500`}>⚠ Retraso detectado</p>
                      <p className={`text-sm font-semibold text-red-600`}>Requiere atención</p>
                    </div>
                  )}
                </div>

                {etapa.data.notas && (
                  <div className={`p-3 rounded-lg mb-3 ${darkMode ? 'bg-[#252525]' : 'bg-gray-50'}`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {etapa.data.notas}
                    </p>
                  </div>
                )}

                {etapa.data.documentos && etapa.data.documentos.length > 0 && (
                  <div className="mb-3">
                    <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Documentos adjuntos:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {etapa.data.documentos.map((doc, idx) => (
                        <a
                          key={idx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs px-3 py-1 rounded-full transition-colors ${
                            darkMode 
                              ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          📄 {doc.nombre}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {etapa.data.status !== 'Completado' && (
                  <button
                    onClick={() => {
                      setEtapaSeleccionada(etapa.key);
                      setFormulario({
                        status: etapa.data.status,
                        fecha: etapa.data.fecha || '',
                        notas: etapa.data.notas || ''
                      });
                    }}
                    className={`w-full py-2 rounded-lg transition-all font-medium text-sm ${
                      darkMode
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200'
                    }`}
                  >
                    Actualizar Estado
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de actualización */}
      {etapaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-xl ${darkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
            <div className={`p-6 border-b ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Actualizar Etapa
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Estado
                </label>
                <select
                  value={formulario.status}
                  onChange={(e) => setFormulario({ ...formulario, status: e.target.value as EtapaCierreStatus })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                      : 'bg-white border-gray-400 text-gray-900'
                  }`}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Completado">Completado</option>
                  <option value="Retrasado">Retrasado</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Fecha Programada
                </label>
                <input
                  type="date"
                  value={formulario.fecha}
                  onChange={(e) => setFormulario({ ...formulario, fecha: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-[#252525] border-[#3A3A3A] text-white' 
                      : 'bg-white border-gray-400 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Notas
                </label>
                <textarea
                  value={formulario.notas}
                  onChange={(e) => setFormulario({ ...formulario, notas: e.target.value })}
                  placeholder="Observaciones, detalles adicionales..."
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' 
                      : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'
                  }`}
                />
              </div>
            </div>

            <div className={`p-6 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'} flex space-x-3`}>
              <button
                onClick={() => setEtapaSeleccionada(null)}
                className={`flex-1 py-2 border rounded-lg transition-colors font-medium ${
                  darkMode 
                    ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A]' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={handleActualizar}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all font-medium"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alertas */}
      {etapasArray.some(e => e.data.status === 'Retrasado') && (
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-red-600/10 border-red-600/30' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                Atención: Etapas con retraso
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                Una o más etapas del cierre presentan retrasos. Contacta a los responsables para agilizar el proceso.
              </p>
            </div>
          </div>
        </div>
      )}

      {calcularProgreso() === 100 && (
        <div className={`p-6 rounded-lg border text-center ${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className="text-4xl mb-3">🎉</div>
          <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
            ¡Cierre Completado!
          </h4>
          <p className={`${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
            Todas las etapas han sido completadas exitosamente. La propiedad puede avanzar a Post-Venta.
          </p>
        </div>
      )}
    </div>
  );
}
