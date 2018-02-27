class DOM {
  // create a new array like object of elements
  constructor (selector) {
    var elements = document.querySelectorAll(selector)
    this.length = elements.length
    Object.assign(this, elements)
  }

  // A callback to call on each element
  each (callback) {
    // convert this to Array to use for...of
    for (let el of Array.from(this)) {
      callback.call(el)
    }
    // return this for chaining
    return this
  }

  // Add a class to selected elements
  addClass (className) {
    return this.each(function () {
      this.classList.add(className)
    })
  }

  // Remove a class from selected elements
  removeClass (className) {
    return this.each(function () {
      this.classList.remove(className)
    })
  }

  toggle (className) {
    return this.each(function () {
      this.classList.toggle(className)
    })
  }

  // Check to see if the element has a class
  // (Note: Only checks the first elements if more than one is selected)
  hasClass (className) {
    return this[0].classList.contains(className)
  }

  // Attach an event listener with a callback to the selected elements
  on (event, callback) {
    return this.each(function () {
      this.addEventListener(event, callback, false)
    })
  }

  find (selector) {
    return this.querySelectorAll(selector)
  }
}

export var $ = selector => new DOM(selector)
