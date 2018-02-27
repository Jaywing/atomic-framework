'use strict'

import FontFaceObserver from 'fontfaceobserver'

let FontLoader = {
  name: 'FontLoader'
}

FontLoader.getGoogleUrl = function (familyName, fontFamily) {
  let url = `//fonts.googleapis.com/css?family=`
  url += `${familyName.replace(' ', '+')}:`
  let i = 0
  fontFamily.forEach(
    function (configItem) {
      if (i !== 0) url += `,`
      url += `${configItem.weight}`
      i++
    }
  )
  return url
}

FontLoader.init = function (fontFamilies = []) {
  if (fontFamilies.length < 1) {
    console.log('Font list is empty, nothing to load')
    return
  }

  if (document.querySelector('html').classList.contains('fonts-loaded')) {
    console.log('Fonts are cached, no need to load')
    return
  }

  let fontObservers = []

  if (fontFamilies['custom']) {
    let custom = fontFamilies['custom']
    Object.keys(custom).forEach(function (family) {
      fontObservers.push(custom[family].map(function (config) {
        return new FontFaceObserver(family, config).load()
      }))
    })
  }

  if (fontFamilies['google']) {
    let google = fontFamilies['google']
    Object.keys(google).forEach((family) => {
      // const url = this.getGoogleUrl(family, google[family])
      fontObservers.push(function () {
        return new FontFaceObserver(family).load()
      })
    })
  }

  Promise.all(fontObservers)
    .then(function () {
      document.querySelector('html').classList.add('fonts-loaded')
      console.log('Fonts have loaded')
    })

  console.log(`${this.name} has initialised`)
}

export default FontLoader
