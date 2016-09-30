import './asyncModules'
import exclaimify from './exclaimify'
import breakpoint from './breakpoint'
import eqcss from 'eqcss' // For Element Queries within the CSS
import $ from 'domtastic';

const Button = $('#button')
const Label = $('#label')

const AlertAsyncMessage = function() {
  // CommonJS async syntax webpack magic
  require.ensure([], function() {
    const Message = require("./asyncMessage").default
    alert(exclaimify(Message))
  })
}

breakpoint.init() // initialise breakpoints

if (Button) {
  Button.on('click', AlertAsyncMessage)
}

