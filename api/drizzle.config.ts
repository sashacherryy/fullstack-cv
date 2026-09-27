import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const migrationDatabaseUrl = process.env.MIGRATION_DATABASE_URL;

if(!migrationDatabaseUrl) {
  throw new Error('Migration database URL is not defined.')
}

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: migrationDatabaseUrl!,
  },
});