import { KeyMapSchema } from './schema';
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

class ResponsiveGamepadService {
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
    this.keyMapKeys.forEach((key) => {

      // Find if any of the keyboard, gamepad or touchpad buttons are pressed
      const keyboardState = this.keyMap[key].KEYBOARD.some((keyInput) => {
        return keyInput.ACTIVE
      });

      if (keyboardState) {
        controllerState[key] = true;
        return;
      }

      // Find if any of the keyboard, gamepad or touchpad buttons are pressed
      const gamepadState = this.keyMap[key].GAMEPAD.some((gamepadInput) => {
        return gamepadInput.ACTIVE
      });

      if (gamepadState) {
        controllerState[key] = true;
        return;
      }

      // Find if any of the keyboard, gamepad or touchpad buttons are pressed
      const touchState = this.keyMap[key].TOUCHPAD.some((touchInput) => {
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
      this.keyMap[key].KEYBOARD.forEach((keyInput, index) => {
        if(keyInput.KEY_CODE === keyEvent.keyCode) {
          this.keyMap[key].KEYBOARD[index].ACTIVE = isPressed;
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
        this.keyMap[key].GAMEPAD.forEach((gamepadInput, index) => {

          // Check if we are a gamepad button
          if (this.keyMap[key].GAMEPAD[index].BUTTON_ID || this.keyMap[key].GAMEPAD[index].BUTTON_ID === 0) {
            this.keyMap[key].GAMEPAD[index].ACTIVE = isButtonPressed(gamepad, this.keyMap[key].GAMEPAD[index].BUTTON_ID);
          }

          // Check if we are an axis
          if (this.keyMap[key].GAMEPAD[index].JOYSTICK.AXIS_ID !== undefined && this.keyMap[key].GAMEPAD[index].JOYSTICK.IS_POSITIVE !== undefined) {
            if (this.keyMap[key].GAMEPAD[index].JOYSTICK.IS_POSITIVE) {
              this.keyMap[key].GAMEPAD[index].ACTIVE = getAnalogStickAxis(gamepad, this.keyMap[key].GAMEPAD[index].JOYSTICK.AXIS_ID) > +this.gamepadAnalogStickDeadZone
            } else {
              this.keyMap[key].GAMEPAD[index].ACTIVE = getAnalogStickAxis(gamepad, this.keyMap[key].GAMEPAD[index].JOYSTICK.AXIS_ID) < -this.gamepadAnalogStickDeadZone
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

export const ResponsiveGamepad = new ResponsiveGamepadService();
