import type { ID, WithTimestamps } from "./common";

// ===== FASE 1: INICIO =====
export type DocumentStatus = {
  status: boolean;
  validHasta?: string;
  fechaFirma?: string;
  uploadedUrl?: string;
};

export type PropiedadInicio = WithTimestamps & {
  id: ID;
  direccion: string;
  propietario: string;
  pvs: number; // Precio Venta Sugerido
  documentos: {
    partidaRegistral: DocumentStatus;
    contratoExclusividad: DocumentStatus;
    dni: DocumentStatus;
    planoCatastral: DocumentStatus;
    certificadoNoAdeudo: DocumentStatus;
  };
  validacionLegal: number; // 0-100%
  fechaContacto: string;
  scoring: 1 | 2 | 3 | 4 | 5; // Calidad del lead
  cmaAnalysis?: {
    precioPromedio: number;
    precioMinimo: number;
    precioMaximo: number;
    propiedadesSimilares: number;
  };
  fase: 'inicio';
};

// ===== FASE 2: PREPARACIÓN =====
export type PropiedadPreparacion = WithTimestamps & {
  id: ID;
  direccion: string;
  propietario: string;
  pvs: number;
  fotos: {
    cantidad: number;
    calidad: number; // 0-100%
    urls: string[];
  };
  video360: boolean;
  video360Url?: string;
  fichaComercial: number; // 0-100% completitud
  fichaData?: {
    amenidades: string[];
    estadoInmueble: string;
    historia: string;
    puntosClave: string[];
  };
  buyerPersona: string;
  buyerPersonaDetalle?: {
    perfil: string;
    edad: string;
    ingresos: string;
    motivacion: string;
  };
  diasEnPreparacion: number;
  fase: 'preparacion';
};

// ===== FASE 3: DIFUSIÓN =====
export type CampanaDigital = {
  id: ID;
  plataforma: 'Facebook' | 'Google' | 'Instagram' | 'LinkedIn';
  presupuesto: number;
  alcance: number;
  clics: number;
  cpl: number; // Costo por Lead
  estado: 'activa' | 'pausada' | 'finalizada';
  fechaInicio: string;
  fechaFin?: string;
};

export type PropiedadDifusion = WithTimestamps & {
  id: ID;
  direccion: string;
  propietario: string;
  pvs: number;
  portales: string[]; // ['Inmuebles24', 'Properati', etc]
  campañasActivas: number;
  campañas: CampanaDigital[];
  alcance: number;
  clics: number;
  cpl: number;
  leadsGenerados: number;
  diasEnDifusion: number;
  openHouse?: {
    fecha: string;
    tipo: 'presencial' | 'virtual';
    inscritos: number;
    plataforma?: string;
  };
  fase: 'difusion';
};

// ===== FASE 4: GESTIÓN =====
export type LeadGestion = {
  id: ID;
  nombre: string;
  email: string;
  telefono: string;
  scoring: 1 | 2 | 3 | 4 | 5;
  precalificado: boolean;
  precalificacionData?: {
    banco: string;
    montoAprobado: number;
    validez: string;
  };
  visitasProgramadas: number;
  visitasRealizadas: number;
  ultimoContacto: string;
  notas: string[];
  feedbackVisitas: Array<{
    fecha: string;
    comentario: string;
    interes: number; // 1-5
  }>;
};

export type PropiedadGestion = WithTimestamps & {
  id: ID;
  direccion: string;
  propietario: string;
  pvs: number;
  leads: LeadGestion[];
  visitasRealizadas: number;
  feedbackDueño: string;
  tasaConversion: number; // % visitas que resultan en oferta
  tiempoRespuestaPromedio: number; // minutos
  fase: 'gestion';
};

// ===== FASE 5: NEGOCIACIÓN =====
export type Oferta = {
  id: ID;
  cliente: string;
  clienteId: ID;
  monto: number;
  fecha: string;
  estado: 'Pendiente' | 'Aceptada' | 'Rechazada' | 'Contraofertar';
  validez: string;
  condiciones?: string[];
  contraofertas: Array<{
    monto: number;
    fecha: string;
    aceptada: boolean;
  }>;
};

export type Arras = {
  firmado: boolean;
  monto: number;
  fecha?: string;
  contratoUrl?: string;
  metodoPago: 'transferencia' | 'cheque' | 'efectivo';
  clausulas: string[];
};

export type PropiedadNegociacion = WithTimestamps & {
  id: ID;
  direccion: string;
  propietario: string;
  pvs: number;
  ofertas: Oferta[];
  arras: boolean;
  arrasData?: Arras;
  montoArras: number;
  estrategia: string;
  historialNegociacion: Array<{
    fecha: string;
    accion: string;
    detalles: string;
  }>;
  desviacionPrecio?: number; // % diferencia entre PVS y oferta
  fase: 'negociacion';
};

// ===== FASE 6: CIERRE FINAL =====
export type EtapaCierre = {
  status: 'Completado' | 'En Proceso' | 'Pendiente' | 'Rechazado';
  fecha: string | null;
  notas?: string;
};

export type TasacionBancaria = EtapaCierre & {
  banco: string;
  montoTasado?: number;
  documento?: string;
};

export type Notaria = EtapaCierre & {
  notaria: string;
  direccion?: string;
  contacto?: string;
};

export type PropiedadCierre = WithTimestamps & {
  id: ID;
  direccion: string;
  propietario: string;
  pvs: number;
  precioFinal: number;
  comprador: string;
  compradorId: ID;
  etapas: {
    tasacion: TasacionBancaria;
    notaria: Notaria;
    escritura: EtapaCierre;
    entregaLlaves: EtapaCierre;
  };
  diasParaCierre: number;
  documentosPendientes: string[];
  lineaTiempo: Array<{
    fecha: string;
    evento: string;
    descripcion: string;
    completado: boolean;
  }>;
  alertas: Array<{
    tipo: 'warning' | 'error' | 'info';
    mensaje: string;
    fecha: string;
  }>;
  fase: 'cierre';
};

// ===== FASE 7: POST-VENTA =====
export type Tramite = {
  status: 'Completado' | 'En Proceso' | 'Pendiente';
  fecha: string | null;
  proveedor?: string;
  numeroContrato?: string;
};

export type PropiedadPostVenta = WithTimestamps & {
  id: ID;
  direccion: string;
  propietario: string; // Vendedor
  comprador: string;
  compradorId: ID;
  precioFinal: number;
  fechaCierre: string;
  tramites: {
    luz: Tramite;
    agua: Tramite;
    gas: Tramite;
    predial: Tramite;
    internet?: Tramite;
    cable?: Tramite;
  };
  nps: number; // 0-10
  testimonio: string;
  testimonioNotarial?: string;
  referidosGenerados: number;
  referidos: Array<{
    nombre: string;
    email: string;
    telefono: string;
    estado: 'pendiente' | 'contactado' | 'convertido';
    fechaReferido: string;
  }>;
  encuestaCompletada: boolean;
  satisfaccionGeneral: number; // 1-5
  archivoUrl?: string; // PDF del caso completo
  fase: 'postventa';
};

// ===== TIPO UNIFICADO =====
export type PropiedadCicloCompleto = 
  | PropiedadInicio 
  | PropiedadPreparacion 
  | PropiedadDifusion 
  | PropiedadGestion 
  | PropiedadNegociacion 
  | PropiedadCierre 
  | PropiedadPostVenta;

// ===== MÉTRICAS DEL SISTEMA =====
export type MetricasSistema = {
  // Fase 1: Inicio
  tasaCaptacion: number; // % reuniones → exclusividad
  tiempoPromedioFirma: number; // días desde contacto
  validacionLegalPromedio: number; // % de docs completos
  
  // Fase 2: Preparación
  tiempoPreparacion: number; // días
  indiceCalidadVisual: number; // 0-100
  propiedadesConVideo360: number; // %
  
  // Fase 3: Difusión
  cplPromedio: number; // Costo por Lead
  ctrPromedio: number; // Click Through Rate
  leadsConScoringAlto: number; // %
  alcanceTotal: number;
  
  // Fase 4: Gestión
  tasaConversion: number; // % visitas → oferta
  tiempoRespuesta: number; // minutos
  ofertasAceptadas: number; // %
  
  // Fase 5: Negociación
  desviacionPrecio: number; // % diferencia PVS vs final
  tiempoNegociacion: number; // días
  
  // Fase 6: Cierre
  diasParaCierre: number; // desde arras hasta escritura
  cierresSinIncidencias: number; // %
  
  // Fase 7: Post-venta
  npsPromedio: number; // Net Promoter Score
  referidosPorCliente: number; // promedio
  tiempoResolucionTramites: number; // días
  
  // Globales
  propiedadesActivas: number;
  leadsActivos: number;
  comisionesMes: number;
  tasaCierreGlobal: number;
};

// ===== HISTORIAL DE CAMBIOS =====
export type CambioFase = WithTimestamps & {
  id: ID;
  propiedadId: ID;
  faseAnterior: string;
  faseNueva: string;
  razon?: string;
  usuarioId: ID;
  notas?: string;
};
