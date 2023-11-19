import * as THREE from 'three';
import Controller from './Controller.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class SolarSystem3D{

    // scene configuration
    #scene;
    #renderer;
    #camera;
    #controls;
    #clock;

    // scene entities
    #suMod; #meMod; #veMod; #eaMod; #maMod; #juMod; #saMod; #saRiMod; #urMod; #neMod; // planets models
    #meNameMod; #veNameMod; #eaNameMod; #maNameMod; #juNameMod; #saNameMod; #urNameMod; #neNameMod; // planets name models
    #mercury; #venus; #earth; #mars; #jupiter; #saturn; #uranus; #neptune; // objects

    // controller
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

        const suTe = new THREE.TextureLoader().load("assets/textures/sun.jpg");
        const meTe = new THREE.TextureLoader().load("assets/textures/planets/mercury.jpg");
        const veTe = new THREE.TextureLoader().load("assets/textures/planets/venus.jpg");
        const eaTe = new THREE.TextureLoader().load("assets/textures/planets/earth.jpg");
        const maTe = new THREE.TextureLoader().load("assets/textures/planets/mars.jpg");
        const juTe = new THREE.TextureLoader().load("assets/textures/planets/jupiter.jpg");
        const saTe = new THREE.TextureLoader().load("assets/textures/planets/saturn.jpg");
        const saRiTe = new THREE.TextureLoader().load("assets/textures/planets/saturn-ring.png");
        const urTe = new THREE.TextureLoader().load("assets/textures/planets/uranus.jpg");
        const neTe = new THREE.TextureLoader().load("assets/textures/planets/neptune.jpg");

        const meNameTe = new THREE.TextureLoader().load("assets/textures/planets-names/mercury.png");
        const veNameTe = new THREE.TextureLoader().load("assets/textures/planets-names/venus.png");
        const eaNameTe = new THREE.TextureLoader().load("assets/textures/planets-names/earth.png");
        const maNameTe = new THREE.TextureLoader().load("assets/textures/planets-names/mars.png");
        const juNameTe = new THREE.TextureLoader().load("assets/textures/planets-names/jupiter.png");
        const saNameTe = new THREE.TextureLoader().load("assets/textures/planets-names/saturn.png");
        const urNameTe = new THREE.TextureLoader().load("assets/textures/planets-names/uranus.png");
        const neNameTe = new THREE.TextureLoader().load("assets/textures/planets-names/neptune.png");

        const cubeMapTeLoader = new THREE.CubeTextureLoader().setPath("assets/textures/skybox/");
        const cubeMapTe = cubeMapTeLoader.load([
            "px.jpg", "nx.jpg",
            "py.jpg", "ny.jpg",
            "pz.jpg", "nz.jpg"
        ]);
        
        // create materials

        const suMat = new THREE.MeshBasicMaterial({ map: suTe }); // not affected by light
        const meMat = new THREE.MeshStandardMaterial({ map: meTe });
        const veMat = new THREE.MeshStandardMaterial({ map: veTe });
        const eaMat = new THREE.MeshStandardMaterial({ map: eaTe });
        const maMat = new THREE.MeshStandardMaterial({ map: maTe });
        const juMat = new THREE.MeshStandardMaterial({ map: juTe });
        const saMat = new THREE.MeshStandardMaterial({ map: saTe });
        const saRiMat = new THREE.MeshStandardMaterial({ map: saRiTe, transparent: true, side: THREE.DoubleSide });
        const urMat = new THREE.MeshStandardMaterial({ map: urTe });
        const neMat = new THREE.MeshStandardMaterial({ map: neTe });

        const meNameMat = new THREE.MeshBasicMaterial({ map: meNameTe, transparent: true, side: THREE.DoubleSide });
        const veNameMat = new THREE.MeshBasicMaterial({ map: veNameTe, transparent: true, side: THREE.DoubleSide });
        const eaNameMat = new THREE.MeshBasicMaterial({ map: eaNameTe, transparent: true, side: THREE.DoubleSide });
        const maNameMat = new THREE.MeshBasicMaterial({ map: maNameTe, transparent: true, side: THREE.DoubleSide });
        const juNameMat = new THREE.MeshBasicMaterial({ map: juNameTe, transparent: true, side: THREE.DoubleSide });
        const saNameMat = new THREE.MeshBasicMaterial({ map: saNameTe, transparent: true, side: THREE.DoubleSide });
        const urNameMat = new THREE.MeshBasicMaterial({ map: urNameTe, transparent: true, side: THREE.DoubleSide });
        const neNameMat = new THREE.MeshBasicMaterial({ map: neNameTe, transparent: true, side: THREE.DoubleSide });

        // create mesh

        const sphereRadius = 1, sphereXSegments = 100, sphereYSegments = 100;
        const sphere = new THREE.SphereGeometry(sphereRadius, sphereXSegments, sphereYSegments);

        const ring = new THREE.RingGeometry(1, 2);

        const name_texture_ratio = 720 / 1280;
        const plane = new THREE.PlaneGeometry(1, name_texture_ratio);

        // create models
        
        this.#suMod = new THREE.Mesh(sphere, suMat);
        this.#meMod = new THREE.Mesh(sphere, meMat);
        this.#veMod = new THREE.Mesh(sphere, veMat);
        this.#eaMod = new THREE.Mesh(sphere, eaMat);
        this.#maMod = new THREE.Mesh(sphere, maMat);
        this.#juMod = new THREE.Mesh(sphere, juMat);
        this.#saMod = new THREE.Mesh(sphere, saMat);
        this.#saRiMod = new THREE.Mesh(ring, saRiMat);
        this.#urMod = new THREE.Mesh(sphere, urMat);
        this.#neMod = new THREE.Mesh(sphere, neMat);

        this.#meNameMod = new THREE.Mesh(plane, meNameMat);
        this.#veNameMod = new THREE.Mesh(plane, veNameMat);
        this.#eaNameMod = new THREE.Mesh(plane, eaNameMat);
        this.#maNameMod = new THREE.Mesh(plane, maNameMat);
        this.#juNameMod = new THREE.Mesh(plane, juNameMat);
        this.#saNameMod = new THREE.Mesh(plane, saNameMat);
        this.#urNameMod = new THREE.Mesh(plane, urNameMat);
        this.#neNameMod = new THREE.Mesh(plane, neNameMat);

        this.#scene.add(this.#suMod);
        this.#scene.add(this.#meMod);
        this.#scene.add(this.#veMod);
        this.#scene.add(this.#eaMod);
        this.#scene.add(this.#maMod);
        this.#scene.add(this.#juMod);
        this.#scene.add(this.#saMod);
        this.#scene.add(this.#saRiMod);
        this.#scene.add(this.#urMod);
        this.#scene.add(this.#neMod);

        this.#scene.add(this.#meNameMod);
        this.#scene.add(this.#veNameMod);
        this.#scene.add(this.#eaNameMod);
        this.#scene.add(this.#maNameMod);
        this.#scene.add(this.#juNameMod);
        this.#scene.add(this.#saNameMod);
        this.#scene.add(this.#urNameMod);
        this.#scene.add(this.#neNameMod);

        this.#scene.background = cubeMapTe;
        
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

        var mercury_name_size = this.#mercury.getNameSize();

        var venus_radius = this.#venus.getSize();
        var venus_tilt = this.#venus.getTilt();

        var venus_name_size = this.#venus.getNameSize();

        var earth_radius = this.#earth.getSize();
        var earth_tilt = this.#earth.getTilt();

        var earth_name_size = this.#earth.getNameSize();

        var mars_radius = this.#mars.getSize();
        var mars_tilt = this.#mars.getTilt();

        var mars_name_size = this.#mars.getNameSize();

        var jupiter_radius = this.#jupiter.getSize();
        var jupiter_tilt = this.#jupiter.getTilt();

        var jupiter_name_size = this.#jupiter.getNameSize();

        var saturn_radius = this.#saturn.getSize();
        var saturn_tilt = this.#saturn.getTilt();

        var saturn_name_size = this.#saturn.getNameSize();

        var uranus_radius = this.#uranus.getSize();
        var uranus_tilt = this.#uranus.getTilt();

        var uranus_name_size = this.#uranus.getNameSize();

        var neptune_radius = this.#neptune.getSize();
        var neptune_tilt = this.#neptune.getTilt();

        var neptune_name_size = this.#neptune.getNameSize();

        // sun

        // this.#suMod.scale.copy(new THREE.Vector3(1, 1, 1));

        // mercury

        this.#meMod.scale.copy(new THREE.Vector3(
            mercury_radius.x,
            mercury_radius.y,
            mercury_radius.z
        ));

        this.#meMod.rotateZ(mercury_tilt);

        this.#meNameMod.scale.copy(new THREE.Vector3(
            mercury_name_size.x,
            mercury_name_size.y,
            mercury_name_size.z
        ));
        
        // venus

        this.#veMod.scale.copy(new THREE.Vector3(
            venus_radius.x,
            venus_radius.y,
            venus_radius.z
        ));

        this.#veMod.rotateZ(venus_tilt);

        this.#veNameMod.scale.copy(new THREE.Vector3(
            venus_name_size.x,
            venus_name_size.y,
            venus_name_size.z
        ));

        // earth

        this.#eaMod.scale.copy(new THREE.Vector3(
            earth_radius.x,
            earth_radius.y,
            earth_radius.z
        ));

        this.#eaMod.rotateZ(earth_tilt);

        this.#eaNameMod.scale.copy(new THREE.Vector3(
            earth_name_size.x,
            earth_name_size.y,
            earth_name_size.z
        ));

        // mars

        this.#maMod.scale.copy(new THREE.Vector3(
            mars_radius.x,
            mars_radius.y,
            mars_radius.z
        ));

        this.#maMod.rotateZ(mars_tilt);

        this.#maNameMod.scale.copy(new THREE.Vector3(
            mars_name_size.x,
            mars_name_size.y,
            mars_name_size.z
        ));

        // jupiter

        this.#juMod.scale.copy(new THREE.Vector3(
            jupiter_radius.x,
            jupiter_radius.y,
            jupiter_radius.z
        ));

        this.#juMod.rotateZ(jupiter_tilt);

        this.#juNameMod.scale.copy(new THREE.Vector3(
            jupiter_name_size.x,
            jupiter_name_size.y,
            jupiter_name_size.z
        ));

        // saturn

        this.#saMod.scale.copy(new THREE.Vector3(
            saturn_radius.x,
            saturn_radius.y,
            saturn_radius.z
        ));

        this.#saRiMod.scale.copy(new THREE.Vector3(
            saturn_radius.x,
            saturn_radius.y,
            saturn_radius.z
        ));

        this.#saMod.rotateZ(saturn_tilt);

        this.#saRiMod.rotation.copy(new THREE.Euler(
            Math.PI / 2,
            saturn_tilt,
            0
        ));

        this.#saNameMod.scale.copy(new THREE.Vector3(
            saturn_name_size.x,
            saturn_name_size.y,
            saturn_name_size.z
        ));

        // uranus

        this.#urMod.scale.copy(new THREE.Vector3(
            uranus_radius.x,
            uranus_radius.y,
            uranus_radius.z
        ));

        this.#urMod.rotateZ(uranus_tilt);

        this.#urNameMod.scale.copy(new THREE.Vector3(
            uranus_name_size.x,
            uranus_name_size.y,
            uranus_name_size.z
        ));

        // neptune

        this.#neMod.scale.copy(new THREE.Vector3(
            neptune_radius.x,
            neptune_radius.y,
            neptune_radius.z
        ));

        this.#neMod.rotateZ(neptune_tilt);

        this.#neNameMod.scale.copy(new THREE.Vector3(
            neptune_name_size.x,
            neptune_name_size.y,
            neptune_name_size.z
        ));

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

        // set camera motion in orbit mode
        
        this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
        this.#controls.rollSpeed = 0.5;

    }

    #setLight(){
        
        const light = new THREE.PointLight(0xffffff, 1, 0, 2);
        light.position.set(0, 0, 0);
        this.#scene.add(light);

    }
    
    #handleWindowResizing(){
        
        const self = this;
        
        window.addEventListener("resize", function(){
            
            self.#renderer.setSize(window.innerWidth, window.innerHeight);
            self.#camera.aspect = window.innerWidth / window.innerHeight;
            self.#camera.updateProjectionMatrix();

        });
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
        // var mercury_tilt = this.#mercury.getTilt();

        var mercury_name_position = this.#mercury.getNamePosition();

        var venus_position = this.#venus.getPosition();
        var venus_rotation = this.#venus.getRotation();
        // var venus_tilt = this.#venus.getTilt();

        var venus_name_position = this.#venus.getNamePosition();

        var earth_position = this.#earth.getPosition();
        var earth_rotation = this.#earth.getRotation();
        // var earth_tilt = this.#earth.getTilt();

        var earth_name_position = this.#earth.getNamePosition();

        var mars_position = this.#mars.getPosition();
        var mars_rotation = this.#mars.getRotation();
        // var mars_tilt = this.#mars.getTilt();

        var mars_name_position = this.#mars.getNamePosition();

        var jupiter_position = this.#jupiter.getPosition();
        var jupiter_rotation = this.#jupiter.getRotation();
        // var jupiter_tilt = this.#jupiter.getTilt();

        var jupiter_name_position = this.#jupiter.getNamePosition();

        var saturn_position = this.#saturn.getPosition();
        var saturn_rotation = this.#saturn.getRotation();
        // var saturn_tilt = this.#saturn.getTilt();

        var saturn_name_position = this.#saturn.getNamePosition();

        var uranus_position = this.#uranus.getPosition();
        var uranus_rotation = this.#uranus.getRotation();
        // var uranus_tilt = this.#uranus.getTilt();

        var uranus_name_position = this.#uranus.getNamePosition();

        var neptune_position = this.#neptune.getPosition();
        var neptune_rotation = this.#neptune.getRotation();
        // var neptune_tilt = this.#neptune.getTilt();

        var neptune_name_position = this.#neptune.getNamePosition();

        // mercury

        this.#meMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                0, // - Math.sin(mercury_tilt),
                1, // + Math.cos(mercury_tilt),
                0
            ),
            mercury_rotation
        );

        this.#meMod.position.copy(new THREE.Vector3(
            mercury_position.x,
            mercury_position.y,
            mercury_position.z
        ));

        this.#meNameMod.position.copy(new THREE.Vector3(
            mercury_name_position.x,
            mercury_name_position.y,
            mercury_name_position.z
        ));

        this.#meNameMod.lookAt(this.#camera.position);

        // venus

        this.#veMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                0, // - Math.sin(venus_tilt),
                1, // + Math.cos(venus_tilt),
                0
            ),
            venus_rotation
        );

        this.#veMod.position.copy(new THREE.Vector3(
            venus_position.x,
            venus_position.y,
            venus_position.z
        ));

        this.#veNameMod.position.copy(new THREE.Vector3(
            venus_name_position.x,
            venus_name_position.y,
            venus_name_position.z
        ));

        this.#veNameMod.lookAt(this.#camera.position);

        // earth

        this.#eaMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                0, // - Math.sin(earth_tilt),
                1, // + Math.cos(earth_tilt),
                0
            ),
            earth_rotation
        );

        this.#eaMod.position.copy(new THREE.Vector3(
            earth_position.x,
            earth_position.y,
            earth_position.z
        ));

        this.#eaNameMod.position.copy(new THREE.Vector3(
            earth_name_position.x,
            earth_name_position.y,
            earth_name_position.z
        ));

        this.#eaNameMod.lookAt(this.#camera.position);

        // mars

        this.#maMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                0, // - Math.sin(mars_tilt),
                1, // + Math.cos(mars_tilt),
                0
            ),
            mars_rotation
        );

        this.#maMod.position.copy(new THREE.Vector3(
            mars_position.x,
            mars_position.y,
            mars_position.z
        ));

        this.#maNameMod.position.copy(new THREE.Vector3(
            mars_name_position.x,
            mars_name_position.y,
            mars_name_position.z
        ));

        this.#maNameMod.lookAt(this.#camera.position);

        // jupiter

        this.#juMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                0, // - Math.sin(jupiter_tilt),
                1, // + Math.cos(jupiter_tilt),
                0
            ),
            jupiter_rotation
        );

        this.#juMod.position.copy(new THREE.Vector3(
            jupiter_position.x,
            jupiter_position.y,
            jupiter_position.z
        ));

        this.#juNameMod.position.copy(new THREE.Vector3(
            jupiter_name_position.x,
            jupiter_name_position.y,
            jupiter_name_position.z
        ));

        this.#juNameMod.lookAt(this.#camera.position);

        // saturn

        this.#saMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                0, //- Math.sin(saturn_tilt),
                1, //+ Math.cos(saturn_tilt),
                0
            ),
            saturn_rotation
        );

        this.#saMod.position.copy(new THREE.Vector3(
            saturn_position.x,
            saturn_position.y,
            saturn_position.z
        ));

        this.#saRiMod.position.copy(new THREE.Vector3(
            saturn_position.x,
            saturn_position.y,
            saturn_position.z
        ));

        this.#saNameMod.position.copy(new THREE.Vector3(
            saturn_name_position.x,
            saturn_name_position.y,
            saturn_name_position.z
        ));

        this.#saNameMod.lookAt(this.#camera.position);

        // uranus

        this.#urMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                0, // - Math.sin(uranus_tilt),
                1, // + Math.cos(uranus_tilt),
                0
            ),
            uranus_rotation
        );

        this.#urMod.position.copy(new THREE.Vector3(
            uranus_position.x,
            uranus_position.y,
            uranus_position.z
        ));

        this.#urNameMod.position.copy(new THREE.Vector3(
            uranus_name_position.x,
            uranus_name_position.y,
            uranus_name_position.z
        ));

        this.#urNameMod.lookAt(this.#camera.position);

        // neptune

        this.#neMod.setRotationFromAxisAngle(
            new THREE.Vector3(
                0, // - Math.sin(neptune_tilt),
                1, // + Math.cos(neptune_tilt),
                0
            ),
            neptune_rotation
        );

        this.#neMod.position.copy(new THREE.Vector3(
            neptune_position.x,
            neptune_position.y,
            neptune_position.z
        ));

        this.#neNameMod.position.copy(new THREE.Vector3(
            neptune_name_position.x,
            neptune_name_position.y,
            neptune_name_position.z
        ));

        this.#neNameMod.lookAt(this.#camera.position);

        this.#controls.update(deltaT);

	    this.#renderer.render(this.#scene, this.#camera);
        
    }

    run(){

        this.#initScene();
        this.#loadModels();
        this.#setController();
        this.#setWorldMatrix();
        this.#setViewProjectionMatrix();
        this.#setLight();
        this.#handleWindowResizing();
        this.#animate();

    }

}

function main(){

    const app = new SolarSystem3D();
    app.run();

}

main()