// components/map/GeoLayer.tsx
"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import type { PathOptions } from "leaflet";

const GeoJSON = dynamic(async () => (await import("react-leaflet")).GeoJSON, { ssr: false });
const Tooltip = dynamic(async () => (await import("react-leaflet")).Tooltip, { ssr: false });
const Popup = dynamic(async () => (await import("react-leaflet")).Popup, { ssr: false });

type PopupField = { key: string; label: string };

type Props = {
  url: string;
  style?: PathOptions & { className?: string };
  hoverStyle?: PathOptions;
  popupFields?: PopupField[];
};

export default function GeoLayer({ url, style, hoverStyle, popupFields = [] }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch(url);
      if (!res.ok) return;
      const gj = await res.json();
      if (alive) setData(gj);
    })();
    return () => { alive = false; };
  }, [url]);

  const baseStyle: PathOptions = useMemo(() => ({
    color: "#2563eb",
    weight: 2,
    fillOpacity: 0.05,
    ...(style || {}),
  }), [style]);

  const hoveredStyle: PathOptions = useMemo(() => ({
    weight: 3,
    ...(hoverStyle || {}),
  }), [hoverStyle]);

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={() => baseStyle}
      onEachFeature={(feature, layer) => {
        // Hover effect
        layer.on("mouseover", () => {
          (layer as any).setStyle?.(hoveredStyle);
        });
        layer.on("mouseout", () => {
          (layer as any).setStyle?.(baseStyle);
        });

        // Popup content
        if (popupFields.length > 0) {
          const rows = popupFields
            .map(f => {
              const val =
                (feature?.properties?.[f.key] ?? feature?.properties?.[f.key.toUpperCase()] ?? "");
              return `<div style="display:flex;gap:.5rem;"><b>${f.label}:</b><span>${val ?? ""}</span></div>`;
            })
            .join("");
          layer.bindPopup(`<div style="min-width:220px">${rows}</div>`, { maxWidth: 300 });
        }
      }}
    />
  );
}
