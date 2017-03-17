import Module from '../modules/Module'
import sibling from '../helpers/sibling' // fix for DOM traversing (skips #text elements)

export default class Switcher extends Module {
  constructor (el, name, options) {
    const defaults = {
      'activeIndex': 0, // pane to active first (first one by default)
      'activeClass': 'is-active',
      'target': null,
      'hash': false, // enable hash change and load panel with url hash
      'hide': false, // switch hidden instead of class name
      'event': 'click'
    }

    super(el, name, options, defaults)
  }

  setHashIndex() {
    let hashIndex = this.tabIds.indexOf(location.hash) // return index of target

    // if active index is not set and there is not valid hash
    if(this.activeIndex === undefined && hashIndex < 0) {
      this.activeIndex = 0 // set active to 0
      this.hash = this.tabIds[0] // set active hash
      return
    }

    if (hashIndex >= 0) { // if we have a valid hash index
      this.activeIndex = hashIndex // set activeIndex
      this.hash = location.hash // set hash value
    }
  }

  addAriaTabs () {
    this.el.setAttribute('role', 'tablist')
    let toggleItems = [].slice.call(this.el.children)

    function prepareItem (item) {
      const target = item.getAttribute('href').replace('#','')
      item.setAttribute('role','tab')
      item.setAttribute('id', `tab-${target}`)
      item.setAttribute('aria-controls', target)
      item.setAttribute('tab-index', 0)
    }

    toggleItems.map(function (item) {
      let tabItem
      if (!item.hasAttribute('href')) {
        item.setAttribute('role','presentation')
        if (item.querySelector('[href]')) {
          tabItem = item.querySelector('[href]')
        }
      } else {
        tabItem = item
      }
    })

    this.targets.map(function (pane) {
      pane.setAttribute('role','tab-panel');
      pane.setAttribute('aria-labelledby', `tab-${pane.getAttribute('id')}`)
    })

  }

  normaliseTargets() {
    var targets

    if (this.settings.target === null) {
      // if target is not provided use the next sibling element to the menu
      targets = [sibling(this.el, 'nextSibling')]
    } else {
      // target is not an array, convert it and store it
      targets = (typeof this.settings.target === 'string')
        ? [this.settings.target]
        : this.settings.target
    }

    this.targets = targets.map(function (target) {
      if (typeof target === 'string') {
        target = document.querySelector(target)
      }
      target.panes = [].slice.call(target.children)
      return target
    })
  }

  validateTargets () {
    let itemCount = this.items.length
    let valid = true

    this.targets.map(function (target) {
      if (target.panes) {
        if (target.panes.length < itemCount) {
          valid = false
        }
      } else {
        valid = false
      }
    })

    return valid
  }

  init () {
    const switcher = this // store module reference for handler functions
    const items = this.el.querySelectorAll('[href]') // create an array of menu items

    // [...items]
    this.items = Array.from(items)

    // create an array of target IDs
    this.tabIds = this.items.map(function (item) {
      return item.getAttribute('href')
    })

    this.targets = []
    this.normaliseTargets() // popular targets array normalised element references

    if (!this.validateTargets()) {
      console.warn('Switcher aborted: The target element does not pass validation rules')
      this.el.setAttribute('hidden', true)
      return
    }

    if (!this.settings.hash) { // if not hash change
      // set active index to the one provided in settings
      this.activeIndex = this.settings.activeIndex
    } else {
      // set active index from the hash
      this.setHashIndex()
    }

    if(this.settings.hide) {
      this.addAriaTabs()
    }

    const clickHandler = function (e) {
      e.preventDefault(); // stop the page jump and hash change
      // create an array of menu items
      const nodeList = [].slice.call(switcher.el.children);

      if (nodeList.indexOf(e.target) > -1) { // if what was clicked is a menu item
        switcher.activeIndex = nodeList.indexOf(e.target) // set the activeIndex
      } else {
        // if the target is not a menu item (blank space #text)
        if(nodeList.indexOf(e.target.parentNode) > -1) { // try it's parent item
          switcher.activeIndex = nodeList.indexOf(e.target.parentNode) // set the activeIndex
        }
      }
      switcher.activateItem() // once set, activate the item
    }

    const hashChangeHandler = function () {
      switcher.setHashIndex();
      switcher.activateItem()
    }

    if (!this.settings.hash) { // if not using hash change
      this.el.addEventListener('click', clickHandler) // add the click handler to the menu
    } else {
      window.addEventListener('hashchange', hashChangeHandler, false) // add the hash change handler
    }
    this.activateItem(this.activeIndex) // activate with initial item

    console.log(`${this.name} has initialised`)
  }

  activateItem () {
    let i = 0
    const activeClass = this.settings.activeClass
    const switcher = this

    // add/remove active class on menu items
    this.items.map(function (item) {
      if (i !== switcher.activeIndex) {
        item.classList.remove(activeClass)
        item.setAttribute('aria-selected', false)
      } else {
        item.classList.add(activeClass)
        item.setAttribute('aria-selected', true)
      }
      i++
    })

    this.targets.map(function (target) {
      let y = 0

      target.panes.map(function (pane) {
        if (y !== switcher.activeIndex) {
          switcher.settings.hide ? pane.setAttribute('hidden', true) : pane.classList.remove(activeClass)
        } else {
          switcher.settings.hide ? pane.removeAttribute('hidden') : pane.classList.add(activeClass)
        }
        y++
      })
    })
  }
}
