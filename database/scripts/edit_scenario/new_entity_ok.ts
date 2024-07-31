import * as scenarioEntitiesJson from "../../JSON_Data/Scenario entities.json" with { type: 'json' };
import * as platformListJson from "../../JSON_Data/Platform list.json" with { type: 'json' };
import writeEntityToExcel from "./write_entity.ts";
import refreshMapData from "./refresh_map.ts";
import { handleScenarioClick } from "../../../islands/OverviewSidebar.tsx";

async function newEntityOk(platform: string, colour: string, spoofed: string, stance: string) {
    const [currentScenario, entityData, scenario_name, TIMESTEP_MINUTES, defaults] = handleScenarioClick();
    if (scenario_name !== 'No scenario loaded') {
    const icon = platformListJson.default.filter((row) => row.Platform === platform)[0]['Custom icon'];
    let maxUID = 0;
    scenarioEntitiesJson.default.forEach((row) => {(maxUID > row.UID) || (maxUID = row.UID)});
    const platformUID = platform + '_' + String(maxUID + 1);
    const scenarioPlatformUID = scenario_name + '_' + platformUID;
    const newEntity = {"Scenario": scenario_name, "Platform": platform, "Colour": colour, "Spoofed": spoofed, "Stance": stance, "Custom icon": icon, "UID": maxUID + 1, "Platform_UID": platformUID, "Scenario_Platform_UID": scenarioPlatformUID};
    await writeEntityToExcel(newEntity);

    const [app_markersUnselected, app_polylines, app_centre, app_zoom] = refreshMapData();
    const mapLayer = [...app_markersUnselected, ...app_polylines];
    const statusMessage = 'New entity added';
    return [mapLayer, statusMessage, app_centre, app_zoom];
    }
}

export default newEntityOk;