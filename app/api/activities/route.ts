import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.activity.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(data);
}

export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.title) {
    return new Response("Falta el título", { status: 400 });
  }
  const data = await prisma.activity.create({ data: {
    type: b.type || "call",
    title: b.title,
    description: b.description || null,
    status: b.status || "pending",
    dueDate: b.dueDate ? new Date(b.dueDate) : null,
    completedAt: null,
    propertyId: b.propertyId ?? null,
    clientId: b.clientId ?? null,
    leadId: b.leadId ?? null,
  }});
  return Response.json(data);
}
