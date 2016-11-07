import './modules/setUp'
import 'svgxuse' //Polyfill for IE11 to support "use" tags in SVGs
import advTest from 'cut-the-mustard/advanced'
import './asyncModules' // Async Module loader
import breakpoint from './modules/breakpoint' // breakpoint module


function atomic_initialise() {

  breakpoint.init() // initialise breakpoint module
  // initiate js in the dom
  document.querySelector('html').classList.add('js')
  console.log(window.jwAtomic)

  window.onunload = function () {
    console.log('leaving window...')
  }

}

// cutting the mustard (https://www.npmjs.com/package/cut-the-mustard)
// capable browsers only
if (advTest()) {
  atomic_initialise()
}
