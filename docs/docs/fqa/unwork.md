# 功能失效

## 通过鼠标事件获取对应事件上的obj的时候，获取obj有误；
相机不同，获取的方式不同，最开始我用的透视相机，使用了

```javascript
// 先汲取屏幕上点击的位置创建一个向量
let vector3 = new THREE.Vector3(mouseX, mouseY, 0.5);

// 然后用unproject函数将点击位置发射光线
vector3 = vector3.unproject(app.camera);

// 用THREE.Raycaster 对象向点击位置发射光线
raycaster = new THREE.Raycaster(app.camera.position, vector3.sub(app.camera.position).normalize());
```
这种方式，没有问题，但是视觉需要正交，导致获取的物体都有一些像素点的偏差，正交应该用下面这种方式
```javascript
let vector2 = new THREE.Vector2(mouseX, mouseY);
raycaster = new THREE.Raycaster();
raycaster.setFromCamera(vector2, app.camera);
```

已经提供了工具在util里面，会自动根据camera的type来自动计算；详情请在项目搜索即可；

## camera.lookAt失效
原因：导入了OrbitControls导致的
解决方案：
```javascript
// 使用了这个3d旋转工具后，camera.lookAt会失效，所以需要设置target
const LOOK_AT_POS = new THREE.Vector3(0, 45, 0);
camera.lookAt(LOOK_AT_POS);
controls.target = LOOK_AT_POS;
```

## 材质设置opacity失效
配置transparent: true,

## 通过物体找到对应屏幕的位置时，将x，y设置给某个dom节点时，位置有偏差
threejs计算的位置是基于canvas左顶点的；
可能性1： 使用了position: fixed属性，理论上是
dom的节点的x = canvas.x+ 计算出的x
dom的节点的y = canvas.x+ 计算出的y
被设置的节点使用了transform属性，导致fixed的那个节点基于最近的transform父节点设置xy；

可能性2： 设置了transform: scale，transform: scale(0.65) 影响 scale不会改边占位的大小,只会改边自身的大小,这里需要减去的是占位的大小; 这里的0.65需要和设置的scale保持一致

```javascript
/**
 * 显示提示框
 * @param x
 * @param y
 */
function showServerInfo (x, y) {
    let serverInfo = document.getElementById(SERVER_INFO_ID);
    serverInfo.style.display = 'block';

    let { height } = serverInfo.getBoundingClientRect();

    // 这里受提示框的 transform: scale(0.65) 影响 scale不会改边占位的大小,只会改边自身的大小,这里需要减去的是占位的大小; 这里的0.65需要和设置的scale保持一致
    height = isSmallScreen() ? height / 0.65 : height;

    serverInfo.style.top = (y - height) + 'px';

    // 缩放的顶点设置为左下角了,所以不需要计算x;
    serverInfo.style.left = x + 'px';
}
```

## linewidth失效
方案一：用Line2；
方案二：用圆柱代替；
