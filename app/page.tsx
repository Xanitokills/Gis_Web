import Link from "next/link";

export default function HomePage() {
  const userRoles = [
    { id: "client", icon: "👤", title: "Dashboard Cliente", desc: "Mi portal personal", href: "/client-dashboard" },
    { id: "search", icon: "🔍", title: "Buscar Propiedades", desc: "Portal de búsqueda inteligente", href: "/search" },
    { id: "agent", icon: "👨‍💼", title: "Dashboard Agente", desc: "CRM + Smart Capture", href: "/agent-dashboard" },
    { id: "jefe", icon: "👔", title: "Dashboard Jefe", desc: "Gestión de equipos", href: "/jefe-dashboard" },
    { id: "super", icon: "⚡", title: "Super Usuario", desc: "Control del ecosistema", href: "/super-dashboard" },
    { id: "map", icon: "🗺️", title: "Mapa Inteligente", desc: "Análisis geográfico", href: "/map" }
  ];

  const ecosystemServices = [
    { icon: "🏦", title: "Crédito Pre-Aprobado", desc: "BBVA & Interbank" },
    { icon: "💎", title: "Tasación Profesional", desc: "TasaPerú - 2 horas" },
    { icon: "🚚", title: "Mudanza Confiable", desc: "Mudanzas Rápida" },
    { icon: "🏠", title: "Seguro de Hogar", desc: "Mapfre & La Positiva" },
    { icon: "📜", title: "Notaría Digital", desc: "Firma electrónica" },
    { icon: "💰", title: "SMARTCORE Pay", desc: "Billetera integrada" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SMARTCORE BI</span>
          </div>
          
          <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-full font-medium transition-colors">
            Solicitar Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
           {/*  <span className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-sm font-medium mb-4">
              La Realización de la Visión de Franklin Vásquez
            </span> */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">SMARTCORE BI</span>
              <span className="block text-slate-700 text-3xl md:text-4xl mt-2">
                El Ecosistema Inmobiliario Integral
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Hace más de cinco años, Franklin Vásquez soñó con una herramienta que no solo ayudara a vender casas... 
              sino que sanera la desconfianza en el mercado inmobiliario peruano. Hoy, SMARTCORE BI no solo cumple ese sueño. 
              Lo expande.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl max-w-2xl mx-auto shadow-lg border border-slate-200">
              <p className="text-lg text-gray-800 font-medium">
                No es un software. Es un ecosistema donde el cliente, el agente, el banco, el tasador, 
                la mudanza y el Estado trabajan juntos bajo una misma regla: 
                <span className="text-slate-700 font-bold"> transparencia, datos reales y experiencia humana.</span>
              </p>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Accede a tu Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {userRoles.map((role) => (
                <Link key={role.id} href={role.href}>
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="text-center">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {role.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h3>
                      <p className="text-gray-600 text-sm">{role.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Services */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Servicios del Ecosistema</h2>
            <p className="text-xl text-gray-600">Todo lo que necesitas en un solo lugar</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystemServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <button className="w-full py-2 px-4 rounded-lg font-semibold transition-colors bg-slate-700 hover:bg-slate-800 text-white">
                    Solicitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">El Impacto del Ecosistema</h2>
            <p className="text-xl text-gray-600">Datos reales de nuestro MVP</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-700 mb-2">280,000+</div>
              <div className="text-gray-600">Agentes en Perú</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-600 mb-2">85%</div>
              <div className="text-gray-600">Margen de Rentabilidad</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">90 días</div>
              <div className="text-gray-600">Lanzamiento MVP</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-700 mb-2">$2.95M</div>
              <div className="text-gray-600">ARR Proyectado</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Únete al Futuro del Mercado Inmobiliario
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            SMARTCORE BI: Donde la visión de Franklin Vásquez se hace realidad para transformar 
            la industria inmobiliaria peruana
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="bg-white text-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
              Buscar Propiedades
            </Link>
            <Link href="/agent-dashboard" className="bg-slate-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-500 transition-colors shadow-lg border-2 border-slate-400">
              Soy Agente
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-lg font-bold">SMARTCORE BI</span>
              </div>
              <p className="text-gray-400 text-sm">
                El ecosistema inmobiliario integral que Franklin Vásquez soñó hace más de 5 años.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Dashboard Cliente</li>
                <li>Portal Agentes</li>
                <li>CRM Empresarial</li>
                <li>Super Admin</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Crédito Pre-Aprobado</li>
                <li>Tasación Profesional</li>
                <li>Mudanza Confiable</li>
                <li>SMARTCORE Pay</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Lima, Perú</li>
                <li>info@smartcore.bi</li>
                <li>+51 999 123 456</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 SMARTCORE BI. Todos los derechos reservados. | 
              Una realización de la visión de Franklin Vásquez
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
