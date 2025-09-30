import { pg } from "../../../../lib/pg";

export async function GET(req: Request) {
  try {
    // Obtener estadísticas de propiedades
    const propertyStats = await pg.query(`
      SELECT 
        COUNT(*) as total_properties,
        AVG(precio) FILTER (WHERE precio > 0) as avg_price,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as new_properties_month
      FROM public.property_urbania 
    `);

    // Obtener estadísticas de leads (simulamos con actividad reciente)
    const leadStats = await pg.query(`
      SELECT 
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as active_leads
      FROM public.property_urbania
    `);

    // Calcular ROI promedio (simulado basado en propiedades)
    const roiStats = await pg.query(`
      SELECT 
        (COUNT(*) FILTER (WHERE precio BETWEEN 200000 AND 500000) * 100.0 / NULLIF(COUNT(*) FILTER (WHERE precio > 0), 0)) as roi_percentage
      FROM public.property_urbania 
    `);

    // Obtener distribución por distritos (top 10)
    const districtStats = await pg.query(`
      SELECT distrito, COUNT(*) as count
      FROM public.property_urbania 
      WHERE distrito IS NOT NULL AND distrito != ''
      GROUP BY distrito 
      ORDER BY count DESC 
      LIMIT 10
    `);

    // Obtener rangos de precios
    const priceRanges = await pg.query(`
      SELECT 
        MIN(precio) as min_price,
        MAX(precio) as max_price,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY precio) as median_price
      FROM public.property_urbania 
      WHERE precio > 0
    `);

    const stats = propertyStats.rows[0];
    const leads = leadStats.rows[0];
    const roi = roiStats.rows[0];
    const prices = priceRanges.rows[0];

    return Response.json({
      metrics: {
        totalProperties: parseInt(stats.total_properties) || 0,
        averagePrice: Math.round(parseFloat(stats.avg_price)) || 0,
        activeLeads: parseInt(leads.active_leads) || 0,
        roiPercentage: parseFloat(roi.roi_percentage) || 0,
        newPropertiesThisMonth: parseInt(stats.new_properties_month) || 0
      },
      priceRange: {
        min: parseInt(prices.min_price) || 0,
        max: parseInt(prices.max_price) || 0,
        median: Math.round(parseFloat(prices.median_price)) || 0
      },
      topDistricts: districtStats.rows.map(row => ({
        name: row.distrito,
        count: parseInt(row.count)
      })),
      lastUpdated: new Date().toISOString()
    });

  } catch (e: any) {
    console.error('Error al obtener estadísticas del dashboard:', e);
    return new Response(e.message || "Error al obtener estadísticas del dashboard", { status: 500 });
  }
}