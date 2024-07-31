import * as entityWaypointsJson from "../../JSON_Data/Entity waypoints.json" with { type: 'json' };

//////////////////////////////////////////////////////////////
//          Delete waypoints from PostgreSQL server         //
//////////////////////////////////////////////////////////////

export default function deleteWaypointsFromExcel(scenarioPlatformUID : string) {
    const dfOld = entityWaypointsJson.default.filter((row) => row['Scenario_Platform_UID'] !== scenarioPlatformUID);

    // await updateEntityWaypoints(JSON.stringify(dfOld));
}

// NOTE: Need to write (dfOld) to PostgreSQL server and refresh on server side.