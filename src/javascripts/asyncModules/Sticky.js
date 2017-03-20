import Module from '../modules/Module'
import StickyJS from 'sticky-js'

export default class Sticky extends Module {
  constructor (el, name, options) {
    const defaults  = {
      offsetTop: 0,
      bpStart: 'gtBase',
      stickyItem: 'Sticky-item',
      stickyClass: 'is-sticky'
    }
    super(el, name, options, defaults)
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */
  init () {
    var mySticky = new StickyJS('.Sticky-item')
    mySticky.update()
    console.log(`${this.name} has initialised`)
  }
}
