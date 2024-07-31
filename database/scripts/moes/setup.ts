function runBatch() {

    const moeDefinitions = [
            'Probability of unloading [100%/80%/60%/40%/20%] troops/assets with no loss',
            'Probability of individual LCs arriving at beach undetected. If 4 LCs are launched, and 3 are detected, then MOE 2 = 25%',
            'Probability of survival of LC for a user-defined number of hours after Phase 1, in specified areas near unloading location',
            'Average time troops spent at sea before landing to inform on troop condition at landing'
    ];

    for (let i=0; i<numberOfRuns; i++) {
        console.log("Running model run " + i+1);
    }
}

export default runBatch;