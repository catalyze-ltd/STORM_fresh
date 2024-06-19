import Overview from "../islands/Overview.tsx";
import Edit_Scenario from "../islands/Edit_Scenario.tsx";
import Run_Batch from "../islands/Run_Batch.tsx";
import Deep_Dive from "../islands/Deep_Dive.tsx";
import Logo from "../components/Logo.tsx";

    function Layout() {
        return(
            <>
            <header className="container-fluid mt-2 mb-4 border-bottom bg-light">
            <div className="d-flex justify-content-between">
                <div>
                <a href="https://www.catalyzeconsulting.com">
                <Logo />
                </a>
                    <span className="px-3 fs-5 text-dark">STORM</span>
                </div>

                <div>
                <ul className="nav nav-tabs" id="navTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                            <button className="nav-link active text-dark text-decoration-none" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" role="tab" aria-controls="overview" aria-selected="true">
                                Overview
                            </button>
                    </li>
                    <li className="nav-item" role="presentation">
                            <button className="nav-link text-dark text-decoration-none" id="edit-scenario-tab" data-bs-toggle="tab" data-bs-target="#edit-scenario" role="tab" aria-controls="edit-scenario" aria-selected="false">
                                Edit Scenario
                            </button>
                    </li>
                    <li className="nav-item" role="presentation">
                            <button className="nav-link text-dark text-decoration-none" id="run-batch-tab" data-bs-toggle="tab" data-bs-target="#run-batch" role="tab" aria-controls="run-batch" aria-selected="false">
                                Run Batch
                            </button>
                    </li>
                    <li className="nav-item" role="presentation">
                            <button className="nav-link text-dark text-decoration-none" id="deep-dive-tab" data-bs-toggle="tab" data-bs-target="#deep-dive" role="tab" aria-controls="deep-dive" aria-selected="false">
                                Deep-dive
                            </button>
                    </li>
                </ul>
                </div>
                </div>
            </header>

            <div className="tab-content" id="navTabContent">
                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                    <Overview />
                </div>
                <div className="tab-pane fade" id="edit-scenario" role="tabpanel" aria-labelledby="edit-scenario-tab">
                    <Edit_Scenario />
                </div>
                <div className="tab-pane fade" id="run-batch" role="tabpanel" aria-labelledby="run-batch-tab">
                    <Run_Batch />
                </div>
                <div className="tab-pane fade" id="deep-dive" role="tabpanel" aria-labelledby="deep-dive-tab">
                    <Deep_Dive />
                </div>
            </div>
            </>
        );
    }  

export default Layout;