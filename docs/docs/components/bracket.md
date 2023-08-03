# 服务器支架

> 效果展示为下面demo中，最外层服务器的支架

:::demo

```vue

<template>
    <div style="height: 600px;width: 900px;">
        <rack-list />
    </div>
</template>
```
:::

```javascript

/**
 * 空心类型
 * @type {{DK: string, DC: string}}
 */
const BOX_HOLLOW_TYPE = {

    // 长
    DK: 'DK',

    // 宽
    DC: 'DC',
};

/**
 * 创建圆柱
 * @param rt 顶部半径
 * @param rb 底部半径
 * @param h 高度
 * @param position 位置
 * @param material 材质
 * @param type 类型
 * @return {Mesh<CylinderGeometry, MeshPhysicalMaterial>}
 */
function createCly (rt = 3, rb = 3, h = 10, position, material, type) {
    let { x = 0, y = 0, z = 0 } = position;
    let boxMaterial = material || new THREE.MeshPhysicalMaterial({
        color: 0xfe5f01
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
```

