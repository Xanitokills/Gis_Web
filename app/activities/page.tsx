import ActivityForm from "../../components/crm/ActivityForm";

export const dynamic = "force-dynamic";

async function getActivities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/activities`, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as any[];
  } catch {
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Actividades</h1>
      <ActivityForm />
      <div className="grid gap-3">
        {activities.map((a) => (
          <div key={a.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-neutral-500">{a.type} • {a.status}</p>
              </div>
              {a.dueDate && <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs">{new Date(a.dueDate).toLocaleString("es-PE")}</span>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
