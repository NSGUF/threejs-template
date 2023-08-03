# 渐变平面

> 效果展示为下面demo中，服务器最前面渐变的灯；

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

    // 左上/右上/左下/右下的颜色
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
```

