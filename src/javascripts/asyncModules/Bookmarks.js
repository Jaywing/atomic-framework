export default class Bookmarks {

  constructor(el) {
    this.el = el
    this.toggler = `<button id="bookmarks-toggler" class="Button Button--hover Bookmarks-toggler">Bookmarks</button>`
    this.init()
  }

  init() {
    this.injectToggler()
    this.el.classList.add('js-Bookmarks')
    console.log('bookmarks initiated')
  }

  injectToggler() {
    this.el.innerHTML = this.toggler + this.el.innerHTML
    this.toggler = document.getElementById('bookmarks-toggler')
    this.toggler.addEventListener('click', this.toggleBookmarksMenu)
  }

  toggleBookmarksMenu(e) {
    e.preventDefault()
    this.parentNode.classList.toggle('Bookmarks--is-active')
  }

}
