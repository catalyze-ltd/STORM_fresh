import * as scenarioEntitiesJson from "../../JSON_Data/Scenario entities.json" with { type: 'json' };
import * as entityWaypointsJson from "../../JSON_Data/Entity waypoints.json" with { type: 'json' };
import * as currentScenario from "../../temp/currentScenario.json" with { type: 'json' };
 
///////////////////////////////////////////////////////////////////////
//          Load waypoint data from selected scenario to map         //
///////////////////////////////////////////////////////////////////////

export default function loadWaypointData() {
    const polylines: { positions: number[][]; colour: string; weight: number; opacity: number; }[] = [];
    let scenarioName : string;
    const markers: { position: number[]; platform_uid: string; icon: string; colour: string; }[] = [];
    if (currentScenario.default[0].scenarioName === '') {
        scenarioName = "No scenario loaded"
    } else {
        scenarioName = currentScenario.default[0].scenarioName;
    }
    const scenarioEntitiesDF = scenarioEntitiesJson.default.filter((row) => row['Scenario'] === scenarioName);


    scenarioEntitiesDF.forEach((scenario) => {
        const platformUID = scenario['Platform_UID'];
        const scenarioPlatformUID = scenario['Scenario_Platform_UID'];
        const customIcon = scenario['Custom icon'];
        const entityWaypoints = entityWaypointsJson.default.filter((row) => row['Scenario_Platform_UID'] === scenarioPlatformUID);
        const plWaypoints : number[][] = [];
        entityWaypoints.forEach((row) => plWaypoints.push([row['Latitude'], row['Longitude']]));
        markers.push({"position": plWaypoints[0], "platform_uid": platformUID, "icon": customIcon, "colour": "grey"});
        polylines.push({"positions": plWaypoints, "colour": "grey", "weight": 3, "opacity": 0.5});
    });

    return [markers, polylines];
}

// NOTE: Add marker colours to line 24
// NOTE: Add correct colours to line 25