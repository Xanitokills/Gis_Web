import LeadForm from "../../components/crm/LeadForm";

export const dynamic = "force-dynamic";

async function getLeads() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/leads`, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as any[];
  } catch {
    return [];
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Leads</h1>
      <LeadForm />
      <div className="grid gap-3">
        {leads.map((l) => (
          <div key={l.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{l.name}</h3>
                <p className="text-sm text-neutral-500">{l.email} • {l.phone}</p>
              </div>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs">{l.status} / {l.priority}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
