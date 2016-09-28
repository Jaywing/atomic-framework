// toggle is-active class on Button component

export default class Button {

  constructor(el) {
    this.el = el
    this.init()
    console.log('Button has been initialised')
  }

  init() {

    let toggleActive = function(e) {

      e.preventDefault()
      this.classList.toggle('is-active')

      // Loading buttons: remove click event so it can't be toggled!
      if (this.classList.contains('Button--loading')) {
        this.removeEventListener('click', toggleActive)
      }

    }

    this.el.addEventListener('click', toggleActive)
  }


}
