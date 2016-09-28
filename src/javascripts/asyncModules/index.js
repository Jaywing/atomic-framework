const moduleElements = document.querySelectorAll('[data-module]')

for (var i = 0; i < moduleElements.length; i++) {
  const el = moduleElements[i]
  const name = el.getAttribute('data-module')
  let options = {}
  const dataOptions = el.getAttribute('data-options')
  if (dataOptions) {
    options = JSON.parse(dataOptions)
  }
  require.ensure([], function() {
    const Module = require(`./${name}`).default
    new Module(el, name, options)
  })
}
