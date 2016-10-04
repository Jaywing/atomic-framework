import Module from '../Module'
import createElement from '../helpers/createElement'
import scrollToEle from 'scroll-to-element'


export default class Bookmarks extends Module {

  constructor(el, name, options) {
    // set up defaults
    const defaults = {
      "activeClass": "is-active",
      "autoGenerate": false,
      "animated": false
    }
    // generate settings
    super(el, name, options, defaults)

  }
  
  init() {

    if (this.el.innerHTML === "") { // if the container is empty
      this.settings.autoGenerate = true;
      this.autoGenerate(); // autogenerate list
    }

    // set up dom elements
    this.menu = this.el.querySelector('.Bookmarks-menu')

    this.injectToggler() // create/insert toggle buttons
    this.setUpBookmarks() // add boomark click handler

    this.el.classList.add('js-Bookmarks') // initialise js styles
    console.log(`${this.name} has initialised`)
  }

  injectToggler() {

    const Bookmarks = this  // this placeholder

    // Create toggler button
    const toggler = createElement({
      tagName: 'button',
      className: 'Button Button--hover Bookmarks-toggler',
      text: 'Bookmarks'
    })

    const toggleBookmarks = function () { // bookmark toggler
      Bookmarks.el.classList.toggle(Bookmarks.settings.activeClass)
      console.log('Bookmarks toggled')
    }

    this.el.insertBefore(toggler, this.menu) // insert as first child
    this.toggler = this.el.querySelector('.Bookmarks-toggler')
    // add toggle click handler
    this.toggler.addEventListener('click', toggleBookmarks)

  }

  autoGenerate() {
    const content = this.el.parentNode; // bookmarks scope
    // get all section bookmarks
    const sections = content.querySelectorAll("[id^='section-']");
    // add top bookmark
    let bookmarkItems = this.makeItem('Top', 'top')
    // cycle through bookmarks
    for(var i=0, x=sections.length; i < x; i++) {
      bookmarkItems += this.makeItem(sections[i].innerText, sections[i].getAttribute('id'));
    }
    // insert bookmarks menu
    this.el.innerHTML = `<ul class="Menu Menu--vertical Bookmarks-menu">${bookmarkItems}</ul>`
  }

  makeItem(itemText, itemId) {
    return `<li class="Menu-item"><a href="#${itemId}">${itemText}</a></li>`
  }

  setUpBookmarks() {

    const Bookmarks = this

    // bookmark click handler
    const bookmarkClickHandler = function (e) {
      let timeout = 0;
      // animated scroll
      if (Bookmarks.settings.animated) {
        history.pushState({}, "", this.href)
        timeout = 750
        const targetEle = e.target.getAttribute('href')
        scrollToEle(targetEle, {
          offset: 0,
          ease: 'out-bounce',
          duration: timeout
        })
      }
      // close bookmark menu
      setTimeout(function () {
        console.log(Bookmarks.toggler)
        Bookmarks.toggler.click()
      }, timeout)
    }
    // attach click handler
    this.menu.addEventListener('click', bookmarkClickHandler)
  }
}
