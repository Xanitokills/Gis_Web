import { pg } from "../../../../lib/pg";

export async function GET(req: Request) {
  try {
    // Verificar propiedades con y sin geolocalización
    const geoStats = await pg.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE geo IS NOT NULL) as with_geo,
        COUNT(*) FILTER (WHERE geo IS NULL) as without_geo,
        COUNT(*) FILTER (WHERE latitud IS NOT NULL AND longitud IS NOT NULL) as with_coordinates
      FROM public.property_urbania
    `);

    // Ejemplos de propiedades sin geo
    const samplesWithoutGeo = await pg.query(`
      SELECT titulo, distrito, latitud, longitud
      FROM public.property_urbania 
      WHERE geo IS NULL 
      LIMIT 5
    `);

    // Ejemplos de propiedades con coordenadas pero sin geo
    const samplesWithCoordinatesNoGeo = await pg.query(`
      SELECT titulo, distrito, latitud, longitud
      FROM public.property_urbania 
      WHERE geo IS NULL AND latitud IS NOT NULL AND longitud IS NOT NULL
      LIMIT 5
    `);

    const stats = geoStats.rows[0];

    return Response.json({
      stats: {
        total: parseInt(stats.total),
        withGeo: parseInt(stats.with_geo),
        withoutGeo: parseInt(stats.without_geo),
        withCoordinates: parseInt(stats.with_coordinates)
      },
      samples: {
        withoutGeo: samplesWithoutGeo.rows,
        withCoordinatesNoGeo: samplesWithCoordinatesNoGeo.rows
      },
      analysis: {
        geoConversionNeeded: parseInt(stats.with_coordinates) - parseInt(stats.with_geo),
        percentageWithGeo: ((parseInt(stats.with_geo) / parseInt(stats.total)) * 100).toFixed(1)
      }
    });

  } catch (e: any) {
    console.error('Error al analizar geolocalización:', e);
    return new Response(e.message || "Error al analizar geolocalización", { status: 500 });
  }
}