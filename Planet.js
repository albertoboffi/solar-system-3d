export default class Planet{
    
    // SHAPE
    #radius; #tilt;

    // ROTATION
    #theta;

    // ORBIT
    #a; #b; #c // semi-major axis, semi-minor axis, center
    #inclination; #phi;

    // SPEEDS
    #rot_speed; #rev_speed;

    constructor(earth_xradius, earth_a, earth_rotspeed, earth_revspeed, planet_name){

        fetch("solar-system-data.json")
        .then(response => response.json()).then(json => 
            console.log(json));

    }

}