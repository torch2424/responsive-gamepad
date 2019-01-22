'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) {
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
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

const RESPONSIVE_GAMEPAD_INPUTS = {
  DPAD_UP: 'DPAD_UP',
  DPAD_RIGHT: 'DPAD_RIGHT',
  DPAD_DOWN: 'DPAD_DOWN',
  DPAD_LEFT: 'DPAD_LEFT',
  LEFT_ANALOG_HORIZONTAL_AXIS: 'LEFT_ANALOG_HORIZONTAL_AXIS',
  LEFT_ANALOG_VERTICAL_AXIS: 'LEFT_ANALOG_VERTICAL_AXIS',
  LEFT_ANALOG_UP: 'LEFT_ANALOG_UP',
  LEFT_ANALOG_RIGHT: 'LEFT_ANALOG_RIGHT',
  LEFT_ANALOG_DOWN: 'LEFT_ANALOG_DOWN',
  LEFT_ANALOG_LEFT: 'LEFT_ANALOG_LEFT',
  RIGHT_ANALOG_HORIZONTAL_AXIS: 'RIGHT_ANALOG_HORIZONTAL_AXIS',
  RIGHT_ANALOG_VERTICAL_AXIS: 'RIGHT_ANALOG_VERTICAL_AXIS',
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
};

// Keymaps should all be using: KeyboardEvent.code
function setDefaultKeymap(ResponsiveGamepad) {
  // Up
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ArrowUp", "Numpad8"], RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyW"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyI"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([12], RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP); //Right

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ArrowRight", "Numpad6"], RESPONSIVE_GAMEPAD_INPUTS.DPAD_RIGHT);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyD"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_RIGHT);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyL"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_RIGHT);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([15], RESPONSIVE_GAMEPAD_INPUTS.DPAD_RIGHT); // Down

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ArrowDown", "Numpad5", "Numpad2"], RESPONSIVE_GAMEPAD_INPUTS.DPAD_DOWN);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyS"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_DOWN);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyK"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_DOWN);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([13], RESPONSIVE_GAMEPAD_INPUTS.DPAD_DOWN); // Left

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ArrowLeft", "Numpad4"], RESPONSIVE_GAMEPAD_INPUTS.DPAD_LEFT);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyA"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_LEFT);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyJ"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_LEFT);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([14], RESPONSIVE_GAMEPAD_INPUTS.DPAD_LEFT); // Left Analog Axis

  ResponsiveGamepad.Gamepad.setGamepadAxisToResponsiveGamepadInput([0], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_HORIZONTAL_AXIS);
  ResponsiveGamepad.Gamepad.setGamepadAxisToResponsiveGamepadInput([1], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_VERTICAL_AXIS); // Right Analog Axis

  ResponsiveGamepad.Gamepad.setGamepadAxisToResponsiveGamepadInput([2], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_HORIZONTAL_AXIS);
  ResponsiveGamepad.Gamepad.setGamepadAxisToResponsiveGamepadInput([3], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_VERTICAL_AXIS); // A

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyX", "Semicolon", "Numpad7"], RESPONSIVE_GAMEPAD_INPUTS.A);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([0], RESPONSIVE_GAMEPAD_INPUTS.A); // B

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyZ", "Escape", "Quote", "Backspace", "Numpad9"], RESPONSIVE_GAMEPAD_INPUTS.B);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([1], RESPONSIVE_GAMEPAD_INPUTS.B); // X

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyC"], RESPONSIVE_GAMEPAD_INPUTS.X);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([2], RESPONSIVE_GAMEPAD_INPUTS.X); // Y

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyV"], RESPONSIVE_GAMEPAD_INPUTS.Y);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([3], RESPONSIVE_GAMEPAD_INPUTS.Y); // Left Trigger

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyQ"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_TRIGGER);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([6], RESPONSIVE_GAMEPAD_INPUTS.LEFT_TRIGGER); // Left Bumper

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyE"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_BUMPER);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([4], RESPONSIVE_GAMEPAD_INPUTS.LEFT_BUMPER); // Right Trigger

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyU"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_TRIGGER);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([7], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_TRIGGER); // Right Bumper

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyO"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_BUMPER);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([5], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_BUMPER); // Start

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["Enter", "Numpad3"], RESPONSIVE_GAMEPAD_INPUTS.START);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([9], RESPONSIVE_GAMEPAD_INPUTS.START); // Select

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ShiftRight", "ShiftLeft", "Tab", "Numpad1"], RESPONSIVE_GAMEPAD_INPUTS.SELECT);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([8], RESPONSIVE_GAMEPAD_INPUTS.SELECT); // Special

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["Space", "Backslash", "Backquote"], RESPONSIVE_GAMEPAD_INPUTS.SPECIAL);
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput([16], RESPONSIVE_GAMEPAD_INPUTS.SPECIAL);
}

// Base Class for all input sources
class InputSource {
  constructor() {}

  enable() {
    throw new Error('enable() must be overridden');
  }

  disable() {
    throw new Error('disable() must be overridden');
  }

  getState() {
    throw new Error('getState() must be overridden');
  }

}

// https://www.w3schools.com/tags/ref_byfunc.asp

const INPUT_HTML_TAGS = ['input', 'textarea', 'button', 'select', 'option', 'optgroup', 'label', 'datalist']; // Modified Keys Ignored
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState

const MODIFIER_KEYS = ["Alt", "Control", "Meta", "OS"];
class KeyboardInputSource extends InputSource {
  constructor() {
    super(); // Create our keymap to our inputs

    this.keymap = {};
    Object.keys(RESPONSIVE_GAMEPAD_INPUTS).forEach(input => {
      this.keymap[input] = {
        keys: [],
        value: undefined
      };
    }); // Some settings pertaining to the keyboard

    this.enableIgnoreWhenInputElementFocused();
    this.enableIgnoreWhenModifierState(); // Our bound updateFunction

    this._boundUpdateKeymapValues = this._updateKeymapValues.bind(this);
  }

  enable() {
    if (typeof window === "undefined") {
      throw new Error('Keyboard can only be used with a browser environment');
      return;
    }

    window.addEventListener('keyup', this._boundUpdateKeymapValues);
    window.addEventListener('keydown', this._boundUpdateKeymapValues);
  }

  disable() {
    if (typeof window === "undefined") {
      throw new Error('Keyboard can only be used with a browser environment');
      return;
    }

    window.removeEventListener('keyup', this._boundUpdateKeymapValues);
    window.removeEventListener('keydown', this._boundUpdateKeymapValues);
  }

  getState() {
    const state = _objectSpread({}, RESPONSIVE_GAMEPAD_INPUTS);

    Object.keys(this.keymap).forEach(key => {
      state[key] = this.keymap[key].value;
    }); // Remove any remainig strings I may have

    Object.keys(state).forEach(stateKey => {
      if (typeof state[stateKey] === 'string') {
        delete state[stateKey];
      }
    });
    return state;
  }

  enableIgnoreWhenInputElementFocused() {
    this.ignoreWhenInputElementFocused = true;
  }

  disableIgnoreWhenInputElementFocused() {
    this.ignoreWhenInputElementFocused = false;
  }

  enableIgnoreWhenModifierState() {
    this.ignoreOnModifierState = true;
  }

  disableIgnoreWhenModifierState() {
    this.ignoreOnModifierState = false;
  }

  setKeysToResponsiveGamepadInput(codes, responsiveGamepadInput) {
    if (!codes || !responsiveGamepadInput || codes.length === 0) {
      throw new Error('Could not set the specificed keyboard keys to input');
    }

    if (typeof codes === 'string') {
      codes = [codes];
    }

    this.keymap[responsiveGamepadInput].keys = codes;
  }

  _isFocusedOnInputElement() {
    return INPUT_HTML_TAGS.some(htmlTag => {
      if (document.activeElement && document.activeElement.tagName.toLowerCase() === htmlTag.toLowerCase()) {
        return true;
      }

      return false;
    });
  }

  _isInModifierState(event) {
    return MODIFIER_KEYS.some(key => event.getModifierState(key) || event.code === key);
  }

  _updateKeymapValues(event) {
    // Check if we should be ignoring the event
    if (this.ignoreWhenInputElementFocused && this._isFocusedOnInputElement()) {
      return;
    }

    if (this.ignoreOnModifierState && this._isInModifierState(event)) {
      return;
    }

    event.preventDefault(); // Update the keymap accordingly to the key event

    Object.keys(this.keymap).some(key => {
      return this.keymap[key].keys.some(code => {
        if (code === event.code) {
          if (event.type === 'keydown') {
            this.keymap[key].value = true;
          } else {
            this.keymap[key].value = false;
          }

          return true;
        }

        return false;
      });
    });
  }

}

class GamepadInputSource extends InputSource {
  constructor() {
    super();
    this.gamepadAnalogStickDeadZone = 0.25;
    this.keymap = {};
  }

  enable() {}

  disable() {}

  getState(gamepadIndex) {
    const gamepads = this._getGamepads(); // Check our gamepadIndex


    if (!gamepadIndex) {
      gamepadIndex = 0;
    } // Get our current gamepad


    let gamepad = gamepads[gamepadIndex];

    if (!gamepad) {
      return false;
    }

    Object.keys(this.keymap).forEach(input => {
      if (this.keymap[input].buttons) {
        this.keymap[input].value = this.keymap[input].buttons.some(button => this._isButtonPressed(gamepad, button));
      } else if (this.keymap[input].axis) {
        let value = this._getAnalogStickAxis(gamepad, this.keymap[input].axis);

        this.keymap[input].value = value;
      }
    });

    const state = _objectSpread({}, RESPONSIVE_GAMEPAD_INPUTS);

    Object.keys(this.keymap).forEach(input => {
      state[input] = this.keymap[input].value;
    }); // Get our analog up, right, down, left

    state[RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_DOWN] = state.LEFT_ANALOG_VERTICAL_AXIS > this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP] = state.LEFT_ANALOG_VERTICAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_RIGHT] = state.LEFT_ANALOG_HORIZONTAL_AXIS > this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_LEFT] = state.LEFT_ANALOG_HORIZONTAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_DOWN] = state.RIGHT_ANALOG_VERTICAL_AXIS > this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP] = state.RIGHT_ANALOG_VERTICAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_RIGHT] = state.RIGHT_ANALOG_HORIZONTAL_AXIS > this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_LEFT] = state.RIGHT_ANALOG_HORIZONTAL_AXIS < -1 * this.gamepadAnalogStickDeadZone; // Remove any remainig strings I may have

    Object.keys(state).forEach(stateKey => {
      if (typeof state[stateKey] === 'string') {
        delete state[stateKey];
      }
    });
    return state;
  }

  setGamepadButtonsToResponsiveGamepadInput(buttons, responsiveGamepadInput) {
    if (!buttons || !responsiveGamepadInput || buttons.length === 0) {
      throw new Error('Could not set the specificed buttons to input');
    }

    if (typeof buttons === 'number') {
      buttons = [buttons];
    }

    this.keymap[responsiveGamepadInput] = {};
    this.keymap[responsiveGamepadInput].buttons = buttons;
  }

  setGamepadAxisToResponsiveGamepadInput(axis, responsiveGamepadInput) {
    if (axis === undefined || !responsiveGamepadInput) {
      throw new Error('Could not set the specificed buttons to input');
    }

    if (typeof axes === 'number') {
      throw new Error('Must pass in an axis id');
    }

    this.keymap[responsiveGamepadInput] = {};
    this.keymap[responsiveGamepadInput].axis = axis;
  }

  _isButtonPressed(gamepad, buttonId) {
    return gamepad.buttons[buttonId] ? gamepad.buttons[buttonId].pressed : false;
  }

  _getGamepads() {
    // Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
    // Gampad Diagram: https://w3c.github.io/gamepad/#remapping
    return navigator.getGamepads ? navigator.getGamepads() : [];
  } // Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js


  _getAnalogStickAxis(gamepad, axisId) {
    if (gamepad) {
      return gamepad.axes[axisId] || 0.0;
    }

    return 0.0;
  }

}

// Base class for all touch input types
const touchEvents = ["touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseleave"];
class TouchInputType {
  constructor(element) {
    if (!element) {
      throw new Error('Touch inputs require an element.');
      return;
    } // Listeners for events we are waiting for


    this.listeners = [];
    this.element = element;

    this._addTouchStyles();

    this.boundingClientRect = undefined;

    this._updateElementBoundingClientRect(); // Whether or not the current input is "active"
    // E.g a mouse down event has occurded, but no mouse up


    this.active = false;
    this.boundUpdateElementRect = this._updateElementBoundingClientRect.bind(this);
    this.boundTouchEvent = this._touchEvent.bind(this);
  }

  remove() {
    this._removeTouchStyles();

    this.stopListening();
    this.element = undefined;
  }

  listen() {
    if (!this.element) {
      throw new Error('You must supply an element first with add()');
      return;
    }

    window.addEventListener("resize", this.boundUpdateElementRect);
    touchEvents.forEach(touchEvent => {
      this.element.addEventListener(touchEvent, this.boundTouchEvent);
    });
  }

  stopListening() {
    if (!this.element) {
      throw new Error('You must supply an element first with add()');
      return;
    }

    window.removeEventListener("resize", this.boundUpdateElementRect);
    touchEvents.forEach(touchEvent => {
      this.element.removeEventListener(touchEvent, this.boundTouchEvent);
    });
  }

  _touchEvent(event) {
    if (!event || event.type.includes('touch') && !event.touches) return;
    event.preventDefault(); // Determine if it is an active event (Input is pressed down)
    // or not active (Input is released)

    const isActiveEvent = event.type === "touchstart" || event.type === "touchmove" || event.type === "mousedown";
    const isNeutralEvent = event.type === "mousemove";
    const isInactiveEvent = !isActiveEvent && !isNeutralEvent;

    this._updateActiveStatus(isActiveEvent, isInactiveEvent);

    this._updateTouchStyles(isActiveEvent, isNeutralEvent, isInactiveEvent);

    if (this.onTouchEvent) {
      this.onTouchEvent(event, isActiveEvent, isNeutralEvent, isInactiveEvent);
    }
  }

  _updateElementBoundingClientRect() {
    // Read from the DOM, and get each of our elements position, doing this here, as it is best to read from the dom in sequence
    // use element.getBoundingRect() top, bottom, left, right to get clientX and clientY in touch events :)
    // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
    this.boundingClientRect = this.element.getBoundingClientRect();
  }

  _addTouchStyles() {
    // Add some styles to stop common UX errors
    // Like selecting text on the element;
    this.element.style.userSelect = 'none';
  }

  _removeTouchStyles() {
    this.element.style.userSelect = '';
  }

  _updateTouchStyles(isActiveEvent, isNeutralEvent) {
    if (isNeutralEvent) {
      return;
    } // Add classes to show if the input is active or not


    if (isActiveEvent) {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }

  _updateActiveStatus(isActiveEvent, isInactiveEvent) {
    if (this.active && isInactiveEvent) {
      this.active = false;
    } else if (!this.active && isActiveEvent) {
      this.active = true;
    }
  }

}

function getDirectionalTouch(event, boundingClientRect) {
  // We will need these  calculations for when if we are dpad or analog
  // Calculate for the correct key
  // Only using the first touch, since we shouldn't be having two fingers on the dpad
  let touch;

  if (event.type.includes('touch')) {
    touch = event.touches[0];
  } else if (event.type.includes('mouse')) {
    touch = event;
  } // We will need these  calculations for when if we are dpad or analog
  // Find our centers of our rectangles, and our unbiased X Y values on the rect


  const rectCenterX = (boundingClientRect.right - boundingClientRect.left) / 2;
  const rectCenterY = (boundingClientRect.bottom - boundingClientRect.top) / 2;
  const touchX = touch.clientX - boundingClientRect.left;
  const touchY = touch.clientY - boundingClientRect.top;
  return {
    rectCenterX,
    rectCenterY,
    touchX,
    touchY
  };
}

class TouchDpad extends TouchInputType {
  constructor(element, config) {
    super(element);

    if (config) {
      this.config = config;
    } else {
      this.config = {
        allowMultipleDirections: false
      };
    }

    this._resetState();
  }

  _resetState() {
    this.state = {
      DPAD_UP: false,
      DPAD_RIGHT: false,
      DPAD_DOWN: false,
      DPAD_LEFT: false
    };
  }

  onTouchEvent(event) {
    // If we are not in the active state,
    // simply reset and return
    if (!this.active) {
      this._resetState();

      return;
    } // Get our directional values


    const {
      rectCenterX,
      rectCenterY,
      touchX,
      touchY
    } = getDirectionalTouch(event, this.boundingClientRect); // Find if the horizontal or vertical influence is greater
    // Lesson From: picoDeploy
    // Fix for shoot button causing the character to move right on multi touch error
    // + 50 for some buffer

    if (touchX > rectCenterX + this.boundingClientRect.width / 2 + 50) {
      // Ignore the event
      return;
    } // We forsure know we have input
    // Reset previous DPAD State


    this._resetState(); // Get our deadzone


    const horizontalDeadzone = this.boundingClientRect.width / 20;
    const verticalDeadzone = this.boundingClientRect.height / 20; // Check if we are allowing multiple directions

    if (this.config.allowMultipleDirections) {
      this.setHorizontalState(touchX, horizontalDeadzone);
      this.setVerticalState(touchY, verticalDeadzone);
      return;
    } // Create an additonal influece for horizontal, to make it feel better


    const horizontalInfluence = this.boundingClientRect.width / 8; // Determine if we are horizontal or vertical

    const isHorizontal = Math.abs(rectCenterX - touchX) + horizontalInfluence > Math.abs(rectCenterY - touchY); // Find if left or right from width, vice versa for height

    if (isHorizontal) {
      this.setHorizontalState(touchX, horizontalDeadzone);
    } else {
      this.setVerticalState(touchY);
    }
  }

  setHorizontalState(touchX, deadzone) {
    if (deadzone && Math.abs(this.boundingClientRect.width / 2 - touchX) <= deadzone) {
      return;
    }

    const isLeft = touchX < this.boundingClientRect.width / 2;

    if (isLeft) {
      this.state.DPAD_LEFT = true;
    } else {
      this.state.DPAD_RIGHT = true;
    }
  }

  setVerticalState(touchY, deadzone) {
    if (deadzone && Math.abs(this.boundingClientRect.height / 2 - touchY) < deadzone) {
      return;
    }

    const isUp = touchY < this.boundingClientRect.height / 2;

    if (isUp) {
      this.state.DPAD_UP = true;
    } else {
      this.state.DPAD_DOWN = true;
    }
  }

}

class TouchAnalog extends TouchInputType {
  constructor(element) {
    super(element);

    this._resetState();
  }

  _resetState() {
    this.state = {
      HORIZONTAL_AXIS: 0,
      VERTICAL_AXIS: 0
    };
    this.element.style.transform = `translate(0px, 0px)`;
  }

  onTouchEvent(event) {
    // If we are not in the active state,
    // simply reset and return
    if (!this.active) {
      this._resetState();

      return;
    } // Get our directional values


    const {
      rectCenterX,
      rectCenterY,
      touchX,
      touchY
    } = getDirectionalTouch(event, this.boundingClientRect); // Find our Horizontal Axis

    const horizontalDifferenceFromCenter = touchX - rectCenterX;
    let horizontalAxis = horizontalDifferenceFromCenter / rectCenterX;

    if (horizontalAxis > 1) {
      horizontalAxis = 1.0;
    } else if (horizontalAxis < -1) {
      horizontalAxis = -1.0;
    } // Find our Vertical Axis


    const verticalDifferenceFromCenter = touchY - rectCenterY;
    let verticalAxis = verticalDifferenceFromCenter / rectCenterY;

    if (verticalAxis > 1) {
      verticalAxis = 1.0;
    } else if (verticalAxis < -1) {
      verticalAxis = -1.0;
    } // Apply styles to element


    const translateX = rectCenterX * horizontalAxis / 2;
    const translateY = rectCenterY * verticalAxis / 2;
    this.element.style.transform = `translate(${translateX}px, ${translateY}px)`; // Set Axis on keyMap

    this.state.HORIZONTAL_AXIS = horizontalAxis;
    this.state.VERTICAL_AXIS = verticalAxis;
  }

}

class TouchButton extends TouchInputType {
  constructor(element, input) {
    super(element);
    this.input = input;
  }

}

const ANALOG_TYPES = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};
class TouchInputInputSource extends InputSource {
  constructor() {
    super();
    this.enabled = false; // Organize our element maps to specific input types

    this.dpads = [];
    this.leftAnalogs = [];
    this.rightAnalogs = [];
    this.buttons = [];
  }

  enable() {
    if (typeof window === "undefined") {
      throw new Error('TouchInput can only be used with a browser environment');
      return;
    }

    this.enabled = true;
    this.dpads.forEach(dpad => dpad.listen());
    this.leftAnalogs.forEach(analog => analog.listen());
    this.rightAnalogs.forEach(analog => analog.listen());
    this.buttons.forEach(button => button.listen());
  }

  disable() {
    if (typeof window === "undefined") {
      throw new Error('TouchInput can only be used with a browser environment');
      return;
    }

    this.enabled = false;
    this.dpads.forEach(dpad => dpad.stopListening());
    this.leftAnalogs.forEach(analog => analog.stopListening());
    this.rightAnalogs.forEach(analog => analog.stopListening());
    this.buttons.forEach(button => button.stopListening());
  }

  getState() {
    const state = _objectSpread({}, RESPONSIVE_GAMEPAD_INPUTS);

    this.buttons.forEach(button => {
      state[button.input] = button.active;
    });
    this.dpads.forEach(dpad => {
      Object.keys(dpad.state).forEach(stateKey => {
        state[stateKey] = dpad.state[stateKey] || state[stateKey];
      });
    });

    if (this.leftAnalogs.length > 0) {
      state.LEFT_ANALOG_HORIZONTAL_AXIS = this.leftAnalogs[0].state.HORIZONTAL_AXIS;
      state.LEFT_ANALOG_VERTICAL_AXIS = this.leftAnalogs[0].state.VERTICAL_AXIS;
    }

    if (this.rightAnalogs.length > 0) {
      state.RIGHT_ANALOG_HORIZONTAL_AXIS = this.rightAnalogs[0].state.HORIZONTAL_AXIS;
      state.RIGHT_ANALOG_VERTICAL_AXIS = this.rightAnalogs[0].state.VERTICAL_AXIS;
    } // Remove any remainig strings I may have


    Object.keys(state).forEach(stateKey => {
      if (typeof state[stateKey] === 'string') {
        delete state[stateKey];
      }
    });
    return state;
  }

  addButtonInput(element, input) {
    const touchButton = new TouchButton(element, input);

    if (this.enabled) {
      touchButton.listen();
    }

    this.buttons.push(touchButton); // Return a function to remove

    return () => {
      touchButton.stopListening();
      this.buttons.splice(this.buttons.indexOf(touchButton), 1);
    };
  }

  addDpadInput(element, config) {
    const touchDpad = new TouchDpad(element, config);

    if (this.enabled) {
      touchDpad.listen();
    }

    this.dpads.push(touchDpad); // Return a function to remove

    return () => {
      touchDpad.stopListening();
      this.dpads.splice(this.dpads.indexOf(touchDpad), 1);
    };
  }

  addLeftAnalogInput(element) {
    this.addAnalogInput(element, ANALOG_TYPES.LEFT);
  }

  addRightAnalogInput(element) {
    this.addAnalogInput(element, ANALOG_TYPES.RIGHT);
  }

  addAnalogInput(element, analogType) {
    const touchAnalog = new TouchAnalog(element);

    if (this.enabled) {
      touchAnalog.listen();
    }

    if (analogType === ANALOG_TYPES.LEFT) {
      this.leftAnalogs.push(touchAnalog); // Return a function to remove

      return () => {
        touchAnalog.stopListening();
        this.leftAnalogs.splice(this.leftAnalogs.indexOf(touchAnalog), 1);
      };
    } else {
      this.rightAnalogs.push(touchAnalog); // Return a function to remove

      return () => {
        touchAnalog.stopListening();
        this.rightAnalogs.splice(this.rightAnalogs.indexOf(touchAnalog), 1);
      };
    }
  }

}

class ResponsiveGamepadService {
  constructor() {
    // Expose our constants
    this.RESPONSIVE_GAMEPAD_INPUTS = RESPONSIVE_GAMEPAD_INPUTS; // Some Settings

    this._enabled = false;
    this._multipleDirectionInput = true; // Our Input Sources

    this.Keyboard = new KeyboardInputSource();
    this.Gamepad = new GamepadInputSource();
    this.TouchInput = new TouchInputInputSource();
    setDefaultKeymap(this); // Our Plugins

    this.plugins = []; // On Input Change

    this.inputChangeMap = {};
    this.inputChangeOldState = {};
    this.cancelInputChangeListener = undefined;
  }

  enable() {
    // Enable Input Sources
    this.Keyboard.enable();
    this.Gamepad.enable();
    this.TouchInput.enable();

    if (Object.keys(this.inputChangeMap).length > 0) {
      this._startInputChangeInterval();
    }

    this._enabled = true;
  }

  disable() {
    // Disable Input Sources
    this.Keyboard.disable();
    this.Gamepad.disable();
    this.TouchInput.disable(); // Stop our InputChange Interval

    if (this.cancelInputChangeListener) {
      this.cancelInputChangeListener();
      this.cancelInputChangeListener = undefined;
    }

    this._enabled = false;
  }

  isEnabled() {
    return this._enabled;
  }

  addPlugin(pluginObject) {
    this.plugins.push(pluginObject);

    if (pluginObject.onAddPlugin) {
      pluginObject.onAddPlugin();
    }

    return () => {
      if (pluginObject.onRemovePlugin) {
        pluginObject.onRemovePlugin();
      }

      this.plugins.splice(this.plugins.indexOf(pluginObject), 1);
    };
  }

  getState() {
    if (!this._enabled) {
      return {};
    }

    let state = _objectSpread({}, RESPONSIVE_GAMEPAD_INPUTS);

    const gamepadState = this.Gamepad.getState();
    const touchInputState = this.TouchInput.getState();
    const keyboardState = this.Keyboard.getState();
    state = _objectSpread({}, RESPONSIVE_GAMEPAD_INPUTS);
    Object.keys(state).forEach(stateKey => {
      state[stateKey] = gamepadState[stateKey] || touchInputState[stateKey] || keyboardState[stateKey];
    }); // Force Axis to be a number

    const Axes = [RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_HORIZONTAL_AXIS, RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_VERTICAL_AXIS, RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_HORIZONTAL_AXIS, RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_VERTICAL_AXIS];
    Axes.forEach((axis, index) => {
      // Number type is what we want
      if (typeof state[axis] === 'number') {
        return;
      }

      if (index === 0 || index === 2) {
        if (state[RESPONSIVE_GAMEPAD_INPUTS.DPAD_RIGHT]) {
          state[axis] = 1;
        } else if (state[RESPONSIVE_GAMEPAD_INPUTS.DPAD_LEFT]) {
          state[axis] = -1;
        } else {
          state[axis] = 0;
        }
      }

      if (index === 1 || index === 3) {
        if (state[RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP]) {
          state[axis] = 1;
        } else if (state[RESPONSIVE_GAMEPAD_INPUTS.DPAD_DOWN]) {
          state[axis] = -1;
        } else {
          state[axis] = 0;
        }
      }
    }); // Add the generic Up, Down, Left, Right

    state.UP = state.DPAD_UP || state.LEFT_ANALOG_UP || state.RIGHT_ANALOG_UP;
    state.RIGHT = state.DPAD_RIGHT || state.LEFT_ANALOG_RIGHT || state.RIGHT_ANALOG_RIGHT;
    state.DOWN = state.DPAD_DOWN || state.LEFT_ANALOG_DOWN || state.RIGHT_ANALOG_DOWN;
    state.LEFT = state.DPAD_LEFT || state.LEFT_ANALOG_LEFT || state.RIGHT_ANALOG_LEFT; // Remove any remainig strings I may have

    Object.keys(state).forEach(stateKey => {
      if (state[stateKey] === undefined || typeof state[stateKey] === 'string') {
        state[stateKey] = false;
      }
    });
    this.plugins.forEach(plugin => {
      if (plugin.onGetState) {
        const response = plugin.onGetState(state);

        if (response) {
          this.state = response;
        }
      }
    });
    return state;
  }

  onInputsChange(codes, callback) {
    // Check if we got a single input
    if (typeof codes === 'string') {
      codes = [codes];
    } // Set to our map


    this.inputChangeMap[codes] = {
      codes,
      callback
    }; // Check if we need to start the interval

    if (!this.cancelInputChangeListener) {
      this._startInputChangeInterval();
    } // Return a function to cancel listening.


    return () => {
      delete this.inputChangeMap[codes];
    };
  }

  _startInputChangeInterval() {
    // Start our InputChange Interval
    // Originally going to use requestAnimationFrame, sine most people react to games
    // from visuals. But then I remembered you could totally react from sound.
    // Thus a setInterval of about 60fps should be fair.
    const intervalId = setInterval(this._inputChangeIntervalHandler.bind(this), 16);

    this.cancelInputChangeListener = () => clearInterval(intervalId);
  }

  _inputChangeIntervalHandler() {
    // Get the new state
    const newState = this.getState(); // Find if anything changed

    const changedKeys = [];
    Object.keys(newState).forEach(newStateKey => {
      if (newState[newStateKey] !== this.inputChangeOldState[newStateKey]) {
        changedKeys.push(newStateKey);
      }
    }); // Find if any of the codes on our map need to be called

    Object.keys(this.inputChangeMap).forEach(codes => {
      if (this.inputChangeMap[codes].codes.some(code => changedKeys.includes(code))) {
        this.inputChangeMap[codes].callback(newState);
      }
    }); // Store the new state as the old

    this.inputChangeOldState = newState;
  }

}

const ResponsiveGamepad = new ResponsiveGamepadService();

exports.ResponsiveGamepad = ResponsiveGamepad;
