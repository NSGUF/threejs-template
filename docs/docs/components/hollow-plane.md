# 空心长方平面

> 效果展示为下面demo中，服务器底部空心的长方体平面

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
```

