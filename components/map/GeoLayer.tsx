"use client";

import { useEffect, useMemo, useState } from "react";
import type * as L from "leaflet";

type PopupField = { key: string; label?: string };

export default function GeoLayer({
  url,
  style = { weight: 1, opacity: 1, color: "#2563eb", fillOpacity: 0.05 },
  hoverStyle = { weight: 3, opacity: 1 },
  popupFields = [],
}: {
  url: string;
  style?: L.PathOptions;
  hoverStyle?: L.PathOptions;
  popupFields?: PopupField[];
}) {
  const [RL, setRL] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  // carga react-leaflet (solo cliente)
  useEffect(() => {
    (async () => {
      const mod = await import("react-leaflet");
      // Import leaflet CSS in your main entry file (e.g., app/layout.tsx or pages/_app.tsx) instead:
      // import 'leaflet/dist/leaflet.css';
      setRL(mod);
    })();
  }, []);

  // carga GeoJSON del endpoint
  useEffect(() => {
    (async () => {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) setData(await res.json());
    })();
  }, [url]);

  const onEachFeature = useMemo(
    () =>
      function onEachFeature(feature: any, layer: any) {
        // popup con campos seleccionados
        if (popupFields.length) {
          const html = popupFields
            .map(({ key, label }) => {
              const v = feature?.properties?.[key];
              return `<div><b>${label || key}</b>: ${v ?? "-"}</div>`;
            })
            .join("");
          layer.bindPopup(html, { maxWidth: 320 });
        }

        // hover highlight
        const orig = { ...(style as any) };
        layer.on("mouseover", () => layer.setStyle(hoverStyle as any));
        layer.on("mouseout", () => layer.setStyle(orig as any));
      },
    [popupFields, style, hoverStyle]
  );

  if (!RL || !data) return null;
  const { GeoJSON } = RL;

  return (
    <GeoJSON
      key={url}
      data={data as any}
      style={() => style as any}
      onEachFeature={onEachFeature}
    />
  );
}
