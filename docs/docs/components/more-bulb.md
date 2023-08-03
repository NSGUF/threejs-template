# 随机生成多个呼吸灯

> 效果展示为下面demo中，服务器右侧闪着的小灯，是在某个区域内随机生成点；

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
```

