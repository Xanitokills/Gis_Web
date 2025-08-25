"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LayerGroup,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import * as L from "leaflet";

type Field = { key: string; label?: string };

type Feature = {
  id?: string | number;
  geometry: { type: "Point"; coordinates: [number, number] }; // [lon, lat]
  properties: Record<string, any>;
};

type FC = { type: "FeatureCollection"; features: Feature[] };

export default function PointsLayer({
  url,
  popupFields = [],
  color = "#16a34a",
  radius = 8,
}: {
  url: string;
  popupFields?: Field[];
  color?: string;
  radius?: number;
}) {
  const map = useMap();
  const [fc, setFc] = useState<FC>({ type: "FeatureCollection", features: [] });

  // Trae GeoJSON
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

  // Ajusta el mapa a los puntos
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
    const feats = (fc?.features || []).filter(
      (f) => f?.geometry?.type === "Point" && Array.isArray(f.geometry.coordinates)
    );
    return feats.map((f, i) => {
      const [x, y] = f.geometry.coordinates; // [lon, lat]
      const center: [number, number] = [y, x];
      const props = f.properties || {};
      const html =
        popupFields.length > 0
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
        <CircleMarker
          key={String(f.id ?? i)}
          center={center}
          pathOptions={{ color, weight: 2, fillOpacity: 0.9 }}
          radius={radius}
        >
          <Popup maxWidth={360}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Popup>
        </CircleMarker>
      );
    });
  }, [fc, popupFields, color, radius]);

  if (!items.length) return null;
  return <LayerGroup>{items}</LayerGroup>;
}
