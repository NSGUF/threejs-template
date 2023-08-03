/**
 * @file three 公共辅助方法
 */
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import 'lottie-web/build/player/esm/lottie_canvas.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function initStats($el) {
    const stats = new Stats();
    $el.appendChild(stats.domElement);
    return stats;
}

export function addCameraHelper(camera: THREE.Camera, scene: THREE.Scene) {
    // scene.add(new THREE.CameraHelper(camera));
}

export function addAxesHelper(scene: THREE.Scene) {
    // const axesHelper = new THREE.AxesHelper(700);
    // scene.add(axesHelper);
}

export function addOrbitControl(camera: THREE.Camera, domElement?: HTMLElement | undefined): OrbitControls {
    const orbitControl = new OrbitControls(camera, domElement);
    return orbitControl;
}

export function screenResize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer){
    camera.aspect = window.innerWidth / (window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
}


export function removeObject3D (object3D: THREE.Object3D){
    if (!(object3D instanceof THREE.Object3D)) return false;

    object3D?.geometry?.dispose?.();

    object3D?.material?.forEach?.(material => material?.dispose?.()) ?? object3D?.material?.dispose?.();

    // the parent might be the scene or another Object3D, but it is sure to be removed this way
    object3D.removeFromParent();

    return true;
}
