CREATE TABLE IF NOT EXISTS "Platform list" (
    "Platform" VARCHAR(1000),
    "Capacity (pax)" SMALLINT,
    "Capacity (vehicles)" SMALLINT,
    "Length (m)" REAL,
    "Width (m)" REAL,
    "Height (m)" REAL,
    "Scramble time (m)" REAL,
    "Msg send delay min (min)" REAL,
    "Msg send delay ML (min)" REAL,
    "Msg send delay max (min)" REAL,
    "Custom icon" VARCHAR(1000),
    "Platform type" VARCHAR(1000),
    "Check properties" REAL
);

CREATE TABLE IF NOT EXISTS "Platform properties" (
    "Platform" VARCHAR(1000),
    "Sea state" REAL,
    "Speed (kts)" REAL,
    "Patrol speed (kts)" REAL,
    "Range (km)" REAL,
    "Signature (EO)" REAL,
    "Signature (Radar)" REAL,
    "Signature (Aural)" REAL,
    "Unload time (mins)" REAL,
    "Platform_Sea State" VARCHAR(1000),
    "Platform in list?" VARCHAR(5)
);

CREATE TABLE IF NOT EXISTS "Sensors list" (
    "Sensor" VARCHAR(1000),
    "Detection radius (km)" REAL,
    "Optimum detection radius (km)" REAL,
    "Detection type" VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS "Platform Sensors" (
    "Platform" VARCHAR(1000),
    "Sensor" VARCHAR(1000),
    "Platform_Sensor" VARCHAR(1000),
    "Sensor in list?" VARCHAR(5)
);

CREATE TABLE IF NOT EXISTS "Effectors list" (
    "Effector" VARCHAR(1000),
    "Max Range (km)" REAL,
    "Optimum Range (km)" REAL,
    "Ammo" REAL,
    "Effector pkill complete?" VARCHAR(5)
);

CREATE TABLE IF NOT EXISTS "Platform Effectors" (
    "Platform" VARCHAR(1000),
    "Effector" VARCHAR(1000),
    "Platform in list?" VARCHAR(5),
    "Effector in list?" VARCHAR(5)
);

CREATE TABLE IF NOT EXISTS "Effector pKill" (
    "Effector" VARCHAR(1000),
    "Platform" VARCHAR(1000),
    "pKill / timestep" REAL,
    "Effector in list?" VARCHAR(5),
    "Platform in list?" VARCHAR(5)
);

CREATE TABLE IF NOT EXISTS "Scenarios list" (
    "Scenario" VARCHAR(1000),
    "Sea state" REAL,
    "Degraded comms" VARCHAR(5),
    "Simulation timestep (minutes)" REAL,
    "Required loiter (hrs)" REAL
);

CREATE TABLE IF NOT EXISTS "Scenario entities" (
    "Scenario" VARCHAR(1000),
    "Platform" VARCHAR(1000),
    "Colour" VARCHAR(50),
    "Spoofed" VARCHAR(5),
    "Stance" VARCHAR(1000),
    "Custom icon" VARCHAR(1000),
    "UID" REAL,
    "Platform_UID" VARCHAR(1000),
    "Scenario_Platform_UID" VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS "Entity waypoints" (
    "Scenario_Platform_UID" VARCHAR(1000),
    "Waypoint ID" REAL,
    "Latitude" REAL,
    "Longitude" REAL,
    "Altitude" REAL,
    "Active stance" VARCHAR(1000),
    "Wait time (min)" REAL
);

CREATE TABLE IF NOT EXISTS "MOEs" (
    "UID" REAL,
    "Run ID" REAL,
    "MOE 1" REAL,
    "MOE 2" REAL,
    "MOE 3" REAL
);

CREATE TABLE IF NOT EXISTS "Data sourcing" (
    "Section" VARCHAR(1000),
    "Worksheet" VARCHAR(1000),
    "Header" VARCHAR(1000),
    "Difficulty to obtain" VARCHAR(1000),
    "Source" VARCHAR(1000),
    "Notes" VARCHAR(1000),
    "Platforms" VARCHAR(1),
    "Sensors" VARCHAR(1),
    "Effectors" VARCHAR(1)
);