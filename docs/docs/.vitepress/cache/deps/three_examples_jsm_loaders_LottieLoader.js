import {
  CanvasTexture,
  FileLoader,
  Loader,
  NearestFilter
} from "./chunk-5JX5KV3X.js";
import "./chunk-76J2PTFD.js";

// ../node_modules/three/examples/jsm/loaders/LottieLoader.js
var LottieLoader = class extends Loader {
  setQuality(value) {
    this._quality = value;
  }
  load(url, onLoad, onProgress, onError) {
    const quality = this._quality || 1;
    const texture = new CanvasTexture();
    texture.minFilter = NearestFilter;
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(text) {
      const data = JSON.parse(text);
      const container = document.createElement("div");
      container.style.width = data.w + "px";
      container.style.height = data.h + "px";
      document.body.appendChild(container);
      const animation = bodymovin.loadAnimation({
        container,
        animType: "canvas",
        loop: true,
        autoplay: true,
        animationData: data,
        rendererSettings: { dpr: quality }
      });
      texture.animation = animation;
      texture.image = animation.container;
      animation.addEventListener("enterFrame", function() {
        texture.needsUpdate = true;
      });
      container.style.display = "none";
      if (onLoad !== void 0) {
        onLoad(texture);
      }
    }, onProgress, onError);
    return texture;
  }
};
export {
  LottieLoader
};
//# sourceMappingURL=three_examples_jsm_loaders_LottieLoader.js.map