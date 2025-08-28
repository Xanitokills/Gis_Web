// app/layout.tsx
import 'leaflet/dist/leaflet.css';
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'SmartCore BI - Mapa',
  description: 'Mapa Inteligente con Leaflet + Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="h-screen">{children}</body>
    </html>
  );
}
