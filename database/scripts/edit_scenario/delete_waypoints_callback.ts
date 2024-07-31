import * as scenarioEntitiesJson from "../../JSON_Data/Scenario entities.json" with { type: 'json' };
import deleteWaypointsFromExcel from "./delete_waypoints.ts";
import refreshMapData from "./refresh_map.ts";

let markersUnselected;
let polylines;
let zoom;
let centre;
const currentScenario = {
    'Scenario': '', 
    'Sea state': '',
    'Degraded comms': '', 
    'Simulation timestep (minutes)': ''
    }

function deleteWaypointsCallback(entity: string) {
    if (currentScenario.Scenario !== '') {
        const scenarioPlatformUID = scenarioEntitiesJson.default.filter((row) => row.Platform_UID === entity)[0].Scenario_Platform_UID;
        deleteWaypointsFromExcel(scenarioPlatformUID);
        [markersUnselected, polylines, centre, zoom] = refreshMapData();
        const mapLayer = [...markersUnselected, ...polylines];
        const statusMessage = 'Waypoints for entity ' + entity + ' deleted for scenario ' + currentScenario;
        return [mapLayer, statusMessage, centre, zoom];
    }
}

export default deleteWaypointsCallback