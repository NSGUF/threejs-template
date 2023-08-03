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
// import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils.js';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
// import Disc from './disc.png';
// import { getHedron, HEDRON_TYPE } from '@/utils/three_utils';

// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import AndalusRegular from './SimHei_Regular.json';

// const SEPARATION = 100;
// const AMOUNTX = 250;
// const AMOUNTY = 200;
const isDev = import.meta.env.MODE === 'development';
import RainDrop from './raindrop-3.png';
// import { Geometry } from 'three/examples/jsm/deprecated/Geometry.js';

let cloud;
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

    mounted () {
        this.init();
        this.animate();
    }

    init () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let self = this;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width / height;

        let container = this.container;
        this.scene = new THREE.Scene();




        let controls = new function () {
            this.size = 3;
            this.transparent = true;
            this.opacity = 0.6;
            this.color = 0xffffff;

            this.sizeAttenuation = true;

            this.redraw = function () {
                self.scene.remove(self.scene.getObjectByName('particles1'));
                self.scene.remove(self.scene.getObjectByName('particles2'));

                createPointCloud(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
            };
        }();

        controls.redraw();



        function createPointCloud(size, transparent, opacity, sizeAttenuation, color) {

            let texture = THREE.ImageUtils.loadTexture(RainDrop);
            let geometry = new THREE.BufferGeometry();

            let material = new THREE.ParticleBasicMaterial({
                size: size,
                transparent: transparent,
                opacity: opacity,
                map: texture,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: sizeAttenuation,
                color: color
            });

            const positions = new Float32Array(1500);


            let range = 40;
            for (let i = 0; i < 1500; i++) {
                positions[i] = Math.random() * range - range / 2; // x
                positions[i + 1] = Math.random() * range * 1.5; // y
                positions[i + 2] = Math.random() * range - range / 2; // z
                // particle.velocityY = 0.1 + Math.random() / 5;
                // particle.velocityX = (Math.random() - 0.5) / 3;
                // geom.vertices.push(particle);
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            cloud = new THREE.ParticleSystem(geometry, material);
            cloud.sortParticles = true;
            cloud.rotateZ(Math.PI);
            cloud.rotateY(Math.PI);

            self.scene.add(cloud);
        }



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

    onWindowResize () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate () {
        let vertices = cloud.geometry.attributes.position.array;
        for (let i = 1; i < vertices.length; i = i + 3) {
            vertices[i] = vertices[i] - 0.1;
            if (vertices[i] <= 0) vertices[i] = 60;
        }
        cloud.geometry.attributes.position.needsUpdate = true;
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        if (isDev) {
            this.controls.update();
            this.stats.update();
        }
    }
}
</script>
