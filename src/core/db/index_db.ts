import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema/index_schema';
import { neon } from '@neondatabase/serverless';
// import { configDotenv } from 'dotenv';
import 'dotenv/config';
// configDotenv();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export default db;
