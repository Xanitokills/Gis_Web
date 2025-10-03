"use client";

import { useState } from 'react';

type ContratoExclusividadProps = {
  propiedad: {
    direccion: string;
    propietario: string;
    pvs: number;
  };
  onFirmar?: (tipoFirma: 'digital' | 'fisica') => void;
  darkMode?: boolean;
};

export default function ContratoExclusividad({ propiedad, onFirmar, darkMode = true }: ContratoExclusividadProps) {
  const [tipoFirma, setTipoFirma] = useState<'digital' | 'fisica'>('digital');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [firmado, setFirmado] = useState(false);

  const handleFirmar = () => {
    if (!aceptaTerminos) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }
    
    setFirmado(true);
    onFirmar?.(tipoFirma);
  };

  if (firmado) {
    return (
      <div className={`p-8 rounded-lg border text-center ${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'}`}>
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
          ¡Contrato Firmado Exitosamente!
        </h3>
        <p className={`${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
          El contrato de exclusividad ha sido registrado. La propiedad puede avanzar a la siguiente fase.
        </p>
        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Tipo de firma: <span className="font-semibold">{tipoFirma === 'digital' ? 'Digital' : 'Física'}</span>
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Fecha: <span className="font-semibold">{new Date().toLocaleDateString('es-PE')}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Vista previa del contrato */}
      <div className={`p-6 rounded-lg border max-h-96 overflow-y-auto ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          CONTRATO DE EXCLUSIVIDAD
        </h3>
        
        <div className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>
            Conste por el presente documento, el CONTRATO DE EXCLUSIVIDAD que celebran de una parte <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{propiedad.propietario}</strong> (en adelante "EL PROPIETARIO"), y de la otra parte <strong className={darkMode ? 'text-white' : 'text-gray-900'}>SMARTCORE BI</strong> (en adelante "LA INMOBILIARIA"), en los términos y condiciones siguientes:
          </p>

          <div>
            <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>PRIMERA: OBJETO DEL CONTRATO</h4>
            <p>
              EL PROPIETARIO otorga a LA INMOBILIARIA la exclusividad para la comercialización del inmueble ubicado en <strong>{propiedad.direccion}</strong>, con un Precio de Venta Sugerido de <strong>S/ {propiedad.pvs.toLocaleString()}</strong>.
            </p>
          </div>

          <div>
            <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>SEGUNDA: PLAZO</h4>
            <p>
              El presente contrato tendrá una vigencia de NOVENTA (90) días calendario, contados a partir de la fecha de firma, renovable automáticamente por períodos iguales salvo notificación en contrario con 30 días de anticipación.
            </p>
          </div>

          <div>
            <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>TERCERA: COMISIÓN</h4>
            <p>
              LA INMOBILIARIA percibirá una comisión del 5% sobre el precio final de venta del inmueble, monto que será cancelado al momento de la firma de la escritura pública de compraventa.
            </p>
          </div>

          <div>
            <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>CUARTA: OBLIGACIONES DE LA INMOBILIARIA</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Realizar la difusión del inmueble en portales inmobiliarios</li>
              <li>Coordinar visitas con potenciales compradores</li>
              <li>Mantener informado al propietario sobre el avance del proceso</li>
              <li>Asesorar en la negociación y cierre de la venta</li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>QUINTA: OBLIGACIONES DEL PROPIETARIO</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Proporcionar acceso al inmueble para visitas coordinadas</li>
              <li>Entregar documentación legal completa</li>
              <li>No comercializar el inmueble por cuenta propia o terceros</li>
              <li>Mantener el inmueble en condiciones de venta</li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>SEXTA: RESOLUCIÓN DEL CONTRATO</h4>
            <p>
              El presente contrato podrá resolverse de común acuerdo entre las partes o por incumplimiento de las obligaciones establecidas, con notificación previa de 15 días calendario.
            </p>
          </div>
        </div>
      </div>

      {/* Tipo de firma */}
      <div>
        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Método de Firma
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTipoFirma('digital')}
            className={`p-4 rounded-lg border-2 transition-all ${
              tipoFirma === 'digital'
                ? 'border-emerald-500 bg-emerald-600/10'
                : darkMode 
                  ? 'border-[#3A3A3A] bg-[#1E1E1E] hover:border-[#4A4A4A]'
                  : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <svg className={`w-8 h-8 ${tipoFirma === 'digital' ? 'text-emerald-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Firma Digital</p>
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Vía DocuSign/PandaDoc
            </p>
          </button>

          <button
            onClick={() => setTipoFirma('fisica')}
            className={`p-4 rounded-lg border-2 transition-all ${
              tipoFirma === 'fisica'
                ? 'border-emerald-500 bg-emerald-600/10'
                : darkMode 
                  ? 'border-[#3A3A3A] bg-[#1E1E1E] hover:border-[#4A4A4A]'
                  : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <svg className={`w-8 h-8 ${tipoFirma === 'fisica' ? 'text-emerald-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Firma Física</p>
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Escanear documento firmado
            </p>
          </button>
        </div>
      </div>

      {/* Términos y condiciones */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="terminos"
          checked={aceptaTerminos}
          onChange={(e) => setAceptaTerminos(e.target.checked)}
          className="mt-1 w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
        />
        <label htmlFor="terminos" className={`text-sm cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Acepto los términos y condiciones del contrato de exclusividad. Confirmo que he leído y entiendo las obligaciones establecidas en este documento.
        </label>
      </div>

      {/* Botón de firma */}
      <button
        onClick={handleFirmar}
        disabled={!aceptaTerminos}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          aceptaTerminos
            ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/20'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
      >
        {tipoFirma === 'digital' ? 'Proceder a Firma Digital' : 'Subir Documento Firmado'}
      </button>
    </div>
  );
}
