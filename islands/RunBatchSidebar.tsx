import runBatch from "../database/scripts/moes/setup.ts";

function RunBatchSidebar() {
    return(
        <div>
            <h3>Batch run</h3>
            <hr />
            <p>Select number of runs</p>
            <input id="batch-run-1" type="text" placeholder="100" value="100" />
            <p>Select number of timesteps per run</p>
            <input id="batch-run-2" type="text" placeholder="200" value="100" />
            <hr />
            <button onClick={() => runBatch()}>Run batch</button>
        </div>
    );
}

export default RunBatchSidebar;