'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = function (instance, Constructor) {
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

var defineProperty = function (obj, key, value) {
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

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
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

  // Define our keymap keys
};var responsiveGamepadKeys = {
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

  var stringId = '' + idGenerator() + idGenerator();
  return stringId.slice();
}

function getKeyInput(keyCode) {
  var input = Object.assign({}, keyInputSchema);
  input.ID = getInputId();
  input.KEY_CODE = keyCode;
  return input;
}

function getGamepadInput(gamepadButtonId, axisId, axisIsPositive) {
  var input = Object.assign({}, gamepadInputSchema);
  input.ID = getInputId();
  input.JOYSTICK = Object.assign({}, gamepadInputSchema.JOYSTICK);
  if (gamepadButtonId || gamepadButtonId === 0) {
    input.BUTTON_ID = gamepadButtonId;
  } else if (axisId !== undefined && axisIsPositive !== undefined) {
    input.JOYSTICK.AXIS_ID = axisId;
    input.JOYSTICK.IS_POSITIVE = axisIsPositive;
  }
  return input;
}

function getTouchInput(element, eventHandler, inputType) {
  var touchInput = Object.assign({}, touchInputSchema);

  touchInput.ID = getInputId();

  // TODO: Check the type for a valid type

  // Add our passed parameters
  touchInput.ELEMENT = element;
  touchInput.EVENT_HANDLER = eventHandler;
  touchInput.TYPE = inputType;

  // If DPAD type, get the direction
  if (touchInput.TYPE === 'DPAD') {
    touchInput.DIRECTION = arguments[3];
  }

  // Add our bounding rect
  var boundingRect = touchInput.ELEMENT.getBoundingClientRect();
  touchInput.BOUNDING_RECT = boundingRect;

  // Define our eventListener functions
  var eventListenerCallback = function eventListenerCallback(event) {
    if (touchInput.EVENT_HANDLER) {
      touchInput.EVENT_HANDLER(touchInput, event);
    }
  };

  // Add event listeners to the element
  touchInput.ELEMENT.addEventListener("touchstart", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("touchmove", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("touchend", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mousedown", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mouseup", eventListenerCallback);

  return touchInput;
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

// Reset all Direction keys for a DPAD for touch Inputs
function resetTouchDpad() {
  var _this = this;

  var dpadKeys = [RESPONSIVE_GAMEPAD_KEYS.DPAD_UP, RESPONSIVE_GAMEPAD_KEYS.DPAD_RIGHT, RESPONSIVE_GAMEPAD_KEYS.DPAD_DOWN, RESPONSIVE_GAMEPAD_KEYS.DPAD_LEFT];

  dpadKeys.forEach(function (dpadKey) {
    _this.keyMap[dpadKey].TOUCHPAD.forEach(function (touchInput) {
      touchInput.ACTIVE = false;
    });
  });
}

// Function to update touch button position and size
function updateTouchpadRect() {
  var _this2 = this;

  // Read from the DOM, and get each of our elements position, doing this here, as it is best to read from the dom in sequence
  // use element.getBoundingRect() top, bottom, left, right to get clientX and clientY in touch events :)
  // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
  //console.log("GamepadComponent: Updating Rect()...");
  this.keyMapKeys.forEach(function (key) {
    _this2.keyMap[key].TOUCHPAD.forEach(function (touchInput, index) {
      var boundingRect = _this2.keyMap[key].TOUCHPAD[index].ELEMENT.getBoundingClientRect();
      _this2.keyMap[key].TOUCHPAD[index].BOUNDING_RECT = boundingRect;
    });
  });
}

// Function called on an event of a touchInput SVG Element
function updateTouchpad(keyMapKey, touchInput, event) {

  if (!this.enabled) {
    return;
  }

  if (!event || event.type.includes('touch') && !event.touches) return;

  //event.stopPropagation();
  event.preventDefault();

  // Check for active event types
  if (event.type === "touchstart" || event.type === "touchmove" || event.type === "mousedown") {
    // Active

    if (touchInput.TYPE === 'DPAD') {

      // Calculate for the correct key
      // Only using the first touch, since we shouldn't be having two fingers on the dpad
      var touch = void 0;
      if (event.type.includes('touch')) {
        touch = event.touches[0];
      } else if (event.type.includes('mouse')) {
        touch = event;
      }

      // Find if the horizontal or vertical influence is greater
      // Find our centers of our rectangles, and our unbiased X Y values on the rect
      var rectCenterX = (touchInput.BOUNDING_RECT.right - touchInput.BOUNDING_RECT.left) / 2;
      var rectCenterY = (touchInput.BOUNDING_RECT.bottom - touchInput.BOUNDING_RECT.top) / 2;
      var touchX = touch.clientX - touchInput.BOUNDING_RECT.left;
      var touchY = touch.clientY - touchInput.BOUNDING_RECT.top;

      // Lesson From: picoDeploy
      // Fix for shoot button causing the character to move right on multi touch error
      // + 50 for some buffer
      if (touchX > rectCenterX + touchInput.BOUNDING_RECT.width / 2 + 50) {
        // Ignore the event
        return;
      }

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

          if (isLeft && touchInput.DIRECTION === 'LEFT') {
            touchInput.ACTIVE = true;
          } else if (!isLeft && touchInput.DIRECTION === 'RIGHT') {
            touchInput.ACTIVE = true;
          } else {
            touchInput.ACTIVE = false;
          }
        }
      } else {
        var isUp = touchY < touchInput.BOUNDING_RECT.height / 2;
        if (isUp && touchInput.DIRECTION === 'UP') {
          touchInput.ACTIVE = true;
        } else if (!isUp && touchInput.DIRECTION === 'DOWN') {
          touchInput.ACTIVE = true;
        } else {
          touchInput.ACTIVE = false;
        }
      }
    }

    // Button Type
    if (touchInput.TYPE === 'BUTTON') {
      touchInput.ACTIVE = true;
    }
  } else {
    // Not active

    // Handle Dpad Type
    if (touchInput.TYPE === 'DPAD') {
      resetTouchDpad.bind(this)();
    }

    // Button Type
    if (touchInput.TYPE === 'BUTTON') {
      touchInput.ACTIVE = false;
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

var keymap = KeyMapSchema();

// Dpad Up
keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.ARROW_UP));
keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.NUMPAD_8));
keymap.DPAD_UP.GAMEPAD.push(getGamepadInput(12));

// Left Analog Up
keymap.LEFT_ANALOG_UP.KEYBOARD.push(getKeyInput(Key.W));
keymap.LEFT_ANALOG_UP.GAMEPAD.push(getGamepadInput(false, 1, false));

// Right Analog Up
keymap.RIGHT_ANALOG_UP.KEYBOARD.push(getKeyInput(Key.I));
keymap.RIGHT_ANALOG_UP.GAMEPAD.push(getGamepadInput(false, 3, false));

// Dpad Right
keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.ARROW_RIGHT));
keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.NUMPAD_6));
keymap.DPAD_RIGHT.GAMEPAD.push(getGamepadInput(15));

// Left Analog Right
keymap.LEFT_ANALOG_RIGHT.KEYBOARD.push(getKeyInput(Key.D));
keymap.LEFT_ANALOG_RIGHT.GAMEPAD.push(getGamepadInput(false, 0, true));

// Right Analog Right
keymap.RIGHT_ANALOG_RIGHT.KEYBOARD.push(getKeyInput(Key.L));
keymap.RIGHT_ANALOG_RIGHT.GAMEPAD.push(getGamepadInput(false, 2, true));

// Dpad Down
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.ARROW_DOWN));
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.NUMPAD_5));
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.NUMPAD_2));
keymap.DPAD_DOWN.GAMEPAD.push(getGamepadInput(13));

// Left Analog Down
keymap.LEFT_ANALOG_DOWN.KEYBOARD.push(getKeyInput(Key.S));
keymap.LEFT_ANALOG_DOWN.GAMEPAD.push(getGamepadInput(false, 1, true));

// Right Analog Down
keymap.RIGHT_ANALOG_DOWN.KEYBOARD.push(getKeyInput(Key.K));
keymap.RIGHT_ANALOG_DOWN.GAMEPAD.push(getGamepadInput(false, 3, true));

// Dpad Left
keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.ARROW_LEFT));
keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.NUMPAD_4));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(14));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(false, 0, false));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(false, 2, false));

// Left Analog Left
keymap.LEFT_ANALOG_LEFT.KEYBOARD.push(getKeyInput(Key.A));
keymap.LEFT_ANALOG_LEFT.GAMEPAD.push(getGamepadInput(false, 0, false));

// Right Analog Left
keymap.RIGHT_ANALOG_LEFT.KEYBOARD.push(getKeyInput(Key.J));
keymap.RIGHT_ANALOG_LEFT.GAMEPAD.push(getGamepadInput(false, 2, false));

// A
keymap.A.KEYBOARD.push(getKeyInput(Key.X));
keymap.A.KEYBOARD.push(getKeyInput(Key.SEMI_COLON));
keymap.A.KEYBOARD.push(getKeyInput(Key.NUMPAD_7));
keymap.A.GAMEPAD.push(getGamepadInput(0));

// B
keymap.B.KEYBOARD.push(getKeyInput(Key.Z));
keymap.B.KEYBOARD.push(getKeyInput(Key.ESCAPE));
keymap.B.KEYBOARD.push(getKeyInput(Key.SINGLE_QUOTE));
keymap.B.KEYBOARD.push(getKeyInput(Key.BACKSPACE));
keymap.B.KEYBOARD.push(getKeyInput(Key.NUMPAD_9));
keymap.B.GAMEPAD.push(getGamepadInput(1));

// X
keymap.X.KEYBOARD.push(getKeyInput(Key.C));
keymap.X.GAMEPAD.push(getGamepadInput(2));

// Y
keymap.Y.KEYBOARD.push(getKeyInput(Key.V));
keymap.Y.GAMEPAD.push(getGamepadInput(3));

// Left Trigger
keymap.LEFT_TRIGGER.KEYBOARD.push(getKeyInput(Key.Q));
keymap.LEFT_TRIGGER.GAMEPAD.push(getGamepadInput(6));

// Left Bumper
keymap.LEFT_BUMPER.KEYBOARD.push(getKeyInput(Key.E));
keymap.LEFT_BUMPER.GAMEPAD.push(getGamepadInput(4));

// Right Trigger
keymap.RIGHT_TRIGGER.KEYBOARD.push(getKeyInput(Key.U));
keymap.RIGHT_TRIGGER.GAMEPAD.push(getGamepadInput(7));

// Right Bumper
keymap.RIGHT_BUMPER.KEYBOARD.push(getKeyInput(Key.O));
keymap.RIGHT_BUMPER.GAMEPAD.push(getGamepadInput(5));

// Start
keymap.START.KEYBOARD.push(getKeyInput(Key.RETURN));
keymap.START.KEYBOARD.push(getKeyInput(Key.SPACE));
keymap.START.KEYBOARD.push(getKeyInput(Key.NUMPAD_3));
keymap.START.GAMEPAD.push(getGamepadInput(9));

// Select
keymap.SELECT.KEYBOARD.push(getKeyInput(Key.SHIFT));
keymap.SELECT.KEYBOARD.push(getKeyInput(Key.TAB));
keymap.SELECT.KEYBOARD.push(getKeyInput(Key.BACK_SLASH));
keymap.SELECT.KEYBOARD.push(getKeyInput(Key.NUMPAD_1));
keymap.SELECT.GAMEPAD.push(getGamepadInput(8));

// Special
keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.ALT));
keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.CTRL));
keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.META));
keymap.SELECT.GAMEPAD.push(getGamepadInput(16));

var KEYMAP = function KEYMAP() {
  return JSON.parse(JSON.stringify(keymap));
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
    this.keyMapKeys = Object.keys(KeyMapSchema());
    this.keyMap = KEYMAP();
    this.enabled = false;
    this.addedEventListeners = false;
  }

  createClass(ResponsiveGamepadService, [{
    key: 'enable',
    value: function enable(keyMap) {

      // TODO: Verify it is a valid keymap passed
      if (keyMap) {
        this.keyMap = keyMap;
      }

      // Add our key event listeners
      // Wrapping in this for preact prerender
      if (!this.addedEventListeners && typeof window !== "undefined") {
        window.addEventListener('keyup', updateKeyboard.bind(this));
        window.addEventListener('keydown', updateKeyboard.bind(this));
        // Add a resize listen to update the gamepad rect on resize
        window.addEventListener("resize", updateTouchpadRect.bind(this));

        this.addedEventListeners = true;
      }

      this.enabled = true;
    }

    // Disable responsive gamepad, and remove all the listeners

  }, {
    key: 'disable',
    value: function disable() {
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
    value: function addTouchInput(keyMapKey, element, inputType) {
      var _this = this;

      // Create our touch handler
      var touchHandler = function touchHandler(touchInput, event) {
        updateTouchpad.bind(_this)(keyMapKey, touchInput, event);
      };

      // Create the arguments that will be passed to getTouchInput,
      // Last element is a spread of any additional passed arguments
      var originalArguments = [].concat(Array.prototype.slice.call(arguments));
      var touchInputArguments = [element, touchHandler, inputType].concat(toConsumableArray(originalArguments.slice(3)));

      // Declare our touch input
      var touchInput = void 0;
      touchInput = getTouchInput.apply(undefined, toConsumableArray(touchInputArguments));

      // Add the input to our keymap
      this.keyMap[keyMapKey].TOUCHPAD.push(touchInput);

      // Return the touchInput ID so that is may be removed later
      return touchInput.ID;
    }
  }, {
    key: 'removeTouchInput',
    value: function removeTouchInput(keyMapKey, touchInputId) {
      // Search for the input in our touch pad for every key
      var touchInputIndex = undefined;

      this.keyMap[keyMapKey].TOUCHPAD.some(function (input, index) {
        if (input.ID === touchInputId) {
          touchInputIndex = index;
          return true;
        }

        return false;
      });

      // If we found the key and index, remove the touch input
      if (touchInputIndex !== undefined) {
        this.keyMap[keyMapKey].TOUCHPAD.splice(touchInputIndex, 1);
        return true;
      }

      return false;
    }
  }, {
    key: 'getState',
    value: function getState() {
      var _this2 = this;

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
      this.keyMapKeys.forEach(function (key) {

        // Find if any of the keyboard, gamepad or touchpad buttons are pressed
        var keyboardState = _this2.keyMap[key].KEYBOARD.some(function (keyInput) {
          return keyInput.ACTIVE;
        });

        if (keyboardState) {
          controllerState[key] = true;
          return;
        }

        // Find if any of the keyboard, gamepad or touchpad buttons are pressed
        var gamepadState = _this2.keyMap[key].GAMEPAD.some(function (gamepadInput) {
          return gamepadInput.ACTIVE;
        });

        if (gamepadState) {
          controllerState[key] = true;
          return;
        }

        // Find if any of the keyboard, gamepad or touchpad buttons are pressed
        var touchState = _this2.keyMap[key].TOUCHPAD.some(function (touchInput) {
          return touchInput.ACTIVE;
        });

        if (touchState) {
          controllerState[key] = true;
          return;
        }

        controllerState[key] = false;
      });

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

      // Get our Analog Stick Axis
      var gamepad = getGamepads()[0];
      if (gamepad) {
        controllerState.LEFT_ANALOG_HORIZONTAL_AXIS = getAnalogStickAxis(gamepad, 0);
        controllerState.LEFT_ANALOG_VERTICAL_AXIS = getAnalogStickAxis(gamepad, 1);
        controllerState.RIGHT_ANALOG_HORIZONTAL_AXIS = getAnalogStickAxis(gamepad, 2);
        controllerState.RIGHT_ANALOG_VERTICAL_AXIS = getAnalogStickAxis(gamepad, 3);
      } else {
        controllerState.LEFT_ANALOG_HORIZONTAL_AXIS = analogBooleanToAxis(controllerState.LEFT_ANALOG_RIGHT, controllerState.LEFT_ANALOG_LEFT);
        controllerState.LEFT_ANALOG_VERTICAL_AXIS = analogBooleanToAxis(controllerState.LEFT_ANALOG_DOWN, controllerState.LEFT_ANALOG_UP);

        controllerState.RIGHT_ANALOG_HORIZONTAL_AXIS = analogBooleanToAxis(controllerState.RIGHT_ANALOG_RIGHT, controllerState.RIGHT_ANALOG_LEFT);
        controllerState.RIGHT_ANALOG_VERTICAL_AXIS = analogBooleanToAxis(controllerState.RIGHT_ANALOG_DOWN, controllerState.RIGHT_ANALOG_UP);
      }

      // Return the controller state in case we need something from it
      return controllerState;
    }
  }]);
  return ResponsiveGamepadService;
}();

// Exports


var ResponsiveGamepad = new ResponsiveGamepadService();

exports.ResponsiveGamepad = ResponsiveGamepad;
exports.RESPONSIVE_GAMEPAD_KEYS = RESPONSIVE_GAMEPAD_KEYS;
exports.KEYMAP = KEYMAP;
exports.KEYMAP_DEFAULT = KEYMAP;
exports.KEYMAP_GAMEBOY = KEYMAP$1;
