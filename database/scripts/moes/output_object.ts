class outputObject {

    uid: any;
    sea_state: number;
    blue_entity_list: string;
    blue_entity_speeds: string;
    red_entity_list: string;
    detection_times: string;
    n_detections: number;
    n_blue_landing_craft: number;
    kill_times: string;
    reached_destination_times: string;
    percent_survival_at_landing: string;
    troop_condition_at_landing: string;
    n_blue_landing_craft_detected: string;
    time_at_sea: string;
    successful_loiter: number;
    n_reached_destination: number;
    n_kills: number;

    constructor (
        uid,
        sea_state = 0,
        blue_entity_list = null,
        blue_entity_speeds = null,
        red_entity_list = null,
        n_blue_landing_craft = 0,
        n_detections = 0, // This should only be red detections of blue entities
        detection_times = null,
        n_kills = 0,
        kill_times = null,
        n_reached_destination = 0,
        reached_destination_times = null,
        percent_survival_at_landing = null,
        troop_condition_at_landing = null,
        n_blue_landing_craft_detected =null,
        successful_loiter = 0,
        time_at_sea = null,
        ) {
            this.uid = uid;
            this.sea_state = sea_state;
            (blue_entity_list === null) ? (blue_entity_list = []) : (this.blue_entity_list = blue_entity_list);
            (blue_entity_speeds === null) ? (blue_entity_speeds = []) : (this.blue_entity_speeds = blue_entity_speeds);
            (red_entity_list === null) ? (red_entity_list = []) : (this.red_entity_list = red_entity_list);
            this.n_blue_landing_craft = n_blue_landing_craft;
            this.n_detections = n_detections;
            (detection_times === null) ? (detection_times = []) : (this.detection_times = detection_times);
            this.n_kills = n_kills;
            (kill_times === null) ? (kill_times = []) : (this.kill_times = kill_times);
            this.n_reached_destination = n_reached_destination;
            (reached_destination_times === null) ? (reached_destination_times = []) : (this.reached_destination_times = reached_destination_times);
            (percent_survival_at_landing === null) ? (percent_survival_at_landing = []) : (this.percent_survival_at_landing = percent_survival_at_landing);
            (troop_condition_at_landing === null) ? (troop_condition_at_landing = []) : (this.troop_condition_at_landing = troop_condition_at_landing);
            (n_blue_landing_craft_detected === null) ? (n_blue_landing_craft_detected = []) : (this.n_blue_landing_craft_detected = n_blue_landing_craft_detected);
            this.successful_loiter = successful_loiter;
            (time_at_sea === null) ? (time_at_sea = []) : (this.time_at_sea = time_at_sea);
    }

    newUpdate(kwargs) {
        defaults = {
            'blue_entity_list': null,
            'blue_entity_speeds': null,
            'red_entity_list': null,
            'n_blue_landing_craft': 0,
            'n_detections': 0,
            'detection_times': null,
            'n_kills': 0,
            'kill_times': null,
            'n_reached_destination': 0,
            'reached_destination_times': null,
            'percent_survival_at_landing': null,
            'troop_condition_at_landing': null,
            'n_blue_landing_craft_detected': null,
            'successful_loiter': 0,
            'time_at_sea': null,
        }
    }
}