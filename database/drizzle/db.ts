import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema.ts";

export const sql = await postgres('postgres://postgres:Greenhouse56@localhost:5432/STORM');

export const db = drizzle(sql, { schema });