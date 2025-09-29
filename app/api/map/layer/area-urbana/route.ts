import { pg } from "../../../../../lib/pg";

// convierte string->number con default
const num = (v: any, d: number) => (isNaN(Number(v)) ? d : Number(v));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const simplify = Math.max(0, num(searchParams.get("simplify"), 50)); // m
  const bbox = (searchParams.get("bbox") || "").split(",").map(Number);
  const hasBbox = bbox.length === 4 && bbox.every((n) => !isNaN(n));

  const where: string[] = [];
  const params: any[] = [];

  if (q) {
    params.push(`%${q.toUpperCase()}%`);
    where.push(`(UPPER(nom_au) LIKE $${params.length} OR cod_au LIKE $${params.length})`);
  }
  if (hasBbox) {
    const [minX, minY, maxX, maxY] = bbox;
    params.push(minX, minY, maxX, maxY);
    where.push(
      `shape && ST_Transform(ST_MakeEnvelope($${params.length-3},$${params.length-2},$${params.length-1},$${params.length},4326),32718)`
    );
  }
  const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const sql = `
    WITH base AS (
      SELECT
        objectid, cod_au, nom_au, fpol_ccpp, iddist, nombdist, nombprov,
        area_has, shape_length, shape_area,
        ST_Transform(ST_SimplifyPreserveTopology(shape, $1::double precision), 4326) AS geom4326
      FROM public.b_1501_area_urbana
      ${whereSQL}
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
    return new Response(e.message || "Error al generar GeoJSON", { status: 500 });
  }
}
