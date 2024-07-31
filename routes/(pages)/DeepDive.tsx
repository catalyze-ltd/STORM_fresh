import DeepDiveMap from "../../islands/DeepDiveMap.tsx";
import DeepDiveSidebar from "../../islands/DeepDiveSidebar.tsx";

function DeepDive() {
    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <DeepDiveSidebar />
                            </div>
                        </div>
                        <div className="col-9">
                            <div style="border: 1px solid black;">
                                <DeepDiveMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeepDive;