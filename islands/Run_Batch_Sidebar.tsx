function Run_Batch_Sidebar() {
    return(
        <div>
            <h3>Batch run</h3>
            <hr />
            <p>Select number of runs</p>
            <input id="batch-run-1" type="text" placeholder="100" />
            <p>Select number of timesteps per run</p>
            <input id="batch-run-2" type="text" placeholder="200" />
            <hr />
            <button>Run batch</button>
        </div>
    );
}

export default Run_Batch_Sidebar;