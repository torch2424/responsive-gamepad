import { 
  KeyMapSchema, 
  createTouchInput 
} from './schema';
import { isIgnoringKeyEvents, updateKeyboard } from './keyboard';
import { getGamepads, getAnalogStickAxis, analogBooleanToAxis, updateGamepad } from './gamepad';
import { updateTouchpadRect, updateTouchpad } from './touchpad';
import { KEYMAP as KEYMAP_DEFAULT } from './keymaps/index';


class ResponsiveGamepadService {
  constructor() {
    // Our settings
    this.gamepadAnalogStickDeadZone = 0.25;
    this.keyMap = undefined;
    this.keyMapKeys = undefined;
    this.touchMap = undefined;
    this.enabled = false;
    this.addedEventListeners = false;
  }

  enable(keyMap) {

    if (this.enabled) {
      console.error('Responsive Gamepad is already enabled');
      return;
    }

    // TODO: Verify it is a valid keymap passed
    this.keyMap = keyMap || KEYMAP_DEFAULT();
    this.keyMapKeys = Object.keys(this.keyMap);
    this.touchMap = {};


    // Add our key event listeners
    // Wrapping in this for preact prerender
    if (!this.addedEventListeners && typeof window !== "undefined") {
      window.addEventListener('keyup', updateKeyboard.bind(this));
      window.addEventListener('keydown', updateKeyboard.bind(this));
      // Add a resize listen to update the gamepad rect on resize
      window.addEventListener("resize", updateTouchpadRect.bind(this));

      this.addedEventListeners = true;
    }

    this.enabled = true;
  }

  // Disable responsive gamepad, and remove all the listeners
  disable() {
    this.keyMap = undefined;
    this.enabled = false;
  }

  isEnabled() {
    return this.enabled;
  }

  // Function to return if we are ignoring input for key events
  isIgnoringKeyEvents() {
    return isIgnoringKeyEvents();
  }


  addTouchInput(element, inputType) {

    // Get any additional arguments
    const originalArguments = [
      ...arguments
    ];
    const additionalArguments = [
      ...originalArguments.slice(2)
    ];

    // Declare our touch input
    let touchInputId = createTouchInput(element, inputType, updateTouchpad.bind(this), this.keyMap, this.touchMap, additionalArguments);

    // Return the touchInput ID so that is may be removed later
    return touchInputId;
  }

  removeTouchInput(touchInputId) {
    // Search for the input in our touch pad for every key
    let foundId = false;
    
    this.keyMapKeys.forEach(keyMapKey => {
      this.keyMap[keyMapKey].TOUCHPAD.forEach((input, index) => {
        if (input.ID === touchInputId) {
          this.keyMap[keyMapKey].TOUCHPAD.splice(touchInputIndex, 1);
          foundId = true;
        }
      });
    });

    return foundId;
  }

  getState() {

    if(!this.enabled) {
      return {};
    }

    // Keyboard handled by listeners on window

    // Update the gamepad state
    updateGamepad.bind(this)();

    // Touch Handled by listeners on touchInputs

    // Create an abstracted controller state
    let controllerState = {};

    // Loop through our Keys, and quickly build our controller state
    Object.keys(this.keyMap).forEach((key) => {

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
        controllerState[key] = touchState;
        return;
      }

      controllerState[key] = false;
    });
    
    // Assign Truthy values from the touchMap
    Object.keys(this.touchMap).forEach(touchMapKey => {
      if (this.touchMap[touchMapKey]) {
        controllerState[touchMapKey] = this.touchMap[touchMapKey];
      }
    });

    // Get our Analog Stick Axis
    // If not provided by touch pad
    const gamepad = getGamepads()[0];
    if (gamepad) {
      controllerState.LEFT_ANALOG_HORIZONTAL_AXIS = getAnalogStickAxis(gamepad, 0);
      controllerState.LEFT_ANALOG_VERTICAL_AXIS = getAnalogStickAxis(gamepad, 1);
      controllerState.RIGHT_ANALOG_HORIZONTAL_AXIS = getAnalogStickAxis(gamepad, 2);
      controllerState.RIGHT_ANALOG_VERTICAL_AXIS = getAnalogStickAxis(gamepad, 3);
    } else {

      if (!controllerState.LEFT_ANALOG_HORIZONTAL_AXIS) {
        controllerState.LEFT_ANALOG_HORIZONTAL_AXIS = analogBooleanToAxis(
          controllerState.LEFT_ANALOG_RIGHT,
          controllerState.LEFT_ANALOG_LEFT
        );
      }
      if (!controllerState.LEFT_ANALOG_VERTICAL_AXIS) {
        controllerState.LEFT_ANALOG_VERTICAL_AXIS = analogBooleanToAxis(
          controllerState.LEFT_ANALOG_DOWN,
          controllerState.LEFT_ANALOG_UP
        );
      }

      if (!controllerState.RIGHT_ANALOG_HORIZONTAL_AXIS) {
        controllerState.RIGHT_ANALOG_HORIZONTAL_AXIS = analogBooleanToAxis(
          controllerState.RIGHT_ANALOG_RIGHT,
          controllerState.RIGHT_ANALOG_LEFT
        );
      }

      if (!controllerState.RIGHT_ANALOG_VERTICAL_AXIS) {
        controllerState.RIGHT_ANALOG_VERTICAL_AXIS = analogBooleanToAxis(
          controllerState.RIGHT_ANALOG_DOWN,
          controllerState.RIGHT_ANALOG_UP
        );
      }
    }

    // Alias some other values for convienence
    controllerState.UP = controllerState.DPAD_UP || controllerState.LEFT_ANALOG_UP || false;
    controllerState.RIGHT = controllerState.DPAD_RIGHT || controllerState.LEFT_ANALOG_RIGHT || false;
    controllerState.DOWN = controllerState.DPAD_DOWN || controllerState.LEFT_ANALOG_DOWN || false;
    controllerState.LEFT = controllerState.DPAD_LEFT || controllerState.LEFT_ANALOG_LEFT || false;

    if (controllerState.UP && controllerState.DOWN) {
      controllerState.UP = false;
      controllerState.DOWN = false;
    }

    if (controllerState.RIGHT && controllerState.LEFT) {
      controllerState.RIGHT = false;
      controllerState.LEFT = false;
    }    


    // Return the controller state in case we need something from it
    return controllerState;
  }
}

// Exports
export const ResponsiveGamepad = new ResponsiveGamepadService();
export * from './schema.js';
export * from './keymaps/index';
