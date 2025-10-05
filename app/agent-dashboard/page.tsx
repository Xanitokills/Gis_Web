"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../../components/map/Map"), { ssr: false });
const PointsLayer = dynamic(() => import("../../components/map/PointsLayer"), { ssr: false });

// Componentes del Ciclo de Ventas
import DocumentUploadForm from '@/components/crm/DocumentUploadForm';
import ContratoExclusividad from '@/components/crm/ContratoExclusividad';
import PVSCalculator from '@/components/crm/PVSCalculator';
import FotoUploadManager from '@/components/crm/FotoUploadManager';
import BuyerPersonaBuilder from '@/components/crm/BuyerPersonaBuilder';
import CampañaDigitalForm from '@/components/crm/CampañaDigitalForm';
import LeadCalificacion from '@/components/crm/LeadCalificacion';
import GestionOfertas from '@/components/crm/GestionOfertas';
import LineaTiempoCierre from '@/components/crm/LineaTiempoCierre';
import ChecklistPostVenta from '@/components/crm/ChecklistPostVenta';
import EncuestaNPS from '@/components/crm/EncuestaNPS';
import SistemaReferidos from '@/components/crm/SistemaReferidos';

// Nuevos componentes completados
import Video360Creator from '@/components/crm/Video360Creator';
import FichaComercialEditor from '@/components/crm/FichaComercialEditor';
import CampanasViewer from '@/components/crm/CampanasViewer';
import OpenHouseScheduler from '@/components/crm/OpenHouseScheduler';
import CalificarLead from '@/components/crm/CalificarLead';
import FeedbackSender from '@/components/crm/FeedbackSender';
import CalendarioVisitas from '@/components/crm/CalendarioVisitas';
import ContraofertaForm from '@/components/crm/ContraofertaForm';
import RechazarOferta from '@/components/crm/RechazarOferta';
import ExportarPDF from '@/components/crm/ExportarPDF';
import PropiedadManager from '@/components/crm/PropiedadManager';

type Phase = 'dashboard' | 'inicio' | 'preparacion' | 'difusion' | 'gestion' | 'negociacion' | 'cierre' | 'postventa' | 'reports';

type ModalType = 
  | 'captacion' 
  | 'gestionarPropiedad'
  // Fase 1: INICIO
  | 'cargarDocumentos'
  | 'firmarContrato'
  | 'definirPVS'
  // Fase 2: PREPARACIÓN
  | 'subirFotos' 
  | 'video360' 
  | 'buyerPersona'
  | 'editarFicha'
  // Fase 3: DIFUSIÓN
  | 'verCampañas'
  | 'nuevaCampana'
  | 'openHouse'
  // Fase 4: GESTIÓN
  | 'calificarLead'
  | 'enviarFeedback'
  | 'calendarioVisitas'
  | 'programarVisita'
  // Fase 5: NEGOCIACIÓN
  | 'gestionarOfertas'
  | 'aceptarOferta'
  | 'contraoferta'
  | 'rechazarOferta'
  | 'firmarArras'
  // Fase 6: CIERRE
  | 'lineaTiempoCierre'
  | 'actualizarEstado'
  | 'subirDocumentos'
  | 'contactarNotaria'
  | 'actualizarTramites'
  // Fase 7: POST-VENTA
  | 'checklistTramites'
  | 'encuestaNPS'
  | 'solicitarReferidos'
  | 'exportarPDF'
  | null;

export default function AgentDashboardPage() {
  const [activeTab, setActiveTab] = useState<Phase>('dashboard');
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // true = dark, false = light (Por defecto: Modo Claro)

  // Funnel de ventas - 7 Fases SmartCore BI
  const funnelData = [
    { fase: 'Inicio', total: 25, color: 'bg-gray-600', percentage: 100 },
    { fase: 'Preparación', total: 20, color: 'bg-gray-600', percentage: 80 },
    { fase: 'Difusión', total: 18, color: 'bg-gray-600', percentage: 72 },
    { fase: 'Gestión', total: 15, color: 'bg-gray-600', percentage: 60 },
    { fase: 'Negociación', total: 10, color: 'bg-gray-600', percentage: 40 },
    { fase: 'Cierre Final', total: 6, color: 'bg-gray-600', percentage: 24 },
    { fase: 'Post-Venta', total: 4, color: 'bg-gray-600', percentage: 16 }
  ];

  // Métricas principales
  const metrics = {
    leadsActivos: 12,
    comisionesMes: 8500,
    propiedadesActivas: 8,
    tasaCierre: 68,
    cpl: 45,
    tiempoRespuesta: 12,
    nps: 85,
    tasaCaptacion: 78,
    tiempoPreparacion: 3.2,
    ctr: 4.5,
    tasaConversion: 42,
    diasCierre: 18
  };

  // Datos de prueba - FASE 1: INICIO
  const propiedadesInicio = [
    {
      id: 101,
      direccion: 'Av. Larco 1234, Miraflores',
      propietario: 'Juan Pérez Sánchez',
      pvs: 280000,
      documentos: {
        partidaRegistral: { status: true, validHasta: '2025-12-31' },
        contratoExclusividad: { status: true, fechaFirma: '2025-09-15' },
        dni: { status: true },
        planoCatastral: { status: false },
        certificadoNoAdeudo: { status: false }
      },
      validacionLegal: 60,
      fechaContacto: '2025-09-10',
      scoring: 4
    },
    {
      id: 102,
      direccion: 'Calle Los Rosales 456, San Isidro',
      propietario: 'María García Torres',
      pvs: 450000,
      documentos: {
        partidaRegistral: { status: true, validHasta: '2026-01-15' },
        contratoExclusividad: { status: true, fechaFirma: '2025-09-20' },
        dni: { status: true },
        planoCatastral: { status: true },
        certificadoNoAdeudo: { status: true }
      },
      validacionLegal: 100,
      fechaContacto: '2025-09-18',
      scoring: 5
    }
  ];

  // Datos de prueba - FASE 2: PREPARACIÓN
  const propiedadesPreparacion = [
    {
      id: 201,
      direccion: 'Dpto 302, Malecón Cisneros, Miraflores',
      propietario: 'Carlos Mendoza',
      pvs: 320000,
      fotos: { cantidad: 12, calidad: 85 },
      video360: false,
      fichaComercial: 70,
      buyerPersona: 'Familia joven profesional',
      diasEnPreparacion: 5
    },
    {
      id: 202,
      direccion: 'Casa Los Sauces 789, La Molina',
      propietario: 'Ana Rodríguez',
      pvs: 550000,
      fotos: { cantidad: 25, calidad: 95 },
      video360: true,
      fichaComercial: 100,
      buyerPersona: 'Inversionista o familia grande',
      diasEnPreparacion: 3
    }
  ];

  // Datos de prueba - FASE 3: DIFUSIÓN
  const propiedadesDifusion = [
    {
      id: 301,
      direccion: 'Dpto 501, Av. Benavides, Miraflores',
      propietario: 'Roberto Silva',
      pvs: 295000,
      portales: ['Inmuebles24', 'Properati', 'Facebook Marketplace'],
      campañasActivas: 2,
      alcance: 15420,
      clics: 687,
      cpl: 42,
      leadsGenerados: 8,
      diasEnDifusion: 12
    },
    {
      id: 302,
      direccion: 'Penthouse, Malecón Balta, Barranco',
      propietario: 'Patricia Vega',
      pvs: 680000,
      portales: ['Inmuebles24', 'Properati', 'Urbania'],
      campañasActivas: 3,
      alcance: 28950,
      clics: 1234,
      cpl: 55,
      leadsGenerados: 15,
      diasEnDifusion: 8
    }
  ];

  // Datos de prueba - FASE 4: GESTIÓN
  const propiedadesGestion = [
    {
      id: 401,
      direccion: 'Casa Los Olivos, Surco',
      propietario: 'Luis Ramírez',
      pvs: 395000,
      leads: [
        { nombre: 'Ana López', scoring: 4, precalificado: true, visitasProgramadas: 1, ultimoContacto: '2025-10-01' },
        { nombre: 'Pedro Gómez', scoring: 3, precalificado: false, visitasProgramadas: 1, ultimoContacto: '2025-09-28' }
      ],
      visitasRealizadas: 8,
      feedbackDueño: 'Clientes muestran interés, precio aceptable'
    },
    {
      id: 402,
      direccion: 'Dpto 404, San Miguel',
      propietario: 'Carmen Torres',
      pvs: 195000,
      leads: [
        { nombre: 'Sofia Mendoza', scoring: 5, precalificado: true, visitasProgramadas: 2, ultimoContacto: '2025-10-02' },
        { nombre: 'Jorge Castro', scoring: 4, precalificado: true, visitasProgramadas: 1, ultimoContacto: '2025-09-30' },
        { nombre: 'María Díaz', scoring: 3, precalificado: false, visitasProgramadas: 0, ultimoContacto: '2025-09-29' }
      ],
      visitasRealizadas: 12,
      feedbackDueño: 'Excelente respuesta, varios interesados'
    }
  ];

  // Datos de prueba - FASE 5: NEGOCIACIÓN
  const propiedadesNegociacion = [
    {
      id: 501,
      direccion: 'Casa Barranco, Zona Residencial',
      propietario: 'Carlos Silva Ramos',
      pvs: 470000,
      ofertas: [
        { cliente: 'Sofia Mendoza', monto: 445000, fecha: '2025-09-28', estado: 'Pendiente', validez: '2025-10-15' },
        { cliente: 'Roberto Vargas', monto: 455000, fecha: '2025-09-30', estado: 'Contraofertar', validez: '2025-10-20' }
      ],
      arras: false,
      montoArras: 0,
      estrategia: 'Contraofertar a S/ 460,000'
    },
    {
      id: 502,
      direccion: 'Dpto Santiago de Surco',
      propietario: 'Elena Ruiz Pérez',
      pvs: 310000,
      ofertas: [
        { cliente: 'Jorge Castro', monto: 305000, fecha: '2025-09-25', estado: 'Aceptada', validez: '2025-10-10' }
      ],
      arras: true,
      montoArras: 15250,
      estrategia: 'Oferta aceptada, arras firmadas'
    }
  ];

  // Datos de prueba - FASE 6: CIERRE FINAL
  const propiedadesCierre = [
    {
      id: 601,
      direccion: 'Casa La Molina Country Club',
      propietario: 'Miguel Ángel Torres',
      pvs: 780000,
      precioFinal: 750000,
      comprador: 'Inversiones ABC SAC',
      etapas: {
        tasacion: { status: 'Completado', fecha: '2025-09-22', banco: 'BCP' },
        notaria: { status: 'En Proceso', fecha: '2025-10-05', notaria: 'Notaría Ríos' },
        escritura: { status: 'Pendiente', fecha: '2025-10-12' },
        entregaLlaves: { status: 'Pendiente', fecha: '2025-10-15' }
      },
      diasParaCierre: 13,
      documentosPendientes: ['Escritura pública final']
    },
    {
      id: 602,
      direccion: 'Dpto Jesús María',
      propietario: 'Sofia Paredes Cruz',
      pvs: 225000,
      precioFinal: 220000,
      comprador: 'Laura Sánchez',
      etapas: {
        tasacion: { status: 'En Proceso', fecha: '2025-10-03', banco: 'Interbank' },
        notaria: { status: 'Pendiente', fecha: '2025-10-10', notaria: 'Notaría Central' },
        escritura: { status: 'Pendiente', fecha: '2025-10-15' },
        entregaLlaves: { status: 'Pendiente', fecha: '2025-10-18' }
      },
      diasParaCierre: 16,
      documentosPendientes: ['Tasación bancaria', 'Documentos notariales']
    }
  ];

  // Datos de prueba - FASE 7: POST-VENTA
  const propiedadesPostVenta = [
    {
      id: 701,
      direccion: 'Casa San Borja',
      propietario: 'Ricardo Paz (Vendedor)',
      comprador: 'Familia Gutiérrez',
      precioFinal: 480000,
      fechaCierre: '2025-09-15',
      tramites: {
        luz: { status: 'Completado', fecha: '2025-09-18' },
        agua: { status: 'Completado', fecha: '2025-09-18' },
        gas: { status: 'Completado', fecha: '2025-09-20' },
        predial: { status: 'En Proceso', fecha: null }
      },
      nps: 9,
      testimonio: 'Excelente servicio, muy profesionales',
      referidosGenerados: 2
    },
    {
      id: 702,
      direccion: 'Dpto Surco',
      propietario: 'Laura Castro (Vendedora)',
      comprador: 'José Ramírez',
      precioFinal: 265000,
      fechaCierre: '2025-09-20',
      tramites: {
        luz: { status: 'Completado', fecha: '2025-09-22' },
        agua: { status: 'Completado', fecha: '2025-09-22' },
        gas: { status: 'Completado', fecha: '2025-09-25' },
        predial: { status: 'Completado', fecha: '2025-09-28' }
      },
      nps: 10,
      testimonio: 'Servicio impecable de principio a fin',
      referidosGenerados: 1
    }
  ];

  const openModal = (type: ModalType, property?: any) => {
    setActiveModal(type);
    if (property) setSelectedProperty(property);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedProperty(null);
  };

  // Clases de tema dinámicas
  const theme = {
    // Backgrounds
    bgMain: darkMode ? 'bg-[#0D0D0D]' : 'bg-white',
    bgSidebar: darkMode ? 'bg-[#1C1C1C]' : 'bg-white',
    bgCard: darkMode ? 'bg-[#1C1C1C]' : 'bg-white',
    bgCardHover: darkMode ? 'hover:border-[#3A3A3A]' : 'hover:border-gray-200',
    bgInput: darkMode ? 'bg-[#252525]' : 'bg-white',
    bgHeader: darkMode ? 'bg-[#0D0D0D]' : 'bg-white',
    bgActive: darkMode ? 'bg-emerald-600/10' : 'bg-white',
    bgHover: darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50',
    bgSecondary: darkMode ? 'bg-[#252525]' : 'bg-white',
    
    // Borders
    border: darkMode ? 'border-[#2A2A2A]' : 'border-gray-200',
    borderInput: darkMode ? 'border-[#3A3A3A]' : 'border-gray-200',
    borderHover: darkMode ? 'hover:border-emerald-600' : 'hover:border-gray-300',
    
    // Text colors
    textPrimary: darkMode ? 'text-white' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
    textTertiary: darkMode ? 'text-gray-500' : 'text-gray-500',
    textActive: darkMode ? 'text-emerald-400' : 'text-gray-900',
    
    // Accent colors
    accent: darkMode ? 'bg-emerald-600' : 'bg-gray-900',
    accentHover: darkMode ? 'hover:bg-emerald-500' : 'hover:bg-gray-800',
    accentText: darkMode ? 'text-emerald-400' : 'text-gray-700',
    accentBg: darkMode ? 'bg-emerald-600/10' : 'bg-white',
    accentBorder: darkMode ? 'border-emerald-600/20' : 'border-gray-200',
  };

  return (
    <div className={`min-h-screen ${theme.bgMain} flex transition-colors duration-300`}>
      {/* SIDEBAR IZQUIERDO - Estilo Supabase */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} ${theme.bgSidebar} ${theme.textPrimary} flex-shrink-0 transition-all duration-300 fixed h-full z-30 border-r ${theme.border}`}>
        <div className="flex flex-col h-full">
          {/* Logo y Header */}
          <div className={`p-6 border-b ${theme.border}`}>
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h1 className={`text-base font-semibold ${theme.textPrimary}`}>SmartCore BI</h1>
                    <p className={`text-xs ${theme.textTertiary}`}>Frankin Vasquez</p>
                  </div>
                </div>
              )}
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`p-2 ${theme.bgHover} rounded-md transition-colors`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                </svg>
              </button>
            </div>
            
            {/* Toggle de Modo Oscuro/Claro - OCULTO (funcionalidad mantenida) */}
            {!sidebarCollapsed && (
              <div className="mt-4 pt-4 border-t border-[#2A2A2A] hidden">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${theme.bgHover} transition-colors group`}
                >
                  <div className="flex items-center space-x-2">
                    {darkMode ? (
                      <>
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                        <span className={`text-sm ${theme.textSecondary}`}>Modo Claro</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        <span className={`text-sm ${theme.textSecondary}`}>Modo Oscuro</span>
                      </>
                    )}
                  </div>
                  <div className={`w-10 h-5 ${darkMode ? 'bg-emerald-600' : 'bg-gray-300'} rounded-full p-0.5 transition-colors duration-300`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {/* Dashboard */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'dashboard' ? `${theme.bgActive} ${theme.textActive} border ${theme.accentBorder}` : `${theme.bgHover} ${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {!sidebarCollapsed && <span className="font-medium">Dashboard</span>}
              </button>

              {/* Separator */}
              {!sidebarCollapsed && <div className={`px-3 pt-6 pb-2 text-xs font-medium ${theme.textTertiary} uppercase tracking-wider`}>Fases del Ciclo</div>}

              {/* Fase 1: Inicio */}
              <button
                onClick={() => setActiveTab('inicio')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'inicio' ? `${theme.bgActive} ${theme.textActive} border ${theme.accentBorder}` : `${theme.bgHover} ${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                  activeTab === 'inicio' ? 'bg-emerald-500 text-white' : `${theme.bgSecondary} ${theme.textTertiary}`
                }`}>1</div>
                {!sidebarCollapsed && <span>Inicio</span>}
              </button>

              {/* Fase 2: Preparación */}
              <button
                onClick={() => setActiveTab('preparacion')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'preparacion' ? `${theme.bgActive} ${theme.textActive} border ${theme.accentBorder}` : `${theme.bgHover} ${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                  activeTab === 'preparacion' ? 'bg-emerald-500 text-white' : `${theme.bgSecondary} ${theme.textTertiary}`
                }`}>2</div>
                {!sidebarCollapsed && <span>Preparación</span>}
              </button>

              {/* Fase 3: Difusión */}
              <button
                onClick={() => setActiveTab('difusion')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'difusion' ? `${theme.bgActive} ${theme.textActive} border ${theme.accentBorder}` : `${theme.bgHover} ${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                  activeTab === 'difusion' ? 'bg-emerald-500 text-white' : `${theme.bgSecondary} ${theme.textTertiary}`
                }`}>3</div>
                {!sidebarCollapsed && <span>Difusión</span>}
              </button>

              {/* Fase 4: Gestión */}
              <button
                onClick={() => setActiveTab('gestion')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'gestion' ? `${theme.bgActive} ${theme.textActive} border ${theme.accentBorder}` : `${theme.bgHover} ${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                  activeTab === 'gestion' ? 'bg-emerald-500 text-white' : `${theme.bgSecondary} ${theme.textTertiary}`
                }`}>4</div>
                {!sidebarCollapsed && <span>Gestión</span>}
              </button>

              {/* Fase 5: Negociación */}
              <button
                onClick={() => setActiveTab('negociacion')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'negociacion' ? `${theme.bgActive} ${theme.textActive} border ${theme.accentBorder}` : `${theme.bgHover} ${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                  activeTab === 'negociacion' ? 'bg-emerald-500 text-white' : `${theme.bgSecondary} ${theme.textTertiary}`
                }`}>5</div>
                {!sidebarCollapsed && <span>Negociación</span>}
              </button>

              {/* Fase 6: Cierre Final */}
              <button
                onClick={() => setActiveTab('cierre')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'cierre' ? `${theme.bgActive} ${theme.textActive} border ${theme.accentBorder}` : `${theme.bgHover} ${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                  activeTab === 'cierre' ? 'bg-emerald-500 text-white' : `${theme.bgSecondary} ${theme.textTertiary}`
                }`}>6</div>
                {!sidebarCollapsed && <span>Cierre Final</span>}
              </button>

              {/* Fase 7: Post-Venta */}
              <button
                onClick={() => setActiveTab('postventa')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'postventa' ? `${theme.bgActive} ${theme.textActive} border ${theme.accentBorder}` : `${theme.bgHover} ${theme.textSecondary} hover:${theme.textPrimary}`
                }`}
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                  activeTab === 'postventa' ? 'bg-emerald-500 text-white' : `${theme.bgSecondary} ${theme.textTertiary}`
                }`}>7</div>
                {!sidebarCollapsed && <span>Post-Venta</span>}
              </button>

              {/* Separator */}
              {!sidebarCollapsed && <div className="px-3 pt-6 pb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Análisis</div>}

              {/* Reportes */}
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  activeTab === 'reports' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20' : 'hover:bg-[#2A2A2A] text-gray-400 hover:text-gray-200'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {!sidebarCollapsed && <span className="font-medium">Reportes</span>}
              </button>
            </div>
          </nav>

          {/* Footer con métricas rápidas */}
          {!sidebarCollapsed && (
            <div className={`p-4 border-t ${theme.border}`}>
              <div className={`${theme.bgSecondary} rounded-lg p-3 border ${theme.border}`}>
                <p className={`text-xs ${theme.textTertiary} mb-1 font-medium`}>Comisiones Mes</p>
                <p className={`text-xl font-bold ${theme.accentText}`}>S/ {metrics.comisionesMes.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-72'} transition-all duration-300`}>
        {/* Header Superior */}
        <header className={`${theme.bgHeader} border-b ${theme.border} sticky top-0 z-20 shadow-sm transition-colors duration-300`}>
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-semibold ${theme.textPrimary}`}>
                  {activeTab === 'dashboard' && 'Dashboard General'}
                  {activeTab === 'inicio' && 'Fase 1: Inicio'}
                  {activeTab === 'preparacion' && 'Fase 2: Preparación'}
                  {activeTab === 'difusion' && 'Fase 3: Difusión'}
                  {activeTab === 'gestion' && 'Fase 4: Gestión'}
                  {activeTab === 'negociacion' && 'Fase 5: Negociación'}
                  {activeTab === 'cierre' && 'Fase 6: Cierre Final'}
                  {activeTab === 'postventa' && 'Fase 7: Post-Venta'}
                  {activeTab === 'reports' && 'Reportes y KPIs'}
                </h2>
                <p className={`text-sm ${theme.textSecondary} mt-1`}>
                  {activeTab === 'dashboard' && 'Visión general del rendimiento y pipeline'}
                  {activeTab === 'inicio' && 'Validar legalidad y formalizar relación'}
                  {activeTab === 'preparacion' && 'Optimizar presentación del inmueble'}
                  {activeTab === 'difusion' && 'Atraer leads calificados'}
                  {activeTab === 'gestion' && 'Calificar leads y programar visitas'}
                  {activeTab === 'negociacion' && 'Maximizar valor de venta'}
                  {activeTab === 'cierre' && 'Coordinar trámites legales'}
                  {activeTab === 'postventa' && 'Garantizar experiencia memorable'}
                  {activeTab === 'reports' && 'Métricas y análisis de performance'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => openModal('captacion')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md transition-colors font-medium text-sm flex items-center space-x-2 shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Smart Capture</span>
                </button>
                <button className={`${theme.bgCard} ${theme.bgHover} border ${theme.border} ${theme.textSecondary} px-4 py-2 rounded-md transition-colors font-medium text-sm flex items-center space-x-2`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>+ Nuevo Lead</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Área de Contenido */}
        <main className={`p-8 ${theme.bgMain} min-h-screen transition-colors duration-300`}>
        
        {/* DASHBOARD PRINCIPAL */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPIs Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-6 rounded-lg border transition-colors ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-[#3A3A3A]' : 'bg-[#164773] border-[#164773] hover:border-[#0B2B40]'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-white/90'}`}>Leads Activos</p>
                    <p className={`text-3xl font-semibold mt-2 ${darkMode ? 'text-white' : 'text-white'}`}>{metrics.leadsActivos}</p>
                    <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-500' : 'text-white/80'}`}>↑ 15% vs mes anterior</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${darkMode ? 'bg-emerald-500/10' : 'bg-white/20'}`}>
                    <svg className={`w-8 h-8 ${darkMode ? 'text-emerald-400' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg border transition-colors ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-[#3A3A3A]' : 'bg-[#3B8C6E] border-[#3B8C6E] hover:border-[#1E5959]'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-white/90'}`}>Comisiones Mes</p>
                    <p className={`text-3xl font-semibold mt-2 ${darkMode ? 'text-white' : 'text-white'}`}>S/ {metrics.comisionesMes.toLocaleString()}</p>
                    <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-500' : 'text-white/80'}`}>↑ 23% vs mes anterior</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${darkMode ? 'bg-emerald-500/10' : 'bg-white/20'}`}>
                    <svg className={`w-6 h-6 ${darkMode ? 'text-emerald-400' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg border transition-colors ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-[#3A3A3A]' : 'bg-[#1E5959] border-[#1E5959] hover:border-[#164773]'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-white/90'}`}>Propiedades</p>
                    <p className={`text-3xl font-semibold mt-2 ${darkMode ? 'text-white' : 'text-white'}`}>{metrics.propiedadesActivas}</p>
                    <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-400' : 'text-white/80'}`}>3 en negociación</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${darkMode ? 'bg-emerald-500/10' : 'bg-white/20'}`}>
                    <svg className={`w-6 h-6 ${darkMode ? 'text-emerald-400' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg border transition-colors ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-[#3A3A3A]' : 'bg-[#89D99D] border-[#89D99D] hover:border-[#3B8C6E]'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-[#0B2B40]'}`}>Tasa de Cierre</p>
                    <p className={`text-3xl font-semibold mt-2 ${darkMode ? 'text-white' : 'text-[#0B2B40]'}`}>{metrics.tasaCierre}%</p>
                    <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-500' : 'text-[#0B2B40]/80'}`}>Meta: 60% ✓</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${darkMode ? 'bg-emerald-500/10' : 'bg-[#0B2B40]/20'}`}>
                    <svg className={`w-6 h-6 ${darkMode ? 'text-emerald-400' : 'text-[#0B2B40]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Funnel de Ventas */}
            <div className={`p-8 rounded-lg border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-white border-gray-200'}`}>
              <div className="mb-6">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Embudo de Ventas - Ciclo Completo</h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Distribución de propiedades por fase del proceso de venta</p>
              </div>
              <div className="space-y-6">
                {funnelData.map((item, index) => {
                  // Función para calcular el color dinámico según el porcentaje
                  const getBarColor = (percentage: number) => {
                    if (percentage <= 20) {
                      // Rojo intenso para valores muy bajos
                      return '#DC2626'; // red-600
                    } else if (percentage <= 40) {
                      // Naranja/Rojo para valores bajos
                      return '#EA580C'; // orange-600
                    } else if (percentage <= 60) {
                      // Amarillo/Naranja para valores medios
                      return '#D97706'; // amber-600
                    } else if (percentage <= 80) {
                      // Verde/Azul transición
                      return '#059669'; // emerald-600
                    } else {
                      // Azul oscuro para valores altos (objetivo)
                      return '#024059';
                    }
                  };

                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className={`text-xs font-medium px-3 py-1 rounded-md border ${darkMode ? 'text-gray-400 bg-[#252525] border-[#2A2A2A]' : 'text-gray-700 bg-gray-100 border-gray-200'}`}>
                            Fase {index + 1}
                          </span>
                          <span className={`font-medium text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.fase}</span>
                        </div>
                        <div className="flex items-center space-x-6">
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.total} propiedades</span>
                          <span className={`text-base font-semibold w-16 text-right ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.percentage}%</span>
                        </div>
                      </div>
                      <div className={`w-full rounded-full h-2 overflow-hidden ${darkMode ? 'bg-[#252525]' : 'bg-gray-200'}`}>
                        <div 
                          className="h-2 rounded-full transition-all duration-700"
                          style={{ 
                            width: `${item.percentage}%`, 
                            backgroundColor: getBarColor(item.percentage),
                            boxShadow: `0 0 8px ${getBarColor(item.percentage)}40`
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Métricas SmartCore BI */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className={`p-6 rounded-lg border transition-colors ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-emerald-600/20' : 'bg-[#0B2B40] border-[#0B2B40] hover:border-[#164773]'}`}>
                <h4 className={`font-medium mb-2 text-sm uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-white/90'}`}>CPL (Costo por Lead)</h4>
                <p className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>S/ {metrics.cpl}</p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-white/80'}`}>Meta: S/ 50 o menos</p>
                <div className={`mt-3 rounded-md px-3 py-1 inline-block text-xs font-medium ${darkMode ? 'bg-emerald-600/5 border border-emerald-600/20 text-emerald-500' : 'bg-white/20 border border-white/30 text-white'}`}>
                  ✓ Dentro del objetivo
                </div>
              </div>

              <div className={`p-6 rounded-lg border transition-colors ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-emerald-600/20' : 'bg-[#164773] border-[#164773] hover:border-[#1E5959]'}`}>
                <h4 className={`font-medium mb-2 text-sm uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-white/90'}`}>Tiempo de Respuesta</h4>
                <p className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>{metrics.tiempoRespuesta} min</p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-white/80'}`}>Meta: menos de 15 minutos</p>
                <div className={`mt-3 rounded-md px-3 py-1 inline-block text-xs font-medium ${darkMode ? 'bg-emerald-600/10 border border-emerald-600/20 text-emerald-400' : 'bg-white/20 border border-white/30 text-white'}`}>
                  ✓ Excelente performance
                </div>
              </div>

              <div className={`p-6 rounded-lg border transition-colors ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-emerald-600/20' : 'bg-[#3B8C6E] border-[#3B8C6E] hover:border-[#89D99D]'}`}>
                <h4 className={`font-medium mb-2 text-sm uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-white/90'}`}>NPS Post-Venta</h4>
                <p className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>{metrics.nps}</p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-white/80'}`}>Satisfacción del cliente</p>
                <div className={`mt-3 rounded-md px-3 py-1 inline-block text-xs font-medium ${darkMode ? 'bg-emerald-600/10 border border-emerald-600/20 text-emerald-400' : 'bg-white/20 border border-white/30 text-white'}`}>
                  ✓ Nivel excepcional
                </div>
              </div>
            </div>

            {/* Tareas y Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`p-6 rounded-lg border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-white border-gray-200'}`}>
                <h3 className={`font-semibold text-lg mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tareas Programadas Hoy</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Validar documentos legales - Propiedad Av. Larco', time: '10:00 AM', priority: 'high', phase: 'Inicio' },
                    { title: 'Sesión fotográfica profesional - Dpto Miraflores', time: '14:00 PM', priority: 'medium', phase: 'Preparación' },
                    { title: 'Visita programada con cliente - Sr. Carlos Ruiz', time: '16:00 PM', priority: 'high', phase: 'Gestión' },
                    { title: 'Revisión de contraoferta - Casa en Barranco', time: '17:30 PM', priority: 'high', phase: 'Negociación' }
                  ].map((task, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${darkMode ? 'border-[#2A2A2A] hover:border-emerald-600/20 hover:bg-[#252525]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          darkMode ? (task.priority === 'high' ? 'bg-gray-400' : 'bg-gray-600') : (task.priority === 'high' ? 'bg-blue-400' : 'bg-gray-400')
                        }`}></div>
                        <div className="flex-1">
                          <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{task.title}</p>
                          <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{task.time} · {task.phase}</p>
                        </div>
                      </div>
                      <button className={`text-sm font-medium px-3 py-1 border rounded-md transition-colors ${darkMode ? 'text-emerald-400 hover:text-emerald-300 border-[#2A2A2A] hover:bg-[#252525]' : 'text-blue-600 hover:text-blue-700 border-gray-200 hover:bg-blue-50'}`}>
                        Ver detalles
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-lg border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-white border-gray-200'}`}>
                <h3 className={`font-semibold text-lg mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Leads de Alto Potencial</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Sofia Mendoza', scoring: 5, value: 320000, phase: 'Negociación', status: 'hot' },
                    { name: 'Ana María López', scoring: 4, value: 180000, phase: 'Gestión', status: 'warm' },
                    { name: 'Roberto Vargas', scoring: 5, value: 450000, phase: 'Difusión', status: 'hot' }
                  ].map((lead, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${darkMode ? 'border-[#2A2A2A] hover:border-emerald-600/20 hover:bg-[#252525]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lead.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                            darkMode ? (
                              lead.status === 'hot' ? 'bg-emerald-600/10 border border-emerald-600/20 text-emerald-400' : 'bg-[#2A2A2A] border border-[#3A3A3A] text-gray-400'
                            ) : (
                              lead.status === 'hot' ? 'bg-emerald-100 border border-emerald-200 text-emerald-700' : 'bg-gray-100 border border-gray-200 text-gray-600'
                            )
                          }`}>
                            {lead.status === 'hot' ? 'Caliente' : 'Tibio'}
                          </span>
                        </div>
                        <div className={`flex items-center space-x-3 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                          <span>{lead.phase}</span>
                          <span>·</span>
                          <div className="flex space-x-0.5">
                            {[...Array(lead.scoring)].map((_, i) => (
                              <span key={i} className={darkMode ? 'text-yellow-500' : 'text-amber-500'}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>S/ {lead.value.toLocaleString()}</p>
                        <button className={`text-sm font-medium mt-1 ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`}>
                          Contactar →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FASE 1: INICIO */}
        {activeTab === 'inicio' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border-blue-200'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fase 1: INICIO</h2>
                  <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Validar legalidad del inmueble y formalizar relación con el vendedor</p>
                </div>
                <button 
                  onClick={() => openModal('captacion')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium shadow-lg shadow-emerald-600/20"
                >
                  + Nueva Captación
                </button>
              </div>

              {/* Métricas de la Fase */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-white'}`}>Validación Legal</p>
                  <p className={`text-3xl font-bold text-white`}>92%</p>
                  <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Listados completos</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-white'}`}>Tasa Captación</p>
                  <p className={`text-3xl font-bold text-white`}>78%</p>
                  <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Reunión → Exclusividad</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-white'}`}>Tiempo Promedio</p>
                  <p className={`text-3xl font-bold text-white`}>3.2 días</p>
                  <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Contacto → Firma</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-white'}`}>Scoring Promedio</p>
                  <p className={`text-3xl font-bold text-white`}>4.2/5</p>
                  <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Calidad del lead</p>
                </div>
              </div>

              {/* Lista de Propiedades en Inicio */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className={`${darkMode ? 'bg-[#252525]' : 'bg-gradient-to-r from-[#164773]/10 to-[#1E5959]/10'}`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-[#164773]'}`}>Propiedad</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-[#164773]'}`}>Propietario</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-[#164773]'}`}>PVS</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-[#164773]'}`}>Documentos</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-[#164773]'}`}>Scoring</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-[#164773]'}`}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className={`${darkMode ? 'divide-y divide-[#2A2A2A]' : 'divide-y divide-gray-200'}`}>
                    {propiedadesInicio.map((prop) => (
                      <tr key={prop.id} className={`transition-colors ${darkMode ? 'hover:bg-[#252525]' : 'hover:bg-gradient-to-r hover:from-[#164773]/5 hover:to-transparent'}`}>
                        <td className="px-6 py-4">
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.direccion}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>ID: {prop.id}</div>
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{prop.propietario}</td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-[#3B8C6E]'}`}>S/ {prop.pvs.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-full rounded-full h-2.5 w-24 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`}>
                              <div 
                                className={`h-2.5 rounded-full ${prop.validacionLegal === 100 ? (darkMode ? 'bg-gradient-to-r from-[#3B8C6E] to-[#89D99D]' : 'bg-gradient-to-r from-[#1E5959] to-[#3B8C6E]') : (darkMode ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-gradient-to-r from-amber-400 to-yellow-400')}`}
                                style={{ width: `${prop.validacionLegal}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{prop.validacionLegal}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-0.5">
                            {[...Array(prop.scoring)].map((_, i) => (
                              <span key={i} className={darkMode ? 'text-amber-400' : 'text-amber-500'}>★</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => openModal('cargarDocumentos', prop)}
                              className={`group relative px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                darkMode 
                                  ? 'bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 text-emerald-300 hover:from-emerald-600/30 hover:to-emerald-500/30 border border-emerald-500/40 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/20' 
                                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg hover:shadow-emerald-500/50'
                              }`}
                              title="Cargar Documentos"
                            >
                              <span className="flex items-center gap-1.5">
                                <span className="text-sm">📄</span>
                                Docs
                              </span>
                            </button>
                            
                            <button 
                              onClick={() => openModal('firmarContrato', prop)}
                              className={`group relative px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                darkMode 
                                  ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 text-blue-300 hover:from-blue-600/30 hover:to-blue-500/30 border border-blue-500/40 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20' 
                                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg hover:shadow-blue-500/50'
                              }`}
                              title="Firmar Contrato"
                            >
                              <span className="flex items-center gap-1.5">
                                <span className="text-sm">✍️</span>
                                Contrato
                              </span>
                            </button>
                            
                            <button 
                              onClick={() => openModal('definirPVS', prop)}
                              className={`group relative px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                darkMode 
                                  ? 'bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 text-purple-300 hover:from-purple-600/30 hover:to-fuchsia-600/30 border border-purple-500/40 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20' 
                                  : 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white hover:from-purple-600 hover:to-fuchsia-700 shadow-md hover:shadow-lg hover:shadow-purple-500/50'
                              }`}
                              title="Definir Precio de Venta Sugerido"
                            >
                              <span className="flex items-center gap-1.5">
                                <span className="text-sm">💰</span>
                                Definir PVS
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FASE 2: PREPARACIÓN */}
        {activeTab === 'preparacion' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-br from-purple-50/50 to-pink-50/30 border-purple-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fase 2: PREPARACIÓN</h2>
                  <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Optimizar presentación del inmueble para maximizar su atractivo</p>
                </div>
              </div>

              {/* Métricas de la Fase */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Tiempo Preparación</p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>3.2 días</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Firma → Listado activo</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Índice Calidad Visual</p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>88/100</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Fotos + descripción</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Con Video 360°</p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>50%</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>De propiedades</p>
                </div>
              </div>

              {/* Lista de Propiedades en Preparación */}
              <div className="space-y-4">
                {propiedadesPreparacion.map((prop) => (
                  <div key={prop.id} className={`rounded-lg p-6 border transition ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-[#3A3A3A]' : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50/30'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.direccion}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Propietario: {prop.propietario}</p>
                        <p className={`text-lg font-bold mt-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>PVS: S/ {prop.pvs.toLocaleString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                        {prop.diasEnPreparacion} días
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className={`border-l-4 pl-4 ${darkMode ? 'border-purple-500' : 'border-purple-300'}`}>
                        <p className={`text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fotos</p>
                        <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.fotos.cantidad}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Calidad: {prop.fotos.calidad}%</p>
                      </div>
                      <div className={`border-l-4 pl-4 ${darkMode ? 'border-emerald-500' : 'border-emerald-300'}`}>
                        <p className={`text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Video 360°</p>
                        <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.video360 ? 'Sí' : 'No'}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{prop.video360 ? 'Completado' : 'Pendiente'}</p>
                      </div>
                      <div className={`border-l-4 pl-4 ${darkMode ? 'border-pink-500' : 'border-pink-300'}`}>
                        <p className={`text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ficha Comercial</p>
                        <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.fichaComercial}%</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Completitud</p>
                      </div>
                      <div className={`border-l-4 pl-4 ${darkMode ? 'border-amber-500' : 'border-amber-300'}`}>
                        <p className={`text-xs font-semibold uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Buyer Persona</p>
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.buyerPersona}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <button 
                        onClick={() => openModal('subirFotos', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-pink-600/20 to-rose-600/20 text-pink-300 hover:from-pink-600/30 hover:to-rose-600/30 border border-pink-500/40 hover:border-pink-400/60 hover:shadow-lg hover:shadow-pink-500/20' 
                            : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 shadow-md hover:shadow-lg hover:shadow-pink-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>📸</span>
                          Subir Fotos
                        </span>
                      </button>
                      <button 
                        onClick={() => openModal('buyerPersona', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 text-amber-300 hover:from-amber-600/30 hover:to-orange-600/30 border border-amber-500/40 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/20' 
                            : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-md hover:shadow-lg hover:shadow-amber-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>👥</span>
                          Buyer Persona
                        </span>
                      </button>
                      <button 
                        onClick={() => openModal('video360', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-300 hover:from-cyan-600/30 hover:to-blue-600/30 border border-cyan-500/40 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20' 
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-md hover:shadow-lg hover:shadow-cyan-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🎥</span>
                          Video 360°
                        </span>
                      </button>
                      <button 
                        onClick={() => openModal('editarFicha', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-violet-300 hover:from-violet-600/30 hover:to-purple-600/30 border border-violet-500/40 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/20' 
                            : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-md hover:shadow-lg hover:shadow-violet-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>📝</span>
                          Editar Ficha
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FASE 3: DIFUSIÓN */}
        {activeTab === 'difusion' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-br from-teal-50/50 to-cyan-50/30 border-teal-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fase 3: DIFUSIÓN</h2>
                  <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Atraer leads calificados mediante canales orgánicos y pagados</p>
                </div>
              </div>

              {/* Métricas de la Fase */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>CPL Promedio</p>
                  <p className={`text-3xl font-bold text-white`}>S/ 48</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Costo por lead</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>CTR Promedio</p>
                  <p className={`text-3xl font-bold text-white`}>4.3%</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Click through rate</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Leads Scoring Alto</p>
                  <p className={`text-3xl font-bold text-white`}>62%</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Scoring 4-5</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Alcance Total</p>
                  <p className={`text-3xl font-bold text-white`}>44.3K</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Impresiones</p>
                </div>
              </div>

              {/* Lista de Propiedades en Difusión */}
              <div className="space-y-4">
                {propiedadesDifusion.map((prop) => (
                  <div key={prop.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{prop.direccion}</h3>
                        <p className="text-sm text-gray-600">Propietario: {prop.propietario}</p>
                        <p className="text-lg font-bold text-green-600 mt-1">PVS: S/ {prop.pvs.toLocaleString()}</p>
                      </div>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {prop.diasEnDifusion} días activo
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold">Alcance</p>
                        <p className="text-xl font-bold text-blue-600">{(prop.alcance / 1000).toFixed(1)}K</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold">Clics</p>
                        <p className="text-xl font-bold text-green-600">{prop.clics}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold">CPL</p>
                        <p className="text-xl font-bold text-purple-600">S/ {prop.cpl}</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold">Leads</p>
                        <p className="text-xl font-bold text-orange-600">{prop.leadsGenerados}</p>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded-lg">
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold">Campañas</p>
                        <p className="text-xl font-bold text-pink-600">{prop.campañasActivas}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Portales Activos:</p>
                      <div className="flex flex-wrap gap-2">
                        {prop.portales.map((portal, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                            {portal}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <button 
                        onClick={() => openModal('verCampañas', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-sky-600/20 to-blue-600/20 text-sky-300 hover:from-sky-600/30 hover:to-blue-600/30 border border-sky-500/40 hover:border-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20' 
                            : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 shadow-md hover:shadow-lg hover:shadow-sky-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>📊</span>
                          Ver Campañas
                        </span>
                      </button>
                      <button 
                        onClick={() => openModal('nuevaCampana', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-emerald-600/20 to-green-600/20 text-emerald-300 hover:from-emerald-600/30 hover:to-green-600/30 border border-emerald-500/40 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/20' 
                            : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg hover:shadow-emerald-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🚀</span>
                          Nueva Campaña
                        </span>
                      </button>
                      <button 
                        onClick={() => openModal('openHouse', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-300 hover:from-indigo-600/30 hover:to-purple-600/30 border border-indigo-500/40 hover:border-indigo-400/60 hover:shadow-lg hover:shadow-indigo-500/20' 
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg hover:shadow-indigo-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🏠</span>
                          Open House
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FASE 4: GESTIÓN */}
        {activeTab === 'gestion' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-br from-emerald-50/50 to-green-50/30 border-emerald-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fase 4: GESTIÓN</h2>
                  <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calificar leads, programar visitas y mantener informado al vendedor</p>
                </div>
              </div>

              {/* Métricas de la Fase */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Tasa de Conversión</p>
                  <p className={`text-3xl font-bold text-white`}>42%</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Visitas → Oferta formal</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Tiempo de Respuesta</p>
                  <p className={`text-3xl font-bold text-white`}>12 min</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Promedio al lead</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Ofertas Aceptadas</p>
                  <p className={`text-3xl font-bold text-white`}>68%</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Del total recibidas</p>
                </div>
              </div>

              {/* Propiedades en Gestión */}
              <div className="space-y-6">
                {propiedadesGestion.map((prop) => (
                  <div key={prop.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{prop.direccion}</h3>
                        <p className="text-sm text-gray-600">Propietario: {prop.propietario}</p>
                        <p className="text-lg font-bold text-green-600 mt-1">PVS: S/ {prop.pvs.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                          {prop.visitasRealizadas} visitas
                        </span>
                      </div>
                    </div>

                    {/* Leads Asociados */}
                    <div className="mb-4">
                      <h4 className="font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3">Leads en Proceso ({prop.leads.length})</h4>
                      <div className="space-y-2">
                        {prop.leads.map((lead, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-4">
                              <div className="flex space-x-0.5">
                                {[...Array(lead.scoring)].map((_, i) => (
                                  <span key={i} className="text-yellow-500 text-sm">★</span>
                                ))}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{lead.nombre}</p>
                                <p className="text-xs text-gray-500">Último contacto: {lead.ultimoContacto}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              {lead.precalificado ? (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                  ✓ Precalificado
                                </span>
                              ) : (
                                <button className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium hover:bg-yellow-200">
                                  Solicitar Precalificación
                                </button>
                              )}
                              <span className="text-sm text-gray-600">{lead.visitasProgramadas} visitas</span>
                              <button 
                                onClick={() => openModal('calificarLead')}
                                className={`group px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                  darkMode 
                                    ? 'bg-gradient-to-r from-yellow-600/20 to-amber-600/20 text-yellow-300 hover:from-yellow-600/30 hover:to-amber-600/30 border border-yellow-500/40 hover:border-yellow-400/60 hover:shadow-lg hover:shadow-yellow-500/20' 
                                    : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 shadow-md hover:shadow-lg hover:shadow-yellow-500/50'
                                }`}
                                title="Calificar Lead"
                              >
                                <span className="flex items-center gap-1.5">
                                  <span>⭐</span>
                                  Calificar
                                </span>
                              </button>
                              <button 
                                onClick={() => openModal('programarVisita', { ...prop, lead })}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                              >
                                📅 Visita
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feedback del Dueño */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Feedback del Propietario:</p>
                      <p className="text-sm text-blue-800">{prop.feedbackDueño}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <button 
                        onClick={() => openModal('enviarFeedback', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/40 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20' 
                            : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 shadow-md hover:shadow-lg hover:shadow-blue-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>💬</span>
                          Enviar Feedback
                        </span>
                      </button>
                      <button 
                        onClick={() => openModal('calendarioVisitas', prop)}
                        className={`group px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20 text-emerald-300 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/40 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/20' 
                            : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg hover:shadow-emerald-500/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>📅</span>
                          Calendario de Visitas
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FASE 5: NEGOCIACIÓN */}
        {activeTab === 'negociacion' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-br from-slate-50/50 to-gray-50/30 border-gray-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fase 5: NEGOCIACIÓN</h2>
                  <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Maximizar el valor de la venta mediante estrategia inteligente</p>
                </div>
              </div>

              {/* Métricas de la Fase */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Desviación de Precio</p>
                  <p className={`text-3xl font-bold text-white`}>-3.2%</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>PVS vs Precio Final</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Tiempo Negociación</p>
                  <p className={`text-3xl font-bold text-white`}>8 días</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Oferta → Arras</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Satisfacción</p>
                  <p className={`text-3xl font-bold text-white`}>92%</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>En proceso de cierre</p>
                </div>
              </div>

              {/* Propiedades en Negociación */}
              <div className="space-y-6">
                {propiedadesNegociacion.map((prop) => (
                  <div key={prop.id} className={`rounded-lg p-6 border transition-all ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A] hover:border-[#3A3A3A]' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.direccion}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Propietario: {prop.propietario}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>PVS: <span className="font-bold">S/ {prop.pvs.toLocaleString()}</span></p>
                          {prop.arras && (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              ✓ ARRAS FIRMADAS
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Ofertas Recibidas */}
                    <div className="mb-4">
                      <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ofertas Recibidas ({prop.ofertas.length})</h4>
                      <div className="space-y-3">
                        {prop.ofertas.map((oferta, idx) => (
                          <div key={idx} className={`p-4 rounded-lg border ${darkMode ? 'bg-[#0D3D3D] border-[#2A2A2A]' : 'bg-gray-50 border-gray-300'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{oferta.cliente}</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fecha: {oferta.fecha} · Validez: {oferta.validez}</p>
                              </div>
                              <div className="text-right">
                                <p className={`text-2xl font-bold ${darkMode ? 'text-emerald-400' : 'text-green-600'}`}>S/ {oferta.monto.toLocaleString()}</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {((oferta.monto - prop.pvs) / prop.pvs * 100).toFixed(1)}% del PVS
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                oferta.estado === 'Aceptada' ? 'bg-green-100 text-green-800' :
                                oferta.estado === 'Contraofertar' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {oferta.estado}
                              </span>
                              <div className="flex flex-wrap gap-2">
                                <button 
                                  onClick={() => openModal('aceptarOferta', { ...prop, oferta })}
                                  className={`group px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                    darkMode 
                                      ? 'bg-gradient-to-r from-emerald-600/20 to-green-600/20 text-emerald-300 hover:from-emerald-600/30 hover:to-green-600/30 border border-emerald-500/40 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/20' 
                                      : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg hover:shadow-emerald-500/50'
                                  }`}
                                >
                                  <span className="flex items-center gap-1.5">
                                    <span>✓</span>
                                    Aceptar
                                  </span>
                                </button>
                                <button 
                                  onClick={() => openModal('contraoferta', { ...prop, oferta })}
                                  className={`group px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                    darkMode 
                                      ? 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 text-amber-300 hover:from-amber-600/30 hover:to-orange-600/30 border border-amber-500/40 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/20' 
                                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-md hover:shadow-lg hover:shadow-amber-500/50'
                                  }`}
                                >
                                  <span className="flex items-center gap-1.5">
                                    <span>↔</span>
                                    Contraofertar
                                  </span>
                                </button>
                                <button 
                                  onClick={() => openModal('rechazarOferta', { ...prop, oferta })}
                                  className={`group px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                    darkMode 
                                      ? 'bg-gradient-to-r from-red-600/20 to-rose-600/20 text-red-300 hover:from-red-600/30 hover:to-rose-600/30 border border-red-500/40 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/20' 
                                      : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-lg hover:shadow-red-500/50'
                                  }`}
                                >
                                  <span className="flex items-center gap-1.5">
                                    <span>✕</span>
                                    Rechazar
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Estrategia y Arras */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#164773] border-[#2A2A2A]' : 'bg-blue-50 border-blue-200'}`}>
                        <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>Estrategia Recomendada:</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>{prop.estrategia}</p>
                      </div>
                      {prop.arras && (
                        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-[#3B8C6E] border-[#2A2A2A]' : 'bg-green-50 border-green-200'}`}>
                          <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-emerald-200' : 'text-green-900'}`}>Arras Depositadas:</p>
                          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-green-800'}`}>S/ {prop.montoArras.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button 
                        onClick={() => openModal('gestionarOfertas', prop)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                          darkMode 
                            ? 'bg-amber-600 text-white hover:bg-amber-500' 
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-300'
                        }`}
                      >
                        💼 Gestionar Ofertas
                      </button>
                      {!prop.arras && (
                        <button 
                          onClick={() => openModal('firmarArras', prop)}
                          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm font-medium"
                        >
                          📝 Firmar Arras
                        </button>
                      )}
                      <button 
                        onClick={() => openModal('verCampañas', prop)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        📊 Ver Historial
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FASE 6: CIERRE FINAL */}
        {activeTab === 'cierre' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border-blue-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fase 6: CIERRE FINAL</h2>
                  <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Coordinar trámites legales y financieros para la transferencia</p>
                </div>
              </div>

              {/* Métricas de la Fase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Días para el Cierre</p>
                  <p className={`text-3xl font-bold text-white`}>18 días</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Arras → Escritura</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Cierres Sin Incidencias</p>
                  <p className={`text-3xl font-bold text-white`}>95%</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Proceso exitoso</p>
                </div>
              </div>

              {/* Propiedades en Cierre */}
              <div className="space-y-6">
                {propiedadesCierre.map((prop) => (
                  <div key={prop.id} className={`rounded-xl p-6 border transition-all duration-300 shadow-lg hover:shadow-xl ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A] hover:border-emerald-600/50' : 'bg-white border-blue-200 hover:border-blue-300'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.direccion}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vendedor: {prop.propietario}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Comprador: {prop.comprador}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>PVS: <span className="line-through">S/ {prop.pvs.toLocaleString()}</span></p>
                          <p className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Final: S/ {prop.precioFinal.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${darkMode ? 'bg-gradient-to-r from-[#164773] to-[#0B2B40] text-white border border-[#164773]' : 'bg-gradient-to-r from-[#164773] to-[#1E5959] text-white shadow-md'}`}>
                          {prop.diasParaCierre} días para cierre
                        </span>
                      </div>
                    </div>

                    {/* Timeline de Cierre */}
                    <div className="mb-4">
                      <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Línea de Tiempo del Cierre</h4>
                      <div className="space-y-3">
                        {/* Tasación */}
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? (
                              prop.etapas.tasacion.status === 'Completado' ? 'bg-emerald-600' :
                              prop.etapas.tasacion.status === 'En Proceso' ? 'bg-gray-500' : 'bg-gray-600'
                            ) : (
                              prop.etapas.tasacion.status === 'Completado' ? 'bg-gray-800' :
                              prop.etapas.tasacion.status === 'En Proceso' ? 'bg-gray-400' : 'bg-gray-200'
                            )
                          }`}>
                            {prop.etapas.tasacion.status === 'Completado' ? (
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-white font-bold">1</span>
                            )}
                          </div>
                          <div className={`flex-1 p-3 rounded-lg border transition-all ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-r from-[#164773]/5 to-[#1E5959]/5 border-[#164773]/20'}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tasación Bancaria</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Banco: {prop.etapas.tasacion.banco}</p>
                              </div>
                              <div className="text-right">
                                <span className={`text-sm font-medium ${
                                  darkMode ? (
                                    prop.etapas.tasacion.status === 'Completado' ? 'text-emerald-400' :
                                    prop.etapas.tasacion.status === 'En Proceso' ? 'text-gray-400' : 'text-gray-500'
                                  ) : (
                                    prop.etapas.tasacion.status === 'Completado' ? 'text-[#164773]' :
                                    prop.etapas.tasacion.status === 'En Proceso' ? 'text-gray-700' : 'text-gray-500'
                                  )
                                }`}>
                                  {prop.etapas.tasacion.status}
                                </span>
                                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{prop.etapas.tasacion.fecha}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Notaría */}
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? (
                              prop.etapas.notaria.status === 'Completado' ? 'bg-emerald-600' :
                              prop.etapas.notaria.status === 'En Proceso' ? 'bg-gray-500' : 'bg-gray-600'
                            ) : (
                              prop.etapas.notaria.status === 'Completado' ? 'bg-gray-800' :
                              prop.etapas.notaria.status === 'En Proceso' ? 'bg-gray-400' : 'bg-gray-200'
                            )
                          }`}>
                            {prop.etapas.notaria.status === 'Completado' ? (
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-white font-bold">2</span>
                            )}
                          </div>
                          <div className={`flex-1 p-3 rounded-lg border transition-all ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-r from-[#164773]/5 to-[#1E5959]/5 border-[#164773]/20'}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Coordinación Notaría</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Notaría: {prop.etapas.notaria.notaria}</p>
                              </div>
                              <div className="text-right">
                                <span className={`text-sm font-medium ${
                                  darkMode ? (
                                    prop.etapas.notaria.status === 'Completado' ? 'text-emerald-400' :
                                    prop.etapas.notaria.status === 'En Proceso' ? 'text-gray-400' : 'text-gray-500'
                                  ) : (
                                    prop.etapas.notaria.status === 'Completado' ? 'text-gray-900' :
                                    prop.etapas.notaria.status === 'En Proceso' ? 'text-gray-700' : 'text-gray-500'
                                  )
                                }`}>
                                  {prop.etapas.notaria.status}
                                </span>
                                <p className="text-xs text-gray-500">{prop.etapas.notaria.fecha}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Escritura */}
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? (
                              prop.etapas.escritura.status === 'Completado' ? 'bg-emerald-600' :
                              prop.etapas.escritura.status === 'En Proceso' ? 'bg-gray-500' : 'bg-gray-600'
                            ) : (
                              prop.etapas.escritura.status === 'Completado' ? 'bg-gray-800' :
                              prop.etapas.escritura.status === 'En Proceso' ? 'bg-gray-400' : 'bg-gray-200'
                            )
                          }`}>
                            <span className="text-white font-bold">3</span>
                          </div>
                          <div className="flex-1 p-3 rounded-lg border transition-all ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-r from-[#164773]/5 to-[#1E5959]/5 border-[#164773]/20'}">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}">Firma Escritura Pública</p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium text-gray-500">{prop.etapas.escritura.status}</span>
                                <p className="text-xs text-gray-500">{prop.etapas.escritura.fecha}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Entrega de Llaves */}
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? (
                              prop.etapas.entregaLlaves.status === 'Completado' ? 'bg-emerald-600' :
                              prop.etapas.entregaLlaves.status === 'En Proceso' ? 'bg-gray-500' : 'bg-gray-600'
                            ) : (
                              prop.etapas.entregaLlaves.status === 'Completado' ? 'bg-gray-800' :
                              prop.etapas.entregaLlaves.status === 'En Proceso' ? 'bg-gray-400' : 'bg-gray-200'
                            )
                          }`}>
                            <span className="text-white font-bold">4</span>
                          </div>
                          <div className="flex-1 p-3 rounded-lg border transition-all ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-r from-[#164773]/5 to-[#1E5959]/5 border-[#164773]/20'}">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}">Entrega de Llaves</p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium text-gray-500">{prop.etapas.entregaLlaves.status}</span>
                                <p className="text-xs text-gray-500">{prop.etapas.entregaLlaves.fecha}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documentos Pendientes */}
                    {prop.documentosPendientes.length > 0 && (
                      <div className={`p-4 rounded-lg border mb-4 ${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-white border-gray-300'}`}>
                        <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-emerald-300' : 'text-gray-900'}`}>Documentos Pendientes:</p>
                        <ul className={`list-disc list-inside text-sm ${darkMode ? 'text-emerald-200' : 'text-gray-700'}`}>
                          {prop.documentosPendientes.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => openModal('lineaTiempoCierre', prop)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                          darkMode 
                            ? 'bg-blue-600 text-white hover:bg-blue-500' 
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300'
                        }`}
                      >
                        ⏱️ Ver Timeline Completo
                      </button>
                      <button 
                        onClick={() => openModal('actualizarEstado', prop)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-medium ${darkMode ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                      >
                        📝 Actualizar Estado
                      </button>
                      <button 
                        onClick={() => openModal('subirDocumentos', prop)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-medium border ${darkMode ? 'border-emerald-600 text-emerald-400 hover:bg-emerald-600/10' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        📄 Documentos
                      </button>
                      <button 
                        onClick={() => openModal('contactarNotaria', prop)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-medium border ${darkMode ? 'border-emerald-600 text-emerald-400 hover:bg-emerald-600/10' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        Contactar Notaría
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FASE 7: POST-VENTA */}
        {activeTab === 'postventa' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1E5959] border-[#2A2A2A]' : 'bg-gradient-to-br from-rose-50/50 to-pink-50/30 border-rose-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fase 7: POST-VENTA</h2>
                  <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Garantizar experiencia memorable y generar referidos</p>
                </div>
              </div>

              {/* Métricas de la Fase */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>NPS Promedio</p>
                  <p className={`text-3xl font-bold text-white`}>9.5</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Satisfacción post-venta</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0D3D3D] border-[#0D3D3D]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Referidos Generados</p>
                  <p className={`text-3xl font-bold text-white`}>3</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Por cliente</p>
                </div>
                <div className={`p-4 rounded-xl border transition-all shadow-md hover:shadow-lg ${darkMode ? 'bg-gradient-to-br from-[#1E5959] to-[#164773] border-[#2A2A2A]' : 'bg-[#0B2B40] border-[#0B2B40]'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-white'}`}>Tiempo Trámites</p>
                  <p className={`text-3xl font-bold text-white`}>5 días</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-white/90'}`}>Resolución promedio</p>
                </div>
              </div>

              {/* Casos en Post-Venta */}
              <div className="space-y-6">
                {propiedadesPostVenta.map((prop) => (
                  <div key={prop.id} className={`rounded-lg p-6 border ${darkMode ? 'bg-[#1E5959] border-emerald-600/20' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{prop.direccion}</h3>
                        <p className="text-sm text-gray-600">Vendedor: {prop.propietario}</p>
                        <p className="text-sm text-gray-600">Comprador: {prop.comprador}</p>
                        <p className={`text-lg font-bold mt-1 ${darkMode ? 'text-emerald-400' : 'text-gray-900'}`}>Precio Final: S/ {prop.precioFinal.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Cierre: {prop.fechaCierre}</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-4 py-2 rounded-lg mb-2 border ${darkMode ? 'bg-emerald-600/10 border-emerald-600/30 text-emerald-400' : 'bg-white border-gray-300 text-gray-900'}`}>
                          <p className="text-xs">NPS Score</p>
                          <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{prop.nps}/10</p>
                        </div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-gray-700'}`}>
                          {prop.referidosGenerados} referidos
                        </span>
                      </div>
                    </div>

                    {/* Checklist de Trámites */}
                    <div className="mb-4">
                      <h4 className="font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3">Checklist de Trámites Post-Venta</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(prop.tramites).map(([key, tramite]) => (
                          <div key={key} className={`p-3 rounded-lg border ${
                            darkMode ? (
                              tramite.status === 'Completado' ? 'bg-emerald-600/10 border-emerald-600/30' :
                              tramite.status === 'En Proceso' ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-[#1E5959] border-[#2A2A2A]'
                            ) : (
                              tramite.status === 'Completado' ? 'bg-white border-gray-400' :
                              tramite.status === 'En Proceso' ? 'bg-white border-gray-300' : 'bg-white border-gray-200'
                            )
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-sm capitalize">{key}</p>
                              {tramite.status === 'Completado' && (
                                <svg className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}">{tramite.status}</p>
                            {tramite.fecha && (
                              <p className="text-xs text-gray-500">{tramite.fecha}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonio */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Testimonio del Cliente:</p>
                      <p className="text-sm text-blue-800 italic">"{prop.testimonio}"</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => openModal('checklistTramites', prop)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                          darkMode 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-500' 
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-300'
                        }`}
                      >
                        ✅ Checklist Trámites
                      </button>
                      <button 
                        onClick={() => openModal('encuestaNPS', prop)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                          darkMode 
                            ? 'bg-purple-600 text-white hover:bg-purple-500' 
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300'
                        }`}
                      >
                        ⭐ Encuesta NPS
                      </button>
                      <button 
                        onClick={() => openModal('solicitarReferidos', prop)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                          darkMode 
                            ? 'bg-pink-600 text-white hover:bg-pink-500' 
                            : 'bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-300'
                        }`}
                      >
                        🎁 Programa Referidos
                      </button>
                      <button 
                        onClick={() => openModal('exportarPDF', prop)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        📄 Exportar PDF
                      </button>
                      <button 
                        onClick={() => openModal('gestionarPropiedad', prop)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm font-medium"
                      >
                        🗂️ Archivar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reportes */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Reportes y KPIs Completos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 border-2 border-green-200 rounded-xl bg-green-50">
                  <h4 className="font-semibold mb-2 text-gray-700 text-sm uppercase tracking-wide">VTC (Valor Total Cliente)</h4>
                  <p className="text-4xl font-bold text-green-600">S/ 3,120</p>
                  <p className="text-sm text-gray-600 mt-2">Comisión venta + servicios adicionales</p>
                </div>
                <div className="p-6 border-2 border-blue-200 rounded-xl bg-blue-50">
                  <h4 className="font-semibold mb-2 text-gray-700 text-sm uppercase tracking-wide">Tasa de Conversión</h4>
                  <p className="text-4xl font-bold text-blue-600">{metrics.tasaConversion}%</p>
                  <p className="text-sm text-gray-600 mt-2">De visitas a ofertas formales</p>
                </div>
                <div className="p-6 border-2 border-purple-200 rounded-xl bg-purple-50">
                  <h4 className="font-semibold mb-2 text-gray-700 text-sm uppercase tracking-wide">Días para Cierre</h4>
                  <p className="text-4xl font-bold text-purple-600">{metrics.diasCierre}</p>
                  <p className="text-sm text-gray-600 mt-2">Desde arras hasta escritura pública</p>
                </div>
                <div className="p-6 border-2 border-orange-200 rounded-xl bg-orange-50">
                  <h4 className="font-semibold mb-2 text-gray-700 text-sm uppercase tracking-wide">Tasa de Captación</h4>
                  <p className="text-4xl font-bold text-orange-600">{metrics.tasaCaptacion}%</p>
                  <p className="text-sm text-gray-600 mt-2">Reuniones que culminan en exclusividad</p>
                </div>
                <div className="p-6 border-2 border-indigo-200 rounded-xl bg-indigo-50">
                  <h4 className="font-semibold mb-2 text-gray-700 text-sm uppercase tracking-wide">Tiempo Preparación</h4>
                  <p className="text-4xl font-bold text-indigo-600">{metrics.tiempoPreparacion} días</p>
                  <p className="text-sm text-gray-600 mt-2">Desde firma hasta listado activo</p>
                </div>
                <div className="p-6 border-2 border-pink-200 rounded-xl bg-pink-50">
                  <h4 className="font-semibold mb-2 text-gray-700 text-sm uppercase tracking-wide">CTR (Click Through Rate)</h4>
                  <p className="text-4xl font-bold text-pink-600">{metrics.ctr}%</p>
                  <p className="text-sm text-gray-600 mt-2">En campañas digitales</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>

      {/* MODALES FUNCIONALES */}
      {activeModal && (
        <div onClick={closeModal} className={`fixed inset-0 ${darkMode ? 'bg-black/80' : 'bg-gray-900/50'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
          <div onClick={(e) => e.stopPropagation()} className={`${theme.bgCard} border ${theme.border} rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            {/* Header del Modal */}
            <div className={`sticky top-0 ${theme.bgCard} border-b ${theme.border} px-6 py-4 flex items-center justify-between z-10`}>
              <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                {/* Fase 1: INICIO */}
                {activeModal === 'cargarDocumentos' && '📄 Cargar Documentos de Propiedad'}
                {activeModal === 'firmarContrato' && '✍️ Firmar Contrato de Exclusividad'}
                {activeModal === 'definirPVS' && '💰 Definir Precio de Venta Sugerido (PVS)'}
                
                {/* Fase 2: PREPARACIÓN */}
                {activeModal === 'subirFotos' && '📸 Subir Fotografías Profesionales'}
                {activeModal === 'buyerPersona' && '👥 Definir Buyer Persona'}
                {activeModal === 'video360' && 'Crear Video 360°'}
                {activeModal === 'editarFicha' && 'Editar Ficha Comercial'}
                
                {/* Fase 3: DIFUSIÓN */}
                {activeModal === 'verCampañas' && 'Campañas Activas'}
                {activeModal === 'nuevaCampana' && '🚀 Nueva Campaña Digital'}
                {activeModal === 'openHouse' && 'Programar Open House'}
                
                {/* Fase 4: GESTIÓN */}
                {activeModal === 'calificarLead' && '⭐ Calificar Lead'}
                {activeModal === 'enviarFeedback' && 'Enviar Feedback al Propietario'}
                {activeModal === 'calendarioVisitas' && 'Calendario de Visitas'}
                {activeModal === 'programarVisita' && 'Programar Visita'}
                
                {/* Fase 5: NEGOCIACIÓN */}
                {activeModal === 'gestionarOfertas' && '💼 Gestionar Ofertas'}
                {activeModal === 'aceptarOferta' && 'Aceptar Oferta'}
                {activeModal === 'contraoferta' && 'Realizar Contraoferta'}
                {activeModal === 'rechazarOferta' && 'Rechazar Oferta'}
                {activeModal === 'firmarArras' && 'Firmar Contrato de Arras'}
                
                {/* Fase 6: CIERRE */}
                {activeModal === 'lineaTiempoCierre' && '⏱️ Línea de Tiempo - Cierre Final'}
                {activeModal === 'actualizarEstado' && 'Actualizar Estado de Cierre'}
                {activeModal === 'subirDocumentos' && 'Subir Documentos Legales'}
                {activeModal === 'contactarNotaria' && 'Contactar Notaría'}
                
                {/* Fase 7: POST-VENTA */}
                {activeModal === 'actualizarTramites' && 'Actualizar Trámites Post-Venta'}
                {activeModal === 'solicitarReferidos' && 'Solicitar Referidos'}
                {activeModal === 'checklistTramites' && 'Checklist de Trámites'}
                {activeModal === 'encuestaNPS' && 'Encuesta NPS'}
                
                {/* Otros */}
                {activeModal === 'captacion' && 'Nueva Captación - Smart Capture'}
                {activeModal === 'gestionarPropiedad' && 'Gestionar Propiedad'}
                {activeModal === 'exportarPDF' && 'Exportar Resumen PDF'}
              </h3>
              <button 
                onClick={closeModal}
                className={`p-2 ${theme.bgHover} rounded-md transition-colors`}
              >
                <svg className={`w-5 h-5 ${theme.textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">

              {/* FASE 1: INICIO - Cargar Documentos */}
              {activeModal === 'cargarDocumentos' && selectedProperty && (
                <DocumentUploadForm
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onSuccess={() => {
                    alert('¡Documentos cargados exitosamente!');
                    closeModal();
                  }}
                />
              )}

              {/* FASE 1: INICIO - Firmar Contrato de Exclusividad */}
              {activeModal === 'firmarContrato' && selectedProperty && (
                <ContratoExclusividad
                  propiedad={{
                    direccion: selectedProperty.direccion,
                    propietario: selectedProperty.propietario,
                    pvs: selectedProperty.pvs
                  }}
                  darkMode={darkMode}
                  onFirmar={(tipoFirma) => {
                    console.log('Contrato firmado vía:', tipoFirma);
                    alert(`Contrato firmado exitosamente vía ${tipoFirma}`);
                    closeModal();
                  }}
                />
              )}

              {/* FASE 1: INICIO - Definir PVS */}
              {activeModal === 'definirPVS' && selectedProperty && (
                <PVSCalculator
                  propiedad={{
                    direccion: selectedProperty.direccion,
                    distrito: 'Miraflores',
                    area: 120,
                    habitaciones: 3,
                    baños: 2
                  }}
                  darkMode={darkMode}
                  onConfirmar={(pvs, justificacion) => {
                    console.log('PVS confirmado:', pvs, 'Justificación:', justificacion);
                    alert(`PVS establecido en S/ ${pvs.toLocaleString()}`);
                    closeModal();
                  }}
                />
              )}

              {/* FASE 2: PREPARACIÓN - Subir Fotos */}
              {activeModal === 'subirFotos' && selectedProperty && (
                <FotoUploadManager
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onSuccess={() => {
                    alert('Fotos guardadas exitosamente');
                    closeModal();
                  }}
                />
              )}

              {/* FASE 2: PREPARACIÓN - Buyer Persona */}
              {activeModal === 'buyerPersona' && selectedProperty && (
                <BuyerPersonaBuilder
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onConfirmar={(personaTipo, detallePersona) => {
                    console.log('Buyer Persona:', personaTipo, detallePersona);
                    alert('Buyer Persona configurado exitosamente');
                    closeModal();
                  }}
                />
              )}

              {/* FASE 3: DIFUSIÓN - Nueva Campaña Digital */}
              {activeModal === 'nuevaCampana' && selectedProperty && (
                <CampañaDigitalForm
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onCrear={(campanaData) => {
                    console.log('Nueva campaña:', campanaData);
                    alert(`Campaña creada en ${campanaData.plataforma}`);
                    closeModal();
                  }}
                />
              )}

              {/* FASE 4: GESTIÓN - Calificar Lead */}
              {activeModal === 'calificarLead' && (
                <LeadCalificacion
                  lead={{
                    id: 123,
                    nombre: 'María González',
                    email: 'maria@email.com',
                    telefono: '+51 999 888 777',
                    scoring: 3
                  }}
                  darkMode={darkMode}
                  onCalificar={(leadId, calificacionData) => {
                    console.log('Lead calificado:', leadId, calificacionData);
                    alert('Lead calificado exitosamente');
                    closeModal();
                  }}
                />
              )}

              {/* FASE 5: NEGOCIACIÓN - Gestión de Ofertas */}
              {activeModal === 'gestionarOfertas' && selectedProperty && (
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
                        alert('Oferta aceptada');
                        break;
                      case 'rechazar':
                        alert('Oferta rechazada');
                        break;
                      case 'contraofertar':
                        alert(`Contraoferta enviada: S/ ${data.monto.toLocaleString()}`);
                        break;
                      case 'firmar-arras':
                        alert(`Arras firmadas por S/ ${data.monto}`);
                        break;
                    }
                  }}
                />
              )}

              {/* FASE 6: CIERRE - Timeline de Cierre */}
              {activeModal === 'lineaTiempoCierre' && selectedProperty && (
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
                    alert(`Etapa ${etapa} actualizada`);
                  }}
                />
              )}

              {/* FASE 7: POST-VENTA - Checklist de Trámites */}
              {activeModal === 'checklistTramites' && selectedProperty && (
                <ChecklistPostVenta
                  propiedadId={selectedProperty.id}
                  direccion={selectedProperty.direccion}
                  comprador="Juan Pérez"
                  darkMode={darkMode}
                  onActualizar={(tramites) => {
                    console.log('Trámites actualizados:', tramites);
                    const completados = tramites.filter(t => t.completado).length;
                    alert(`✓ Progreso actualizado: ${completados}/${tramites.length} trámites completados`);
                  }}
                />
              )}

              {/* FASE 7: POST-VENTA - Encuesta NPS */}
              {activeModal === 'encuestaNPS' && selectedProperty && (
                <EncuestaNPS
                  clienteNombre="Familia Gutiérrez"
                  propiedadDireccion={selectedProperty.direccion}
                  agenteNombre="Juan Silva"
                  darkMode={darkMode}
                  onEnviar={(datos) => {
                    console.log('Encuesta NPS enviada:', datos);
                    alert(`✓ Encuesta enviada - NPS: ${datos.puntuacion}/10`);
                    closeModal();
                  }}
                />
              )}

              {/* FASE 7: POST-VENTA - Sistema de Referidos */}
              {activeModal === 'solicitarReferidos' && selectedProperty && (
                <SistemaReferidos
                  clienteNombre="Familia Gutiérrez"
                  clienteId={123}
                  darkMode={darkMode}
                  onRegistrarReferido={(referido) => {
                    console.log('Referido registrado:', referido);
                    alert(`✓ Referido registrado: ${referido.nombre}`);
                  }}
                />
              )}

              {/* Modal: Nueva Captación */}
              {activeModal === 'captacion' && (
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'} border rounded-lg p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      <span className="font-semibold">Smart Capture</span> ayuda a registrar rápidamente nuevas propiedades validando información clave.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dirección Completa *</label>
                      <input type="text" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="Av. Larco 1234, Miraflores" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tipo de Propiedad *</label>
                      <select className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`}>
                        <option>Casa</option>
                        <option>Departamento</option>
                        <option>Terreno</option>
                        <option>Local Comercial</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre del Propietario *</label>
                      <input type="text" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="Juan Pérez" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Teléfono de Contacto *</label>
                      <input type="tel" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="+51 999 888 777" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Precio Esperado (S/) *</label>
                      <input type="number" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="280000" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Área (m²) *</label>
                      <input type="number" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="120" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dormitorios</label>
                      <input type="number" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="3" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Baños</label>
                      <input type="number" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="2" />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notas / Observaciones</label>
                    <textarea className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} rows={3} placeholder="Información adicional relevante..."></textarea>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className={`w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-white border-gray-300'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tiene documentación lista</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className={`w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-white border-gray-300'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Interés en exclusividad</span>
                    </label>
                  </div>

                  <div className={`flex justify-end space-x-3 pt-4 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <button onClick={closeModal} className={`px-6 py-2.5 border rounded-lg transition-colors font-medium ${darkMode ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      Cancelar
                    </button>
                    <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20">
                      Registrar Propiedad
                    </button>
                  </div>
                </div>
              )}

              {/* Modal: Subir Fotos */}
              {activeModal === 'subirFotos' && (
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'} border rounded-lg p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      Sube fotografías profesionales de alta calidad. Recomendado: <span className="font-semibold">15-25 fotos</span> mostrando todos los ambientes.
                    </p>
                  </div>

                  <div className={`border-2 border-dashed ${theme.borderInput} rounded-lg p-12 text-center hover:border-emerald-600 transition cursor-pointer ${darkMode ? 'bg-[#252525]/30' : 'bg-gray-50'}`}>
                    <svg className={`w-16 h-16 ${theme.textTertiary} mx-auto mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className={`${theme.textPrimary} font-medium mb-2`}>Arrastra las fotos aquí o haz clic para seleccionar</p>
                    <p className={`text-sm ${theme.textSecondary}`}>Formatos: JPG, PNG (máx. 10MB por foto)</p>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`aspect-square ${theme.bgSecondary} rounded-lg border ${theme.border} flex items-center justify-center`}>
                        <span className={`text-xs ${theme.textTertiary}`}>Foto {i}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className={`w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-white border-gray-300'}`} defaultChecked />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Aplicar corrección automática de iluminación</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className={`w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-white border-gray-300'}`} defaultChecked />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Agregar marca de agua con logo</span>
                    </label>
                  </div>

                  <div className={`flex justify-end space-x-3 pt-4 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <button onClick={closeModal} className={`px-6 py-2.5 border rounded-lg transition-colors font-medium ${darkMode ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      Cancelar
                    </button>
                    <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20">
                      Subir Fotos
                    </button>
                  </div>
                </div>
              )}

              {/* Modal: Nueva Campaña */}
              {activeModal === 'nuevaCampana' && (
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'} border rounded-lg p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      Crea una campaña digital optimizada para atraer leads calificados en múltiples canales.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre de la Campaña *</label>
                      <input type="text" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="Campaña Dpto Miraflores" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Presupuesto Diario (S/) *</label>
                      <input type="number" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="50" />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Canales de Publicación *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Facebook', 'Instagram', 'Inmuebles24', 'Urbania', 'Properati', 'Google Ads'].map((canal) => (
                        <label key={canal} className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer ${darkMode ? 'border-[#3A3A3A] hover:bg-[#2A2A2A]' : 'border-gray-300 hover:bg-gray-50'}`}>
                          <input type="checkbox" className={`w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-white border-gray-300'}`} />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{canal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Buyer Persona Objetivo</label>
                    <select className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`}>
                      <option>Familia joven profesional</option>
                      <option>Inversionista</option>
                      <option>Pareja sin hijos</option>
                      <option>Ejecutivo soltero</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fecha Inicio</label>
                      <input type="date" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fecha Fin</label>
                      <input type="date" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                    </div>
                  </div>

                  <div className={`flex justify-end space-x-3 pt-4 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <button onClick={closeModal} className={`px-6 py-2 border rounded-lg transition-colors font-medium ${darkMode ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      Cancelar
                    </button>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20">
                      Crear Campaña
                    </button>
                  </div>
                </div>
              )}

              {/* Modal: Programar Visita */}
              {activeModal === 'programarVisita' && (
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'} border rounded-lg p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      Coordina una visita con el lead. Se enviará confirmación automática por email y SMS.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre del Lead *</label>
                      <input type="text" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="Ana López" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Teléfono *</label>
                      <input type="tel" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="+51 999 888 777" />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fecha de Visita *</label>
                      <input type="date" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hora *</label>
                      <input type="time" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tipo de Visita</label>
                    <select className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`}>
                      <option>Presencial</option>
                      <option>Virtual (videollamada)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notas Adicionales</label>
                    <textarea className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} rows={3} placeholder="Información importante para la visita..."></textarea>
                  </div>

                  <div className={`flex justify-end space-x-3 pt-4 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <button onClick={closeModal} className={`px-6 py-2 border rounded-lg transition-colors font-medium ${darkMode ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      Cancelar
                    </button>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20">
                      Confirmar Visita
                    </button>
                  </div>
                </div>
              )}

              {/* Modal: Aceptar Oferta */}
              {activeModal === 'aceptarOferta' && selectedProperty && (
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-green-600/10 border-green-600/30' : 'bg-green-50 border-green-200'} border rounded-lg p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                      Estás a punto de <span className="font-semibold">aceptar la oferta</span>. Se notificará al comprador y al vendedor automáticamente.
                    </p>
                  </div>

                  <div className={`${theme.bgCard} border ${theme.border} rounded-lg p-4`}>
                    <h4 className={`font-semibold ${theme.textPrimary} mb-3`}>Detalles de la Oferta</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Propiedad</p>
                        <p className="font-medium text-gray-900">{selectedProperty.direccion}</p>
                      </div>
                      <div>
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}">PVS Original</p>
                        <p className="font-medium text-gray-900">S/ {selectedProperty.pvs?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Comprador</p>
                        <p className="font-medium text-gray-900">Sofia Mendoza</p>
                      </div>
                      <div>
                        <p className="text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}">Monto Ofertado</p>
                        <p className="font-bold text-green-600 text-lg">S/ 445,000</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Monto de Arras (S/) *</label>
                    <input type="number" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="22250" />
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recomendado: 5% del valor de la oferta</p>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Comentarios</label>
                    <textarea className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} rows={3} placeholder="Condiciones especiales, términos acordados..."></textarea>
                  </div>

                  <div className={`flex justify-end space-x-3 pt-4 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <button onClick={closeModal} className={`px-6 py-2 border rounded-lg transition-colors font-medium ${darkMode ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      Cancelar
                    </button>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20">
                      Aceptar Oferta
                    </button>
                  </div>
                </div>
              )}

              {/* Modal: Firmar Arras */}
              {activeModal === 'firmarArras' && (
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-orange-600/10 border-orange-600/30' : 'bg-orange-50 border-orange-200'} border rounded-lg p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                      <span className="font-semibold">Contrato de Arras</span> - Documento legal que formaliza el compromiso de compra-venta.
                    </p>
                  </div>

                  <div className={`border ${theme.border} rounded-lg p-6 ${theme.bgSecondary}`}>
                    <h4 className={`font-semibold ${theme.textPrimary} mb-4`}>Información del Contrato</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Vendedor</p>
                        <p className="font-medium">Carlos Silva Ramos</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Comprador</p>
                        <p className="font-medium">Sofia Mendoza</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Monto Total</p>
                        <p className="font-bold text-green-600">S/ 455,000</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Arras (10%)</p>
                        <p className="font-bold text-orange-600">S/ 45,500</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subir Contrato de Arras Firmado (PDF) *</label>
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-emerald-500 transition cursor-pointer ${darkMode ? 'border-[#3A3A3A] bg-[#252525]/30' : 'border-gray-300 bg-gray-50'}`}>
                      <svg className={`w-12 h-12 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Haz clic para seleccionar el archivo PDF</p>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fecha de Firma</label>
                    <input type="date" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                  </div>

                  <div className={`flex justify-end space-x-3 pt-4 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <button onClick={closeModal} className={`px-6 py-2 border rounded-lg transition-colors font-medium ${darkMode ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      Cancelar
                    </button>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20">
                      Registrar Arras
                    </button>
                  </div>
                </div>
              )}

              {/* Modal: Actualizar Estado de Cierre */}
              {activeModal === 'actualizarEstado' && (
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-red-600/10 border-red-600/30' : 'bg-red-50 border-red-200'} border rounded-lg p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                      Actualiza el progreso de las etapas del proceso de cierre final.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className={`border rounded-lg p-4 ${darkMode ? 'border-[#3A3A3A] bg-[#252525]/30' : 'border-gray-300 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tasación Bancaria</h4>
                        <select className={`px-3 py-1 border rounded text-sm ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`}>
                          <option>Completado</option>
                          <option>En Proceso</option>
                          <option>Pendiente</option>
                        </select>
                      </div>
                      <input type="date" className={`w-full px-3 py-2 border rounded text-sm ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                    </div>

                    <div className={`border rounded-lg p-4 ${darkMode ? 'border-[#3A3A3A] bg-[#252525]/30' : 'border-gray-300 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Coordinación Notaría</h4>
                        <select className={`px-3 py-1 border rounded text-sm ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`}>
                          <option>Completado</option>
                          <option>En Proceso</option>
                          <option>Pendiente</option>
                        </select>
                      </div>
                      <input type="date" className={`w-full px-3 py-2 border rounded text-sm ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                    </div>

                    <div className={`border rounded-lg p-4 ${darkMode ? 'border-[#3A3A3A] bg-[#252525]/30' : 'border-gray-300 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Firma Escritura Pública</h4>
                        <select className={`px-3 py-1 border rounded text-sm ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`}>
                          <option>Completado</option>
                          <option>En Proceso</option>
                          <option>Pendiente</option>
                        </select>
                      </div>
                      <input type="date" className={`w-full px-3 py-2 border rounded text-sm ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                    </div>

                    <div className={`border rounded-lg p-4 ${darkMode ? 'border-[#3A3A3A] bg-[#252525]/30' : 'border-gray-300 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Entrega de Llaves</h4>
                        <select className={`px-3 py-1 border rounded text-sm ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`}>
                          <option>Completado</option>
                          <option>En Proceso</option>
                          <option>Pendiente</option>
                        </select>
                      </div>
                      <input type="date" className={`w-full px-3 py-2 border rounded text-sm ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white' : 'bg-white border-gray-400 text-gray-900'}`} />
                    </div>
                  </div>

                  <div className={`flex justify-end space-x-3 pt-4 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <button onClick={closeModal} className={`px-6 py-2 border rounded-lg transition-colors font-medium ${darkMode ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      Cancelar
                    </button>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20">
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              )}

              {/* Modal: Solicitar Referidos */}
              {activeModal === 'solicitarReferidos' && (
                <div className="space-y-6">
                  <div className={`${darkMode ? 'bg-emerald-600/10 border-emerald-600/30' : 'bg-emerald-50 border-emerald-200'} border rounded-lg p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      Solicita referidos a clientes satisfechos para expandir tu cartera de contactos.
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cliente Satisfecho</label>
                    <input type="text" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} placeholder="Familia Gutiérrez" disabled />
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Método de Contacto</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="metodo" className={`w-4 h-4 text-emerald-500 focus:ring-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-white border-gray-300'}`} defaultChecked />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="metodo" className={`w-4 h-4 text-emerald-500 focus:ring-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-white border-gray-300'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>WhatsApp</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="metodo" className={`w-4 h-4 text-emerald-500 focus:ring-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A]' : 'bg-white border-gray-300'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Llamada telefónica</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mensaje Personalizado</label>
                    <textarea className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${darkMode ? 'bg-[#252525] border-[#3A3A3A] text-white placeholder:text-gray-500' : 'bg-white border-gray-400 text-gray-900 placeholder:text-gray-400'}`} rows={5} defaultValue="Estimada Familia Gutiérrez,

Espero que estén disfrutando de su nuevo hogar. Ha sido un placer acompañarlos en este proceso.

Si conocen a alguien que esté buscando comprar o vender una propiedad, les agradecería mucho que me recomienden. Estaré encantado de brindarles el mismo servicio de calidad.

Saludos cordiales,
Juan Silva"></textarea>
                  </div>

                  <div className={`flex justify-end space-x-3 pt-4 border-t ${darkMode ? 'border-[#2A2A2A]' : 'border-gray-200'}`}>
                    <button onClick={closeModal} className={`px-6 py-2 border rounded-lg transition-colors font-medium ${darkMode ? 'border-[#3A3A3A] text-gray-300 hover:bg-[#2A2A2A] hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                      Cancelar
                    </button>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium shadow-lg shadow-emerald-600/20">
                      Enviar Solicitud
                    </button>
                  </div>
                </div>
              )}

              {/* FASE 2: PREPARACIÓN - Tour Virtual 360° */}
              {activeModal === 'video360' && selectedProperty && (
                <Video360Creator
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onClose={closeModal}
                  onSave={(data) => {
                    console.log('Tour 360 guardado:', data);
                    alert('✓ Tour virtual 360° creado exitosamente');
                    closeModal();
                  }}
                />
              )}

              {/* FASE 2: PREPARACIÓN - Editar Ficha Comercial */}
              {activeModal === 'editarFicha' && selectedProperty && (
                <FichaComercialEditor
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onClose={closeModal}
                  onSave={(data) => {
                    console.log('Ficha comercial actualizada:', data);
                    alert('✓ Ficha comercial actualizada correctamente');
                    closeModal();
                  }}
                />
              )}

              {/* FASE 3: DIFUSIÓN - Ver Campañas Activas */}
              {activeModal === 'verCampañas' && selectedProperty && (
                <CampanasViewer
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onClose={closeModal}
                />
              )}

              {/* FASE 3: DIFUSIÓN - Programar Open House */}
              {activeModal === 'openHouse' && selectedProperty && (
                <OpenHouseScheduler
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onClose={closeModal}
                  onSave={(data) => {
                    console.log('Open house programado:', data);
                    alert(`✓ Open house programado para ${new Date(data.fecha).toLocaleDateString()}`);
                    closeModal();
                  }}
                />
              )}

              {/* FASE 4: GESTIÓN - Calificar Lead (alternativo) */}
              {activeModal === 'calificarLead' && !selectedProperty && (
                <CalificarLead
                  leadId={123}
                  darkMode={darkMode}
                  onClose={closeModal}
                  onSave={(data) => {
                    console.log('Lead calificado:', data);
                    alert(`✓ Lead calificado: ${data.calificacion} estrellas`);
                    closeModal();
                  }}
                />
              )}

              {/* FASE 4: GESTIÓN - Enviar Feedback al Propietario */}
              {activeModal === 'enviarFeedback' && selectedProperty && (
                <FeedbackSender
                  propiedadId={selectedProperty.id}
                  propietario="Carlos Mendoza"
                  darkMode={darkMode}
                  onClose={closeModal}
                  onSave={(data) => {
                    console.log('Feedback enviado:', data);
                    alert('✓ Feedback enviado al propietario');
                    closeModal();
                  }}
                />
              )}

              {/* FASE 4: GESTIÓN - Calendario de Visitas */}
              {activeModal === 'calendarioVisitas' && selectedProperty && (
                <CalendarioVisitas
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onClose={closeModal}
                />
              )}

              {/* FASE 5: NEGOCIACIÓN - Contraoferta */}
              {activeModal === 'contraoferta' && selectedProperty && (
                <ContraofertaForm
                  oferta={{ monto: 280000, cliente: 'Juan Pérez' }}
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onClose={closeModal}
                  onSave={(data) => {
                    console.log('Contraoferta enviada:', data);
                    alert(`✓ Contraoferta enviada por S/ ${data.monto.toLocaleString()}`);
                    closeModal();
                  }}
                />
              )}

              {/* FASE 5: NEGOCIACIÓN - Rechazar Oferta */}
              {activeModal === 'rechazarOferta' && selectedProperty && (
                <RechazarOferta
                  oferta={{ monto: 280000, cliente: 'Juan Pérez' }}
                  darkMode={darkMode}
                  onClose={closeModal}
                  onSave={(data) => {
                    console.log('Oferta rechazada:', data);
                    alert(`✓ Oferta rechazada - Motivo: ${data.motivo}`);
                    closeModal();
                  }}
                />
              )}

              {/* FASE 7: POST-VENTA - Exportar Reporte PDF */}
              {activeModal === 'exportarPDF' && selectedProperty && (
                <ExportarPDF
                  propiedadId={selectedProperty.id}
                  darkMode={darkMode}
                  onClose={closeModal}
                />
              )}

              {/* GENERAL - Gestionar Propiedad */}
              {activeModal === 'gestionarPropiedad' && selectedProperty && (
                <PropiedadManager
                  propiedad={selectedProperty}
                  darkMode={darkMode}
                  onClose={closeModal}
                  onEdit={() => {
                    closeModal();
                    openModal('editarFicha', selectedProperty);
                  }}
                  onDelete={() => {
                    if (confirm('¿Está seguro de que desea archivar esta propiedad?')) {
                      alert('✓ Propiedad archivada');
                      closeModal();
                    }
                  }}
                />
              )}

              {/* Modal Genérico para otros casos */}
              {!['captacion', 'subirFotos', 'nuevaCampana', 'programarVisita', 'aceptarOferta', 'firmarArras', 
                  'actualizarEstado', 'solicitarReferidos', 'cargarDocumentos', 'firmarContrato', 'definirPVS',
                  'buyerPersona', 'video360', 'editarFicha', 'verCampañas', 'openHouse', 'calificarLead',
                  'enviarFeedback', 'calendarioVisitas', 'gestionarOfertas', 'contraoferta', 'rechazarOferta',
                  'lineaTiempoCierre', 'checklistTramites', 'encuestaNPS', 'exportarPDF', 'gestionarPropiedad']
                  .includes(activeModal!) && (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2">Funcionalidad en Desarrollo</h4>
                  <p className="text-gray-600 mb-6">Esta función estará disponible próximamente.</p>
                  <button onClick={closeModal} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                    Entendido
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







