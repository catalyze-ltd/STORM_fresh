import * as scenarioListData from "../database/JSON_Data/Scenarios list.json" with { type: "json" };
import * as scenarioEntitiesData from "../database/JSON_Data/Scenario entities.json" with { type: "json" };
import * as platformListData from "../database/JSON_Data/Platform list.json" with { type: "json" };

function OverviewSidebar() {

    let platformTable = [];
    let orbatTable : string[][] = [];
    const scenario : string[] = [];
    const platform : string[] = [];

    //////////////////////////////////////////////////////////////////////////
    //                  Importing JSON data to dropdown list                //
    //////////////////////////////////////////////////////////////////////////

    for (let i=0; i<scenarioListData.default.length; i++) {
        scenario.push(scenarioListData.default[i].Scenario);
        }

    for (let i=0; i<scenarioEntitiesData.default.length; i++) {
        platform.push(scenarioEntitiesData.default[i].Platform);
        }

    //////////////////////////////////////////////////////////////////////////
    //                 Initialising the overview interface                  //
    //////////////////////////////////////////////////////////////////////////

    return(
        <div>
            <h3>Setup</h3>
            <hr />
            <h4>Scenario list</h4>
            <div className="dropdown d-grid border rounded-2">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input type="text" id="scenario-list-placeholder" placeholder="Select..." className="col-11 border-0"/>
                </button>
                <div className="dropdown-menu col-12" id="scenario" aria-labelledby="dropdownMenuButton">
                    {scenario.map((item, index) => {
                        return(
                            <button className="dropdown-item" onClick={(event: Event) => {
                                const { target } = event 
                                if (target) (document.getElementById("scenario-list-placeholder") as HTMLInputElement).value = (target as HTMLButtonElement).innerHTML;
                            }} key={index} >{item}</button>
                        )
                    })}
                </div>
            </div>
            <button onClick={() => {
                orbatTable = [];
                for (let i=0; i<scenarioEntitiesData.default.length; i++) {
                    if (scenarioEntitiesData.default[i].Scenario === (document.getElementById("scenario-list-placeholder") as HTMLInputElement).value) {
                        orbatTable.push([scenarioEntitiesData.default[i].Platform, scenarioEntitiesData.default[i].Colour]);
                    }
                }
                console.log(orbatTable);
                if (document.getElementById("orbat-table-body") !== null) {
                    document.getElementById("orbat-table-body")!.innerHTML = orbatTable.map((value, index) => {return ('<tr key=' + index + '><td>' + value[0] + '</td><td>' + value[1] + '</td></tr>')}).join("");
                }
            }}>
                Load scenario
            </button>
            <hr />
            <h4>ORBAT</h4>
            <div id="orbat-table">
                <table className="table table-bordered">
                    <thead>
                        <tr className="table-secondary">
                            <th scope="col">Platform</th>
                            <th scope="col">Colour</th>
                        </tr>
                    </thead>
                    <tbody id="orbat-table-body">
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>Platform details</h4>
            <div className="dropdown d-grid border rounded-2">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input type="text" id="platform-list-placeholder" placeholder="Select..." className="col-11 border-0"/>
                </button>
                <div className="dropdown-menu col-12" aria-labelledby="dropdownMenuButton">
                    {[...new Set(platform)].map((item, index) => {
                            return(
                                <button className="dropdown-item" onClick={(event: Event) => {
                                    const { target } = event 
                                    if (target) (document.getElementById("platform-list-placeholder") as HTMLInputElement).value = (target as HTMLButtonElement).innerHTML;
                                    platformTable = [];
                                    for (let i=0; i<platformListData.default.length; i++) {
                                        if (platformListData.default[i].Platform === (target as HTMLButtonElement).innerHTML) {
                                            const tableContent = Object.values(platformListData.default[i]);
                                            for (let i=1; i<tableContent.length; i++) {
                                                platformTable.push([Object.keys(platformListData.default[0])[i], tableContent[i]]);
                                            }
                                        }
                                    }
                                    if (document.getElementById("platform-table-body") !== null) {
                                        document.getElementById("platform-table-body")!.innerHTML = platformTable.map((value, index) => {return ('<tr key=' + index + '><td>' + value[0] + '</td><td>' + value[1] + '</td></tr>')}).join("");
                                    }
                            }} key={index} >{item}</button>
                        )
                    })}
                </div>
            </div>
            <table className="table table-bordered">
            <tbody id="platform-table-body">
            </tbody>
            </table>
        </div>
    );
    }

export default OverviewSidebar;