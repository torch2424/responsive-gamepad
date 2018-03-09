import { KeyMapSchema } from 'schema';
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
    this.keyMapKeys = Object.keys(KeyMapSchema());
    this.keyMap = DEFAULT_KEYMAP;
  }

  initialize(keyMap) {

    // Add our key event listeners
    window.addEventListener('keyup', (event) => {
      this.updateKeyboard(event);
    });
    window.addEventListener('keydown', (event) => {
      this.updateKeyboard(event);
    });

    if (keyMap) {
      this.keyMap = keyMap;
    }
  }

  getState() {
    // Keyboard handled by listeners on window

    // Update the gamepad state
    this.updateGamepad();

    // TODO: Update the virtual keyboard state

    // Create an abstracted controller state
    const controllerState = {};

    // Loop through our Keys, and quickly build our controller state
    this.keyMap.forEach((key) => {

      // Find if any of the keyboard, gamepad or touchpad buttons are pressed
      const keyboardState = this.keyMapKeys[key].KEYBOARD.some((keyInput) => {
        return keyInput.ACTIVE
      });

      if (keyboardState) {
        controllerState[key] = true;
        return;
      }

      // Find if any of the keyboard, gamepad or touchpad buttons are pressed
      const gamepadState = this.keyMapKeys[key].GAMEPAD.some((gamepadInput) => {
        return gamepadInput.ACTIVE
      });

      if (gamepadState) {
        controllerState[key] = true;
        return;
      }

      // Find if any of the keyboard, gamepad or touchpad buttons are pressed
      const touchState = this.keyMapKeys[key].TOUCHPAD.some((touchInput) => {
        return touchInput.ACTIVE
      });

      if (touchState) {
        controllerState[key] = true;
        return;
      }

      controllerState[key] = false;
    });

    // Return the controller state in case we need something from it
    return controllerState;
  }

  // Function to handle keyboard update events
  updateKeyboard(keyEvent) {
    // Get the new state of the key
    let isPressed = false;
    if (keyEvent.type === 'keydown') {
      isPressed = true;
    }

    // Loop through our keys
    this.keyMapKeys.forEach((key) => {
      this.keyMapKeys[key].KEYBOARD.forEach((keyInput, index) => {
        if(keyInput.EVENT_CODE === keyEvent.keyCode) {
          this.keyMapKeys[key].KEYBOARD[index].ACTIVE = isPressed;
        }
      });
    });
  }

  // Function to check the gamepad API for the gamepad state
  updateGamepad() {
    // Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
    // Gampad Diagram: https://www.html5rocks.com/en/tutorials/doodles/gamepad/#toc-gamepadinfo
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    for(let i = 0; i < gamepads.length; i++) {

      // Get our current gamepad
      let gamepad = gamepads[i];

      if(!gamepad) {
        continue;
      }

      // Loop through our keys
      this.keyMapKeys.forEach((key) => {
        this.keyMapKeys[key].GAMEPAD.forEach((gamepadInput, index) => {

          // Check if we are a gamepad button
          if (this.keyMapKeys[key].GAMEPAD[index].BUTTON_ID || this.keyMapKeys[key].GAMEPAD[index].BUTTON_ID === 0) {
            this.keyMapKeys[key].GAMEPAD[index].ACTIVE = isButtonPressed(gamepad, 14);
          }

          // Check if we are an axis
          if (this.keyMapKeys[key].GAMEPAD[index].AXIS_ID !== undefined && this.keyMapKeys[key].GAMEPAD[index].IS_POSITIVE !== undefined) {
            if (this.keyMapKeys[key].GAMEPAD[index].IS_POSITIVE) {
              this.keyMapKeys[key].GAMEPAD[index].ACTIVE = getAnalogStickAxis(gamepad, this.keyMapKeys[key].GAMEPAD[index].AXIS_ID) > +this.gamepadAnalogStickDeadZone
            } else {
              this.keyMapKeys[key].GAMEPAD[index].ACTIVE = getAnalogStickAxis(gamepad, this.keyMapKeys[key].GAMEPAD[index].AXIS_ID) < -this.gamepadAnalogStickDeadZone
            }
          }
        });
      });
    }
  }

  updateVirtualGamepad() {
    // TODO:
  }
}

export const ResponsiveGamepad = new ResponsiveGamepad();
