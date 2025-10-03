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

// Componente interno para manejar múltiples propiedades en un punto
function MultiPropertyPopup({ features, popupFields }: { features: Feature[], popupFields: Field[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalFeatures = features.length;

  if (totalFeatures === 0) return null;

  const currentFeature = features[currentIndex];
  const props = currentFeature.properties || {};

  const nextProperty = () => {
    setCurrentIndex((prev) => (prev + 1) % totalFeatures);
  };

  const prevProperty = () => {
    setCurrentIndex((prev) => (prev - 1 + totalFeatures) % totalFeatures);
  };

  // Construir contenido de la propiedad actual
  const propertyContent = popupFields.length > 0
    ? popupFields.map(({ key, label }) => {
        const v = props[key];
        if (key === "url_original" && typeof v === "string") {
          return `<div><b>${label || key}:</b> <a href="${v}" target="_blank" rel="noopener noreferrer">Abrir aviso</a></div>`;
        }
        return `<div><b>${label || key}:</b> ${v ?? "-"}</div>`;
      }).join("")
    : `<div><b>${props.titulo ?? "Elemento"}</b></div>`;

  return (
    <div style={{ minWidth: '280px', maxWidth: '320px' }}>
      {/* Header con contador y navegación */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '10px',
        padding: '8px',
        backgroundColor: '#f3f4f6',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        <button 
          onClick={prevProperty}
          disabled={totalFeatures <= 1}
          style={{
            background: totalFeatures <= 1 ? '#e5e7eb' : '#3b82f6',
            color: totalFeatures <= 1 ? '#9ca3af' : 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: totalFeatures <= 1 ? 'not-allowed' : 'pointer',
            fontSize: '12px'
          }}
        >
          ◀
        </button>
        
        <span style={{ color: '#374151' }}>
          {currentIndex + 1} de {totalFeatures} propiedades
        </span>
        
        <button 
          onClick={nextProperty}
          disabled={totalFeatures <= 1}
          style={{
            background: totalFeatures <= 1 ? '#e5e7eb' : '#3b82f6',
            color: totalFeatures <= 1 ? '#9ca3af' : 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: totalFeatures <= 1 ? 'not-allowed' : 'pointer',
            fontSize: '12px'
          }}
        >
          ▶
        </button>
      </div>

      {/* Contenido de la propiedad actual */}
      <div style={{ 
        padding: '8px',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        backgroundColor: 'white'
      }}>
        {/* Precio destacado */}
        <div style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          color: '#059669',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          {props.moneda || 'PEN'} {props.precio?.toLocaleString() || 'N/A'}
        </div>
        
        {/* Título */}
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px',
          lineHeight: '1.4'
        }}>
          {props.titulo?.substring(0, 80) || 'Sin título'}...
        </div>
        
        {/* Detalles */}
        <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
          <div><b>Tipo:</b> {props.tipo_propiedad || 'N/A'}</div>
          <div><b>Operación:</b> {props.tipo_operacion || 'N/A'}</div>
          <div><b>Distrito:</b> {props.distrito || 'N/A'}</div>
          {props.area_total_m2 && <div><b>Área:</b> {props.area_total_m2} m²</div>}
          {props.habitaciones && <div><b>Habitaciones:</b> {props.habitaciones}</div>}
          {props.banos && <div><b>Baños:</b> {props.banos}</div>}
          <div><b>Fuente:</b> {props.fuente || 'N/A'}</div>
          {props.url_original && (
            <div style={{ marginTop: '8px' }}>
              <a 
                href={props.url_original} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#3b82f6', 
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                🔗 Ver aviso original
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Indicadores de páginas */}
      {totalFeatures > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '4px',
          marginTop: '8px'
        }}>
          {Array.from({ length: totalFeatures }, (_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: i === currentIndex ? '#3b82f6' : '#d1d5db',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
  /** Callback para reportar metadatos del mapa */
  onMetadataUpdate?: (metadata: any) => void;
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
  colorBy = 'fuente', // Por defecto segmentar por fuente
  onMetadataUpdate
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

  // Obtener el tamaño del marcador según el zoom - aumentado para mejor visibilidad
  const getMarkerSize = () => {
    if (currentZoom < 12) return 8;  // aumentado más para mejor visibilidad
    if (currentZoom < 14) return 12; // aumentado más
    if (currentZoom < 16) return 16; // aumentado más  
    return 20; // aumentado más
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
        console.log("📍 PointsLayer - Features loaded:", feats.length);
        console.log("📍 PointsLayer - Feature coordinates:", feats.map(f => ({
          id: f.id,
          coords: f.geometry.coordinates,
          title: f.properties.titulo?.substring(0, 50)
        })));
        setFeatures(feats);
        
        // Reportar metadatos si está disponible
        if (onMetadataUpdate && json.metadata) {
          console.log("📊 PointsLayer - Metadata from API:", json.metadata);
          onMetadataUpdate(json.metadata);
        }
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          console.warn("PointsLayer fetch error:", e?.message || e);
        }
        setFeatures([]);
        if (onMetadataUpdate) {
          onMetadataUpdate({ totalFeatures: 0, error: e?.message || "Error cargando datos" });
        }
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

    // Agrupar features por coordenadas para manejar puntos superpuestos
    const coordinateGroups = new Map<string, Feature[]>();
    
    features.forEach(feature => {
      const [lng, lat] = feature.geometry.coordinates;
      // Usar coordenadas redondeadas para agrupar puntos muy cercanos (6 decimales = ~1 metro)
      const key = `${lat.toFixed(6)},${lng.toFixed(6)}`;
      
      if (!coordinateGroups.has(key)) {
        coordinateGroups.set(key, []);
      }
      coordinateGroups.get(key)!.push(feature);
    });

    console.log("🗂️ PointsLayer - Coordinate groups:", Array.from(coordinateGroups.entries()).map(([key, groupFeatures]) => ({
      coordinates: key,
      count: groupFeatures.length,
      prices: groupFeatures.map(f => f.properties.precio),
      titles: groupFeatures.map(f => f.properties.titulo?.substring(0, 30))
    })));

    return Array.from(coordinateGroups.entries()).map(([coordKey, groupFeatures], groupIndex) => {
      const [lat, lng] = coordKey.split(',').map(Number);
      const count = groupFeatures.length;

      // Obtener texto del tooltip
      const tooltipText = count > 1 
        ? `${count} propiedades` 
        : getTooltipText(groupFeatures[0].properties);

      if (renderAs === "circle") {
        // Para el color, usar la primera propiedad del grupo
        const mainFeature = groupFeatures[0];
        const colorValue = mainFeature.properties[colorBy] || '';
        const dynamicColor = getColorForValue(colorBy, colorValue);
        let markerSize = getMarkerSize();
        
        // Aumentar el tamaño si hay múltiples propiedades
        if (count > 1) {
          markerSize = Math.min(markerSize + (count * 3), 25); // Máximo 25px
        }
        
        return (
          <CircleMarker
            key={`group-${groupIndex}`}
            center={[lat, lng]}
            radius={markerSize}
            pathOptions={{
              weight: count > 1 ? 4 : 3, // Borde más grueso para clusters
              fillOpacity: 0.9,
              color: count > 1 ? '#dc2626' : '#ffffff', // Rojo para clusters, blanco para individuales
              fillColor: count > 1 ? '#dc2626' : dynamicColor,
              // Permitir override con circleStyle
              ...(circleStyle || {}),
            }}
          >
            {/* Tooltip con información del cluster */}
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
            
            {/* Mostrar número si hay múltiples propiedades */}
            {count > 1 && (
              <Tooltip
                permanent={true}
                direction="center"
                offset={[0, 0]}
                className="cluster-count-tooltip"
                opacity={1}
              >
                <span style={{ 
                  color: 'white', 
                  fontWeight: 'bold', 
                  fontSize: currentZoom >= 14 ? '14px' : '12px',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.8)'
                }}>
                  {count}
                </span>
              </Tooltip>
            )}
            
            {/* Popup con carrusel de propiedades */}
            <Popup maxWidth={350} closeButton={true}>
              <MultiPropertyPopup features={groupFeatures} popupFields={popupFields} />
            </Popup>
          </CircleMarker>
        );
      }

      // Marker con icono
      return (
        <Marker key={`marker-group-${groupIndex}`} position={[lat, lng]} icon={iconMemo}>
          {/* Tooltip con información del cluster */}
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
          
          {/* Popup con carrusel de propiedades */}
          <Popup maxWidth={350} closeButton={true}>
            <MultiPropertyPopup features={groupFeatures} popupFields={popupFields} />
          </Popup>
        </Marker>
      );
    });
  }, [features, popupFields, renderAs, iconMemo, currentZoom, colorBy, circleStyle, getTooltipText, getMarkerSize, getColorForValue]);

  if (!items) return null;
  return <LayerGroup>{items}</LayerGroup>;
}
