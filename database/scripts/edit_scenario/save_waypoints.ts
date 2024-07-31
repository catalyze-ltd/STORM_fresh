import * as scenarioEntitiesJson from "../../JSON_Data/Scenario entities.json" with { type: 'json' };
import writeWaypointsToExcel from "./write_waypoints.ts";
import refreshMapData from "./refresh_map.ts";
import * as currentScenarioData from "../../temp/currentScenario.json" with { type:'json' };

///////////////////////////////////////////////////////////
//          Write waypoints to PostgreSQL server         //
///////////////////////////////////////////////////////////

const markersNew: number[][] = [];
const currentScenario = currentScenarioData.default[0]
    
export default function saveWaypointsCallback(entity: string) {
    if (currentScenarioData.default.length !== 0) {
    const scenarioPlatformUID = scenarioEntitiesJson.default.filter((row) => row.Platform_UID === entity)[0].Scenario_Platform_UID;
    writeWaypointsToExcel(scenarioPlatformUID, markersNew);
    const [markersUnselected, polylines, centre, zoom] = refreshMapData();
    const mapLayer = [...markersUnselected, ...polylines];
    const statusMessage = 'Waypoints for entity ' + entity + ' saved for scenario ' + currentScenario;
    return [mapLayer, statusMessage, centre, zoom];
    }
}