"use client";

import { useState, useEffect } from "react";
import { LayersControl } from "react-leaflet";
import PointsLayer from "./PointsLayer";
import PolygonLayer from "./PolygonLayer";

type Props = {
  propertyFilters: string;
  colorBy: 'fuente' | 'tipo_operacion' | 'tipo_propiedad';
  onMetadataUpdate?: (metadata: any) => void;
};

export default function MapLayers({ propertyFilters, colorBy, onMetadataUpdate }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // No renderizar en el servidor
  }

  return (
    <LayersControl position="topright">
      {/* Capa principal: Propiedades - Siempre visible y activa por defecto */}
      <LayersControl.Overlay name="🏢 Propiedades" checked>
        <PointsLayer
          url={propertyFilters}
          colorBy={colorBy}
          onMetadataUpdate={onMetadataUpdate}
          popupFields={[
            { key: "titulo", label: "Título" },
            { key: "precio", label: "Precio" },
            { key: "moneda", label: "Moneda" },
            { key: "distrito", label: "Distrito" },
            { key: "tipo_operacion", label: "Operación" },
            { key: "tipo_propiedad", label: "Tipo" },
            { key: "fuente", label: "Fuente" },
            { key: "area_total_m2", label: "Área total (m²)" },
            { key: "habitaciones", label: "Dormitorios" },
            { key: "banos", label: "Baños" },
            { key: "cocheras", label: "Cocheras" },
            { key: "url_original", label: "URL" },
          ]}
        />
      </LayersControl.Overlay>

      {/* Capa: Área Urbana */}
      <LayersControl.Overlay name="🏙️ Área Urbana">
        <PolygonLayer
          url="/api/map/layer/area-urbana"
          style={{
            color: '#f59e0b',
            weight: 1,
            fillOpacity: 0.08,
            dashArray: "5, 5",
          }}
          popupContent={(properties) => `
            <div>
              <h4><strong>Área Urbana</strong></h4>
              <div><strong>Código AU:</strong> ${properties.cod_au || 'N/A'}</div>
              <div><strong>Nombre AU:</strong> ${properties.nom_au || 'N/A'}</div>
              <div><strong>Distrito:</strong> ${properties.nombdist || 'N/A'}</div>
              <div><strong>Área (ha):</strong> ${properties.area_has || 'N/A'}</div>
            </div>
          `}
        />
      </LayersControl.Overlay>

      {/* Capa: Viviendas */}
      <LayersControl.Overlay name="🏡 Viviendas">
        <PolygonLayer
          url="/api/map/layer/viviendas"
          style={{
            color: "#10b981",
            weight: 2,
            fillOpacity: 0.25,
            fillColor: "#10b981",
          }}
          popupContent={(props) => `
            <div class="space-y-2">
              <h3 class="font-semibold text-green-800">Viviendas</h3>
              <div><strong>Distrito:</strong> ${props.nombdist || 'N/A'}</div>
              <div><strong>Sector:</strong> ${props.nom_sect || 'N/A'}</div>
              <div><strong>Total Viviendas:</strong> ${props.sum_tot_vi || 'N/A'}</div>
              <div><strong>Tipo Proyecto:</strong> ${props.tip_proyec || 'N/A'}</div>
              <div><strong>Oferta Viv:</strong> ${props.ofert_viv_ || 'N/A'}</div>
              <div><strong>Fuente:</strong> ${props.fuente_of_ || 'N/A'}</div>
              <div><strong>Fecha:</strong> ${props.fecha_of_v || 'N/A'}</div>
              <div><strong>Ubigeo:</strong> ${props.ubigeo || 'N/A'}</div>
            </div>
          `}
        />
      </LayersControl.Overlay>

      {/* Capa: Oferta de Vivienda */}
      <LayersControl.Overlay name="🏠 Oferta de Vivienda">
        <PolygonLayer
          url="/api/map/layer/oferta-vivienda"
          style={{
            color: "#3b82f6",
            weight: 2,
            fillOpacity: 0.3,
            fillColor: "#3b82f6",
          }}
          popupContent={(props) => `
            <div class="space-y-2">
              <h3 class="font-semibold text-blue-800">Oferta de Vivienda</h3>
              <div><strong>Distrito:</strong> ${props.nombdist || 'N/A'}</div>
              <div><strong>Sector:</strong> ${props.nom_sect || 'N/A'}</div>
              <div><strong>Total Viviendas:</strong> ${props.sum_tot_vi || 'N/A'}</div>
              <div><strong>Tipo Proyecto:</strong> ${props.tip_proyec || 'N/A'}</div>
              <div><strong>Oferta Viv:</strong> ${props.ofert_viv_ || 'N/A'}</div>
              <div><strong>Fuente:</strong> ${props.fuente_of_ || 'N/A'}</div>
              <div><strong>Fecha:</strong> ${props.fecha_of_v || 'N/A'}</div>
              <div><strong>Ubigeo:</strong> ${props.ubigeo || 'N/A'}</div>
            </div>
          `}
        />
      </LayersControl.Overlay>

      {/* Capa: Tendencias Económicas */}
      <LayersControl.Overlay name="📊 Tendencias Económicas">
        <PolygonLayer
          url="/api/map/layer/tendencias-economicas"
          style={{
            color: "#f97316",
            weight: 2,
            fillOpacity: 0.25,
            fillColor: "#f97316",
          }}
          popupContent={(props) => `
            <div class="space-y-2">
              <h3 class="font-semibold text-orange-800">Tendencias Económicas</h3>
              <div><strong>Tipo:</strong> ${props.tipo || 'N/A'}</div>
              <div><strong>Área (has):</strong> ${props.area_has || 'N/A'}</div>
              <div><strong>Provincia:</strong> ${props.nombprov || 'N/A'}</div>
              <div><strong>Departamento:</strong> ${props.nombdep || 'N/A'}</div>
            </div>
          `}
        />
      </LayersControl.Overlay>
    </LayersControl>
  );
}