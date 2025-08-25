"use client";

import { useEffect, useState } from "react";

let RL: any = null;

export default function Map({
  center = [-12.0464, -77.0428],
  zoom = 9,
  children,
}: {
  center?: [number, number];
  zoom?: number;
  children?: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (!RL) {
        RL = {
          MapContainer: (await import("react-leaflet")).MapContainer,
          TileLayer: (await import("react-leaflet")).TileLayer,
        };
        // @ts-ignore
        await import("leaflet/dist/leaflet.css");
      }
      setReady(true);
    })();
  }, []);

  if (!ready) return <div className="card">Cargando mapa…</div>;

  const { MapContainer, TileLayer } = RL;
  return (
    <div className="overflow-hidden rounded-2xl border shadow-sm">
      <MapContainer center={center as any} zoom={zoom} style={{ height: 560 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {children}
      </MapContainer>
    </div>
  );
}
