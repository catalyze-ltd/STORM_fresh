import * as entityWaypointsJson from "../../JSON_Data/Entity waypoints.json" with { type: 'json' };

///////////////////////////////////////////////////////////
//          Write waypoints to PostgreSQL server         //
///////////////////////////////////////////////////////////
    
export default function writeWaypointsToExcel(scenarioPlatformUID: string, waypointsDF: number[][]) {
    const dfNew: { Scenario_Platform_UID: string; "Waypoint ID": number; Latitude: number; Longitude: number; Altitude: number; "Active stance": string; "Wait time (min)": string; }[] = [];
    waypointsDF.forEach((marker: number[], index: number) => dfNew.push({
        "Scenario_Platform_UID": scenarioPlatformUID, 
        "Waypoint ID": index + 1, 
        "Latitude": marker[0], 
        "Longitude": marker[1], 
        "Altitude": marker[2], 
        "Active stance": "", 
        "Wait time (min)": ""
    }));

    const dfOld = entityWaypointsJson.default.filter((row) => row['Scenario_Platform_UID'] !== scenarioPlatformUID);

    // await updateEntityWaypoints(JSON.stringify([...dfOld, ...dfNew]));
}

// NOTE: Need to save [...dfOld, ...dfNew] to PostgreSQL server and then refresh on server side