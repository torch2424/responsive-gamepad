import Promise from 'promise-polyfill';
import { LayoutSchema } from 'schema';
import { KEYMAP as DEFAULT_KEYMAP } from './keymap.default.js';
import { KEYMAP as GAMEBOY_KEYMAP } from './keymap.gameboy.js';

// Helpers for accessing gamepad
// Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
function getAnalogStickAxis(gamepad, axisId) {
  return gamepad.axes[axisId] || 0.0;
}

function isButtonPressed(gamepad, buttonId) {
  return gamepad.buttons[buttonId] ? gamepad.buttons[buttonId].pressed : false;
}

class ResponsiveGamepadService() {
  constructor() {
    // Our settings
    this.gamepadAnalogStickDeadZone = 0.25;
    this.wasmboyControllerStateKeys = Object.keys(LayoutSchema());
  }

  initialize() {
    // Add our key event listeners
    window.addEventListener('keyup', (event) => {
      this.updateKeyboard(event);
    });
    window.addEventListener('keydown', (event) => {
      this.updateKeyboard(event);
    });
  }

  // May have to throttle changing keys so that it is a per frame type deal so they don't desync
  updateKeyboard(keyEvent) {
    // Get the new state of the key
    let isPressed = false;
    if (keyEvent.type === 'keydown') {
      isPressed = true;
    }

    this.wasmboyControllerStateKeys.some((key) => {
      if(WASMBOY_CONTROLLER_STATE[key].KEYBOARD.EVENT_KEY_CODES.includes(keyEvent.keyCode)) {
        WASMBOY_CONTROLLER_STATE[key].KEYBOARD.IS_PRESSED = isPressed;
        return true;
      }
      return false;
    });
  }
}

export const ResponsiveGamepad = new ResponsiveGamepad();
