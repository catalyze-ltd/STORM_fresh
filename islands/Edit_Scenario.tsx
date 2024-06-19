import Edit_Scenario_Sidebar from "./Edit_Scenario_Sidebar.tsx";
// import Edit_Scenario_Map from "./Edit_Scenario_Map.tsx";

function Edit_Scenario() {
    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <Edit_Scenario_Sidebar />
                            </div>
                        </div>
                        <div className="col-9 bg-secondary">
                            <div>
                                {/* <Edit_Scenario_Map /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit_Scenario;