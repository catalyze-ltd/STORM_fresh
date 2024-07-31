import { OverviewSidebar } from "../../islands/OverviewSidebar.tsx";
import OverviewMap from "../../islands/OverviewMap.tsx";

function Overview() {

    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <OverviewSidebar />
                            </div>
                        </div>
                        <div className="col-9">
                            <div>
                                <OverviewMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;