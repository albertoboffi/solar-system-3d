import Planet from './Planet.js';

export default class Controller{

    // RATIO PARAMETERS
    #earth_xradius;
    #earth_a;
    #earth_rotperiod;
    #earth_revperiod;

    constructor(earth_xradius, earth_a, earth_rotperiod, earth_revperiod){
        this.#earth_xradius = earth_xradius;
        this.#earth_a = earth_a;
        this.#earth_rotperiod = earth_rotperiod;
        this.#earth_revperiod = earth_revperiod;
    }

    createPlanet(planet_name){
        return new Planet(
            this.#earth_xradius,
            this.#earth_a,
            this.#earth_rotperiod,
            this.#earth_revperiod,
            planet_name
        );
    }

}