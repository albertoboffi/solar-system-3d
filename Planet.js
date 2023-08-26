import SolarSystemData from './solar-system-data.js';

export default class Planet{
    
    // SHAPE
    #radius = {};
    #tilt;

    // ROTATION
    #theta;

    // ORBIT
    #a;
    #b;
    #c = {};
    #inclination;
    #phi;
    #rev_active;

    // ANGULAR SPEEDS
    #rot_speed;
    #rev_speed;

    #getRatio(earth_app_val, planet_val, earth_val){
        
        return earth_app_val * planet_val / earth_val;
    
    }

    #setShape(earth_xradius, planet_shape, earth_shape){
        
        this.#radius.x = this.#getRatio(earth_xradius, planet_shape["equatorial_radius"], earth_shape["equatorial_radius"]);
        this.#radius.y = this.#radius.x; // spherical approximation
        this.#radius.z = this.#radius.x; // spherical approximation

        this.#tilt = - planet_shape["axial_tilt"];

    }

    #setOrbit(earth_a, planet_orbit, earth_orbit){

        // Ellipse axis

        this.#a = this.#getRatio(earth_a, planet_orbit["semi_major_axis"], earth_orbit["semi_major_axis"]);
        this.#b = this.#a * Math.sqrt(1 - Math.pow(planet_orbit["eccentricity"], 2));

        // Ellipse center
        
        const radius_diff = planet_orbit["aphelion"] - planet_orbit["semi_major_axis"];
        const c_shift = this.#getRatio(earth_a, radius_diff, earth_orbit["semi_major_axis"]);
        
        if (planet_orbit["aphelion_dir"] == 'r') this.#c.x = - c_shift;
        else this.#c.x = c_shift;
        this.#c.y = 0; this.#c.z = 0;

        // Angles

        this.#inclination = planet_orbit["inclination"];
        this.#phi = 0;

        // Control
        this.#rev_active = true;

    }

    #setSpeeds(earth_rotperiod, earth_revperiod, planet_periods, earth_periods){

        const rot_period = this.#getRatio(earth_rotperiod, planet_periods["synodic_rotation_period"], earth_periods["synodic_rotation_period"]);
        const rev_period = this.#getRatio(earth_revperiod, planet_periods["sideral_orbital_period"], earth_periods["sideral_orbital_period"]);

        this.#rot_speed = 2 * Math.PI / rot_period;
        this.#rev_speed = 2 * Math.PI / rev_period;

    }

    constructor(earth_xradius, earth_a, earth_rotperiod, earth_revperiod, planet_name){
            
        const planet_data = SolarSystemData[planet_name];
        const earth_data = SolarSystemData["earth"];

        // SHAPE
        this.#setShape(earth_xradius, planet_data["shape"], earth_data["shape"]);
            
        // ROTATION
        this.#theta = 0;

        // ORBIT
        this.#setOrbit(earth_a, planet_data["orbit"], earth_data["orbit"]);

        // SPEEDS
        this.#setSpeeds(earth_rotperiod, earth_revperiod, planet_data["periods"], earth_data["periods"]);

    }

    updatePosition(deltaT){

        this.#phi += deltaT * this.#rev_speed * this.#rev_active;
        this.#phi %= 2 * Math.PI;

    }
    
    enableRevolution(){

        this.#rev_active = true;

    }

    disableRevolution(){

        this.#rev_active = false;

    }

    updateRotation(deltaT){

        this.#theta += deltaT * this.#rot_speed;
        this.#theta %= 2 * Math.PI;

    }

    getSize(){
        
        return this.#radius;

    }

    getTilt(){

        return this.#tilt;

    }

    getRotation(){

        return this.#theta;

    }

    getPosition(){

        var position = {};

        // flat orbit position
        position.x = this.#a * Math.cos(this.#phi) - this.#c.x;
        position.y = 0 - this.#c.y;
        position.z = this.#b * Math.sin(this.#phi) - this.#c.z;
        
        // projection of the point on the inclined orbit
        position.x = position.x * Math.cos(this.#inclination) - position.y * Math.sin(this.#inclination);
        position.y = position.x * Math.sin(this.#inclination) + position.y * Math.cos(this.#inclination);

        return position;

    }

    getNameSize(){
        
        const size = {};
        size.x = Math.max(Math.min(1.75 * this.#radius.x, 5), 1);
        size.y = size.x;
        size.z = size.x;

        return size;

    }

    getNamePosition(){

        const planet_position = this.getPosition();
        const name_position = {};

        name_position.x = planet_position.x;
        name_position.y = planet_position.y + this.getNameSize().y // + this.#radius.y;
        name_position.z = planet_position.z;

        return name_position;

    }

}