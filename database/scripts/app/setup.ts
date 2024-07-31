// deno-lint-ignore-file no-explicit-any

import * as waypoints from "../../JSON_Data/Entity waypoints.json" with { type: 'json' };
import * as scenarioEntities from "../../JSON_Data/Scenario entities.json" with { type: 'json' };
import * as platformSensors from "../../JSON_Data/Platform Sensors.json" with { type: 'json' };
import * as sensorsList from "../../JSON_Data/Sensors list.json" with { type: 'json' };
import * as platformList from "../../JSON_Data/Platform list.json" with { type: 'json' };
import Logo from "../../../components/Logo.tsx";

function setup() {

const mapCode = [];

const currentScenario = [];
let scenarioName;
currentScenario.length === 0 ? scenarioName = 'No scenario loaded' : scenarioName = currentScenario[0];

const firstWaypoint = waypoints.default.filter((waypoint) => waypoint["Waypoint ID"] === 1);
const markers: { Latitude: number; Longitude: number; popup: string; icon: string; }[] = [];
const circles: { location: number[]; radius: number; colour: string; popup: number; }[] = [];
const polylines: { location: any[]; colour: string; }[] = [];

scenarioEntities.default.forEach((scenario) => {
    const entityWaypoints = waypoints.default.filter((waypoint) => waypoint['Scenario_Platform_UID'] === scenario['Scenario_Platform_UID']);
    const entityStartLatitude : number = entityWaypoints[0].Latitude;
    const entityStartLongitude : number = entityWaypoints[0].Longitude;
    const popup = scenario.Platform;
    const iconSrc = Logo();

    markers.push({"Latitude": entityStartLatitude, "Longitude": entityStartLongitude, "popup": popup, "icon": iconSrc});

    let entitySensors = platformSensors.default.filter((platform) => platform['Platform'] === scenario['Platform'])
    entitySensors.forEach((rowES) => {
        sensorsList.default.forEach((rowSL) => {
            if (rowES.Sensor === rowSL.Sensor) {
                entitySensors = [...entitySensors, {...rowES, ...rowSL}]
                entitySensors.shift();
            }
        });
    });
    
    if (entitySensors.length > 0) {
        let maxSensorRange : number = 0;
        entitySensors.forEach((row) => {if (row['Detection radius (km)'] > maxSensorRange) {maxSensorRange = row['Detection radius (km)'];}});
        entitySensors.forEach((row) => {if (row['Detection radius (km)'] === maxSensorRange) {entitySensors = row;}});
        if (entitySensors['Detection type'] === 'Radar') {
            const entityHeight = platformList.default.find((row) => row.Platform === scenario.Platform)?.["Height (m)"];
            const entityAltitude: number = entityWaypoints[0].Altitude;
            const earthRadius : number = 6371000;
            const radarHorizon : number = Math.sqrt(2*(entityAltitude + entityHeight)*(4*earthRadius/3+entityAltitude**2));
            maxSensorRange = Math.min(radarHorizon, (maxSensorRange*1000));
        }
        circles.push({"location": [entityStartLatitude, entityStartLongitude], "radius": maxSensorRange, "colour": scenario.Colour, "popup": (maxSensorRange/1000)});
    }
    const polylineWaypoints: number[][] = [];
    entityWaypoints.forEach((row) => polylineWaypoints.push([row.Latitude, row.Longitude]))
    polylines.push({"location": polylineWaypoints, "colour": scenario.Colour});
});

const allWaypoints: number[][] = [];
waypoints.default.forEach((row) => allWaypoints.push([row.Latitude, row.Longitude]));

mapCode.push(`var map = L.map('map', {center: [64.451589, 10.477454], zoom: 10}); L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);`);
markers.forEach((marker) => mapCode.push("L.marker([" + marker.Latitude + ", " + marker.Longitude + "], {icon: L.icon({iconUrl:'" + marker.icon + "'})}).addTo(map);"));
circles.forEach((circle) => mapCode.push("L.circle([" + circle.location[0] + ", " + circle.location[1] + "], {color:'" + circle.colour + "', radius:" + circle.radius + ", fill: false, weight: 1.5, fillOpacity: 1}).addTo(map);"));
polylines.forEach((polyline) => mapCode.push("L.polyline(" + JSON.stringify(polyline.location) + ", {color: '" + polyline.colour + "'}).addTo(map);"));
mapCode.push("map.fitBounds(" + JSON.stringify(allWaypoints) + ");");
let mapCodeText = "";
for (let i=0; i<mapCode.length; i++) {
    mapCodeText = mapCodeText.concat(mapCode[i]);
}

return mapCodeText;

}

export default setup;