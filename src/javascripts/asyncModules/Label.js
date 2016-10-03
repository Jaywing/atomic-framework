import Module from '../Module'

export default class Label extends Module {

  constructor(el, name, options) {

    const defaults = {
      "once": false,
      "activeClass": "is-active"
    }

    super(el, name, options, defaults)
  }

  init() {
    const Input = this
    console.log(Input);

    let toggleLabel  = function() {
      let Label = this.previousElementSibling
      if (this.value.length != 0) {
        Label.classList.add('is-active')
      } else {
        Label.classList.remove('is-active')
      }
    }

    this.el.classList.add('flabel')
    this.el.addEventListener('input', toggleLabel)

  }
}