import InputSource from '../inputSource';
import {RESPONSIVE_GAMEPAD_INPUTS} from '../constants';

export default class GamepadInputSource extends InputSource {
  
  constructor() {
    super();

    this.gamepadAnalogStickDeadZone = 0.25;

    this.keymap = {};
  }

  enable() {}

  disable() {}

  getState(gamepadIndex) {
    const gamepads = this._getGamepads();

    // Check our gamepadIndex
    if (!gamepadIndex) {
      gamepadIndex = 0;
    }

    // Get our current gamepad
    let gamepad = gamepads[gamepadIndex];

    if (!gamepad) {
      return false;
    }

    Object.keys(this.keymap).forEach(input => {
      if (this.keymap[input].buttons) {
        this.keymap[input].value = 
          this.keymap[input].buttons.some(button => this._isButtonPressed(gamepad, button))
      } else if(this.keymap[input].axis) {
        let value = this._getAnalogStickAxis(gamepad, this.keymap[input].axis);
        this.keymap[input].value =  value;
      }
    });

    const state = {
      ...RESPONSIVE_GAMEPAD_INPUTS
    };
    Object.keys(this.keymap).forEach(input => {
      state[input] = this.keymap[input].value
    });

    // Get our analog up, right, down, left
    state[RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_DOWN] = 
      state.LEFT_ANALOG_VERTICAL_AXIS > this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP] = 
      state.LEFT_ANALOG_VERTICAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_RIGHT] = 
      state.LEFT_ANALOG_HORIZONTAL_AXIS > this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_LEFT] = 
      state.LEFT_ANALOG_HORIZONTAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_DOWN] = 
      state.RIGHT_ANALOG_VERTICAL_AXIS > this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP] = 
      state.RIGHT_ANALOG_VERTICAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_RIGHT] = 
      state.RIGHT_ANALOG_HORIZONTAL_AXIS > this.gamepadAnalogStickDeadZone;
    state[RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_LEFT] = 
      state.RIGHT_ANALOG_HORIZONTAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;

    // Remove any remainig strings I may have
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
  }

  // Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
  _getAnalogStickAxis(gamepad, axisId) {
    if (gamepad) {
      return gamepad.axes[axisId] || 0.0;
    }
    return 0.0;
  }
}
