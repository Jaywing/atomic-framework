import StickyJs from 'sticky-js'

export default class Sticky {

  constructor(el) {
    this.el = el
    this.init()
  }

  init() {
    let sticky = new StickyJs('[data-module="Sticky"]')
  }

}
