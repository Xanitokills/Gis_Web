import { pg } from "@/lib/pg";

export async function GET() {
  try {
    const query = `
      SELECT 
        objectid_1 as id,
        ubigeo,
        nombdist,
        nom_sect,
        sum_tot_vi,
        tip_proyec,
        ofert_viv_,
        fuente_of_,
        fecha_of_v
      FROM d_1501_oferta_vivienda 
      ORDER BY objectid_1 
      LIMIT 100
    `;
    
    const res = await pg.query(query);
    return Response.json(res.rows);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return Response.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // La tabla d_1501_oferta_vivienda es de solo lectura (datos geográficos)
  // Para crear propiedades necesitaríamos una tabla separada
  return Response.json(
    { error: "Property creation not implemented - read-only geographic data" }, 
    { status: 501 }
  );
}
