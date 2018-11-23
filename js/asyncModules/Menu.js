import Module from "../modules/Module";
import forEach from "../helpers/forEach";

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
      ),
      accordionMenuParent: this.el.querySelectorAll(
        ".is-accordion-menu-parent > .c-menu__link"
      )
    };
  }

  addEventListeners() {
    forEach(this.dom.dropdownMenuParent, (menuItemParent, index) => {
      menuItemParent.addEventListener("click", e => {
        e.preventDefault();
        this.handleParentClick(
          e,
          index,
          this.dom.dropdownMenuParent[index].parentNode
        );
      });
    });

    forEach(this.dom.accordionMenuParent, (menuItemParent, index) => {
      menuItemParent.addEventListener("click", e => {
        e.preventDefault();
        this.handleParentClick(
          e,
          index,
          this.dom.accordionMenuParent[index].parentNode
        );
      });
    });
  }

  handleParentClick(e, item, itemParent) {
    if (itemParent.classList.contains("is-active")) {
      itemParent.classList.remove("is-active");
    } else {
      itemParent.classList.add("is-active");
    }
  }
}
