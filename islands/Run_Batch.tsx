import Run_Batch_Sidebar from "./Run_Batch_Sidebar.tsx";
// import Run_Batch_MOEs from "./Run_Batch_MOEs.tsx";

function Run_Batch() {
    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <Run_Batch_Sidebar />
                            </div>
                        </div>
                        <div className="col-9 bg-secondary">
                            <div>
                                {/* <Run_Batch_MOEs /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Run_Batch;