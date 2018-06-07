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
      'previousButton': this.el.querySelector('.Slider-previous')
    }

  }

  makeSlider() {

    let sliderNum = 0
    let direction = 1

    for (let i = 0; i < this.dom.slide.length; i++) {
      if (this.dom.slide.length > 1 && this.dom.slide[i].classList.contains('Active')) {
        sliderNum = i
      }
    }

    const slideForward = () => {
      direction = 1
      sliderNum += 1
      if (sliderNum >= this.dom.slide.length) sliderNum = 0
      this.changeSlide(sliderNum, direction)
    }

    const slideBackward = () => {
      direction = 0
      sliderNum -= 1
      if (sliderNum < 0) sliderNum = this.dom.slide.length - 1
      this.changeSlide(sliderNum, direction)
    }

    this.dom.nextButton.addEventListener('click', slideForward)
    this.dom.previousButton.addEventListener('click', slideBackward)

  }

  changeSlide(sliderNum, direction) {

    for (let i = 0; i < this.dom.slide.length; i++) {
      this.dom.slide[i].classList.remove('Active', 'Active--next', 'Active--previous', 'Next', 'Previous')
    }

    this.dom.slide[sliderNum].classList.add('Active')
    if (direction == 1) this.dom.slide[sliderNum].classList.add('Active--next')
    if (direction == 0) this.dom.slide[sliderNum].classList.add('Active--previous')
    if (this.dom.slide[sliderNum].nextElementSibling) this.dom.slide[sliderNum].nextElementSibling.classList.add('Next')
    if (this.dom.slide[sliderNum].previousElementSibling) this.dom.slide[sliderNum].previousElementSibling.classList.add('Previous')
  }

}
