# 控制台报错
## LottieLoader.js:39 Uncaught (in promise) ReferenceError: bodymovin is not defined
使用这个loader之前，需要导入node_modules\three\examples\js\libs\lottie_canvas.js；但是自动lottie把bodymovin变量放到threejs后，threejs就不把lottie_canvas.js exports了，所以vite会报错[vite] Internal Server Error
Missing "./examples/js/libs/lottie_canvas.js" export in "three" package 所以正确做法是：
1. 安装lottie-web；
2. 在使用的地方手动 import lottie from 'lottie-web';
3. window.bodymovin = lottie;

## threejs loader某个资源的时候，都是通过配置静态资源路径，直接import进来的不能用
解决方案：
```javascript
// 添加url后缀是获取url地址的意思
import Round from './img/round.json?url';
```
