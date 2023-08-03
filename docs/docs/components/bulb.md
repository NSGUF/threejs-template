# 呼吸灯

> 效果展示为下面demo中，服务器左侧闪着的大灯

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
let bulbOffset = 1;

// MIN灯是暗的颜色 MAX表示发绿的颜色
const MIN = [0, 120 / 255, 50 / 255];
const MAX = [20 / 255, 1, 60 / 255];

function animate () {
    let offset = bulbOffset;
    let temp = offset;

	// bulbs是Mesh
    bulbs.forEach((item, index) => {
        let material = item.material;
        let { r, g, b } = material.color;
        const now = [r, g, b];

        function getColor (index) {
            return now[index] + (MAX[index] - MIN[index]) * 0.04 * offset;
        }

        material.color.setRGB(getColor(0), getColor(1), getColor(2));

        if (index === bulbs.length - 1) {
            temp = getColor(0) > MAX[0] ? offset * -1 : (getColor(0) < MIN[0] ? offset * -1 : offset);
        }
    });
    bulbOffset = temp;
}
```

