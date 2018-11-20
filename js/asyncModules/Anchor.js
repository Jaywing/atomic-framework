import Module from "../modules/Module";
import forEach from "../helpers/forEach";

export default class Anchor extends Module {
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
    const Anchor = this; // 'this' reference
    this.dom = this.cacheDom();
    this.addEventListeners();
    // console.log(`${this.name} has initialised`);
  }

  cacheDom() {
    return {
      menu: this.el.querySelector("nav > .c-menu"),
      menuParent: this.el.querySelectorAll(".c-menu__item"),
      menuButton: this.el.querySelectorAll(".c-menu__link"),
      anchor: document.querySelectorAll("[data-scrollspy]")
    };
  }

  addEventListeners() {
    for (let i = 0; i < this.dom.menuButton.length; i++) {
      this.dom.menuButton[i].addEventListener("click", e => {
        this.handleParentState(e, i);
      });
    }

    window.addEventListener("scroll", () => {
      this.scrollSpy();
    });
  }

  handleParentState(e, item) {
    forEach(this.dom.menuParent, menuParent => {
      menuParent.classList.remove("is-active");
    });

    this.dom.menuParent[item].classList.add("is-active");
  }

  scrollSpy() {
    let topOfPage = window.pageYOffset;

    for (let i = 0; i < this.dom.anchor.length; i++) {
      let anchor = this.dom.anchor[i];

      let anchorPosition = anchor.offsetTop;

      if (topOfPage >= anchorPosition) {
        this.handleParentState(false, i);
      }
    }
  }
}
