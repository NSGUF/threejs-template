/**
 * Created on 2022/9/26.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene = new THREE.Scene();

let camera;
let controls;
const renderer = new THREE.WebGLRenderer({ antialias: true });
let groupLines;
let people;

function addLine () {
    groupLines = new THREE.Group();
    let commonScale = 1.2;
    groupLines.add(
        getLine(2, commonScale, Math.PI * 1.8),
        getLine(1.5, commonScale, Math.PI * 1.5),
        getLine(0.2, 1.5, Math.PI * 1.2),
        getLine(-0.2, 1.5, Math.PI * 0.9),
        getLine(-1.5, commonScale, Math.PI * 0.6),
        getLine(-2, commonScale, Math.PI * 0.3)
    );
    scene.add(groupLines);
}

function getLine (y, scale, rotateY) {
    const vertices = [];
    const divisions = 50;
    const base = 4.3;

    for (let i = 0; i <= divisions; i++) {
        const v = (i / divisions) * (Math.PI * 2.5);
        const x = base * Math.sin(v);
        const z = base * Math.cos(v);
        y += 0.01;
        vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.LineBasicMaterial({
        color: 0x132a61,
        linewidth: 0.1,
    });
    const line = new THREE.Line(geometry, material);
    line.scale.setScalar(scale);
    line.rotateY(rotateY);
    return line;
}

let top = 0.8;
let flag = 1;

function animate () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    groupLines.rotation.y += 0.01;
    if (people) {
        let y = people.position.y;
        if (y >= top) {
            flag = -1;
        } else if (y <= 0) {
            flag = 1;
        }
        people.position.y += 0.01 * flag;
    }
    controls.update();
}


function addPeople (id) {
    // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

    let w = 170;
    let h = 130;
    let camaraBili = 25;
    camera = new THREE.OrthographicCamera(
        w / - camaraBili,
        w / camaraBili,
        h / camaraBili,
        h / - camaraBili, 0.1, 20);
    camera.position.set(10, 5, 10);
    camera.lookAt(scene.position);
    let ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(width, height);
    renderer.setSize(170, 130);
    // renderer.setClearColor(0xffffff, 1);
    renderer.setClearColor(0x010726, 1);
    document.getElementById(id).appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    addLine();

    const loader = new GLTFLoader();
    loader.load('../static/images/rack/LeePerrySmith.glb', gltf => {
        people = gltf.scene.children[0];
        const group = new THREE.Group();
        group.scale.multiplyScalar(0.8);
        scene.add(group);
        group.rotateY(Math.PI * 0.26);
        group.scale.y = 1.1;
        group.add(people);
    });

    animate();
}

export {
    addPeople
};
