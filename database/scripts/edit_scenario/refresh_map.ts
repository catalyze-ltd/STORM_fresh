import loadWaypointData from "./load_waypoints.ts";
import calculateMapStartPosition from "./calculate_map_start.ts";

////////////////////////////////////////////
//          Initialises maps data         //
////////////////////////////////////////////

export default function refreshMapData() {
    const [markers, polylines] = loadWaypointData();
    const [centre_lat, centre_lon, zoom] = calculateMapStartPosition(markers);
    
    return [markers, polylines, [centre_lat, centre_lon], zoom];
}