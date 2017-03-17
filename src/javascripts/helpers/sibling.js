'use strict'

// 'nextSibling' or 'prevSibling' return '#text' if there is any white space between the elements
// This makes sure that an element is returned
const sibling = function (cur, dir) {
  while ((cur = cur[ dir ]) && cur.nodeType !== 1) {}
  return cur
}

export default sibling
