"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleMarker, LayerGroup, Marker, Popup, useMap, Tooltip } from "react-leaflet";
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
  /** Campo para segmentación por color */
  colorBy?: 'fuente' | 'tipo_operacion' | 'tipo_propiedad';
};

const DEFAULT_ICON_URL = "/icons/marker-orange.png";

// Colores para segmentación
const COLOR_SCHEMES = {
  fuente: {
    'urbania.pe': '#f97316', // orange-500
    'default': '#6b7280' // gray-500
  },
  tipo_operacion: {
    'venta': '#10b981', // emerald-500
    'alquiler': '#3b82f6', // blue-500
    'alquilar': '#3b82f6', // blue-500 (alias)
    'default': '#6b7280' // gray-500
  },
  tipo_propiedad: {
    'departamento': '#8b5cf6', // violet-500
    'casa': '#f59e0b', // amber-500
    'oficina': '#06b6d4', // cyan-500
    'terreno': '#84cc16', // lime-500
    'apartment': '#8b5cf6', // violet-500 (alias)
    'default': '#6b7280' // gray-500
  }
};

function getColorForValue(colorBy: string, value: string): string {
  if (!colorBy || !value) return COLOR_SCHEMES.fuente.default;
  
  const scheme = COLOR_SCHEMES[colorBy as keyof typeof COLOR_SCHEMES];
  if (!scheme) return COLOR_SCHEMES.fuente.default;
  
  const normalizedValue = value.toLowerCase().trim();
  return scheme[normalizedValue as keyof typeof scheme] || scheme.default;
}

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
  renderAs = "circle",
  iconUrl,
  autoFit = false,
  maxZoomOnFit = 15,
  padding = [20, 20],
  circleStyle,
  colorBy = 'fuente' // Por defecto segmentar por fuente
}: Props) {
  const map = useMap();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());
  const iconMemo = useMemo(() => makeIcon(iconUrl), [iconUrl]);

  // Escuchar cambios de zoom
  useEffect(() => {
    const handleZoom = () => {
      setCurrentZoom(map.getZoom());
    };
    
    map.on('zoom', handleZoom);
    return () => {
      map.off('zoom', handleZoom);
    };
  }, [map]);

  // Función para formatear precio
  const formatPrice = (price: number, showPerM2: boolean = false, area?: number) => {
    if (!price || price <= 0) return '';
    
    const formatNumber = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 100000) return `${(num / 1000).toFixed(0)}K`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toLocaleString();
    };

    if (showPerM2 && area && area > 0) {
      const pricePerM2 = price / area;
      return `S/${formatNumber(pricePerM2)}/m²`;
    }
    
    return `S/${formatNumber(price)}`;
  };

  // Función para obtener el texto del tooltip según el zoom
  const getTooltipText = (props: any) => {
    const { precio, area_construida_m2, area_total_m2 } = props;
    
    if (currentZoom < 13) {
      // Zoom lejano: no mostrar nada
      return null;
    } else if (currentZoom < 15) {
      // Zoom medio: mostrar precio total
      return formatPrice(precio);
    } else {
      // Zoom cercano: mostrar precio por m² si hay área disponible
      const area = area_construida_m2 || area_total_m2;
      if (area && area > 0) {
        return formatPrice(precio, true, area);
      }
      return formatPrice(precio);
    }
  };

  // Obtener el tamaño del marcador según el zoom
  const getMarkerSize = () => {
    if (currentZoom < 12) return 3;
    if (currentZoom < 14) return 4;
    if (currentZoom < 16) return 5;
    return 6;
  };

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

      // Construye contenido del popup (detalles completos)
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

      // Obtener texto del tooltip según zoom
      const tooltipText = getTooltipText(props);

      if (renderAs === "circle") {
        // Obtener color dinámico basado en el campo de segmentación
        const colorValue = props[colorBy] || '';
        const dynamicColor = getColorForValue(colorBy, colorValue);
        const markerSize = getMarkerSize();
        
        return (
          <CircleMarker
            key={f.id ?? i}
            center={[lat, lng]}
            radius={markerSize}
            pathOptions={{
              weight: 1.5,
              fillOpacity: 0.8,
              color: dynamicColor,
              fillColor: dynamicColor,
              // Permitir override con circleStyle
              ...(circleStyle || {}),
            }}
          >
            {/* Tooltip con precio - solo se muestra cuando hay texto y zoom suficiente */}
            {tooltipText && (
              <Tooltip
                permanent={currentZoom >= 13}
                direction="top"
                offset={[0, -10]}
                className="price-tooltip"
                opacity={1}
              >
                <span>{tooltipText}</span>
              </Tooltip>
            )}
            
            {/* Popup con detalles completos - se abre al hacer click */}
            <Popup maxWidth={360} closeButton={true}>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </Popup>
          </CircleMarker>
        );
      }

      // Marker con icono
      return (
        <Marker key={f.id ?? i} position={[lat, lng]} icon={iconMemo}>
          {/* Tooltip con precio para markers también */}
          {tooltipText && (
            <Tooltip
              permanent={currentZoom >= 13}
              direction="top"
              offset={[0, -25]}
              className="price-tooltip"
              opacity={1}
            >
              <span>{tooltipText}</span>
            </Tooltip>
          )}
          
          <Popup maxWidth={360} closeButton={true}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Popup>
        </Marker>
      );
    });
  }, [features, popupFields, renderAs, circleStyle, iconMemo, colorBy, currentZoom, getTooltipText, getMarkerSize]);

  if (!items) return null;
  return <LayerGroup>{items}</LayerGroup>;
}
