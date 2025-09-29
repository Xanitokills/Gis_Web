import { pg } from "../../../../lib/pg";

const num = (v: any, d: number) => (isNaN(Number(v)) ? d : Number(v));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const district = (searchParams.get("district") || "").trim();
  const min = num(searchParams.get("min_price"), 0);
  const max = num(searchParams.get("max_price"), 0);
  const limit = num(searchParams.get("limit"), 1000); // Reducir límite por defecto
  const source = searchParams.get("source") || ""; // Nuevo filtro por fuente
  const operationType = searchParams.get("operation_type") || ""; // Nuevo filtro
  const propertyType = searchParams.get("property_type") || ""; // Nuevo filtro
  const bboxArr = (searchParams.get("bbox") || "").split(",").map(Number);
  const hasBbox = bboxArr.length === 4 && bboxArr.every((n) => !isNaN(n));

  const where: string[] = ["geo IS NOT NULL"]; // 👈 importante
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
  const limitSQL = limit > 0 ? `LIMIT ${limit}` : "LIMIT 1000"; // Siempre tener un límite para performance

  const sql = `
    WITH base AS (
      SELECT
        id, titulo, precio, moneda, ubicacion, distrito,
        tipo_operacion, tipo_propiedad, fuente,
        area_total_m2, area_construida_m2,
        habitaciones, banos, cocheras, antiguedad,
        latitud, longitud,
        url_original, 
        created_at,
        ST_SetSRID(geo::geometry, 4326) AS g4326
      FROM public.property_urbania
      ${whereSQL}
      ORDER BY precio DESC -- Ordenar para mostrar propiedades más caras primero
      ${limitSQL}
    )
    SELECT jsonb_build_object(
      'type','FeatureCollection',
      'features', COALESCE(jsonb_agg(
        jsonb_build_object(
          'type','Feature',
          'id', id,
          'geometry', ST_AsGeoJSON(g4326)::jsonb,
          'properties', to_jsonb(base) - 'g4326'
        )
      ) FILTER (WHERE g4326 IS NOT NULL), '[]'::jsonb)
    ) AS fc
    FROM base;
  `;

  try {
    const { rows } = await pg.query(sql, params);
    const fc = rows?.[0]?.fc ?? { type: "FeatureCollection", features: [] };
    
    // Agregar información de debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Urbania API] Filtros aplicados:`, {
        query: q,
        district,
        min_price: min,
        max_price: max,
        limit,
        bbox: hasBbox ? bboxArr : null
      });
      console.log(`[Urbania API] Total features devueltas: ${fc.features?.length || 0}`);
    }
    
    return Response.json(fc);
  } catch (e: any) {
    console.error(e);
    return new Response(e.message || "Error al generar GeoJSON de Urbania", { status: 500 });
  }
}
