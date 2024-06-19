function Edit_Scenario_Sidebar() {
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
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input id="change-entity" placeholder="Select..." className="col-11 border-0" />
                </button>
                <div className="dropdown-menu col-1" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
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

export default Edit_Scenario_Sidebar;