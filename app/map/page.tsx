import Map from "../../components/map/Map";

async function getMarkers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/properties`, { cache: "no-store" });
    if (!res.ok) return [];
    const props = await res.json();
    return props
      .filter((p: any) => p.latitude && p.longitude)
      .map((p: any) => ({ lat: p.latitude, lng: p.longitude, title: p.title }));
  } catch {
    return [];
  }
}

export default async function MapPage() {
  const markers = await getMarkers();
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Mapa</h1>
      <Map markers={markers} />
      <p className="text-sm text-neutral-500">
        Nota: para visualizar el mapa instala <code>leaflet</code> y <code>react-leaflet</code>.
      </p>
    </main>
  );
}
