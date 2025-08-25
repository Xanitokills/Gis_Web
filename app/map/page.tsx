// app/map/page.tsx  (Server Component)
import Map from "../../components/map/Map";
import GeoLayer from "../../components/map/GeoLayer"; // también es client, no hay problema
import ClientMap from "./ClientMap";


/* export default async function MapPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Mapa</h1>
      <Map>
        <GeoLayer url="/api/map/distritos?simplify=80" />
      </Map>
    </main>
  );
} */

 export default function MapPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Mapa</h1>
      <ClientMap />
    </main>
  );
} 