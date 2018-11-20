import Module from "../modules/Module";
import verge from "verge";
import throttle from "throttleit";

export default class LoadImage extends Module {
  constructor(el, name, options) {
    super(el, name, options, defaults);
    const defaults = {};

    this.settings.isLoaded = false;
  }

  init() {
    const throttleTime = 250;

    this.shouldILoadImage(); // initial check to see if image needs to be loaded
    // set up a resize event to check when a window is
    window.addEventListener(
      "resize",
      throttle(() => {
        this.shouldILoadImage();
      }, throttleTime)
    );
    // set up a resize event to check when a window is
    window.addEventListener(
      "scroll",
      throttle(() => {
        this.shouldILoadImage();
      }, throttleTime)
    );
    console.log("Load image has initialised");
  }

  shouldILoadImage() {
    const img = this.el.querySelector("img.LoadImage");
    const bp = this.settings.bp;
    const imgUrl = this.settings.url;

    if (
      img && // image exists
      !this.settings.isLoaded && // is not already loaded
      verge.viewportW() >= bp && // meets the requesite breakpoints
      verge.inViewport(img, 100) // is within 100px of the viewport area
    ) {
      setTimeout(() => {
        this.loadImage(img, imgUrl);
      }, 0); // simulate loading
    }
  }

  loadImage(targetImg, imgUrl) {
    const imgToLoad = new Image(); // create new image in memory
    const module = this; // this placeholder

    if (this.settings.alt) targetImg.alt = this.settings.alt; // add alt text if provided
    imgToLoad.onload = function() {
      // when memory image is fully loaded
      targetImg.src = this.src; // assign url to the placeholder image
      module.el.classList.add("ImageLoaded"); // Add loaded class
      module.settings.isLoaded = true; // mark as loaded
    };
    imgToLoad.src = imgUrl; // load required image in memory
  }
}
