import * as scenarioEntitiesData from "../database/JSON_Data/Scenario entities.json" with { type: "json" };

function EditScenario_Sidebar() {

    const platformUID = [];
    let platformUidTable = []

    //////////////////////////////////////////////////////////////////////////
    //                  Importing JSON data to dropdown list                //
    //////////////////////////////////////////////////////////////////////////

    for (let i=0; i<scenarioEntitiesData.default.length; i++) {
        platformUID.push(scenarioEntitiesData.default[i].Platform_UID);
        }

    return(
        <div>
            <h3>Edit scenario</h3>
            <hr />
            <h4>Toggle display</h4>
            <div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked1" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked1">Other blue entities</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked2" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked2">Other red entities</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked3" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked3">Other neutral entities</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked4" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked4">Other unknown entities</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked5" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked5">Radar circles</label>
                </div>
            </div>
            <hr />
            <h4>Entity</h4>
            <div className="dropdown d-grid border rounded-2">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input type="text" id="platformuid-list-placeholder" placeholder="Select..." className="col-11 border-0"/>
                </button>
                <div className="dropdown-menu col-12" aria-labelledby="dropdownMenuButton">
                    {[...new Set(platformUID)].map((item, index) => {
                            return(
                                <button className="dropdown-item" onClick={(event: Event) => {
                                    const { target } = event 
                                    if (target) (document.getElementById("platformuid-list-placeholder") as HTMLInputElement).value = (target as HTMLButtonElement).innerHTML;
                                    platformUidTable = [];
                                    for (let i=0; i<scenarioEntitiesData.default.length; i++) {
                                        if (scenarioEntitiesData.default[i].Platform === (target as HTMLButtonElement).innerHTML) {
                                            const tableContent = Object.values(scenarioEntitiesData.default[i]);
                                            for (let i=1; i<tableContent.length; i++) {
                                                platformUidTable.push([Object.keys(scenarioEntitiesData.default[0])[i], tableContent[i]]);
                                            }
                                        }
                                    }
                                    if (document.getElementById("platform-table-body") !== null) {
                                        document.getElementById("platform-table-body")!.innerHTML = platformUidTable.map((value, index) => {return ('<tr key=' + index + '><td>' + value[0] + '</td><td>' + value[1] + '</td></tr>')}).join("");
                                    }
                            }} key={index} >{item}</button>
                        )
                    })}
                </div>
            </div>
            <hr />
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Waypoint altitude</span>
                </div>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder="0" />
            </div>
            <div className="d-flex justify-content-between">
                <button>New</button>
                <button>Edit</button>
                <button>Save</button>
                <button>Delete</button>
            </div>
        </div>
    );
}

export default EditScenario_Sidebar;