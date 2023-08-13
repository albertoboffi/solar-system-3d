import Planet from './Planet.js';

export default class Controller{

    // RATIO PARAMETERS
    #earth_xradius;
    #earth_a;
    #erath_rotspeed;
    #eartrh_revspeed;

    constructor(earth_xradius, earth_a, earth_rotspeed, earth_revspeed){
        this.#earth_xradius = earth_xradius;
        this.#earth_a = earth_a;
        this.#erath_rotspeed = earth_rotspeed;
        this.#eartrh_revspeed = earth_revspeed;
    }

    createPlanet(planet_name){
        return new Planet(
            this.#earth_xradius,
            this.#earth_a,
            this.#erath_rotspeed,
            this.#eartrh_revspeed,
            planet_name
        );
    }

}