export default class Highlight {

  constructor(el) {
    this.el = el
    this.doit()
  }

  doit() {
    this.el.classList.add('highlight')
    console.log('added highlight class')
  }
}
