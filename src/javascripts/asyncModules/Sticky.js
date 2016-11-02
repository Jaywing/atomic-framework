import Module from '../modules/Module'
import verge from 'verge' // viewport utilities
import forEach from '../helpers/forEach'
import css from '../helpers/css'

export default class Sticky extends Module {

  constructor(el, name, options) {

    const defaults  = {
      offsetTop: 0,
      bpStart: 'gtBase',
      stickyClass: 'is-sticky'
    }

    super(el, name, options, defaults)

  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */
  init() {

    this.elements = []
    this.vp = verge.viewport()
    this.scrollTop = verge.scrollY()

    const elements = this.el.querySelectorAll(`.${this.settings.stickyClass}`)
    forEach(elements, (element) => this.renderElement(element))

    document.addEventListener('bpupdate', this.update, false)

    console.log(`${this.name} has initialised`)
  }

  /**
   * Function that assign needed variables for sticky element, that are used in
   * future for calculations and stuff
   * @function
   * @param {node} element - Element to be rendered
   */
  renderElement(element) {

    element.sticky = {}
    // default variables
    element.sticky.active = false
    element.sticky.rect = verge.rectangle(element)
    element.sticky.offsetTop = parseInt(element.getAttribute('data-offset-top')) || this.settings.offsetTop
    element.sticky.bpStart = element.getAttribute('data-bp-start') || this.settings.bpStart
    element.sticky.stickyClass = element.getAttribute('data-sticky-class') || this.settings.stickyClass
    element.sticky.container = this.el
    element.sticky.container.rect = verge.rectangle(element)
    // fix when element is image that has not yet loaded and width, height = 0
    if (element.tagName.toLowerCase === 'img') {
      element.onload = () => element.sticky.rect = verge.rectangle(element)
    }
    // activate rendered element
    this.activate(element)
  }

  /**
   * Function that activates element when specified conditions are met and then initalise events
   * @function
   * @param {node} element - Element to be activated
   */
  activate(element) {

    const heightBefore = element.sticky.container.offsetHeight
    css(element, { position: 'fixed' })

    const heightAfter = element.sticky.container.offsetHeight
    css(element, { position: '' })

    if ((heightAfter >= heightBefore) && window.jwAtomic.breakpoint[element.sticky.bpStart] && !element.sticky.active) {
      element.sticky.active = true
    }

    if (this.elements.indexOf(element) < 0) {
      this.elements.push(element)
    }

    if (!element.sticky.resizeEvent) {
      this.initResizeEvents(element)
      element.sticky.resizeEvent = true
    }

    if (!element.sticky.scrollEvent) {
      this.initScrollEvents(element)
      element.sticky.scrollEvent = true
    }

  }

  /**
   * Function which is adding onResizeEvents to window listener and assigns function to element as resizeListener
   * @function
   * @param {node} element - Element for which resize events are initialised
   */
  initResizeEvents(element) {
    element.sticky.resizeListener = () => this.onResizeEvents(element)
    window.addEventListener('resize', element.sticky.resizeListener)
  }

  /**
   * Function which is fired when user resize window. It checks if element should be activated or deactivated and then run setPosition function
   * @function
   * @param {node} element - Element for which event function is fired
   */
  onResizeEvents(element) {
    this.vp = verge.viewport()
    element.sticky.rect = verge.rectangle(element)
    element.sticky.container.rect = verge.rectangle(element.sticky.container)

    if (element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
      element.sticky.active = true
    } else if (element.sticky.stickyFor >= this.vp.width && element.sticky.active) {
      element.sticky.active = false
    }

    this.setPosition(element)
  }

  /**
   * Function which is adding onScrollEvents to window listener and assigns function to element as scrollListener
   * @function
   * @param {node} element - Element for which scroll events are initialised
   */
  initScrollEvents(element) {
    element.sticky.scrollListener = () => this.onScrollEvents(element)
    window.addEventListener('scroll', element.sticky.scrollListener)
  }

  /**
   * Function which is fired when user scroll window. If element is active, function is invoking setPosition function
   * @function
   * @param {node} element - Element for which event function is fired
   */
  onScrollEvents(element) {
    this.scrollTop = verge.scrollY()

    if (element.sticky.active) {
      this.setPosition(element)
    }
  }

  /**
   * Main function for the library. Here are some condition calculations and css appending for sticky element when user scroll window
   * @function
   * @param {node} element - Element that will be positioned if it's active
   */
  setPosition(element) {

    css(element, { position: '', width: '', top: '', left: '' })

    if (!element.sticky.rect.width || !element.sticky.rect.width) {
      element.sticky.rect = verge.rectangle(element)
    }

    if ((this.vp.height < element.sticky.rect.height) || !element.sticky.active) {
      return;
    }

    // window has scrolled passed sticky element
    if (this.scrollTop > (element.sticky.rect.top - element.sticky.offsetTop)) {
      css(element, {
        position: 'fixed',
        width: element.sticky.rect.width + 'px',
        left: element.sticky.rect.left + 'px',
        minWidth: 'auto'
      })

      console.log(element.sticky.container.offsetHeight + element.sticky.container.rect.top)
      console.log(this.scrollTop + element.sticky.rect.height + element.sticky.offsetTop)

      if ((this.scrollTop + element.sticky.rect.height + element.sticky.offsetTop) > (element.sticky.container.rect.top + element.sticky.container.offsetHeight)) {
        if (element.sticky.stickyClass) {
          element.classList.remove(element.sticky.stickyClass)
        }
        css(element, { top: (element.sticky.container.rect.top + element.sticky.container.offsetHeight) - (this.scrollTop + element.sticky.rect.height) + 'px' })
      } else {
        if (element.sticky.stickyClass) {
          element.classList.add(element.sticky.stickyClass)
        }
        css(element, { top: element.sticky.offsetTop + 'px' })
      }
    } else {
      if (element.sticky.stickyClass) {
        element.classList.remove(element.sticky.stickyClass)
      }
      css(element, { position: '', width: '', top: '', left: '' })
    }
  }

  /**
   * Function that updates element sticky rectangle (with sticky container), then activate or deactivate element, then update position if it's active
   * @function
   */
  update() {
    forEach(this.elements, (element) => {
      element.sticky.rect = verge.rectangle(element)
      element.sticky.container.rect = verge.rectangle(element.sticky.container)
      this.activate(element)
      this.setPosition(element)
    })
  }

}
