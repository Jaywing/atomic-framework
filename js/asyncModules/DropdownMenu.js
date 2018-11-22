import Module from "../modules/Module";

export default class DropdownMenu extends Module {
  constructor(el, name, options) {
    const defaults = {};
    super(el, name, options, defaults);
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */
  init() {
    console.log(`${this.name} has initialised`);
    this.addEventListeners();
  }

  addEventListeners() {}
}
