// imported from npm, generates a short unique id
import shortid from 'shortid'

export default class Module {

  constructor(el, name, options = {}, defaults = {}) {
    this.el = el // root element (the one with 'data-module' attribute)
    this.name = name // name of Module
    this.uid = shortid.generate() // generate unique id

    // Merge module defaults with options (passed in with 'data-options')
    // To make the modules settings
    this.settings = Object.assign(defaults, options)

    this.init() // initiate module
  }

  init() {

    console.log(`${this.name} has initialised`)
  }

}
