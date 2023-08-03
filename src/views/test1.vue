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

const isDev = import.meta.env.MODE === 'development';

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
        // let self = this;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let k = width / height;

        let container = this.container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, k, 1, 10000);
        this.camera.position.set(100, 0, 100); // 设置相机位置
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
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        if (isDev) {
            this.controls.update();
            this.stats.update();
        }
    }
}
</script>
