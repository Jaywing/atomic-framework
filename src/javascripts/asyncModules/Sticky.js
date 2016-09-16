import StickyJs from 'sticky-js'

export default class Sticky {

  constructor(el) {
    this.el = el
    this.init()
    console.log('Sticky has been initialised')
  }

  init() {
    let sticky = new StickyJs('[data-module="Sticky"]')
  }

}
