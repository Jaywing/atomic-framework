import FontFaceObserver from 'fontfaceobserver';
import loadCSS from 'fg-loadcss';

"use strict";

let FontLoader = {
  name: 'FontLoader'
};

FontLoader.getGoogleUrl = function (familyName, fontFamily) {
  let url = `//fonts.googleapis.com/css?family=`;
  url += `${familyName.replace(' ', '+')}:`;
  let i = 0;
  fontFamily.forEach(
    function (configItem) {
      if (i !== 0) url += `,`
      url += `${configItem.weight}`
      i++;
    }
  );

  return url;
}

FontLoader.init = function (fontFamilies = []) {

  if (fontFamilies.length < 1) {
    console.log('Font list is empty, nothing to load');
    return;
  }

  if (document.querySelector('html').classList.contains('fonts-loaded')) {
    console.log('Fonts are cached, no need to load');
    return;
  }

  let fontObservers = [];

  if (fontFamilies['custom']) {
    let custom = fontFamilies['custom'];
    Object.keys(custom).forEach(function (family) {
      fontObservers.push(custom[family].map(function (config) {
        return new FontFaceObserver(family, config).load();
      }));
    });
  }

  if (fontFamilies['google']) {
    let google = fontFamilies['google'];
    Object.keys(google).forEach((family) => {
      const url = this.getGoogleUrl(family, google[family]);
      fontObservers.push(function () {
        return new FontFaceObserver(family).load();
      });
    });
  }

  Promise.all(fontObservers)
    .then(function () {
      document.querySelector('html').classList.add('fonts-loaded');
      console.log('Fonts have loaded');
    })

  /*
  fontFamilies.forEach(
    (fontFamily) => {
      switch (fontFamily.type) {
        case 'hosted':
          fontObservers.push(
            fontFamily.config.map(function(configItem) {
              let myFont = new FontFaceObserver(fontFamily.family, configItem);
              return myFont.load();
            })
          );
          break;
        case 'google':
          loadCSS(this.getGoogleUrl(fontFamily));
          const googleFont = new FontFaceObserver(fontFamily.family);
          return googleFont.load();
          break;
        default:
          console.log('Font type was not recognised');
      }
    }
  );

  console.log(fontObservers);
  */

  /*
  Object.keys(fontFamilies).forEach(
    function(family) {
      fontObservers.push(
        fontFamilies[family].map(function(config) {
          return new FontFaceObserver(family, config).check()
        }
      )
    );
  });
  */

  /*Promise.all(fontObservers)
    .then(function() {
      console.log('Fonts have loaded')
      document.documentElement.classList.add('fonts-loaded');
    }, function() {
      console.info('Web fonts could not be loaded in time. Falling back to system fonts.');
    });

    */


  console.log(`${this.name} has initialised`);

};

export default FontLoader;