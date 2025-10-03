// EJEMPLO DE INTEGRACIÓN EN agent-dashboard/page.tsx
// Copia y pega estos ejemplos donde corresponda

// ============================================
// 1. IMPORTS (Agregar al inicio del archivo)
// ============================================

import DocumentUploadForm from '@/components/crm/DocumentUploadForm';
import ContratoExclusividad from '@/components/crm/ContratoExclusividad';
import PVSCalculator from '@/components/crm/PVSCalculator';
import FotoUploadManager from '@/components/crm/FotoUploadManager';
import BuyerPersonaBuilder from '@/components/crm/BuyerPersonaBuilder';
import CampañaDigitalForm from '@/components/crm/CampañaDigitalForm';
import LeadCalificacion from '@/components/crm/LeadCalificacion';
import GestionOfertas from '@/components/crm/GestionOfertas';
import LineaTiempoCierre from '@/components/crm/LineaTiempoCierre';

// ============================================
// 2. EJEMPLOS DE USO EN MODALES
// ============================================

// ------------------------------------
// FASE 1: INICIO
// ------------------------------------

// Modal: Cargar Documentos
{activeModal === 'cargarDocumentos' && selectedProperty && (
  <div className="p-6">
    <DocumentUploadForm
      propiedadId={selectedProperty.id}
      darkMode={darkMode}
      onSuccess={() => {
        alert('¡Documentos cargados exitosamente!');
        // Aquí puedes llamar a tu API para actualizar la BD
        // await fetch(`/api/propiedades/${selectedProperty.id}/documentos`, { ... })
        closeModal();
      }}
    />
  </div>
)}

// Modal: Firma de Contrato de Exclusividad
{activeModal === 'firmarContrato' && selectedProperty && (
  <div className="p-6">
    <ContratoExclusividad
      propiedad={{
        direccion: selectedProperty.direccion,
        propietario: selectedProperty.propietario,
        pvs: selectedProperty.pvs
      }}
      darkMode={darkMode}
      onFirmar={(tipoFirma) => {
        console.log('Contrato firmado vía:', tipoFirma);
        // Guardar en BD
        // await fetch(`/api/propiedades/${selectedProperty.id}/contrato`, {
        //   method: 'POST',
        //   body: JSON.stringify({ tipo: tipoFirma, fecha: new Date() })
        // });
        alert(`Contrato firmado exitosamente vía ${tipoFirma}`);
        closeModal();
      }}
    />
  </div>
)}

// Modal: Definir Precio de Venta Sugerido (PVS)
{activeModal === 'definirPVS' && selectedProperty && (
  <div className="p-6">
    <PVSCalculator
      propiedad={{
        direccion: selectedProperty.direccion,
        distrito: 'Miraflores', // Obtener del selectedProperty
        area: 120, // Obtener del selectedProperty
        habitaciones: 3, // Obtener del selectedProperty
        baños: 2 // Obtener del selectedProperty
      }}
      darkMode={darkMode}
      onConfirmar={(pvs, justificacion) => {
        console.log('PVS confirmado:', pvs, 'Justificación:', justificacion);
        // Guardar en BD
        // await fetch(`/api/propiedades/${selectedProperty.id}/pvs`, {
        //   method: 'POST',
        //   body: JSON.stringify({ pvs, justificacion })
        // });
        alert(`PVS establecido en S/ ${pvs.toLocaleString()}`);
        closeModal();
      }}
    />
  </div>
)}

// ------------------------------------
// FASE 2: PREPARACIÓN
// ------------------------------------

// Modal: Subir Fotos
{activeModal === 'subirFotos' && selectedProperty && (
  <div className="p-6">
    <FotoUploadManager
      propiedadId={selectedProperty.id}
      darkMode={darkMode}
      onSuccess={() => {
        // Guardar URLs de fotos en BD
        // await fetch(`/api/propiedades/${selectedProperty.id}/fotos`, { ... })
        alert('Fotos guardadas exitosamente');
        closeModal();
      }}
    />
  </div>
)}

// Modal: Definir Buyer Persona
{activeModal === 'buyerPersona' && selectedProperty && (
  <div className="p-6">
    <BuyerPersonaBuilder
      propiedadId={selectedProperty.id}
      darkMode={darkMode}
      onConfirmar={(personaTipo, detallePersona) => {
        console.log('Buyer Persona:', personaTipo, detallePersona);
        // Guardar en BD
        // await fetch(`/api/propiedades/${selectedProperty.id}/buyer-persona`, {
        //   method: 'POST',
        //   body: JSON.stringify({ tipo: personaTipo, detalle: detallePersona })
        // });
        alert('Buyer Persona configurado exitosamente');
        closeModal();
      }}
    />
  </div>
)}

// ------------------------------------
// FASE 3: DIFUSIÓN
// ------------------------------------

// Modal: Crear Campaña Digital
{activeModal === 'nuevaCampana' && selectedProperty && (
  <div className="p-6">
    <CampañaDigitalForm
      propiedadId={selectedProperty.id}
      darkMode={darkMode}
      onCrear={(campanaData) => {
        console.log('Nueva campaña:', campanaData);
        // Guardar en BD y activar en plataforma
        // await fetch('/api/campanas', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     propiedadId: selectedProperty.id,
        //     ...campanaData
        //   })
        // });
        alert(`Campaña creada en ${campanaData.plataforma}`);
        closeModal();
      }}
    />
  </div>
)}

// ------------------------------------
// FASE 4: GESTIÓN
// ------------------------------------

// Modal: Calificar Lead
{activeModal === 'calificarLead' && selectedProperty && (
  <div className="p-6">
    <LeadCalificacion
      lead={{
        id: 123, // ID del lead seleccionado
        nombre: 'María González',
        email: 'maria@email.com',
        telefono: '+51 999 888 777',
        scoring: 3 // Scoring inicial si ya existe
      }}
      darkMode={darkMode}
      onCalificar={(leadId, calificacionData) => {
        console.log('Lead calificado:', leadId, calificacionData);
        // Guardar en BD
        // await fetch(`/api/leads/${leadId}/calificacion`, {
        //   method: 'PUT',
        //   body: JSON.stringify(calificacionData)
        // });
        alert('Lead calificado exitosamente');
        closeModal();
      }}
    />
  </div>
)}

// ------------------------------------
// FASE 5: NEGOCIACIÓN
// ------------------------------------

// Modal: Gestión de Ofertas
{activeModal === 'gestionarOfertas' && selectedProperty && (
  <div className="p-6">
    <GestionOfertas
      propiedad={{
        id: selectedProperty.id,
        pvs: selectedProperty.pvs,
        direccion: selectedProperty.direccion
      }}
      ofertas={[
        {
          id: 1,
          cliente: 'Juan Pérez',
          monto: 280000,
          fecha: '2025-09-25',
          estado: 'Pendiente',
          validez: '2025-10-15',
          condiciones: [
            'Crédito hipotecario aprobado por BCP',
            'Pago de inicial 30%',
            'Posesión en 60 días'
          ]
        },
        {
          id: 2,
          cliente: 'Ana Torres',
          monto: 295000,
          fecha: '2025-09-28',
          estado: 'Pendiente',
          validez: '2025-10-20'
        }
      ]}
      darkMode={darkMode}
      onAccion={(accion, ofertaId, data) => {
        console.log('Acción:', accion, 'Oferta:', ofertaId, 'Data:', data);
        
        switch(accion) {
          case 'aceptar':
            // await fetch(`/api/ofertas/${ofertaId}/aceptar`, { method: 'POST' });
            alert('Oferta aceptada');
            break;
          case 'rechazar':
            // await fetch(`/api/ofertas/${ofertaId}/rechazar`, { method: 'POST' });
            alert('Oferta rechazada');
            break;
          case 'contraofertar':
            // await fetch(`/api/ofertas/${ofertaId}/contraofertar`, {
            //   method: 'POST',
            //   body: JSON.stringify({ monto: data.monto })
            // });
            alert(`Contraoferta enviada: S/ ${data.monto.toLocaleString()}`);
            break;
          case 'firmar-arras':
            // await fetch(`/api/ofertas/${ofertaId}/arras`, {
            //   method: 'POST',
            //   body: JSON.stringify(data)
            // });
            alert(`Arras firmadas por S/ ${data.monto}`);
            break;
        }
        
        // Refrescar ofertas
        // fetchOfertas();
      }}
    />
  </div>
)}

// ------------------------------------
// FASE 6: CIERRE FINAL
// ------------------------------------

// Modal: Timeline de Cierre
{activeModal === 'lineaTiempoCierre' && selectedProperty && (
  <div className="p-6">
    <LineaTiempoCierre
      propiedad={{
        id: selectedProperty.id,
        direccion: selectedProperty.direccion,
        comprador: 'Juan Pérez',
        precioFinal: 285000
      }}
      etapas={{
        tasacion: {
          nombre: 'Tasación Bancaria',
          status: 'Completado',
          fecha: '2025-09-22',
          responsable: 'BCP',
          notas: 'Tasación aprobada en S/ 290,000',
          documentos: [
            { nombre: 'Tasación BCP.pdf', url: '/docs/tasacion.pdf' }
          ]
        },
        notaria: {
          nombre: 'Coordinación Notaría',
          status: 'En Proceso',
          fecha: '2025-10-05',
          responsable: 'Notaría Ríos',
          notas: 'Cita programada para el 05/10'
        },
        escritura: {
          nombre: 'Firma Escritura',
          status: 'Pendiente',
          fecha: '2025-10-12',
          notas: 'Pendiente de coordinación de notaría'
        },
        entregaLlaves: {
          nombre: 'Entrega de Llaves',
          status: 'Pendiente',
          fecha: '2025-10-15'
        }
      }}
      darkMode={darkMode}
      onActualizar={(etapa, data) => {
        console.log('Actualizar etapa:', etapa, data);
        // await fetch(`/api/propiedades/${selectedProperty.id}/cierre/${etapa}`, {
        //   method: 'PUT',
        //   body: JSON.stringify(data)
        // });
        alert(`Etapa ${etapa} actualizada`);
        // Refrescar timeline
      }}
    />
  </div>
)}

// ============================================
// 3. TIPOS DE MODAL A AGREGAR
// ============================================

// Actualizar el tipo ModalType:
type ModalType = 
  // Fase 1: Inicio
  | 'cargarDocumentos'
  | 'firmarContrato'
  | 'definirPVS'
  
  // Fase 2: Preparación
  | 'subirFotos'
  | 'video360'
  | 'buyerPersona'
  | 'editarFicha'
  
  // Fase 3: Difusión
  | 'verCampañas'
  | 'nuevaCampana'
  | 'openHouse'
  
  // Fase 4: Gestión
  | 'calificarLead'
  | 'programarVisita'
  | 'enviarFeedback'
  
  // Fase 5: Negociación
  | 'gestionarOfertas'
  | 'verOferta'
  | 'firmarArras'
  
  // Fase 6: Cierre
  | 'lineaTiempoCierre'
  | 'subirDocumentoCierre'
  | 'contactarNotaria'
  
  // Fase 7: Post-Venta
  | 'checklistTramites'
  | 'encuestaNPS'
  | 'solicitarReferidos'
  | 'exportarPDF'
  | null;

// ============================================
// 4. EJEMPLO DE BOTONES PARA ABRIR MODALES
// ============================================

// En la vista de FASE 1: INICIO
<button 
  onClick={() => openModal('cargarDocumentos', propiedad)}
  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
>
  📄 Cargar Documentos
</button>

<button 
  onClick={() => openModal('firmarContrato', propiedad)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
>
  ✍️ Firmar Contrato
</button>

<button 
  onClick={() => openModal('definirPVS', propiedad)}
  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
>
  💰 Definir PVS
</button>

// En la vista de FASE 2: PREPARACIÓN
<button 
  onClick={() => openModal('subirFotos', propiedad)}
  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
>
  📸 Subir Fotos
</button>

<button 
  onClick={() => openModal('buyerPersona', propiedad)}
  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
>
  👥 Buyer Persona
</button>

// En la vista de FASE 3: DIFUSIÓN
<button 
  onClick={() => openModal('nuevaCampana', propiedad)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
>
  🚀 Nueva Campaña
</button>

// En la vista de FASE 4: GESTIÓN
<button 
  onClick={() => openModal('calificarLead', lead)}
  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
>
  ⭐ Calificar Lead
</button>

// En la vista de FASE 5: NEGOCIACIÓN
<button 
  onClick={() => openModal('gestionarOfertas', propiedad)}
  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500"
>
  💼 Gestionar Ofertas
</button>

// En la vista de FASE 6: CIERRE
<button 
  onClick={() => openModal('lineaTiempoCierre', propiedad)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
>
  ⏱️ Ver Timeline
</button>

// ============================================
// 5. EJEMPLO DE APIS A CREAR
// ============================================

// app/api/propiedades/[id]/documentos/route.ts
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  // Guardar documentos en BD
  // return Response.json({ success: true });
}

// app/api/propiedades/[id]/pvs/route.ts
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { pvs, justificacion } = await req.json();
  // Guardar PVS en BD
  // return Response.json({ success: true });
}

// app/api/campanas/route.ts
export async function POST(req: Request) {
  const campana = await req.json();
  // Crear campaña y activar en plataforma
  // return Response.json({ id: newCampana.id });
}

// app/api/leads/[id]/calificacion/route.ts
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const calificacion = await req.json();
  // Actualizar calificación del lead
  // return Response.json({ success: true });
}

// app/api/ofertas/[id]/aceptar/route.ts
export async function POST(req: Request, { params }: { params: { id: string } }) {
  // Aceptar oferta y notificar
  // return Response.json({ success: true });
}

// ============================================
// 6. ESTADO GLOBAL RECOMENDADO
// ============================================

// Considera usar Context API o Zustand para compartir estado:
const [propiedadesCiclo, setPropiedadesCiclo] = useState<PropiedadCicloCompleto[]>([]);
const [metricas, setMetricas] = useState<MetricasSistema | null>(null);

// Fetch inicial
useEffect(() => {
  fetchPropiedades();
  fetchMetricas();
}, []);

async function fetchPropiedades() {
  const res = await fetch('/api/ciclo/propiedades');
  const data = await res.json();
  setPropiedadesCiclo(data);
}

async function fetchMetricas() {
  const res = await fetch('/api/ciclo/metricas');
  const data = await res.json();
  setMetricas(data);
}

// ============================================
// 7. VALIDACIONES ANTES DE AVANZAR DE FASE
// ============================================

function puedeAvanzarAPreparacion(propiedad: PropiedadInicio): boolean {
  return (
    propiedad.validacionLegal === 100 &&
    propiedad.documentos.contratoExclusividad.status === true &&
    propiedad.pvs > 0
  );
}

function puedeAvanzarADifusion(propiedad: PropiedadPreparacion): boolean {
  return (
    propiedad.fotos.cantidad >= 12 &&
    propiedad.fotos.calidad >= 75 &&
    propiedad.buyerPersona !== '' &&
    propiedad.fichaComercial >= 80
  );
}

// Ejemplo de uso:
<button
  onClick={() => avanzarFase(propiedad.id, 'preparacion')}
  disabled={!puedeAvanzarAPreparacion(propiedad)}
  className={`px-4 py-2 rounded-lg ${
    puedeAvanzarAPreparacion(propiedad)
      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
  }`}
>
  Avanzar a Preparación →
</button>

// ============================================
// 8. NOTIFICACIONES (usando react-hot-toast)
// ============================================

import toast from 'react-hot-toast';

// Éxito
toast.success('¡Documentos cargados exitosamente!');

// Error
toast.error('Error al cargar documentos');

// Carga
const toastId = toast.loading('Subiendo fotos...');
// ... después del upload
toast.success('Fotos subidas', { id: toastId });

// ============================================
// FIN DE EJEMPLOS
// ============================================
