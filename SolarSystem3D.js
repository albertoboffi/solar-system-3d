import * as THREE from 'three';

class SolarSystem3D{

    #initScene(){
        
        const scene = new THREE.Scene();

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

    }

    #setProjectionMatrix(){
        
        const fovy = 90;
        const ar = window.innerWidth / window.innerHeight;
        const nearPlane = 0.1;
        const farPlane = 1000;

        const camera = new THREE.PerspectiveCamera(
            fovy,
            ar,
            nearPlane,
            farPlane
        );

    }

    run(){

        this.#initScene();
        this.#setProjectionMatrix();

    }

}

function main(){

    const app = new SolarSystem3D();
    app.run();
    
}