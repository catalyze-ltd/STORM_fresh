/// <reference lib="deno.ns" />

import { lt, sql as drizzleSql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema.ts";
import * as relations from "./relations.ts";

/** The number of simultaneous connections to the database */
export const nConnections = parseInt(Deno.env.get("N_DB_CONNECTIONS") ?? "8");

// Connect to database for queries, and pass to Drizzle
export const sql = postgres({ max: nConnections, keep_alive: nConnections });
export const db = drizzle(sql, { schema: { ...schema, ...relations } });

let userSessionCleanup: number;

/** Connects to the database */
export function connectDatabase() {

  // Periodically clean up stale entries in the user session table
  const userSessionCleanupQuery = db.delete(schema.userSession)
    .where(lt(schema.userSession.expiresAt, drizzleSql`NOW()`))
    .prepare("user_session_cleanup");
  userSessionCleanup = setInterval(
    () =>
      userSessionCleanupQuery.execute().then(({ count }) =>
        console.log(`Cleaned up ${count} expired user sessions`)
      ).catch((reason) =>
        console.error(`User session cleanup failed: ${reason}`)
      ),
    10e6,
  );
}

/** Disconnects cleanly from the database */
export async function disconnectDatabase() {
  clearInterval(userSessionCleanup);
  await sql.end({ timeout: 3 });
}
