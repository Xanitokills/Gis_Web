import { pg } from "../../../../lib/pg";

// Utilidad: convertir a número seguro
const num = (v: any, d: number) => (isNaN(Number(v)) ? d : Number(v));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // filtros opcionales
  const q = (searchParams.get("q") || "").trim();   // por nombre/ubigeo
  const limit = num(searchParams.get("limit"), 0);  // 0 = sin límite

  // bbox opcional en 4326 (lon/lat): minX,minY,maxX,maxY
  const bbox = (searchParams.get("bbox") || "").split(",").map(Number);
  const hasBbox = bbox.length === 4 && bbox.every((n) => !isNaN(n));

  // simplificación en metros (se hace en 32718 y luego se transforma a 4326)
  const simplify = Math.max(0, num(searchParams.get("simplify"), 50)); // 50 m por defecto

  // Construcción dinámica del WHERE
  const where: string[] = [];
  const params: any[] = [];

  if (q) {
    params.push(`%${q.toUpperCase()}%`);
    // filtrar por nombre distrito o ubigeo
    where.push(`(UPPER(nombdist) LIKE $${params.length} OR ubigeo LIKE $${params.length})`);
  }

  if (hasBbox) {
    // Construimos un envelope en 4326 y lo transformamos a 32718 para usar el índice GiST
    const [minX, minY, maxX, maxY] = bbox;
    params.push(minX, minY, maxX, maxY);
    where.push(
      `shape && ST_Transform(ST_MakeEnvelope($${params.length-3}, $${params.length-2}, $${params.length-1}, $${params.length}, 4326), 32718)`
    );
  }

  const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const limitSQL = limit > 0 ? `LIMIT ${limit}` : "";

  // OJO: simplificamos en 32718 (metros), luego transformamos a 4326 para GeoJSON
  const sql = `
    WITH base AS (
      SELECT
        objectid,
        ubigeo,
        iddist,
        nombdist,
        nombprov,
        nombdep,
        area_km2,
        tot_ccpp17,
        tot_pob17,
        tot_viv17,
        ST_Transform(
          ST_SimplifyPreserveTopology(shape, $1::double precision),
          4326
        ) AS geom4326
      FROM public.org_b_1501_distrito
      ${whereSQL}
      ${limitSQL}
    )
    SELECT jsonb_build_object(
      'type','FeatureCollection',
      'features', jsonb_agg(
        jsonb_build_object(
          'type','Feature',
          'id', objectid,
          'geometry', ST_AsGeoJSON(geom4326)::jsonb,
          'properties', to_jsonb(base) - 'geom4326'
        )
      )
    ) AS fc
    FROM base;
  `;

  try {
    const { rows } = await pg.query(sql, [simplify, ...params]);
    const fc = rows?.[0]?.fc ?? { type: "FeatureCollection", features: [] };
    return Response.json(fc);
  } catch (e: any) {
    console.error(e);
    return new Response(e.message || "Error al generar GeoJSON", { status: 500 });
  }
}
