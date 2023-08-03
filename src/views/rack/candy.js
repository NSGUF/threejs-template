/**
 * 3D机架
 */

import {
    DEFAULT_TIME,
    RACK_OPERATE_TYPE,
    SERVICE_TYPE,
    getWH,
    isSmallScreen,
    w,
    h,
    THREE_JS_COLOR,
    DEFAULT_EVENT, RACK_OPERATE_ROTATION
} from './const';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import Server from './img/server.png';
import lottie from 'lottie-web';
import { LottieLoader } from 'three/examples/jsm/loaders/LottieLoader';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// 添加url后缀是获取url地址的意思
import Round from './img/round.json?url';
import { getObjByMouse, getPosByObj, unMounted } from './util';

const isDev = import.meta.env.MODE === 'development';

// 机架的长宽高厚度
const RACK_LENGTH = 40;
const RACK_WIDTH = 30;
const RACK_HEIGHT = 100;
const RACK_THICK = 2;

// 机柜脚丫子的宽度
const FOOT_WIDTH = 4;

// 服务器的高度
const SERVER_HEIGHT = 7;

// 服务器的间距
const SERVER_HEIGHT_MARGIN = .4;

// 服务器对象的名称前缀
const SERVER_NAME = 'server';

// 左右切换机架的动效时间
const SWITCH_RACK_DURATION = 300;

// 所有物体的动效函数
let animates = [];

// requestAnimationFrame的唯一ID
let reqID = null;

// 3D的基本信息
let app;

// 服务器的Group Mesh对象
let servers = [];

// 机架Group对象
let rack;

// 回调函数 当自动抽拉服务器的时候,告诉外界现在是第几个
let onChangeIndex;

// 回调函数 点击服务器时触发的事件
let onClickServer;

// 机柜缩放完成触发的事件
let onScaleFinish;

// 当前机架上的服务器的总个数
let length;

// 当前抽出来的服务器序号
let currentIndex = 0;

// 服务器相关配置信息
let serverList = [];

// 抽拉第一个timeout
let jumpFirstTimeout = null;

// 轮播定时器
let serviceTimer = null;

// 提示的html对应的id
const SERVER_INFO_ID = 'serverInfo';

// canvas挂载的dom节点
let $el = null;

// 抽拉服务器的动作时间
const SERVER_DURATION_TIME = 200;

// 第一次抽拉服务器的时间
const FIRST_SERVER_TIME = 500;

// 服务器最大展示数量
const SERVER_NUMS = 13;

const BULB_WIDTH = 2;

/**
 * 初始化three基础控件
 * @param el
 * @return {{renderer: WebGLRenderer, controls: OrbitControls, stats: Stats, camera: OrthographicCamera, scene: Scene}}
 */
function initApp (el) {
    const CAMARA_PROP = 6.6;
    const LOOK_AT_POS = new THREE.Vector3(0, 45, 0);
    const FAR = 480;

    const scene = new THREE.Scene();

    // 正交投影
    const camera = new THREE.OrthographicCamera(
        w / -CAMARA_PROP,
        w / CAMARA_PROP,
        h / CAMARA_PROP,
        h / -CAMARA_PROP,
        1,
        FAR
    );
    // const camera = new THREE.PerspectiveCamera(45, w/h, 1, 500);

    camera.position.set(-190, 120, 200);
    camera.lookAt(LOOK_AT_POS);

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
    setRendererSize(renderer);
    el.appendChild(renderer.domElement);

    el.style.touchAction = 'none';
    let controls;
    let stats;
    let gui;
    if (isDev) {

        // 设置帮助工具
        let helper = new THREE.AxesHelper(FAR);
        scene.add(helper);

        stats = Stats();
        el.appendChild(stats.dom);

        controls = new OrbitControls(camera, renderer.domElement);

        // 使用了这个3d旋转工具后，camera.lookAt会失效，所以需要设置target
        controls.target = LOOK_AT_POS;
        controls.update();

        gui = new GUI({ title: 'rack' });
    }

    return {
        camera,
        scene,
        renderer,
        controls,
        stats,
        gui
    };
}

/**
 * 底部圆圈
 * @return {{animate: animate}} 当前物体需要全局处理的动画
 */
function createRound () {
    let backPlane;
    let group = new THREE.Group();

    // three使用lottie的要求
    window.bodymovin = lottie;
    new LottieLoader().load(Round, texture => {
        texture.animation.play();
        const geometry = new THREE.CircleGeometry(110, 110, 1, 50);
        const material = new THREE.MeshStandardMaterial({

            // transparent设置为true，开启透明，否则opacity不起作用
            transparent: true,
            opacity: 0.45,
            color: THREE_JS_COLOR.ROUND,
            emissive: THREE_JS_COLOR.ROUND,
            depthWrite: false,
            map: texture
        });
        backPlane = new THREE.Mesh(geometry, material);
        geometry.rotateX(-Math.PI / 2);
        group.add(backPlane);
        app.scene.add(group);
    });

    function animate () {
        if (backPlane) {
            backPlane.rotation.y = -new Date() * 0.0003;
        }
    }

    return {
        animate
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
    let boxMaterial = material || new THREE.MeshPhysicalMaterial({
        color: THREE_JS_COLOR.RACK,
        roughness: 0.5,
        metalness: 0.3
    });
    let geo = new THREE.BoxGeometry(w, h, d);
    let box = new THREE.Mesh(geo, boxMaterial);
    box.position.set(x, y, z);

    // 调试颜色
    // createGUI(app, box);
    return box;
}

/**
 * 空机架
 * @param actionType 操作类型
 * @return {{obj: Group, animate: animate}}
 */
function createRack (actionType) {
    const rack = new THREE.Group();
    const rl = RACK_LENGTH;
    const rw = RACK_WIDTH;
    const x = 0;
    const y = 0;
    const z = 0;
    const h = RACK_HEIGHT;

    // 设置机箱的外壳
    let cabGroup = new THREE.Group();

    // cabGroup的平面中心是机柜主体的平面中心
    cabGroup.position.set(x, y, z);
    cabGroup.name = 'cabGroup';

    // 箱底 宽30，高2，长40
    let cabBtm = new THREE.Group();
    let cabBtmPlane = createBox(rl, RACK_THICK, rw, getPosition(0, 1, 0));


    // 4个脚丫子 长宽高
    let footWHD = [FOOT_WIDTH, RACK_THICK, FOOT_WIDTH];
    let footY = -RACK_THICK + 1;
    let cabBtmLT = createBox(...footWHD, getPosition((-rl + FOOT_WIDTH) / 2, footY, (-rw + FOOT_WIDTH) / 2));
    let cabBtmRT = createBox(...footWHD, getPosition((rl - FOOT_WIDTH) / 2, footY, (-rw + FOOT_WIDTH) / 2));
    let cabBtmLB = createBox(...footWHD, getPosition((-rl + FOOT_WIDTH) / 2, footY, (rw - FOOT_WIDTH) / 2));
    let cabBtmRB = createBox(...footWHD, getPosition((rl - FOOT_WIDTH) / 2, footY, (rw - FOOT_WIDTH) / 2));
    cabBtm.add(cabBtmPlane, cabBtmLT, cabBtmRT, cabBtmLB, cabBtmRB);

    // 箱右侧，厚2
    let cabRight = createBox(RACK_THICK, h, rw, getPosition(rl / 2 - 1, h / 2 + 2, 0));

    // 箱左侧，厚2
    let cabLeft = createBox(RACK_THICK, h, rw, getPosition(-rl / 2 + 1, h / 2 + 2, 0));

    // 箱后侧
    let cabBack = createBox(rl - 4, h, RACK_THICK, getPosition(0, h / 2 + 2, 0 - rw / 2 + 1));

    // 箱顶部
    let cabTop = new THREE.Group();

    // 顶部最下面
    let topBtm = createBox(rl + 2, RACK_THICK + 1, rw, getPosition(0, h + 2, 0));
    let topTop = createBox(rl + 4, RACK_THICK, rw + 4, getPosition(0, h + 4, 0));

    // 两层顶部中间的阴影线
    const material = new THREE.LineBasicMaterial({
        color: THREE_JS_COLOR.LINE
    });

    const points = [];
    points.push(new THREE.Vector3(-(rl + 4) / 2, h + 3, (rw + 4) / 2));
    points.push(new THREE.Vector3((rl + 4) / 2, h + 3, (rw + 4) / 2));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);

    cabTop.add(topBtm, topTop, line);
    cabGroup.add(cabBtm, cabRight, cabLeft, cabBack, cabTop);// cabGroup不包括机箱门

    // 机箱门
    let menGroup = createDoor({
        rl,
        h,
        position: getPosition(x, y, z),
        thick: RACK_THICK
    });
    rack.add(cabGroup, menGroup);

    return {
        animate: rackAnimate(actionType),
        obj: rack
    };
}

/**
 * 机柜的整体动效
 * @param actionType
 * @return {(function(): void)|*}
 */
function rackAnimate (actionType) {
    let scale = 0;
    let isFinish = false;
    return function animate () {

        // 初始化进来
        if (RACK_OPERATE_TYPE.SCALE_BIG === actionType && rack && scale < 1) {
            scale += 0.1;
            if (scale > 1) {
                scale = 1;
                onScaleFinish();
            }
            rack.scale.set(scale, scale, scale);
        } else if (RACK_OPERATE_TYPE.SCALE_BIG !== actionType) {

            // 非放大的情况 不需要放大效果
            scale = 1;
            rack.scale.set(scale, scale, scale);
        }

        // 机架向右旋转
        if (RACK_OPERATE_ROTATION.includes(actionType) && !isFinish) {
            isFinish = true;
            let direction = actionType === RACK_OPERATE_TYPE.TO_LEFT ? -1 : 1;
            new TWEEN.Tween(rack.rotation).to({
                y:  direction * Math.PI * 2
            }, SWITCH_RACK_DURATION)
                .start();
        }
    };
}

/**
 * 门
 * @param rl
 * @param h
 * @param position
 * @param thick 厚度
 * @return {Group}
 */
function createDoor ({ rl, h, position, thick }) {
    let { x = 0, y = 0, z = 0 } = position;

    // 透明的玻璃
    let glassMat = new THREE.MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.2,
        color: THREE_JS_COLOR.GLASS
    });

    let doorMat = new THREE.MeshPhysicalMaterial({
        color: THREE_JS_COLOR.DOOR,
        roughness: 0.5,
        metalness: 0.3
    });

    let doorGroup = new THREE.Group();
    doorGroup.position.set(x + RACK_LENGTH / 2, y, z + RACK_WIDTH / 2);

    // 门的四边
    let door = createBox(rl, h, 1, getPosition(-rl / 2, h / 2, .5), glassMat);
    let doorLeft = createBox(thick, h, 1, getPosition(0 - 2, h / 2, .5), doorMat);
    let doorRight = createBox(thick, h, 1, getPosition(-rl, h / 2, .5), doorMat);
    let doorTop = createBox(rl, thick, 1, getPosition(-rl / 2 - 1, h, .5), doorMat);
    let doorBtm = createBox(rl, thick, 1, getPosition(-rl / 2 - 1, 1, .5), doorMat);

    // 开门
    setTimeout(() => {
        new TWEEN.Tween(doorGroup.rotation).to({
            y: .8 * Math.PI
        }, 0).easing(TWEEN.Easing.Elastic.Out)
            .start();
    }, 0);

    doorGroup.add(door, doorLeft, doorRight, doorTop, doorBtm);
    return doorGroup;
}

/**
 * 创建服务器
 * @param h
 * @param index
 * @return {{serverBody: Mesh<BoxGeometry, MeshLambertMaterial>, serverPanel: Mesh<PlaneGeometry, MeshBasicMaterial>}}
 */
function createServer (h, index) {
    const rl = RACK_LENGTH;
    const rw = RACK_WIDTH;
    const serverHeight = SERVER_HEIGHT;

    // 服务器的尺寸要跟机箱尺寸对应好
    let serv2Geo = new THREE.BoxGeometry(rl - RACK_THICK * 2, serverHeight, rw - RACK_THICK * 2);
    let servMat = new THREE.MeshLambertMaterial({
        color: THREE_JS_COLOR.SERVER,
        emissive: THREE_JS_COLOR.SERVER
    });

    // 服务器主体
    let serverBody = new THREE.Mesh(serv2Geo, servMat);

    serverBody.position.set(0, h, RACK_THICK);
    serverBody.name = SERVER_NAME + index;

    // 服务器面板尺寸
    let serverPanelGeo = new THREE.PlaneGeometry(rl - RACK_THICK * 2, serverHeight);
    let serverPanel = new THREE.Mesh(serverPanelGeo, new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(Server)
    }));
    serverPanel.name = SERVER_NAME + index;
    serverPanel.position.set(0, h, (rw + 0.2) / 2);

    return {
        serverBody,
        serverPanel
    };
}

/**
 * 判断某个服务器是否离线
 * @param index 序号
 * @return {boolean}
 */
function isOffline (index) {
    return getServerList()[index]?.sf_host_status !== SERVICE_TYPE.normal;
}

/**
 * 创建左侧的大灯
 * @param h
 * @param i
 * @return {Mesh<PlaneGeometry, MeshBasicMaterial>}
 */
function createBulb (h, i) {
    const rw = RACK_WIDTH;
    const rl = RACK_LENGTH;

    let geometry = new THREE.PlaneGeometry(BULB_WIDTH, BULB_WIDTH);

    let color = isOffline(i) ? THREE_JS_COLOR.OFFLINE_LIGHT : THREE_JS_COLOR.ONLINE_LIGHT;
    const material = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide
    });
    const bulb = new THREE.Mesh(geometry, material);
    bulb.position.set(-rl / 2 + 3.5, h, rw / 2 + 0.4 / 2);
    bulb.name = SERVER_NAME + i;
    return bulb;
}

/**
 * 创建服务器上的小呼吸灯
 * @param h
 * @param index
 * @return {Points<BufferGeometry, PointsMaterial>}
 */
function createLittleBulb (h, index) {

    // 横向 纵向的呼吸灯个数
    let horizontalNum = 8;
    let portraitNum = 3;
    const rw = RACK_WIDTH;
    const rl = RACK_LENGTH;

    const geometry = new THREE.BufferGeometry();
    const numPoints = horizontalNum * portraitNum;
    const positions = new Float32Array(numPoints * 3);

    let k = 0;

    for (let i = 0; i < horizontalNum; i++) {
        for (let j = 0; j < portraitNum; j++) {
            if (Math.random() < 0.5) {

                // 26和6分别表示每个灯的横向间隔和纵向间隔
                const u = i / horizontalNum * 26;
                const v = j / portraitNum * 6;
                const x = -rl / 2 + 9 + u;
                const y = h - v;
                const z = rw / 2 + 0.4 / 2;

                positions[3 * k] = x;
                positions[3 * k + 1] = y;
                positions[3 * k + 2] = z;
                k++;
            }
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    geometry.name = SERVER_NAME + index;
    const material = new THREE.PointsMaterial({
        size: 1.5,
        color: THREE_JS_COLOR.DEFAULT_LIGHT
    });

    return new THREE.Points(geometry, material);
}

/**
 * 创建所有服务器
 * @param len 服务器个数
 * @return {{obj: *[], animate: animate}}
 */
function createAllServer (len) {
    const servers = [];
    const bulbs = [];
    const littleBubs = [];

    const x = 0;
    const y = 0;
    const z = 0;

    // 服务器顶部，从上往下排列，如果数量少于13 需要从中间排，所以开始点应该是（机架高度的一半 + 目前需要显示服务器个数的总高度的一半）/2
    let h = (SERVER_HEIGHT + SERVER_HEIGHT_MARGIN) * (SERVER_NUMS + len) / 2;

    for (let i = 0; i < len; i++) {
        let serverGroup = new THREE.Group();
        serverGroup.position.set(x, y, z);
        const { serverBody, serverPanel } = createServer(h, i);
        const bulbTop = createBulb(h - 1.5, i);
        const bulbBtm = createBulb(h + 1.5, i);

        let littleBulb;
        littleBulb = createLittleBulb(h + 1.5, i);
        serverGroup.add(littleBulb);
        littleBubs[i] = littleBulb;

        bulbs.push(bulbTop, bulbBtm);
        h -= SERVER_HEIGHT + SERVER_HEIGHT_MARGIN;
        serverGroup.add(serverBody, serverPanel, bulbTop, bulbBtm);
        servers.push(serverGroup);
    }

    return {
        animate: bulbAnimate(bulbs, littleBubs),
        obj: servers
    };
}

/**
 * 呼吸灯的动画
 * @param bulbs 左边大灯
 * @param littleBubs 右边小灯
 * @return {(function(): void)|*}
 */
function bulbAnimate (bulbs, littleBubs) {
    let bulbOffset = 1;

    // MIN灯是暗的颜色 MAX表示发绿的颜色
    const MIN = [0, 120 / 255, 50 / 255];
    const MAX = [20 / 255, 1, 60 / 255];

    return () => {
        let offset = bulbOffset;
        let temp = offset;
        bulbs.forEach((item, index) => {

            // 离线不用闪烁 TODO bug 当最后一个是离线的时候 temp的判断永远进不去
            if (isOffline(getCurrentIndexByObj(item))) {
                return;
            }
            let material = item.material;
            let { r, g, b } = material.color;
            const now = [r, g, b];

            function getColor (index) {
                return now[index] + (MAX[index] - MIN[index]) * 0.04 * offset;
            }

            let rgb = [getColor(0), getColor(1), getColor(2)];
            material.color.setRGB(...rgb);

            // 服务器上的小呼吸灯和大的颜色一致,所以直接用大的颜色即可
            if (index % 2 === 0) {
                let littleMaterial = littleBubs[index / 2]?.material;
                if (littleMaterial) {
                    littleMaterial.color.setRGB(...rgb);
                }
            }

            // 如果有一个灯的第一个颜色到了最大值或最小值，颜色就需要朝另一个方向控制
            if (index === bulbs.length - 1) {
                temp = getColor(0) > MAX[0] ? offset * -1 : (getColor(0) < MIN[0] ? offset * -1 : offset);
            }
        });
        bulbOffset = temp;
    };
}

/**
 * 配置光
 */
function initLight () {

    // 机柜的左边打光
    let light1 = new THREE.DirectionalLight(THREE_JS_COLOR.DIRECTIONAL_LIGHT, 1.4);
    light1.position.set(0, -80, 300);

    // 表示这个光是可以产生阴影的
    light1.castShadow = true;
    app.scene.add(light1);

    // 机柜的右前方打光
    let light2 = new THREE.DirectionalLight(THREE_JS_COLOR.DIRECTIONAL_LIGHT, 0.7);
    light2.position.set(-50, -80, -40);

    light2.castShadow = true;
    app.scene.add(light2);

    // 机柜正上方打光
    let light3 = new THREE.DirectionalLight(THREE_JS_COLOR.DIRECTIONAL_LIGHT, 1.5);
    light3.position.set(100, 180, -100);

    light3.castShadow = true;
    app.scene.add(light3);
}

function render () {
    TWEEN?.update();
    app?.controls?.update();
    app?.stats?.update();
    animates?.forEach(fn => fn?.());
    reqID = requestAnimationFrame(render);
    app?.renderer.render(app.scene, app.camera);
}

/**
 * 设置3d画布的大小
 * @param renderer
 */
function setRendererSize (renderer) {
    const { width, height } = getWH();
    renderer.setSize(width, height);
}


/**
 * 鼠标点击事件
 * @param ev
 */
function onClickEvent (ev) {
    ev.preventDefault();
    let currObj = getObjByMouse(ev, app);
    if (currObj?.name.includes(SERVER_NAME)) {

        // 获取当前鼠标事件对应的物体对象序号
        currentIndex = getCurrentIndexByObj(currObj);
        onClickServer(currentIndex);
    }
}

/**
 * 获取物体上的唯一id
 * @param obj
 * @return {number|number}
 */
function getCurrentIndexByObj (obj) {
    return Number(obj?.name.replace(SERVER_NAME, '')) || 0;
}


/**
 * 鼠标滑动事件
 * @param ev
 */
function onMouseMove (ev) {
    ev.preventDefault();
    if (!app) {
        return;
    }
    let currObj = getObjByMouse(ev, app);
    if (currObj?.name.includes(SERVER_NAME)) {

        // 鼠标移动到服务器上鼠标变成手的样式
        $el.style.cursor = 'pointer';

        // 获取当前鼠标事件对应的物体对象序号
        currentIndex = getCurrentIndexByObj(currObj);
        updateServerPosition(currentIndex);
        clearIntervalFun();
    } else if (!currObj && !serviceTimer) {
        initIntervalFun();
    }

    // 没有在服务器上鼠标都是默认样式
    if (!currObj?.name.includes(SERVER_NAME)) {
        $el.style.cursor = 'default';
    }

    app?.controls?.update();
}

/**
 * 清除轮播事件
 */
const clearIntervalFun = () => {
    if (serviceTimer) {
        clearInterval(serviceTimer);
        serviceTimer = null;
    }
};

/**
 * 注册轮播事件
 */
const initIntervalFun = () => {
    clearIntervalFun();

    serviceTimer = window.setInterval(jumpNextItem, DEFAULT_TIME);
};

/**
 * 获取当前被选中的服务器的序号
 * @return {number}
 */
function getCurrentIndex () {
    return currentIndex;
}

/**
 * 设置当前被选中的服务器的序号
 * @param index
 */
function setCurrentIndex (index) {
    currentIndex = index;
}

/**
 * 获取服务器信息
 * @return {*[]}
 */
function getServerList () {
    return serverList;
}

/**
 * 设置服务器信息
 * @param value
 */
function setServerList (value) {
    serverList = value;
}

/**
 * 跳转到下一个
 */
const jumpNextItem = () => {
    currentIndex++;
    currentIndex = currentIndex >= length ? 0 : currentIndex;
    updateServerPosition(currentIndex);
};

/**
 * 更新服务器信息提示框的位置
 * @param index 对应服务器的序号
 */
function updateTipPosition (index) {
    let currentServer = servers[index];
    if (!currentServer) {
        return;
    }

    // 第三个是左边的大灯
    const { x, y } = getPosByObj(currentServer?.children?.[3], app);
    showServerInfo(x, y);
}

/**
 * 显示提示框
 * @param x
 * @param y
 */
function showServerInfo (x, y) {
    let serverInfo = document.getElementById(SERVER_INFO_ID);
    if (!serverInfo) {
        return;
    }
    serverInfo.style.display = 'block';

    let { height } = serverInfo.getBoundingClientRect();

    // 这里受提示框的 transform: scale(0.65) 影响 scale不会改边占位的大小,只会改边自身的大小,这里需要减去的是占位的大小; 这里的0.65需要和设置的scale保持一致
    height = isSmallScreen() ? height / 0.65 : height;

    serverInfo.style.top = (y - height) - 15 + 'px';

    // 缩放的顶点设置为左下角了,所以不需要计算x;
    serverInfo.style.left = 40 + x + 'px';
}

/**
 * 关闭提示框
 */
function hiddenServerInfo () {
    let serverInfo = document.getElementById(SERVER_INFO_ID);
    if (serverInfo) {
        serverInfo.style.display = 'none';
    }
}

/**
 * 更新某个服务器为展开状态
 * @param index 服务器的位置
 */
function updateServerPosition (index) {
    if (!servers.length) {
        return;
    }
    onChangeIndex(index);
    servers.forEach(item => {
        new TWEEN.Tween(item.position).to({
            z: 0
        }, SERVER_DURATION_TIME).start()
            .onComplete(() => {
                hiddenServerInfo();
            });
    });
    new TWEEN.Tween(servers[index]?.position).to({
        z: 12
    }, SERVER_DURATION_TIME)
        .start()
        .onComplete(() => {
            updateTipPosition(index);
        });
}

/**
 * 清除所有机架数据并停止轮询
 */
function removeRack () {
    if (!app) {
        return;
    }

    clearEvent();
    hiddenServerInfo();

    // 场景中的参数释放清理或者置空等
    servers = [];
    rack = null;
    length = 0;
    currentIndex = 0;
    unMounted(app);
    app = null;

    if (reqID) {
        cancelAnimationFrame(reqID);
        reqID = null;
    }
    clearIntervalFun();
}

function clearEvent () {
    app.renderer.domElement.removeEventListener('click', onClickEvent, false);

    // 这里会涉及整体的界面处理，所以需要放到window上
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('resize', onResize, false);
}

/**
 * 首次进入时抽拉一次服务器
 */
function doJumpFirst () {
    if (jumpFirstTimeout) {
        window.clearTimeout(jumpFirstTimeout);
        jumpFirstTimeout = null;
    }
    jumpFirstTimeout = setTimeout(jumpNextItem, FIRST_SERVER_TIME);
}

/**
 * 更新整个机柜 可用于用户切换机架用
 * @param serverList 服务器数据
 * @param actionType 动作类型
 * @param index 当前机柜选中的服务器序号的前一个
 */
function updateRack (serverList, actionType, index = -1) {
    setServerList(serverList);
    setCurrentIndex(index);
    doJumpFirst();
    initIntervalFun();
    hiddenServerInfo();
    length = serverList.length || 0;

    if (rack) {
        app.scene.remove(rack);
        rack = null;
    }
    let rackInfo = createRack(actionType);
    let serversInfo = createAllServer(length);

    servers = serversInfo.obj;
    rack = rackInfo.obj;

    servers.forEach(item => rack.add(item));

    // 需要多次渲染，只能固定位置
    animates[1] = rackInfo.animate;
    animates[2] = serversInfo.animate;
    app.scene.add(rack);
}

/**
 * 事件
 */
function initEvent () {
    app.renderer.domElement.addEventListener('click', onClickEvent, false);

    // 这里会涉及整体的界面处理，所以需要放到window上
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onResize, false);
}

function onResize () {
    if (!app) {
        return;
    }
    setRendererSize(app.renderer);
    app.camera.updateProjectionMatrix();
    app.renderer.render(app.scene, app.camera);

    // 界面渲染完成后,对应的提示框也要变更位置
    updateTipPosition(getCurrentIndex());
}

/**
 * 初始化机柜
 * @param el
 * @param serverList
 * @param listeners
 * @param currentIndex
 * @return {{renderer: WebGLRenderer, controls: OrbitControls, stats: Stats, camera: OrthographicCamera, scene: Scene}}
 */
function initRack ({ el, serverList, listeners, currentIndex = -1 }) {

    // 初始化基本数据
    onChangeIndex = listeners?.onChangeIndex || DEFAULT_EVENT;
    onClickServer = listeners?.onClickServer || DEFAULT_EVENT;
    onScaleFinish = listeners?.onScaleFinish || DEFAULT_EVENT;

    $el = el;

    app = initApp(el);
    initLight();

    // 切换时, 底部动效不能动
    let roundInfo = createRound(app);
    animates[0] = roundInfo.animate;
    updateRack(serverList, RACK_OPERATE_TYPE.SCALE_BIG, currentIndex);
    render();
    initEvent();
    initIntervalFun();

    // 调试使用
    if (isDev) {
        window.THREE = THREE;
        window.app = app;
        window.camera = app.camera;
        window.scene = app.scene;
    }
    return app;
}

export {
    initRack,
    removeRack,
    updateRack
};
