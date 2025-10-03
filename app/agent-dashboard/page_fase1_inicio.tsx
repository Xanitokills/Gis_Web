// COMPONENTE PARA FASE 1: INICIO
// Objetivo: Validar la legalidad del inmueble y formalizar la relación con el vendedor

export function FaseInicio() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <span>📋</span>
              <span>Fase 1: INICIO</span>
            </h2>
            <p className="text-gray-600 mt-1">Validar legalidad del inmueble y formalizar relación con el vendedor</p>
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition shadow-md">
            ➕ Nueva Captación
          </button>
        </div>

        {/* Checklist de Documentos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-white">
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <span>📄</span>
              <span>Carga de Documentos Legales</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Partida registral actualizada', status: true, validUntil: '2025-12-31' },
                { name: 'Contrato de exclusividad firmado', status: true, validUntil: '' },
                { name: 'DNI del propietario', status: true, validUntil: '' },
                { name: 'Plano catastral', status: false, validUntil: '' },
                { name: 'Certificado de no adeudo municipal', status: false, validUntil: '' }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded border border-gray-200 hover:border-blue-300 transition">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={doc.status} 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                      readOnly 
                    />
                    <div>
                      <span className={doc.status ? 'text-gray-900 font-medium' : 'text-gray-500'}>{doc.name}</span>
                      {doc.validUntil && (
                        <p className="text-xs text-green-600">Válido hasta: {doc.validUntil}</p>
                      )}
                    </div>
                  </div>
                  {doc.status ? (
                    <span className="text-green-600 text-sm font-medium">✓ Validado</span>
                  ) : (
                    <button className="text-blue-600 text-sm hover:underline font-medium">📤 Subir</button>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium shadow-md">
              Enviar para Validación Legal (SUNARP)
            </button>
          </div>

          {/* Firma de Contrato */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-white">
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <span>✍️</span>
              <span>Firma de Contrato de Exclusividad</span>
            </h3>
            <div className="bg-white p-4 rounded mb-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Documento listo para firma:</p>
              <p className="font-medium text-lg">📄 Contrato_Exclusividad_Juan_Perez.pdf</p>
              <p className="text-xs text-gray-500 mt-1">Generado: 02/10/2025 - 10:30 AM</p>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium shadow-md flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>Firma Digital (DocuSign)</span>
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium flex items-center justify-center space-x-2">
                <span>📸</span>
                <span>Escanear Firma Física</span>
              </button>
            </div>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-800 flex items-center space-x-2">
                <span>✓</span>
                <span>Confirmación automática al agente y CRM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Definición de PVS */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-orange-50 to-white">
          <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
            <span>💰</span>
            <span>Definición del Precio de Venta Sugerido (PVS)</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio Sugerido (SmartCore BI)</label>
              <input 
                type="text" 
                defaultValue="S/ 280,000"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-xl font-bold focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                <span>📊</span>
                <span>Basado en análisis CMA SmartCore BI</span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Justificación del Precio</label>
              <textarea 
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={4}
                placeholder="Explicar razón del precio sugerido basado en ubicación, estado, amenidades..."
                defaultValue="Inmueble en zona premium con alta demanda. Remodelado hace 2 años. Cuenta con 3 dormitorios y 2 baños completos."
              ></textarea>
            </div>
          </div>
          <div className="mt-6 p-5 bg-white rounded-lg border-2 border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-3 flex items-center space-x-2">
              <span>📊</span>
              <span>Análisis Comparativo de Mercado (CMA) - Datos SUNARP</span>
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded">
                <p className="text-gray-600 mb-1">Precio Promedio Zona</p>
                <p className="font-bold text-xl text-blue-600">S/ 275,000</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded">
                <p className="text-gray-600 mb-1">Precio m² Zona</p>
                <p className="font-bold text-xl text-blue-600">S/ 3,200</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded">
                <p className="text-gray-600 mb-1">Tiempo Promedio Venta</p>
                <p className="font-bold text-xl text-blue-600">45 días</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-bold shadow-lg text-lg">
            ✅ Confirmar PVS y Registrar en CRM
          </button>
        </div>

        {/* Métricas Fase Inicio */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-lg shadow-md">
            <p className="text-sm opacity-90 mb-1">Validación Legal Completa</p>
            <p className="text-3xl font-bold">92%</p>
            <p className="text-xs mt-1 opacity-80">De todos los listados</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-lg shadow-md">
            <p className="text-sm opacity-90 mb-1">Tasa de Captación</p>
            <p className="text-3xl font-bold">78%</p>
            <p className="text-xs mt-1 opacity-80">Reuniones → Exclusividad</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-5 rounded-lg shadow-md">
            <p className="text-sm opacity-90 mb-1">Tiempo Promedio</p>
            <p className="text-3xl font-bold">3.2 días</p>
            <p className="text-xs mt-1 opacity-80">Contacto → Firma</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-5 rounded-lg shadow-md">
            <p className="text-sm opacity-90 mb-1">Scoring Promedio</p>
            <p className="text-3xl font-bold">4.2/5</p>
            <p className="text-xs mt-1 opacity-80">Calidad del lead</p>
          </div>
        </div>

        {/* Listado de Propiedades en Fase Inicio */}
        <div className="mt-6 border border-gray-200 rounded-lg p-6 bg-white">
          <h3 className="font-semibold text-lg mb-4">🏠 Propiedades en Fase INICIO (25)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Propiedad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Propietario</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">PVS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Documentos</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { id: 101, title: 'Casa Surco - Av. Principal', owner: 'Roberto Díaz', pvs: 350000, docsComplete: 60 },
                  { id: 102, title: 'Dpto San Borja 3 hab', owner: 'Carmen López', pvs: 280000, docsComplete: 100 },
                  { id: 103, title: 'Casa La Molina Country', owner: 'Luis Martínez', pvs: 750000, docsComplete: 40 }
                ].map((prop) => (
                  <tr key={prop.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{prop.title}</div>
                      <div className="text-xs text-gray-500">ID: {prop.id}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{prop.owner}</td>
                    <td className="px-4 py-4 text-sm font-bold text-orange-600">S/ {prop.pvs.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${prop.docsComplete === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${prop.docsComplete}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{prop.docsComplete}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Ver</button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">Gestionar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
