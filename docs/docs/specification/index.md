# 规范
## 防止内存泄漏
```javascript
// 1. 清空场景
app.scene?.traverse((child) => {
    if (child.material) {
        child.material.dispose();
    }
    if (child.geometry) {
        child.geometry.dispose();
    }
});

app.renderer.forceContextLoss();
app.renderer.dispose();
app.scene.clear();
app.scene = null;
app.camera = null;
app.controls = null;
app.renderer.domElement = null;
app.renderer = null;

// 2. 清理所有对象
// 3. 清理所有定时器
```
## 大小屏幕
直接设置resize事件，并且在里面根据不同屏幕的要求，设置不同的宽度即可

```javascript
/**
 * 获取整个canvas的大小
 * @return {{width: number, height: number}}
 */
function getWH () {

    // 小屏的缩小比例
    const SMALL_PROPORTION = 0.8;
    return isSmallScreen() ? {
        width: w * SMALL_PROPORTION,
        height: h * SMALL_PROPORTION
    } : {
        width: w,
        height: h
    };
}
const { width, height } = getWH();
renderer.setSize(width, height);
```


