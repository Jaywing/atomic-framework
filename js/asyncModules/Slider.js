import Module from "../modules/Module";

export default class Slider extends Module {
  constructor(el, name, options) {
    const defaults = {
      type: false,
      slidesToShow: false,
      slidesToShowMd: false
    };

    super(el, name, options, defaults);
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */
  init() {
    const Slider = this;
    console.log(`${this.name} has initialised`);
    this.dom = this.cacheDom();
    // document.addEventListener('bpupdate', myFunction, false);

    // Make the slider
    this.makeSlider();
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector;
    }
  }

  cacheDom() {
    return {
      slides: this.el.querySelector(".Slider-slides"),
      slide: this.el.querySelectorAll(".Slider-slide"),
      controls: this.el.querySelector(".Slider-controls"),
      nextButton: this.el.querySelector(".Slider-next"),
      previousButton: this.el.querySelector(".Slider-previous"),
      pips: this.el.querySelector(".Slider-pips")
    };
  }

  makeSlider() {
    let sliderNum = 0;
    let direction = 1;
    let slidesTotal = this.dom.slide.length;

    // Settings: Reactive slider
    if (this.settings.slidesToShow) {
      if (
        this.settings.slidesToShowMd == 4 &&
        window.jwAtomic.modules.Breakpoint.detail.gtSm
      ) {
        slidesTotal = this.dom.slide.length / this.settings.slidesToShowMd;
      } else {
        slidesTotal = this.dom.slide.length / this.settings.slidesToShow;
      }
    }

    for (let i = 0; i < slidesTotal; i++) {
      if (slidesTotal > 1 && this.dom.slide[i].classList.contains("Active")) {
        sliderNum = i;
      }

      // Hero slider height
      if (this.settings.type == "hero") {
        let vheight =
          window.innerHeight -
          document.querySelector(".SiteHeader").offsetHeight;
        vheight = vheight - (vheight * 10) / 100;
        this.dom.slide[i].style.minHeight = `${vheight}px`;
      }

      // Create pips
      if (slidesTotal > 1) {
        if (i == 0) {
          this.dom.pips.innerHTML += `<div class="Slider-pip Active"></div>`;
        } else {
          this.dom.pips.innerHTML += `<div class="Slider-pip"></div>`;
        }
      }
    }

    // Reactive slider setup
    if (this.settings.slidesToShow) {
      for (let i = 0; i < this.dom.slide.length; i++) {
        if (this.settings.slidesToShow == 2) {
          this.dom.slide[i].style.flex = "0 0 50%";
          this.dom.slide[i].style.width = "50%";
        } else {
          this.dom.slide[i].style.flex = "0 0 25%";
          this.dom.slide[i].style.width = "25%";
        }

        if (window.jwAtomic.modules.Breakpoint.detail.gtSm) {
          if (this.settings.slidesToShowMd == 4) {
            this.dom.slide[i].style.flex = "0 0 25%";
            this.dom.slide[i].style.width = "25%";
          }
        }
      }
    }

    if (slidesTotal == 1) {
      this.dom.controls.style.display = "none";
    }

    let slides = Array.from(this.el.querySelector(".Slider-pips").children);

    const slideForward = () => {
      direction = 1;
      sliderNum += 1;
      if (sliderNum >= slidesTotal) sliderNum = 0;
      this.changeSlide(sliderNum, direction);
    };

    const slideBackward = () => {
      direction = 0;
      sliderNum -= 1;
      if (sliderNum < 0) sliderNum = slidesTotal - 1;
      this.changeSlide(sliderNum, direction);
    };

    const setSlide = event => {
      direction = 1;
      if (!event.target.matches("div.Slider-pip")) return;
      let slide = event.target;
      let prevSlide = sliderNum;
      sliderNum = slides.indexOf(slide);
      if (prevSlide > sliderNum) {
        direction = 0;
      }

      this.changeSlide(sliderNum, direction);
    };

    this.dom.nextButton.addEventListener("click", slideForward);
    this.dom.previousButton.addEventListener("click", slideBackward);
    this.el.querySelector(".Slider-pips").addEventListener("click", setSlide);
  }

  changeSlide(sliderNum, direction) {
    let slidesTotal = this.dom.slide.length;

    if (!this.settings.slidesToShow) {
      for (let i = 0; i < slidesTotal; i++) {
        this.dom.slide[i].classList.remove(
          "Active",
          "Active--next",
          "Active--previous",
          "Next",
          "Previous"
        );
      }

      this.dom.slide[sliderNum].classList.add("Active");
      if (direction == 1)
        this.dom.slide[sliderNum].classList.add("Active--next");
      if (direction == 0)
        this.dom.slide[sliderNum].classList.add("Active--previous");
      if (this.dom.slide[sliderNum].nextElementSibling)
        this.dom.slide[sliderNum].nextElementSibling.classList.add("Next");
      if (this.dom.slide[sliderNum].previousElementSibling)
        this.dom.slide[sliderNum].previousElementSibling.classList.add(
          "Previous"
        );
    }

    // Reactive slider
    if (this.settings.slidesToShow) {
      let slideWidth = this.dom.slide[sliderNum].offsetWidth;
      let newSlideWidth = slideWidth * this.settings.slidesToShow;
      if (window.jwAtomic.modules.Breakpoint.detail.gtSm) {
        if (this.settings.slidesToShowMd == 4) {
          newSlideWidth = slideWidth * this.settings.slidesToShowMd;
        }
      }
      let transform = sliderNum * newSlideWidth;
      this.dom.slides.style.transform = `translateX(-${transform}px)`;
    }

    // Set pip
    this.el.querySelector(".Slider-pip.Active").classList.remove("Active");
    this.el.querySelectorAll(".Slider-pip")[sliderNum].classList.add("Active");
  }
}
