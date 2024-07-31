function RunBatchMoe() {

const unminifiedCode = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
            <script src="https://cdn.plot.ly/plotly-2.34.0.min.js" charset="utf-8"></script>
        </head>
        <body>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-5">
                        <div id="bar-chart-1"></div>
                    </div>
                    <div class="col-5">
                        <div id="bar-chart-2"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5">
                        <div class="card text-white bg-secondary rounded-3" style="border 1px solid rgba(89, 96, 103, 1)">
                            <div class="card-body">
                                <h5 class="card-title" id="MOE1-title">MOE 1</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="card text-white bg-secondary rounded-3" style="border 1px solid rgba(89, 96, 103, 1)">
                            <div class="card-body">
                                <h5 class="card-title" id="MOE2-title">MOE 2</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5">
                        <div class="card text-white bg-secondary rounded-3" style="border 1px solid rgba(89, 96, 103, 1)">
                            <div class="card-body">
                                <h5 class="card-title">Successful deployment of people/assets</h5>
                                <p class="card-text">Probability of unloading [100%/80%/60%/40%/20%] troops/assets with no loss</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="card text-white bg-secondary rounded-3" style="border 1px solid rgba(89, 96, 103, 1)">
                            <div class="card-body">
                                <h5 class="card-title">Deploy undetected</h5>
                                <p class="card-text">Probability of individual LCs arriving at beach undetected. If 4 LCs are launched, and 3 are detected, then MOE 2 = 25%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5">
                        <div id="bar-chart-3"></div>
                    </div>
                    <div class="col-5">
                        <div id="bar-chart-4"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5">
                        <div class="card text-white bg-secondary rounded-3" style="border 1px solid rgba(89, 96, 103, 1)">
                            <div class="card-body">
                                <h5 class="card-title" id="MOE3-title">MOE 3</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="card text-white bg-secondary rounded-3" style="border 1px solid rgba(89, 96, 103, 1)">
                            <div class="card-body">
                                <h5 class="card-title" id="MOE4-title">MOE 4</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5">
                        <div class="card text-white bg-secondary rounded-3" style="border 1px solid rgba(89, 96, 103, 1)">
                            <div class="card-body">
                                <h5 class="card-title">Landing craft survival post-deployment</h5>
                                <p class="card-text">Probability of survival of LC for a user-defined number of hours after Phase 1, in specified areas near unloading location</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="card text-white bg-secondary rounded-3" style="border 1px solid rgba(89, 96, 103, 1)">
                            <div class="card-body">
                                <h5 class="card-title">Average time at sea</h5>
                                <p class="card-text">Average time troops spent at sea before landing to inform on troop condition at landing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            <script>
                const layout1 = {xaxis: { title: "Run ID" }, yaxis: { title: "MOE 1", gridcolor: 'rgba(255, 255, 255, 1)', zerolinecolor: 'rgba(255, 255, 255, 1)' }, plot_bgcolor: 'rgba(229, 236, 246, 1)'};
                const layout2 = {xaxis: { title: "Run ID" }, yaxis: { title: "MOE 2", gridcolor: 'rgba(255, 255, 255, 1)', zerolinecolor: 'rgba(255, 255, 255, 1)' }, plot_bgcolor: 'rgba(229, 236, 246, 1)'};
                const layout3 = {xaxis: { title: "Run ID" }, yaxis: { title: "MOE 3", gridcolor: 'rgba(255, 255, 255, 1)', zerolinecolor: 'rgba(255, 255, 255, 1)' }, plot_bgcolor: 'rgba(229, 236, 246, 1)'};
                const layout4 = {xaxis: { title: "Run ID" }, yaxis: { title: "MOE 4", gridcolor: 'rgba(255, 255, 255, 1)', zerolinecolor: 'rgba(255, 255, 255, 1)' }, plot_bgcolor: 'rgba(229, 236, 246, 1)'};
                const emptyData = [{x: [], y: [], type: "bar"}];
                const config = { responsive: true }
                Plotly.newPlot(document.getElementById("bar-chart-1"), emptyData, layout1, config);
                Plotly.newPlot(document.getElementById("bar-chart-2"), emptyData, layout2, config);
                Plotly.newPlot(document.getElementById("bar-chart-3"), emptyData, layout3, config);
                Plotly.newPlot(document.getElementById("bar-chart-4"), emptyData, layout4, config);
            </script>
        </body>
    </html>`;

    return (
        <div>
            <iframe srcdoc={ unminifiedCode } width="100%" height="800px"></iframe>
        </div>
    );
}

export default RunBatchMoe;