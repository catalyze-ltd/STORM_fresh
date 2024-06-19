#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import { connectDatabase, disconnectDatabase } from "./database/connection.ts";

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
