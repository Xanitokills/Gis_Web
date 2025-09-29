"use client";

import { useEffect, useState } from "react";
import { GeoJSON, LayerGroup } from "react-leaflet";
import * as L from "leaflet";

type PolygonLayerProps = {
  url: string;
  style?: L.PathOptions;
  onEachFeature?: (feature: any, layer: L.Layer) => void;
  visible?: boolean;
  popupContent?: (properties: any) => string;
};

export default function PolygonLayer({ 
  url, 
  style = {
    color: '#3388ff',
    weight: 2,
    opacity: 1,
    fillColor: '#3388ff',
    fillOpacity: 0.2
  }, 
  onEachFeature,
  visible = true,
  popupContent
}: PolygonLayerProps) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    if (!visible) {
      setGeoData(null);
      return;
    }

    const ctrl = new AbortController();
    
    (async () => {
      try {
        const res = await fetch(url, { 
          cache: "no-store", 
          signal: ctrl.signal 
        });
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const json = await res.json();
        setGeoData(json);
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          console.warn("PolygonLayer fetch error:", e?.message || e);
        }
        setGeoData(null);
      }
    })();

    return () => ctrl.abort();
  }, [url, visible]);

  const handleEachFeature = (feature: any, layer: L.Layer) => {
    // Agregar popup si se proporciona función de contenido
    if (popupContent && feature.properties) {
      const content = popupContent(feature.properties);
      layer.bindPopup(content);
    }

    // Llamar función personalizada si existe
    if (onEachFeature) {
      onEachFeature(feature, layer);
    }
  };

  if (!visible || !geoData) return null;

  return (
    <LayerGroup>
      <GeoJSON
        data={geoData}
        style={style}
        onEachFeature={handleEachFeature}
      />
    </LayerGroup>
  );
}