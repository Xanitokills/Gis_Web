import { pg } from "../../../lib/pg";

export async function GET(req: Request) {
  try {
    // Obtener valores únicos para los filtros de segmentación
    const [sources, operationTypes, propertyTypes] = await Promise.all([
      // Fuentes
      pg.query(`
        SELECT fuente, COUNT(*) as count
        FROM public.property_urbania 
        WHERE fuente IS NOT NULL AND fuente != ''
        GROUP BY fuente 
        ORDER BY count DESC
      `),
      
      // Tipos de operación
      pg.query(`
        SELECT tipo_operacion, COUNT(*) as count
        FROM public.property_urbania 
        WHERE tipo_operacion IS NOT NULL AND tipo_operacion != ''
        GROUP BY tipo_operacion 
        ORDER BY count DESC
      `),
      
      // Tipos de propiedad
      pg.query(`
        SELECT tipo_propiedad, COUNT(*) as count
        FROM public.property_urbania 
        WHERE tipo_propiedad IS NOT NULL AND tipo_propiedad != ''
        GROUP BY tipo_propiedad 
        ORDER BY count DESC
      `)
    ]);

    return Response.json({
      sources: sources.rows.map(row => ({
        name: row.fuente,
        count: parseInt(row.count)
      })),
      operationTypes: operationTypes.rows.map(row => ({
        name: row.tipo_operacion,
        count: parseInt(row.count)
      })),
      propertyTypes: propertyTypes.rows.map(row => ({
        name: row.tipo_propiedad,
        count: parseInt(row.count)
      }))
    });

  } catch (e: any) {
    console.error('Error al obtener filtros de segmentación:', e);
    return new Response(e.message || "Error al obtener filtros de segmentación", { status: 500 });
  }
}