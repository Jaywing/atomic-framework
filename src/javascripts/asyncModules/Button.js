// toggle is-active class on Button component

export default class Button {

  constructor(el) {
    this.el = el
    this.activeClass = 'is-active'
    this.runOnce = el.hasAttribute('data-button-once')
    this.init()
  }

  init() {

    let Btn = this // 'this' reference

    let toggleActive = function() {

      this.classList.toggle(Btn.activeClass)
      this.active = this.classList.contains(Btn.activeClass) // is it active?
      this.setAttribute('aria-pressed', this.active) // set 'aria' attr

      // Run once: remove click event so it can't be toggled!
      if (Btn.runOnce) {
        this.removeEventListener('click', toggleActive)
      }

    }

    this.el.setAttribute('aria-pressed', this.el.classList.contains(this.activeClass)) // init aria
    this.el.addEventListener('click', toggleActive) // click event

    console.log('Button has been initialised')
  }

}
