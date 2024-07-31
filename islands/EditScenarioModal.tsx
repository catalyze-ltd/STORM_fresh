import * as platformList from "../database/JSON_Data/Platform list.json" with { type: 'json' };
import newEntityOk from "../database/scripts/edit_scenario/new_entity_ok.ts";

function EditScenarioModal() {

    let spoofed = 'FALSE';

    return (
        <div class="modal fade" role="dialog" tabindex={-1} id="editscenariomodalcard" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="myModalLabel">Add new entity</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3>Entity type</h3>
                    <div className="dropdown d-grid border rounded-2">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <input type="text" id="editscenariomodal-platform-list" placeholder="Select..." className="col-11 border-0"/>
                        </button>
                        <div className="dropdown-menu col-12" id="platform-list-modal" aria-labelledby="dropdownMenuButton">
                            {platformList.default.map((row, index: number) => {
                                return(
                                    <button className="dropdown-item" onClick={(event: Event) => {
                                        const { target } = event 
                                        if (target) (document.getElementById("editscenariomodal-platform-list") as HTMLInputElement).value = (target as HTMLButtonElement).innerHTML;
                                    }} key={index} >{row.Platform}</button>
                                )
                            })}
                        </div>
                    </div>
                    <br />
                    <h3>Entity colour</h3>
                    <div className="dropdown d-grid border rounded-2">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <input type="text" id="editscenariomodal-entity-colour" placeholder="Select..." className="col-11 border-0"/>
                        </button>
                        <div className="dropdown-menu col-12" id="entity-colour-modal" aria-labelledby="dropdownMenuButton">
                            {["Blue", "Red", "White"].map((item, index) => {
                                return(
                                    <button className="dropdown-item" onClick={(event: Event) => {
                                        const { target } = event 
                                        if (target) (document.getElementById("editscenariomodal-entity-colour") as HTMLInputElement).value = (target as HTMLButtonElement).innerHTML;
                                    }} key={index} >{item}</button>
                                )
                            })}
                        </div>
                    </div>
                    <br />
                    <h3>Spoofed</h3>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="new-entity-spoofed-checklist" onChange={() => {spoofed === 'TRUE' ? spoofed = 'FALSE' : spoofed = 'TRUE'}} />
                        <label className="form-check-label" htmlFor="new-entity-spoofed-checklist">Spoofed</label>
                    </div>
                    <br />
                    <h3>Initial stance</h3>
                    <div className="dropdown d-grid border rounded-2">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <input type="text" id="editscenariomodal-stance" placeholder="Select..." className="col-11 border-0"/>
                        </button>
                        <div className="dropdown-menu col-12" id="stance-modal" aria-labelledby="dropdownMenuButton">
                            {["blue", "red", "white"].map((item, index) => {
                                return(
                                    <button className="dropdown-item" onClick={(event: Event) => {
                                        const { target } = event 
                                        if (target) (document.getElementById("editscenariomodal-stance") as HTMLInputElement).value = (target as HTMLButtonElement).innerHTML;
                                    }} key={index} >{item}</button>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="modal-button-cancel" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                    <button type="button" class="btn btn-primary" id="modal-button-ok" onClick={() => newEntityOk(
                        (document.getElementById('editscenariomodal-platform-list') as HTMLInputElement).value,
                        (document.getElementById('editscenariomodal-entity-colour') as HTMLInputElement).value,
                        spoofed,
                        (document.getElementById('editscenariomodal-stance') as HTMLInputElement).value
                        )}>Ok</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default EditScenarioModal;