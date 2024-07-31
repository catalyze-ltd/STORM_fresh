import { fromFileUrl } from "@std/path/from-file-url";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, sql } from './db.ts';
// import init from "../../excel_import.ts";
import {
    importDataSourcing,
    importEffectorPkill,
    importEffectorsList,
    importEntityWaypoints,
    importPlatformEffectors,
    importMoes,
    importPlatformList,
    importPlatformProperties,
    importPlatformSensors,
    importScenarioEntities,
    importScenariosList,
    importSensorsList,
    refreshTables
} from "./migration.ts";
import { readScenariosList } from "./queries.ts";

async function migrateDatabase() {
    await importDataSourcing();
    await importEffectorPkill();
    await importEffectorsList();
    await importEntityWaypoints();
    await importPlatformEffectors();
    await importMoes();
    await importPlatformList();
    await importPlatformProperties();
    await importPlatformSensors();
    await importScenarioEntities();
    await importScenariosList();
    await importSensorsList();
}

export async function connectDatabase() {
    console.log('\x1b[32m%s\x1b[0m', "Performing migrations...");
    // const migrationsFolder = fromFileUrl(import.meta.resolve("./"));
    // await migrate(db, { migrationsFolder });
    // await init();
    // await refreshTables();
    // await migrateDatabase();
    console.log('\x1b[32m%s\x1b[0m', "Done!");
    await sql.end();
}

export async function disconnectDatabase() {
    await sql.end();
    console.log("Disconnected from STORM...");
}