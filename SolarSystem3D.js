import * as THREE from 'three';
import Controller from './Controller.js';

class SolarSystem3D{

    // scene configuration
    #scene; #renderer; #camera;

    // scene entities
    #suMod; #meMod; #veMod; #eaMod; #maMod; #juMod; #saMod; #urMod; #neMod; // models
    #mercury; #venus; #earth; #mars; #jupiter; #saturn; #uranus; #neptune; // objects

    //controller
    #controller;

    #initScene(){
        
        this.#scene = new THREE.Scene();

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
        this.#neMod = new THREE.Mesh(sphere, neMat);
        this.#urMod = new THREE.Mesh(sphere, urMat);

        this.#scene.add(this.#suMod);
        this.#scene.add(this.#meMod);
        this.#scene.add(this.#veMod);
        this.#scene.add(this.#eaMod);
        this.#scene.add(this.#maMod);
        this.#scene.add(this.#juMod);
        this.#scene.add(this.#saMod);
        this.#scene.add(this.#neMod);
        this.#scene.add(this.#urMod);
        
    }

    #setController(){
        
        var earth_xradius = 0.3; // earth local x-radius
        var earth_a = 2; // earth orbit local semi-major axis
        var earth_rotperiod = 5; // earth rotation period in seconds
        var earth_revperiod = 10; // earth revolution period in seconds

        this.#controller = new Controller(earth_xradius, earth_a, earth_rotperiod, earth_revperiod);

        this.#mercury = this.#controller.createPlanet("mercury");
        this.#venus = this.#controller.createPlanet("venus");
        this.#earth = this.#controller.createPlanet("earth");
        this.#mars = this.#controller.createPlanet("mars");
        this.#jupiter = this.#controller.createPlanet("jupiter");
        this.#saturn = this.#controller.createPlanet("saturn");
        this.#neptune = this.#controller.createPlanet("neptune");
        this.#uranus = this.#controller.createPlanet("uranus");

    }

    #setWorldMatrix(){

        var mercury_radius = this.#mercury.getSize();
        var venus_radius = this.#venus.getSize();
        var earth_radius = this.#earth.getSize();
        var mars_radius = this.#mars.getSize();
        var jupiter_radius = this.#jupiter.getSize();
        var saturn_radius = this.#saturn.getSize();
        var neptune_radius = this.#neptune.getSize();
        var uranus_radius = this.#uranus.getSize();

        // this.#suMod.scale.copy(new THREE.Vector3(1, 1, 1));

        this.#meMod.scale.copy(new THREE.Vector3(
            mercury_radius.x,
            mercury_radius.y,
            mercury_radius.z
        ));
        
        this.#veMod.scale.copy(new THREE.Vector3(
            venus_radius.x,
            venus_radius.y,
            venus_radius.z
        ));

        this.#eaMod.scale.copy(new THREE.Vector3(
            earth_radius.x,
            earth_radius.y,
            earth_radius.z
        ));

        this.#maMod.scale.copy(new THREE.Vector3(
            mars_radius.x,
            mars_radius.y,
            mars_radius.z
        ));

        this.#juMod.scale.copy(new THREE.Vector3(
            jupiter_radius.x,
            jupiter_radius.y,
            jupiter_radius.z
        ));

        this.#saMod.scale.copy(new THREE.Vector3(
            saturn_radius.x,
            saturn_radius.y,
            saturn_radius.z
        ));

        this.#neMod.scale.copy(new THREE.Vector3(
            neptune_radius.x,
            neptune_radius.y,
            neptune_radius.z
        ));

        this.#urMod.scale.copy(new THREE.Vector3(
            uranus_radius.x,
            uranus_radius.y,
            uranus_radius.z
        ));

    }

    #setViewProjectionMatrix(){
        
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

        this.#camera.position.set(0, 0, 5);

    }

    #animate(){

        requestAnimationFrame(this.#animate.bind(this));

        // get time interval
        var clock = new THREE.Clock();
        var deltaT = clock.getDelta();

        // update planets 
        this.#mercury.updatePosition(deltaT);
        this.#mercury.updateRotation(deltaT);

        // get planets data
        var mercury_position = this.#mercury.getPosition();
        var mercury_rotation = this.#mercury.getRotation();

        // render planets
        this.#meMod.position.copy(new THREE.Vector3(
            mercury_position.x,
            mercury_position.y,
            mercury_position.z
        ));

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