import EditScenarioSidebar from "../../islands/EditScenarioSidebar.tsx";
import EditScenarioMap from "../../islands/EditScenarioMap.tsx";

function EditScenario() {

    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <EditScenarioSidebar />
                            </div>
                        </div>
                        <div className="col-9">
                            <div>
                                <EditScenarioMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditScenario;