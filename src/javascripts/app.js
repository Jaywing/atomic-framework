import './modules/setUp';
import 'svgxuse'; //Polyfill for IE11 to support "use" tags in SVGs
import advTest from 'cut-the-mustard/advanced';
import './asyncModules'; // Async Module loader
import Breakpoint from './modules/Breakpoint'; // breakpoint module
import FontLoader from './modules/FontLoader'; // font loader module


function atomic_initialise() {

  Breakpoint.init(); // initialise breakpoint module

  const fontConfig = {
    google: {
      'Raleway': [
        { weight: '400' },
        { weight: '400i' },
        { weight: '700' },
        { weight: '700i' }
      ]
    }
  };

  FontLoader.init(fontConfig);

  // initiate js in the dom (this should be the last thing to initialise
  document.querySelector('html').classList.add('js');
  console.log(window.jwAtomic);

  window.onunload = function () {
    console.log('leaving window...');
  };

}

// cutting the mustard (https://www.npmjs.com/package/cut-the-mustard)
// capable browsers only
if (advTest()) {
  atomic_initialise();
}
