window.jwAtomic = {} // Atomic global object (the only one we should ever create)

import './asyncModules'
import breakpoint from './modules/breakpoint'

breakpoint.init() // initialise breakpoints

// initiate js in the dom
const html = document.querySelector('html')
html.classList.remove('no-js');
html.classList.add('js');

window.onunload = function () { console.log('leaving window...') }