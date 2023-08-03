/**
 * @file China map
 */
import * as THREE from 'three';
import * as d3 from 'd3';
import { ChinaMapJSON } from './interface';
import { addOrbitControl, screenResize } from '../shared/threejs';
import { createIdcIcon, CSS2DObjectLabel } from './utils';
import { AutoCheckIDC } from './auto_check';
import { LottieLoader } from 'three/examples/jsm/loaders/LottieLoader';
import { bus, BUS_EVENT } from './bus';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { unMounted } from '../threejs_util.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import Point from '../assets/lottie/point.json?url';
import ErrorPoint from '../assets/lottie/point.json?url';
import Normal from '../assets/imgs/china_map_bg.png?url';
import Big from '../assets/imgs/china_map_bg_big.png?url';

// China Map JSON
const OFFSET = {
    x: -1,
    y: 1,
    z: 3.9,
};

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const isDev = import.meta.env.MODE === 'development';
export interface idcPosVal {
    position: THREE.Vector3;
    idc: any;
}
export default class {
    public scene: THREE.Scene | undefined;
    public camera: THREE.Camera | undefined;
    public mapObject: THREE.Object3D | undefined;
    private idcPosMap: Map<string, idcPosVal> = new Map();
    private lottieMap: Map<string, THREE.Mesh> = new Map();
    private tooltipLabel: CSS2DObjectLabel | undefined;
    private reqID: number | null = null;
    private stats: Stats | null = null;
    private controls: OrbitControls | null = null;
    private $el: HTMLElement | null = null;
    private idcIconRenderer: CSS2DRenderer | null = null;
    private renderer: THREE.WebGLRenderer | null = null;
    private autoCheckIdc: AutoCheckIDC | null = null;

    // 点击事件
    private onClickMap: ((title: string) => void) | null = null;

    public constructor (el: HTMLElement, onClickMap: (title: string) => void) {
        this.$el = el;
        this.onClickMap = onClickMap;
    }

    private createBg () {
        const loader = new THREE.TextureLoader();
        const bgPath = window.devicePixelRatio >= 2 ? Big : Normal;

        loader.load(bgPath, (bgTexture: THREE.Texture) => {

            this.scene!.background = bgTexture;

            if (window.devicePixelRatio >= 2 ){
                this.scene!.position.y! = 0.2;
                this.scene!.position.x! = -0.5;
            }
        });
    }

    public async init(idcList: any[]) {
        THREE.Cache.enabled = true;

        this.camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 5000);
        this.camera.position.set(5.998600774902864, -40.701576918746085, 112.93681283361553);
        this.scene = new THREE.Scene();

        this.createBg();
        this.idcIconRenderer = new CSS2DRenderer();

        // const geoData = await this.loadMapData();
        // this.generateGeometry(geoData);
        // this.scene.add(this.mapObject!);

        const projection = d3.geoMercator().center([104.0, 37.5]).scale(100)
            .translate([0, 0]);

        idcList.forEach(idc => {
            try {
                const [x, y] = projection(idc.center);
                const position = new THREE.Vector3(...[
                    x + OFFSET.x,
                    -y + OFFSET.y
                ], 0 + OFFSET.z);
                this.idcPosMap.set(idc.name, { position, idc });
            } catch (error) {
                console.log('idc', idc);
            }
        });

        this.loadLottieIcon();
        this.idcIconRendererInit();
        this.startAutoCheck();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(WIDTH, HEIGHT);

        this.$el?.appendChild(this.renderer.domElement);

        if (isDev) {
            // this.stats = initStats(this.$el);
        }
        this.controls = addOrbitControl(this.camera, this.renderer.domElement);
        this.render();
        window.addEventListener('resize', this.onResize);
    }

    private onResize = () => {
        screenResize(this.camera, this.renderer);
        this.idcIconRenderer?.setSize(WIDTH, HEIGHT);
    };

    private loadMapData(): Promise<ChinaMapJSON> {
        const loader = new THREE.FileLoader();
        loader.setResponseType('json');

        return new Promise((resolve, reject) => {
            loader.load('./observable_platform/geo/china_map.json', data => {

                const jsonData = JSON.parse(JSON.stringify(data));
                resolve(jsonData);

            }, undefined, reject);
        });
    }

    private generateGeometry(jsonData: ChinaMapJSON) {
        // 初始化一个地图对象
        this.mapObject = new THREE.Object3D();

        // 墨卡托投影转换
        const projection = d3.geoMercator().center([104.0, 37.5]).scale(100)
            .translate([0, 0]);

        jsonData.features.forEach(elem => {
            // 定一个省份3D对象
            const province = new THREE.Object3D();
            // 每个的 坐标 数组
            const coordinates = elem.geometry.coordinates;
            // 循环坐标数组
            coordinates.forEach(multiPolygon => {
                multiPolygon.forEach(polygon => {
                    const lineMaterial = new THREE.LineBasicMaterial({ transparent: true, opacity: 1 });
                    const points = [];
                    const shape = new THREE.Shape();
                    for (let i = 0; i < polygon.length; i++) {
                        const [x, y] = projection(polygon[i]);
                        if (i === 0) {
                            shape.moveTo(x, -y);
                        }
                        shape.lineTo(x, -y);
                        points.push(new THREE.Vector3(x, -y, 0));
                    }

                    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

                    const line = new THREE.Line(lineGeometry, lineMaterial);

                    province.add(line);

                });
            });

            // 将 geojson 的 properties 放到模型中，后面会用到
            province.properties = elem.properties;
            if (elem.properties.centroid) {
                const [x, y] = projection(elem.properties.centroid);
                province.properties._centroid = [x, y];
            }

            this.mapObject!.add(province);
        });

        this.mapObject!.position.x = OFFSET.x;
        this.mapObject!.position.y = OFFSET.y;
        this.mapObject!.position.z = OFFSET.z;
    }

    private async genLottie(province: string, { position, idc }: idcPosVal) {
        const loader = new LottieLoader();
        loader.setQuality(3);

        const status = idc.isWarning;

        const point = status ? ErrorPoint : Point;

        loader.load(point, (texture: THREE.Texture) => {
            const random = Math.random();
            const speed = random < 0.5 && random > 0.3 ? random : 0.2;
            texture?.animation?.setSpeed?.(speed);


            const geometry = new THREE.CircleGeometry(4, 8);
            const material = new THREE.MeshBasicMaterial({ transparent: true, map: texture, depthWrite: false });

            const circle = new THREE.Mesh(geometry, material);
            circle.position.set(position.x, position.y, position.z);
            circle.name = this.getIdcMapKey(province);

            this.scene?.add(circle);

            this.lottieMap.set(this.getIdcMapKey(province), circle);
        });
    }

    private loadLottieIcon() {
        const positionsKes = this.idcPosMap.keys();
        for (const province of positionsKes) {

            const provinceInfo = this.idcPosMap.get(province);
            this.genLottie(province, provinceInfo!);
        }
    }

    private createIdcToolTip(key: string, isWarning: boolean) {
        if (!this.tooltipLabel){
            this.tooltipLabel = createIdcIcon(isWarning, key, this.onClickMap);
        } else {
            this.tooltipLabel?.changeTextContent?.(key);
            this.tooltipLabel?.changeIdcStatus?.(isWarning);
        }
        this.tooltipLabel.name = key;
        return this.tooltipLabel;
    }

    private startAutoCheck() {
        this.autoCheckIdc = new AutoCheckIDC({
            positionMap: this.idcPosMap,
            timeInterval: 3000
        });

        let prevMaterialMap: THREE.Texture;
        this.autoCheckIdc.start((key, value, prevKey, isWarning) => {
            bus.trigger(BUS_EVENT.AUTO_CHECK_IDC, key);

            const _prevLottie = this.lottieMap.get(this.getIdcMapKey(prevKey))!;
            prevMaterialMap && setLottieMap(_prevLottie.material as THREE.MeshBasicMaterial, prevMaterialMap);
            const curLottie = this.lottieMap.get(this.getIdcMapKey(key))!;
            const material = curLottie.material as THREE.MeshBasicMaterial;
            prevMaterialMap = material.map!;
            setLottieMap(material);
            const tooltip = this.createIdcToolTip(key, isWarning);
            // tooltip?.addExitAnimate?.();
            curLottie.add(tooltip);
        });

        function setLottieMap(material: THREE.MeshBasicMaterial, materialMap?: THREE.Texture ) {
            material.map = materialMap ?? null;
            material.opacity = materialMap ? 1 : 0;
            material.transparent = true;
            material.needsUpdate = true;
        }
    }
    public clearAutoCheck(){
        this.autoCheckIdc?.clear();
    }

    private getIdcMapKey(province: string) {
        return `${province}-lottie`;
    }

    private idcIconRendererInit() {
        if (this.idcIconRenderer) {
            this.idcIconRenderer?.setSize(WIDTH, HEIGHT);
            this.idcIconRenderer.domElement.style.position = 'absolute';
            this.idcIconRenderer.domElement.style.top = '52px';
            // this.idcIconRenderer.domElement.style.zIndex = '99';
            document.body.appendChild(this.idcIconRenderer?.domElement);
        }
    }

    private render () {
        this.stats?.update();
        this.controls?.update();
        this.renderer?.render(this.scene, this.camera);
        this.idcIconRenderer?.render(this.scene, this.camera);

        this.reqID = requestAnimationFrame(this.render.bind(this));
    }

    public unMount () {
        window.removeEventListener('resize', this.onResize);

        unMounted(this);

        this.tooltipLabel?.element.remove();
        this.idcIconRenderer?.domElement.remove();

        if (this.reqID) {
            cancelAnimationFrame(this.reqID);
            this.reqID = null;
        }
    }

}

