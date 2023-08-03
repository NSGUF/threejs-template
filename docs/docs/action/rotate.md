# 旋转

> 效果展示为下面demo中，点击左右切换按钮的效果

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

```

