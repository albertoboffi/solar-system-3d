import * as THREE from 'three';
import Controller from './Controller.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';

class SolarSystem3D{

    // scene configuration
    #scene;
    #renderer;
    #camera;
    #controls;
    #clock;

    // scene entities
    #suMod; #meMod; #veMod; #eaMod; #maMod; #juMod; #saMod; #urMod; #neMod; // models
    #mercury; #venus; #earth; #mars; #jupiter; #saturn; #uranus; #neptune; // objects

    //controller
    #controller;

    #initScene(){
        
        this.#scene = new THREE.Scene();
        this.#clock = new THREE.Clock();

        this.#renderer = new THREE.WebGLRenderer({ antialias: true });
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        this.#renderer.setPixelRatio(window.devicePixelRatio * 1.5);
        
        document.body.appendChild(this.#renderer.domElement);

    }

    #loadModels(){

        // load textures

        const suTe = new THREE.TextureLoader().load("textures/sun.jpg");
        const meTe = new THREE.TextureLoader().load("textures/planets/mercury.jpg");
        const veTe = new THREE.TextureLoader().load("textures/planets/venus.jpg");
        const eaTe = new THREE.TextureLoader().load("textures/planets/earth.jpg");
        const maTe = new THREE.TextureLoader().load("textures/planets/mars.jpg");
        const juTe = new THREE.TextureLoader().load("textures/planets/jupiter.jpg");
        const saTe = new THREE.TextureLoader().load("textures/planets/saturn.jpg");
        const urTe = new THREE.TextureLoader().load("textures/planets/uranus.jpg");
        const neTe = new THREE.TextureLoader().load("textures/planets/neptune.jpg");
        
        // create materials

        const suMat = new THREE.MeshBasicMaterial({ map: suTe });
        const meMat = new THREE.MeshBasicMaterial({ map: meTe });
        const veMat = new THREE.MeshBasicMaterial({ map: veTe });
        const eaMat = new THREE.MeshBasicMaterial({ map: eaTe });
        const maMat = new THREE.MeshBasicMaterial({ map: maTe });
        const juMat = new THREE.MeshBasicMaterial({ map: juTe });
        const saMat = new THREE.MeshBasicMaterial({ map: saTe });
        const urMat = new THREE.MeshBasicMaterial({ map: urTe });
        const neMat = new THREE.MeshBasicMaterial({ map: neTe });

        // create mesh

        const sphereRadius = 1, sphereXSegments = 100, sphereYSegments = 100;
        const sphere = new THREE.SphereGeometry(sphereRadius, sphereXSegments, sphereYSegments);

        // create models
        
        this.#suMod = new THREE.Mesh(sphere, suMat);
        this.#meMod = new THREE.Mesh(sphere, meMat);
        this.#veMod = new THREE.Mesh(sphere, veMat);
        this.#eaMod = new THREE.Mesh(sphere, eaMat);
        this.#maMod = new THREE.Mesh(sphere, maMat);
        this.#juMod = new THREE.Mesh(sphere, juMat);
        this.#saMod = new THREE.Mesh(sphere, saMat);
        this.#urMod = new THREE.Mesh(sphere, urMat);
        this.#neMod = new THREE.Mesh(sphere, neMat);

        this.#scene.add(this.#suMod);
        this.#scene.add(this.#meMod);
        this.#scene.add(this.#veMod);
        this.#scene.add(this.#eaMod);
        this.#scene.add(this.#maMod);
        this.#scene.add(this.#juMod);
        this.#scene.add(this.#saMod);
        this.#scene.add(this.#urMod);
        this.#scene.add(this.#neMod);
        
    }

    #setController(){
        
        var earth_xradius = 0.3; // earth local x-radius
        var earth_a = 4.3; // earth orbit local semi-major axis
        var earth_rotperiod = 2; // earth rotation period in seconds
        var earth_revperiod = 10; // earth revolution period in seconds

        this.#controller = new Controller(earth_xradius, earth_a, earth_rotperiod, earth_revperiod);

        this.#mercury = this.#controller.createPlanet("mercury");
        this.#venus = this.#controller.createPlanet("venus");
        this.#earth = this.#controller.createPlanet("earth");
        this.#mars = this.#controller.createPlanet("mars");
        this.#jupiter = this.#controller.createPlanet("jupiter");
        this.#saturn = this.#controller.createPlanet("saturn");
        this.#uranus = this.#controller.createPlanet("uranus");
        this.#neptune = this.#controller.createPlanet("neptune");

    }

    #setWorldMatrix(){

        // get planets data

        var mercury_radius = this.#mercury.getSize();
        var mercury_tilt = this.#mercury.getTilt();

        var venus_radius = this.#venus.getSize();
        var venus_tilt = this.#venus.getTilt();

        var earth_radius = this.#earth.getSize();
        var earth_tilt = this.#earth.getTilt();

        var mars_radius = this.#mars.getSize();
        var mars_tilt = this.#mars.getTilt();

        var jupiter_radius = this.#jupiter.getSize();
        var jupiter_tilt = this.#jupiter.getTilt();

        var saturn_radius = this.#saturn.getSize();
        var saturn_tilt = this.#saturn.getTilt();

        var uranus_radius = this.#uranus.getSize();
        var uranus_tilt = this.#uranus.getTilt();

        var neptune_radius = this.#neptune.getSize();
        var neptune_tilt = this.#neptune.getTilt();

        // sun

        // this.#suMod.scale.copy(new THREE.Vector3(1, 1, 1));

        // mercury

        this.#meMod.scale.copy(new THREE.Vector3(
            mercury_radius.x,
            mercury_radius.y,
            mercury_radius.z
        ));

        this.#meMod.rotateZ(mercury_tilt);
        
        // venus

        this.#veMod.scale.copy(new THREE.Vector3(
            venus_radius.x,
            venus_radius.y,
            venus_radius.z
        ));

        this.#veMod.rotateZ(venus_tilt);

        // earth

        this.#eaMod.scale.copy(new THREE.Vector3(
            earth_radius.x,
            earth_radius.y,
            earth_radius.z
        ));

        this.#eaMod.rotateZ(earth_tilt);

        // mars

        this.#maMod.scale.copy(new THREE.Vector3(
            mars_radius.x,
            mars_radius.y,
            mars_radius.z
        ));

        this.#maMod.rotateZ(mars_tilt);

        // jupiter

        this.#juMod.scale.copy(new THREE.Vector3(
            jupiter_radius.x,
            jupiter_radius.y,
            jupiter_radius.z
        ));

        this.#juMod.rotateZ(jupiter_tilt);

        // saturn

        this.#saMod.scale.copy(new THREE.Vector3(
            saturn_radius.x,
            saturn_radius.y,
            saturn_radius.z
        ));

        this.#saMod.rotateZ(saturn_tilt);

        // uranus

        this.#urMod.scale.copy(new THREE.Vector3(
            uranus_radius.x,
            uranus_radius.y,
            uranus_radius.z
        ));

        this.#urMod.rotateZ(uranus_tilt);

        // neptune

        this.#neMod.scale.copy(new THREE.Vector3(
            neptune_radius.x,
            neptune_radius.y,
            neptune_radius.z
        ));

        this.#neMod.rotateZ(neptune_tilt);

    }

    #setViewProjectionMatrix(){
        
        // set perspective camera

        const fovy = 90;
        const ar = window.innerWidth / window.innerHeight;
        const nearPlane = 0.1;
        const farPlane = 1000;

        this.#camera = new THREE.PerspectiveCamera(
            fovy,
            ar,
            nearPlane,
            farPlane
        );

        this.#camera.position.set(0, 0, 8);

        // set camera motion in fly mode
        
        this.#controls = new FlyControls(this.#camera, this.#renderer.domElement);
        this.#controls.movementSpeed = 2;
        this.#controls.rollSpeed = 0.5;

    }

    #animate(){

        requestAnimationFrame(this.#animate.bind(this));

        // get time interval

        var deltaT = this.#clock.getDelta();

        // update planets 

        this.#mercury.updatePosition(deltaT);
        this.#mercury.updateRotation(deltaT);

        this.#venus.updatePosition(deltaT);
        this.#venus.updateRotation(deltaT);

        this.#earth.updatePosition(deltaT);
        this.#earth.updateRotation(deltaT);

        this.#mars.updatePosition(deltaT);
        this.#mars.updateRotation(deltaT);

        this.#jupiter.updatePosition(deltaT);
        this.#jupiter.updateRotation(deltaT);

        this.#saturn.updatePosition(deltaT);
        this.#saturn.updateRotation(deltaT);

        this.#uranus.updatePosition(deltaT);
        this.#uranus.updateRotation(deltaT);

        this.#neptune.updatePosition(deltaT);
        this.#neptune.updateRotation(deltaT);

        // get planets data

        var mercury_position = this.#mercury.getPosition();
        var mercury_rotation = this.#mercury.getRotation();
        var mercury_tilt = this.#mercury.getTilt();

        var venus_position = this.#venus.getPosition();
        var venus_rotation = this.#venus.getRotation();
        var venus_tilt = this.#venus.getTilt();

        var earth_position = this.#earth.getPosition();
        var earth_rotation = this.#earth.getRotation();
        var earth_tilt = this.#earth.getTilt();

        var mars_position = this.#mars.getPosition();
        var mars_rotation = this.#mars.getRotation();
        var mars_tilt = this.#mars.getTilt();

        var jupiter_position = this.#jupiter.getPosition();
        var jupiter_rotation = this.#jupiter.getRotation();
        var jupiter_tilt = this.#jupiter.getTilt();

        var saturn_position = this.#saturn.getPosition();
        var saturn_rotation = this.#saturn.getRotation();
        var saturn_tilt = this.#saturn.getTilt();

        var uranus_position = this.#uranus.getPosition();
        var uranus_rotation = this.#uranus.getRotation();
        var uranus_tilt = this.#uranus.getTilt();

        var neptune_position = this.#neptune.getPosition();
        var neptune_rotation = this.#neptune.getRotation();
        var neptune_tilt = this.#neptune.getTilt();

        // mercury

        this.#meMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                - Math.sin(mercury_tilt),
                + Math.cos(mercury_tilt),
                0
            ),
            mercury_rotation
        );

        this.#meMod.position.copy(new THREE.Vector3(
            mercury_position.x,
            mercury_position.y,
            mercury_position.z
        ));

        // venus

        this.#veMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                - Math.sin(venus_tilt),
                + Math.cos(venus_tilt),
                0
            ),
            venus_rotation
        );

        this.#veMod.position.copy(new THREE.Vector3(
            venus_position.x,
            venus_position.y,
            venus_position.z
        ));

        // earth

        this.#eaMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                - Math.sin(earth_tilt),
                + Math.cos(earth_tilt),
                0
            ),
            earth_rotation
        );

        this.#eaMod.position.copy(new THREE.Vector3(
            earth_position.x,
            earth_position.y,
            earth_position.z
        ));

        // mars

        this.#maMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                - Math.sin(mars_tilt),
                + Math.cos(mars_tilt),
                0
            ),
            mars_rotation
        );

        this.#maMod.position.copy(new THREE.Vector3(
            mars_position.x,
            mars_position.y,
            mars_position.z
        ));

        // jupiter

        this.#juMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                - Math.sin(jupiter_tilt),
                + Math.cos(jupiter_tilt),
                0
            ),
            jupiter_rotation
        );

        this.#juMod.position.copy(new THREE.Vector3(
            jupiter_position.x,
            jupiter_position.y,
            jupiter_position.z
        ));

        // saturn

        this.#saMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                - Math.sin(saturn_tilt),
                + Math.cos(saturn_tilt),
                0
            ),
            saturn_rotation
        );

        this.#saMod.position.copy(new THREE.Vector3(
            saturn_position.x,
            saturn_position.y,
            saturn_position.z
        ));

        // uranus

        this.#urMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                - Math.sin(uranus_tilt),
                + Math.cos(uranus_tilt),
                0
            ),
            uranus_rotation
        );

        this.#urMod.position.copy(new THREE.Vector3(
            uranus_position.x,
            uranus_position.y,
            uranus_position.z
        ));

        // neptune

        this.#neMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                - Math.sin(neptune_tilt),
                + Math.cos(neptune_tilt),
                0
            ),
            neptune_rotation
        );

        this.#neMod.position.copy(new THREE.Vector3(
            neptune_position.x,
            neptune_position.y,
            neptune_position.z
        ));

        this.#controls.update(deltaT);

	    this.#renderer.render(this.#scene, this.#camera);
        
    }

    run(){

        this.#initScene();
        this.#loadModels();
        this.#setController();
        this.#setWorldMatrix();
        this.#setViewProjectionMatrix();
        this.#animate();

    }

}

function main(){

    const app = new SolarSystem3D();
    app.run();

}

main()