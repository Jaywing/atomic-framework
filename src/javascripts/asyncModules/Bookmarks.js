import Module from '../Module'
import createElement from '../helpers/createElement'


export default class Bookmarks extends Module {

  constructor(el, name, options) {
    const defaults = {
      "activeClass": "is-active",
      "autoGenerate": false
    }

    super(el, name, options, defaults)

  }

  init() {

    // set up dom elements
    this.menu = this.el.querySelector('.Bookmarks-menu')

    this.injectToggler() // create/insert toggle buttons

    this.el.classList.add('js-Bookmarks') // initialise js styles
    console.log(`${this.name} has initialised`)
  }

  injectToggler() {
    const Bookmarks = this


    const toggler = createElement({ // Create toggler button
      tagName: 'button',
      className: 'Button Button--hover Bookmarks-toggler',
      text: 'Bookmarks'
    })

    const toggleBookmarks = function () {
      Bookmarks.el.classList.toggle(Bookmarks.settings.activeClass)
      console.log('Bookmarks toggled')
    }

    this.el.insertBefore(toggler, this.menu)
    this.toggler = this.el.querySelector('.Bookmarks-toggler')

    this.toggler.addEventListener('click', toggleBookmarks)

  }

}
