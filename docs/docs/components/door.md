# 门
> 效果展示为下面demo中，服务器右侧的门

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

```

