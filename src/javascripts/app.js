import './asyncModules'
import exclaimify from './exclaimify'
import breakpoint from './breakpoint'

const Button = document.getElementById('button')
const AlertAsyncMessage = function() {
  // CommonJS async syntax webpack magic
  require.ensure([], function() {
    const Message = require("./asyncMessage").default
    alert(exclaimify(Message))
  })
}

breakpoint.init() // initialise breakpoints

if (Button) {
  Button.addEventListener('click', AlertAsyncMessage)
}

