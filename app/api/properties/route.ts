import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.property.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(data);
}

export async function POST(req: Request) {
  const b = await req.json();
  if (!b?.title || typeof b?.price === "undefined") {
    return new Response("Faltan título o precio", { status: 400 });
  }
  const data = await prisma.property.create({ data: {
    title: b.title,
    description: b.description || null,
    price: Number(b.price),
    operationType: b.operationType || "venta",
    propertyType: b.propertyType || "departamento",
    district: b.district || "",
    address: b.address || "",
    latitude: b.latitude ?? null,
    longitude: b.longitude ?? null,
    bedrooms: b.bedrooms ?? null,
    bathrooms: b.bathrooms ?? null,
    totalArea: b.totalArea ?? null,
    builtArea: b.builtArea ?? null,
    parking: b.parking ?? null,
    phone: b.phone || null,
    email: b.email || null,
    status: "active",
    featured: !!b.featured,
    images: [],
    amenities: [],
    clientId: b.clientId ?? null,
  }});
  return Response.json(data);
}
