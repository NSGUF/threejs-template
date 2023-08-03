# 获取物体的屏幕位置

```javascript

/**
 * 通过物体获取具体屏幕位置
 * @param obj
 * @param app
 * @return {{x: number, y: number}}
 */
function getPosByObj (obj, app) {
    app.scene.updateMatrixWorld(true);
    const worldVector = new THREE.Vector3();

    // 先转世界坐标
    obj.getWorldPosition(worldVector);

    // 转成设备坐标
    const stdVector = worldVector.project(app.camera);

    const { width, height } = getWH();
    const a = width / 2;
    const b = height / 2;

    // 转成屏幕坐标
    const x = Math.round(stdVector.x * a) + a;
    const y = Math.round(-stdVector.y * b) + b;

    return {
        x,
        y,
    };
}

```

