import InputSource from '../inputSource';
import {RESPONSIVE_GAMEPAD_INPUTS} from '../constants';

export default class Gamepad extends InputSource {
  
  constructor() {
    super();

    this.gamepadAnalogStickDeadZone = 0.25;

    this.keymap = {};
  }

  enable() {}

  disable() {}

  getState(gamepadIndex) {
    const gamepads = getGamepads();

    for(let i = 0; i < gamepads.length; i++) {

      // Get our current gamepad
      let gamepad = gamepads[i];

      if (!gamepad) {
        continue;
      }

      Object.keys(this.keymap).forEach(input => {
        if (this.keymap[input].buttons) {
          this.keymap[input].value = 
            this.keymap[input].buttons.some(button => this._isButtonPressed(gamepad, button))
        } else if(this.keymap[input].axes) {
          // TODO: Truly support multiple axes by averaging.
          let value = getAnalogStickAxis(gamepad, this.keymap[input].axes[0]);
          if (Math.abs(value) > this.gamepadAnalogStickDeadZone) {
            this.keymap[input].value =  value;       
          }
        }
      });
    }

    const state = {};
    Object.keys(this.keymap).forEach(input => {
      state[input] = this.keymap[input].value
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
  }

  // Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
  _getAnalogStickAxis(gamepad, axisId) {
    if (gamepad) {
      return gamepad.axes[axisId] || 0.0;
    }
    return 0.0;
  }

  // Function to convert a set of analog booleans to an Axis Number
  _analogBooleanToAxis(positive, negative) {
    if (positive) {
      return 1.0;
    }
    if (negative) {
      return -1.0;
    }
    return 0;
  }

}
