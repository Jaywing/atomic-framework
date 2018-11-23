/**
 * Helper function for loops
 * @helper
 * @param {array}
 * @param {function} callback - Callback function (no need for explanation)
 */

module.exports = function(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    callback(array[i], i);
  }
};
