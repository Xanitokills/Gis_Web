import { pg } from "../../../lib/pg";

const num = (v: any, d: number) => (isNaN(Number(v)) ? d : Number(v));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const district = (searchParams.get("district") || "").trim();
  const min = num(searchParams.get("min_price"), 0);
  const max = num(searchParams.get("max_price"), 0);
  const source = searchParams.get("source") || "";
  const operationType = searchParams.get("operation_type") || "";
  const propertyType = searchParams.get("property_type") || "";
  const bboxArr = (searchParams.get("bbox") || "").split(",").map(Number);
  const hasBbox = bboxArr.length === 4 && bboxArr.every((n) => !isNaN(n));

  const where: string[] = ["geo IS NOT NULL"];
  const params: any[] = [];

  if (q) {
    params.push(`%${q}%`);
    where.push(`(lower(titulo) LIKE $${params.length}
                 OR lower(distrito) LIKE $${params.length}
                 OR lower(ubicacion) LIKE $${params.length})`);
  }
  if (district) {
    params.push(`%${district.toLowerCase()}%`);
    where.push(`lower(distrito) LIKE $${params.length}`);
  }
  if (min > 0) {
    params.push(min);
    where.push(`precio >= $${params.length}`);
  }
  if (max > 0) {
    params.push(max);
    where.push(`precio <= $${params.length}`);
  }
  if (source) {
    params.push(`%${source.toLowerCase()}%`);
    where.push(`lower(fuente) LIKE $${params.length}`);
  }
  if (operationType) {
    params.push(`%${operationType.toLowerCase()}%`);
    where.push(`lower(tipo_operacion) LIKE $${params.length}`);
  }
  if (propertyType) {
    params.push(`%${propertyType.toLowerCase()}%`);
    where.push(`lower(tipo_propiedad) LIKE $${params.length}`);
  }

  if (hasBbox) {
    const [minX, minY, maxX, maxY] = bboxArr;
    params.push(minX, minY, maxX, maxY);
    where.push(`
      ST_Intersects(
        ST_SetSRID(geo::geometry, 4326),
        ST_MakeEnvelope($${params.length-3},$${params.length-2},$${params.length-1},$${params.length},4326)
      )
    `);
  }

  const whereSQL = `WHERE ${where.join(" AND ")}`;

  const sql = `
    SELECT COUNT(*) as total_count
    FROM public.property_urbania
    ${whereSQL}
  `;

  try {
    const { rows } = await pg.query(sql, params);
    const totalCount = parseInt(rows[0]?.total_count) || 0;
    
    // Agregar información de debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Count API] Filtros aplicados:`, {
        query: q,
        district,
        min_price: min,
        max_price: max,
        source,
        operationType,
        propertyType,
        bbox: hasBbox ? bboxArr : null
      });
      console.log(`[Count API] Total count: ${totalCount}`);
    }
    
    return Response.json({ 
      count: totalCount,
      filters: {
        query: q || null,
        district: district || null,
        min_price: min > 0 ? min : null,
        max_price: max > 0 ? max : null,
        source: source || null,
        operation_type: operationType || null,
        property_type: propertyType || null,
        bbox: hasBbox ? bboxArr : null
      }
    });
  } catch (e: any) {
    console.error('Error al obtener conteo:', e);
    return new Response(e.message || "Error al obtener conteo de propiedades", { status: 500 });
  }
}