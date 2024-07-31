function runModel(scenario_uid, random_seed, timestep_size, num_timesteps = 200, scenario_name, TIMESTEP_MINUTES) {
    const event_log = [];
    const entity_list = [];

    const this_run = {
        "uid": scenario_uid,
        "seed": random_seed,
        "simulation_start_time": new Date(),
        "timestep": TIMESTEP_MINUTES,
        "nth_step": 0,
        "scenario_name": scenario_name
    }

    const runOutput = outputObject(scenario_uid);

}

export default runModel;