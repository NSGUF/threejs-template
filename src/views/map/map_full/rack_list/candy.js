/**
 * 3D机架
 */

import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import Server from './img/server.png';
import Back from './img/back.png';
import Side from './img/side.png';
import Top from './img/top.png';
import lottie from 'lottie-web';
import { LottieLoader } from 'three/examples/jsm/loaders/LottieLoader';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import CameraControls from 'camera-controls';

CameraControls.install( { THREE: THREE } );
const clock = new THREE.Clock();

// 添加url后缀是获取url地址的意思
import Error from './img/error.json?url';
import Bg from './img/bg.png?url';
import { createGUI, unMounted } from '../threejs_util.js';

const isDev = import.meta.env.MODE === 'development';

const w = window.innerWidth;
const h = window.innerHeight;


// 机架的长宽高
const RACK_LENGTH = 35;
const RACK_WIDTH = 30;
const RACK_HEIGHT = 100;
const RACK_THICK = 2;

// 每个机架之间的距离
const HORIZONTAL_MARGIN = 5;
const PORTRAIT_MARGIN = 90;

// 服务器的高度
const SERVER_HEIGHT = 7;

// 服务器往里面缩的距离
const SERVER_MARGIN = 3;

const SERVER_COLOR = 0x0c0c0c;

// 服务器个数
const SERVER_NUMS = 13;

// 服务器之间的间距
const SERVER_HEIGHT_MARGIN = .4;

// 服务器对象的名称前缀
const SERVER_NAME = 'server';

const HOLLOW_WIDTH = 4;

// 所有物体的动效函数
let animates = [];

// requestAnimationFrame的唯一ID
let reqID = null;

// 3D的基本信息
let app;

// 所有机架Group对象
let rackGroup;

const BOX_HOLLOW_TYPE = {
    DK: 'DK',
    DC: 'DC',
};

/**
 * 初始化three基础控件
 * @param el
 * @param serverList
 * @return {{renderer: WebGLRenderer, controls: OrbitControls, stats: Stats, camera: OrthographicCamera, scene: Scene}}
 */
// eslint-disable-next-line no-unused-vars
function initApp (el, serverList) {
    const LOOK_AT_POS = new THREE.Vector3(0, 45, 0);
    const FAR = 5000;

    const scene = new THREE.Scene();
    new THREE.TextureLoader().load(Bg, bgTexture => {
        scene.background = bgTexture;
    });

    // let camaraProp = getCamaraProp(serverList.length);

    // 正交投影
    // const camera = new THREE.OrthographicCamera(
    //     w / -camaraProp,
    //     w / camaraProp,
    //     h / camaraProp,
    //     h / -camaraProp,
    //     1,
    //     FAR
    // );
    const camera = new THREE.PerspectiveCamera(30, w / h, 100, FAR);

    camera.position.set(900, 600, 900);
    camera.lookAt(LOOK_AT_POS);

    camera.layers.enableAll();
    camera.layers.toggle(1);

    const renderer = new THREE.WebGLRenderer({

        // 抗锯齿：边缘柔化，可以消除混叠
        antialias: true,

        // canvas是否包含alpha (透明度) 默认为 false
        alpha: true,
        precision: 'highp'
    });

    // 设置alpha 0 可让底部透明
    renderer.setClearAlpha(0.0);

    // 防止HiDPI设备在较小尺寸下显示高分辨率导致的显示比较模糊
    renderer.setPixelRatio(window.devicePixelRatio);
    el.appendChild(renderer.domElement);

    let labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.id = 'rack-label-wrap';
    el.appendChild(labelRenderer.domElement);

    setRendererSize(renderer, labelRenderer);
    el.style.touchAction = 'none';
    let controls;
    let stats;
    let gui;

    controls = new OrbitControls(camera, labelRenderer.domElement);

    // 交互要求 只能水平移动，不能上下转动
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 3;

    // 使用了这个3d旋转工具后，camera.lookAt会失效，所以需要设置target
    controls.target = LOOK_AT_POS;
    controls.update();

    if (isDev) {

        // 设置帮助工具
        // let helper = new THREE.AxesHelper(FAR);
        // scene.add(helper);
        stats = Stats();
        el.appendChild(stats.dom);
        gui = new GUI({ title: 'rackGroup' });
    }

    const cameraControls = new CameraControls( camera, labelRenderer.domElement );
    cameraControls.maxPolarAngle = Math.PI / 2;
    cameraControls.minPolarAngle = Math.PI / 3;
    cameraControls.minDistance = 300; // 限制最大缩放距离，防止摄像机进入机柜内部，只在透视摄像机下生效

    cameraControls.target = LOOK_AT_POS;
    cameraControls.update();

    return {
        camera,
        cameraControls,
        scene,
        renderer,
        labelRenderer,
        controls,
        stats,
        gui
    };
}

/**
 * 底部圆圈
 */
function createErrorRound (errorGroup) {
    let backPlane;
    window.bodymovin = lottie;
    new LottieLoader().load(Error, texture => {
        const ROUND_COLOR = 0xf4291b;
        texture.animation.setSpeed(0.5);
        texture.animation.play();
        const geometry = new THREE.CircleGeometry(RACK_LENGTH + 10, 110, 1, 50);
        const material = new THREE.MeshStandardMaterial({

            // transparent设置为true，开启透明，否则opacity不起作用
            transparent: true,
            opacity: 0.5,
            color: ROUND_COLOR,
            emissive: ROUND_COLOR,
            depthWrite: false,
            map: texture
        });
        backPlane = new THREE.Mesh(geometry, material);
        geometry.rotateX(-Math.PI / 2);
        geometry.translate(0, 0.15, 0);
        errorGroup.add(backPlane);
    });
}

/**
 * 添加底部大图片
 * @return {{obj: Mesh<PlaneGeometry, MeshBasicMaterial>}}
 */
// eslint-disable-next-line no-unused-vars
function createBg () {
    let bgGeo = new THREE.PlaneGeometry(1800, 1012.5);
    let mesh = new THREE.Mesh(bgGeo, new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(Bg)
    }));
    mesh.rotateX(-Math.PI / 2);
    return {
        obj: mesh
    };
}

/**
 * 拼接position
 * @param x
 * @param y
 * @param z
 * @return {{x, y, z}}
 */
function getPosition (x, y, z) {
    return {
        x,
        y,
        z
    };
}

/**
 * 创建长方体
 * @param w 长
 * @param h 高
 * @param d 宽
 * @param position 位置
 * @param material 材质
 * @return {Mesh<BoxGeometry, MeshStandardMaterial>}
 */
function createBox (w = 0, h = 0, d = 0, position, material) {
    let { x = 0, y = 0, z = 0 } = position;

    let boxMaterial = material || getCommonMat();

    let geo = new THREE.BoxGeometry(w, h, d);
    let box = new THREE.Mesh(geo, boxMaterial);
    box.position.set(x, y, z);

    // 调试颜色
    createGUI(app, box);

    return box;
}

/**
 * 当前机柜是否异常 0 为正常状态，非0为异常
 * @param info
 * @return {boolean}
 */
function isError (info) {
    return info.status !== 0;
}

/**
 * 创建顶部提示信息
 * @param info 机架信息
 * @return {CSS2DObject}
 */
function createRackTip (info) {
    const div = document.createElement('div');
    div.className = `rack-label ${isError(info) ? 'rack-label__error' : ''}`;
    div.textContent = info.name;

    const name = document.createElement('div');
    name.className = `rack-label-triangle ${isError(info) ? 'rack-label-triangle__error' : ''}`;
    div.appendChild(name);
    div.style.marginTop = '-1em';

    return new CSS2DObject(div);
}

/**
 * 获取机柜通用材质
 * @return {MeshPhysicalMaterial}
 */
function getCommonMat () {
    return new THREE.MeshPhysicalMaterial({
        color: 0x24457a,
        roughness: 1,
        metalness: 0
    });
}

/**
 * 空机架
 * @param info 机架的信息
 * @return {{obj: Group }}
 */
// eslint-disable-next-line max-lines-per-function
function createRack (info) {
    let radio = info.used / info.total;
    let color = getColor(radio);

    const rack = new THREE.Group();
    const dk = RACK_LENGTH;
    const dc = RACK_WIDTH;
    const x = 0;
    const y = 0;
    const z = 0;
    const h = RACK_HEIGHT;

    // 设置机箱的外壳
    let cabGroup = new THREE.Group();

    // cabGroup的平面中心是机柜主体的平面中心
    cabGroup.position.set(x, y, z);

    // 箱底 宽30，高2，长40
    let cabBtm = new THREE.Group();
    let cabd = createBox(dk, RACK_THICK, dc, getPosition(0, 1, 0));

    cabBtm.add(cabd);

    let sideMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(Side),
        color: 0x708cb2,
        roughness: 1,
        metalness: 0.2,
    });
    let backMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(Back),
        color: 0x708cb2,
        roughness: 1,
        metalness: 0.2,
    });
    let topMaterial = new THREE.MeshPhysicalMaterial({
        map: new THREE.TextureLoader().load(Top),
        roughness: 1,
        metalness: 0.2,
        color: 0x8b6f6f,
        emissive: 0x353645,
    });

    // 箱右侧，厚2
    let cabz = createBox(RACK_THICK, h, dc, getPosition(dk / 2 - 1, h / 2 + 2, 0), sideMaterial);

    // 箱左侧，厚2
    let caby = createBox(RACK_THICK, h, dc, getPosition(-dk / 2 + 1, h / 2 + 2, 0), sideMaterial);

    // 箱后侧
    let cabh = createBox(dk - 4, h, RACK_THICK, getPosition(0, h / 2 + 2, 0 - dc / 2 + 1), backMaterial);

    // 箱顶部
    let cabTop = new THREE.Group();

    // 顶部最下面
    let topBtm = createBox(dk, RACK_THICK, dc, getPosition(0, h + 3, 0));
    let commonMat = getCommonMat();
    let topTop = createBox(dk, RACK_THICK, dc, getPosition(0, h + 5, 0), [commonMat, commonMat, topMaterial, commonMat, commonMat, commonMat]);

    // 顶部提示信息
    let tip = createRackTip(info);
    tip.position.y += 2;
    topTop.add(tip);

    // 顶部的灯
    const topLightMaterial = new THREE.MeshPhysicalMaterial({
        color
    });
    const topBulb = createBox(8, 1.5, 2, getPosition(0, h + 3, dc / 2 + 0.4 / 2), topLightMaterial);

    // createGUI(app, topBulb);
    // 顶部两层大方块之间的阴影效果
    const points = [];
    points.push(new THREE.Vector3(-dk / 2, h + 5, dc / 2));
    points.push(new THREE.Vector3(dk / 2, h + 5, dc / 2));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
        color: 0x273252
    });
    const line = new THREE.Line(geometry, material);

    // 顶部的文字提示
    cabTop.add(topBtm, topTop, topBulb, line);
    cabGroup.add(cabBtm, cabz, caby, cabh, cabTop);// cabGroup不包括机箱门
    rack.add(cabGroup);

    let serversInfo = createAllServer(radio);
    let servers = serversInfo.obj;
    servers.forEach(item => rack.add(item));

    if (isError(info)) {
        rack.add(createError());
    }

    return {
        obj: rack
    };
}

/**
 * 创建异常的透明框和支架
 * @return {Group}
 */
function createError () {
    const h = RACK_HEIGHT + 7;
    const dk = RACK_LENGTH + 4;
    const dc = RACK_WIDTH + 4;
    let errorGroup = new THREE.Group();

    // 透明的玻璃
    let errorMat = new THREE.MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.35,
        color: 0xFA5151
    });

    let cabz = createBox(dk, h, dc, getPosition(0, h / 2, 0), errorMat);
    createErrorRound(errorGroup);
    errorGroup.add(cabz);

    errorGroup.add(createBoxHollow(0.3, dk, dc, h));
    return errorGroup;
}

/**
 * 创建长方体边框支架
 * @param r 支架的半径
 * @param dk 长
 * @param dc 宽
 * @param h 高
 * @return {Group}
 */
function createBoxHollow (r, dk, dc, h) {
    let group = new THREE.Group();
    let verRT = createCly(r, r, h, getPosition(-dk / 2, h / 2, -dc / 2));
    let verRB = createCly(r, r, h, getPosition(dk / 2, h / 2, -dc / 2));
    let verLT = createCly(r, r, h, getPosition(-dk / 2, h / 2, dc / 2));
    let verLB = createCly(r, r, h, getPosition(dk / 2, h / 2, dc / 2));

    let horDkTT = createCly(r, r, dk, getPosition(0, h, -dc / 2), null, BOX_HOLLOW_TYPE.DK);
    let horDkTB = createCly(r, r, dk, getPosition(0, h, dc / 2), null, BOX_HOLLOW_TYPE.DK);
    let horDkBB = createCly(r, r, dk, getPosition(0, 0, -dc / 2), null, BOX_HOLLOW_TYPE.DK);
    let horDkBT = createCly(r, r, dk, getPosition(0, 0, dc / 2), null, BOX_HOLLOW_TYPE.DK);

    let horDcTT = createCly(r, r, dc, getPosition(-dk / 2, h, 0), null, BOX_HOLLOW_TYPE.DC);
    let horDcTB = createCly(r, r, dc, getPosition(dk / 2, h, 0), null, BOX_HOLLOW_TYPE.DC);
    let horDcBB = createCly(r, r, dc, getPosition(-dk / 2, 0, 0), null, BOX_HOLLOW_TYPE.DC);
    let horDcBT = createCly(r, r, dc, getPosition(dk / 2, 0, 0), null, BOX_HOLLOW_TYPE.DC);
    group.add(verRT, verRB, verLT, verLB, horDkTT, horDkTB, horDkBB, horDkBT, horDcTT, horDcTB, horDcBB, horDcBT);
    group.position.y = 1;
    return group;
}

/**
 * 创建圆柱
 * @param rt 顶部半径
 * @param rb 底部半径
 * @param h 高度
 * @param position
 * @param material
 * @param type
 * @return {Mesh<CylinderGeometry, MeshPhysicalMaterial>}
 */
function createCly (rt = 3, rb = 3, h = 10, position, material, type) {
    let { x = 0, y = 0, z = 0 } = position;
    let boxMaterial = material || new THREE.MeshPhysicalMaterial({
        color: 0xFA5151
    });
    let geo = new THREE.CylinderGeometry( rt, rb, h, 48 );
    let box = new THREE.Mesh(geo, boxMaterial);
    box.position.set(x, y, z);

    if (type === BOX_HOLLOW_TYPE.DK) {
        box.rotateZ(Math.PI / 2);
    } else if (type === BOX_HOLLOW_TYPE.DC) {
        box.rotateX(Math.PI / 2);
    }

    // 调试颜色
    // createGUI(app, box);
    return box;
}

/**
 * 创建服务器
 * @param h
 * @param index
 * @return {{serverBody: Mesh<BoxGeometry, MeshLambertMaterial>, serverPanel: Mesh<PlaneGeometry, MeshBasicMaterial>}}
 */
function createServer (h, index) {
    const dk = RACK_LENGTH;
    const dc = RACK_WIDTH;

    // 服务器的尺寸要跟机箱尺寸对应好
    let serv2Geo = new THREE.BoxGeometry(dk - 4, SERVER_HEIGHT, dc - 4);
    let servMat = new THREE.MeshLambertMaterial({
        color: SERVER_COLOR,
        emissive: SERVER_COLOR
    });

    // 服务器主体
    let serverBody = new THREE.Mesh(serv2Geo, servMat);

    serverBody.position.set(0, h, RACK_THICK - SERVER_MARGIN);
    serverBody.name = SERVER_NAME + index;

    // 服务器面板尺寸
    let serverPanelGeo = new THREE.PlaneGeometry(dk - 4, SERVER_HEIGHT);
    let serverPanel = new THREE.Mesh(serverPanelGeo, new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(Server)
    }));
    serverPanel.name = SERVER_NAME + index;
    serverPanel.position.set(0, h, (dc - 4) / 2 + 0.2 / 2 + 2 - SERVER_MARGIN);

    return {
        serverBody,
        serverPanel
    };
}

/**
 * 创建左侧的大灯
 * @param h
 * @param i
 * @return {Mesh<PlaneGeometry, MeshBasicMaterial>}
 */
function createBulb (h, i) {
    const dc = RACK_WIDTH;
    const dk = RACK_LENGTH;
    let geometry = new THREE.PlaneGeometry(2, 2);

    let color = 0x00ff42;
    const material = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide
    });
    const bulb = new THREE.Mesh(geometry, material);
    bulb.position.set(-dk / 2 + 3.5, h, dc / 2 + 0.4 / 2 - SERVER_MARGIN);
    bulb.name = SERVER_NAME + i;
    return bulb;
}

/**
 * 创建所有服务器
 * @param radio 存储使用比例
 * @return {{obj: *[], animate: animate}}
 */
function createAllServer (radio) {
    const servers = [];

    let len = Math.round(radio * SERVER_NUMS);
    const x = 0;
    const y = 0;
    const z = 0;

    // 总高度
    let h = 7;

    for (let i = 0; i < SERVER_NUMS; i++) {
        let serverGroup = new THREE.Group();
        serverGroup.position.set(x, y, z);
        const { serverBody, serverPanel } = createServer(h, i);

        // 【机柜蓝色灯柜数量确定规则】
        // 根据接口返回 已使用 / 总量 的比率 再等比例反映到机柜上的占比，大致反馈即可。遇到比例小数四舍五入取整数即可
        if (i < len) {
            const bulbTop = createBulb(h - 1.5, i);
            const bulbBtm = createBulb(h + 1.5, i);
            const usedLight = createUsedLight(h, i);
            serverGroup.add(bulbTop, bulbBtm, usedLight);
        }

        h += SERVER_HEIGHT + SERVER_HEIGHT_MARGIN;
        serverGroup.add(serverBody, serverPanel);
        serverGroup.name = 'serverGroup' + i;
        servers.push(serverGroup);
    }

    return {
        obj: servers
    };
}

/**
 * 创建被使用过需要展示的服务器上的灯
 * @param h
 * @return {Mesh<BufferGeometry, MeshPhongMaterial>}
 */
function createUsedLight (h) {
    let boxGeometry = new THREE.PlaneGeometry(24, 3.5);
    const positionAttribute = boxGeometry.getAttribute('position');
    const geometry = new THREE.BufferGeometry();
    const vertices = positionAttribute.array;

    // 配置
    const indices = [1, 0, 3, 0, 2, 3];
    const normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
    let leftColor = [0, 247 / 255, 1];
    let rightColor = [2 / 255, 90 / 255, 180 / 255];
    const colors = [
        ...leftColor,
        ...rightColor,
        ...leftColor,
        ...rightColor
    ];

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        vertexColors: true
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0.5, h, RACK_WIDTH / 2 + 0.4 / 2 - SERVER_MARGIN);
    return mesh;
}

/**
 * 配置光
 */
function initLight () {

    // 机柜的左边打光
    let light1 = new THREE.DirectionalLight(0xffffff, 1.4);
    light1.position.set(0, -80, 300);

    // 表示这个光是可以产生阴影的
    light1.castShadow = true;
    app.scene.add(light1);

    // 机柜的右前方打光
    let light2 = new THREE.DirectionalLight(0xffffff, 2.6);
    light2.position.set(-50, -80, -40);

    light2.castShadow = true;
    app.scene.add(light2);

    // 机柜正上方打光
    let light3 = new THREE.DirectionalLight(0xffffff, 2.8);
    light3.position.set(100, 180, -20);

    light3.castShadow = true;
    app.scene.add(light3);
}

function render () {
    app?.controls?.update();
    app?.stats?.update();
    animates?.forEach(fn => fn?.());
    const delta = clock.getDelta();
    app.cameraControls.update( delta );
    reqID = requestAnimationFrame(render);
    app.renderer.render(app.scene, app.camera);
    app.labelRenderer.render(app.scene, app.camera);
}

/**
 * 设置3d画布的大小
 * @param renderer
 * @param labelRenderer
 */
function setRendererSize (renderer, labelRenderer) {

    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
}

/**
 * 创建空心长方形
 * @param w
 * @param h
 * @param position
 * @param opacity
 * @return {Mesh<PlaneGeometry, MeshBasicMaterial>}
 */
function createHollow (w, h, position = {}, opacity = 1) {
    let { x = 0, y = 0.1, z = 0 } = position;

    let boxMaterial = new THREE.MeshBasicMaterial({
        color: 0x3aadff,
        transparent: true,
        opacity
    });

    let geo = new THREE.PlaneGeometry(w, h);
    let hol = new THREE.Mesh(geo, boxMaterial);
    hol.position.set(x, y, z);
    hol.rotateX(-Math.PI / 2);
    return hol;
}

/**
 * 创建服务器底部的空心长方体
 * @param len
 * @return {Group}
 */
function createRackHollow (len) {
    let rw = RACK_WIDTH;
    let w = (RACK_LENGTH + HORIZONTAL_MARGIN) * len + HOLLOW_WIDTH;
    let group = new THREE.Group();

    [[2, 1], [13, 0.6], [20, 0.3]].forEach(([margin, scale]) => {
        let bgGroup = new THREE.Group();
        let width = HOLLOW_WIDTH * scale;
        bgGroup.add(createHollow(w + margin, width, getPosition(0, 0.1, (rw + width + margin) / 2), scale));
        bgGroup.add(createHollow(w + margin, width, getPosition(0, 0.1, -(rw + width + margin) / 2), scale));
        bgGroup.add(createHollow(width, rw + margin, getPosition(-(w - width + margin) / 2, 0.1, 0), scale));
        bgGroup.add(createHollow(width, rw + margin, getPosition((w - width + margin) / 2, 0.1, 0), scale));
        group.add(bgGroup);
    });

    return group;
}

/**
 *  * 【机柜指示灯颜色规则】：
 1、等于0%，当前未使用（指示灯为灰色 找视觉确认了色值为 ：#8291B5）
 2、0%~50%（不包含0%）指示灯为绿色（视觉稿中的绿色）
 3、50%~80%（不包含50%）指示灯为橙色（视觉稿中的橙色）
 4、大于80%，指示灯为红色（视觉稿中的红色）
 * @param ratio
 * @return {number}
 */
function getColor (ratio) {
    let color;
    if (ratio === 0) {
        color = 0x8291B5;
    } else if (ratio < 0.5) {
        color = 0x02fa4f;
    } else if (ratio < 0.8) {
        color = 0xffdc4e;
    } else if (ratio <= 1) {
        color = 0xff4501;
    }
    return color;
}

/**
 * 获取一行有多少个
 * 【机柜排列方式场景说明：】
 1、机柜数量≤8个时，所有机柜排成一排；
 2、8个＜机柜数量≤49个时，排列方式是每排8个；
 3、机柜数量≥50个时，排列方式是每排10个
 * @param len
 * @return {number}
 */
function getHorizontal (len) {
    let horizontal;

    if (len <= 8) {
        horizontal = len;
    } else if (len <= 49) {
        horizontal = 8;
    } else {
        horizontal = 10;
    }
    return horizontal;
}

/**
 * 获取相机的视觉比例 比如 每列8个是多大
 * @param len
 * @return {number|*}
 */
// eslint-disable-next-line no-unused-vars
function getCamaraProp (len) {
    let horizontal = getHorizontal(len);

    if (horizontal < 8) {
        return 6;
    }
    return ({
        8: 4.5,
        10: 3,
    })[horizontal];
}

/**
 * 更新整个机柜
 * @param serverList 服务器数据
 */
function updateRack (serverList) {
    if (rackGroup) {
        app.scene.remove(rackGroup);
    }

    rackGroup = new THREE.Group();
    let group = new THREE.Group();
    let bgGroup = new THREE.Group();

    let len = serverList ? serverList.length : 0;

    // 横向和纵向的个数
    let horizontal = getHorizontal(len);
    let portrait = Math.ceil(len / horizontal);

    for (let i = 0; i < portrait; i++) {
        let j = 0;
        for (j = 0; j < horizontal; j++) {
            let item = serverList[i * horizontal + j];
            if (!item) {
                break;
            }
            let rackInfo = createRack(item).obj;
            rackInfo.position.x = (RACK_LENGTH + HORIZONTAL_MARGIN) * j;
            rackInfo.position.z = -PORTRAIT_MARGIN * i;
            group.add(rackInfo);
        }
        let bg = createRackHollow(j || 0);

        bg.position.z = -PORTRAIT_MARGIN * i;
        if (j < horizontal) {

            // 总个数的宽度的一半，减去当前行个数的宽度的一半，让bg总左边开始对齐，而不是从中间
            bg.position.x = -((horizontal - j) * RACK_LENGTH + (horizontal - j) * HORIZONTAL_MARGIN) / 2;
        }
        bgGroup.add(bg);
    }

    group.position.x = -(horizontal * RACK_LENGTH + (horizontal - 1) * HORIZONTAL_MARGIN) / 2 + RACK_LENGTH / 2;
    let z = (portrait - 1) * PORTRAIT_MARGIN / 2;
    group.position.z = z;
    bgGroup.position.z = z;

    // 整体下移一些
    group.position.y = -30;
    bgGroup.position.y = -30;

    rackGroup.add(bgGroup, group);
    app.scene.add(rackGroup);

    transitionAnimation(serverList);
}

// 转场动画
async function transitionAnimation(serverList) {
    // 少的场景
    if (serverList.length <= 6){
        app.cameraControls.setLookAt(416.46884253202467, 159.58740687005636, 403.56329897301725, 1, 1, 0, true );
    } else {
        // 多的场景
        // app.cameraControls.setLookAt(564.616124760985, 166.00447999393393, 492.8396249472362, 1, 1, 0, true );
        app.cameraControls.setLookAt(899.9999999999997, 599.9999999999999, 899.9999999999998, 1, 1, 0, true );
    }
}

function onResize () {
    if (!app) {
        return;
    }

    app.camera.aspect = window.innerWidth / window.innerHeight;
    app.camera.updateProjectionMatrix();
    setRendererSize(app.renderer, app.labelRenderer);
}

/**
 * 事件
 */
function initEvent () {
    window.addEventListener('resize', onResize);
}

/**
 * 初始化机柜
 * @param el
 * @param serverList
 * @return {{renderer: WebGLRenderer, controls: OrbitControls, stats: Stats, camera: OrthographicCamera, scene: Scene}}
 */
function initRack ({ el, serverList }) {
    app = initApp(el, serverList);
    // app.scene.add(createBg().obj);
    initLight();
    updateRack(serverList);
    render();
    initEvent();
    if (isDev) {
        window.THREE = THREE;
        window.app = app;
        window.camera = app.camera;
        window.scene = app.scene;
    }
    return app;
}

/**
 * 清除所有机架数据并停止轮询
 */
function removeRack () {
    if (!app) {
        return;
    }

    rackGroup = null;

    unMounted(app);
    app = null;

    window.removeEventListener('resize', onResize);
    if (reqID) {
        cancelAnimationFrame(reqID);
        reqID = null;
    }
}

export {
    initRack,
    removeRack
};
