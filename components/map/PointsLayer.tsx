"use client";

import { useEffect, useMemo, useState } from "react";
import { LayerGroup, Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";

type Field = { key: string; label?: string };

type Feature = {
  id?: string | number;
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: Record<string, any>;
};

type FC = { type: "FeatureCollection"; features: Feature[] };

// 👉 Definir el ícono personalizado
const orangeIcon = new L.Icon({
  iconUrl: "/icons/marker-orange.png", // coloca aquí tu imagen (ej: en public/icons/)
  iconSize: [32, 32], // tamaño
  iconAnchor: [16, 32], // el “pico” del pin
  popupAnchor: [0, -32], // donde abre el popup
});

export default function PointsLayer({
  url,
  popupFields = [],
}: {
  url: string;
  popupFields?: Field[];
}) {
  const map = useMap();
  const [fc, setFc] = useState<FC>({ type: "FeatureCollection", features: [] });

  // fetch
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        const gj = (res.ok ? await res.json() : { type: "FeatureCollection", features: [] }) as FC;
        console.log("[Urbania] features:", gj?.features?.length || 0);
        setFc(gj || { type: "FeatureCollection", features: [] });
      } catch (e) {
        console.warn("Urbania fetch error", e);
        setFc({ type: "FeatureCollection", features: [] });
      }
    })();
  }, [url]);

  // fitBounds
  useEffect(() => {
    if (!fc?.features?.length) return;
    const latlngs = fc.features
      .map((f) => f?.geometry?.coordinates)
      .filter(Array.isArray)
      .map(([x, y]) => L.latLng(y, x));
    const b = L.latLngBounds(latlngs);
    if (b.isValid()) map.fitBounds(b, { maxZoom: 15, padding: [24, 24] });
  }, [fc, map]);

  const items = useMemo(() => {
    return (fc?.features || [])
      .filter((f) => f?.geometry?.type === "Point" && Array.isArray(f.geometry.coordinates))
      .map((f, i) => {
        const [x, y] = f.geometry.coordinates; // [lon,lat]
        const props = f.properties || {};
        const html = popupFields.length
          ? popupFields
              .map(({ key, label }) => {
                const v = props[key];
                const text =
                  key === "url_original" && typeof v === "string"
                    ? `<a href="${v}" target="_blank" rel="noopener">Abrir aviso</a>`
                    : (v ?? "-");
                return `<div><b>${label || key}</b>: ${text}</div>`;
              })
              .join("")
          : `<div><b>${props.titulo ?? "Propiedad"}</b></div>`;

        return (
          <Marker key={i} position={[y, x]} icon={orangeIcon}>
            <Popup maxWidth={360}>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </Popup>
          </Marker>
        );
      });
  }, [fc, popupFields]);

  if (!items.length) return null;
  return <LayerGroup>{items}</LayerGroup>;
}
