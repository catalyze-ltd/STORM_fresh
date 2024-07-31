
//////////////////////////////////////////////////////////////////////////////
//          Calculates map centre and zoom level based on waypoints         //
//////////////////////////////////////////////////////////////////////////////

export default function calculateMapStartPosition(markers: { position: number[]; platform_uid: string; icon: string; colour: string; }[]) {
    let zoom;
    let min_lat = 90;
    let max_lat = -90;
    let min_lon = 180;
    let max_lon = -180;
    markers.forEach((marker) => {
        marker.position[0] > min_lat || (min_lat = marker.position[0]);
        marker.position[0] < max_lat || (max_lat = marker.position[0]);
        marker.position[1] > min_lon || (min_lon = marker.position[1]);
        marker.position[1] < max_lon || (max_lon = marker.position[1]);
    });

    const centre_lat = (min_lat + max_lat)/2;
    const centre_lon = (min_lon + max_lon)/2;

    ((max_lat - min_lat) > (max_lon - min_lon)) ? zoom = Math.log2(360 / (max_lat - min_lat)) : zoom = Math.log2(360 / (max_lon - min_lon));

    return [centre_lat, centre_lon, zoom];
}