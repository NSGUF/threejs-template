<template>
    <div ref="container"
         class="index"></div>
</template>

<script lang="ts">
/**
 * @file cloud.2.07 - 首页入口
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Component, Ref, Vue } from 'vue-property-decorator';
import {
    getCylinder,
    getGroup,
    getIcosahedron,
    getIcosahedronPoint, getOctahedron, getOctahedronPoint,
    getSphere, getTetrahedron, getTetrahedronPoint,
} from '@/utils/three_geometry';
import { rotateOnePoint, /* rotateOnePoint2, rotateOnePoint3, */rotateSelfY } from '@/utils/three_action';

// const SEPARATION = 100;
// const AMOUNTX = 250;
// const AMOUNTY = 200;
const isDev = import.meta.env.MODE === 'development';
// import RainDrop from './raindrop-3.png';
import { getPointRainy, renderPointRainy } from '@/utils/three_points';

@Component
export default class Index extends Vue {
    @Ref() private readonly container;
    private controls;
    private particles;
    private camera;
    private scene;
    private renderer;
    private stats;
    private count = 0;
    private font;
    private pointRainy;
    private obstacle;
    private safe;
    private optimization;
    private rotateGroupObs;
    private rotateGroupSafe;
    private rotateGroupOptimization;
    private center;

    mounted () {
        this.init([
            this.center = this.initCenter(),
            this.obstacle = this.initObstacleRemoval(),
            this.safe = this.initSafe(),
            this.optimization = this.initOptimization(),
            this.initPointRainy,
        ]);
        this.animate();
    }

    initCenter () {
        return getIcosahedronPoint(0x793dc5, 150, 60);
    }

    initPointRainy () {
        return this.pointRainy = getPointRainy();
    }

    init (meshs: any[]) {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width / height;

        let container = this.container;
        this.scene = new THREE.Scene();
        meshs.forEach(item => {
            if (typeof item === 'function') {
                this.scene.add((() => item())());
            } else {
                this.scene.add(item);
            }
        });

        this.camera = new THREE.PerspectiveCamera(60, k, 1, 10000);
        this.camera.position.set(600, 0, 1000); // 设置相机位置
        this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)

        let ambient = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambient);

        const helper = new THREE.AxesHelper(1000);
        this.scene.add(helper);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x050533, 1);
        container.appendChild(this.renderer.domElement);
        container.style.touchAction = 'none';

        if (isDev) {
            this.stats = new Stats();
            container.appendChild(this.stats.dom);
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.update();
        }

        window.addEventListener('resize', this.onWindowResize);
    }

    // initWaves () {
    //     const numParticles = AMOUNTX * AMOUNTY;
    //     const positions = new Float32Array(numParticles * 3);
    //     const scales = new Float32Array(numParticles);
    //     let i = 0, j = 0;
    //
    //     for (let ix = 0; ix < AMOUNTX; ix++) {
    //         for (let iy = 0; iy < AMOUNTY; iy++) {
    //             positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
    //             positions[i + 1] = 0; // y
    //             positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z
    //             scales[j] = 1;
    //             i += 3;
    //             j++;
    //         }
    //     }
    //
    //     const geometry = new THREE.BufferGeometry();
    //     geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    //     geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    //
    //     const material = new THREE.PointsMaterial({ color: 0x888888 });
    //
    //     this.particles = new THREE.Points(geometry, material);
    //     return this.particles;
    // }

    initObstacleRemoval () {
        return getGroup([
            getIcosahedronPoint(0x9e4c60, 60, 10),
            this.rotateGroupObs = getGroup([
                getIcosahedron(0x9e4c60, 30),
                getIcosahedron(0x9e4c60, 15),
                getIcosahedronPoint(0x9e4c60, 30),
            ]),
            getCylinder(0x9e4c60),
        ], 0, 0, 420);
    }

    initSafe () {
        return getGroup([
            getSphere(0x793d1d),
            this.rotateGroupSafe = getGroup([
                getTetrahedron(0x793d1d, 30),
                getTetrahedron(0x793d1d, 15),
                getTetrahedronPoint(0x9e4c60, 30),
            ]),
            getCylinder(0x793d1d),
        ], 420, 0, 0);
    }

    initOptimization () {
        return getGroup([
            getSphere(0x213483),
            this.rotateGroupOptimization = getGroup([
                getOctahedron(0x213483, 30),
                getOctahedron(0x213483, 15),
                getOctahedronPoint(0x9e4c60, 30),
            ]),
            getCylinder(0x213483),
        ], 0, 420, 0);
    }

    onWindowResize () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    renderPointRainy () {
        renderPointRainy(this.pointRainy);
    }

    renderTip () {
        rotateOnePoint(this.obstacle);
        rotateOnePoint(this.safe, 2 / 3 * Math.PI);
        rotateOnePoint(this.optimization, 4 / 3 * Math.PI);
        rotateSelfY([
            this.rotateGroupObs,
            this.rotateGroupSafe,
            this.rotateGroupOptimization
        ]);
    }

    // renderWaves () {
    //     let camera = this.camera;
    //     camera.position.x += (10 - camera.position.x) * .05;
    //     camera.position.y += (1000 - camera.position.y) * .05;
    //     camera.lookAt(this.scene.position);
    //     const positions = this.particles.geometry.attributes.position.array;
    //     const scales = this.particles.geometry.attributes.scale.array;
    //     let i = 0, j = 0;
    //     for (let ix = 0; ix < AMOUNTX; ix++) {
    //
    //         for (let iy = 0; iy < AMOUNTY; iy++) {
    //
    //             positions[i + 1] = (Math.sin((ix + this.count) * 0.3) * 50) +
    //                 (Math.sin((iy + this.count) * 0.5) * 50);
    //
    //             scales[j] = (Math.sin((ix + this.count) * 0.3) + 1) * 20 +
    //                 (Math.sin((iy + this.count) * 0.5) + 1) * 20;
    //
    //             i += 3;
    //             j++;
    //
    //         }
    //
    //     }
    //     this.particles.geometry.attributes.position.needsUpdate = true;
    //     this.particles.geometry.attributes.scale.needsUpdate = true;
    //     this.count += 0.1;
    // }

    animate () {
        this.renderPointRainy();
        this.renderTip();
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        if (isDev) {
            this.controls.update();
            this.stats.update();
        }
    }
}
</script>
