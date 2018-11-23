webpackJsonp([0],{

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 125,
	"./Anchor": 342,
	"./Anchor.js": 342,
	"./LoadImage": 343,
	"./LoadImage.js": 343,
	"./Menu": 344,
	"./Menu.js": 344,
	"./ResImg": 345,
	"./ResImg.js": 345,
	"./Slider": 346,
	"./Slider.js": 346,
	"./Sticky": 347,
	"./Sticky.js": 347,
	"./Switcher": 348,
	"./Switcher.js": 348,
	"./Toggle": 349,
	"./Toggle.js": 349,
	"./Validate": 350,
	"./Validate.js": 350,
	"./index": 125,
	"./index.js": 125
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 338;

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_shortid__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_shortid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_shortid__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// imported from npm, generates a short unique id


var Module = function () {
  function Module(el, name) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var defaults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Module);

    this.el = el; // root element (the one with 'data-module' attribute)
    this.name = name; // name of Module
    this.uid = name + "_" + __WEBPACK_IMPORTED_MODULE_0_shortid___default.a.generate(); // generate unique id

    // Merge module defaults with options (passed in with 'data-options')
    // To make the modules settings
    this.settings = Object.assign(defaults, options);

    // add module to global object
    window.jwAtomic.modules[this.uid] = {
      type: "async",
      element: this.el,
      details: this.settings
    };

    // set a unique Id on the base element (if one does not exist)
    if (!this.el.hasAttribute("id")) {
      this.el.setAttribute("id", this.uid);
    }
    this.init(); // initiate module
  }

  _createClass(Module, [{
    key: "init",
    value: function init() {
      console.log(this.name + " has initialised");
    }

    // a method for adding key/values to the details of module on the
    // global object

  }, {
    key: "addModDetail",
    value: function addModDetail(key, value) {
      window.jwAtomic.modules[this.uid].details[key] = value;
    }
  }]);

  return Module;
}();

/* harmony default export */ __webpack_exports__["a"] = (Module);

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(353);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

function get () {
  return alphabet || ORIGINAL;
}

module.exports = {
    get: get,
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),

/***/ 341:
/***/ (function(module, exports) {

/**
 * Helper function for loops
 * @helper
 * @param {array}
 * @param {function} callback - Callback function (no need for explanation)
 */

module.exports = function (array, callback) {
  for (var i = 0, len = array.length; i < len; i++) {
    callback(array[i], i);
  }
};

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_forEach__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_forEach___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__helpers_forEach__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Anchor = function (_Module) {
  _inherits(Anchor, _Module);

  function Anchor(el, name, options) {
    _classCallCheck(this, Anchor);

    var defaults = {};
    return _possibleConstructorReturn(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).call(this, el, name, options, defaults));
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */


  _createClass(Anchor, [{
    key: "init",
    value: function init() {
      var Anchor = this; // 'this' reference
      this.dom = this.cacheDom();
      this.addEventListeners();
      // console.log(`${this.name} has initialised`);
    }
  }, {
    key: "cacheDom",
    value: function cacheDom() {
      return {
        menu: this.el.querySelector("nav > .c-menu"),
        menuParent: this.el.querySelectorAll(".c-menu__item"),
        menuButton: this.el.querySelectorAll(".c-menu__link"),
        anchor: document.querySelectorAll("[data-scrollspy]")
      };
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;

      var _loop = function _loop(i) {
        _this2.dom.menuButton[i].addEventListener("click", function (e) {
          _this2.handleParentState(e, i);
        });
      };

      for (var i = 0; i < this.dom.menuButton.length; i++) {
        _loop(i);
      }

      window.addEventListener("scroll", function () {
        _this2.scrollSpy();
      });
    }
  }, {
    key: "handleParentState",
    value: function handleParentState(e, item) {
      __WEBPACK_IMPORTED_MODULE_1__helpers_forEach___default()(this.dom.menuParent, function (menuParent) {
        menuParent.classList.remove("is-active");
      });

      this.dom.menuParent[item].classList.add("is-active");
    }
  }, {
    key: "scrollSpy",
    value: function scrollSpy() {
      var topOfPage = window.pageYOffset;

      for (var i = 0; i < this.dom.anchor.length; i++) {
        var anchor = this.dom.anchor[i];

        var anchorPosition = anchor.offsetTop;

        if (topOfPage >= anchorPosition) {
          this.handleParentState(false, i);
        }
      }
    }
  }]);

  return Anchor;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Anchor);

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_verge__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_verge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_verge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_throttleit__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_throttleit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_throttleit__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var LoadImage = function (_Module) {
  _inherits(LoadImage, _Module);

  function LoadImage(el, name, options) {
    _classCallCheck(this, LoadImage);

    var _this = _possibleConstructorReturn(this, (LoadImage.__proto__ || Object.getPrototypeOf(LoadImage)).call(this, el, name, options, defaults));

    var defaults = {};

    _this.settings.isLoaded = false;
    return _this;
  }

  _createClass(LoadImage, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var throttleTime = 250;

      this.shouldILoadImage(); // initial check to see if image needs to be loaded
      // set up a resize event to check when a window is
      window.addEventListener("resize", __WEBPACK_IMPORTED_MODULE_2_throttleit___default()(function () {
        _this2.shouldILoadImage();
      }, throttleTime));
      // set up a resize event to check when a window is
      window.addEventListener("scroll", __WEBPACK_IMPORTED_MODULE_2_throttleit___default()(function () {
        _this2.shouldILoadImage();
      }, throttleTime));
      console.log("Load image has initialised");
    }
  }, {
    key: "shouldILoadImage",
    value: function shouldILoadImage() {
      var _this3 = this;

      var img = this.el.querySelector("img.LoadImage");
      var bp = this.settings.bp;
      var imgUrl = this.settings.url;

      if (img && // image exists
      !this.settings.isLoaded && // is not already loaded
      __WEBPACK_IMPORTED_MODULE_1_verge___default.a.viewportW() >= bp && // meets the requesite breakpoints
      __WEBPACK_IMPORTED_MODULE_1_verge___default.a.inViewport(img, 100) // is within 100px of the viewport area
      ) {
          setTimeout(function () {
            _this3.loadImage(img, imgUrl);
          }, 0); // simulate loading
        }
    }
  }, {
    key: "loadImage",
    value: function loadImage(targetImg, imgUrl) {
      var imgToLoad = new Image(); // create new image in memory
      var module = this; // this placeholder

      if (this.settings.alt) targetImg.alt = this.settings.alt; // add alt text if provided
      imgToLoad.onload = function () {
        // when memory image is fully loaded
        targetImg.src = this.src; // assign url to the placeholder image
        module.el.classList.add("ImageLoaded"); // Add loaded class
        module.settings.isLoaded = true; // mark as loaded
      };
      imgToLoad.src = imgUrl; // load required image in memory
    }
  }]);

  return LoadImage;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (LoadImage);

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_forEach__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_forEach___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__helpers_forEach__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DropdownMenu = function (_Module) {
  _inherits(DropdownMenu, _Module);

  function DropdownMenu(el, name, options) {
    _classCallCheck(this, DropdownMenu);

    var defaults = {};
    return _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, el, name, options, defaults));
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */


  _createClass(DropdownMenu, [{
    key: "init",
    value: function init() {
      console.log(this.name + " has initialised");
      this.dom = this.cacheDom();
      this.addEventListeners();
    }
  }, {
    key: "cacheDom",
    value: function cacheDom() {
      return {
        dropdownMenuParent: this.el.querySelectorAll(".is-dropdown-menu-parent > .c-menu__link"),
        accordionMenuParent: this.el.querySelectorAll(".is-accordion-menu-parent > .c-menu__link")
      };
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_1__helpers_forEach___default()(this.dom.dropdownMenuParent, function (menuItemParent, index) {
        menuItemParent.addEventListener("click", function (e) {
          e.preventDefault();
          _this2.handleParentClick(e, index, _this2.dom.dropdownMenuParent[index].parentNode);
        });
      });

      __WEBPACK_IMPORTED_MODULE_1__helpers_forEach___default()(this.dom.accordionMenuParent, function (menuItemParent, index) {
        menuItemParent.addEventListener("click", function (e) {
          e.preventDefault();
          _this2.handleParentClick(e, index, _this2.dom.accordionMenuParent[index].parentNode);
        });
      });
    }
  }, {
    key: "handleParentClick",
    value: function handleParentClick(e, item, itemParent) {
      if (itemParent.classList.contains("is-active")) {
        itemParent.classList.remove("is-active");
      } else {
        itemParent.classList.add("is-active");
      }
    }
  }]);

  return DropdownMenu;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (DropdownMenu);

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_layzr_js__ = __webpack_require__(361);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ResImg = function (_Module) {
  _inherits(ResImg, _Module);

  function ResImg(el, name, options) {
    _classCallCheck(this, ResImg);

    var defaults = {
      threshold: 0,
      normal: "data-resimg-normal",
      retina: "data-resimg-retina",
      srcset: "data-resimg-srcset"
    };

    return _possibleConstructorReturn(this, (ResImg.__proto__ || Object.getPrototypeOf(ResImg)).call(this, el, name, options, defaults));
  }

  _createClass(ResImg, [{
    key: "init",
    value: function init() {
      var resimg = this;

      var layzrInstance = Object(__WEBPACK_IMPORTED_MODULE_1_layzr_js__["a" /* default */])({
        normal: resimg.settings.normal,
        retina: resimg.settings.retina,
        srcset: resimg.settings.srcset,
        threshold: resimg.settings.threshold
      });

      layzrInstance.update().check().handlers(true);

      console.log(layzrInstance);

      console.log(this.name + " has initialised");
    }
  }]);

  return ResImg;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (ResImg);

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Slider = function (_Module) {
  _inherits(Slider, _Module);

  function Slider(el, name, options) {
    _classCallCheck(this, Slider);

    var defaults = {
      type: false,
      slidesToShow: false,
      slidesToShowMd: false
    };

    return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, el, name, options, defaults));
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */


  _createClass(Slider, [{
    key: "init",
    value: function init() {
      var Slider = this;
      console.log(this.name + " has initialised");
      this.dom = this.cacheDom();
      // document.addEventListener('bpupdate', myFunction, false);

      // Make the slider
      this.makeSlider();
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector;
      }
    }
  }, {
    key: "cacheDom",
    value: function cacheDom() {
      return {
        slides: this.el.querySelector(".c-slider__slides"),
        slide: this.el.querySelectorAll(".c-slider__slide"),
        controls: this.el.querySelector(".c-slider__controls"),
        nextButton: this.el.querySelector(".c-slider__next"),
        previousButton: this.el.querySelector(".c-slider__previous"),
        pips: this.el.querySelector(".c-slider__pips")
      };
    }
  }, {
    key: "makeSlider",
    value: function makeSlider() {
      var _this2 = this;

      var sliderNum = 0;
      var direction = 1;
      var slidesTotal = this.dom.slide.length;

      // Settings: Reactive slider
      if (this.settings.slidesToShow) {
        if (this.settings.slidesToShowMd == 4 && window.jwAtomic.modules.Breakpoint.detail.gtSm) {
          slidesTotal = this.dom.slide.length / this.settings.slidesToShowMd;
        } else {
          slidesTotal = this.dom.slide.length / this.settings.slidesToShow;
        }
      }

      for (var i = 0; i < slidesTotal; i++) {
        if (slidesTotal > 1 && this.dom.slide[i].classList.contains("is-active")) {
          sliderNum = i;
        }

        // Hero slider height
        if (this.settings.type == "hero") {
          var vheight = window.innerHeight - document.querySelector(".SiteHeader").offsetHeight;
          vheight = vheight - vheight * 10 / 100;
          this.dom.slide[i].style.minHeight = vheight + "px";
        }

        // Create pips
        if (slidesTotal > 1) {
          if (i == 0) {
            this.dom.pips.innerHTML += "<div class=\"c-slider__pip is-active\"></div>";
          } else {
            this.dom.pips.innerHTML += "<div class=\"c-slider__pip\"></div>";
          }
        }
      }

      // Reactive slider setup
      if (this.settings.slidesToShow) {
        for (var _i = 0; _i < this.dom.slide.length; _i++) {
          if (this.settings.slidesToShow == 2) {
            this.dom.slide[_i].style.flex = "0 0 50%";
            this.dom.slide[_i].style.width = "50%";
          } else {
            this.dom.slide[_i].style.flex = "0 0 25%";
            this.dom.slide[_i].style.width = "25%";
          }

          if (window.jwAtomic.modules.Breakpoint.detail.gtSm) {
            if (this.settings.slidesToShowMd == 4) {
              this.dom.slide[_i].style.flex = "0 0 25%";
              this.dom.slide[_i].style.width = "25%";
            }
          }
        }
      }

      if (slidesTotal == 1) {
        this.dom.controls.style.display = "none";
      }

      var slides = Array.from(this.el.querySelector(".c-slider__pips").children);

      var slideForward = function slideForward() {
        direction = 1;
        sliderNum += 1;
        if (sliderNum >= slidesTotal) sliderNum = 0;
        _this2.changeSlide(sliderNum, direction);
      };

      var slideBackward = function slideBackward() {
        direction = 0;
        sliderNum -= 1;
        if (sliderNum < 0) sliderNum = slidesTotal - 1;
        _this2.changeSlide(sliderNum, direction);
      };

      var setSlide = function setSlide(event) {
        direction = 1;
        if (!event.target.matches("div.c-slider__pip")) return;
        var slide = event.target;
        var prevSlide = sliderNum;
        sliderNum = slides.indexOf(slide);
        if (prevSlide > sliderNum) {
          direction = 0;
        }

        _this2.changeSlide(sliderNum, direction);
      };

      this.dom.nextButton.addEventListener("click", slideForward);
      this.dom.previousButton.addEventListener("click", slideBackward);
      this.el.querySelector(".c-slider__pips").addEventListener("click", setSlide);
    }
  }, {
    key: "changeSlide",
    value: function changeSlide(sliderNum, direction) {
      var slidesTotal = this.dom.slide.length;

      if (!this.settings.slidesToShow) {
        for (var i = 0; i < slidesTotal; i++) {
          this.dom.slide[i].classList.remove("is-active", "is-active--next", "is-active--previous", "is-next", "is-previous");
        }

        this.dom.slide[sliderNum].classList.add("is-active");
        if (direction == 1) this.dom.slide[sliderNum].classList.add("is-active--next");
        if (direction == 0) this.dom.slide[sliderNum].classList.add("is-active--previous");
        if (this.dom.slide[sliderNum].nextElementSibling) this.dom.slide[sliderNum].nextElementSibling.classList.add("is-next");
        if (this.dom.slide[sliderNum].previousElementSibling) this.dom.slide[sliderNum].previousElementSibling.classList.add("is-previous");
      }

      // Reactive slider
      if (this.settings.slidesToShow) {
        var slideWidth = this.dom.slide[sliderNum].offsetWidth;
        var newSlideWidth = slideWidth * this.settings.slidesToShow;
        if (window.jwAtomic.modules.Breakpoint.detail.gtSm) {
          if (this.settings.slidesToShowMd == 4) {
            newSlideWidth = slideWidth * this.settings.slidesToShowMd;
          }
        }
        var transform = sliderNum * newSlideWidth;
        this.dom.slides.style.transform = "translateX(-" + transform + "px)";
      }

      // Set pip
      this.el.querySelector(".c-slider__pip.is-active").classList.remove("is-active");
      this.el.querySelectorAll(".c-slider__pip")[sliderNum].classList.add("is-active");
    }
  }]);

  return Slider;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Slider);

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sticky_js__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sticky_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sticky_js__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Sticky = function (_Module) {
  _inherits(Sticky, _Module);

  function Sticky(el, name, options) {
    _classCallCheck(this, Sticky);

    var defaults = {
      offsetTop: 0,
      bpStart: "gtBase",
      stickyItem: "c-Sticky__item",
      stickyClass: "is-sticky"
    };
    return _possibleConstructorReturn(this, (Sticky.__proto__ || Object.getPrototypeOf(Sticky)).call(this, el, name, options, defaults));
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates
   * every sticky element found with specified selector
   * @function
   */


  _createClass(Sticky, [{
    key: "init",
    value: function init() {
      var mySticky = new __WEBPACK_IMPORTED_MODULE_1_sticky_js___default.a(".c-Sticky__item");
      mySticky.update();
      console.log(this.name + " has initialised");
    }
  }]);

  return Sticky;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Sticky);

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_sibling__ = __webpack_require__(364);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


 // fix for DOM traversing (skips #text elements)

var Switcher = function (_Module) {
  _inherits(Switcher, _Module);

  function Switcher(el, name, options) {
    _classCallCheck(this, Switcher);

    var defaults = {
      activeIndex: 0, // pane to active first (first one by default)
      activeClass: "is-active",
      target: null,
      hash: false, // enable hash change and load panel with url hash
      hide: false, // switch hidden instead of class name
      event: "click"
    };

    return _possibleConstructorReturn(this, (Switcher.__proto__ || Object.getPrototypeOf(Switcher)).call(this, el, name, options, defaults));
  }

  _createClass(Switcher, [{
    key: "setHashIndex",
    value: function setHashIndex() {
      var hashIndex = this.tabIds.indexOf(location.hash); // return index of target

      // if active index is not set and there is not valid hash
      if (this.activeIndex === undefined && hashIndex < 0) {
        this.activeIndex = 0; // set active to 0
        this.hash = this.tabIds[0]; // set active hash
        return;
      }

      if (hashIndex >= 0) {
        // if we have a valid hash index
        this.activeIndex = hashIndex; // set activeIndex
        this.hash = location.hash; // set hash value
      }
    }
  }, {
    key: "addAriaTabs",
    value: function addAriaTabs() {
      this.el.setAttribute("role", "tablist");
      var toggleItems = [].slice.call(this.el.children);

      function prepareItem(item) {
        var target = item.getAttribute("href").replace("#", "");
        item.setAttribute("role", "tab");
        item.setAttribute("id", "tab-" + target);
        item.setAttribute("aria-controls", target);
        item.setAttribute("tab-index", 0);
      }

      toggleItems.map(function (item) {
        var tabItem = void 0;
        if (!item.hasAttribute("href")) {
          item.setAttribute("role", "presentation");
          if (item.querySelector("[href]")) {
            tabItem = item.querySelector("[href]");
          }
        } else {
          tabItem = item;
        }
      });

      this.targets.map(function (pane) {
        pane.setAttribute("role", "tab-panel");
        pane.setAttribute("aria-labelledby", "tab-" + pane.getAttribute("id"));
      });
    }
  }, {
    key: "normaliseTargets",
    value: function normaliseTargets() {
      var targets;

      if (this.settings.target === null) {
        // if target is not provided use the next sibling element to the menu
        targets = [Object(__WEBPACK_IMPORTED_MODULE_1__helpers_sibling__["a" /* default */])(this.el, "nextSibling")];
      } else {
        // target is not an array, convert it and store it
        targets = typeof this.settings.target === "string" ? [this.settings.target] : this.settings.target;
      }

      this.targets = targets.map(function (target) {
        if (typeof target === "string") {
          target = document.querySelector(target);
        }
        target.panes = [].slice.call(target.children);
        return target;
      });
    }
  }, {
    key: "validateTargets",
    value: function validateTargets() {
      var itemCount = this.items.length;
      var valid = true;

      this.targets.map(function (target) {
        if (target.panes) {
          if (target.panes.length < itemCount) {
            valid = false;
          }
        } else {
          valid = false;
        }
      });

      return valid;
    }
  }, {
    key: "init",
    value: function init() {
      var switcher = this; // store module reference for handler functions
      var items = this.el.querySelectorAll("[href]"); // create an array of menu items

      // [...items]
      this.items = Array.from(items);

      // create an array of target IDs
      this.tabIds = this.items.map(function (item) {
        return item.getAttribute("href");
      });

      this.targets = [];
      this.normaliseTargets(); // popular targets array normalised element references

      if (!this.validateTargets()) {
        console.warn("Switcher aborted: The target element does not pass validation rules");
        this.el.setAttribute("hidden", true);
        return;
      }

      if (!this.settings.hash) {
        // if not hash change
        // set active index to the one provided in settings
        this.activeIndex = this.settings.activeIndex;
      } else {
        // set active index from the hash
        this.setHashIndex();
      }

      if (this.settings.hide) {
        this.addAriaTabs();
      }

      var clickHandler = function clickHandler(e) {
        e.preventDefault(); // stop the page jump and hash change
        // create an array of menu items
        var nodeList = [].slice.call(switcher.el.children);

        if (nodeList.indexOf(e.target) > -1) {
          // if what was clicked is a menu item
          switcher.activeIndex = nodeList.indexOf(e.target); // set the activeIndex
        } else {
          // if the target is not a menu item (blank space #text)
          if (nodeList.indexOf(e.target.parentNode) > -1) {
            // try it's parent item
            switcher.activeIndex = nodeList.indexOf(e.target.parentNode); // set the activeIndex
          }
        }
        switcher.activateItem(); // once set, activate the item
      };

      var hashChangeHandler = function hashChangeHandler() {
        switcher.setHashIndex();
        switcher.activateItem();
      };

      if (!this.settings.hash) {
        // if not using hash change
        this.el.addEventListener("click", clickHandler); // add the click handler to the menu
      } else {
        window.addEventListener("hashchange", hashChangeHandler, false); // add the hash change handler
      }
      this.activateItem(this.activeIndex); // activate with initial item

      console.log(this.name + " has initialised");
    }
  }, {
    key: "activateItem",
    value: function activateItem() {
      var i = 0;
      var activeClass = this.settings.activeClass;
      var switcher = this;

      // add/remove active class on menu items
      this.items.map(function (item) {
        if (i !== switcher.activeIndex) {
          item.classList.remove(activeClass);
          item.setAttribute("aria-selected", false);
        } else {
          item.classList.add(activeClass);
          item.setAttribute("aria-selected", true);
        }
        i++;
      });

      this.targets.map(function (target) {
        var y = 0;

        target.panes.map(function (pane) {
          if (y !== switcher.activeIndex) {
            switcher.settings.hide ? pane.setAttribute("hidden", true) : pane.classList.remove(activeClass);
          } else {
            switcher.settings.hide ? pane.removeAttribute("hidden") : pane.classList.add(activeClass);
          }
          y++;
        });
      });
    }
  }]);

  return Switcher;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Switcher);

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_forEach__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_forEach___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__helpers_forEach__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Toggle = function (_Module) {
  _inherits(Toggle, _Module);

  function Toggle(el, name, options) {
    _classCallCheck(this, Toggle);

    var defaults = {
      once: false, // perform toggle only once
      activeClass: "is-active",
      target: "", // element to toggle activeClass on (self by default)
      event: "click",
      hide: false // whether to hide target element
    };

    return _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, el, name, options, defaults));
  }

  _createClass(Toggle, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var Toggle = this; // 'this' reference

      // set target (self or not)
      if (this.settings.target === "") {
        this.self = true;
        this.settings.target = [this.el];
        this.el.setAttribute("aria-pressed", this.el.classList.contains(this.settings.activeClass)); // init aria
      } else {
        this.self = false;
        var target = this.settings.target;
        if (typeof target === "string") {
          // make target an array if it is not already
          if (target === "parent") {
            this.settings.target = [this.el.parentNode];
          } else {
            this.settings.target = [this.settings.target];
          }
        }
      }

      var active = void 0;

      // set active status for global object
      __WEBPACK_IMPORTED_MODULE_1__helpers_forEach___default()(this.settings.target, function (target) {
        var index = _this2.settings.target.indexOf(target);
        var eleTarget = typeof target === "string" ? document.querySelector(target) : target;

        active = _this2.settings.hide ? !eleTarget.hasAttribute("hidden") : eleTarget.classList.contains(_this2.settings.activeClass);

        window.jwAtomic.modules[_this2.uid].details.target[index] = eleTarget;
      });

      this.addModDetail("self", this.self);
      this.addModDetail("active", active);

      var toggleIt = function toggleIt() {
        if (_this2.settings.once) {
          _this2.el.removeEventListener("click", toggleIt);
        }

        if (_this2.self) {
          _this2.doToggle(_this2.el, Toggle.settings.target[0]);
          _this2.el.setAttribute("aria-pressed", Toggle.el.classList.contains(_this2.settings.activeClass)); // init aria
          return;
        }

        var targets = _this2.settings.target;

        for (var i = 0, x = targets.length; i < x; i++) {
          var mytarget = typeof targets[i] === "string" ? document.querySelector(targets[i]) : targets[i];

          if (mytarget) {
            _this2.doToggle(mytarget, _this2.el);
            // window.jwAtomic.modules[this.uid].details.active = !window.jwAtomic.modules[this.uid].details.target[i].active
          }
        }
      };

      // add event listener
      this.el.addEventListener("click", toggleIt); // click event

      console.log(this.name + " has initialised");
    }
  }, {
    key: "doToggle",
    value: function doToggle(target, baseEle) {
      if (target) {
        if (this.settings.hide) {
          if (target.hasAttribute("hidden")) {
            target.removeAttribute("hidden");
            window.jwAtomic.modules[baseEle.getAttribute("id")].details.active = true;
          } else {
            target.setAttribute("hidden", true);
            window.jwAtomic.modules[baseEle.getAttribute("id")].details.active = false;
          }
          return;
        }
        target.classList.toggle(this.settings.activeClass);

        window.jwAtomic.modules[baseEle.getAttribute("id")].details.active = target.classList.contains(this.settings.activeClass);
      }
    }
  }]);

  return Toggle;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Toggle);

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Module__ = __webpack_require__(339);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Validate = function (_Module) {
  _inherits(Validate, _Module);

  function Validate(el, name, options) {
    _classCallCheck(this, Validate);

    var defaults = {
      // messages that are tied to values on the validity object - *value* is for string replacement
      messages: {
        valueMissing: "Please fill out this field",
        typeMismatch: "Please use the correct input type",
        tooShort: "Please lengthen this text to *value* characters or more",
        tooLong: "Please shorten this text to *value* or less",
        badInput: "Please enter a number",
        stepMismatch: "Please enter a valid value",
        rangeOverflow: "Please select a value that is no more than *value*",
        rangeUnderflow: "Please select a value that is no less than *value*",
        patternMismatch: "Please match the requested format"
      },
      // other custom messages
      customMessages: {
        email: "Please enter a valid email address",
        url: "Please enter a valid URL",
        generic: "The value you entered for this field is invalid"
      },
      errorClasses: {
        field: "Form-input--danger",
        message: "Panel Panel--error"
      }
    };

    var _this = _possibleConstructorReturn(this, (Validate.__proto__ || Object.getPrototypeOf(Validate)).call(this, el, name, options, defaults));

    _this.blurHandler = _this.blurHandler.bind(_this);
    return _this;
  }

  // param: f = field element
  // returns: error message: string || undefined


  _createClass(Validate, [{
    key: "hasError",
    value: function hasError(f) {
      // type of field not for validation
      if (f.disabled || f.type === "file" || f.type === "reset" || f.type === "button" || f.type === "submit") return;

      var v = f.validity; // get validity object of field
      var msg = this.settings.messages;
      var custom = this.settings.customMessages;

      if (v.valid) return; // field is valid: return nothing

      // loop through key of the msg object (these relate directly to the validity object
      for (var key in msg) {
        if (v[key]) {
          // if the error type is true
          if (f.hasAttribute("title")) return f.getAttribute("title");
          if (key === "typeMismatch") {
            if (f.type === "email") return custom[f.type]; // email message
            if (f.type === "url") return custom[f.type]; // url message
          }
          // messages that need string replacement
          if (key === "tooShort") return msg[key].replace("*value*", f.getAttribute("minLength"));
          if (key === "tooLong") return msg[key].replace("*value*", f.getAttribute("maxLength"));
          if (key === "rangeOverflow") return msg[key].replace("*value*", f.getAttribute("max"));
          if (key === "rangeUnderflow") return msg[key].replace("*value*", f.getAttribute("min"));
          if (msg[key]) return msg[key]; // return error message
          return custom["generic"]; // if all else fails use custom generic message
        }
      }
    }
  }, {
    key: "showError",
    value: function showError(f, err) {
      f.classList.add(this.settings.errorClasses["field"]);

      if (f.type === "radio" && f.name) {
        var group = document.getElementsByName(f.name);
        if (group.length > 0) {
          for (var i = 0; i < group.length; i++) {
            f = group[group.length - 1];
          }
        }
      }

      var id = f.id || f.name;
      if (!id) return;
      var msgId = "error-for-" + id;

      var msg = this.el.querySelector("#" + msgId);
      if (!msg) {
        msg = document.createElement("div");
        msg.className = this.settings.errorClasses["message"];
        msg.id = msgId;

        var label = void 0;
        if (f.type === "radio" || f.type === "checkbox") {
          label = this.el.querySelector("label[for=\"" + id + "\"]") || f.parentNode;
          if (label) {
            label.parentNode.insertBefore(msg, label.nextSibling);
          }
        }

        if (!label) {
          f.parentNode.insertBefore(msg, f.nextSibling);
        }
      }

      f.setAttribute("aria-describedby", msgId);

      msg.innerHTML = err;

      msg.style.display = "block";
      msg.style.visibility = "visible";
    }
  }, {
    key: "removeError",
    value: function removeError(f) {
      f.classList.remove(this.settings.errorClasses["field"]);
      f.removeAttribute("aria-describedby");

      if (f.type === "radio" && f.name) {
        var group = document.getElementsByName(f.name);
        if (group.length > 0) {
          f = group[group.length - 1];
        }
      }

      var id = f.id || f.name;
      if (!id) return;
      var msgId = "error-for-" + id;

      var msg = this.el.querySelector("#" + msgId);
      if (!msg) return;

      msg.innerHTML = "";
      msg.style.display = "none";
      msg.style.visibility = "hidden";
    }
  }, {
    key: "setNoValidate",
    value: function setNoValidate() {
      var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      remove ? this.el.removeAttribute("novalidate") : this.el.setAttribute("novalidate", true);
    }
  }, {
    key: "blurHandler",
    value: function blurHandler(e) {
      var error = this.hasError(e.target); // pass field to hasError
      if (error) {
        this.showError(e.target, error);
        return;
      } // if error, pass error and field to showError
      this.removeError(e.target); // field is valid - remove error
    }
  }, {
    key: "submitHandler",
    value: function submitHandler(e) {
      var error = void 0,
          hasErrors = void 0;
      var fields = this.el.elements;

      for (var i = 0; i < fields.length; i++) {
        error = this.hasError(fields[i]);
        if (error) {
          this.showError(fields[i], error);
          if (!hasErrors) hasErrors = fields[i];
        }
      }

      if (hasErrors) {
        e.preventDefault();
        hasErrors.focus();
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.setNoValidate(); // turn off in browser validation

      // delegate blur event on the form - pass event to blurHandler
      this.el.addEventListener("blur", function (e) {
        _this2.blurHandler(e);
      }, true);

      this.el.addEventListener("submit", function (e) {
        _this2.submitHandler(e);
      }, false);

      console.log(this.name + " has initialised");
    }
  }]);

  return Validate;
}(__WEBPACK_IMPORTED_MODULE_0__modules_Module__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = (Validate);

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(352);


/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(340);
var build = __webpack_require__(354);
var isValid = __webpack_require__(358);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(359) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.isValid = isValid;


/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generate = __webpack_require__(355);
var alphabet = __webpack_require__(340);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {
    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + generate(version);
    str = str + generate(clusterWorkerId);
    if (counter > 0) {
        str = str + generate(counter);
    }
    str = str + generate(seconds);
    return str;
}

module.exports = build;


/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(340);
var random = __webpack_require__(356);
var format = __webpack_require__(357);

function generate(number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + format(random, alphabet.get(), 1);
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = generate;


/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

var randomByte;

if (!crypto || !crypto.getRandomValues) {
    randomByte = function(size) {
        var bytes = [];
        for (var i = 0; i < size; i++) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    };
} else {
    randomByte = function(size) {
        return crypto.getRandomValues(new Uint8Array(size));
    };
}

module.exports = randomByte;


/***/ }),

/***/ 357:
/***/ (function(module, exports) {

/**
 * Secure random string generator with custom alphabet.
 *
 * Alphabet must contain 256 symbols or less. Otherwise, the generator
 * will not be secure.
 *
 * @param {generator} random The random bytes generator.
 * @param {string} alphabet Symbols to be used in new random string.
 * @param {size} size The number of symbols in new random string.
 *
 * @return {string} Random string.
 *
 * @example
 * const format = require('nanoid/format')
 *
 * function random (size) {
 *   const result = []
 *   for (let i = 0; i < size; i++) {
 *     result.push(randomByte())
 *   }
 *   return result
 * }
 *
 * format(random, "abcdef", 5) //=> "fbaef"
 *
 * @name format
 * @function
 */
module.exports = function (random, alphabet, size) {
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
  var step = Math.ceil(1.6 * mask * size / alphabet.length)

  var id = ''
  while (true) {
    var bytes = random(step)
    for (var i = 0; i < step; i++) {
      var byte = bytes[i] & mask
      if (alphabet[byte]) {
        id += alphabet[byte]
        if (id.length === size) return id
      }
    }
  }
}

/**
 * @callback generator
 * @param {number} bytes The number of bytes to generate.
 * @return {number[]} Random bytes.
 */


/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(340);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var nonAlphabetic = new RegExp('[^' +
      alphabet.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
    ']');
    return !nonAlphabetic.test(id);
}

module.exports = isShortId;


/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),

/***/ 360:
/***/ (function(module, exports) {

/*!
 * verge 1.10.2+201705300050
 * http://npm.im/verge
 * MIT Ryan Van Etten
 */

!function(root, name, make) {
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
  else root[name] = make();
}(this, 'verge', function() {

  var xports = {}
    , win = typeof window != 'undefined' && window
    , doc = typeof document != 'undefined' && document
    , docElem = doc && doc.documentElement
    , matchMedia = win['matchMedia'] || win['msMatchMedia']
    , mq = matchMedia ? function(q) {
        return !!matchMedia.call(win, q).matches;
      } : function() {
        return false;
      }
    , viewportW = xports['viewportW'] = function() {
        var a = docElem['clientWidth'], b = win['innerWidth'];
        return a < b ? b : a;
      }
    , viewportH = xports['viewportH'] = function() {
        var a = docElem['clientHeight'], b = win['innerHeight'];
        return a < b ? b : a;
      };

  /**
   * Test if a media query is active. Like Modernizr.mq
   * @since 1.6.0
   * @return {boolean}
   */
  xports['mq'] = mq;

  /**
   * Normalized matchMedia
   * @since 1.6.0
   * @return {MediaQueryList|Object}
   */
  xports['matchMedia'] = matchMedia ? function() {
    // matchMedia must be binded to window
    return matchMedia.apply(win, arguments);
  } : function() {
    // Gracefully degrade to plain object
    return {};
  };

  /**
   * @since 1.8.0
   * @return {{width:number, height:number}}
   */
  function viewport() {
    return {'width':viewportW(), 'height':viewportH()};
  }
  xports['viewport'] = viewport;

  /**
   * Cross-browser window.scrollX
   * @since 1.0.0
   * @return {number}
   */
  xports['scrollX'] = function() {
    return win.pageXOffset || docElem.scrollLeft;
  };

  /**
   * Cross-browser window.scrollY
   * @since 1.0.0
   * @return {number}
   */
  xports['scrollY'] = function() {
    return win.pageYOffset || docElem.scrollTop;
  };

  /**
   * @param {{top:number, right:number, bottom:number, left:number}} coords
   * @param {number=} cushion adjustment
   * @return {Object}
   */
  function calibrate(coords, cushion) {
    var o = {};
    cushion = +cushion || 0;
    o['width'] = (o['right'] = coords['right'] + cushion) - (o['left'] = coords['left'] - cushion);
    o['height'] = (o['bottom'] = coords['bottom'] + cushion) - (o['top'] = coords['top'] - cushion);
    return o;
  }

  /**
   * Cross-browser element.getBoundingClientRect plus optional cushion.
   * Coords are relative to the top-left corner of the viewport.
   * @since 1.0.0
   * @param {Element|Object} el element or stack (uses first item)
   * @param {number=} cushion +/- pixel adjustment amount
   * @return {Object|boolean}
   */
  function rectangle(el, cushion) {
    el = el && !el.nodeType ? el[0] : el;
    if (!el || 1 !== el.nodeType) return false;
    return calibrate(el.getBoundingClientRect(), cushion);
  }
  xports['rectangle'] = rectangle;

  /**
   * Get the viewport aspect ratio (or the aspect ratio of an object or element)
   * @since 1.7.0
   * @param {(Element|Object)=} o optional object with width/height props or methods
   * @return {number}
   * @link http://w3.org/TR/css3-mediaqueries/#orientation
   */
  function aspect(o) {
    o = null == o ? viewport() : 1 === o.nodeType ? rectangle(o) : o;
    var h = o['height'], w = o['width'];
    h = typeof h == 'function' ? h.call(o) : h;
    w = typeof w == 'function' ? w.call(o) : w;
    return w/h;
  }
  xports['aspect'] = aspect;

  /**
   * Test if an element is in the same x-axis section as the viewport.
   * @since 1.0.0
   * @param {Element|Object} el
   * @param {number=} cushion
   * @return {boolean}
   */
  xports['inX'] = function(el, cushion) {
    var r = rectangle(el, cushion);
    return !!r && r.right >= 0 && r.left <= viewportW();
  };

  /**
   * Test if an element is in the same y-axis section as the viewport.
   * @since 1.0.0
   * @param {Element|Object} el
   * @param {number=} cushion
   * @return {boolean}
   */
  xports['inY'] = function(el, cushion) {
    var r = rectangle(el, cushion);
    return !!r && r.bottom >= 0 && r.top <= viewportH();
  };

  /**
   * Test if an element is in the viewport.
   * @since 1.0.0
   * @param {Element|Object} el
   * @param {number=} cushion
   * @return {boolean}
   */
  xports['inViewport'] = function(el, cushion) {
    // Equiv to `inX(el, cushion) && inY(el, cushion)` but just manually do both
    // to avoid calling rectangle() twice. It gzips just as small like this.
    var r = rectangle(el, cushion);
    return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= viewportH() && r.left <= viewportW();
  };

  return xports;
});


/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var knot = function knot() {
  var extended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var events = Object.create(null);

  function on(name, handler) {
    events[name] = events[name] || [];
    events[name].push(handler);
    return this;
  }

  function once(name, handler) {
    handler._once = true;
    on(name, handler);
    return this;
  }

  function off(name) {
    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    handler ? events[name].splice(events[name].indexOf(handler), 1) : delete events[name];

    return this;
  }

  function emit(name) {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // cache the events, to avoid consequences of mutation
    var cache = events[name] && events[name].slice();

    // only fire handlers if they exist
    cache && cache.forEach(function (handler) {
      // remove handlers added with 'once'
      handler._once && off(name, handler);

      // set 'this' context, pass args to handlers
      handler.apply(_this, args);
    });

    return this;
  }

  return _extends({}, extended, {

    on: on,
    once: once,
    off: off,
    emit: emit
  });
};

var layzr = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // private

  var prevLoc = getLoc();
  var ticking = void 0;

  var nodes = void 0;
  var windowHeight = void 0;

  // options

  var settings = {
    normal: options.normal || 'data-normal',
    retina: options.retina || 'data-retina',
    srcset: options.srcset || 'data-srcset',
    threshold: options.threshold || 0
  };

  // feature detection
  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/srcset.js

  var srcset = document.body.classList.contains('srcset') || 'srcset' in document.createElement('img');

  // device pixel ratio
  // not supported in IE10 - https://msdn.microsoft.com/en-us/library/dn265030(v=vs.85).aspx

  var dpr = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI;

  // instance

  var instance = knot({
    handlers: handlers,
    check: check,
    update: update
  });

  return instance;

  // location helper

  function getLoc() {
    return window.scrollY || window.pageYOffset;
  }

  // debounce helpers

  function requestScroll() {
    prevLoc = getLoc();
    requestFrame();
  }

  function requestFrame() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        return check();
      });
      ticking = true;
    }
  }

  // offset helper

  function getOffset(node) {
    return node.getBoundingClientRect().top + prevLoc;
  }

  // in viewport helper

  function inViewport(node) {
    var viewTop = prevLoc;
    var viewBot = viewTop + windowHeight;

    var nodeTop = getOffset(node);
    var nodeBot = nodeTop + node.offsetHeight;

    var offset = settings.threshold / 100 * windowHeight;

    return nodeBot >= viewTop - offset && nodeTop <= viewBot + offset;
  }

  // source helper

  function setSource(node) {
    instance.emit('src:before', node);

    // prefer srcset, fallback to pixel density
    if (srcset && node.hasAttribute(settings.srcset)) {
      node.setAttribute('srcset', node.getAttribute(settings.srcset));
    } else {
      var retina = dpr > 1 && node.getAttribute(settings.retina);
      node.setAttribute('src', retina || node.getAttribute(settings.normal));
    }

    instance.emit('src:after', node);[settings.normal, settings.retina, settings.srcset].forEach(function (attr) {
      return node.removeAttribute(attr);
    });

    update();
  }

  // API

  function handlers(flag) {
    var action = flag ? 'addEventListener' : 'removeEventListener';['scroll', 'resize'].forEach(function (event) {
      return window[action](event, requestScroll);
    });
    return this;
  }

  function check() {
    windowHeight = window.innerHeight;

    nodes.forEach(function (node) {
      return inViewport(node) && setSource(node);
    });

    ticking = false;
    return this;
  }

  function update() {
    nodes = Array.prototype.slice.call(document.querySelectorAll('[' + settings.normal + ']'));
    return this;
  }
});

/* harmony default export */ __webpack_exports__["a"] = (layzr);


/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {


var Sticky = __webpack_require__(363);

module.exports = Sticky;


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Sticky.js
 * Library for sticky elements written in vanilla javascript. With this library you can easily set sticky elements on your website. It's also responsive.
 *
 * @version 1.2.0
 * @author Rafal Galus <biuro@rafalgalus.pl>
 * @website https://rgalus.github.io/sticky-js/
 * @repo https://github.com/rgalus/sticky-js
 * @license https://github.com/rgalus/sticky-js/blob/master/LICENSE
 */

var Sticky = function () {
  /**
   * Sticky instance constructor
   * @constructor
   * @param {string} selector - Selector which we can find elements
   * @param {string} options - Global options for sticky elements (could be overwritten by data-{option}="" attributes)
   */
  function Sticky() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Sticky);

    this.selector = selector;
    this.elements = [];

    this.version = '1.2.0';

    this.vp = this.getViewportSize();
    this.body = document.querySelector('body');

    this.options = {
      wrap: options.wrap || false,
      marginTop: options.marginTop || 0,
      stickyFor: options.stickyFor || 0,
      stickyClass: options.stickyClass || null,
      stickyContainer: options.stickyContainer || 'body'
    };

    this.updateScrollTopPosition = this.updateScrollTopPosition.bind(this);

    this.updateScrollTopPosition();
    window.addEventListener('load', this.updateScrollTopPosition);
    window.addEventListener('scroll', this.updateScrollTopPosition);

    this.run();
  }

  /**
   * Function that waits for page to be fully loaded and then renders & activates every sticky element found with specified selector
   * @function
   */


  Sticky.prototype.run = function run() {
    var _this = this;

    // wait for page to be fully loaded
    var pageLoaded = setInterval(function () {
      if (document.readyState === 'complete') {
        clearInterval(pageLoaded);

        var elements = document.querySelectorAll(_this.selector);
        _this.forEach(elements, function (element) {
          return _this.renderElement(element);
        });
      }
    }, 10);
  };

  /**
   * Function that assign needed variables for sticky element, that are used in future for calculations and other
   * @function
   * @param {node} element - Element to be rendered
   */


  Sticky.prototype.renderElement = function renderElement(element) {
    var _this2 = this;

    // create container for variables needed in future
    element.sticky = {};

    // set default variables
    element.sticky.active = false;

    element.sticky.marginTop = parseInt(element.getAttribute('data-margin-top')) || this.options.marginTop;
    element.sticky.stickyFor = parseInt(element.getAttribute('data-sticky-for')) || this.options.stickyFor;
    element.sticky.stickyClass = element.getAttribute('data-sticky-class') || this.options.stickyClass;
    element.sticky.wrap = element.hasAttribute('data-sticky-wrap') ? true : this.options.wrap;
    // @todo attribute for stickyContainer
    // element.sticky.stickyContainer = element.getAttribute('data-sticky-container') || this.options.stickyContainer;
    element.sticky.stickyContainer = this.options.stickyContainer;

    element.sticky.container = this.getStickyContainer(element);
    element.sticky.container.rect = this.getRectangle(element.sticky.container);

    element.sticky.rect = this.getRectangle(element);

    // fix when element is image that has not yet loaded and width, height = 0
    if (element.tagName.toLowerCase() === 'img') {
      element.onload = function () {
        return element.sticky.rect = _this2.getRectangle(element);
      };
    }

    if (element.sticky.wrap) {
      this.wrapElement(element);
    }

    // activate rendered element
    this.activate(element);
  };

  /**
   * Wraps element into placeholder element
   * @function
   * @param {node} element - Element to be wrapped
   */


  Sticky.prototype.wrapElement = function wrapElement(element) {
    element.insertAdjacentHTML('beforebegin', '<span></span>');
    element.previousSibling.appendChild(element);
  };

  /**
   * Function that activates element when specified conditions are met and then initalise events
   * @function
   * @param {node} element - Element to be activated
   */


  Sticky.prototype.activate = function activate(element) {
    if (element.sticky.rect.top + element.sticky.rect.height < element.sticky.container.rect.top + element.sticky.container.rect.height && element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
      element.sticky.active = true;
    }

    if (this.elements.indexOf(element) < 0) {
      this.elements.push(element);
    }

    if (!element.sticky.resizeEvent) {
      this.initResizeEvents(element);
      element.sticky.resizeEvent = true;
    }

    if (!element.sticky.scrollEvent) {
      this.initScrollEvents(element);
      element.sticky.scrollEvent = true;
    }

    this.setPosition(element);
  };

  /**
   * Function which is adding onResizeEvents to window listener and assigns function to element as resizeListener
   * @function
   * @param {node} element - Element for which resize events are initialised
   */


  Sticky.prototype.initResizeEvents = function initResizeEvents(element) {
    var _this3 = this;

    element.sticky.resizeListener = function () {
      return _this3.onResizeEvents(element);
    };
    window.addEventListener('resize', element.sticky.resizeListener);
  };

  /**
   * Removes element listener from resize event
   * @function
   * @param {node} element - Element from which listener is deleted
   */


  Sticky.prototype.destroyResizeEvents = function destroyResizeEvents(element) {
    window.removeEventListener('resize', element.sticky.resizeListener);
  };

  /**
   * Function which is fired when user resize window. It checks if element should be activated or deactivated and then run setPosition function
   * @function
   * @param {node} element - Element for which event function is fired
   */


  Sticky.prototype.onResizeEvents = function onResizeEvents(element) {
    this.vp = this.getViewportSize();

    element.sticky.rect = this.getRectangle(element);
    element.sticky.container.rect = this.getRectangle(element.sticky.container);

    if (element.sticky.rect.top + element.sticky.rect.height < element.sticky.container.rect.top + element.sticky.container.rect.height && element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
      element.sticky.active = true;
    } else if (element.sticky.rect.top + element.sticky.rect.height >= element.sticky.container.rect.top + element.sticky.container.rect.height || element.sticky.stickyFor >= this.vp.width && element.sticky.active) {
      element.sticky.active = false;
    }

    this.setPosition(element);
  };

  /**
   * Function which is adding onScrollEvents to window listener and assigns function to element as scrollListener
   * @function
   * @param {node} element - Element for which scroll events are initialised
   */


  Sticky.prototype.initScrollEvents = function initScrollEvents(element) {
    var _this4 = this;

    element.sticky.scrollListener = function () {
      return _this4.onScrollEvents(element);
    };
    window.addEventListener('scroll', element.sticky.scrollListener);
  };

  /**
   * Removes element listener from scroll event
   * @function
   * @param {node} element - Element from which listener is deleted
   */


  Sticky.prototype.destroyScrollEvents = function destroyScrollEvents(element) {
    window.removeEventListener('scroll', element.sticky.scrollListener);
  };

  /**
   * Function which is fired when user scroll window. If element is active, function is invoking setPosition function
   * @function
   * @param {node} element - Element for which event function is fired
   */


  Sticky.prototype.onScrollEvents = function onScrollEvents(element) {
    if (element.sticky.active) {
      this.setPosition(element);
    }
  };

  /**
   * Main function for the library. Here are some condition calculations and css appending for sticky element when user scroll window
   * @function
   * @param {node} element - Element that will be positioned if it's active
   */


  Sticky.prototype.setPosition = function setPosition(element) {
    this.css(element, { position: '', width: '', top: '', left: '' });

    if (this.vp.height < element.sticky.rect.height || !element.sticky.active) {
      return;
    }

    if (!element.sticky.rect.width) {
      element.sticky.rect = this.getRectangle(element);
    }

    if (element.sticky.wrap) {
      this.css(element.parentNode, {
        display: 'block',
        width: element.sticky.rect.width + 'px',
        height: element.sticky.rect.height + 'px'
      });
    }

    if (element.sticky.rect.top === 0 && element.sticky.container === this.body) {
      this.css(element, {
        position: 'fixed',
        top: element.sticky.rect.top + 'px',
        left: element.sticky.rect.left + 'px',
        width: element.sticky.rect.width + 'px'
      });
    } else if (this.scrollTop > element.sticky.rect.top - element.sticky.marginTop) {
      this.css(element, {
        position: 'fixed',
        width: element.sticky.rect.width + 'px',
        left: element.sticky.rect.left + 'px'
      });

      if (this.scrollTop + element.sticky.rect.height + element.sticky.marginTop > element.sticky.container.rect.top + element.sticky.container.offsetHeight) {

        if (element.sticky.stickyClass) {
          element.classList.remove(element.sticky.stickyClass);
        }

        this.css(element, {
          top: element.sticky.container.rect.top + element.sticky.container.offsetHeight - (this.scrollTop + element.sticky.rect.height) + 'px' });
      } else {
        if (element.sticky.stickyClass) {
          element.classList.add(element.sticky.stickyClass);
        }

        this.css(element, { top: element.sticky.marginTop + 'px' });
      }
    } else {
      if (element.sticky.stickyClass) {
        element.classList.remove(element.sticky.stickyClass);
      }

      this.css(element, { position: '', width: '', top: '', left: '' });

      if (element.sticky.wrap) {
        this.css(element.parentNode, { display: '', width: '', height: '' });
      }
    }
  };

  /**
   * Function that updates element sticky rectangle (with sticky container), then activate or deactivate element, then update position if it's active
   * @function
   */


  Sticky.prototype.update = function update() {
    var _this5 = this;

    this.forEach(this.elements, function (element) {
      element.sticky.rect = _this5.getRectangle(element);
      element.sticky.container.rect = _this5.getRectangle(element.sticky.container);

      _this5.activate(element);
      _this5.setPosition(element);
    });
  };

  /**
   * Destroys sticky element, remove listeners
   * @function
   */


  Sticky.prototype.destroy = function destroy() {
    var _this6 = this;

    this.forEach(this.elements, function (element) {
      _this6.destroyResizeEvents(element);
      _this6.destroyScrollEvents(element);
      delete element.sticky;
    });
  };

  /**
   * Function that returns container element in which sticky element is stuck (if is not specified, then it's stuck to body)
   * @function
   * @param {node} element - Element which sticky container are looked for
   * @return {node} element - Sticky container
   */


  Sticky.prototype.getStickyContainer = function getStickyContainer(element) {
    var container = element.parentNode;

    while (!container.hasAttribute('data-sticky-container') && !container.parentNode.querySelector(element.sticky.stickyContainer) && container !== this.body) {
      container = container.parentNode;
    }

    return container;
  };

  /**
   * Function that returns element rectangle & position (width, height, top, left)
   * @function
   * @param {node} element - Element which position & rectangle are returned
   * @return {object}
   */


  Sticky.prototype.getRectangle = function getRectangle(element) {
    this.css(element, { position: '', width: '', top: '', left: '' });

    var width = Math.max(element.offsetWidth, element.clientWidth, element.scrollWidth);
    var height = Math.max(element.offsetHeight, element.clientHeight, element.scrollHeight);

    var top = 0;
    var left = 0;

    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return { top: top, left: left, width: width, height: height };
  };

  /**
   * Function that returns viewport dimensions
   * @function
   * @return {object}
   */


  Sticky.prototype.getViewportSize = function getViewportSize() {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };
  };

  /**
   * Function that updates window scroll position
   * @function
   * @return {number}
   */


  Sticky.prototype.updateScrollTopPosition = function updateScrollTopPosition() {
    this.scrollTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
  };

  /**
   * Helper function for loops
   * @helper
   * @param {array}
   * @param {function} callback - Callback function (no need for explanation)
   */


  Sticky.prototype.forEach = function forEach(array, callback) {
    for (var i = 0, len = array.length; i < len; i++) {
      callback(array[i]);
    }
  };

  /**
   * Helper function to add/remove css properties for specified element.
   * @helper
   * @param {node} element - DOM element
   * @param {object} properties - CSS properties that will be added/removed from specified element
   */


  Sticky.prototype.css = function css(element, properties) {
    for (var property in properties) {
      if (properties.hasOwnProperty(property)) {
        element.style[property] = properties[property];
      }
    }
  };

  return Sticky;
}();

/**
 * Export function that supports AMD, CommonJS and Plain Browser.
 */


(function (root, factory) {
  if (true) {
    module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.Sticky = factory;
  }
})(this, Sticky);

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


// 'nextSibling' or 'prevSibling' return '#text' if there is any white space between the elements
// This makes sure that an element is returned

var sibling = function sibling(cur, dir) {
  while ((cur = cur[dir]) && cur.nodeType !== 1) {}
  return cur;
};

/* harmony default export */ __webpack_exports__["a"] = (sibling);

/***/ })

});