import Module from '../modules/Module'

export default class Button extends Module {

  constructor(el, name, options) {

    const defaults = {
      "once": false, // perform toggle only once
      "activeClass": "is-active",
      "target": "", // element to toggle activeClass on (self by default)
      "event": "click",
      "hide": false // whether to hide target element
    }

    super(el, name, options, defaults)
  }

  doToggle(target) {
    if (target) {
      if (this.settings.hide) {
        if (target.hasAttribute('hidden')) {
          target.removeAttribute('hidden')
        } else {
          target.setAttribute('hidden', true)
        }
        return;
      }
      target.classList.toggle(this.settings.activeClass)
    }
  }

  init() {
    const Toggle = this // 'this' reference

    // set target (self or not)
    if (this.settings.target === "") {
      this.self = true
      this.settings.target = [Toggle.el]
      this.el.setAttribute('aria-pressed', this.el.classList.contains(this.settings.activeClass)) // init aria
    } else {
      this.self = false
      let target = this.settings.target
      if (typeof target === 'string') {
        this.settings.target = [this.settings.target]
      }
    }


    const toggleIt = function() {

      if (Toggle.settings.once) {
        Toggle.el.removeEventListener('click', toggleIt)
      }

      if (Toggle.self) {
        Toggle.doToggle(Toggle.settings.target[0])
        Toggle.el.setAttribute('aria-pressed', Toggle.el.classList.contains(Toggle.settings.activeClass)) // init aria
        console.log('Self toggled')
        return
      }

      const targets = Toggle.settings.target;
      for (let i = 0, x = targets.length; i < x; i++) {
        let mytarget = document.querySelector(targets[i])
        if (mytarget) {
          Toggle.doToggle(mytarget);
          console.log(`${targets[i]} toggled`)
        }
      }

    }

    // add event listener
    this.el.addEventListener('click', toggleIt) // click event

    console.log(`${this.name} has initialised`)
  }


}