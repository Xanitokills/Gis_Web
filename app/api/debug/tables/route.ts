import { pg } from "../../../../lib/pg";

export async function GET() {
  try {
    // Verificar qué tablas existen que contengan "vivienda" u "oferta"
    const sql = `
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND (table_name ILIKE '%vivienda%' OR table_name ILIKE '%oferta%' OR table_name ILIKE '%delimit%')
      ORDER BY table_name, ordinal_position;
    `;
    
    const { rows } = await pg.query(sql);
    
    return Response.json({
      tables: rows,
      message: "Tablas relacionadas con vivienda/oferta encontradas"
    });
  } catch (e: any) {
    console.error("Error:", e);
    return new Response(e.message, { status: 500 });
  }
}