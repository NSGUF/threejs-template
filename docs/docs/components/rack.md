# 机柜

> 下面demo的机柜，不加服务器、灯、门等；

:::demo

```vue

<template>
    <div style="height: 600px;width: 680px;">
        <rack />
    </div>
</template>
```
:::

```javascript

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
```

