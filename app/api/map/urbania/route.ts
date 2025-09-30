import { pg } from "../../../../lib/pg";

const num = (v: any, d: number) => (isNaN(Number(v)) ? d : Number(v));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const district = (searchParams.get("district") || "").trim();
  const min = num(searchParams.get("min_price"), 0);
  const max = num(searchParams.get("max_price"), 0);
  const limit = num(searchParams.get("limit"), 2000); // Aumentar límite cuando no hay filtros específicos
  const source = searchParams.get("source") || ""; // Nuevo filtro por fuente
  const operationType = searchParams.get("operation_type") || ""; // Nuevo filtro
  const propertyType = searchParams.get("property_type") || ""; // Nuevo filtro
  const includeNoGeo = searchParams.get("include_no_geo") === "true"; // Incluir propiedades sin geo
  const bboxArr = (searchParams.get("bbox") || "").split(",").map(Number);
  const hasBbox = bboxArr.length === 4 && bboxArr.every((n) => !isNaN(n));

  // Filtro de geolocalización - incluir todo lo que tenga coordenadas
  const where: string[] = ["(latitud IS NOT NULL AND longitud IS NOT NULL)"]; // 👈 Cambio principal
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
        CASE 
          WHEN geo IS NOT NULL THEN ST_SetSRID(geo::geometry, 4326)
          WHEN latitud IS NOT NULL AND longitud IS NOT NULL THEN ST_SetSRID(ST_MakePoint(longitud, latitud), 4326)
          ELSE NULL
        END AS g4326
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
          'geometry', CASE WHEN g4326 IS NOT NULL THEN ST_AsGeoJSON(g4326)::jsonb ELSE null END,
          'properties', to_jsonb(base) - 'g4326'
        )
      ), '[]'::jsonb)
    ) AS fc
    FROM base;
  `;

  try {
    // Primero obtener el conteo total que coincide con los filtros
    const countSql = `
      SELECT COUNT(*) as total_count
      FROM public.property_urbania
      ${whereSQL}
    `;
    
    const { rows: countRows } = await pg.query(countSql, params);
    const totalMatching = parseInt(countRows[0]?.total_count) || 0;

    const { rows } = await pg.query(sql, params);
    const fc = rows?.[0]?.fc ?? { type: "FeatureCollection", features: [] };
    
    // Agregar metadatos sobre el conteo
    fc.metadata = {
      totalMatching: totalMatching,
      featuresShown: fc.features?.length || 0,
      limit: limit,
      hasMoreResults: totalMatching > limit
    };
    
    // Agregar información de debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Urbania API] Filtros aplicados:`, {
        query: q,
        district,
        min_price: min,
        max_price: max,
        limit,
        include_no_geo: includeNoGeo,
        bbox: hasBbox ? bboxArr : null
      });
      console.log(`[Urbania API] Total que coincide con filtros: ${totalMatching}, Features devueltas: ${fc.features?.length || 0}`);
      
      // Log detallado de coordenadas
      if (fc.features && fc.features.length > 0) {
        console.log(`[Urbania API] Coordenadas de features:`, fc.features.map((f: any) => ({
          id: f.id,
          title: f.properties?.titulo,
          coords: f.geometry?.coordinates,
          latitud: f.properties?.latitud,
          longitud: f.properties?.longitud
        })));
      }
    }
    
    return Response.json(fc);
  } catch (e: any) {
    console.error(e);
    return new Response(e.message || "Error al generar GeoJSON de Urbania", { status: 500 });
  }
}
