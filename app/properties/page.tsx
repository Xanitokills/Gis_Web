import PropertyForm from "../../components/crm/PropertyForm";

export const dynamic = "force-dynamic";

async function getProperties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/properties`, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as any[];
  } catch {
    return [];
  }
}

export default async function PropertiesPage() {
  const properties = await getProperties();
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Propiedades</h1>
      <PropertyForm />
      <div className="grid gap-3">
        {properties.map((p) => (
          <div key={p.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-neutral-500">{p.district} • {p.address}</p>
              </div>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs">S/ {p.price?.toLocaleString?.("es-PE")}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
