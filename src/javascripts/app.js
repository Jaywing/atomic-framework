import './modules/setUp'
import 'svgxuse' //Polyfill for IE11 to support "use" tags in SVGs
import './asyncModules' // Async Module loader
import breakpoint from './modules/breakpoint' // breakpoint module

breakpoint.init() // initialise breakpoint module

// initiate js in the dom
document.querySelector('html').classList.add('js')

console.log(window.jwAtomic)

window.onunload = function () { console.log('leaving window...') }
