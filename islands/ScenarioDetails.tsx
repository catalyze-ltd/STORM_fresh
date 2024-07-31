export default function getDefaultParameterValues(currentScenario: { Scenario: string; "Sea state": number; "Degraded comms": boolean; "Simulation timestep (minutes)": number; "Required loiter (hrs)": number; }[]) {
    if (currentScenario[0].Scenario === '') {
        alert('Warning: no timestep set. Defaulting to 1 minute');
        return {"scenarioName": 'No scenario loaded', "scenarioTimestep": 1, "scenarioSeastate": 0}
    } else {
        return {"scenarioName": currentScenario[0].Scenario, "scenarioTimestep": currentScenario[0]["Simulation timestep (minutes)"], "scenarioSeastate": currentScenario[0]["Sea state"]}
    }
}