import Module from '../modules/Module'

export default class Slider extends Module {
  constructor(el, name, options) {
    const defaults = {}
    super(el, name, options, defaults)
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */
  init() {

    const Slider = this
    console.log(`${this.name} has initialised`)
    this.dom = this.cacheDom()

    // Make the slider
    this.makeSlider()

  }

  cacheDom() {

    return {
      'slides': this.el.querySelector('.Slider-slides'),
      'slide': this.el.querySelectorAll('.Slider-slide'),
      'nextButton': this.el.querySelector('.Slider-next'),
      'previousButton': this.el.querySelector('.Slider-previous'),
      'pips': this.el.querySelector('.Slider-pips')
    }

  }

  makeSlider() {

    let sliderNum = 0
    let direction = 1
    let slidesTotal = this.dom.slide.length

    for (let i = 0; i < slidesTotal; i++) {

      if (slidesTotal > 1 && this.dom.slide[i].classList.contains('Active')) {
        sliderNum = i
      }

      if (i == 0) {
        this.dom.pips.innerHTML += '<div class="Slider-pip Active"></div>'
      } else {
        this.dom.pips.innerHTML += '<div class="Slider-pip"></div>'
      }

    }

    const slideForward = () => {
      direction = 1
      sliderNum += 1
      if (sliderNum >= slidesTotal) sliderNum = 0
      this.changeSlide(sliderNum, direction)
    }

    const slideBackward = () => {
      direction = 0
      sliderNum -= 1
      if (sliderNum < 0) sliderNum = slidesTotal - 1
      this.changeSlide(sliderNum, direction)
    }

    this.dom.nextButton.addEventListener('click', slideForward)
    this.dom.previousButton.addEventListener('click', slideBackward)

  }

  changeSlide(sliderNum, direction) {

    let slidesTotal = this.dom.slide.length

    for (let i = 0; i < slidesTotal; i++) {
      this.dom.slide[i].classList.remove('Active', 'Active--next', 'Active--previous', 'Next', 'Previous')
      this.el.querySelectorAll('.Slider-pip')[i].classList.remove('Active')
    }

    this.dom.slide[sliderNum].classList.add('Active')
    this.el.querySelectorAll('.Slider-pip')[sliderNum].classList.add('Active')
    if (direction == 1) this.dom.slide[sliderNum].classList.add('Active--next')
    if (direction == 0) this.dom.slide[sliderNum].classList.add('Active--previous')
    if (this.dom.slide[sliderNum].nextElementSibling) this.dom.slide[sliderNum].nextElementSibling.classList.add('Next')
    if (this.dom.slide[sliderNum].previousElementSibling) this.dom.slide[sliderNum].previousElementSibling.classList.add('Previous')
  }

}
