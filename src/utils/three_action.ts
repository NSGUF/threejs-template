/**
 * threejs的工具 各种动作
 */

import { Object3D } from 'three';

const RADIOX = 320;

export function rotateOnePoint (mesh: Object3D, space = 0) {
    const r = Date.now() * 0.0002;
    mesh.position.x = RADIOX * Math.cos(r + space);
    mesh.position.z = RADIOX * Math.sin(r + space);
    mesh.position.y = -1 / 2 * RADIOX * Math.sin(r + space);
}

export function rotateSelfY (mesh: Object3D | Object3D[]) {
    if (mesh instanceof Array) {
        mesh.forEach(item => item.rotateY(0.01));
    } else {
        mesh.rotateY(0.01);
    }
}
