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

    // planets

    #planets_names = [];
    #PLANETS_COUNT;

    // scene entities

    #sun_model;
    #saturn_ring_model;

    #planets_models = [];
    #planets_names_models = [];

    #planets_objects = [];

    // controller

    #controller;

    #initScene(){
        
        this.#scene = new THREE.Scene();
        this.#clock = new THREE.Clock();

        this.#renderer = new THREE.WebGLRenderer({ antialias: true });
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        this.#renderer.setPixelRatio(window.devicePixelRatio * 1.5);
        
        document.body.appendChild(this.#renderer.domElement);

        this.#planets_names = [

            "mercury",
            "venus",
            "earth",
            "mars",
            "jupiter",
            "saturn",
            "uranus",
            "neptune"

        ];

        this.#PLANETS_COUNT = this.#planets_names.length;

    }

    #loadModels(){

        // load textures

        const textures_file_path = "assets/textures/";

        const sun_texture = new THREE.TextureLoader().load(

            textures_file_path + "sun.jpg"

        );

        const saturn_ring_texture = new THREE.TextureLoader().load(

            textures_file_path + "planets/saturn-ring.png"

        );

        const planets_textures = [];
        const planets_names_textures = [];
        
        for (var i = 0; i < this.#PLANETS_COUNT; i ++){

            planets_textures.push(
                new THREE.TextureLoader().load(

                    textures_file_path + "planets/" + this.#planets_names[i] + ".jpg"

                )
            )

            planets_names_textures.push(
                new THREE.TextureLoader().load(

                    textures_file_path + "planets-names/" + this.#planets_names[i] + ".png"

                )
            )

        }

        const cubeMapTeLoader = new THREE.CubeTextureLoader().setPath(

            "assets/textures/skybox/"

        );

        const cubeMapTe = cubeMapTeLoader.load([

            "px.jpg", "nx.jpg",
            "py.jpg", "ny.jpg",
            "pz.jpg", "nz.jpg"

        ]);
        
        // create materials

        const sun_material = new THREE.MeshBasicMaterial({ // not affected by light

            map: sun_texture

        }); 

        const saturn_ring_material = new THREE.MeshStandardMaterial({

            map: saturn_ring_texture,
            transparent: true,
            side: THREE.DoubleSide

        });

        const planets_materials = [];
        const planets_names_materials = [];

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){
        
            planets_materials.push(
                new THREE.MeshStandardMaterial({

                    map: planets_textures[i]

                })
            )

            planets_names_materials.push(
                new THREE.MeshBasicMaterial({

                    map: planets_names_textures[i],
                    transparent: true,
                    side: THREE.DoubleSide
                    
                })
            )

        }

        // create mesh

        const sphereRadius = 1, sphereXSegments = 100, sphereYSegments = 100;
        const sphere = new THREE.SphereGeometry(sphereRadius, sphereXSegments, sphereYSegments);

        const ring = new THREE.RingGeometry(1, 2);

        const name_texture_ratio = 720 / 1280;
        const plane = new THREE.PlaneGeometry(1, name_texture_ratio);

        // create models
        
        this.#sun_model = new THREE.Mesh(
            
            sphere,
            sun_material

        );

        this.#saturn_ring_model = new THREE.Mesh(

            ring,
            saturn_ring_material
            
        );

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){

            this.#planets_models.push(
                new THREE.Mesh(

                    sphere,
                    planets_materials[i]

                )
            )

            this.#planets_names_models.push(
                new THREE.Mesh(
                
                    plane,
                    planets_names_materials[i]

                )
            )

        }

        this.#scene.add(this.#sun_model);
        this.#scene.add(this.#saturn_ring_model);

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){
        
            this.#scene.add(this.#planets_models[i]);
            this.#scene.add(this.#planets_names_models[i]); 

        }

        this.#scene.background = cubeMapTe;
        
    }

    #setController(){
        
        var earth_xradius = 0.3; // earth local x-radius
        var earth_a = 4.3; // earth orbit local semi-major axis
        var earth_rotperiod = 2; // earth rotation period in seconds
        var earth_revperiod = 10; // earth revolution period in seconds

        this.#controller = new Controller(earth_xradius, earth_a, earth_rotperiod, earth_revperiod);

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){

            this.#planets_objects.push(
                this.#controller.createPlanet(

                    this.#planets_names[i]

                )
            )

        }

    }

    #setWorldMatrix(){

        // get planets data

        var planets_data = [];
        var planets_names_data = [];

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){

            planets_data.push(
                {

                    radius: this.#planets_objects[i].getSize(),
                    tilt: this.#planets_objects[i].getTilt()

                }
            )

            planets_names_data.push(
                {

                    size: this.#planets_objects[i].getNameSize()

                }
            )

        }

        // set planets

        const SATURN_IDX = this.#planets_names.indexOf("saturn"); // gets index of saturn to set saturn rings

        this.#saturn_ring_model.scale.copy(
            new THREE.Vector3(

                planets_data[SATURN_IDX].radius.x,
                planets_data[SATURN_IDX].radius.y,
                planets_data[SATURN_IDX].radius.z

            )
        );

        this.#saturn_ring_model.rotation.copy(
            new THREE.Euler(

                Math.PI / 2,
                planets_data[SATURN_IDX].tilt,
                0

            )
        );

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){

            this.#planets_models[i].scale.copy(
                new THREE.Vector3(
                    
                    planets_data[i].radius.x,
                    planets_data[i].radius.y,
                    planets_data[i].radius.z

                )
            );

            this.#planets_models[i].rotateZ(

                planets_data[i].tilt

            );

            this.#planets_names_models[i].scale.copy(
                new THREE.Vector3(
                    
                    planets_names_data[i].size.x,
                    planets_names_data[i].size.y,
                    planets_names_data[i].size.z

                )
            )

        }

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

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){

            this.#planets_objects[i].updatePosition(deltaT);
            this.#planets_objects[i].updateRotation(deltaT);

        }

        // get planets data

        var planets_data = [];
        var planets_names_data = [];

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){

            planets_data.push(
                {

                    position: this.#planets_objects[i].getPosition(),
                    rotation: this.#planets_objects[i].getRotation(),
                    // tilt: this.#planets_objects[i].getTilt()

                }
            )

            planets_names_data.push(
                {

                    position: this.#planets_objects[i].getNamePosition()
                
                }
            )

        }

        // set planets

        const SATURN_IDX = this.#planets_names.indexOf("saturn"); // get index of saturn to set saturn rings

        this.#saturn_ring_model.position.copy(
            new THREE.Vector3(

                planets_data[SATURN_IDX].position.x,
                planets_data[SATURN_IDX].position.y,
                planets_data[SATURN_IDX].position.z

            )
        );

        for (var i = 0; i < this.#PLANETS_COUNT; i ++){

            this.#planets_models[i].setRotationFromAxisAngle(
                
                new THREE.Vector3(
                
                    0, // - Math.sin(mercury_tilt),
                    1, // + Math.cos(mercury_tilt),
                    0

                ),
                planets_data[i].rotation

            );

            this.#planets_models[i].position.copy(
                new THREE.Vector3(

                    planets_data[i].position.x,
                    planets_data[i].position.y,
                    planets_data[i].position.z

                )
            );

            this.#planets_names_models[i].position.copy(
                new THREE.Vector3(

                    planets_names_data[i].position.x,
                    planets_names_data[i].position.y,
                    planets_names_data[i].position.z

                )
            );

            this.#planets_names_models[i].lookAt(this.#camera.position);

        }

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