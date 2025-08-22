import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(data);
}

export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.name || !b?.email) {
    return new Response("Faltan nombre o email", { status: 400 });
  }
  const data = await prisma.lead.create({ data: {
    name: b.name, email: b.email, phone: b.phone || null, source: b.source || "website",
    status: b.status || "new", priority: b.priority || "medium", budget: b.budget ?? null,
    notes: b.notes || null, propertyId: b.propertyId ?? null, clientId: b.clientId ?? null,
  }});
  return Response.json(data);
}
