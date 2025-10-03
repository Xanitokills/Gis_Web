'use client';

import { useState } from 'react';

interface Referido {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  interes: 'comprar' | 'vender';
  presupuesto?: string;
  distrito?: string;
  estado: 'Nuevo' | 'Contactado' | 'En Proceso' | 'Convertido' | 'Descartado';
  fechaRegistro: string;
  notas?: string;
  referidoPor: string;
}

interface SistemaReferidosProps {
  clienteNombre: string;
  clienteId: number;
  onRegistrarReferido: (referido: Omit<Referido, 'id' | 'estado' | 'fechaRegistro' | 'referidoPor'>) => void;
  darkMode?: boolean;
}

export default function SistemaReferidos({
  clienteNombre,
  clienteId,
  onRegistrarReferido,
  darkMode = true
}: SistemaReferidosProps) {
  const [paso, setPaso] = useState<'lista' | 'formulario'>('lista');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [interes, setInteres] = useState<'comprar' | 'vender'>('comprar');
  const [presupuesto, setPresupuesto] = useState('');
  const [distrito, setDistrito] = useState('');
  const [notas, setNotas] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);

  // Datos de ejemplo de referidos anteriores
  const [referidos] = useState<Referido[]>([
    {
      id: 1,
      nombre: 'Carlos Mendoza',
      telefono: '+51 987 654 321',
      email: 'carlos@email.com',
      interes: 'comprar',
      presupuesto: 'S/ 300,000 - S/ 400,000',
      distrito: 'Miraflores',
      estado: 'Convertido',
      fechaRegistro: '2025-08-15',
      referidoPor: clienteNombre
    },
    {
      id: 2,
      nombre: 'Ana Torres',
      telefono: '+51 912 345 678',
      email: 'ana@email.com',
      interes: 'vender',
      distrito: 'San Isidro',
      estado: 'En Proceso',
      fechaRegistro: '2025-09-10',
      referidoPor: clienteNombre
    }
  ]);

  const incentivos = [
    {
      tipo: 'Compra Exitosa',
      recompensa: 'S/ 500',
      condicion: 'Cuando tu referido compra una propiedad'
    },
    {
      tipo: 'Venta Exitosa',
      recompensa: 'S/ 800',
      condicion: 'Cuando tu referido vende una propiedad'
    },
    {
      tipo: 'Referido Premium',
      recompensa: 'S/ 1,200',
      condicion: 'Propiedades sobre S/ 500,000'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !telefono) {
      alert('⚠️ Por favor completa los campos obligatorios');
      return;
    }

    onRegistrarReferido({
      nombre,
      telefono,
      email,
      interes,
      presupuesto: presupuesto || undefined,
      distrito: distrito || undefined,
      notas: notas || undefined
    });

    // Limpiar formulario
    setNombre('');
    setTelefono('');
    setEmail('');
    setInteres('comprar');
    setPresupuesto('');
    setDistrito('');
    setNotas('');

    // Mostrar mensaje de éxito
    setMostrarExito(true);
    setTimeout(() => {
      setMostrarExito(false);
      setPaso('lista');
    }, 2500);
  };

  const getEstadoColor = (estado: Referido['estado']) => {
    switch (estado) {
      case 'Nuevo':
        return darkMode ? 'bg-blue-600/20 text-blue-300 border-blue-600/30' : 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Contactado':
        return darkMode ? 'bg-purple-600/20 text-purple-300 border-purple-600/30' : 'bg-purple-100 text-purple-700 border-purple-300';
      case 'En Proceso':
        return darkMode ? 'bg-yellow-600/20 text-yellow-300 border-yellow-600/30' : 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Convertido':
        return darkMode ? 'bg-emerald-600/20 text-emerald-300 border-emerald-600/30' : 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'Descartado':
        return darkMode ? 'bg-gray-600/20 text-gray-400 border-gray-600/30' : 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  if (mostrarExito) {
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
          ¡Referido Registrado!
        </h3>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Nos pondremos en contacto pronto
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-4 rounded-lg border ${
        darkMode 
          ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-600/40' 
          : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
              🎁 Programa de Referidos
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
              Gana recompensas por cada persona que nos recomiendes
            </p>
            <p className={`text-xs mt-1 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              Cliente: {clienteNombre}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
              {referidos.length}
            </p>
            <p className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
              Referidos
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-700">
        <button
          onClick={() => setPaso('lista')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            paso === 'lista'
              ? darkMode
                ? 'border-purple-500 text-purple-400'
                : 'border-purple-600 text-purple-600'
              : darkMode
              ? 'border-transparent text-gray-500 hover:text-gray-300'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          📊 Mis Referidos ({referidos.length})
        </button>
        <button
          onClick={() => setPaso('formulario')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            paso === 'formulario'
              ? darkMode
                ? 'border-purple-500 text-purple-400'
                : 'border-purple-600 text-purple-600'
              : darkMode
              ? 'border-transparent text-gray-500 hover:text-gray-300'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          ➕ Nuevo Referido
        </button>
      </div>

      {/* Contenido - Lista de Referidos */}
      {paso === 'lista' && (
        <div className="space-y-6">
          {/* Incentivos */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              💰 Tabla de Incentivos
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {incentivos.map((incentivo, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {incentivo.tipo}
                  </p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {incentivo.recompensa}
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {incentivo.condicion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Referidos */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              📋 Historial de Referidos
            </h4>
            {referidos.length === 0 ? (
              <div className={`text-center py-12 border-2 border-dashed rounded-lg ${
                darkMode ? 'border-gray-700' : 'border-gray-300'
              }`}>
                <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Aún no has registrado referidos
                </p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Haz clic en "Nuevo Referido" para comenzar
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {referidos.map((referido) => (
                  <div
                    key={referido.id}
                    className={`p-4 rounded-lg border transition-all ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {referido.nombre}
                          </h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEstadoColor(referido.estado)}`}>
                            {referido.estado}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            referido.interes === 'comprar'
                              ? darkMode ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                              : darkMode ? 'bg-orange-600/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {referido.interes === 'comprar' ? '🏠 Comprar' : '💰 Vender'}
                          </span>
                        </div>
                        <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <p>📞 {referido.telefono}</p>
                          {referido.email && <p>📧 {referido.email}</p>}
                          {referido.presupuesto && <p>💵 {referido.presupuesto}</p>}
                          {referido.distrito && <p>📍 {referido.distrito}</p>}
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Registrado: {new Date(referido.fechaRegistro).toLocaleDateString('es-PE')}
                          </p>
                        </div>
                      </div>
                      {referido.estado === 'Convertido' && (
                        <div className={`text-right ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          <p className="text-2xl font-bold">S/ 500</p>
                          <p className="text-xs">Recompensa</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resumen de Ganancias */}
          {referidos.some(r => r.estado === 'Convertido') && (
            <div className={`p-6 rounded-lg border ${
              darkMode
                ? 'bg-gradient-to-r from-emerald-600/20 to-green-600/20 border-emerald-600/40'
                : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    Total Ganado
                  </p>
                  <p className={`text-4xl font-bold mt-1 ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    S/ {referidos.filter(r => r.estado === 'Convertido').length * 500}
                  </p>
                </div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-emerald-500' : 'bg-emerald-600'
                }`}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contenido - Formulario */}
      {paso === 'formulario' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información del Referido */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Nombre Completo *
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: María González López"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Teléfono *
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+51 999 888 777"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@ejemplo.com"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Interés */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Interés Principal *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInteres('comprar')}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                  interes === 'comprar'
                    ? darkMode
                      ? 'bg-blue-600/20 border-blue-600 text-blue-300'
                      : 'bg-blue-100 border-blue-500 text-blue-900'
                    : darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                🏠 Comprar
              </button>
              <button
                type="button"
                onClick={() => setInteres('vender')}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                  interes === 'vender'
                    ? darkMode
                      ? 'bg-orange-600/20 border-orange-600 text-orange-300'
                      : 'bg-orange-100 border-orange-500 text-orange-900'
                    : darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                💰 Vender
              </button>
            </div>
          </div>

          {/* Detalles Opcionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Presupuesto / Precio
              </label>
              <input
                type="text"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                placeholder="Ej: S/ 300,000 - S/ 400,000"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Distrito de Interés
              </label>
              <input
                type="text"
                value={distrito}
                onChange={(e) => setDistrito(e.target.value)}
                placeholder="Ej: Miraflores, San Isidro"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Notas Adicionales
            </label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
              placeholder="Ej: Busca departamento con 3 dormitorios, preaprobado por banco..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
              }`}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={() => setPaso('lista')}
              className={`px-4 py-2 border rounded-lg transition-colors font-medium ${
                darkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-medium shadow-lg shadow-purple-600/20"
            >
              🎁 Registrar Referido
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
