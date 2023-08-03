# lottie

> 效果展示为下面demo中，服务器底部转动

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

// 添加url后缀是获取url地址的意思
import Round from './img/round.json?url';

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
```

