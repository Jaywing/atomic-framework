import Module from '../modules/Module'
import imagesLoaded from 'imagesloaded'

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
    this.dom = this.cacheDom();
    this.addEventListeners();

    // Make the slider - check images have loaded first
    imagesLoaded(this.dom.slides).on('done', function (instance) {
      Slider.makeSlider()
    })
  }

  cacheDom() {
    return {
      'slides': this.el.querySelector('.Slider-slides'),
      'slide': this.el.querySelectorAll('.Slider-slide'),
      'nextButton': this.el.querySelector('.Slider-next'),
      'previousButton': this.el.querySelector('.Slider-previous')
    }
  }

  addEventListeners() {
    this.dom.nextButton.addEventListener('click', this.changeSlide.bind(this, 1))
    this.dom.previousButton.addEventListener('click', this.changeSlide.bind(this, -1))
  }

  makeSlider() {
    // let SliderW = this.dom.slide[0].offsetWidth
    let SliderH = 0

    // this.dom.slides.style.width = `${SliderW}px`

    for (let i = 0; i < this.dom.slide.length; i++) {
      // Slider height
      if (this.dom.slide[i].offsetHeight > SliderH) {
        SliderH = this.dom.slide[i].offsetHeight
      }
      this.dom.slides.style.height = `${SliderH}px`

      //Make next slide
      if (this.dom.slide.length > 1 && this.dom.slide[i].classList.contains('Active')) {
        this.dom.slide[1].classList.add('Next')
      }
    }

    if (!this.el.querySelector('.Slider-slide.Next')) {
      this.dom.nextButton.classList.add('Hidden')
    }

    if (!this.el.querySelector('.Slider-slide.Previous')) {
      this.dom.previousButton.classList.add('Hidden')
    }
  }

  changeSlide(num) {
    let active = this.el.querySelector('.Slider-slide.Active')
    let previous = active.previousElementSibling
    let next = active.nextElementSibling

    if (num == 1) {
      active.classList.remove('Active')
      active.classList.add('Previous')
      if (next) next.classList.remove('Next')
      if (next) next.classList.add('Active')
      if (previous) previous.classList.remove('Previous')

      // Set previous and next
      if (previous) next.previousElementSibling.classList.add('Previous')
      if (next.nextElementSibling) next.nextElementSibling.classList.add('Next')
    }

    if (num == -1) {
      active.classList.remove('Active')
      active.classList.add('Next')
      if (previous) previous.classList.remove('Previous')
      if (previous) previous.classList.add('Active')
      if (next) next.classList.remove('Next')

      // Set previous and next
      if (previous.previousElementSibling) previous.previousElementSibling.classList.add('Previous')
    }

    if (this.el.querySelector('.Slider-slide.Next')) {
      this.dom.nextButton.classList.remove('Hidden')
    } else {
      this.dom.nextButton.classList.add('Hidden')
    }

    if (this.el.querySelector('.Slider-slide.Previous')) {
      this.dom.previousButton.classList.remove('Hidden')
    } else {
      this.dom.previousButton.classList.add('Hidden')
    }
  }
}
