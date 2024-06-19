/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { type RouteConfig, start } from "$fresh/server.ts";

import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

import { connectDatabase, disconnectDatabase } from "./database/connection.ts";

await connectDatabase();

// Modify routes here to enable CSP for every route without exception.
// @ts-ignore: Manifest route types must be changed by this operation
manifest.routes = Object.fromEntries(
    Object.entries(manifest.routes).map(([k, v]) => {
      const config = { ...((v as { config?: RouteConfig }).config), csp: true };
      return [k, { ...v, config }];
    }),
  );
  
  try {
    await start(manifest, config);
  } finally {
    // Ensure the database connection is properly cleaned up
    await disconnectDatabase();
  }
  
