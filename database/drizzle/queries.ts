import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";
import { 
    Data_sourcing,
    Effectors_list,
    Sensors_list,
    Effector_pKill,
    Entity_waypoints,
    MOEs,
    Platform_Effectors,
    Platform_Properties,
    Platform_Sensors,
    Platform_list,
    Scenario_entities,
    Scenarios_list,
 } from "./schema.ts";

export const sql = await postgres('postgres://postgres:Greenhouse56@localhost:5432/STORM');
export const db = drizzle(sql, { schema });

export async function updateScenariosList(data) {
    await db.delete(Scenarios_list);
    for (const row of data) {
        await db.insert(Scenarios_list).values({Scenario: row.Scenario, Seastate: row["Sea state"], Degraded_comms: JSON.stringify(row["Degraded comms"]), Simulation_timestep_minutes: row["Simulation timestep (minutes)"], Required_loiter_hrs: row["Required loiter (hrs)"]});
    }
}

export async function updateScenarioEntities(data) {
    await db.delete(Scenario_entities);
    for (const row of data) {
        await db.insert(Scenario_entities).values({Scenario: row.Scenario, Platform: row.Platform, Colour: row.Colour, Spoofed: JSON.stringify(row.Spoofed), Stance: row.Stance, Custom_Icon: row["Custom icon"], UID: row.UID, Platform_UID: row.Platform_UID, Scenario_Platform_UID: row.Scenario_Platform_UID});
    }
}

export async function updateEntityWaypoints(data) {
    await db.delete(Entity_waypoints);
    for (const row of data) {
        await db.insert(Entity_waypoints).values({Scenario_Platform_UID: row.Scenario_Platform_UID, Waypoint_ID: row["Waypoint ID"], Latitude: row.Latitude, Longitude: row.Longitude, Altitude: row.Altitude, Active_stance: row["Active stance"], Wait_time_min: row["Wait time (min)"]});
    }
}

export async function updateEditScenarioMarkers(data) {
    for (const row of data) {
    }
}

export async function updateEditScenarioPolylines(data) {
    for (const row of data) {
    }
}

export async function updateEditScenarioMap(data) {
    for (const row of data) {
    }
}