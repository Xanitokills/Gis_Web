import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.name || !body?.email) {
    return new Response("Faltan nombre o email", { status: 400 });
  }
  const data = await prisma.client.create({ data: {
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    address: body.address || null,
    dni: body.dni || null,
    clientType: body.clientType || "buyer",
    status: "active",
    notes: body.notes || null,
  }});
  return Response.json(data);
}
