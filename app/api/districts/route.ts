import { pg } from "../../../lib/pg";

export async function GET(req: Request) {
  try {
    // Obtener lista de distritos únicos de la base de datos
    const districts = await pg.query(`
      SELECT DISTINCT distrito, COUNT(*) as count
      FROM public.property_urbania 
      WHERE distrito IS NOT NULL 
        AND distrito != ''
        AND distrito != 'null'
      GROUP BY distrito 
      ORDER BY count DESC, distrito ASC
    `);

    return Response.json({
      districts: districts.rows.map(row => ({
        name: row.distrito,
        count: parseInt(row.count)
      }))
    });

  } catch (e: any) {
    console.error('Error al obtener distritos:', e);
    return new Response(e.message || "Error al obtener lista de distritos", { status: 500 });
  }
}