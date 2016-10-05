import './asyncModules'
import exclaimify from './modules/exclaimify'
import breakpoint from './modules/breakpoint'

const Button = document.getElementById('button')

const AlertAsyncMessage = function() {
  // CommonJS async syntax webpack magic
  require.ensure([], function() {
    const Message = require("./asyncModules/asyncMessage").default
    alert(exclaimify(Message))
  })
}

breakpoint.init() // initialise breakpoints

if (Button) {
  Button.addEventListener('click', AlertAsyncMessage)
}

// initiate js in the dom
document.querySelector('html').classList.remove('no-js');
document.querySelector('html').classList.add('js');
