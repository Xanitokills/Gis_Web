import { pg } from "../../../../lib/pg";

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

  const whereSQL = `WHERE ${where.join(" AND ")}`;

  try {
    // Obtener estadísticas filtradas
    const propertyStats = await pg.query(`
      SELECT 
        COUNT(*) as total_properties,
        AVG(precio) FILTER (WHERE precio > 0) as avg_price,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as new_properties_month
      FROM public.property_urbania 
      ${whereSQL}
    `, params);

    // Obtener leads activos (simulado con actividad reciente)
    const leadStats = await pg.query(`
      SELECT 
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as active_leads
      FROM public.property_urbania
      ${whereSQL}
    `, params);

    // Calcular ROI promedio filtrado
    const roiStats = await pg.query(`
      SELECT 
        (COUNT(*) FILTER (WHERE precio BETWEEN 200000 AND 500000) * 100.0 / NULLIF(COUNT(*) FILTER (WHERE precio > 0), 0)) as roi_percentage
      FROM public.property_urbania 
      ${whereSQL}
    `, params);

    // Obtener distribución por distritos filtrada
    const districtStats = await pg.query(`
      SELECT distrito, COUNT(*) as count
      FROM public.property_urbania 
      ${whereSQL} AND distrito IS NOT NULL AND distrito != ''
      GROUP BY distrito 
      ORDER BY count DESC 
      LIMIT 20
    `, params);

    // Obtener rangos de precios filtrados
    const priceRanges = await pg.query(`
      SELECT 
        MIN(precio) as min_price,
        MAX(precio) as max_price,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY precio) as median_price
      FROM public.property_urbania 
      ${whereSQL} AND precio > 0
    `, params);

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
      appliedFilters: {
        query: q || null,
        district: district || null,
        min_price: min > 0 ? min : null,
        max_price: max > 0 ? max : null,
        source: source || null,
        operation_type: operationType || null,
        property_type: propertyType || null
      },
      lastUpdated: new Date().toISOString()
    });

  } catch (e: any) {
    console.error('Error al obtener estadísticas filtradas:', e);
    return new Response(e.message || "Error al obtener estadísticas filtradas", { status: 500 });
  }
}