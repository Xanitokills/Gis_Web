"use client";

import { useEffect, useState } from "react";

let RL: any = null;

export default function Map({ center = [-12.0464, -77.0428], zoom = 11, markers = [] as Array<{lat:number, lng:number, title?:string}> }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (!RL) {
        RL = {
          MapContainer: (await import("react-leaflet")).MapContainer,
          TileLayer: (await import("react-leaflet")).TileLayer,
          Marker: (await import("react-leaflet")).Marker,
          Popup: (await import("react-leaflet")).Popup,
        };
        // Ensure Leaflet CSS is present (works if added globally via CDN or import)
        await import("leaflet/dist/leaflet.css");
      }
      setReady(true);
    })();
  }, []);

  if (!ready) return <div className="card">Cargando mapa… (instala <code>leaflet</code> y <code>react-leaflet</code>)</div>;

  const { MapContainer, TileLayer, Marker, Popup } = RL;
  return (
    <div className="overflow-hidden rounded-2xl border shadow-sm">
      <MapContainer center={center as any} zoom={zoom} style={{ height: 520 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng] as any}>
            {m.title && <Popup>{m.title}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
