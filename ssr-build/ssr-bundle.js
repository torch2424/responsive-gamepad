module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/responsive-gamepad/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "EBst":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = M;for (i = arguments.length; i-- > 2;) {
      T.push(arguments[i]);
    }t && null != t.children && (T.length || T.push(t.children), delete t.children);while (T.length) {
      if ((o = T.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        T.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === M ? l = [o] : l.push(o), n = r;
    }var a = new S();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== L.vnode && L.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function o(e) {
    !e.__d && (e.__d = !0) && 1 == D.push(e) && (L.debounceRendering || P)(r);
  }function r() {
    var e,
        t = D;D = [];while (e = t.pop()) {
      e.__d && C(e);
    }
  }function i(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && l(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function l(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function a(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function p(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function s(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function u(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === W.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, c, l) : e.removeEventListener(t, c, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) {
        try {
          e[t] = null == o ? "" : o;
        } catch (e) {}null != o && !1 !== o || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var a = r && t !== (t = t.replace(/^xlink:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function c(e) {
    return this.__l[e.type](L.event && L.event(e) || e);
  }function _() {
    var e;while (e = E.pop()) {
      L.afterMount && L.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    V++ || (A = null != r && void 0 !== r.ownerSVGElement, H = null != e && !("__preactattr_" in e));var l = f(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --V || (H = !1, i || _()), l;
  }function f(e, t, n, o, r) {
    var i = e,
        a = A;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0))), i.__preactattr_ = !0, i;var s = t.nodeName;if ("function" == typeof s) return x(e, t, n, o);if (A = "svg" === s || "foreignObject" !== s && A, s += "", (!e || !l(e, s)) && (i = p(s, A), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0);
    }var u = i.firstChild,
        c = i.__preactattr_,
        _ = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var d = i.attributes, f = d.length; f--;) {
        c[d[f].name] = d[f].value;
      }
    }return !H && _ && 1 === _.length && "string" == typeof _[0] && null != u && void 0 !== u.splitText && null == u.nextSibling ? u.nodeValue != _[0] && (u.nodeValue = _[0]) : (_ && _.length || null != u) && h(i, _, n, o, H || null != c.dangerouslySetInnerHTML), b(i, t.attributes, c), A = a, i;
  }function h(e, t, n, o, r) {
    var l,
        a,
        p,
        u,
        c,
        _ = e.childNodes,
        d = [],
        h = {},
        v = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (v++, h[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (d[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      u = t[C], c = null;var k = u.key;if (null != k) v && void 0 !== h[k] && (c = h[k], h[k] = void 0, v--);else if (b < g) for (l = b; l < g; l++) {
        if (void 0 !== d[l] && i(a = d[l], u, r)) {
          c = a, d[l] = void 0, l === g - 1 && g--, l === b && b++;break;
        }
      }c = f(c, u, n, o), p = _[C], c && c !== e && c !== p && (null == p ? e.appendChild(c) : c === p.nextSibling ? s(p) : e.insertBefore(c, p));
    }if (v) for (var C in h) {
      void 0 !== h[C] && m(h[C], !1);
    }while (b <= g) {
      void 0 !== (c = d[g--]) && m(c, !1);
    }
  }function m(e, t) {
    var n = e._component;n ? N(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || s(e), v(e));
  }function v(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;m(e, !0), e = t;
    }
  }function b(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || u(e, o, n[o], n[o] = void 0, A);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || u(e, o, n[o], n[o] = t[o], A);
    }
  }function y(e, t, n) {
    var o,
        r = B.length;e.prototype && e.prototype.render ? (o = new e(t, n), k.call(o, t, n)) : (o = new k(t, n), o.constructor = e, o.render = g);while (r--) {
      if (B[r].constructor === e) return o.__b = B[r].__b, B.splice(r, 1), o;
    }return o;
  }function g(e, t, n) {
    return this.constructor(e, n);
  }function w(e, t, n, r, i) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r)), r && r !== e.context && (e.__c || (e.__c = e.context), e.context = r), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === L.syncComponentUpdates && e.base ? o(e) : C(e, 1, i)), e.__r && e.__r(e));
  }function C(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          p,
          s = e.props,
          u = e.state,
          c = e.context,
          f = e.__p || s,
          h = e.__s || u,
          v = e.__c || c,
          b = e.base,
          g = e.__b,
          x = b || g,
          k = e._component,
          U = !1,
          S = v;if (e.constructor.getDerivedStateFromProps && (u = t(t({}, u), e.constructor.getDerivedStateFromProps(s, u)), e.state = u), b && (e.props = f, e.state = h, e.context = v, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(s, u, c) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(s, u, c), e.props = s, e.state = u, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(s, u, c), e.getChildContext && (c = t(t({}, c), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(f, h));var T,
            M,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = a(i);l = k, l && l.constructor === P && W.key == l.__k ? w(l, W, 1, c, !1) : (T = l, e._component = l = y(P, W, c), l.__b = l.__b || g, l.__u = e, w(l, W, 0, c, !1), C(l, 1, o, !0)), M = l.base;
        } else p = x, T = k, T && (p = e._component = null), (x || 1 === n) && (p && (p._component = null), M = d(p, i, c, o || !b, x && x.parentNode, !0));if (x && M !== x && l !== k) {
          var D = x.parentNode;D && M !== D && (D.replaceChild(M, x), T || (x._component = null, m(x, !1)));
        }if (T && N(T), e.base = M, M && !r) {
          var A = e,
              H = e;while (H = H.__u) {
            (A = H).base = M;
          }M._component = A, M._componentConstructor = A.constructor;
        }
      }!b || o ? E.unshift(e) : U || (e.componentDidUpdate && e.componentDidUpdate(f, h, S), L.afterUpdate && L.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }V || r || _();
    }
  }function x(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        p = r && e._componentConstructor === t.nodeName,
        s = p,
        u = a(t);while (r && !s && (r = r.__u)) {
      s = r.constructor === t.nodeName;
    }return r && s && (!o || r._component) ? (w(r, u, 3, n, o), e = r.base) : (i && !p && (N(i), e = l = null), r = y(t.nodeName, u, n), e && !r.__b && (r.__b = e, l = null), w(r, u, 1, n, o), e = r.base, l && e !== l && (l._component = null, m(l, !1))), e;
  }function N(e) {
    L.beforeUnmount && L.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? N(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, s(t), B.push(e), v(t)), e.__r && e.__r(null);
  }function k(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function U(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }var S = function S() {},
      L = {},
      T = [],
      M = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      W = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      D = [],
      E = [],
      V = 0,
      A = !1,
      H = !1,
      B = [];t(k.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), o(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), C(this, 2);
    }, render: function render() {} });var F = { h: e, createElement: e, cloneElement: n, Component: k, render: U, rerender: r, options: L }; true ? module.exports = F : self.preact = F;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "FWi5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("EBst");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ./style.css
var style = __webpack_require__("FWi5");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./dist/responsive-gamepad.esm.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
};

// Define a keyboard key schema
var keyInputSchema = {
  ID: undefined,
  ACTIVE: false,
  KEY_CODE: undefined

  // Define a gamepad button schema
  // https://w3c.github.io/gamepad/#remapping
};var gamepadInputSchema = {
  ID: undefined,
  ACTIVE: false,
  BUTTON_ID: undefined,
  JOYSTICK: {
    AXIS_ID: undefined,
    IS_POSITIVE: undefined
  }
};

var touchInputSchema = {
  ID: undefined,
  ACTIVE: false,
  ELEMENT: undefined,
  TYPE: undefined,
  DIRECTION: undefined,
  EVENT_HANDLER: undefined,
  BOUNDING_RECT: undefined
};

var touchInputTypes = {
  BUTTON: "BUTTON",
  DPAD: "DPAD",
  ANALOG: "ANALOG"
};

// Define our keymap keys
var responsiveGamepadKeys = {
  DPAD_UP: 'DPAD_UP',
  DPAD_RIGHT: 'DPAD_RIGHT',
  DPAD_DOWN: 'DPAD_DOWN',
  DPAD_LEFT: 'DPAD_LEFT',
  LEFT_ANALOG_UP: 'LEFT_ANALOG_UP',
  LEFT_ANALOG_RIGHT: 'LEFT_ANALOG_RIGHT',
  LEFT_ANALOG_DOWN: 'LEFT_ANALOG_DOWN',
  LEFT_ANALOG_LEFT: 'LEFT_ANALOG_LEFT',
  RIGHT_ANALOG_UP: 'RIGHT_ANALOG_UP',
  RIGHT_ANALOG_RIGHT: 'RIGHT_ANALOG_RIGHT',
  RIGHT_ANALOG_DOWN: 'RIGHT_ANALOG_DOWN',
  RIGHT_ANALOG_LEFT: 'RIGHT_ANALOG_LEFT',
  A: 'A',
  B: 'B',
  X: 'X',
  Y: 'Y',
  LEFT_TRIGGER: 'LEFT_TRIGGER',
  LEFT_BUMPER: 'LEFT_BUMPER',
  RIGHT_TRIGGER: 'RIGHT_TRIGGER',
  RIGHT_BUMPER: 'RIGHT_BUMPER',
  SELECT: 'SELECT',
  START: 'START',
  SPECIAL: 'SPECIAL'

  // Define our keymap schema generator
};function KeyMapSchema() {
  var keyMapSchema = {};
  Object.keys(responsiveGamepadKeys).forEach(function (key) {
    keyMapSchema[key] = {
      KEYBOARD: [],
      GAMEPAD: [],
      TOUCHPAD: []
    };
  });
  return keyMapSchema;
}

// Function to return an ID for our input
// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function getInputId() {

  var idGenerator = function idGenerator() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  };

  var stringId = "" + idGenerator() + idGenerator();
  return stringId.slice();
}

function getKeyInput(keyCode) {
  var input = _extends({}, keyInputSchema);
  input.ID = getInputId();
  input.KEY_CODE = keyCode;
  return input;
}

function getGamepadInput(gamepadButtonId, axisId, axisIsPositive) {
  var input = _extends({}, gamepadInputSchema);
  input.ID = getInputId();
  input.JOYSTICK = _extends({}, gamepadInputSchema.JOYSTICK);
  if (gamepadButtonId || gamepadButtonId === 0) {
    input.BUTTON_ID = gamepadButtonId;
  } else if (axisId !== undefined && axisIsPositive !== undefined) {
    input.JOYSTICK.AXIS_ID = axisId;
    input.JOYSTICK.IS_POSITIVE = axisIsPositive;
  }
  return input;
}

function createTouchInput(element, inputType, updateTouchInputRect, updateTouchInput, keyMap, analogMaps, additionalArguments) {

  if (!Object.keys(touchInputTypes).includes(inputType)) {
    return false;
  }

  // Create our basic touch input attributes
  var touchInput = _extends({}, touchInputSchema);
  touchInput.ID = getInputId();
  touchInput.ELEMENT = element;
  touchInput.TYPE = inputType;

  // Add our bounding rect
  var updateRectHandler = updateTouchInputRect.bind(null, touchInput);
  updateRectHandler();

  // Define our eventListener functions
  var eventListenerCallback = function eventListenerCallback(event) {
    updateTouchInput(touchInput, keyMap, analogMaps[touchInput.ID], additionalArguments, event);
  };

  // Add event listeners to the element
  window.addEventListener("resize", updateRectHandler);
  touchInput.ELEMENT.addEventListener("touchstart", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("touchmove", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("touchend", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mousedown", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mousemove", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mouseup", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mouseleave", eventListenerCallback);

  // Create a dispose function on the touch input
  touchInput.UNLISTEN = function () {
    window.removeEventListener("resize", updateRectHandler);
    touchInput.ELEMENT.removeEventListener("touchstart", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("touchmove", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("touchend", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("mousedown", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("mousemove", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("mouseup", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("mouseleave", eventListenerCallback);
  };

  // Add the touch input to the appropriate keymap
  if (inputType === touchInputTypes.BUTTON) {
    // Add the button to the additional keyMapKey argument
    keyMap[additionalArguments[0]].TOUCHPAD.push(touchInput);
  } else if (inputType === touchInputTypes.DPAD) {
    // Spread the touch input over the DPAD_X inputs
    ['UP', 'RIGHT', 'DOWN', 'LEFT'].forEach(function (direction) {
      var directionalTouchInput = _extends({}, touchInput);
      directionalTouchInput.DIRECTION = direction;
      keyMap["DPAD_" + direction].TOUCHPAD.push(directionalTouchInput);
    });
  } else if (inputType === touchInputTypes.ANALOG) {
    // Since we are axes, and not on/off handled in updateTouchpad
    analogMaps[touchInput.ID] = {
      TOUCH_INPUT: touchInput
    };
  }

  return touchInput.ID;
}

// Helper function for creating new gamepads
function mergeInputs(baseKey) {

  // Get our extra arguments
  var originalArguments = [].concat(Array.prototype.slice.call(arguments));
  var extraArguments = [].concat(toConsumableArray(originalArguments.slice(1)));

  // Create our new merged key
  var mergedKey = {
    KEYBOARD: [].concat(toConsumableArray(baseKey.KEYBOARD)),
    GAMEPAD: [].concat(toConsumableArray(baseKey.GAMEPAD)),
    TOUCHPAD: [].concat(toConsumableArray(baseKey.TOUCHPAD))
  };

  extraArguments.forEach(function (key) {
    mergedKey = {
      KEYBOARD: [].concat(toConsumableArray(mergedKey.KEYBOARD), toConsumableArray(key.KEYBOARD)),
      GAMEPAD: [].concat(toConsumableArray(mergedKey.GAMEPAD), toConsumableArray(key.GAMEPAD)),
      TOUCHPAD: [].concat(toConsumableArray(mergedKey.TOUCHPAD), toConsumableArray(key.TOUCHPAD))
    };
  });

  return mergedKey;
}

var RESPONSIVE_GAMEPAD_KEYS = responsiveGamepadKeys;
var TOUCH_INPUT_TYPES = touchInputTypes;

// Functions to update keymap state
// 'this' should be bound by the respective service

// HTML Tags that can be focused on, where the library should be disabled
// https://www.w3schools.com/tags/ref_byfunc.asp
var INPUT_HTML_TAGS = ['input', 'textarea', 'button', 'select', 'option', 'optgroup', 'label', 'datalist'];

// Function to return if we are ignoring input for key events
function isIgnoringKeyEvents() {

  // Checking for window for preact prerender
  if (typeof window === "undefined") {
    return true;
  }

  return INPUT_HTML_TAGS.some(function (htmlTag) {
    if (document.activeElement && document.activeElement.tagName.toLowerCase() === htmlTag.toLowerCase()) {
      return true;
    }
    return false;
  });
}

// Function to handle keyboard update events
function updateKeyboard(keyEvent) {
  var _this = this;

  if (!this.enabled) {
    return;
  }

  // Checking for window for preact prerender
  if (typeof window === "undefined") {
    return;
  }

  // Ignore the event if focus on a input-table field
  // https://www.w3schools.com/tags/ref_byfunc.asp
  if (keyEvent && keyEvent.target && keyEvent.target.tagName) {
    var isTargetInputField = INPUT_HTML_TAGS.some(function (htmlTag) {
      if (keyEvent && keyEvent.target.tagName.toLowerCase() === htmlTag.toLowerCase()) {
        return true;
      }
      return false;
    });

    if (isTargetInputField) {
      return;
    }
  }

  // Get the new state of the key
  var isPressed = false;
  if (keyEvent.type === 'keydown') {
    isPressed = true;
  }

  // Loop through our keys
  this.keyMapKeys.forEach(function (key) {
    _this.keyMap[key].KEYBOARD.forEach(function (keyInput, index) {
      if (keyInput.KEY_CODE === keyEvent.keyCode) {
        _this.keyMap[key].KEYBOARD[index].ACTIVE = isPressed;
      }
    });
  });

  // If we found a key, prevent default so page wont scroll and things
  keyEvent.preventDefault();
}

// Functions to update keymap state
// 'this' should be bound by the respective service

function isButtonPressed(gamepad, buttonId) {
  return gamepad.buttons[buttonId] ? gamepad.buttons[buttonId].pressed : false;
}

function getGamepads() {
  // Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
  // Gampad Diagram: https://w3c.github.io/gamepad/#remapping
  return navigator.getGamepads ? navigator.getGamepads() : [];
}

// Helpers for accessing gamepad
// Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
function getAnalogStickAxis(gamepad, axisId) {
  if (gamepad) {
    return gamepad.axes[axisId] || 0.0;
  }
  return 0.0;
}

// Function to convert a set of analog booleans to an Axis Number
function analogBooleanToAxis(positive, negative) {
  if (positive) {
    return 1.0;
  }
  if (negative) {
    return -1.0;
  }
  return 0;
}

// Function to check the gamepad API for the gamepad state
function updateGamepad() {
  var _this = this;

  var gamepads = getGamepads();

  var _loop = function _loop(i) {

    // Get our current gamepad
    var gamepad = gamepads[i];

    if (!gamepad) {
      return "continue";
    }

    // Loop through our keys
    _this.keyMapKeys.forEach(function (key) {
      _this.keyMap[key].GAMEPAD.forEach(function (gamepadInput, index) {

        // Check if we are a gamepad button
        if (_this.keyMap[key].GAMEPAD[index].BUTTON_ID || _this.keyMap[key].GAMEPAD[index].BUTTON_ID === 0) {
          _this.keyMap[key].GAMEPAD[index].ACTIVE = isButtonPressed(gamepad, _this.keyMap[key].GAMEPAD[index].BUTTON_ID);
        }

        // Check if we are an axis
        if (_this.keyMap[key].GAMEPAD[index].JOYSTICK.AXIS_ID !== undefined && _this.keyMap[key].GAMEPAD[index].JOYSTICK.IS_POSITIVE !== undefined) {
          if (_this.keyMap[key].GAMEPAD[index].JOYSTICK.IS_POSITIVE) {
            _this.keyMap[key].GAMEPAD[index].ACTIVE = getAnalogStickAxis(gamepad, _this.keyMap[key].GAMEPAD[index].JOYSTICK.AXIS_ID) > +_this.gamepadAnalogStickDeadZone;
          } else {
            _this.keyMap[key].GAMEPAD[index].ACTIVE = getAnalogStickAxis(gamepad, _this.keyMap[key].GAMEPAD[index].JOYSTICK.AXIS_ID) < -_this.gamepadAnalogStickDeadZone;
          }
        }
      });
    });
  };

  for (var i = 0; i < gamepads.length; i++) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }
}

// Functions to update keymap state
// 'this' should be bound by the respective service

var dpadKeys = [RESPONSIVE_GAMEPAD_KEYS.DPAD_UP, RESPONSIVE_GAMEPAD_KEYS.DPAD_RIGHT, RESPONSIVE_GAMEPAD_KEYS.DPAD_DOWN, RESPONSIVE_GAMEPAD_KEYS.DPAD_LEFT];

// Reset all Direction keys for a DPAD for touch Inputs
function resetTouchDpad() {
  var _this = this;

  dpadKeys.forEach(function (dpadKey) {
    _this.keyMap[dpadKey].TOUCHPAD.forEach(function (touchInput) {
      touchInput.ACTIVE = false;
    });
  });
}

// Find a Dpad Touch element with Direction and ID
function findDpadTouchInput(keyMap, id, direction) {
  var foundTouchInput = void 0;

  keyMap['DPAD_' + direction].TOUCHPAD.some(function (touchInput) {
    if (touchInput.ID === id) {
      foundTouchInput = touchInput;
      return true;
    }
    return false;
  });

  return foundTouchInput;
}

// Function to set the axes of an analog to zero
function resetTouchAnalog(touchInput, analogMap, additionalArguments) {
  analogMap[additionalArguments[0] + '_ANALOG_HORIZONTAL_AXIS'] = 0.0;
  analogMap[additionalArguments[0] + '_ANALOG_VERTICAL_AXIS'] = 0.0;
  analogMap[additionalArguments[0] + '_ANALOG_UP'] = false;
  analogMap[additionalArguments[0] + '_ANALOG_RIGHT'] = false;
  analogMap[additionalArguments[0] + '_ANALOG_DOWN'] = false;
  analogMap[additionalArguments[0] + '_ANALOG_LEFT'] = false;

  touchInput.ELEMENT.style.transform = 'translate(0px, 0px)';
}

// Function to update touch button position and size
function updateTouchInputRect(touchInput) {
  // Read from the DOM, and get each of our elements position, doing this here, as it is best to read from the dom in sequence
  // use element.getBoundingRect() top, bottom, left, right to get clientX and clientY in touch events :)
  // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
  var boundingRect = touchInput.ELEMENT.getBoundingClientRect();
  touchInput.BOUNDING_RECT = boundingRect;
}

// Function called on an event of a touchInput SVG Element
function updateTouchInput(touchInput, keyMap, analogMap, additionalArguments, event) {

  if (!this.enabled) {
    return;
  }

  if (!event || event.type.includes('touch') && !event.touches) return;

  //event.stopPropagation();
  event.preventDefault();

  // Check if we still have our requirements
  if (touchInput.TYPE === 'DPAD' && !keyMap || touchInput.TYPE === 'ANALOG' && !analogMap) {
    return;
  }

  // Check for active event types
  if (event.type === "touchstart" || event.type === "touchmove" || event.type === "mousedown" || event.type === "mousemove") {
    // Active

    if (event.type === "mousemove" && !touchInput.MOUSEDOWN) {
      return;
    }

    if (event.type === "mousedown") {

      touchInput.MOUSEDOWN = true;
    }

    // Button Type
    if (touchInput.TYPE === 'BUTTON' && event.type !== "mousemove") {
      touchInput.ACTIVE = true;
      return;
    }

    // DIRECTIONAL
    // We will need these  calculations for when if we are dpad or analog

    // Calculate for the correct key
    // Only using the first touch, since we shouldn't be having two fingers on the dpad
    var touch = void 0;
    if (event.type.includes('touch')) {
      touch = event.touches[0];
    } else if (event.type.includes('mouse')) {
      touch = event;
    }

    // We will need these  calculations for when if we are dpad or analog
    // Find our centers of our rectangles, and our unbiased X Y values on the rect
    var rectCenterX = (touchInput.BOUNDING_RECT.right - touchInput.BOUNDING_RECT.left) / 2;
    var rectCenterY = (touchInput.BOUNDING_RECT.bottom - touchInput.BOUNDING_RECT.top) / 2;
    var touchX = touch.clientX - touchInput.BOUNDING_RECT.left;
    var touchY = touch.clientY - touchInput.BOUNDING_RECT.top;

    if (touchInput.TYPE === 'DPAD') {

      // Find if the horizontal or vertical influence is greater
      // Lesson From: picoDeploy
      // Fix for shoot button causing the character to move right on multi touch error
      // + 50 for some buffer
      if (touchX > rectCenterX + touchInput.BOUNDING_RECT.width / 2 + 50) {
        // Ignore the event
        return;
      }

      // We forsure know we have input
      // Reset previous DPAD State
      resetTouchDpad.bind(this)();

      // Create an additonal influece for horizontal, to make it feel better
      var horizontalInfluence = touchInput.BOUNDING_RECT.width / 8;

      // Determine if we are horizontal or vertical
      var isHorizontal = Math.abs(rectCenterX - touchX) + horizontalInfluence > Math.abs(rectCenterY - touchY);

      // Find if left or right from width, vice versa for height
      if (isHorizontal) {
        // Add a horizontal dead zone
        var deadzoneSize = touchInput.BOUNDING_RECT.width / 20;
        if (Math.abs(touchInput.BOUNDING_RECT.width / 2 - touchX) > deadzoneSize) {

          var isLeft = touchX < touchInput.BOUNDING_RECT.width / 2;

          if (isLeft) {
            // Set DPAD_LEFT Touch Input Active
            findDpadTouchInput(keyMap, touchInput.ID, 'LEFT').ACTIVE = true;
          } else {
            findDpadTouchInput(keyMap, touchInput.ID, 'RIGHT').ACTIVE = true;
          }
        }
      } else {
        var isUp = touchY < touchInput.BOUNDING_RECT.height / 2;
        if (isUp) {
          findDpadTouchInput(keyMap, touchInput.ID, 'UP').ACTIVE = true;
        } else {
          findDpadTouchInput(keyMap, touchInput.ID, 'DOWN').ACTIVE = true;
        }
      }
    }

    // Analog Type
    if (touchInput.TYPE === 'ANALOG') {
      // Find our Horizontal Axis
      var horizontalDifferenceFromCenter = touchX - rectCenterX;
      var horizontalAxis = horizontalDifferenceFromCenter / rectCenterX;
      if (horizontalAxis > 1) {
        horizontalAxis = 1.0;
      } else if (horizontalAxis < -1) {
        horizontalAxis = -1.0;
      }

      // Find our Vertical Axis
      var verticalDifferenceFromCenter = touchY - rectCenterY;
      var verticalAxis = verticalDifferenceFromCenter / rectCenterY;
      if (verticalAxis > 1) {
        verticalAxis = 1.0;
      } else if (verticalAxis < -1) {
        verticalAxis = -1.0;
      }

      // Apply styles to element
      var translateX = rectCenterX * horizontalAxis / 2;
      var translateY = rectCenterY * verticalAxis / 2;
      touchInput.ELEMENT.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';

      // Set Axis on keyMap
      analogMap[additionalArguments[0] + '_ANALOG_HORIZONTAL_AXIS'] = horizontalAxis;
      analogMap[additionalArguments[0] + '_ANALOG_VERTICAL_AXIS'] = verticalAxis;

      // Set Analog Direction State
      analogMap[additionalArguments[0] + '_ANALOG_UP'] = verticalAxis < 0;
      analogMap[additionalArguments[0] + '_ANALOG_RIGHT'] = horizontalAxis > 0;
      analogMap[additionalArguments[0] + '_ANALOG_DOWN'] = verticalAxis > 0;
      analogMap[additionalArguments[0] + '_ANALOG_LEFT'] = horizontalAxis < 0;
    }
  } else {
    // Not active

    touchInput.MOUSEDOWN = false;

    // Button Type
    if (touchInput.TYPE === 'BUTTON') {
      touchInput.ACTIVE = false;
      return;
    }

    // Handle Dpad Type
    if (touchInput.TYPE === 'DPAD') {
      resetTouchDpad.bind(this)();
      return;
    }

    if (touchInput.TYPE === 'ANALOG') {
      resetTouchAnalog(touchInput, analogMap, additionalArguments);
      return;
    }
  }
}

var _Key;

// Keyboard Codes
// http://keycode.info/

var Key = (_Key = {

  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  META: 91,

  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,

  W: 87,
  A: 65,
  S: 83,
  D: 68,
  Q: 81,
  E: 69,
  X: 88,
  Z: 90,
  C: 67,
  V: 86,
  I: 73,
  K: 75,
  J: 74,
  L: 76
}, defineProperty(_Key, "Q", 81), defineProperty(_Key, "E", 69), defineProperty(_Key, "U", 85), defineProperty(_Key, "O", 79), defineProperty(_Key, "SEMI_COLON", 186), defineProperty(_Key, "SINGLE_QUOTE", 222), defineProperty(_Key, "BACK_SLASH", 220), defineProperty(_Key, "NUMPAD_0", 96), defineProperty(_Key, "NUMPAD_1", 97), defineProperty(_Key, "NUMPAD_2", 98), defineProperty(_Key, "NUMPAD_3", 99), defineProperty(_Key, "NUMPAD_4", 100), defineProperty(_Key, "NUMPAD_5", 101), defineProperty(_Key, "NUMPAD_6", 102), defineProperty(_Key, "NUMPAD_7", 103), defineProperty(_Key, "NUMPAD_8", 104), defineProperty(_Key, "NUMPAD_9", 105), _Key);

// The default keymap, is very specifc to the "Standard Controller"

var responsive_gamepad_esm_keymap = KeyMapSchema();

// Dpad Up
responsive_gamepad_esm_keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.ARROW_UP));
responsive_gamepad_esm_keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.NUMPAD_8));
responsive_gamepad_esm_keymap.DPAD_UP.GAMEPAD.push(getGamepadInput(12));

// Left Analog Up
responsive_gamepad_esm_keymap.LEFT_ANALOG_UP.KEYBOARD.push(getKeyInput(Key.W));
responsive_gamepad_esm_keymap.LEFT_ANALOG_UP.GAMEPAD.push(getGamepadInput(false, 1, false));

// Right Analog Up
responsive_gamepad_esm_keymap.RIGHT_ANALOG_UP.KEYBOARD.push(getKeyInput(Key.I));
responsive_gamepad_esm_keymap.RIGHT_ANALOG_UP.GAMEPAD.push(getGamepadInput(false, 3, false));

// Dpad Right
responsive_gamepad_esm_keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.ARROW_RIGHT));
responsive_gamepad_esm_keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.NUMPAD_6));
responsive_gamepad_esm_keymap.DPAD_RIGHT.GAMEPAD.push(getGamepadInput(15));

// Left Analog Right
responsive_gamepad_esm_keymap.LEFT_ANALOG_RIGHT.KEYBOARD.push(getKeyInput(Key.D));
responsive_gamepad_esm_keymap.LEFT_ANALOG_RIGHT.GAMEPAD.push(getGamepadInput(false, 0, true));

// Right Analog Right
responsive_gamepad_esm_keymap.RIGHT_ANALOG_RIGHT.KEYBOARD.push(getKeyInput(Key.L));
responsive_gamepad_esm_keymap.RIGHT_ANALOG_RIGHT.GAMEPAD.push(getGamepadInput(false, 2, true));

// Dpad Down
responsive_gamepad_esm_keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.ARROW_DOWN));
responsive_gamepad_esm_keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.NUMPAD_5));
responsive_gamepad_esm_keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.NUMPAD_2));
responsive_gamepad_esm_keymap.DPAD_DOWN.GAMEPAD.push(getGamepadInput(13));

// Left Analog Down
responsive_gamepad_esm_keymap.LEFT_ANALOG_DOWN.KEYBOARD.push(getKeyInput(Key.S));
responsive_gamepad_esm_keymap.LEFT_ANALOG_DOWN.GAMEPAD.push(getGamepadInput(false, 1, true));

// Right Analog Down
responsive_gamepad_esm_keymap.RIGHT_ANALOG_DOWN.KEYBOARD.push(getKeyInput(Key.K));
responsive_gamepad_esm_keymap.RIGHT_ANALOG_DOWN.GAMEPAD.push(getGamepadInput(false, 3, true));

// Dpad Left
responsive_gamepad_esm_keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.ARROW_LEFT));
responsive_gamepad_esm_keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.NUMPAD_4));
responsive_gamepad_esm_keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(14));
responsive_gamepad_esm_keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(false, 0, false));
responsive_gamepad_esm_keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(false, 2, false));

// Left Analog Left
responsive_gamepad_esm_keymap.LEFT_ANALOG_LEFT.KEYBOARD.push(getKeyInput(Key.A));
responsive_gamepad_esm_keymap.LEFT_ANALOG_LEFT.GAMEPAD.push(getGamepadInput(false, 0, false));

// Right Analog Left
responsive_gamepad_esm_keymap.RIGHT_ANALOG_LEFT.KEYBOARD.push(getKeyInput(Key.J));
responsive_gamepad_esm_keymap.RIGHT_ANALOG_LEFT.GAMEPAD.push(getGamepadInput(false, 2, false));

// A
responsive_gamepad_esm_keymap.A.KEYBOARD.push(getKeyInput(Key.X));
responsive_gamepad_esm_keymap.A.KEYBOARD.push(getKeyInput(Key.SEMI_COLON));
responsive_gamepad_esm_keymap.A.KEYBOARD.push(getKeyInput(Key.NUMPAD_7));
responsive_gamepad_esm_keymap.A.GAMEPAD.push(getGamepadInput(0));

// B
responsive_gamepad_esm_keymap.B.KEYBOARD.push(getKeyInput(Key.Z));
responsive_gamepad_esm_keymap.B.KEYBOARD.push(getKeyInput(Key.ESCAPE));
responsive_gamepad_esm_keymap.B.KEYBOARD.push(getKeyInput(Key.SINGLE_QUOTE));
responsive_gamepad_esm_keymap.B.KEYBOARD.push(getKeyInput(Key.BACKSPACE));
responsive_gamepad_esm_keymap.B.KEYBOARD.push(getKeyInput(Key.NUMPAD_9));
responsive_gamepad_esm_keymap.B.GAMEPAD.push(getGamepadInput(1));

// X
responsive_gamepad_esm_keymap.X.KEYBOARD.push(getKeyInput(Key.C));
responsive_gamepad_esm_keymap.X.GAMEPAD.push(getGamepadInput(2));

// Y
responsive_gamepad_esm_keymap.Y.KEYBOARD.push(getKeyInput(Key.V));
responsive_gamepad_esm_keymap.Y.GAMEPAD.push(getGamepadInput(3));

// Left Trigger
responsive_gamepad_esm_keymap.LEFT_TRIGGER.KEYBOARD.push(getKeyInput(Key.Q));
responsive_gamepad_esm_keymap.LEFT_TRIGGER.GAMEPAD.push(getGamepadInput(6));

// Left Bumper
responsive_gamepad_esm_keymap.LEFT_BUMPER.KEYBOARD.push(getKeyInput(Key.E));
responsive_gamepad_esm_keymap.LEFT_BUMPER.GAMEPAD.push(getGamepadInput(4));

// Right Trigger
responsive_gamepad_esm_keymap.RIGHT_TRIGGER.KEYBOARD.push(getKeyInput(Key.U));
responsive_gamepad_esm_keymap.RIGHT_TRIGGER.GAMEPAD.push(getGamepadInput(7));

// Right Bumper
responsive_gamepad_esm_keymap.RIGHT_BUMPER.KEYBOARD.push(getKeyInput(Key.O));
responsive_gamepad_esm_keymap.RIGHT_BUMPER.GAMEPAD.push(getGamepadInput(5));

// Start
responsive_gamepad_esm_keymap.START.KEYBOARD.push(getKeyInput(Key.RETURN));
responsive_gamepad_esm_keymap.START.KEYBOARD.push(getKeyInput(Key.SPACE));
responsive_gamepad_esm_keymap.START.KEYBOARD.push(getKeyInput(Key.NUMPAD_3));
responsive_gamepad_esm_keymap.START.GAMEPAD.push(getGamepadInput(9));

// Select
responsive_gamepad_esm_keymap.SELECT.KEYBOARD.push(getKeyInput(Key.SHIFT));
responsive_gamepad_esm_keymap.SELECT.KEYBOARD.push(getKeyInput(Key.TAB));
responsive_gamepad_esm_keymap.SELECT.KEYBOARD.push(getKeyInput(Key.BACK_SLASH));
responsive_gamepad_esm_keymap.SELECT.KEYBOARD.push(getKeyInput(Key.NUMPAD_1));
responsive_gamepad_esm_keymap.SELECT.GAMEPAD.push(getGamepadInput(8));

// Special
responsive_gamepad_esm_keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.ALT));
responsive_gamepad_esm_keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.CTRL));
responsive_gamepad_esm_keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.META));
responsive_gamepad_esm_keymap.SELECT.GAMEPAD.push(getGamepadInput(16));

var KEYMAP = function KEYMAP() {
  return JSON.parse(JSON.stringify(responsive_gamepad_esm_keymap));
};

var keymap$1 = KEYMAP();

// Simply Alias some of our buttons

// Analog -> DPAD
keymap$1.DPAD_UP = mergeInputs(keymap$1.DPAD_UP, keymap$1.LEFT_ANALOG_UP, keymap$1.RIGHT_ANALOG_UP);
keymap$1.DPAD_RIGHT = mergeInputs(keymap$1.DPAD_RIGHT, keymap$1.LEFT_ANALOG_RIGHT, keymap$1.RIGHT_ANALOG_RIGHT);
keymap$1.DPAD_LEFT = mergeInputs(keymap$1.DPAD_LEFT, keymap$1.LEFT_ANALOG_LEFT, keymap$1.RIGHT_ANALOG_LEFT);
keymap$1.DPAD_DOWN = mergeInputs(keymap$1.DPAD_DOWN, keymap$1.LEFT_ANALOG_DOWN, keymap$1.RIGHT_ANALOG_DOWN);

// X/Y -> A/B
keymap$1.A = mergeInputs(keymap$1.A, keymap$1.X);
keymap$1.B = mergeInputs(keymap$1.B, keymap$1.Y);

// Triggers -> A
keymap$1.A = mergeInputs(keymap$1.A, keymap$1.LEFT_TRIGGER, keymap$1.RIGHT_TRIGGER);

// Bumpers -> B
keymap$1.B = mergeInputs(keymap$1.B, keymap$1.LEFT_BUMPER, keymap$1.RIGHT_BUMPER);

var KEYMAP$1 = function KEYMAP$$1() {
  return JSON.parse(JSON.stringify(keymap$1));
};

var ResponsiveGamepadService = function () {
  function ResponsiveGamepadService() {
    classCallCheck(this, ResponsiveGamepadService);

    // Our settings
    this.gamepadAnalogStickDeadZone = 0.25;
    this.keyMap = undefined;
    this.keyMapKeys = undefined;
    this.analogMaps = undefined;
    this.enabled = false;
    this.keyEventUnlistener = undefined;
  }

  createClass(ResponsiveGamepadService, [{
    key: 'enable',
    value: function enable(keyMap) {

      if (this.enabled) {
        console.error('Responsive Gamepad is already enabled');
        return;
      }

      // TODO: Verify it is a valid keymap passed
      this.keyMap = keyMap || KEYMAP();
      this.keyMapKeys = Object.keys(this.keyMap);
      this.analogMaps = {};

      // Add our key event listeners
      // Wrapping in this for preact prerender
      if (typeof window !== "undefined") {

        var updateKeyboardHandler = updateKeyboard.bind(this);

        window.addEventListener('keyup', updateKeyboardHandler);
        window.addEventListener('keydown', updateKeyboardHandler);

        this.keyEventUnlistener = function () {
          window.removeEventListener('keyup', updateKeyboardHandler);
          window.removeEventListener('keydown', updateKeyboardHandler);
        };
      }

      this.enabled = true;
    }

    // Disable responsive gamepad, and remove all the listeners

  }, {
    key: 'disable',
    value: function disable() {
      var _this = this;

      // Dispose Key Events
      if (this.keyEventUnlistener) {
        this.keyEventUnlistener();
        this.keyEventUnlistener = undefined;
      }

      // Dispose Touch Events
      this.keyMapKeys.forEach(function (keyMapKey) {
        _this.keyMap[keyMapKey].TOUCHPAD.forEach(function (input) {
          input.UNLISTEN();
        });
      });
      Object.keys(this.analogMaps).forEach(function (analogMapsKey) {
        _this.analogMaps[analogMapsKey].TOUCH_INPUT.UNLISTEN();
      });

      // Dispose of the key map
      this.keyMap = undefined;

      this.enabled = false;
    }
  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return this.enabled;
    }

    // Function to return if we are ignoring input for key events

  }, {
    key: 'isIgnoringKeyEvents',
    value: function isIgnoringKeyEvents$$1() {
      return isIgnoringKeyEvents();
    }
  }, {
    key: 'addTouchInput',
    value: function addTouchInput(element, inputType) {

      // Get any additional arguments
      var originalArguments = [].concat(Array.prototype.slice.call(arguments));
      var additionalArguments = [].concat(toConsumableArray(originalArguments.slice(2)));

      // Declare our touch input
      var touchInputId = createTouchInput(element, inputType, updateTouchInputRect.bind(this), updateTouchInput.bind(this), this.keyMap, this.analogMaps, additionalArguments);

      // Return the touchInput ID so that is may be removed later
      return touchInputId;
    }
  }, {
    key: 'removeTouchInput',
    value: function removeTouchInput(touchInputId) {
      var _this2 = this;

      // Search for the input in our touch pad for every key
      var foundId = false;

      this.keyMapKeys.forEach(function (keyMapKey) {
        _this2.keyMap[keyMapKey].TOUCHPAD.forEach(function (input, index) {
          if (input.ID === touchInputId) {
            input.UNLISTEN();
            _this2.keyMap[keyMapKey].TOUCHPAD.splice(index, 1);
            foundId = true;
          }
        });
      });

      if (foundId) {
        return foundId;
      }

      // Next, check the analog maps
      Object.keys(this.analogMaps).forEach(function (analogMapsKey) {
        if (analogMapsKey === touchInputId) {
          _this2.analogMaps[analogMapsKey].TOUCH_INPUT.UNLISTEN();
          delete _this2.analogMaps[analogMapsKey];
          foundId = true;
        }
      });

      return foundId;
    }
  }, {
    key: 'getState',
    value: function getState() {
      var _this3 = this;

      if (!this.enabled) {
        return {};
      }

      // Keyboard handled by listeners on window

      // Update the gamepad state
      updateGamepad.bind(this)();

      // Touch Handled by listeners on touchInputs

      // Create an abstracted controller state
      var controllerState = {};

      // Loop through our Keys, and quickly build our controller state
      Object.keys(this.keyMap).forEach(function (key) {

        // Find if any of the keyboard, gamepad or touchpad buttons are pressed
        var keyboardState = _this3.keyMap[key].KEYBOARD.some(function (keyInput) {
          return keyInput.ACTIVE;
        });

        if (keyboardState) {
          controllerState[key] = true;
          return;
        }

        // Find if any of the keyboard, gamepad or touchpad buttons are pressed
        var gamepadState = _this3.keyMap[key].GAMEPAD.some(function (gamepadInput) {
          return gamepadInput.ACTIVE;
        });

        if (gamepadState) {
          controllerState[key] = true;
          return;
        }

        // Find if any of the keyboard, gamepad or touchpad buttons are pressed
        var touchState = _this3.keyMap[key].TOUCHPAD.some(function (touchInput) {
          return touchInput.ACTIVE;
        });

        if (touchState) {
          controllerState[key] = touchState;
          return;
        }

        controllerState[key] = false;
      });

      // Assign Truthy values from the analogMaps
      Object.keys(this.analogMaps).forEach(function (analogMapsKey) {
        Object.keys(_this3.analogMaps[analogMapsKey]).forEach(function (analogMapKey) {

          // Skip the Touch Input on the analog Map
          if (analogMapKey === 'TOUCH_INPUT') {
            return;
          }

          var stateValue = _this3.analogMaps[analogMapsKey][analogMapKey];
          if (stateValue) {
            controllerState[analogMapKey] = stateValue;
          }
        });
      });

      // Get our Analog Stick Axis
      // If not provided by touch pad
      var gamepad = getGamepads()[0];
      if (gamepad) {
        controllerState.LEFT_ANALOG_HORIZONTAL_AXIS = getAnalogStickAxis(gamepad, 0);
        controllerState.LEFT_ANALOG_VERTICAL_AXIS = getAnalogStickAxis(gamepad, 1);
        controllerState.RIGHT_ANALOG_HORIZONTAL_AXIS = getAnalogStickAxis(gamepad, 2);
        controllerState.RIGHT_ANALOG_VERTICAL_AXIS = getAnalogStickAxis(gamepad, 3);
      } else {

        if (!controllerState.LEFT_ANALOG_HORIZONTAL_AXIS) {
          controllerState.LEFT_ANALOG_HORIZONTAL_AXIS = analogBooleanToAxis(controllerState.LEFT_ANALOG_RIGHT, controllerState.LEFT_ANALOG_LEFT);
        }
        if (!controllerState.LEFT_ANALOG_VERTICAL_AXIS) {
          controllerState.LEFT_ANALOG_VERTICAL_AXIS = analogBooleanToAxis(controllerState.LEFT_ANALOG_DOWN, controllerState.LEFT_ANALOG_UP);
        }

        if (!controllerState.RIGHT_ANALOG_HORIZONTAL_AXIS) {
          controllerState.RIGHT_ANALOG_HORIZONTAL_AXIS = analogBooleanToAxis(controllerState.RIGHT_ANALOG_RIGHT, controllerState.RIGHT_ANALOG_LEFT);
        }

        if (!controllerState.RIGHT_ANALOG_VERTICAL_AXIS) {
          controllerState.RIGHT_ANALOG_VERTICAL_AXIS = analogBooleanToAxis(controllerState.RIGHT_ANALOG_DOWN, controllerState.RIGHT_ANALOG_UP);
        }
      }

      // Alias some other values for convienence
      controllerState.UP = controllerState.DPAD_UP || controllerState.LEFT_ANALOG_UP || false;
      controllerState.RIGHT = controllerState.DPAD_RIGHT || controllerState.LEFT_ANALOG_RIGHT || false;
      controllerState.DOWN = controllerState.DPAD_DOWN || controllerState.LEFT_ANALOG_DOWN || false;
      controllerState.LEFT = controllerState.DPAD_LEFT || controllerState.LEFT_ANALOG_LEFT || false;

      if (controllerState.UP && controllerState.DOWN) {
        controllerState.UP = false;
        controllerState.DOWN = false;
      }

      if (controllerState.RIGHT && controllerState.LEFT) {
        controllerState.RIGHT = false;
        controllerState.LEFT = false;
      }

      // Return the controller state in case we need something from it
      return controllerState;
    }
  }]);
  return ResponsiveGamepadService;
}();

// Exports


var ResponsiveGamepad = new ResponsiveGamepadService();


// CONCATENATED MODULE: ./index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index_App; });
var index__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref = Object(preact_min["h"])(
	'h1',
	null,
	'Responsive Gamepad Demo'
);

var _ref2 = Object(preact_min["h"])(
	'div',
	{ 'class': 'githubLink' },
	Object(preact_min["h"])(
		'a',
		{ href: 'https://github.com/torch2424/responsive-gamepad', target: '_blank' },
		'Fork me on github'
	)
);

var _ref3 = Object(preact_min["h"])(
	'p',
	null,
	'This is the example demo for ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://github.com/torch2424/responsive-gamepad', target: '_blank' },
		'responsive-gamepad'
	),
	'. Feel free to test this demo with:',
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			'Keyboard'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Gamepad (Feel free to plug one into USB)'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Touchpad (See the floating fixed element at the bottom of the screen)'
		)
	),
	'Please scroll down to see the different features and examples the API provides, each with a color coded section.'
);

var _ref4 = Object(preact_min["h"])(
	'h3',
	null,
	'Responsive Gamepad State:'
);

var _ref5 = Object(preact_min["h"])(
	'h3',
	null,
	'Enabled/Disable With Custom Keymaps'
);

var _ref6 = Object(preact_min["h"])(
	'p',
	null,
	'Responsive Gamepad can be enabled and disabled (as a whole) as needed'
);

var _ref7 = Object(preact_min["h"])(
	'p',
	null,
	'Custom Keymaps allow for altering which inputs represent which responsive-gamepad state key. For instance, the "gameboy" keymap merges the X/Y buttons with the A/B buttons, and more! You must disable the keymap to enable the gameboy keymap'
);

var _ref8 = Object(preact_min["h"])(
	'h3',
	null,
	'Dynamic Touch Input'
);

var _ref9 = Object(preact_min["h"])(
	'p',
	null,
	'Touch inputs can be added/removed on the fly!'
);

var _ref10 = Object(preact_min["h"])(
	'h3',
	null,
	'Prevent Default (Keyboard Only)'
);

var _ref11 = Object(preact_min["h"])(
	'p',
	null,
	'I am very tall to show off `event.preventDefault()`. E.g arrow keys wont scroll if in the keymap. But typing will work on input type form fields!'
);

var _ref12 = Object(preact_min["h"])('input', { type: 'text' });

var _ref13 = Object(preact_min["h"])('br', null);

var _ref14 = Object(preact_min["h"])('textarea', null);

var _ref15 = Object(preact_min["h"])('br', null);

var _ref16 = Object(preact_min["h"])('br', null);

var _ref17 = Object(preact_min["h"])(
	'select',
	null,
	Object(preact_min["h"])(
		'option',
		{ value: 'use' },
		'use arrow keys once selected'
	),
	Object(preact_min["h"])(
		'option',
		{ value: 'arrow' },
		'use arrow keys once selected'
	),
	Object(preact_min["h"])(
		'option',
		{ value: 'keys' },
		'use arrow keys once selected'
	)
);

var _ref18 = Object(preact_min["h"])(
	'div',
	{ 'class': 'analog-container' },
	Object(preact_min["h"])(
		'svg',
		{ id: 'gamepadLeftAnalog', 'class': 'analog-stick', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
		Object(preact_min["h"])('circle', { cx: '12', cy: '12', r: '6' })
	),
	Object(preact_min["h"])(
		'svg',
		{ id: 'gamepadLeftAnalogBg', 'class': 'analog-background', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
		Object(preact_min["h"])('circle', { cx: '12', cy: '12', r: '12' })
	)
);

var _ref19 = Object(preact_min["h"])(
	'svg',
	{ id: 'gamepadDpad', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
	Object(preact_min["h"])('path', { d: 'M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z' })
);

var _ref20 = Object(preact_min["h"])(
	'svg',
	{ id: 'gamepadStart', fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])('path', { d: 'M19 13H5v-2h14v2z' }),
	Object(preact_min["h"])('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
	Object(preact_min["h"])(
		'text',
		{ x: '5.5', y: '18.5' },
		'Start'
	)
);

var _ref21 = Object(preact_min["h"])(
	'svg',
	{ id: 'gamepadSelect', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])('path', { d: 'M19 13H5v-2h14v2z' }),
	Object(preact_min["h"])('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
	Object(preact_min["h"])(
		'text',
		{ x: '3.5', y: '18.5' },
		'Select'
	)
);

var _ref22 = Object(preact_min["h"])(
	'svg',
	{ id: 'gamepadA', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' }),
	Object(preact_min["h"])('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
	Object(preact_min["h"])(
		'text',
		{ x: '9.75', y: '14' },
		'A'
	)
);

var _ref23 = Object(preact_min["h"])(
	'svg',
	{ id: 'gamepadB', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' }),
	Object(preact_min["h"])('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
	Object(preact_min["h"])(
		'text',
		{ x: '9.75', y: '14' },
		'B'
	)
);

var index_App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, _Component.call(this));
	}

	// Using componentDidMount to wait for the canvas element to be inserted in DOM


	App.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		this.enableGamepad();

		requestAnimationFrame(function () {
			_this2.displayGamepadState();
		});
	};

	App.prototype.displayGamepadState = function displayGamepadState() {
		var _this3 = this;

		var gamepadStateElement = document.getElementById("gamepadState");
		this.setState(index__extends({}, this.state, {
			gamepadState: JSON.stringify(ResponsiveGamepad.getState(), null, 4)
		}));

		requestAnimationFrame(function () {
			_this3.displayGamepadState();
		});
	};

	App.prototype.enableGamepad = function enableGamepad(keymap) {
		// Initialize our gamepad
		ResponsiveGamepad.enable(keymap);

		// Add our touch inputs
		var dpadElement = document.getElementById('gamepadDpad');
		var analogStickElement = document.getElementById('gamepadLeftAnalog');
		var startElement = document.getElementById('gamepadStart');
		var aElement = document.getElementById('gamepadA');
		var bElement = document.getElementById('gamepadB');

		ResponsiveGamepad.addTouchInput(dpadElement, 'DPAD');
		ResponsiveGamepad.addTouchInput(analogStickElement, 'ANALOG', 'LEFT');
		ResponsiveGamepad.addTouchInput(aElement, 'BUTTON', RESPONSIVE_GAMEPAD_KEYS.A);
		ResponsiveGamepad.addTouchInput(bElement, 'BUTTON', RESPONSIVE_GAMEPAD_KEYS.B);
		ResponsiveGamepad.addTouchInput(startElement, 'BUTTON', RESPONSIVE_GAMEPAD_KEYS.START);

		this.setState(index__extends({}, this.state, {
			touchSelectId: undefined
		}));
		this.toggleTouchSelectInput();
	};

	App.prototype.enableGameboyKeymap = function enableGameboyKeymap() {
		this.enableGamepad(KEYMAP$1());
	};

	App.prototype.disableGamepad = function disableGamepad() {
		ResponsiveGamepad.disable();

		this.setState(index__extends({}, this.state, {
			touchSelectId: undefined
		}));
	};

	App.prototype.toggleResponsiveGamepad = function toggleResponsiveGamepad() {
		if (ResponsiveGamepad.isEnabled()) {
			this.disableGamepad();
		} else {
			this.enableGamepad();
		}
	};

	App.prototype.toggleTouchSelectInput = function toggleTouchSelectInput() {
		if (this.state.touchSelectId) {
			ResponsiveGamepad.removeTouchInput(this.state.touchSelectId);
			this.setState(index__extends({}, this.state, {
				touchSelectId: undefined
			}));
		} else {

			var selectElement = document.getElementById('gamepadSelect');
			var touchSelectId = ResponsiveGamepad.addTouchInput(selectElement, 'BUTTON', RESPONSIVE_GAMEPAD_KEYS.SELECT);

			this.setState({
				touchSelectId: touchSelectId
			});
		}
	};

	App.prototype.render = function render() {
		var _this4 = this;

		return Object(preact_min["h"])(
			'div',
			null,
			_ref,
			_ref2,
			_ref3,
			Object(preact_min["h"])(
				'div',
				{ 'class': 'gamepadState' },
				_ref4,
				Object(preact_min["h"])(
					'div',
					null,
					'Enabled: ',
					ResponsiveGamepad.isEnabled().toString()
				),
				Object(preact_min["h"])(
					'div',
					null,
					'Is Ignoring Keyboard Input from Focusing on Input Element: ',
					ResponsiveGamepad.isIgnoringKeyEvents().toString()
				),
				Object(preact_min["h"])(
					'pre',
					{ id: 'gamepadState' },
					this.state.gamepadState
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'addRemoveTouch' },
				_ref5,
				_ref6,
				Object(preact_min["h"])(
					'div',
					null,
					Object(preact_min["h"])(
						'button',
						{ onClick: function onClick() {
								return _this4.toggleResponsiveGamepad();
							} },
						ResponsiveGamepad.isEnabled() ? 'Disable Responsive Gamepad' : 'Enable Default Responsive Gamepad'
					)
				),
				_ref7,
				Object(preact_min["h"])(
					'div',
					null,
					Object(preact_min["h"])(
						'button',
						{ onClick: function onClick() {
								return _this4.enableGameboyKeymap();
							}, disabled: ResponsiveGamepad.isEnabled() },
						'Enable Gameboy Keymap'
					)
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'dynamicTouchInput' },
				_ref8,
				_ref9,
				Object(preact_min["h"])(
					'div',
					null,
					Object(preact_min["h"])(
						'button',
						{ onClick: function onClick() {
								return _this4.toggleTouchSelectInput();
							}, disabled: !ResponsiveGamepad.isEnabled() },
						this.state.touchSelectId ? 'Disable SELECT Touch Input (current Id: ' + this.state.touchSelectId + ')' : 'Enable SELECT Touch Input'
					)
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'preventDefault' },
				_ref10,
				_ref11,
				_ref12,
				_ref13,
				_ref14,
				_ref15,
				Object(preact_min["h"])(
					'button',
					{ onClick: function onClick() {
							console.log('I was the button your pressed a key on.');
						} },
					'Press space on me, and check your logs!'
				),
				_ref16,
				_ref17
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'gamepad' },
				_ref18,
				_ref19,
				_ref20,
				_ref21,
				_ref22,
				_ref23
			)
		);
	};

	return App;
}(preact_min["Component"]);



/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map