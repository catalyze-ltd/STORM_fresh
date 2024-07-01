import setup from "../database/scripts/setup.ts";

setup();

const mapCode = await Deno.readTextFile("map.html");

function OverviewMap() {
    return (
        <iframe srcDoc={mapCode} width="100%" height="600px"></iframe>
    )
}

export default OverviewMap;