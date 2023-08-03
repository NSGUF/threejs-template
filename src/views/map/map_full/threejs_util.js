/**
 * threejs 工具函数
 */

import * as THREE from 'three';

const isDev = import.meta.env.MODE === 'development';

const CAMERA_TYPE = {
    OrthographicCamera: 'OrthographicCamera',
    PerspectiveCamera: 'PerspectiveCamera',
};

/**
 *  获取鼠标对应位置的3d物体对象
 * @param ev 鼠标时间
 * @param app
 * @return {*}
 */
function getObjByMouse (ev, app) {
    let { x, y } = app.renderer.domElement.getBoundingClientRect();
    let mouseX = ((ev.clientX - x) / app.renderer.domElement.clientWidth) * 2 - 1;
    let mouseY = -((ev.clientY - y) / app.renderer.domElement.clientHeight) * 2 + 1;

    let raycaster;
    if (app.camera.type === CAMERA_TYPE.OrthographicCamera) {
        let vector2 = new THREE.Vector2(mouseX, mouseY);
        raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector2, app.camera);
    } else if (app.camera.type === CAMERA_TYPE.PerspectiveCamera) {

        // 先汲取屏幕上点击的位置创建一个向量
        let vector3 = new THREE.Vector3(mouseX, mouseY, 0.5);

        // 然后用unproject函数将点击位置发射光线
        vector3 = vector3.unproject(app.camera);

        // 用THREE.Raycaster 对象向点击位置发射光线
        raycaster = new THREE.Raycaster(app.camera.position, vector3.sub(app.camera.position).normalize());
    }

    // 计算射线相机到的对象，可能有多个对象，因此返回是一个数组，按离相机远近排列
    // 将射线投影到屏幕，如果scene.children里的某个或多个形状相交，则返回这些形状
    // 第二个参数是设置是否递归，默认是false，当scene里面田间了Group对象的实例时，就需要设置true
    // 第一个参数不传scene.children也可以，传一个group.children或一个形状数组都可以
    let intersects = raycaster.intersectObjects(app.scene.children, true);

    // 点击到的第一个对象
    return intersects[0]?.object;
}

function getPosByObj (obj, app, width, height) {
    app.scene.updateMatrixWorld(true);
    const worldVector = new THREE.Vector3();

    // 先转世界坐标
    obj.getWorldPosition(worldVector);

    // 转成设备坐标
    const stdVector = worldVector.project(app.camera);
    const a = width / 2;
    const b = height / 2;

    // 转成屏幕坐标
    const x = Math.round(stdVector.x * a) + a;
    const y = Math.round(-stdVector.y * b) + b;

    return {
        x,
        y,
    };
}

/**
 * 清理app的数据
 * @param app
 */
function unMounted (app) {
    if (!app) {
        return;
    }

    app.renderer?.domElement?.remove();
    app.stats?.domElement.remove();
    app.gui?.domElement.remove();
    // 清空 标签
    document.getElementById('rack-label-wrap')?.remove();

    // 清空场景
    app.scene?.traverse(child => {
        if (child.material) {
            Array.isArray(child.material)
                ? child.material.forEach(material => material?.dispose())
                : child.material.dispose();
        }
        if (child.geometry) {
            child.geometry.dispose();
        }
    });

    app.renderer?.forceContextLoss();
    app.renderer?.dispose();
    app.scene?.clear();
    app.scene = null;
    app.camera = null;
    app.controls = null;
    app.renderer.domElement = null;
    app.renderer = null;
}

/**
 * gui配置 用户调试颜色
 * @param app
 * @param mesh
 */
function createGUI (app, mesh) {
    if (!isDev) {
        return;
    }
    let ambiColor = '#0c0c0c';
    let controls = {
        color: ambiColor,
        emissive: ambiColor,
    };

    app.gui.addColor(controls, 'color').onChange(e => {
        mesh.material.color = new THREE.Color(e);
    });
    app.gui.addColor(controls, 'emissive').onChange(e => {
        mesh.material.emissive = new THREE.Color(e);
    });
}

export {
    getObjByMouse,
    getPosByObj,
    unMounted,
    createGUI,
};
