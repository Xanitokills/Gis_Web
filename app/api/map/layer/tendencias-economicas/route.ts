import { pg } from "../../../../../lib/pg";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bboxArr = (searchParams.get("bbox") || "").split(",").map(Number);
  const hasBbox = bboxArr.length === 4 && bboxArr.every((n) => !isNaN(n));

  const where: string[] = ["shape IS NOT NULL"];
  const params: any[] = [];

  if (hasBbox) {
    const [minX, minY, maxX, maxY] = bboxArr;
    params.push(minX, minY, maxX, maxY);
    where.push(`
      ST_Intersects(
        ST_SetSRID(shape::geometry, 4326),
        ST_MakeEnvelope($${params.length-3},$${params.length-2},$${params.length-1},$${params.length},4326)
      )
    `);
  }

  const whereSQL = `WHERE ${where.join(" AND ")}`;

  const sql = `
    WITH base AS (
      SELECT
        objectid as id,
        tipo,
        area_has,
        nombprov,
        nombdep,
        shape_length,
        shape_area,
        ST_SetSRID(shape::geometry, 4326) AS g4326
      FROM public.d_1501_tendencias_en_lo_economico
      ${whereSQL}
      ORDER BY shape_area DESC
      LIMIT 1000
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
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Tendencias Económicas API] Total features devueltas: ${fc.features?.length || 0}`);
    }
    
    return Response.json(fc);
  } catch (e: any) {
    console.error("Error en API tendencias-economicas:", e);
    return new Response(e.message || "Error al generar GeoJSON de Tendencias Económicas", { status: 500 });
  }
}