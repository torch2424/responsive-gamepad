import {RESPONSIVE_GAMEPAD_INPUTS} from './constants';
import setDefaultKeymap from './keymap';

import KeyboardInputSource from './keyboard/keyboard';
import GamepadInputSource from './gamepad/gamepad';
import TouchInputInputSource from './touchInput/touchInput';

import { version } from '../package.json';

class ResponsiveGamepadService {
  constructor() {
    // Expose our constants
    this.RESPONSIVE_GAMEPAD_INPUTS = RESPONSIVE_GAMEPAD_INPUTS;
    
    // Some Settings
    this._enabled = false;
    this._multipleDirectionInput = true;
    
    // Our Input Sources
    this.Keyboard = new KeyboardInputSource();
    this.Gamepad = new GamepadInputSource();
    this.TouchInput = new TouchInputInputSource();
    setDefaultKeymap(this);

    // Our Plugins
    this.plugins = [];

    // On Input Change
    this.inputChangeMap = {};
    this.inputChangeOldState = {};
    this.cancelInputChangeListener = undefined;
  }

  clearInputMap() {
    this.Keyboard.clearInputMap();
    this.Gamepad.clearInputMap();
    this.TouchInput.clearInputMap();
  }

  getVersion() {
    return version;
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
    this.TouchInput.disable();

    // Stop our InputChange Interval
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
    }
  }

  getState() {

    if (!this._enabled) {
      return {};
    }

    let state = {
      ...RESPONSIVE_GAMEPAD_INPUTS
    };
    
    const gamepadState = this.Gamepad.getState();
    const touchInputState = this.TouchInput.getState();
    const keyboardState = this.Keyboard.getState();

    state = {
      ...RESPONSIVE_GAMEPAD_INPUTS
    };

    Object.keys(state).forEach(stateKey => {
      state[stateKey] = gamepadState[stateKey] || 
        touchInputState[stateKey] ||
        keyboardState[stateKey];
    });

    // Force Analog Axis to be a number
    const analogTypes = ['LEFT', 'RIGHT'];
    analogTypes.forEach(analogType => {
      const typeAxes = [
        RESPONSIVE_GAMEPAD_INPUTS[`${analogType}_ANALOG_HORIZONTAL_AXIS`],
        RESPONSIVE_GAMEPAD_INPUTS[`${analogType}_ANALOG_VERTICAL_AXIS`],
      ];
      typeAxes.forEach((axis, index) => {
        // Number type is what we want
        if (typeof state[axis] === 'number') {
          return;
        }

        if (index === 0 || index === 2) {
          if (state[RESPONSIVE_GAMEPAD_INPUTS[`${analogType}_ANALOG_RIGHT`]]) {
            state[axis] = 1;
          } else if (state[RESPONSIVE_GAMEPAD_INPUTS[`${analogType}_ANALOG_LEFT`]]) {
            state[axis] = -1;
          } else {
            state[axis] = 0;
          }
        }

        if (index === 1 || index === 3) {
          if (state[RESPONSIVE_GAMEPAD_INPUTS[`${analogType}_ANALOG_UP`]]) {
            state[axis] = -1;
          } else if (state[RESPONSIVE_GAMEPAD_INPUTS[`${analogType}_ANALOG_DOWN`]]) {
            state[axis] = 1;
          } else {
            state[axis] = 0;
          }
        }
      });
    });

    // Add the generic Up, Down, Left, Right
    state.UP = state.DPAD_UP ||
      state.LEFT_ANALOG_UP;
    state.RIGHT = state.DPAD_RIGHT ||
      state.LEFT_ANALOG_RIGHT;
    state.DOWN = state.DPAD_DOWN ||
      state.LEFT_ANALOG_DOWN;
    state.LEFT = state.DPAD_LEFT ||
      state.LEFT_ANALOG_LEFT;

    // Remove any remainig strings I may have
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
    }

    // Set to our map
    this.inputChangeMap[codes] = {
      codes,
      callback
    };

    // Check if we need to start the interval
    if (this._enabled && !this.cancelInputChangeListener) {
      this._startInputChangeInterval();
    }
    
    // Return a function to cancel listening.
    return () => {
      delete this.inputChangeMap[codes];
    }
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
    const newState = this.getState();

    // Find if anything changed
    const changedKeys = [];
    Object.keys(newState).forEach(newStateKey => {
      if (newState[newStateKey] !== this.inputChangeOldState[newStateKey]) {
        changedKeys.push(newStateKey)
      }
    });

    // Find if any of the codes on our map need to be called
    Object.keys(this.inputChangeMap).forEach(codes => {
      if (this.inputChangeMap[codes].codes.some(code => changedKeys.includes(code))) {
        this.inputChangeMap[codes].callback(newState);
      }
    });

    // Store the new state as the old
    this.inputChangeOldState = newState;
  }
}

export const ResponsiveGamepad = new ResponsiveGamepadService();
