import $ from 'domtastic';

export default class Bookmarks {

  constructor(el) {
    this.el = el
    this.toggler = `<button id="bookmarks-toggler" class="Button Button--hover Bookmarks-toggler">Bookmarks</button>`
    this.init()
  }

  init() {
    this.injectToggler()
    $(this.el).addClass('js-Bookmarks');
    console.log('bookmarks initiated')
  }

  injectToggler() {
    $(this.el).html(this.toggler + this.el.innerHTML)
    this.toggler = $('bookmarks-toggler')
    this.toggler.on('click', this.toggleBookmarksMenu)
  }

  toggleBookmarksMenu(e) {
    e.preventDefault()
    $(this.parentNode).toggleClass('Bookmarks--is-active')
  }

}
