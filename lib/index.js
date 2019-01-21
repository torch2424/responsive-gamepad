import {RESPONSIVE_GAMEPAD_INPUTS} from './constants';
import setDefaultKeymap from './keymap';

import Keyboard from './keyboard/keyboard';
import Gamepad from './gamepad/gamepad'

class ResponsiveGamepadService {
  constructor() {
    // Expose our constants
    this.RESPONSIVE_GAMEPAD_INPUTS = RESPONSIVE_GAMEPAD_INPUTS;
    
    // Some Settings
    this._enabled = false;
    this._multipleDirectionInput = true;
    
    // Our Input Sources
    this.Keyboard = new Keyboard();
    this.Gamepad = new Gamepad();
    setDefaultKeymap(this);

    // Our Plugins
    this.plugins = [];

    // On Input Change
    this.inputChangeMap = {};
    this.inputChangeOldState = {};
    this.cancelInputChangeListener = undefined;
  }

  enable() {
    // Enable Input Sources
    this.Keyboard.enable();

    if (Object.keys(this.inputChangeMap).length > 0) {
      this._startInputChangeInterval();
    }

    this._enabled = true;
  }

  disable() {
    // Disable Input Sources
    this.Keyboard.disable();

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
    }
  }

  getState() {

    let state = {
      ...RESPONSIVE_GAMEPAD_INPUTS
    };
    
    const keyboardState = this.Keyboard.getState();

    state = keyboardState

    // TODO: Handle Multiple Directions

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
    }

    // Set to our map
    this.inputChangeMap[codes] = {
      codes,
      callback
    };

    // Check if we need to start the interval
    if (!this.cancelInputChangeListener) {
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
