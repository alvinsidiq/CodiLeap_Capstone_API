import { configDotenv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
configDotenv();
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/core/db/schema/',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
