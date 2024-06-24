import RunBatchSidebar from "./RunBatchSidebar.tsx";
// import RunBatchMoe from "./RunBatchMoe.tsx";

function RunBatch() {
    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <RunBatchSidebar />
                            </div>
                        </div>
                        <div className="col-9 bg-secondary">
                            <div>
                                {/* <RunBatchMoe /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RunBatch;