import { db } from "./db.ts";
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
import * as datasourcing from "../JSON_Data/Data sourcing.json" with { type: "json" };
import * as effectorslist from "../JSON_Data/Effectors list.json" with { type: "json" };
import * as effectorpkill from "../JSON_Data/Effector pKill.json" with { type: "json" };
import * as entitywaypoints from "../JSON_Data/Entity waypoints.json" with { type: "json" };
import * as moes from "../JSON_Data/MOEs.json" with { type: "json" };
import * as platformeffectors from "../JSON_Data/Platform Effectors.json" with { type: "json" };
import * as platformlist from "../JSON_Data/Platform list.json" with { type: "json" };
import * as platformproperties from "../JSON_Data/Platform properties.json" with { type: "json" };
import * as platformsensors from "../JSON_Data/Platform Sensors.json" with { type: "json" };
import * as scenarioentities from "../JSON_Data/Scenario entities.json" with { type: "json" };
import * as scenarioslist from "../JSON_Data/Scenarios list.json" with { type: "json" };
import * as sensorslist from "../JSON_Data/Sensors list.json" with { type: "json" };

export async function refreshTables() {
    await db.delete(Data_sourcing);
    await db.delete(Effectors_list);
    await db.delete(Sensors_list);
    await db.delete(Platform_Effectors);
    await db.delete(Platform_Properties);
    await db.delete(Platform_Sensors);
    await db.delete(Platform_list);
    await db.delete(Effector_pKill);
    await db.delete(Scenario_entities);
    await db.delete(Scenarios_list);
    await db.delete(MOEs);
    await db.delete(Entity_waypoints);
}

export async function importDataSourcing() {
    for (const row of datasourcing.default) {
        await db.insert(Data_sourcing).values({Section: row.Section, Worksheet: row.Worksheet, Header: row.Header, Difficulty_to_obtain: row["Difficulty to obtain"], Source: row.Source, Notes: row.Notes, Platforms: row.Platforms, Sensors: row.Sensors, Effectors: row.Effectors});
    }
}

export async function importEffectorPkill() {
    for (const row of effectorpkill.default) {
        await db.insert(Effector_pKill).values({Effector: row.Effector, Platform: row.Platform, pKill_timestep: row["pKill / timestep"], Effector_in_list: row["Effector in list?"], Platform_in_list: row["Platform in list?"]});
    }
}

export async function importEffectorsList() {
    for (const row of effectorslist.default) {
        await db.insert(Effectors_list).values({Effector: row.Effector, Max_Range_km: row["Max Range (km)"], Optimum_Range_km: row["Optimum Range (km)"], Ammo: row.Ammo, Effector_pkill_complete: JSON.stringify(row["Effector pkill complete?"])});
    }
}

export async function importEntityWaypoints() {
    for (const row of entitywaypoints.default) {
        await db.insert(Entity_waypoints).values({Scenario_Platform_UID: row.Scenario_Platform_UID, Waypoint_ID: row["Waypoint ID"], Latitude: row.Latitude, Longitude: row.Longitude, Altitude: row.Altitude, Active_stance: row["Active stance"], Wait_time_min: row["Wait time (min)"]});
    }
}

export async function importMoes() {
    for (const row of moes.default) {
        await db.insert(MOEs).values({UID: row.UID, Run_ID: row["Run ID"], MOE_1: row["MOE 1"], MOE_2: row["MOE 2"], MOE_3: row["MOE 3"]});
    }
}

export async function importPlatformEffectors() {
    for (const row of platformeffectors.default) {
        await db.insert(Platform_Effectors).values({Platform: row.Platform, Effector: row.Effector, Platform_in_list: row["Platform in list?"], Effector_in_list: row["Effector in list?"]});
    }
}

export async function importPlatformList() {
    for (const row of platformlist.default) {
        await db.insert(Platform_list).values({Platform: row.Platform, Capacity_pax: row["Capacity (pax)"], Capacity_vehicles: row["Capacity (vehicles)"], Length_m: row["Length (m)"], Width_m: row["Width (m)"], Height_m: row["Height (m)"], Scramble_time_m: row["Scramble time (m)"], Msg_send_delay_min_min: row["Msg send delay min (min)"], Msg_send_delay_ML_min: row["Msg send delay ML (min)"], Msg_send_delay_ax_min: row["Msg send delay max (min)"], Custom_icon: row["Custom icon"], Platform_type: row["Platform type"], Check_properties: row["Check properties"]});
    }
}

export async function importPlatformProperties() {
    for (const row of platformproperties.default) {
        await db.insert(Platform_Properties).values({Platform: row.Platform, Sea_state: row["Sea state"], Speed_kts: row["Speed (kts)"], Patrol_speed_kts: row["Patrol speed (kts)"], Range_km: row["Range (km)"], Signature_EO: row["Signature (EO)"], Signature_Radar: row["Signature (Radar)"], Signature_Aural: row["Signature (Aural)"], Unload_time_mins: row["Unload time (mins)"], Platform_Sea_State: row["Platform_Sea State"], Platform_in_list: JSON.stringify(row["Platform in list?"])});
    }
}

export async function importPlatformSensors() {
    for (const row of platformsensors.default) {
        await db.insert(Platform_Sensors).values({Platform: row.Platform, Sensor: row.Sensor, Platform_Sensor: row.Platform_Sensor, Sensor_in_list: JSON.stringify(row["Sensor in list?"])});
    }
}

export async function importScenarioEntities() {
    for (const row of scenarioentities.default) {
        await db.insert(Scenario_entities).values({Scenario: row.Scenario, Platform: row.Platform, Colour: row.Colour, Spoofed: JSON.stringify(row.Spoofed), Stance: row.Stance, Custom_Icon: row["Custom icon"], UID: row.UID, Platform_UID: row.Platform_UID, Scenario_Platform_UID: row.Scenario_Platform_UID});
    }
}

export async function importScenariosList() {
    for (const row of scenarioslist.default) {
        await db.insert(Scenarios_list).values({Scenario: row.Scenario, Seastate: row["Sea state"], Degraded_comms: JSON.stringify(row["Degraded comms"]), Simulation_timestep_minutes: row["Simulation timestep (minutes)"], Required_loiter_hrs: row["Required loiter (hrs)"]});
    }
}

export async function importSensorsList() {
    for (const row of sensorslist.default) {
        await db.insert(Sensors_list).values({Sensor: row.Sensor, Detection_radius_km: row["Detection radius (km)"], Optimum_detection_radius_km: row["Optimum detection radius (km)"], Detection_type: row["Detection type"]});
    }
}