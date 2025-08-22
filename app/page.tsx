import Link from "next/link";


export default function HomePage() {
  const propertyTypes = [
    { id: "clients", icon: "👥", title: "Clientes", desc: "Gestión de clientes" },
    { id: "properties", icon: "🏠", title: "Propiedades", desc: "Catálogo inmobiliario" },
    { id: "leads", icon: "📈", title: "Leads", desc: "Seguimiento de prospectos" },
    { id: "activities", icon: "📋", title: "Actividades", desc: "Tareas y eventos" },
    { id: "map", icon: "🗺️", title: "Mapa", desc: "Ubicaciones" }
  ];

  const companies = [
    "Inmobiliaria Del Sol", "Propiedades Lima", "Real Estate Pro", "Casas & Más",
    "Urban Properties", "Lima Inversiones", "Hogar Ideal", "Metropolitan"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Lima CRM</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <span>Clientes</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <span>Propiedades</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <span>Reportes</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 px-4 py-2">
              Iniciar sesión
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Solicitar Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            ENCUENTRA EL ESPACIO
            <br />
            <span className="text-orange-400">IDEAL PARA TU NEGOCIO</span>
          </h1>
          
          {/* Search Card */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              {/* Tabs */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-full p-1 inline-flex">
                  <button className="bg-slate-800 text-white px-6 py-2 rounded-full font-medium">
                    Gestionar
                  </button>
                  <button className="text-gray-600 px-6 py-2 rounded-full font-medium hover:text-gray-900">
                    Analizar
                  </button>
                  <button className="text-gray-600 px-6 py-2 rounded-full font-medium hover:text-gray-900">
                    Reportar
                  </button>
                </div>
              </div>
              
              {/* Property Types */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                {propertyTypes.map((type) => (
                  <Link
                    key={type.id}
                    href={`/${type.id}`}
                    className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
                      <span className="text-2xl">{type.icon}</span>
                    </div>
                    <span className="font-semibold text-gray-900 mb-1">{type.title}</span>
                    <span className="text-sm text-gray-600 text-center">{type.desc}</span>
                  </Link>
                ))}
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Busca por distrito, cliente o tipo de propiedad"
                  className="w-full pl-16 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-0 outline-none"
                />
                <button className="absolute inset-y-0 right-0 pr-6 flex items-center">
                  <div className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-orange-500">Conectamos espacios,</span> impulsamos negocios
            </h2>
            <p className="text-xl text-gray-600">Inmobiliarias que encontraron su espacio ideal:</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-center">
                <div className="h-16 flex items-center justify-center">
                  <span className="text-gray-400 font-semibold text-lg">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para revolucionar tu negocio inmobiliario?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Únete a cientos de profesionales que ya optimizan su gestión con Lima CRM
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
            Comenzar ahora - Es gratis
          </button>
        </div>
      </section>
    </div>
  );
}