import ClientForm from "../../components/crm/ClientForm";

export const dynamic = "force-dynamic";

async function getClients() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/clients`, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as any[];
  } catch {
    return [];
  }
}

export default async function ClientsPage() {
  const clients = await getClients();
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Clientes</h1>
      <ClientForm />
      <div className="grid gap-3">
        {clients.map((c) => (
          <div key={c.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-neutral-500">{c.email} • {c.phone}</p>
              </div>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs">{c.clientType}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
