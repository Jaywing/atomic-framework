export default class Module {

  constructor(el, name, options = {}, defaults = {}) {
    this.el = el
    this.name = name

    this.settings = Object.assign(defaults, options)

    this.init()
  }

  init() {

    console.log(`${this.name} has initialised`)

  }

}
