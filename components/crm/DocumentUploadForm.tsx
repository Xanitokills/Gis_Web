"use client";

import { useState } from 'react';

type DocumentType = 
  | 'partidaRegistral' 
  | 'contratoExclusividad' 
  | 'dni' 
  | 'planoCatastral' 
  | 'certificadoNoAdeudo';

type DocumentUploadFormProps = {
  propiedadId: number;
  onSuccess?: () => void;
  darkMode?: boolean;
};

const documentLabels: Record<DocumentType, string> = {
  partidaRegistral: 'Partida Registral',
  contratoExclusividad: 'Contrato de Exclusividad',
  dni: 'DNI del Propietario',
  planoCatastral: 'Plano Catastral',
  certificadoNoAdeudo: 'Certificado de No Adeudo Municipal'
};

export default function DocumentUploadForm({ propiedadId, onSuccess, darkMode = true }: DocumentUploadFormProps) {
  const [documentStatus, setDocumentStatus] = useState<Record<DocumentType, boolean>>({
    partidaRegistral: false,
    contratoExclusividad: false,
    dni: false,
    planoCatastral: false,
    certificadoNoAdeudo: false
  });

  const [uploading, setUploading] = useState<DocumentType | null>(null);

  const handleFileUpload = async (docType: DocumentType, file: File) => {
    setUploading(docType);
    
    // Simular upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDocumentStatus(prev => ({ ...prev, [docType]: true }));
    setUploading(null);
  };

  const validationPercentage = Math.round(
    (Object.values(documentStatus).filter(Boolean).length / 5) * 100
  );

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Validación Legal
          </span>
          <span className={`text-sm font-bold ${validationPercentage === 100 ? 'text-emerald-500' : 'text-amber-500'}`}>
            {validationPercentage}%
          </span>
        </div>
        <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`}>
          <div 
            className={`h-full transition-all duration-500 ${validationPercentage === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
            style={{ width: `${validationPercentage}%` }}
          />
        </div>
      </div>

      {/* Document Checklist */}
      <div className="space-y-3">
        {(Object.keys(documentLabels) as DocumentType[]).map((docType) => (
          <div 
            key={docType}
            className={`p-4 rounded-lg border transition-all ${
              documentStatus[docType]
                ? darkMode 
                  ? 'bg-emerald-600/10 border-emerald-600/30' 
                  : 'bg-emerald-50 border-emerald-200'
                : darkMode 
                  ? 'bg-[#1E1E1E] border-[#3A3A3A]' 
                  : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {documentStatus[docType] ? (
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className={`w-6 h-6 rounded-full border-2 ${darkMode ? 'border-[#3A3A3A]' : 'border-gray-300'}`} />
                )}
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {documentLabels[docType]}
                  </p>
                  {documentStatus[docType] && (
                    <p className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      ✓ Documento validado
                    </p>
                  )}
                </div>
              </div>
              
              {!documentStatus[docType] && (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(docType, file);
                    }}
                    disabled={uploading !== null}
                  />
                  <div className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                    uploading === docType
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}>
                    {uploading === docType ? 'Subiendo...' : 'Subir'}
                  </div>
                </label>
              )}
              
              {documentStatus[docType] && (
                <button className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                  Ver documento
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Alert Messages */}
      {validationPercentage === 100 && (
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className="flex items-start space-x-3">
            <svg className={`w-5 h-5 mt-0.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                ¡Validación Legal Completa!
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                Todos los documentos han sido cargados y validados. La propiedad está lista para avanzar a la siguiente fase.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
