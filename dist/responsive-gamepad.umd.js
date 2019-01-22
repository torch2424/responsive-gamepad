(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ResponsiveGamepad = {}));
}(this, function (exports) { 'use strict';

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

    ResponsiveGamepad.Gamepad.setGamepadAxesToResponsiveGamepadInput([0], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_HORIZONTAL_AXIS);
    ResponsiveGamepad.Gamepad.setGamepadAxesToResponsiveGamepadInput([1], RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_VERTICAL_AXIS); // Right Analog Axis

    ResponsiveGamepad.Gamepad.setGamepadAxesToResponsiveGamepadInput([2], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_HORIZONTAL_AXIS);
    ResponsiveGamepad.Gamepad.setGamepadAxesToResponsiveGamepadInput([3], RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_VERTICAL_AXIS); // A

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

  class Gamepad extends InputSource {
    constructor() {
      super();
      this.gamepadAnalogStickDeadZone = 0.25;
      this.keymap = {};
    }

    enable() {}

    disable() {}

    getState(gamepadIndex) {
      const gamepads = this._getGamepads();

      for (let i = 0; i < gamepads.length; i++) {
        // Get our current gamepad
        let gamepad = gamepads[i];

        if (!gamepad) {
          continue;
        }

        Object.keys(this.keymap).forEach(input => {
          if (this.keymap[input].buttons) {
            this.keymap[input].value = this.keymap[input].buttons.some(button => this._isButtonPressed(gamepad, button));
          } else if (this.keymap[input].axes) {
            // TODO: Truly support multiple axes by averaging.
            let value = this._getAnalogStickAxis(gamepad, this.keymap[input].axes[0]);

            this.keymap[input].value = value;
          }
        });
      }

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

    setGamepadAxesToResponsiveGamepadInput(axes, responsiveGamepadInput) {
      if (!axes || !responsiveGamepadInput || axes.length === 0) {
        throw new Error('Could not set the specificed buttons to input');
      }

      if (typeof axes === 'number') {
        axes = [axes];
      }

      this.keymap[responsiveGamepadInput] = {};
      this.keymap[responsiveGamepadInput].axes = axes;
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

      this._updateElementBoundingClientRect();

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

    onTouchEvent() {
      throw new Error('TouchInput: This must be overriden.');
    }

    _touchEvent(event) {
      if (!event || event.type.includes('touch') && !event.touches) return;
      event.preventDefault(); // Determine if it is an active event (Input is pressed down)
      // or not active (Input is released)

      const isActiveEvent = event.type === "touchstart" || event.type === "touchmove" || event.type === "mousedown";
      const isNeutralEvent = event.type === "mousemove";
      const isInactiveEvent = !isActiveEvent && !isNeutralEvent;

      this._updateTouchStyles(isActiveEvent, isNeutralEvent, isInactiveEvent);

      this.onTouchEvent(event, isActiveEvent, isNeutralEvent, isInactiveEvent);
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

  }

  class TouchButton extends TouchInputType {
    constructor(element, input) {
      super(element);
      this.active = false;
      this.input = input;
    }

    onTouchEvent(event, isActiveEvent, isNeutralEvent, isInactiveEvent) {
      if (this.active && isInactiveEvent) {
        this.active = false;
      } else if (!this.active && isActiveEvent) {
        this.active = true;
      }
    }

  }

  class TouchInput extends InputSource {
    constructor() {
      super();
      this.enabled = false; // Organize our element maps to specific input types

      this.dpads = [];
      this.analogs = [];
      this.buttons = [];
    }

    enable() {
      if (typeof window === "undefined") {
        throw new Error('TouchInput can only be used with a browser environment');
        return;
      }

      this.enabled = true;
      this.dpads.forEach(dpad => dpad.listen());
      this.analogs.forEach(analog => analog.listen());
      this.buttons.forEach(button => button.listen());
    }

    disable() {
      if (typeof window === "undefined") {
        throw new Error('TouchInput can only be used with a browser environment');
        return;
      }

      this.enabled = false;
      this.dpads.forEach(dpad => dpad.stopListening());
      this.analogs.forEach(analog => analog.stopListening());
      this.buttons.forEach(button => button.stopListening());
    }

    getState() {
      const state = _objectSpread({}, RESPONSIVE_GAMEPAD_INPUTS);

      this.buttons.forEach(button => {
        state[button.input] = button.active;
      }); // Remove any remainig strings I may have

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

  }

  class ResponsiveGamepadService {
    constructor() {
      // Expose our constants
      this.RESPONSIVE_GAMEPAD_INPUTS = RESPONSIVE_GAMEPAD_INPUTS; // Some Settings

      this._enabled = false;
      this._multipleDirectionInput = true; // Our Input Sources

      this.Keyboard = new Keyboard();
      this.Gamepad = new Gamepad();
      this.TouchInput = new TouchInput();
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

    enableMultipleDirectionInput() {
      this._multipleDirectionInput = true;
    }

    disableMultipleDirectionInput() {
      this._multipleDirectionInput = false;
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
      }); // TODO: Handle Multiple Directions

      this.plugins.forEach(plugin => {
        if (plugin.onGetState) {
          const response = plugin.onGetState(this.state);

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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
