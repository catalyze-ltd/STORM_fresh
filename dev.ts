#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
// import excel_import from "./excel_import.ts";

// await excel_import();  <<USE FOR IMPORTING EXCEL FILE TO POSTGRESQL>>

import { connectDatabase, disconnectDatabase } from "./database/drizzle/connection.ts";
if (Deno.args.includes("build")) {
    await dev(import.meta.url, "./main.ts", config);
  } else {
    await connectDatabase();
    try {
      await dev(import.meta.url, "./main.ts", config);
    } finally {
      disconnectDatabase();
    }
  }

import "$std/dotenv/load.ts";

await dev(import.meta.url, "./main.ts", config);
