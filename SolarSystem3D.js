import * as THREE from 'three';
import Planet from './Planet.js';

class SolarSystem3D{

    // scene configuration
    #scene; #renderer; #camera;

    // scene entities
    #suMod; #meMod; #veMod; #eaMod; #maMod; #juMod; #saMod; #urMod; #neMod; // models
    #mercury; #venus; #earth; #mars; #jupiter; #saturn; #uranus; #neptune; // objects

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

        const sphereRadius = 1, sphereXSegments = 100, sphereYSegments = 30;
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
        
        this.#mercury = new Planet(1, 3, 2, 2, "mercury");

    }

    #setWorldMatrix(){

        // this.#suMod.position.copy(new THREE.Vector3(0, 0, 0));
        // ....

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