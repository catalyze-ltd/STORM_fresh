import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: "./database/drizzle/schema.ts",
    dialect: 'postgresql',
    migrations: {
        prefix: 'supabase'
    }
});