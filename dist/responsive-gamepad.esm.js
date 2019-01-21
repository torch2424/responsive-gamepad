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
class Keyboard extends InputSource {
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
      return key.keys.some(code => {
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

// Keymaps should all be using: KeyboardEvent.code
function setDefaultKeymap(ResponsiveGamepad) {
  // Up
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ArrowUp", "Numpad8"], RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyW"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyI"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP); //Right

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ArrowRight", "Numpad6"], RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyD"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyL"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP); // Down

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ArrowDown", "Numpad5", "Numpad2"], RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyS"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyK"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP); // Left

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ArrowLeft", "Numpad4"], RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyA"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP);
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyJ"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP); // A

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyX", "Semicolon", "Numpad7"], RESPONSIVE_GAMEPAD_INPUTS.A); // B

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyZ", "Escape", "Quote", "Backspace", "Numpad9"], RESPONSIVE_GAMEPAD_INPUTS.B); // X

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyC"], RESPONSIVE_GAMEPAD_INPUTS.X); // Y

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyV"], RESPONSIVE_GAMEPAD_INPUTS.Y); // Left Trigger

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyQ"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_TRIGGER); // Left Bumper

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyE"], RESPONSIVE_GAMEPAD_INPUTS.LEFT_BUMPER); // Right Trigger

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyU"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_TRIGGER); // Right Bumper

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["KeyO"], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_BUMPER); // Start

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["Enter", "Numpad3"], RESPONSIVE_GAMEPAD_INPUTS.START); // Select

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["ShiftRight", "ShiftLeft", "Tab", "Numpad1"], RESPONSIVE_GAMEPAD_INPUTS.SELECT); // Special

  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(["Space", "Backslash", "Backquote"], RESPONSIVE_GAMEPAD_INPUTS.SPECIAL);
}

class ResponsiveGamepadService {
  constructor() {
    console.log('constructor'); // Some Settings

    this._enabled = false;
    this._multipleDirectionInput = true; // Our Input Sources

    this.Keyboard = new Keyboard();
    setDefaultKeymap(this); // On Input Change

    this.inputChangeMap = {};
    this.inputChangeOldState = undefined;
    this.cancelInputChangeListener = undefined;
  }

  enable() {
    // Enable Input Sources
    this.Keyboard.enable();

    if (Object.keys(inputChangeMap).length > 0) {
      this._startInputChangeInterval();
    }

    this._enabled = true;
  }

  disable() {
    // Disable Input Sources
    this.Keyboard.disable(); // Stop our InputChange Interval

    if (this.cancelInputChangeListener) {
      this.cancelInputChangeListener();
      this.cancelInputChangeListener = undefined;
    }

    this._enabled = false;
  }

  isEnabled() {
    return this._enabled;
  }

  enableMultipleDirectionInput() {
    this._multipleDirectionInput = true;
  }

  disableMultipleDirectionInput() {
    this._multipleDirectionInput = false;
  }

  getState() {
    const keyboardState = this.Keyboard.getState(); // TODO: Handle Multiple Directions
    // TODO: Handle Plugins

    return keyboardState;
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

export { ResponsiveGamepad };
