/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/seach/control.js":
/*!******************************!*\
  !*** ./src/seach/control.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SeachControler": () => (/* binding */ SeachControler)
/* harmony export */ });
function SeachControler(Elements, Seach) {
  return {
    setController() {
      Elements.selectorFind.addEventListener('click', () => {
        let request = Elements.seachField.value;
        Seach.handleSelectors(request);
      });
      Elements.selectorNext.addEventListener('click', () => {
        Seach.nextSelector();
      });
      Elements.selectorPrev.addEventListener('click', () => {
        Seach.prevSelector();
      });
      Elements.navigationTop.addEventListener('click', () => {
        Seach.topSelector();
      });
      Elements.navigationBottom.addEventListener('click', () => {
        Seach.buttomSelector();
      });
      Elements.navigationLeft.addEventListener('click', () => {
        Seach.leftSelector();
      });
      Elements.navigationRight.addEventListener('click', () => {
        Seach.rightSelector();
      });
    }

  };
}

/***/ }),

/***/ "./src/seach/index.js":
/*!****************************!*\
  !*** ./src/seach/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Seach": () => (/* reexport safe */ _seach__WEBPACK_IMPORTED_MODULE_0__.Seach),
/* harmony export */   "View": () => (/* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_1__.View),
/* harmony export */   "SeachControler": () => (/* reexport safe */ _control__WEBPACK_IMPORTED_MODULE_2__.SeachControler)
/* harmony export */ });
/* harmony import */ var _seach__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./seach */ "./src/seach/seach.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/seach/view.js");
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./control */ "./src/seach/control.js");





/***/ }),

/***/ "./src/seach/seach.js":
/*!****************************!*\
  !*** ./src/seach/seach.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Seach": () => (/* binding */ Seach)
/* harmony export */ });
function DOMTree(current, View) {
  const parent = current.parentElement;
  const child = current.firstElementChild;
  const psibling = current.previousElementSibling;
  const nsibling = current.nextElementSibling;
  View.navigationTop(parent ? false : true);
  View.navigationBottom(child ? false : true);
  View.navigationLeft(psibling ? false : true);
  View.navigationRight(nsibling ? false : true);
  return {
    parent: parent,
    child: child,
    psibling: psibling,
    nsibling: nsibling,

    addClass() {
      View.addClassToSelector(current);
    },

    elements(element) {
      View.removeClassFromSelector(current);
      return new DOMTree(this[element], View);
    },

    removeClass() {
      View.removeClassFromSelector(current);
    }

  };
}

function Selectors(View) {
  let position = 0;
  let selectors = [];

  function buttons() {
    let length = selectors.length;

    if (length && position != length - 1) {
      View.selectorNext(false);
    } else {
      View.selectorNext(true);
    }

    if (position > 0) {
      View.selectorPrev(false);
    } else {
      View.selectorPrev(true);
    }
  }

  return {
    newRequest(request) {
      if (request) {
        selectors = document.querySelectorAll(request);
      }

      View.addClassToSelector(selectors[position]);
      buttons();
    },

    next() {
      let prev = selectors[position];
      View.removeClassFromSelector(prev);
      position += 1;
      let curr = selectors[position];
      View.addClassToSelector(curr);
      buttons();
    },

    prev() {
      let prev = selectors[position];
      View.removeClassFromSelector(prev);
      position -= 1;
      let curr = selectors[position];
      View.addClassToSelector(curr);
      buttons();
    },

    getDOM() {
      if (selectors.length) {
        return new DOMTree(selectors[position], View);
      }
    },

    turnOffButtons() {
      View.selectorPrev(true);
      View.selectorNext(true);
    },

    removeClass() {
      if (selectors.length) {
        View.removeClassFromSelector(selectors[position]);
      }
    }

  };
}

function Seach(View) {
  let selectors;
  let domTree;
  return {
    handleSelectors(request) {
      if (selectors) {
        selectors.removeClass();
      }

      if (domTree) {
        domTree.removeClass();
      }

      selectors = new Selectors(View);
      selectors.newRequest(request);
      domTree = selectors.getDOM();
    },

    nextSelector() {
      selectors.next();
      domTree = selectors.getDOM();
    },

    prevSelector() {
      selectors.prev();
      domTree = selectors.getDOM();
    },

    topSelector() {
      selectors.turnOffButtons();
      domTree = domTree.elements('parent');
      domTree.addClass();
    },

    buttomSelector() {
      selectors.turnOffButtons();
      domTree = domTree.elements('child');
      domTree.addClass();
    },

    leftSelector() {
      selectors.turnOffButtons();
      domTree = domTree.elements('psibling');
      domTree.addClass();
    },

    rightSelector() {
      selectors.turnOffButtons();
      domTree = domTree.elements('nsibling');
      domTree.addClass();
    }

  };
}

/***/ }),

/***/ "./src/seach/view.js":
/*!***************************!*\
  !*** ./src/seach/view.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => (/* binding */ View)
/* harmony export */ });
function View(Elements) {
  return {
    addClassToSelector(selector) {
      selector.classList.add('finded');
    },

    removeClassFromSelector(selector) {
      selector.classList.remove('finded');
    },

    selectorNext(disabled) {
      Elements.selectorNext.disabled = disabled;
    },

    selectorPrev(disabled) {
      Elements.selectorPrev.disabled = disabled;
    },

    navigationTop(disabled) {
      Elements.navigationTop.disabled = disabled;
    },

    navigationBottom(disabled) {
      Elements.navigationBottom.disabled = disabled;
    },

    navigationLeft(disabled) {
      Elements.navigationLeft.disabled = disabled;
    },

    navigationRight(disabled) {
      Elements.navigationRight.disabled = disabled;
    }

  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/panel.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/panel.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".jsbursa-panel {\n    z-index: 1000;\n    position: fixed;\n    right: 25px;\n    top: 25px;\n    width: 300px;\n    border: solid red 2px;\n    background-color: white;\n    padding: 10px;\n}", "",{"version":3,"sources":["webpack://./src/panel.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,eAAe;IACf,WAAW;IACX,SAAS;IACT,YAAY;IACZ,qBAAqB;IACrB,uBAAuB;IACvB,aAAa;AACjB","sourcesContent":[".jsbursa-panel {\n    z-index: 1000;\n    position: fixed;\n    right: 25px;\n    top: 25px;\n    width: 300px;\n    border: solid red 2px;\n    background-color: white;\n    padding: 10px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./blossoms.jpg */ "./src/blossoms.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./zen-bg.jpg */ "./src/zen-bg.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./h1.gif */ "./src/h1.gif"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./h2.gif */ "./src/h2.gif"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./paper-bg.jpg */ "./src/paper-bg.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./h3.gif */ "./src/h3.gif"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./h5.gif */ "./src/h5.gif"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./h6.gif */ "./src/h6.gif"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./cr1.gif */ "./src/cr1.gif"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ./cr2.gif */ "./src/cr2.gif"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* css Zen Garden default style v1.02 */\n/* css released under Creative Commons License - http://creativecommons.org/licenses/by-nc-sa/1.0/  */\n\n/* This file based on 'Tranquille' by Dave Shea */\n/* You may use this file as a foundation for any new work, but you may find it easier to start from scratch. */\n/* Not all elements are defined in this file, so you'll most likely want to refer to the xhtml as well. */\n\n/* Your images should be linked as if the CSS file sits in the same folder as the images. ie. no paths. */\n\n.finded {\n\toutline: solid red 5px;\n\tbackground-color: lightblue;\n}\n\n/* basic elements */\nhtml {\n\tmargin: 0;\n\tpadding: 0;\n\t}\nbody { \n\tfont: 75% georgia, sans-serif;\n\tline-height: 1.88889;\n\tcolor: #555753; \n\tbackground: #fff url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat bottom right; \n\tmargin: 0; \n\tpadding: 0;\n\t}\np { \n\tmargin-top: 0; \n\ttext-align: justify;\n\t}\nh3 { \n\tfont: italic normal 1.4em georgia, sans-serif;\n\tletter-spacing: 1px; \n\tmargin-bottom: 0; \n\tcolor: #7D775C;\n\t}\na:link { \n\tfont-weight: bold; \n\ttext-decoration: none; \n\tcolor: #B7A5DF;\n\t}\na:visited { \n\tfont-weight: bold; \n\ttext-decoration: none; \n\tcolor: #D4CDDC;\n\t}\na:hover, a:focus, a:active { \n\ttext-decoration: underline; \n\tcolor: #9685BA;\n\t}\nabbr {\n\tborder-bottom: none;\n\t}\n\n\n/* specific divs */\n.page-wrapper { \n\tbackground: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat top left; \n\tpadding: 0 175px 0 110px;  \n\tmargin: 0; \n\tposition: relative;\n\t}\n\n.intro { \n\tmin-width: 470px;\n\twidth: 100%;\n\t}\n\nheader h1 { \n\tbackground: transparent url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") no-repeat top left;\n\tmargin-top: 10px;\n\tdisplay: block;\n\twidth: 219px;\n\theight: 87px;\n\tfloat: left;\n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\nheader h2 { \n\tbackground: transparent url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") no-repeat top left; \n\tmargin-top: 58px; \n\tmargin-bottom: 40px; \n\twidth: 200px; \n\theight: 18px; \n\tfloat: right;\n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\nheader {\n\tpadding-top: 20px;\n\theight: 87px;\n}\n\n.summary {\n\tclear: both; \n\tmargin: 20px 20px 20px 10px; \n\twidth: 160px; \n\tfloat: left;\n\t}\n.summary p {\n\tfont: italic 1.1em/2.2 georgia; \n\ttext-align: center;\n\t}\n\n.preamble {\n\tclear: right; \n\tpadding: 0px 10px 0 10px;\n\t}\n.supporting {\t\n\tpadding-left: 10px; \n\tmargin-bottom: 40px;\n\t}\n\nfooter { \n\ttext-align: center; \n\t}\nfooter a:link, footer a:visited { \n\tmargin-right: 20px; \n\t}\n\n.sidebar {\n\tmargin-left: 600px; \n\tposition: absolute; \n\ttop: 0; \n\tright: 0;\n\t}\n.sidebar .wrapper { \n\tfont: 10px verdana, sans-serif; \n\tbackground: transparent url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") top left repeat-y; \n\tpadding: 10px; \n\tmargin-top: 150px; \n\twidth: 130px; \n\t}\n.sidebar h3.select { \n\tbackground: transparent url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") no-repeat top left; \n\tmargin: 10px 0 5px 0; \n\twidth: 97px; \n\theight: 16px; \n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\n.sidebar h3.archives { \n\tbackground: transparent url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") no-repeat top left; \n\tmargin: 25px 0 5px 0; \n\twidth:57px; \n\theight: 14px; \n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\n.sidebar h3.resources { \n\tbackground: transparent url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") no-repeat top left; \n\tmargin: 25px 0 5px 0; \n\twidth:63px; \n\theight: 10px; \n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\n\n\n.sidebar ul {\n\tmargin: 0;\n\tpadding: 0;\n\t}\n.sidebar li {\n\tline-height: 1.3em; \n\tbackground: transparent url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") no-repeat top center; \n\tdisplay: block; \n\tpadding-top: 5px; \n\tmargin-bottom: 5px;\n\tlist-style-type: none;\n\t}\n.sidebar li a:link {\n\tcolor: #988F5E;\n\t}\n.sidebar li a:visited {\n\tcolor: #B3AE94;\n\t}\n\n\n.extra1 {\n\tbackground: transparent url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") top left no-repeat; \n\tposition: absolute; \n\ttop: 40px; \n\tright: 0; \n\twidth: 148px; \n\theight: 110px;\n\t}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA,uCAAuC;AACvC,qGAAqG;;AAErG,iDAAiD;AACjD,8GAA8G;AAC9G,yGAAyG;;AAEzG,yGAAyG;;AAEzG;CACC,sBAAsB;CACtB,2BAA2B;AAC5B;;AAEA,mBAAmB;AACnB;CACC,SAAS;CACT,UAAU;CACV;AACD;CACC,6BAA6B;CAC7B,oBAAoB;CACpB,cAAc;CACd,+EAA6D;CAC7D,SAAS;CACT,UAAU;CACV;AACD;CACC,aAAa;CACb,mBAAmB;CACnB;AACD;CACC,6CAA6C;CAC7C,mBAAmB;CACnB,gBAAgB;CAChB,cAAc;CACd;AACD;CACC,iBAAiB;CACjB,qBAAqB;CACrB,cAAc;CACd;AACD;CACC,iBAAiB;CACjB,qBAAqB;CACrB,cAAc;CACd;AACD;CACC,0BAA0B;CAC1B,cAAc;CACd;AACD;CACC,mBAAmB;CACnB;;;AAGD,kBAAkB;AAClB;CACC,sEAAkD;CAClD,wBAAwB;CACxB,SAAS;CACT,kBAAkB;CAClB;;AAED;CACC,gBAAgB;CAChB,WAAW;CACX;;AAED;CACC,kFAA0D;CAC1D,gBAAgB;CAChB,cAAc;CACd,YAAY;CACZ,YAAY;CACZ,WAAW;;CAEX,iBAAiB;CACjB,mBAAmB;CACnB,gBAAgB;CAChB;AACD;CACC,kFAA0D;CAC1D,gBAAgB;CAChB,mBAAmB;CACnB,YAAY;CACZ,YAAY;CACZ,YAAY;;CAEZ,iBAAiB;CACjB,mBAAmB;CACnB,gBAAgB;CAChB;AACD;CACC,iBAAiB;CACjB,YAAY;AACb;;AAEA;CACC,WAAW;CACX,2BAA2B;CAC3B,YAAY;CACZ,WAAW;CACX;AACD;CACC,8BAA8B;CAC9B,kBAAkB;CAClB;;AAED;CACC,YAAY;CACZ,wBAAwB;CACxB;AACD;CACC,kBAAkB;CAClB,mBAAmB;CACnB;;AAED;CACC,kBAAkB;CAClB;AACD;CACC,kBAAkB;CAClB;;AAED;CACC,kBAAkB;CAClB,kBAAkB;CAClB,MAAM;CACN,QAAQ;CACR;AACD;CACC,8BAA8B;CAC9B,iFAA+D;CAC/D,aAAa;CACb,iBAAiB;CACjB,YAAY;CACZ;AACD;CACC,kFAA0D;CAC1D,oBAAoB;CACpB,WAAW;CACX,YAAY;;CAEZ,iBAAiB;CACjB,mBAAmB;CACnB,gBAAgB;CAChB;AACD;CACC,kFAA0D;CAC1D,oBAAoB;CACpB,UAAU;CACV,YAAY;;CAEZ,iBAAiB;CACjB,mBAAmB;CACnB,gBAAgB;CAChB;AACD;CACC,kFAA0D;CAC1D,oBAAoB;CACpB,UAAU;CACV,YAAY;;CAEZ,iBAAiB;CACjB,mBAAmB;CACnB,gBAAgB;CAChB;;;AAGD;CACC,SAAS;CACT,UAAU;CACV;AACD;CACC,kBAAkB;CAClB,oFAA6D;CAC7D,cAAc;CACd,gBAAgB;CAChB,kBAAkB;CAClB,qBAAqB;CACrB;AACD;CACC,cAAc;CACd;AACD;CACC,cAAc;CACd;;;AAGD;CACC,kFAA2D;CAC3D,kBAAkB;CAClB,SAAS;CACT,QAAQ;CACR,YAAY;CACZ,aAAa;CACb","sourcesContent":["/* css Zen Garden default style v1.02 */\n/* css released under Creative Commons License - http://creativecommons.org/licenses/by-nc-sa/1.0/  */\n\n/* This file based on 'Tranquille' by Dave Shea */\n/* You may use this file as a foundation for any new work, but you may find it easier to start from scratch. */\n/* Not all elements are defined in this file, so you'll most likely want to refer to the xhtml as well. */\n\n/* Your images should be linked as if the CSS file sits in the same folder as the images. ie. no paths. */\n\n.finded {\n\toutline: solid red 5px;\n\tbackground-color: lightblue;\n}\n\n/* basic elements */\nhtml {\n\tmargin: 0;\n\tpadding: 0;\n\t}\nbody { \n\tfont: 75% georgia, sans-serif;\n\tline-height: 1.88889;\n\tcolor: #555753; \n\tbackground: #fff url('./blossoms.jpg') no-repeat bottom right; \n\tmargin: 0; \n\tpadding: 0;\n\t}\np { \n\tmargin-top: 0; \n\ttext-align: justify;\n\t}\nh3 { \n\tfont: italic normal 1.4em georgia, sans-serif;\n\tletter-spacing: 1px; \n\tmargin-bottom: 0; \n\tcolor: #7D775C;\n\t}\na:link { \n\tfont-weight: bold; \n\ttext-decoration: none; \n\tcolor: #B7A5DF;\n\t}\na:visited { \n\tfont-weight: bold; \n\ttext-decoration: none; \n\tcolor: #D4CDDC;\n\t}\na:hover, a:focus, a:active { \n\ttext-decoration: underline; \n\tcolor: #9685BA;\n\t}\nabbr {\n\tborder-bottom: none;\n\t}\n\n\n/* specific divs */\n.page-wrapper { \n\tbackground: url('./zen-bg.jpg') no-repeat top left; \n\tpadding: 0 175px 0 110px;  \n\tmargin: 0; \n\tposition: relative;\n\t}\n\n.intro { \n\tmin-width: 470px;\n\twidth: 100%;\n\t}\n\nheader h1 { \n\tbackground: transparent url('./h1.gif') no-repeat top left;\n\tmargin-top: 10px;\n\tdisplay: block;\n\twidth: 219px;\n\theight: 87px;\n\tfloat: left;\n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\nheader h2 { \n\tbackground: transparent url('./h2.gif') no-repeat top left; \n\tmargin-top: 58px; \n\tmargin-bottom: 40px; \n\twidth: 200px; \n\theight: 18px; \n\tfloat: right;\n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\nheader {\n\tpadding-top: 20px;\n\theight: 87px;\n}\n\n.summary {\n\tclear: both; \n\tmargin: 20px 20px 20px 10px; \n\twidth: 160px; \n\tfloat: left;\n\t}\n.summary p {\n\tfont: italic 1.1em/2.2 georgia; \n\ttext-align: center;\n\t}\n\n.preamble {\n\tclear: right; \n\tpadding: 0px 10px 0 10px;\n\t}\n.supporting {\t\n\tpadding-left: 10px; \n\tmargin-bottom: 40px;\n\t}\n\nfooter { \n\ttext-align: center; \n\t}\nfooter a:link, footer a:visited { \n\tmargin-right: 20px; \n\t}\n\n.sidebar {\n\tmargin-left: 600px; \n\tposition: absolute; \n\ttop: 0; \n\tright: 0;\n\t}\n.sidebar .wrapper { \n\tfont: 10px verdana, sans-serif; \n\tbackground: transparent url('./paper-bg.jpg') top left repeat-y; \n\tpadding: 10px; \n\tmargin-top: 150px; \n\twidth: 130px; \n\t}\n.sidebar h3.select { \n\tbackground: transparent url('./h3.gif') no-repeat top left; \n\tmargin: 10px 0 5px 0; \n\twidth: 97px; \n\theight: 16px; \n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\n.sidebar h3.archives { \n\tbackground: transparent url('./h5.gif') no-repeat top left; \n\tmargin: 25px 0 5px 0; \n\twidth:57px; \n\theight: 14px; \n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\n.sidebar h3.resources { \n\tbackground: transparent url('./h6.gif') no-repeat top left; \n\tmargin: 25px 0 5px 0; \n\twidth:63px; \n\theight: 10px; \n\n\ttext-indent: 100%;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\t}\n\n\n.sidebar ul {\n\tmargin: 0;\n\tpadding: 0;\n\t}\n.sidebar li {\n\tline-height: 1.3em; \n\tbackground: transparent url('./cr1.gif') no-repeat top center; \n\tdisplay: block; \n\tpadding-top: 5px; \n\tmargin-bottom: 5px;\n\tlist-style-type: none;\n\t}\n.sidebar li a:link {\n\tcolor: #988F5E;\n\t}\n.sidebar li a:visited {\n\tcolor: #B3AE94;\n\t}\n\n\n.extra1 {\n\tbackground: transparent url('./cr2.gif') top left no-repeat; \n\tposition: absolute; \n\ttop: 40px; \n\tright: 0; \n\twidth: 148px; \n\theight: 110px;\n\t}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/panel.css":
/*!***********************!*\
  !*** ./src/panel.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_panel_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./panel.css */ "./node_modules/css-loader/dist/cjs.js!./src/panel.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_panel_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_panel_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_panel_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_panel_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/blossoms.jpg":
/*!**************************!*\
  !*** ./src/blossoms.jpg ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "750411b276ca40c44b10.jpg";

/***/ }),

/***/ "./src/cr1.gif":
/*!*********************!*\
  !*** ./src/cr1.gif ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "decbf50b008cdec59b4b.gif";

/***/ }),

/***/ "./src/cr2.gif":
/*!*********************!*\
  !*** ./src/cr2.gif ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f5e62c5c5eaecd19fe96.gif";

/***/ }),

/***/ "./src/h1.gif":
/*!********************!*\
  !*** ./src/h1.gif ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "176dfdd8eb1a194b3321.gif";

/***/ }),

/***/ "./src/h2.gif":
/*!********************!*\
  !*** ./src/h2.gif ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1ca2918521c6baf2c8bf.gif";

/***/ }),

/***/ "./src/h3.gif":
/*!********************!*\
  !*** ./src/h3.gif ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c772f0974da618cba261.gif";

/***/ }),

/***/ "./src/h5.gif":
/*!********************!*\
  !*** ./src/h5.gif ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1964430f38cfc6953873.gif";

/***/ }),

/***/ "./src/h6.gif":
/*!********************!*\
  !*** ./src/h6.gif ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fd416ed74fe4ea73537c.gif";

/***/ }),

/***/ "./src/paper-bg.jpg":
/*!**************************!*\
  !*** ./src/paper-bg.jpg ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7e62c3fe5e7f2d7ee164.jpg";

/***/ }),

/***/ "./src/zen-bg.jpg":
/*!************************!*\
  !*** ./src/zen-bg.jpg ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e124fce5cb4731c7caaf.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _seach_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./seach/index */ "./src/seach/index.js");
/* harmony import */ var _panel_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel.css */ "./src/panel.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



const elements = {
  seachField: document.querySelector('input.selector'),
  selectorFind: document.querySelector('button.selector-find'),
  selectorNext: document.querySelector('button.selector-next'),
  selectorPrev: document.querySelector('button.selector-prev'),
  navigationTop: document.querySelector('button.nav-top'),
  navigationBottom: document.querySelector('button.nav-bottom'),
  navigationLeft: document.querySelector('button.nav-left'),
  navigationRight: document.querySelector('button.nav-right')
};
const view = _seach_index__WEBPACK_IMPORTED_MODULE_0__.View(elements);
const seach = _seach_index__WEBPACK_IMPORTED_MODULE_0__.Seach(view);
const control = _seach_index__WEBPACK_IMPORTED_MODULE_0__.SeachControler(elements, seach);
control.setController();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU1FLE9BQU8sR0FBR0osd0RBQUEsQ0FBcUJ2QixRQUFyQixFQUErQjBCLEtBQS9CLENBQWhCO0FBRUFDLE9BQU8sQ0FBQzNELGFBQVIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2Nzc3puLy4vc3JjL3NlYWNoL2NvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vY3Nzem4vLi9zcmMvc2VhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY3Nzem4vLi9zcmMvc2VhY2gvc2VhY2guanMiLCJ3ZWJwYWNrOi8vY3Nzem4vLi9zcmMvc2VhY2gvdmlldy5qcyIsIndlYnBhY2s6Ly9jc3N6bi8uL3NyYy9wYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vY3Nzem4vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2Nzc3puLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9jc3N6bi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vY3Nzem4vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9jc3N6bi8uL3NyYy9wYW5lbC5jc3M/N2RlMSIsIndlYnBhY2s6Ly9jc3N6bi8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9jc3N6bi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9jc3N6bi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY3Nzem4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY3Nzem4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vY3Nzem4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9jc3N6bi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2Nzc3puL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nzc3puL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nzc3puL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jc3N6bi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nzc3puL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3Nzem4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jc3N6bi93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9jc3N6bi93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jc3N6bi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gU2VhY2hDb250cm9sZXIoRWxlbWVudHMsIFNlYWNoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldENvbnRyb2xsZXIoKXtcclxuICAgICAgICAgICAgRWxlbWVudHMuc2VsZWN0b3JGaW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBFbGVtZW50cy5zZWFjaEZpZWxkLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgU2VhY2guaGFuZGxlU2VsZWN0b3JzKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgRWxlbWVudHMuc2VsZWN0b3JOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgU2VhY2gubmV4dFNlbGVjdG9yKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBFbGVtZW50cy5zZWxlY3RvclByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBTZWFjaC5wcmV2U2VsZWN0b3IoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIEVsZW1lbnRzLm5hdmlnYXRpb25Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBTZWFjaC50b3BTZWxlY3RvcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgRWxlbWVudHMubmF2aWdhdGlvbkJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIFNlYWNoLmJ1dHRvbVNlbGVjdG9yKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBFbGVtZW50cy5uYXZpZ2F0aW9uTGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIFNlYWNoLmxlZnRTZWxlY3RvcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgRWxlbWVudHMubmF2aWdhdGlvblJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgU2VhY2gucmlnaHRTZWxlY3RvcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NlYWNofSBmcm9tICcuL3NlYWNoJztcbmltcG9ydCB7Vmlld30gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7U2VhY2hDb250cm9sZXJ9IGZyb20gJy4vY29udHJvbCc7XG5cbmV4cG9ydCB7U2VhY2gsIFZpZXcsIFNlYWNoQ29udHJvbGVyfTtcbiIsImZ1bmN0aW9uIERPTVRyZWUgKGN1cnJlbnQsIFZpZXcpIHtcclxuICAgIFxyXG4gICAgY29uc3QgcGFyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgY29uc3QgY2hpbGQgPSBjdXJyZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgY29uc3QgcHNpYmxpbmcgPSBjdXJyZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICBjb25zdCBuc2libGluZyA9IGN1cnJlbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgXHJcbiAgICBWaWV3Lm5hdmlnYXRpb25Ub3AocGFyZW50ID8gZmFsc2UgOiB0cnVlKTtcclxuICAgIFZpZXcubmF2aWdhdGlvbkJvdHRvbShjaGlsZCA/IGZhbHNlIDogdHJ1ZSk7XHJcbiAgICBWaWV3Lm5hdmlnYXRpb25MZWZ0KHBzaWJsaW5nID8gZmFsc2UgOiB0cnVlKTtcclxuICAgIFZpZXcubmF2aWdhdGlvblJpZ2h0KG5zaWJsaW5nID8gZmFsc2UgOiB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHBhcmVudDogcGFyZW50LFxyXG4gICAgICAgIGNoaWxkOiBjaGlsZCxcclxuICAgICAgICBwc2libGluZzogcHNpYmxpbmcsXHJcbiAgICAgICAgbnNpYmxpbmc6IG5zaWJsaW5nLFxyXG5cclxuICAgICAgICBhZGRDbGFzcygpe1xyXG4gICAgICAgICAgICBWaWV3LmFkZENsYXNzVG9TZWxlY3RvcihjdXJyZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIGVsZW1lbnRzKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICBWaWV3LnJlbW92ZUNsYXNzRnJvbVNlbGVjdG9yKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERPTVRyZWUodGhpc1tlbGVtZW50XSwgVmlldyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3MoKXtcclxuICAgICAgICAgICAgVmlldy5yZW1vdmVDbGFzc0Zyb21TZWxlY3RvcihjdXJyZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgfTsgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNlbGVjdG9ycyhWaWV3KXtcclxuICAgIGxldCBwb3NpdGlvbiA9IDA7XHJcbiAgICBsZXQgc2VsZWN0b3JzID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYnV0dG9ucygpe1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBzZWxlY3RvcnMubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAobGVuZ3RoICYmIHBvc2l0aW9uICE9IGxlbmd0aCAtIDEpe1xyXG4gICAgICAgICAgICBWaWV3LnNlbGVjdG9yTmV4dChmYWxzZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFZpZXcuc2VsZWN0b3JOZXh0KHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAocG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgVmlldy5zZWxlY3RvclByZXYoZmFsc2UpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBWaWV3LnNlbGVjdG9yUHJldih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXdSZXF1ZXN0KHJlcXVlc3Qpe1xyXG4gICAgICAgICAgICBpZihyZXF1ZXN0KXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFZpZXcuYWRkQ2xhc3NUb1NlbGVjdG9yKHNlbGVjdG9yc1twb3NpdGlvbl0pO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9ucygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5leHQoKXtcclxuICAgICAgICAgICAgbGV0IHByZXYgPSBzZWxlY3RvcnNbcG9zaXRpb25dO1xyXG4gICAgICAgICAgICBWaWV3LnJlbW92ZUNsYXNzRnJvbVNlbGVjdG9yKHByZXYpO1xyXG5cclxuICAgICAgICAgICAgcG9zaXRpb24gKz0gMTtcclxuICAgICAgICAgICAgbGV0IGN1cnIgPSBzZWxlY3RvcnNbcG9zaXRpb25dO1xyXG5cclxuICAgICAgICAgICAgVmlldy5hZGRDbGFzc1RvU2VsZWN0b3IoY3Vycik7XHJcblxyXG4gICAgICAgICAgICBidXR0b25zKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJldigpe1xyXG4gICAgICAgICAgICBsZXQgcHJldiA9IHNlbGVjdG9yc1twb3NpdGlvbl07XHJcbiAgICAgICAgICAgIFZpZXcucmVtb3ZlQ2xhc3NGcm9tU2VsZWN0b3IocHJldik7XHJcblxyXG4gICAgICAgICAgICBwb3NpdGlvbiAtPSAxO1xyXG4gICAgICAgICAgICBsZXQgY3VyciA9IHNlbGVjdG9yc1twb3NpdGlvbl07XHJcblxyXG4gICAgICAgICAgICBWaWV3LmFkZENsYXNzVG9TZWxlY3RvcihjdXJyKTtcclxuXHJcbiAgICAgICAgICAgIGJ1dHRvbnMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRET00oKXtcclxuICAgICAgICAgICAgaWYoc2VsZWN0b3JzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERPTVRyZWUoc2VsZWN0b3JzW3Bvc2l0aW9uXSwgVmlldyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0dXJuT2ZmQnV0dG9ucygpe1xyXG4gICAgICAgICAgICBWaWV3LnNlbGVjdG9yUHJldih0cnVlKTtcclxuICAgICAgICAgICAgVmlldy5zZWxlY3Rvck5leHQodHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3MoKXtcclxuICAgICAgICAgICAgaWYoc2VsZWN0b3JzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBWaWV3LnJlbW92ZUNsYXNzRnJvbVNlbGVjdG9yKHNlbGVjdG9yc1twb3NpdGlvbl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFNlYWNoKFZpZXcpe1xyXG4gICAgXHJcbiAgICBsZXQgc2VsZWN0b3JzO1xyXG4gICAgbGV0IGRvbVRyZWU7XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGhhbmRsZVNlbGVjdG9ycyhyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIGlmKHNlbGVjdG9ycyl7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnMucmVtb3ZlQ2xhc3MoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZG9tVHJlZSl7XHJcbiAgICAgICAgICAgICAgICBkb21UcmVlLnJlbW92ZUNsYXNzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGVjdG9ycyA9IG5ldyBTZWxlY3RvcnMoVmlldyk7XHJcbiAgICAgICAgICAgIHNlbGVjdG9ycy5uZXdSZXF1ZXN0KHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgZG9tVHJlZSA9IHNlbGVjdG9ycy5nZXRET00oKTsgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuZXh0U2VsZWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9ycy5uZXh0KCk7XHJcbiAgICAgICAgICAgIGRvbVRyZWUgPSBzZWxlY3RvcnMuZ2V0RE9NKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJldlNlbGVjdG9yKCkge1xyXG4gICAgICAgICAgICBzZWxlY3RvcnMucHJldigpO1xyXG4gICAgICAgICAgICBkb21UcmVlID0gc2VsZWN0b3JzLmdldERPTSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRvcFNlbGVjdG9yKCkgeyBcclxuICAgICAgICAgICAgc2VsZWN0b3JzLnR1cm5PZmZCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIGRvbVRyZWUgPSBkb21UcmVlLmVsZW1lbnRzKCdwYXJlbnQnKTtcclxuICAgICAgICAgICAgZG9tVHJlZS5hZGRDbGFzcygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJ1dHRvbVNlbGVjdG9yKCkgeyBcclxuICAgICAgICAgICAgc2VsZWN0b3JzLnR1cm5PZmZCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIGRvbVRyZWUgPSBkb21UcmVlLmVsZW1lbnRzKCdjaGlsZCcpO1xyXG4gICAgICAgICAgICBkb21UcmVlLmFkZENsYXNzKCk7ICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsZWZ0U2VsZWN0b3IoKSB7IFxyXG4gICAgICAgICAgICBzZWxlY3RvcnMudHVybk9mZkJ1dHRvbnMoKTtcclxuICAgICAgICAgICAgZG9tVHJlZSA9IGRvbVRyZWUuZWxlbWVudHMoJ3BzaWJsaW5nJyk7XHJcbiAgICAgICAgICAgIGRvbVRyZWUuYWRkQ2xhc3MoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByaWdodFNlbGVjdG9yKCl7XHJcbiAgICAgICAgICAgIHNlbGVjdG9ycy50dXJuT2ZmQnV0dG9ucygpO1xyXG4gICAgICAgICAgICBkb21UcmVlID0gZG9tVHJlZS5lbGVtZW50cygnbnNpYmxpbmcnKTtcclxuICAgICAgICAgICAgZG9tVHJlZS5hZGRDbGFzcygpOyAgICBcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIFZpZXcoRWxlbWVudHMpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRDbGFzc1RvU2VsZWN0b3Ioc2VsZWN0b3Ipe1xyXG4gICAgICAgICAgICBzZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdmaW5kZWQnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW1vdmVDbGFzc0Zyb21TZWxlY3RvcihzZWxlY3Rvcil7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbmRlZCcpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbGVjdG9yTmV4dChkaXNhYmxlZCl7XHJcbiAgICAgICAgICAgIEVsZW1lbnRzLnNlbGVjdG9yTmV4dC5kaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbGVjdG9yUHJldihkaXNhYmxlZCl7XHJcbiAgICAgICAgICAgIEVsZW1lbnRzLnNlbGVjdG9yUHJldi5kaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgbmF2aWdhdGlvblRvcChkaXNhYmxlZCl7XHJcbiAgICAgICAgICAgIEVsZW1lbnRzLm5hdmlnYXRpb25Ub3AuZGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuYXZpZ2F0aW9uQm90dG9tKGRpc2FibGVkKXtcclxuICAgICAgICAgICAgRWxlbWVudHMubmF2aWdhdGlvbkJvdHRvbS5kaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5hdmlnYXRpb25MZWZ0KGRpc2FibGVkKXtcclxuICAgICAgICAgICAgRWxlbWVudHMubmF2aWdhdGlvbkxlZnQuZGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuYXZpZ2F0aW9uUmlnaHQoZGlzYWJsZWQpe1xyXG4gICAgICAgICAgICBFbGVtZW50cy5uYXZpZ2F0aW9uUmlnaHQuZGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuanNidXJzYS1wYW5lbCB7XFxuICAgIHotaW5kZXg6IDEwMDA7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgcmlnaHQ6IDI1cHg7XFxuICAgIHRvcDogMjVweDtcXG4gICAgd2lkdGg6IDMwMHB4O1xcbiAgICBib3JkZXI6IHNvbGlkIHJlZCAycHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvcGFuZWwuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7SUFDZixXQUFXO0lBQ1gsU0FBUztJQUNULFlBQVk7SUFDWixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLGFBQWE7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzYnVyc2EtcGFuZWwge1xcbiAgICB6LWluZGV4OiAxMDAwO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHJpZ2h0OiAyNXB4O1xcbiAgICB0b3A6IDI1cHg7XFxuICAgIHdpZHRoOiAzMDBweDtcXG4gICAgYm9yZGVyOiBzb2xpZCByZWQgMnB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgcGFkZGluZzogMTBweDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Jsb3Nzb21zLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vemVuLWJnLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vaDEuZ2lmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9oMi5naWZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL3BhcGVyLWJnLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4vaDMuZ2lmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18gPSBuZXcgVVJMKFwiLi9oNS5naWZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyA9IG5ldyBVUkwoXCIuL2g2LmdpZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF84X19fID0gbmV3IFVSTChcIi4vY3IxLmdpZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fID0gbmV3IFVSTChcIi4vY3IyLmdpZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGNzcyBaZW4gR2FyZGVuIGRlZmF1bHQgc3R5bGUgdjEuMDIgKi9cXG4vKiBjc3MgcmVsZWFzZWQgdW5kZXIgQ3JlYXRpdmUgQ29tbW9ucyBMaWNlbnNlIC0gaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktbmMtc2EvMS4wLyAgKi9cXG5cXG4vKiBUaGlzIGZpbGUgYmFzZWQgb24gJ1RyYW5xdWlsbGUnIGJ5IERhdmUgU2hlYSAqL1xcbi8qIFlvdSBtYXkgdXNlIHRoaXMgZmlsZSBhcyBhIGZvdW5kYXRpb24gZm9yIGFueSBuZXcgd29yaywgYnV0IHlvdSBtYXkgZmluZCBpdCBlYXNpZXIgdG8gc3RhcnQgZnJvbSBzY3JhdGNoLiAqL1xcbi8qIE5vdCBhbGwgZWxlbWVudHMgYXJlIGRlZmluZWQgaW4gdGhpcyBmaWxlLCBzbyB5b3UnbGwgbW9zdCBsaWtlbHkgd2FudCB0byByZWZlciB0byB0aGUgeGh0bWwgYXMgd2VsbC4gKi9cXG5cXG4vKiBZb3VyIGltYWdlcyBzaG91bGQgYmUgbGlua2VkIGFzIGlmIHRoZSBDU1MgZmlsZSBzaXRzIGluIHRoZSBzYW1lIGZvbGRlciBhcyB0aGUgaW1hZ2VzLiBpZS4gbm8gcGF0aHMuICovXFxuXFxuLmZpbmRlZCB7XFxuXFx0b3V0bGluZTogc29saWQgcmVkIDVweDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblxcbi8qIGJhc2ljIGVsZW1lbnRzICovXFxuaHRtbCB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0fVxcbmJvZHkgeyBcXG5cXHRmb250OiA3NSUgZ2VvcmdpYSwgc2Fucy1zZXJpZjtcXG5cXHRsaW5lLWhlaWdodDogMS44ODg4OTtcXG5cXHRjb2xvcjogIzU1NTc1MzsgXFxuXFx0YmFja2dyb3VuZDogI2ZmZiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIG5vLXJlcGVhdCBib3R0b20gcmlnaHQ7IFxcblxcdG1hcmdpbjogMDsgXFxuXFx0cGFkZGluZzogMDtcXG5cXHR9XFxucCB7IFxcblxcdG1hcmdpbi10b3A6IDA7IFxcblxcdHRleHQtYWxpZ246IGp1c3RpZnk7XFxuXFx0fVxcbmgzIHsgXFxuXFx0Zm9udDogaXRhbGljIG5vcm1hbCAxLjRlbSBnZW9yZ2lhLCBzYW5zLXNlcmlmO1xcblxcdGxldHRlci1zcGFjaW5nOiAxcHg7IFxcblxcdG1hcmdpbi1ib3R0b206IDA7IFxcblxcdGNvbG9yOiAjN0Q3NzVDO1xcblxcdH1cXG5hOmxpbmsgeyBcXG5cXHRmb250LXdlaWdodDogYm9sZDsgXFxuXFx0dGV4dC1kZWNvcmF0aW9uOiBub25lOyBcXG5cXHRjb2xvcjogI0I3QTVERjtcXG5cXHR9XFxuYTp2aXNpdGVkIHsgXFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7IFxcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTsgXFxuXFx0Y29sb3I6ICNENENEREM7XFxuXFx0fVxcbmE6aG92ZXIsIGE6Zm9jdXMsIGE6YWN0aXZlIHsgXFxuXFx0dGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IFxcblxcdGNvbG9yOiAjOTY4NUJBO1xcblxcdH1cXG5hYmJyIHtcXG5cXHRib3JkZXItYm90dG9tOiBub25lO1xcblxcdH1cXG5cXG5cXG4vKiBzcGVjaWZpYyBkaXZzICovXFxuLnBhZ2Utd3JhcHBlciB7IFxcblxcdGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgbm8tcmVwZWF0IHRvcCBsZWZ0OyBcXG5cXHRwYWRkaW5nOiAwIDE3NXB4IDAgMTEwcHg7ICBcXG5cXHRtYXJnaW46IDA7IFxcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHR9XFxuXFxuLmludHJvIHsgXFxuXFx0bWluLXdpZHRoOiA0NzBweDtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHR9XFxuXFxuaGVhZGVyIGgxIHsgXFxuXFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKSBuby1yZXBlYXQgdG9wIGxlZnQ7XFxuXFx0bWFyZ2luLXRvcDogMTBweDtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHR3aWR0aDogMjE5cHg7XFxuXFx0aGVpZ2h0OiA4N3B4O1xcblxcdGZsb2F0OiBsZWZ0O1xcblxcblxcdHRleHQtaW5kZW50OiAxMDAlO1xcblxcdHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuXFx0b3ZlcmZsb3c6IGhpZGRlbjtcXG5cXHR9XFxuaGVhZGVyIGgyIHsgXFxuXFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKSBuby1yZXBlYXQgdG9wIGxlZnQ7IFxcblxcdG1hcmdpbi10b3A6IDU4cHg7IFxcblxcdG1hcmdpbi1ib3R0b206IDQwcHg7IFxcblxcdHdpZHRoOiAyMDBweDsgXFxuXFx0aGVpZ2h0OiAxOHB4OyBcXG5cXHRmbG9hdDogcmlnaHQ7XFxuXFxuXFx0dGV4dC1pbmRlbnQ6IDEwMCU7XFxuXFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcXG5cXHRvdmVyZmxvdzogaGlkZGVuO1xcblxcdH1cXG5oZWFkZXIge1xcblxcdHBhZGRpbmctdG9wOiAyMHB4O1xcblxcdGhlaWdodDogODdweDtcXG59XFxuXFxuLnN1bW1hcnkge1xcblxcdGNsZWFyOiBib3RoOyBcXG5cXHRtYXJnaW46IDIwcHggMjBweCAyMHB4IDEwcHg7IFxcblxcdHdpZHRoOiAxNjBweDsgXFxuXFx0ZmxvYXQ6IGxlZnQ7XFxuXFx0fVxcbi5zdW1tYXJ5IHAge1xcblxcdGZvbnQ6IGl0YWxpYyAxLjFlbS8yLjIgZ2VvcmdpYTsgXFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdH1cXG5cXG4ucHJlYW1ibGUge1xcblxcdGNsZWFyOiByaWdodDsgXFxuXFx0cGFkZGluZzogMHB4IDEwcHggMCAxMHB4O1xcblxcdH1cXG4uc3VwcG9ydGluZyB7XFx0XFxuXFx0cGFkZGluZy1sZWZ0OiAxMHB4OyBcXG5cXHRtYXJnaW4tYm90dG9tOiA0MHB4O1xcblxcdH1cXG5cXG5mb290ZXIgeyBcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7IFxcblxcdH1cXG5mb290ZXIgYTpsaW5rLCBmb290ZXIgYTp2aXNpdGVkIHsgXFxuXFx0bWFyZ2luLXJpZ2h0OiAyMHB4OyBcXG5cXHR9XFxuXFxuLnNpZGViYXIge1xcblxcdG1hcmdpbi1sZWZ0OiA2MDBweDsgXFxuXFx0cG9zaXRpb246IGFic29sdXRlOyBcXG5cXHR0b3A6IDA7IFxcblxcdHJpZ2h0OiAwO1xcblxcdH1cXG4uc2lkZWJhciAud3JhcHBlciB7IFxcblxcdGZvbnQ6IDEwcHggdmVyZGFuYSwgc2Fucy1zZXJpZjsgXFxuXFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyArIFwiKSB0b3AgbGVmdCByZXBlYXQteTsgXFxuXFx0cGFkZGluZzogMTBweDsgXFxuXFx0bWFyZ2luLXRvcDogMTUwcHg7IFxcblxcdHdpZHRoOiAxMzBweDsgXFxuXFx0fVxcbi5zaWRlYmFyIGgzLnNlbGVjdCB7IFxcblxcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gKyBcIikgbm8tcmVwZWF0IHRvcCBsZWZ0OyBcXG5cXHRtYXJnaW46IDEwcHggMCA1cHggMDsgXFxuXFx0d2lkdGg6IDk3cHg7IFxcblxcdGhlaWdodDogMTZweDsgXFxuXFxuXFx0dGV4dC1pbmRlbnQ6IDEwMCU7XFxuXFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcXG5cXHRvdmVyZmxvdzogaGlkZGVuO1xcblxcdH1cXG4uc2lkZWJhciBoMy5hcmNoaXZlcyB7IFxcblxcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gKyBcIikgbm8tcmVwZWF0IHRvcCBsZWZ0OyBcXG5cXHRtYXJnaW46IDI1cHggMCA1cHggMDsgXFxuXFx0d2lkdGg6NTdweDsgXFxuXFx0aGVpZ2h0OiAxNHB4OyBcXG5cXG5cXHR0ZXh0LWluZGVudDogMTAwJTtcXG5cXHR3aGl0ZS1zcGFjZTogbm93cmFwO1xcblxcdG92ZXJmbG93OiBoaWRkZW47XFxuXFx0fVxcbi5zaWRlYmFyIGgzLnJlc291cmNlcyB7IFxcblxcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gKyBcIikgbm8tcmVwZWF0IHRvcCBsZWZ0OyBcXG5cXHRtYXJnaW46IDI1cHggMCA1cHggMDsgXFxuXFx0d2lkdGg6NjNweDsgXFxuXFx0aGVpZ2h0OiAxMHB4OyBcXG5cXG5cXHR0ZXh0LWluZGVudDogMTAwJTtcXG5cXHR3aGl0ZS1zcGFjZTogbm93cmFwO1xcblxcdG92ZXJmbG93OiBoaWRkZW47XFxuXFx0fVxcblxcblxcbi5zaWRlYmFyIHVsIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHR9XFxuLnNpZGViYXIgbGkge1xcblxcdGxpbmUtaGVpZ2h0OiAxLjNlbTsgXFxuXFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyArIFwiKSBuby1yZXBlYXQgdG9wIGNlbnRlcjsgXFxuXFx0ZGlzcGxheTogYmxvY2s7IFxcblxcdHBhZGRpbmctdG9wOiA1cHg7IFxcblxcdG1hcmdpbi1ib3R0b206IDVweDtcXG5cXHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuXFx0fVxcbi5zaWRlYmFyIGxpIGE6bGluayB7XFxuXFx0Y29sb3I6ICM5ODhGNUU7XFxuXFx0fVxcbi5zaWRlYmFyIGxpIGE6dmlzaXRlZCB7XFxuXFx0Y29sb3I6ICNCM0FFOTQ7XFxuXFx0fVxcblxcblxcbi5leHRyYTEge1xcblxcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gKyBcIikgdG9wIGxlZnQgbm8tcmVwZWF0OyBcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7IFxcblxcdHRvcDogNDBweDsgXFxuXFx0cmlnaHQ6IDA7IFxcblxcdHdpZHRoOiAxNDhweDsgXFxuXFx0aGVpZ2h0OiAxMTBweDtcXG5cXHR9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSx1Q0FBdUM7QUFDdkMscUdBQXFHOztBQUVyRyxpREFBaUQ7QUFDakQsOEdBQThHO0FBQzlHLHlHQUF5Rzs7QUFFekcseUdBQXlHOztBQUV6RztDQUNDLHNCQUFzQjtDQUN0QiwyQkFBMkI7QUFDNUI7O0FBRUEsbUJBQW1CO0FBQ25CO0NBQ0MsU0FBUztDQUNULFVBQVU7Q0FDVjtBQUNEO0NBQ0MsNkJBQTZCO0NBQzdCLG9CQUFvQjtDQUNwQixjQUFjO0NBQ2QsK0VBQTZEO0NBQzdELFNBQVM7Q0FDVCxVQUFVO0NBQ1Y7QUFDRDtDQUNDLGFBQWE7Q0FDYixtQkFBbUI7Q0FDbkI7QUFDRDtDQUNDLDZDQUE2QztDQUM3QyxtQkFBbUI7Q0FDbkIsZ0JBQWdCO0NBQ2hCLGNBQWM7Q0FDZDtBQUNEO0NBQ0MsaUJBQWlCO0NBQ2pCLHFCQUFxQjtDQUNyQixjQUFjO0NBQ2Q7QUFDRDtDQUNDLGlCQUFpQjtDQUNqQixxQkFBcUI7Q0FDckIsY0FBYztDQUNkO0FBQ0Q7Q0FDQywwQkFBMEI7Q0FDMUIsY0FBYztDQUNkO0FBQ0Q7Q0FDQyxtQkFBbUI7Q0FDbkI7OztBQUdELGtCQUFrQjtBQUNsQjtDQUNDLHNFQUFrRDtDQUNsRCx3QkFBd0I7Q0FDeEIsU0FBUztDQUNULGtCQUFrQjtDQUNsQjs7QUFFRDtDQUNDLGdCQUFnQjtDQUNoQixXQUFXO0NBQ1g7O0FBRUQ7Q0FDQyxrRkFBMEQ7Q0FDMUQsZ0JBQWdCO0NBQ2hCLGNBQWM7Q0FDZCxZQUFZO0NBQ1osWUFBWTtDQUNaLFdBQVc7O0NBRVgsaUJBQWlCO0NBQ2pCLG1CQUFtQjtDQUNuQixnQkFBZ0I7Q0FDaEI7QUFDRDtDQUNDLGtGQUEwRDtDQUMxRCxnQkFBZ0I7Q0FDaEIsbUJBQW1CO0NBQ25CLFlBQVk7Q0FDWixZQUFZO0NBQ1osWUFBWTs7Q0FFWixpQkFBaUI7Q0FDakIsbUJBQW1CO0NBQ25CLGdCQUFnQjtDQUNoQjtBQUNEO0NBQ0MsaUJBQWlCO0NBQ2pCLFlBQVk7QUFDYjs7QUFFQTtDQUNDLFdBQVc7Q0FDWCwyQkFBMkI7Q0FDM0IsWUFBWTtDQUNaLFdBQVc7Q0FDWDtBQUNEO0NBQ0MsOEJBQThCO0NBQzlCLGtCQUFrQjtDQUNsQjs7QUFFRDtDQUNDLFlBQVk7Q0FDWix3QkFBd0I7Q0FDeEI7QUFDRDtDQUNDLGtCQUFrQjtDQUNsQixtQkFBbUI7Q0FDbkI7O0FBRUQ7Q0FDQyxrQkFBa0I7Q0FDbEI7QUFDRDtDQUNDLGtCQUFrQjtDQUNsQjs7QUFFRDtDQUNDLGtCQUFrQjtDQUNsQixrQkFBa0I7Q0FDbEIsTUFBTTtDQUNOLFFBQVE7Q0FDUjtBQUNEO0NBQ0MsOEJBQThCO0NBQzlCLGlGQUErRDtDQUMvRCxhQUFhO0NBQ2IsaUJBQWlCO0NBQ2pCLFlBQVk7Q0FDWjtBQUNEO0NBQ0Msa0ZBQTBEO0NBQzFELG9CQUFvQjtDQUNwQixXQUFXO0NBQ1gsWUFBWTs7Q0FFWixpQkFBaUI7Q0FDakIsbUJBQW1CO0NBQ25CLGdCQUFnQjtDQUNoQjtBQUNEO0NBQ0Msa0ZBQTBEO0NBQzFELG9CQUFvQjtDQUNwQixVQUFVO0NBQ1YsWUFBWTs7Q0FFWixpQkFBaUI7Q0FDakIsbUJBQW1CO0NBQ25CLGdCQUFnQjtDQUNoQjtBQUNEO0NBQ0Msa0ZBQTBEO0NBQzFELG9CQUFvQjtDQUNwQixVQUFVO0NBQ1YsWUFBWTs7Q0FFWixpQkFBaUI7Q0FDakIsbUJBQW1CO0NBQ25CLGdCQUFnQjtDQUNoQjs7O0FBR0Q7Q0FDQyxTQUFTO0NBQ1QsVUFBVTtDQUNWO0FBQ0Q7Q0FDQyxrQkFBa0I7Q0FDbEIsb0ZBQTZEO0NBQzdELGNBQWM7Q0FDZCxnQkFBZ0I7Q0FDaEIsa0JBQWtCO0NBQ2xCLHFCQUFxQjtDQUNyQjtBQUNEO0NBQ0MsY0FBYztDQUNkO0FBQ0Q7Q0FDQyxjQUFjO0NBQ2Q7OztBQUdEO0NBQ0Msa0ZBQTJEO0NBQzNELGtCQUFrQjtDQUNsQixTQUFTO0NBQ1QsUUFBUTtDQUNSLFlBQVk7Q0FDWixhQUFhO0NBQ2JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogY3NzIFplbiBHYXJkZW4gZGVmYXVsdCBzdHlsZSB2MS4wMiAqL1xcbi8qIGNzcyByZWxlYXNlZCB1bmRlciBDcmVhdGl2ZSBDb21tb25zIExpY2Vuc2UgLSBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1uYy1zYS8xLjAvICAqL1xcblxcbi8qIFRoaXMgZmlsZSBiYXNlZCBvbiAnVHJhbnF1aWxsZScgYnkgRGF2ZSBTaGVhICovXFxuLyogWW91IG1heSB1c2UgdGhpcyBmaWxlIGFzIGEgZm91bmRhdGlvbiBmb3IgYW55IG5ldyB3b3JrLCBidXQgeW91IG1heSBmaW5kIGl0IGVhc2llciB0byBzdGFydCBmcm9tIHNjcmF0Y2guICovXFxuLyogTm90IGFsbCBlbGVtZW50cyBhcmUgZGVmaW5lZCBpbiB0aGlzIGZpbGUsIHNvIHlvdSdsbCBtb3N0IGxpa2VseSB3YW50IHRvIHJlZmVyIHRvIHRoZSB4aHRtbCBhcyB3ZWxsLiAqL1xcblxcbi8qIFlvdXIgaW1hZ2VzIHNob3VsZCBiZSBsaW5rZWQgYXMgaWYgdGhlIENTUyBmaWxlIHNpdHMgaW4gdGhlIHNhbWUgZm9sZGVyIGFzIHRoZSBpbWFnZXMuIGllLiBubyBwYXRocy4gKi9cXG5cXG4uZmluZGVkIHtcXG5cXHRvdXRsaW5lOiBzb2xpZCByZWQgNXB4O1xcblxcdGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG59XFxuXFxuLyogYmFzaWMgZWxlbWVudHMgKi9cXG5odG1sIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHR9XFxuYm9keSB7IFxcblxcdGZvbnQ6IDc1JSBnZW9yZ2lhLCBzYW5zLXNlcmlmO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjg4ODg5O1xcblxcdGNvbG9yOiAjNTU1NzUzOyBcXG5cXHRiYWNrZ3JvdW5kOiAjZmZmIHVybCgnLi9ibG9zc29tcy5qcGcnKSBuby1yZXBlYXQgYm90dG9tIHJpZ2h0OyBcXG5cXHRtYXJnaW46IDA7IFxcblxcdHBhZGRpbmc6IDA7XFxuXFx0fVxcbnAgeyBcXG5cXHRtYXJnaW4tdG9wOiAwOyBcXG5cXHR0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcblxcdH1cXG5oMyB7IFxcblxcdGZvbnQ6IGl0YWxpYyBub3JtYWwgMS40ZW0gZ2VvcmdpYSwgc2Fucy1zZXJpZjtcXG5cXHRsZXR0ZXItc3BhY2luZzogMXB4OyBcXG5cXHRtYXJnaW4tYm90dG9tOiAwOyBcXG5cXHRjb2xvcjogIzdENzc1QztcXG5cXHR9XFxuYTpsaW5rIHsgXFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7IFxcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTsgXFxuXFx0Y29sb3I6ICNCN0E1REY7XFxuXFx0fVxcbmE6dmlzaXRlZCB7IFxcblxcdGZvbnQtd2VpZ2h0OiBib2xkOyBcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7IFxcblxcdGNvbG9yOiAjRDRDRERDO1xcblxcdH1cXG5hOmhvdmVyLCBhOmZvY3VzLCBhOmFjdGl2ZSB7IFxcblxcdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyBcXG5cXHRjb2xvcjogIzk2ODVCQTtcXG5cXHR9XFxuYWJiciB7XFxuXFx0Ym9yZGVyLWJvdHRvbTogbm9uZTtcXG5cXHR9XFxuXFxuXFxuLyogc3BlY2lmaWMgZGl2cyAqL1xcbi5wYWdlLXdyYXBwZXIgeyBcXG5cXHRiYWNrZ3JvdW5kOiB1cmwoJy4vemVuLWJnLmpwZycpIG5vLXJlcGVhdCB0b3AgbGVmdDsgXFxuXFx0cGFkZGluZzogMCAxNzVweCAwIDExMHB4OyAgXFxuXFx0bWFyZ2luOiAwOyBcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0fVxcblxcbi5pbnRybyB7IFxcblxcdG1pbi13aWR0aDogNDcwcHg7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0fVxcblxcbmhlYWRlciBoMSB7IFxcblxcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnLi9oMS5naWYnKSBuby1yZXBlYXQgdG9wIGxlZnQ7XFxuXFx0bWFyZ2luLXRvcDogMTBweDtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHR3aWR0aDogMjE5cHg7XFxuXFx0aGVpZ2h0OiA4N3B4O1xcblxcdGZsb2F0OiBsZWZ0O1xcblxcblxcdHRleHQtaW5kZW50OiAxMDAlO1xcblxcdHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuXFx0b3ZlcmZsb3c6IGhpZGRlbjtcXG5cXHR9XFxuaGVhZGVyIGgyIHsgXFxuXFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCcuL2gyLmdpZicpIG5vLXJlcGVhdCB0b3AgbGVmdDsgXFxuXFx0bWFyZ2luLXRvcDogNThweDsgXFxuXFx0bWFyZ2luLWJvdHRvbTogNDBweDsgXFxuXFx0d2lkdGg6IDIwMHB4OyBcXG5cXHRoZWlnaHQ6IDE4cHg7IFxcblxcdGZsb2F0OiByaWdodDtcXG5cXG5cXHR0ZXh0LWluZGVudDogMTAwJTtcXG5cXHR3aGl0ZS1zcGFjZTogbm93cmFwO1xcblxcdG92ZXJmbG93OiBoaWRkZW47XFxuXFx0fVxcbmhlYWRlciB7XFxuXFx0cGFkZGluZy10b3A6IDIwcHg7XFxuXFx0aGVpZ2h0OiA4N3B4O1xcbn1cXG5cXG4uc3VtbWFyeSB7XFxuXFx0Y2xlYXI6IGJvdGg7IFxcblxcdG1hcmdpbjogMjBweCAyMHB4IDIwcHggMTBweDsgXFxuXFx0d2lkdGg6IDE2MHB4OyBcXG5cXHRmbG9hdDogbGVmdDtcXG5cXHR9XFxuLnN1bW1hcnkgcCB7XFxuXFx0Zm9udDogaXRhbGljIDEuMWVtLzIuMiBnZW9yZ2lhOyBcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0fVxcblxcbi5wcmVhbWJsZSB7XFxuXFx0Y2xlYXI6IHJpZ2h0OyBcXG5cXHRwYWRkaW5nOiAwcHggMTBweCAwIDEwcHg7XFxuXFx0fVxcbi5zdXBwb3J0aW5nIHtcXHRcXG5cXHRwYWRkaW5nLWxlZnQ6IDEwcHg7IFxcblxcdG1hcmdpbi1ib3R0b206IDQwcHg7XFxuXFx0fVxcblxcbmZvb3RlciB7IFxcblxcdHRleHQtYWxpZ246IGNlbnRlcjsgXFxuXFx0fVxcbmZvb3RlciBhOmxpbmssIGZvb3RlciBhOnZpc2l0ZWQgeyBcXG5cXHRtYXJnaW4tcmlnaHQ6IDIwcHg7IFxcblxcdH1cXG5cXG4uc2lkZWJhciB7XFxuXFx0bWFyZ2luLWxlZnQ6IDYwMHB4OyBcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7IFxcblxcdHRvcDogMDsgXFxuXFx0cmlnaHQ6IDA7XFxuXFx0fVxcbi5zaWRlYmFyIC53cmFwcGVyIHsgXFxuXFx0Zm9udDogMTBweCB2ZXJkYW5hLCBzYW5zLXNlcmlmOyBcXG5cXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJy4vcGFwZXItYmcuanBnJykgdG9wIGxlZnQgcmVwZWF0LXk7IFxcblxcdHBhZGRpbmc6IDEwcHg7IFxcblxcdG1hcmdpbi10b3A6IDE1MHB4OyBcXG5cXHR3aWR0aDogMTMwcHg7IFxcblxcdH1cXG4uc2lkZWJhciBoMy5zZWxlY3QgeyBcXG5cXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJy4vaDMuZ2lmJykgbm8tcmVwZWF0IHRvcCBsZWZ0OyBcXG5cXHRtYXJnaW46IDEwcHggMCA1cHggMDsgXFxuXFx0d2lkdGg6IDk3cHg7IFxcblxcdGhlaWdodDogMTZweDsgXFxuXFxuXFx0dGV4dC1pbmRlbnQ6IDEwMCU7XFxuXFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcXG5cXHRvdmVyZmxvdzogaGlkZGVuO1xcblxcdH1cXG4uc2lkZWJhciBoMy5hcmNoaXZlcyB7IFxcblxcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnLi9oNS5naWYnKSBuby1yZXBlYXQgdG9wIGxlZnQ7IFxcblxcdG1hcmdpbjogMjVweCAwIDVweCAwOyBcXG5cXHR3aWR0aDo1N3B4OyBcXG5cXHRoZWlnaHQ6IDE0cHg7IFxcblxcblxcdHRleHQtaW5kZW50OiAxMDAlO1xcblxcdHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuXFx0b3ZlcmZsb3c6IGhpZGRlbjtcXG5cXHR9XFxuLnNpZGViYXIgaDMucmVzb3VyY2VzIHsgXFxuXFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCcuL2g2LmdpZicpIG5vLXJlcGVhdCB0b3AgbGVmdDsgXFxuXFx0bWFyZ2luOiAyNXB4IDAgNXB4IDA7IFxcblxcdHdpZHRoOjYzcHg7IFxcblxcdGhlaWdodDogMTBweDsgXFxuXFxuXFx0dGV4dC1pbmRlbnQ6IDEwMCU7XFxuXFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcXG5cXHRvdmVyZmxvdzogaGlkZGVuO1xcblxcdH1cXG5cXG5cXG4uc2lkZWJhciB1bCB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0fVxcbi5zaWRlYmFyIGxpIHtcXG5cXHRsaW5lLWhlaWdodDogMS4zZW07IFxcblxcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnLi9jcjEuZ2lmJykgbm8tcmVwZWF0IHRvcCBjZW50ZXI7IFxcblxcdGRpc3BsYXk6IGJsb2NrOyBcXG5cXHRwYWRkaW5nLXRvcDogNXB4OyBcXG5cXHRtYXJnaW4tYm90dG9tOiA1cHg7XFxuXFx0bGlzdC1zdHlsZS10eXBlOiBub25lO1xcblxcdH1cXG4uc2lkZWJhciBsaSBhOmxpbmsge1xcblxcdGNvbG9yOiAjOTg4RjVFO1xcblxcdH1cXG4uc2lkZWJhciBsaSBhOnZpc2l0ZWQge1xcblxcdGNvbG9yOiAjQjNBRTk0O1xcblxcdH1cXG5cXG5cXG4uZXh0cmExIHtcXG5cXHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJy4vY3IyLmdpZicpIHRvcCBsZWZ0IG5vLXJlcGVhdDsgXFxuXFx0cG9zaXRpb246IGFic29sdXRlOyBcXG5cXHR0b3A6IDQwcHg7IFxcblxcdHJpZ2h0OiAwOyBcXG5cXHR3aWR0aDogMTQ4cHg7IFxcblxcdGhlaWdodDogMTEwcHg7XFxuXFx0fVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wYW5lbC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3BhbmVsLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsImltcG9ydCAqIGFzIE1vZGVsIGZyb20gJy4vc2VhY2gvaW5kZXgnXG5pbXBvcnQgJy4vcGFuZWwuY3NzJ1xuaW1wb3J0ICcuL3N0eWxlLmNzcydcblxuY29uc3QgZWxlbWVudHMgPSB7XG4gICAgc2VhY2hGaWVsZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQuc2VsZWN0b3InKSxcbiAgICBzZWxlY3RvckZpbmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5zZWxlY3Rvci1maW5kJyksXG4gICAgc2VsZWN0b3JOZXh0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uc2VsZWN0b3ItbmV4dCcpLFxuICAgIHNlbGVjdG9yUHJldjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnNlbGVjdG9yLXByZXYnKSxcbiAgICBuYXZpZ2F0aW9uVG9wOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ubmF2LXRvcCcpLFxuICAgIG5hdmlnYXRpb25Cb3R0b206IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5uYXYtYm90dG9tJyksXG4gICAgbmF2aWdhdGlvbkxlZnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5uYXYtbGVmdCcpLFxuICAgIG5hdmlnYXRpb25SaWdodDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm5hdi1yaWdodCcpLFxufVxuXG5jb25zdCB2aWV3ID0gTW9kZWwuVmlldyhlbGVtZW50cyk7XG5jb25zdCBzZWFjaCA9IE1vZGVsLlNlYWNoKHZpZXcpO1xuY29uc3QgY29udHJvbCA9IE1vZGVsLlNlYWNoQ29udHJvbGVyKGVsZW1lbnRzLCBzZWFjaCk7XG5cbmNvbnRyb2wuc2V0Q29udHJvbGxlcigpO1xuIl0sIm5hbWVzIjpbIlNlYWNoQ29udHJvbGVyIiwiRWxlbWVudHMiLCJTZWFjaCIsInNldENvbnRyb2xsZXIiLCJzZWxlY3RvckZpbmQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVxdWVzdCIsInNlYWNoRmllbGQiLCJ2YWx1ZSIsImhhbmRsZVNlbGVjdG9ycyIsInNlbGVjdG9yTmV4dCIsIm5leHRTZWxlY3RvciIsInNlbGVjdG9yUHJldiIsInByZXZTZWxlY3RvciIsIm5hdmlnYXRpb25Ub3AiLCJ0b3BTZWxlY3RvciIsIm5hdmlnYXRpb25Cb3R0b20iLCJidXR0b21TZWxlY3RvciIsIm5hdmlnYXRpb25MZWZ0IiwibGVmdFNlbGVjdG9yIiwibmF2aWdhdGlvblJpZ2h0IiwicmlnaHRTZWxlY3RvciIsIlZpZXciLCJET01UcmVlIiwiY3VycmVudCIsInBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJjaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwicHNpYmxpbmciLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibnNpYmxpbmciLCJuZXh0RWxlbWVudFNpYmxpbmciLCJhZGRDbGFzcyIsImFkZENsYXNzVG9TZWxlY3RvciIsImVsZW1lbnRzIiwiZWxlbWVudCIsInJlbW92ZUNsYXNzRnJvbVNlbGVjdG9yIiwicmVtb3ZlQ2xhc3MiLCJTZWxlY3RvcnMiLCJwb3NpdGlvbiIsInNlbGVjdG9ycyIsImJ1dHRvbnMiLCJsZW5ndGgiLCJuZXdSZXF1ZXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibmV4dCIsInByZXYiLCJjdXJyIiwiZ2V0RE9NIiwidHVybk9mZkJ1dHRvbnMiLCJkb21UcmVlIiwic2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkaXNhYmxlZCIsIk1vZGVsIiwicXVlcnlTZWxlY3RvciIsInZpZXciLCJzZWFjaCIsImNvbnRyb2wiXSwic291cmNlUm9vdCI6IiJ9