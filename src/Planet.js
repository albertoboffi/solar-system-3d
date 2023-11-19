import SolarSystemData from './solar-system-data.js';

export default class Planet{
    
    // planet shape
    #radius = {};
    #tilt;

    // rotation
    #theta;
    #rot_speed;

    // orbit shape
    #a; #b; #c = {};
    #inclination;

    // revolution
    #phi;
    #rev_active;
    #rev_speed;

    /*
        PARAMETERS:
            > earth_app_val -> numerical value of a physical quantity referred to the earth inside the application
            > earth_val -> real numerical values of the same quantity referred to the earth
            > planet_val -> real numerical values of the same quantity referred to the current planet

        RETURNED VALUE:
            > numerical value of the same quantity referred to the current planet inside the application
    */
    #getRatio(earth_app_val, earth_val, planet_val){
        
        return earth_app_val * planet_val / earth_val;
    
    }

    #setShape(earth_xradius, earth_shape, planet_shape){
        
        // the planet is approximated as a sphere

        this.#radius.x = this.#getRatio(
            earth_xradius,
            earth_shape["equatorial_radius"],
            planet_shape["equatorial_radius"]
        );
        this.#radius.y = this.#radius.x;
        this.#radius.z = this.#radius.x;

        // the axial tilt is the angle between the rotational axis of the planet and its orbital axis (the line perpendicular to its orbital plane)
        // we can approximate it as the angle between the planet's rotational axis and the y-axis
        // to describe it relative to the x-axis, we just need to take the inverse of the angle

        this.#tilt = - planet_shape["axial_tilt"];

    }

    #setRotation(){

        // angle describing the orientation of the planet along its axis
        // as an approximation, we consider an initial orientation of 0 rad regardless of the position of the planet along the orbit

        this.#theta = 0;

    }

    #setOrbit(earth_a, earth_orbit, planet_orbit){

        // ellipse axis
        // if we scale both axis by the same factor, the eccentricity does not change

        this.#a = this.#getRatio(
            earth_a,
            earth_orbit["semi_major_axis"],
            planet_orbit["semi_major_axis"]
        );
        
        this.#b = this.#a * Math.sqrt(1 - Math.pow(planet_orbit["eccentricity"], 2));

        // ellipse center
        // as approximation, we consider the imaginary line connecting aphelion and perihelion always parallel to the x-axis

        const radius_diff = planet_orbit["aphelion"] - planet_orbit["semi_major_axis"];
        
        const c_shift = this.#getRatio(
            earth_a,
            earth_orbit["semi_major_axis"],
            radius_diff
        );
        
        if (planet_orbit["aphelion_dir"] == 'r'){
            this.#c.x = - c_shift;
        }
        else{
            this.#c.x = c_shift;
        }

        this.#c.y = 0; this.#c.z = 0;

        // ellipse inclination
        // the inclination is always counterclockwise with respect to the x-axis (?)

        this.#inclination = planet_orbit["inclination"];

    }

    #setRevolution(){

        // the position is described with the angle that the planet forms with respect to the x-axis
        
        this.#phi = 0;

        // control

        this.#rev_active = true;

    }

    #setSpeeds(earth_rotperiod, earth_revperiod, earth_periods, planet_periods){

        const rot_period = this.#getRatio(
            earth_rotperiod,
            earth_periods["synodic_rotation_period"],
            planet_periods["synodic_rotation_period"]
        );

        const rev_period = this.#getRatio(
            earth_revperiod,
            earth_periods["sideral_orbital_period"],
            planet_periods["sideral_orbital_period"]
        );

        this.#rot_speed = 2 * Math.PI / rot_period;
        this.#rev_speed = 2 * Math.PI / rev_period;

    }

    constructor(earth_xradius, earth_a, earth_rotperiod, earth_revperiod, planet_name){
        
        // get real data

        const earth_data = SolarSystemData["earth"];
        const planet_data = SolarSystemData[planet_name];

        // generate application data

        this.#setShape(
            earth_xradius,
            earth_data["shape"],
            planet_data["shape"]
        );

        this.#setRotation();

        this.#setOrbit(
            earth_a,
            earth_data["orbit"],
            planet_data["orbit"]
        );
        
        this.#setRevolution();
        
        this.#setSpeeds(
            earth_rotperiod,
            earth_revperiod,
            earth_data["periods"],
            planet_data["periods"]
        );

    }

    updateRotation(deltaT){

        this.#theta += deltaT * this.#rot_speed;
        this.#theta %= 2 * Math.PI;

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