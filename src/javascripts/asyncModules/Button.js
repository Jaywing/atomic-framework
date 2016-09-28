import Module from './Module'

export default class Button extends Module {

  constructor(el, name, options) {

    const defaults = {
      "once": false,
      "activeClass": "is-active"
    }

    super(el, name, options, defaults)
  }

  init() {
    const Btn = this // 'this' reference

    let toggleActive = function() {

      this.classList.toggle(Btn.settings.activeClass)
      this.active = this.classList.contains(Btn.settings.activeClass) // is it active?
      this.setAttribute('aria-pressed', this.active) // set 'aria' attr

      // Run once: remove click event so it can't be toggled!
      if (Btn.settings.once) {
        this.removeEventListener('click', toggleActive)
      }

    }

    this.el.setAttribute('aria-pressed', this.el.classList.contains(this.settings.activeClass)) // init aria
    this.el.addEventListener('click', toggleActive) // click event

    console.log(`${this.name} has initialised`)
  }
}