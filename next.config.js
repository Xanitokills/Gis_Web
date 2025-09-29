/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Habilitar el directorio app
    appDir: true,
  },
  // Configurar webpack para el alias @
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
};

module.exports = nextConfig;