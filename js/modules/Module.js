// imported from npm, generates a short unique id
import shortid from "shortid";

export default class Module {
  constructor(el, name, options = {}, defaults = {}) {
    this.el = el; // root element (the one with 'data-module' attribute)
    this.name = name; // name of Module
    this.uid = name + "_" + shortid.generate(); // generate unique id

    // Merge module defaults with options (passed in with 'data-options')
    // To make the modules settings
    this.settings = Object.assign(defaults, options);

    // add module to global object
    window.jwAtomic.modules[this.uid] = {
      type: "async",
      element: this.el,
      details: this.settings
    };

    // set a unique Id on the base element (if one does not exist)
    if (!this.el.hasAttribute("id")) {
      this.el.setAttribute("id", this.uid);
    }
    this.init(); // initiate module
  }

  init() {
    console.log(`${this.name} has initialised`);
  }

  // a method for adding key/values to the details of module on the
  // global object
  addModDetail(key, value) {
    window.jwAtomic.modules[this.uid].details[key] = value;
  }
}
