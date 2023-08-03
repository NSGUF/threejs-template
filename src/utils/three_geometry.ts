/**
 * threejs的工具 获取各种形状
 */

import * as THREE from 'three';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import AndalusRegular from '@/views/SimHei_Regular.json';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils';
import Disc from '@/views/disc.png';
import { Object3D } from 'three';

export const enum HEDRON_TYPE {
    Icosahedron = 'Icosahedron',
    Dodecahedron = 'Dodecahedron',
    Octahedron = 'Octahedron',
    Tetrahedron = 'Tetrahedron',
}

/**
 * 获取各种正立方体的模型实例
 * @param type 类型
 * @param width 大小
 */
export function getHedron (type: HEDRON_TYPE, width: number, detail: number = 0) {
    if (!type) {
        throw 'type参数必须传入';
    }
    let result;
    switch (type) {
        case HEDRON_TYPE.Icosahedron:
            result = new THREE.IcosahedronGeometry(width, detail);
            break;
        case HEDRON_TYPE.Tetrahedron:
            result = new THREE.TetrahedronGeometry(width, detail);
            break;
        case HEDRON_TYPE.Octahedron:
            result = new THREE.OctahedronGeometry(width, detail);
            break;
        case HEDRON_TYPE.Dodecahedron:
            result = new THREE.DodecahedronGeometry(width, detail);
            break;
    }
    return result;
}

export function getTextCanvas (text: string) {
    let width = 400;
    let height = 20;
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    ctx.font = 16 + 'px " bold';
    ctx.fillStyle = '#90465c';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, height / 2);
    return canvas;
}

/**
 * 获取圆柱体
 * @param color 颜色
 * @param radius 半径
 * @param height 高度
 */
export function getCylinder (color = 0xffffff, radius = 100, height = 30,) {
    const geometry = new THREE.CylinderBufferGeometry(radius, radius, height, 32, 1, true);
    const materials = [
        new THREE.MeshBasicMaterial({
            map: new THREE.CanvasTexture(getTextCanvas('test')),
            color,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        })
    ];

    geometry.rotateX(-Math.PI / 10);
    geometry.rotateZ(Math.PI / 20);
    geometry.rotateY(Math.PI / 10);
    return new THREE.Mesh(geometry, materials);
}

/**
 * 获取文字
 * @param text 具体文字
 * @param color 颜色
 */
// export function getText (text: string, color = 0xffffff) {
//     const loader = new FontLoader();
//     let font = loader.parse(AndalusRegular);
//     const geometry = new TextGeometry(text, {
//         size: 16,
//         font,
//         height: 2,
//     });
//     const material = [
//         new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
//         new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
//     ];
//     return new THREE.Mesh(geometry, material);
// }

/**
 * 获取带特殊材质的网格对象
 * @param type 类型
 * @param color 颜色
 * @param width 宽度
 */
export function getHedronMesh (type: HEDRON_TYPE, color: number, width: number, detail = 0) {
    const headron = getHedron(type, width, detail);
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.25,
    });
    material.side = THREE.DoubleSide;
    const frameMaterial = new THREE.MeshBasicMaterial({
        wireframe: true,
        color,
    });

    return new SceneUtils.createMultiMaterialObject(headron, [material, frameMaterial]);
}

export function getIcosahedron (color: number, width: number) {
    return getHedronMesh(HEDRON_TYPE.Icosahedron, color, width);
}

export function getDodecahedron (color: number, width: number) {
    return getHedronMesh(HEDRON_TYPE.Dodecahedron, color, width);
}

export function getOctahedron (color: number, width: number) {
    return getHedronMesh(HEDRON_TYPE.Octahedron, color, width);
}

export function getTetrahedron (color: number, width: number) {
    return getHedronMesh(HEDRON_TYPE.Tetrahedron, color, width);
}

export function getIcosahedronPoint (color = 0xfffff, width = 30, detail: number = 0) {
    return getHedronPoint(HEDRON_TYPE.Icosahedron, color, width, detail);
}

export function getDodecahedronPoint (color = 0xfffff, width = 30, detail: number = 0) {
    return getHedronPoint(HEDRON_TYPE.Dodecahedron, color, width, detail);
}

export function getOctahedronPoint (color = 0xfffff, width = 30, detail: number = 0) {
    return getHedronPoint(HEDRON_TYPE.Octahedron, color, width, detail);
}

export function getTetrahedronPoint (color = 0xfffff, width = 30, detail: number = 0) {
    return getHedronPoint(HEDRON_TYPE.Tetrahedron, color, width, detail);
}

/**
 * 获取 带顶点的 网格对象
 * @param type 类型
 * @param color 颜色
 * @param width 宽度
 */
export function getHedronPoint (type: HEDRON_TYPE, color = 0xfffff, width = 30, detail: number = 0) {
    const icosahedron = getHedron(type, width, detail);

    // const sprite = new THREE.TextureLoader().load(Disc);
    // const pointMaterial = new THREE.PointsMaterial({
    //     map: sprite,
    //     size: 7,
    //     transparent: true
    // });
    const pointMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(color) },
            alphaTest: { value: 1 },
            pointTexture: { value: new THREE.TextureLoader().load(Disc) },
        },
        vertexShader: `
        attribute float size;

        void main() {
            gl_PointSize = size;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform sampler2D pointTexture;
            uniform float alphaTest;

            void main() {
                gl_FragColor = vec4( vec3( color ), 1 );
                gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
                if ( gl_FragColor.a < alphaTest ) discard;
            }`,

        transparent: true,
        // blending: THREE.AdditiveBlending
    });

    const positionAttribute = icosahedron.getAttribute('position');
    const sizes = [];
    for (let i = 0, l = positionAttribute.count; i < l; i++) {
        sizes[i] = 4;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    return new THREE.Points(geometry, pointMaterial);
}

export function getSphere (color = 0xffffff, radius = 60, widthSegments = 80, heightSegments = 40) {
    const sphere = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.PointsMaterial({
        color: color,
        size: 0.1,
        transparent: true,
    });
    return new THREE.Points(sphere, material);
}

export function getGroup (meshs: Object3D[], x = 0, y = 0, z = 0) {
    const group = new THREE.Group();
    meshs.forEach((item: Object3D) => {
        group.add(item);
    });
    group.position.set(x, y, z);
    group.rotateX(Math.PI / 10);
    group.rotateZ(-Math.PI / 10);
    return group;
}
