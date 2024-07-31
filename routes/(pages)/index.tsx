import Overview from "./Overview.tsx"
import EditScenario from "./EditScenario.tsx";
import RunBatch from "./RunBatch.tsx";
import DeepDive from "./DeepDive.tsx";
import setup from "../../database/scripts/app/setup.ts";

const data = setup();

export function mapData() {
    return data;
}

function Index() {
    
    return (
        <div className="tab-content" id="navTabContent">
            <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                <Overview />
            </div>
            <div className="tab-pane fade" id="edit-scenario" role="tabpanel" aria-labelledby="edit-scenario-tab">
                <EditScenario />
            </div>
            <div className="tab-pane fade" id="run-batch" role="tabpanel" aria-labelledby="run-batch-tab">
                <RunBatch />
            </div>
            <div className="tab-pane fade" id="deep-dive" role="tabpanel" aria-labelledby="deep-dive-tab">
                <DeepDive />
            </div>
        </div>
    );
}

export default Index;