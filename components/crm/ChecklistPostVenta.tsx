'use client';

import { useState } from 'react';

interface TramitePostVenta {
  id: string;
  nombre: string;
  descripcion: string;
  completado: boolean;
  fechaCompletado?: string;
  responsable?: string;
  notas?: string;
  documentos?: { nombre: string; url: string }[];
}

interface ChecklistPostVentaProps {
  propiedadId: number;
  direccion: string;
  comprador: string;
  onActualizar: (tramites: TramitePostVenta[]) => void;
  darkMode?: boolean;
}

export default function ChecklistPostVenta({
  propiedadId,
  direccion,
  comprador,
  onActualizar,
  darkMode = true
}: ChecklistPostVentaProps) {
  const [tramites, setTramites] = useState<TramitePostVenta[]>([
    {
      id: 'luz',
      nombre: 'Transferencia de Luz',
      descripcion: 'Cambio de titular en Luz del Sur / Enel',
      completado: false,
      responsable: 'Comprador'
    },
    {
      id: 'agua',
      nombre: 'Transferencia de Agua',
      descripcion: 'Cambio de titular en Sedapal',
      completado: false,
      responsable: 'Comprador'
    },
    {
      id: 'gas',
      nombre: 'Transferencia de Gas',
      descripcion: 'Cambio de titular en Cálidda',
      completado: false,
      responsable: 'Comprador'
    },
    {
      id: 'predial',
      nombre: 'Actualización Predial',
      descripcion: 'Actualizar registro en municipalidad',
      completado: false,
      responsable: 'Comprador'
    },
    {
      id: 'arbitrios',
      nombre: 'Arbitrios Municipales',
      descripcion: 'Verificar que no existan deudas pendientes',
      completado: false,
      responsable: 'Vendedor'
    },
    {
      id: 'condominio',
      nombre: 'Cuotas de Condominio',
      descripcion: 'Verificar estado de cuenta con la junta de propietarios',
      completado: false,
      responsable: 'Vendedor'
    },
    {
      id: 'internet',
      nombre: 'Servicios Internet/Cable',
      descripcion: 'Coordinar transferencia o cancelación',
      completado: false,
      responsable: 'Comprador'
    },
    {
      id: 'seguridad',
      nombre: 'Sistema de Seguridad',
      descripcion: 'Cambiar códigos y actualizar contactos de emergencia',
      completado: false,
      responsable: 'Comprador'
    }
  ]);

  const [tramiteSeleccionado, setTramiteSeleccionado] = useState<TramitePostVenta | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [notas, setNotas] = useState('');
  const [fechaCompletado, setFechaCompletado] = useState('');

  const tramitesCompletados = tramites.filter(t => t.completado).length;
  const porcentajeCompletado = Math.round((tramitesCompletados / tramites.length) * 100);

  const toggleCompletado = (id: string) => {
    const tramiteActualizar = tramites.find(t => t.id === id);
    if (tramiteActualizar && !tramiteActualizar.completado) {
      setTramiteSeleccionado(tramiteActualizar);
      setModalAbierto(true);
      setFechaCompletado(new Date().toISOString().split('T')[0]);
    } else {
      // Desmarcar
      const nuevaLista = tramites.map(t =>
        t.id === id ? { ...t, completado: false, fechaCompletado: undefined, notas: undefined } : t
      );
      setTramites(nuevaLista);
      onActualizar(nuevaLista);
    }
  };

  const confirmarCompletado = () => {
    if (!tramiteSeleccionado) return;

    const nuevaLista = tramites.map(t =>
      t.id === tramiteSeleccionado.id
        ? { ...t, completado: true, fechaCompletado, notas }
        : t
    );

    setTramites(nuevaLista);
    onActualizar(nuevaLista);
    cerrarModal();
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTramiteSeleccionado(null);
    setNotas('');
    setFechaCompletado('');
  };

  const enviarRecordatorio = (tramite: TramitePostVenta) => {
    alert(`📧 Recordatorio enviado a ${comprador} sobre: ${tramite.nombre}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-4 rounded-lg border ${
        darkMode 
          ? 'bg-blue-600/10 border-blue-600/30' 
          : 'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              Checklist Post-Venta
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              {direccion}
            </p>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Comprador: {comprador}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              {porcentajeCompletado}%
            </p>
            <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              {tramitesCompletados} de {tramites.length}
            </p>
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className={`mt-4 w-full rounded-full h-3 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              porcentajeCompletado === 100
                ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
            }`}
            style={{ width: `${porcentajeCompletado}%` }}
          ></div>
        </div>
      </div>

      {/* Lista de Trámites */}
      <div className="space-y-3">
        {tramites.map((tramite, index) => (
          <div
            key={tramite.id}
            className={`p-4 rounded-lg border transition-all ${
              tramite.completado
                ? darkMode
                  ? 'bg-emerald-600/10 border-emerald-600/30'
                  : 'bg-emerald-50 border-emerald-200'
                : darkMode
                ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Checkbox */}
              <button
                onClick={() => toggleCompletado(tramite.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  tramite.completado
                    ? 'bg-emerald-500 border-emerald-500'
                    : darkMode
                    ? 'border-gray-600 hover:border-emerald-500'
                    : 'border-gray-300 hover:border-emerald-500'
                }`}
              >
                {tramite.completado && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Contenido */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`font-semibold ${
                      tramite.completado
                        ? darkMode ? 'text-emerald-300 line-through' : 'text-emerald-700 line-through'
                        : darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {index + 1}. {tramite.nombre}
                    </h4>
                    <p className={`text-sm mt-0.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {tramite.descripcion}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode 
                          ? 'bg-blue-600/20 text-blue-300' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        Responsable: {tramite.responsable}
                      </span>
                      {tramite.completado && tramite.fechaCompletado && (
                        <span className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          ✓ Completado: {new Date(tramite.fechaCompletado).toLocaleDateString('es-PE')}
                        </span>
                      )}
                    </div>
                    {tramite.notas && (
                      <p className={`text-xs mt-2 italic ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        📝 {tramite.notas}
                      </p>
                    )}
                  </div>

                  {/* Botón de recordatorio */}
                  {!tramite.completado && (
                    <button
                      onClick={() => enviarRecordatorio(tramite)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        darkMode
                          ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-600/30'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300'
                      }`}
                      title="Enviar recordatorio al comprador"
                    >
                      📧 Recordar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen Final */}
      {porcentajeCompletado === 100 && (
        <div className={`p-6 rounded-lg border ${
          darkMode
            ? 'bg-gradient-to-r from-emerald-600/20 to-green-600/20 border-emerald-600/40'
            : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-emerald-500' : 'bg-emerald-600'
            }`}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                ¡Todos los trámites completados!
              </h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-emerald-200' : 'text-emerald-700'}`}>
                El proceso post-venta ha sido finalizado exitosamente. Ahora puedes solicitar feedback y referidos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {modalAbierto && tramiteSeleccionado && (
        <div 
          onClick={cerrarModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-lg shadow-2xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Confirmar Completado
              </h3>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className={`p-4 rounded-lg border ${
                darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'
              }`}>
                <p className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  {tramiteSeleccionado.nombre}
                </p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-emerald-200' : 'text-emerald-700'}`}>
                  {tramiteSeleccionado.descripcion}
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Fecha de Completado *
                </label>
                <input
                  type="date"
                  value={fechaCompletado}
                  onChange={(e) => setFechaCompletado(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    darkMode
                      ? 'bg-gray-900 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Notas adicionales (opcional)
                </label>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={3}
                  placeholder="Ej: Trámite realizado en oficina principal, ticket #12345"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    darkMode
                      ? 'bg-gray-900 border-gray-600 text-white placeholder:text-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Footer */}
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end space-x-3`}>
              <button
                onClick={cerrarModal}
                className={`px-4 py-2 border rounded-lg transition-colors font-medium ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarCompletado}
                disabled={!fechaCompletado}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✓ Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
