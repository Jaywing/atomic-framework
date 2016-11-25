import Module from '../modules/Module'
import forEach from '../helpers/forEach'

export default class Toggle extends Module {

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

  init() {
    const Toggle = this // 'this' reference

    // set target (self or not)
    if (this.settings.target === "") {
      this.self = true
      this.settings.target = [this.el]
      this.el.setAttribute('aria-pressed', this.el.classList.contains(this.settings.activeClass)) // init aria
    } else {
      this.self = false
      let target = this.settings.target
      if (typeof target === 'string') { // make target an array if it is not already
        this.settings.target = [this.settings.target]
      }
    }

    let active

    // set active status for global object
    forEach(this.settings.target, (target) => {
      const index = this.settings.target.indexOf(target);
      const eleTarget = (typeof target === 'string') ? document.querySelector(target) : target

      if (this.settings.hide) {
        active = (!eleTarget.hasAttribute('hidden'))
      } else {
        active = (eleTarget.classList.contains(this.settings.activeClass))
      }


      window.jwAtomic.modules[this.uid].details.target[index] = eleTarget

    })

    this.addModDetail('self', this.self)
    this.addModDetail('active', active)

    const toggleIt = () => {

      if (this.settings.once) {
        this.el.removeEventListener('click', toggleIt)
      }

      if (Toggle.self) {
        Toggle.doToggle(this.el, Toggle.settings.target[0])
        Toggle.el.setAttribute('aria-pressed', Toggle.el.classList.contains(Toggle.settings.activeClass)) // init aria
        return
      }

      const targets = Toggle.settings.target;
      for (let i = 0, x = targets.length; i < x; i++) {
        let mytarget = (typeof targets[i] === 'string')? document.querySelector(targets[i]) : targets[i]
        if (mytarget) {
          Toggle.doToggle(mytarget, this.el);
          //window.jwAtomic.modules[this.uid].details.active = !window.jwAtomic.modules[this.uid].details.target[i].active

        }
      }

    }

    // add event listener
    this.el.addEventListener('click', toggleIt) // click event

    console.log(`${this.name} has initialised`)
  }

  doToggle(target, baseEle) {
    if (target) {
      if (this.settings.hide) {
        if (target.hasAttribute('hidden')) {
          target.removeAttribute('hidden')
          window.jwAtomic.modules[baseEle.getAttribute('id')].details.active = true;
        } else {
          target.setAttribute('hidden', true)
          window.jwAtomic.modules[baseEle.getAttribute('id')].details.active = false;
        }
        return;
      }
      target.classList.toggle(this.settings.activeClass)

      window.jwAtomic.modules[baseEle.getAttribute('id')].details.active = target.classList.contains(this.settings.activeClass);

    }
  }

}