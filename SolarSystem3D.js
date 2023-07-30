import * as THREE from 'three';

class SolarSystem3D{

    #scene; #renderer;
    #camera;

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
        const suMat = new THREE.MeshBasicMaterial({ map: suTe });

        const meTe = new THREE.TextureLoader().load("textures/planets/mercury.jpg");
        const meMat = new THREE.MeshBasicMaterial({ map: meTe });

        const veTe = new THREE.TextureLoader().load("textures/planets/venus.jpg");
        const veMat = new THREE.MeshBasicMaterial({ map: veTe });

        const eaTe = new THREE.TextureLoader().load("textures/planets/earth.jpg");
        const eaMat = new THREE.MeshBasicMaterial({ map: eaTe });

        const maTe = new THREE.TextureLoader().load("textures/planets/mars.jpg");
        const maMat = new THREE.MeshBasicMaterial({ map: maTe });

        const juTe = new THREE.TextureLoader().load("textures/planets/jupiter.jpg");
        const juMat = new THREE.MeshBasicMaterial({ map: juTe });
        
        const saTe = new THREE.TextureLoader().load("textures/planets/saturn.jpg");
        const saMat = new THREE.MeshBasicMaterial({ map: saTe });

        const urTe = new THREE.TextureLoader().load("textures/planets/uranus.jpg");
        const urMat = new THREE.MeshBasicMaterial({ map: urTe });

        const neTe = new THREE.TextureLoader().load("textures/planets/neptune.jpg");
        const neMat = new THREE.MeshBasicMaterial({ map: neTe });

        // create mesh

        const sphereRadius = 1, sphereXSegments = 100, sphereYSegments = 30;
        const sphere = new THREE.SphereGeometry(sphereRadius, sphereXSegments, sphereYSegments);

        // create models
        
        const sun = new THREE.Mesh(sphere, suMat);
        const mercury = new THREE.Mesh(sphere, meMat);
        const venus = new THREE.Mesh(sphere, veMat);
        const earth = new THREE.Mesh(sphere, eaMat);
        const mars = new THREE.Mesh(sphere, maMat);
        const jupiter = new THREE.Mesh(sphere, juMat);
        const saturn = new THREE.Mesh(sphere, saMat);
        const neptune = new THREE.Mesh(sphere, neMat);
        const uranus = new THREE.Mesh(sphere, urMat);

        this.#scene.add(sun);
        this.#scene.add(mercury);
        this.#scene.add(venus);
        this.#scene.add(earth);
        this.#scene.add(mars);
        this.#scene.add(jupiter);
        this.#scene.add(saturn);
        this.#scene.add(neptune);
        this.#scene.add(uranus);

    }

    #setViewProjection(){
        
        const   fovy = 90,
                ar = window.innerWidth / window.innerHeight,
                nearPlane = 0.1,
                farPlane = 1000;

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
        this.#setViewProjection();
        this.#animate();

    }

}

function main(){

    const app = new SolarSystem3D();
    app.run();

}

main()