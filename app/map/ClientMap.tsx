"use client";

import Map from "../../components/map/Map";
import GeoLayer from "../../components/map/GeoLayer";
import PointsLayer from "../../components/map/PointsLayer";
import { LayersControl } from "react-leaflet";

export default function ClientMap() {
  return (
    <Map center={[-12.05, -77.05]} zoom={10}>
      <LayersControl position="topright">
        {/* 1) Urbania (marcadores) */}
        <LayersControl.Overlay name="Urbania" checked>
          <PointsLayer
            url="/api/map/urbania?limit=2000"
            color="#16a34a"
            radius={6}
            popupFields={[
              { key: "titulo", label: "Título" },
              { key: "precio", label: "Precio" },
              { key: "moneda", label: "Moneda" },
              { key: "distrito", label: "Distrito" },
              { key: "tipo_operacion", label: "Operación" },
              { key: "tipo_propiedad", label: "Tipo" },
              { key: "area_total_m2", label: "Área total (m²)" },
              { key: "habitaciones", label: "Dorms" },
              { key: "banos", label: "Baños" },
              { key: "cocheras", label: "Cocheras" },
              { key: "url_original", label: "URL" },
            ]}
          />
        </LayersControl.Overlay>

        {/* 2) Distritos (polígonos) */}
        <LayersControl.Overlay name="Distritos" checked={false}>
          <GeoLayer
            url="/api/map/distritos?simplify=60"
            style={{ color: "#2563eb", weight: 1, fillOpacity: 0.04 }}
            hoverStyle={{ color: "#1d4ed8", weight: 3, fillOpacity: 0.08 }}
            popupFields={[
              { key: "ubigeo", label: "UBIGEO" },
              { key: "nombdist", label: "Distrito" },
              { key: "nombprov", label: "Provincia" },
              { key: "area_km2", label: "Área (km²)" },
            ]}
          />
        </LayersControl.Overlay>

        {/* 3) Áreas urbanas (descomenta si la quieres activa) */}
        <LayersControl.Overlay name="Áreas urbanas" checked={false}>
          <GeoLayer
            url="/api/map/area-urbana?simplify=40"
            style={{ color: "#f59e0b", weight: 1, fillOpacity: 0.05 }}
            hoverStyle={{ color: "#d97706", weight: 3, fillOpacity: 0.1 }}
            popupFields={[
              { key: "cod_au", label: "Código AU" },
              { key: "nom_au", label: "Nombre AU" },
              { key: "nombdist", label: "Distrito" },
              { key: "area_has", label: "Área (ha)" },
            ]}
          />
        </LayersControl.Overlay>
      </LayersControl>
    </Map>
  );
}
