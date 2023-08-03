<template>
    <div ref="container"
         class="index"></div>
</template>

<script lang="ts">
/**
 * @file 彩色噪音Mesh
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Component, Ref, Vue } from 'vue-property-decorator';
import { getHedron, HEDRON_TYPE } from '@/utils/three_geometry';
import Disc from '@/views/disc.png';
import snoise from 'glsl-noise/simplex/4d.glsl';
const isDev = import.meta.env.MODE === 'development';

@Component
export default class Index extends Vue {
    @Ref() private readonly container;
    private controls;
    private camera;
    private scene;
    private renderer;
    private stats;
    private center;
    private pointMaterial;

    mounted () {
        this.init([
            this.center = this.initCenter(),
        ]);
        this.animate();
    }

    getHedronPoint (type: HEDRON_TYPE, width = 30, detail = 0) {
        const icosahedron = getHedron(type, width, detail);

        this.pointMaterial = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { value: 0.3 },
                u_amplitude: { value: 17 },
                u_frequency: { value: 3 },
                alphaTest: { value: 1 },
                pointTexture: { value: new THREE.TextureLoader().load(Disc) },
            },
            vertexShader: snoise + `
                precision highp float;

                varying vec3 vNormal;
                attribute float size;

                uniform float u_time;
                uniform float u_amplitude;
                uniform float u_frequency;

                void main () {
                    vNormal = normalMatrix * normalize(normal);
                    gl_PointSize = size;

                    float distortion = snoise(vec4(normal * u_frequency, u_time)) * u_amplitude;
                    vec3 newPosition = position + (normal * distortion);

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }`
            ,
            fragmentShader: `
                varying vec3 vNormal;

                uniform sampler2D pointTexture;
                uniform float alphaTest;

                void main(void) {
                    vec3 viewNv  = normalize(vNormal);
                    vec3 nvColor = viewNv * 0.5 + 0.5;
                    gl_FragColor  = vec4(nvColor, 1.0);

                    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
                    if ( gl_FragColor.a < alphaTest ) discard;
                }
            `,
            transparent: true,
        });
        return new THREE.Mesh(icosahedron, this.pointMaterial);
    }

    initCenter () {
        return this.getHedronPoint(HEDRON_TYPE.Icosahedron, 150, 60);
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

    onWindowResize () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private pre = new Date();

    animate () {
        requestAnimationFrame(this.animate);
        let now = new Date();
        this.pointMaterial.uniforms.u_time.value += (Number(now) - Number(this.pre)) * 0.0005;
        this.pre = now;
        this.renderer.render(this.scene, this.camera);
        if (isDev) {
            this.controls.update();
            this.stats.update();
        }
    }
}
</script>
