(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ResponsiveGamepad = {}));
}(this, function (exports) { 'use strict';

  class ResponsiveGamepadService {
    constructor() {
      console.log('constructor');
    }

  }

  const ResponsiveGamepad = new ResponsiveGamepadService();

  exports.ResponsiveGamepad = ResponsiveGamepad;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
