import { Pool } from "pg";

export const pg = new Pool({
  connectionString: process.env.DATABASE_URL, // postgresql://user:pass@host:5432/web
  // ssl: { rejectUnauthorized: false }, // si tu servidor exige SSL
});
