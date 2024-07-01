function DeepDiveSidebar() {
    return(
        <div>
            <h3>Deep dive</h3>
            <hr />
            <p>Choose run #</p>
            <input id="deep-dive-input-1" type="text" placeholder="1" />
            <p>Select number of timesteps per run</p>
            <input id="deep-dive-input-2" type="text" placeholder="200" />
            <hr />
            <p>Re-run model based on random seed</p>
            <button>Single run</button>
            <hr />
            <p>Event Log</p>
            <button>Show event log</button>
            <hr />
            <div className="form-check">
                <input className="form-check-input border border-dark" type="checkbox" value="" id="flexCheckDefault 1" />
                <label className="form-check-label" htmlFor="flexCheckDefault 1">
                    Position log output
                </label>
            </div>
        </div>
    );
}

export default DeepDiveSidebar;