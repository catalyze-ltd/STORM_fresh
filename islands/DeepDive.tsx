// import DeepDiveMap from "./DeepDiveMap.tsx";
import DeepDiveSidebar from "./DeepDiveSidebar.tsx";

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
                        <div className="col-9 bg-secondary">
                            <div>
                                {/* <DeepDiveMap /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeepDive;