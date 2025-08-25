"use client";
import Map from "../../components/map/Map";
import GeoLayer from "../../components/map/GeoLayer";
import { LayersControl } from "react-leaflet";

export default function ClientMap() {
  return (
    <Map center={[-12.05, -77.05]} zoom={9}>
      <LayersControl position="topright">
        <LayersControl.Overlay name="Distritos" checked>
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
