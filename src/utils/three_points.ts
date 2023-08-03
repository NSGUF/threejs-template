/**
 * threejs的工具 生成各种中points
 */

import * as THREE from 'three';
import RainDrop from '@/views/raindrop-3.png';
import { Object3D, Points } from 'three';

export function getPointRainy () {
    let texture = THREE.ImageUtils.loadTexture(RainDrop);
    let geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(1500);
    let material = new THREE.ParticleBasicMaterial({
        size: 20,
        transparent: true,
        opacity: 0.6,
        map: texture,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        color: 0xffffff
    });


    let range = 1000;
    for (let i = 0; i < 1500; i++) {
        positions[i] = Math.random() * range - range / 2; // x
        positions[i + 1] = Math.random() * range * 1.5; // y
        positions[i + 2] = Math.random() * range - range / 2; // z
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    let pointRainy = new THREE.ParticleSystem(geometry, material);
    pointRainy.sortParticles = true;
    pointRainy.rotateZ(Math.PI);
    pointRainy.rotateY(Math.PI);
    return pointRainy;
}

export function renderPointRainy (pointRainy: Points) {
    let vertices = pointRainy.geometry.attributes.position.array as number[];
    for (let i = 1; i < vertices.length; i = i + 3) {
        vertices[i] = vertices[i] - 0.1
        if (vertices[i] <= 0) vertices[i] = 60;
    }
    pointRainy.geometry.attributes.position.needsUpdate = true;
}
