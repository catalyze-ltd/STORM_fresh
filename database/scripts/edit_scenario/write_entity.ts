import * as scenarioEntitiesJson from "../../JSON_Data/Scenario entities.json" with { type: 'json' };
import * as entityWaypointsJson from "../../JSON_Data/Entity waypoints.json" with { type: 'json' };

////////////////////////////////////////////////////////
//          Write entity to PostgreSQL server         //
////////////////////////////////////////////////////////

let entities = [];
let waypoints = [];

export default function writeEntityToExcel(newEntity) {
    entities = scenarioEntitiesJson.default;
    entities.push(newEntity);

    waypoints = entityWaypointsJson.default;
    waypoints.push({"Scenario_Platform_UID": newEntity["Scenario_Platform_UID"], "Waypoint ID": 1, "Latitude": 0, "Longitude": 0, "Altitude": 0});

    console.log("Writing entities: " + JSON.stringify(entities));
    console.log("Writing waypoints: " + JSON.stringify(waypoints));
}

// NOTE: Need to update 'Scenario entities' with (entities).
// NOTE: Need to update 'Entity waypoints' with (waypoints). 