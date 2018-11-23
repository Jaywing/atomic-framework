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
    this.dom = this.cacheDom();
    this.addEventListeners();
  }

  cacheDom() {
    return {
      dropdownMenuParent: this.el.querySelectorAll(
        ".is-dropdown-menu-parent > .c-menu__link"
      )
    };
  }

  addEventListeners() {
    for (let i = 0; i < this.dom.dropdownMenuParent.length; i++) {
      this.dom.dropdownMenuParent[i].addEventListener("click", e => {
        e.preventDefault();
        this.handleParentClick(e, i);
      });
    }
  }

  handleParentClick(e, item) {
    let itemParent = this.dom.dropdownMenuParent[item].parentNode;
    if (itemParent.classList.contains("is-active")) {
      itemParent.classList.remove("is-active");
    } else {
      itemParent.classList.add("is-active");
    }
  }
}
