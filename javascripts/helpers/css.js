/**
 * Helper function to add/remove css properties for specified element.
 * @helper
 * @param {node} element - DOM element
 * @param {object} properties - CSS properties that will be added/removed from specified element
 */

module.exports = function (element, properties) {
  for (let property in properties) {
    if (properties.hasOwnProperty(property)) {
      element.style[property] = properties[property]
    }
  }
}
