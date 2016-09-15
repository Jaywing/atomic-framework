import './asyncModules'
import exclaimify from './exclaimify'

const button = document.getElementById('button')

const alertAsyncMessage = function() {

  // CommonJS async syntax webpack magic
  require.ensure([], function() {
    const message = require("./asyncMessage").default
    alert(exclaimify(message))
  })

}


console.log(`
  asset references like this one:
    images/gulp.png
  get updated in js too!`)

if (button) {
  button.addEventListener('click', alertAsyncMessage)
}
