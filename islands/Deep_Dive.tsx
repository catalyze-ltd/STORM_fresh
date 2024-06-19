// import Deep_Dive_Map from "./Deep_Dive_Map.tsx";
import Deep_Dive_Sidebar from "./Deep_Dive_Sidebar.tsx";

function Deep_Dive() {
    return(
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <Deep_Dive_Sidebar />
                            </div>
                        </div>
                        <div className="col-9 bg-secondary">
                            <div>
                                {/* <Deep_Dive_Map /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Deep_Dive;