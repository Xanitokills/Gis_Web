"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleMarker, LayerGroup, Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";

type Field = { key: string; label?: string };

type Feature = {
  id?: string | number;
  geometry: { type: "Point"; coordinates: [number, number] }; // [lng,lat]
  properties: Record<string, any>;
};

type FC = { type: "FeatureCollection"; features: Feature[] };

type SimplePoint = { lat: number; lng: number; [k: string]: any };

type Props = {
  url: string;
  popupFields?: Field[];
  /** Usa Marker con icono o CircleMarker (mejor rendimiento con muchos puntos) */
  renderAs?: "marker" | "circle";
  /** Ícono personalizado (sólo si renderAs === "marker") */
  iconUrl?: string;
  /** Ajustar mapa a la extensión de los puntos */
  autoFit?: boolean;
  /** Zoom máximo cuando hace fit */
  maxZoomOnFit?: number;
  /** Padding del fitBounds */
  padding?: [number, number];
  /** Estilo del círculo si renderAs === "circle" */
  circleStyle?: L.CircleMarkerOptions;
};

const DEFAULT_ICON_URL = "/icons/marker-orange.png";

function makeIcon(iconUrl?: string) {
  return new L.Icon({
    iconUrl: iconUrl || DEFAULT_ICON_URL,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
    // Opcionales si tienes retina/shadow:
    // iconRetinaUrl: "/icons/marker-orange@2x.png",
    // shadowUrl: "/icons/marker-shadow.png",
  });
}

function isValidCoord(x: any, y: any) {
  return (
    typeof x === "number" &&
    typeof y === "number" &&
    Number.isFinite(x) &&
    Number.isFinite(y) &&
    Math.abs(y) <= 90 &&
    Math.abs(x) <= 180
  );
}

/** Normaliza la respuesta a Feature[] */
function toFeatures(json: any): Feature[] {
  if (!json) return [];
  // GeoJSON
  if (json.type === "FeatureCollection" && Array.isArray(json.features)) {
    return json.features
      .filter((f: any) => f?.geometry?.type === "Point")
      .map((f: any) => ({
        id: f.id,
        geometry: {
          type: "Point",
          coordinates: [
            Number(f.geometry.coordinates?.[0]),
            Number(f.geometry.coordinates?.[1]),
          ],
        },
        properties: f.properties ?? {},
      }))
      .filter((f: Feature) =>
        isValidCoord(f.geometry.coordinates[0], f.geometry.coordinates[1])
      );
  }
  // Arreglo simple [{lat,lng,...}]
  if (Array.isArray(json)) {
    return json
      .filter((r: any) => isValidCoord(Number(r?.lng), Number(r?.lat)))
      .map((r: SimplePoint, idx: number) => ({
        id: (r as any).id ?? idx,
        geometry: { type: "Point", coordinates: [Number(r.lng), Number(r.lat)] },
        properties: { ...r },
      }));
  }
  return [];
}

export default function PointsLayer({
  url,
  popupFields = [],
  renderAs = "marker",
  iconUrl,
  autoFit = true,
  maxZoomOnFit = 15,
  padding = [24, 24],
  circleStyle,
}: Props) {
  const map = useMap();
  const [features, setFeatures] = useState<Feature[]>([]);
  const iconMemo = useMemo(() => makeIcon(iconUrl), [iconUrl]);

  // Fetch con AbortController y no-store
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const feats = toFeatures(json);
        // console.log("[PointsLayer] cargados:", feats.length);
        setFeatures(feats);
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          console.warn("PointsLayer fetch error:", e?.message || e);
        }
        setFeatures([]);
      }
    })();
    return () => ctrl.abort();
  }, [url]);

  // Fit bounds opcional
  useEffect(() => {
    if (!autoFit || features.length === 0) return;
    const latlngs = features.map((f) => {
      const [x, y] = f.geometry.coordinates;
      return L.latLng(y, x);
    });
    const b = L.latLngBounds(latlngs);
    if (b.isValid()) {
      map.fitBounds(b, { maxZoom: maxZoomOnFit, padding });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFit, features]);

  const items = useMemo(() => {
    if (features.length === 0) return null;

    return features.map((f, i) => {
      const [lng, lat] = f.geometry.coordinates; // [lng,lat]
      const props = f.properties || {};

      // Construye contenido del popup
      const html =
        popupFields.length > 0
          ? popupFields
              .map(({ key, label }) => {
                const v = props[key];
                if (key === "url_original" && typeof v === "string") {
                  // Enlaces abren en nueva pestaña
                  return `<div><b>${label || key}:</b> <a href="${v}" target="_blank" rel="noopener noreferrer">Abrir aviso</a></div>`;
                }
                return `<div><b>${label || key}:</b> ${v ?? "-"}</div>`;
              })
              .join("")
          : `<div><b>${props.titulo ?? "Elemento"}</b></div>`;

      if (renderAs === "circle") {
        return (
          <CircleMarker
            key={f.id ?? i}
            center={[lat, lng]}
            radius={5}
            pathOptions={{
              weight: 1,
              fillOpacity: 0.85,
              // color / fillColor por defecto; puedes pasar circleStyle para personalizar
              ...(circleStyle || {}),
            }}
          >
            <Popup maxWidth={360}>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </Popup>
          </CircleMarker>
        );
      }

      // Marker con icono
      return (
        <Marker key={f.id ?? i} position={[lat, lng]} icon={iconMemo}>
          <Popup maxWidth={360}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Popup>
        </Marker>
      );
    });
  }, [features, popupFields, renderAs, circleStyle, iconMemo]);

  if (!items) return null;
  return <LayerGroup>{items}</LayerGroup>;
}
