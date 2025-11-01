import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      title: "Dashboard Inteligente",
      description: "CRM potenciado con IA que captura y califica leads automáticamente. Visualiza tu pipeline completo y cierra más ventas.",
      icon: "�",
      color: "from-violet-500 to-purple-600"
    },
    {
      title: "Mapa Geoespacial",
      description: "Análisis de mercado en tiempo real. Identifica zonas de oportunidad, tendencias de precios y proyecta el crecimiento urbano.",
      icon: "�️",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Ecosistema Financiero",
      description: "Pre-aprobación crediticia instantánea con BBVA e Interbank. Cierra operaciones en 48 horas con transparencia total.",
      icon: "�",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const partners = [
    "BBVA", "Interbank", "BCP", "Scotiabank", 
    "Mapfre", "La Positiva", "TasaPerú"
  ];

  const stats = [
    { value: "280K+", label: "Agentes en Perú" },
    { value: "48hrs", label: "Tiempo de cierre" },
    { value: "85%", label: "Tasa de éxito" },
    { value: "$2.95M", label: "ARR proyectado" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation - Frame.io style */}
      <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">SMARTCORE</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8 text-sm">
              <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                Funciones
              </Link>
              <Link href="#ecosystem" className="text-gray-400 hover:text-white transition-colors">
                Ecosistema
              </Link>
              <Link href="#partners" className="text-gray-400 hover:text-white transition-colors">
                Aliados
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/search" className="text-gray-400 hover:text-white text-sm transition-colors hidden md:inline-block">
              Buscar Propiedades
            </Link>
            <button className="bg-white text-black px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all">
              Solicitar Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Frame.io inspired */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              <span className="text-gray-300">Alianzas con BBVA · Interbank · BCP · Scotiabank</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">
              <span className="block">El ecosistema</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                inmobiliario integral
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Conecta agentes, clientes, bancos y servicios en una sola plataforma. 
              Cierra ventas en 48 horas con transparencia total.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link href="/agent-dashboard" className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2">
                <span>Dashboard Agente</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/map" className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/20 inline-flex items-center justify-center gap-2">
                <span>Mapa Inteligente</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards - Highlighted CTAs */}
      <div id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Todo lo que necesitas para
              <span className="block text-gray-500">vender más rápido</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Dashboard Agente - Featured Large */}
            <Link href="/agent-dashboard" className="group relative bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-white/10 rounded-3xl p-10 hover:border-emerald-500/50 transition-all overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 bg-emerald-500 rounded-full">
                DESTACADO
              </div>
              <div className="relative z-10">
                <div className="text-6xl mb-6">👨‍💼</div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                  Dashboard Agente
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  CRM potenciado con IA que captura y califica leads automáticamente. 
                  Visualiza tu pipeline completo y cierra más ventas en menos tiempo.
                </p>
                <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-3 transition-all">
                  <span>Acceder ahora</span>
                  <span>→</span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            </Link>

            {/* Mapa Inteligente - Featured Large */}
            <Link href="/map" className="group relative bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-white/10 rounded-3xl p-10 hover:border-cyan-500/50 transition-all overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 bg-cyan-500 rounded-full">
                DESTACADO
              </div>
              <div className="relative z-10">
                <div className="text-6xl mb-6">🗺️</div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                  Mapa Inteligente
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  Análisis geoespacial en tiempo real. Identifica zonas de oportunidad, 
                  tendencias de precios y proyecta el crecimiento urbano con datos precisos.
                </p>
                <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all">
                  <span>Explorar mapa</span>
                  <span>→</span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            </Link>
          </div>

          {/* Additional Feature */}
          <div className="relative bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-white/10 rounded-3xl p-10 hover:border-emerald-500/50 transition-all overflow-hidden group">
            <div className="relative z-10">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                Ecosistema Financiero Integrado
              </h3>
              <p className="text-gray-400 text-lg max-w-3xl">
                Pre-aprobación crediticia instantánea con BBVA, Interbank y BCP. 
                Cierra operaciones en 48 horas con total transparencia. Tu cliente obtiene financiamiento mientras tú cierras la venta.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div id="partners" className="py-20 px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Respaldado por</p>
            <h2 className="text-3xl font-bold mb-4">Las marcas más confiables del Perú</h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner, index) => (
              <div key={index} className="text-2xl font-bold text-gray-600 hover:text-white transition-colors cursor-pointer">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ecosystem Section */}
      <div id="ecosystem" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Un ecosistema diseñado para
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mt-2">
              eliminar la fricción
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Transparencia, datos reales y experiencia humana. 
            Donde el cliente, el agente, el banco y los servicios trabajan bajo una misma regla.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center text-3xl border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agent-dashboard" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">
              Comenzar ahora
            </Link>
            <Link href="/search" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20">
              Ver demo
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-lg font-bold">SMARTCORE</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs">
                El ecosistema inmobiliario integral que transforma la industria peruana.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Dashboard</li>
                <li className="hover:text-white cursor-pointer transition-colors">Mapa</li>
                <li className="hover:text-white cursor-pointer transition-colors">CRM</li>
                <li className="hover:text-white cursor-pointer transition-colors">Analytics</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Aliados</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">BBVA</li>
                <li className="hover:text-white cursor-pointer transition-colors">Interbank</li>
                <li className="hover:text-white cursor-pointer transition-colors">TasaPerú</li>
                <li className="hover:text-white cursor-pointer transition-colors">Mapfre</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Acerca de</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contacto</li>
                <li className="hover:text-white cursor-pointer transition-colors">Términos</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacidad</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025 SMARTCORE BI. Una visión de Franklin Vásquez.</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
              <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
