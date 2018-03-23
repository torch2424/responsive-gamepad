import { KeyMapSchema, getTouchInput } from './schema';
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

//Function to get an element target from SVGs being embedded in HTML
// This is for touch inputs
function getEventTargetElementId(event) {

    let targetId = event.target.id;
    // Return the first id in the event path
    event.path.some((element) => {
      if(element.id && element.id.length > 0) {
        targetId = element.id;
        return true;
      }
      return false;
    });

    return targetId;
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

    // Add a resize listen to update the gamepad rect on resize
    window.addEventListener("resize", () => {
      this.updateTouchpadRect();
    });

    if (keyMap) {
      this.keyMap = keyMap;
    }
  }

  addTouchInput(keyMapKey, element, type, direction) {
    // Declare our touch input
    // TODO: May have to add the event handler after getting the input
    let touchInput;
    touchInput = getTouchInput(element, type, direction, (event) => {
      this.updateTouchpad(keyMapKey, touchInput, event);
    });

    // Add the input to our keymap
    this.keyMap[keyMapKey].TOUCHPAD.push(touchInput);
  }

  getState() {
    // Keyboard handled by listeners on window

    // Update the gamepad state
    this.updateGamepad();

    // Touch Handled by listeners on touchInputs

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

    // Variable to check if a key has been found
    let keyFound = false;

    // Loop through our keys
    this.keyMapKeys.forEach((key) => {
      this.keyMap[key].KEYBOARD.forEach((keyInput, index) => {
        if(keyInput.KEY_CODE === keyEvent.keyCode) {
          this.keyMap[key].KEYBOARD[index].ACTIVE = isPressed;
          keyFound = true;
        }
      });
    });

    // If we found a key, prevent default so page wont scroll and things
    keyEvent.preventDefault();
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

  // Function to update button position and size
  updateTouchpadRect() {
    // Read from the DOM, and get each of our elements position, doing this here, as it is best to read from the dom in sequence
    // use element.getBoundingRect() top, bottom, left, right to get clientX and clientY in touch events :)
    // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
    //console.log("GamepadComponent: Updating Rect()...");
    this.keyMapKeys.forEach((key) => {
      this.keyMap[key].TOUCHPAD.forEach((touchInput, index) => {
        const boundingRect = this.keyMap[key].TOUCHPAD[index].ELEMENT.getBoundingClientRect();
        this.keyMap[key].TOUCHPAD[index].BOUNDING_RECT = boundingRect;
      });
    });
  }

  // Reset all Diretion keys for a DPAD for touch Inputs
  resetTouchDpad() {

    const dpadKeys = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

    dpadKeys.forEach((dpadKey) => {
      this.keyMap[dpadKey].TOUCHPAD.forEach((touchInput) => {
        touchInput.ACTIVE = false;
      });
    });
  }

  // Function called on an event of a touchInput SVG Element
  updateTouchpad(keyMapKey, touchInput, event) {

    if (!event || (event.type.includes('touch') && !event.touches)) return;

    //event.stopPropagation();
    event.preventDefault();

    //this.debugCurrentTouch(event);

    // Check for active event types
    if(event.type === "touchstart" ||
    event.type === "touchmove" ||
    event.type === "mousedown") {
      // Active

      if (touchInput.TYPE === 'DPAD') {

        // Calculate for the correct key
        // Only using the first touch, since we shouldn't be having two fingers on the dpad
        let touch;
        if (event.type.includes('touch')) {
          touch = event.touches[0];
        } else if (event.type.includes('mouse')) {
          touch = event;
        }

        // Find if the horizontal or vertical influence is greater
        // Find our centers of our rectangles, and our unbiased X Y values on the rect
        const rectCenterX = (touchInput.BOUNDING_RECT.right - touchInput.BOUNDING_RECT.left) / 2;
        const rectCenterY = (touchInput.BOUNDING_RECT.bottom - touchInput.BOUNDING_RECT.top) / 2;
        const touchX = touch.clientX - touchInput.BOUNDING_RECT.left;
        let touchY = touch.clientY - touchInput.BOUNDING_RECT.top;

        // Lesson From: picoDeploy
        // Fix for shoot button causing the character to move right on multi touch error
        // + 50 for some buffer
        if(touchX > (rectCenterX + (touchInput.BOUNDING_RECT.width / 2) + 50)) {
          // Ignore the event
          return;
        }

        // Create an additonal influece for horizontal, to make it feel better
        const horizontalInfluence = touchInput.BOUNDING_RECT.width / 8;

        // Determine if we are horizontal or vertical
        const isHorizontal = Math.abs(rectCenterX - touchX) + horizontalInfluence > Math.abs(rectCenterY - touchY);

        // Find if left or right from width, vice versa for height
        if(isHorizontal) {
          // Add a horizontal dead zone
          const deadzoneSize = touchInput.BOUNDING_RECT.width / 20;
          if(Math.abs((touchInput.BOUNDING_RECT.width / 2) - touchX) > deadzoneSize) {

            const isLeft = touchX < (touchInput.BOUNDING_RECT.width / 2);

            if(isLeft && touchInput.DIRECTION === 'LEFT') {
              touchInput.ACTIVE = true;
            } else if (!isLeft && touchInput.DIRECTION === 'RIGHT') {
              touchInput.ACTIVE = true;
            } else {
              touchInput.ACTIVE = false;
            }
          }
        } else {
          const isUp = touchY < (touchInput.BOUNDING_RECT.height / 2);
          if(isUp && touchInput.DIRECTION === 'UP') {
            touchInput.ACTIVE = true;
          } else if (!isUp && touchInput.DIRECTION === 'DOWN') {
            touchInput.ACTIVE = true;
          } else {
            touchInput.ACTIVE = false;
          }
        }
      }

      // Button Type
      if (touchInput.TYPE === 'BUTTON') {
        touchInput.ACTIVE = true;
      }
    } else {
      // Not active

      // Handle Dpad Type
      if (touchInput.TYPE === 'DPAD') {
        this.resetTouchDpad();
      }

      // Button Type
      if (touchInput.TYPE === 'BUTTON') {
        touchInput.ACTIVE = false;
      }
    }
  }
}

// Exports
export const ResponsiveGamepad = new ResponsiveGamepadService();
export { KEYMAP as DEFAULT_KEYMAP } from './keymap.default.js';
export { KEYMAP as GAMEBOY_KEYMAP } from './keymap.gameboy.js';
