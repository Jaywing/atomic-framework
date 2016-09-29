import shortid from 'shortid'

export default class Module {

  constructor(el, name, options = {}, defaults = {}) {
    const uid = shortid.generate()
    this.el = el
    this.name = name
    this.uid = uid

    this.settings = Object.assign(defaults, options)

    this.init()
  }

  init() {

    console.log(`${this.name} has initialised`)
  }

}
