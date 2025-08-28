// components/map/Map.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

// Carga sin SSR los componentes base de react-leaflet
const MapContainer = dynamic(
  async () => (await import("react-leaflet")).MapContainer,
  { ssr: false }
);
const TileLayer = dynamic(
  async () => (await import("react-leaflet")).TileLayer,
  { ssr: false }
);

type Props = {
  center?: [number, number];
  zoom?: number;
  children?: React.ReactNode;
  className?: string;
};

export default function Map({
  center = [-12.0464, -77.0428],
  zoom = 9,
  children,
  className = "",
}: Props) {
  return (
    <div className={`overflow-hidden rounded-2xl border shadow-sm ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {children}
      </MapContainer>
    </div>
  );
}
