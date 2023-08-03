# 调试组件

> 效果展示为下面demo中，右上角的编辑区域

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
```

