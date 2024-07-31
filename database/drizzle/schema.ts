import {
  pgTable,
  smallint,
  text,
  real,
} from "drizzle-orm/pg-core";

export const Platform_list = pgTable("Platform list", {
    Platform: text("Platform"),
    Capacity_pax: smallint("Capacity (pax)"),
    Capacity_vehicles: smallint("Capacity (vehicles)"),
    Length_m: real("Length (m)"),
    Width_m: real("Width (m)"),
    Height_m: real("Height (m)"),
    Scramble_time_m: real("Scramble time (m)"),
    Msg_send_delay_min_min: real("Msg send delay min (min)"),
    Msg_send_delay_ML_min: real("Msg send delay ML (min)"),
    Msg_send_delay_ax_min: real("Msg send delay max (min)"),
    Custom_icon: text("Custom icon"),
    Platform_type: text("Platform type"),
    Check_properties: real("Check properties"),
});

export const Platform_Properties = pgTable("Platform properties", {
    Platform: text("Platform"),
    Sea_state: real("Sea state"),
    Speed_kts: real("Speed (kts)"),
    Patrol_speed_kts: real("Patrol speed (kts)"),
    Range_km: real("Range (km)"),
    Signature_EO: real("Signature (EO)"),
    Signature_Radar: real("Signature (Radar)"),
    Signature_Aural: real("Signature (Aural)"),
    Unload_time_mins: real("Unload time (mins)"),
    Platform_Sea_State: text("Platform_Sea State"),
    Platform_in_list: text("Platform in list?"),
});

export const Sensors_list = pgTable("Sensors list", {
    Sensor: text("Sensor"),
    Detection_radius_km: real("Detection radius (km)"),
    Optimum_detection_radius_km: real("Optimum detection radius (km)"),
    Detection_type: text("Detection type"),
});

export const Platform_Sensors = pgTable("Platform Sensors", {
    Platform: text("Platform"),
    Sensor: text("Sensor"),
    Platform_Sensor: text("Platform_Sensor"),
    Sensor_in_list: text("Sensor in list?"),
});

export const Effectors_list = pgTable("Effectors list", {
    Effector: text("Effector"),
    Max_Range_km: real("Max Range (km)"),
    Optimum_Range_km: real("Optimum Range (km)"),
    Ammo: real("Ammo"),
    Effector_pkill_complete: text("Effector pkill complete?"),
});

export const Platform_Effectors = pgTable("Platform Effectors", {
    Platform: text("Platform"),
    Effector: text("Effector"),
    Platform_in_list: text("Platform in list?"),
    Effector_in_list: text("Effector in list?"),
});

export const Effector_pKill = pgTable("Effector pKill", {
    Effector: text("Effector"),
    Platform: text("Platform"),
    pKill_timestep: real("pKill / timestep"),
    Effector_in_list: text("Effector in list?"),
    Platform_in_list: text("Platform in list?"),
});

export const Scenarios_list = pgTable("Scenarios list", {
    Scenario: text("Scenario"),
    Seastate: real("Sea state"),
    Degraded_comms: text("Degraded comms"),
    Simulation_timestep_minutes: real("Simulation timestep (minutes)"),
    Required_loiter_hrs: real("Required loiter (hrs)"),
});

export const Scenario_entities = pgTable("Scenario entities", {
    Scenario: text("Scenario"),
    Platform: text("Platform"),
    Colour: text("Colour"),
    Spoofed: text("Spoofed"),
    Stance: text("Stance"),
    Custom_Icon: text("Custom icon"),
    UID: real("UID"),
    Platform_UID: text("Platform_UID"),
    Scenario_Platform_UID: text("Scenario_Platform_UID"),
});

export const Entity_waypoints = pgTable("Entity waypoints", {
    Scenario_Platform_UID: text("Scenario_Platform_UID"),
    Waypoint_ID: real("Waypoint ID"),
    Latitude: real("Latitude"),
    Longitude: real("Longitude"),
    Altitude: real("Altitude"),
    Active_stance: text("Active stance"),
    Wait_time_min: real("Wait time (min)"),
});

export const MOEs = pgTable("MOEs", {
    UID: real("UID"),
    Run_ID: real("Run ID"),
    MOE_1: real("MOE 1"),
    MOE_2: real("MOE 2"),
    MOE_3: real("MOE 3"),
});

export const Data_sourcing = pgTable("Data sourcing", {
    Section: text("Section"),
    Worksheet: text("Worksheet"),
    Header: text("Header"),
    Difficulty_to_obtain: text("Difficulty to obtain"),
    Source: text("Source"),
    Notes: text("Notes"),
    Platforms: text("Platforms"),
    Sensors: text("Sensors"),
    Effectors: text("Effectors"),
});