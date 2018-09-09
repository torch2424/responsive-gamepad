// Functions to update keymap state
// 'this' should be bound by the respective service

function isButtonPressed(gamepad, buttonId) {
  return gamepad.buttons[buttonId] ? gamepad.buttons[buttonId].pressed : false;
}

export function getGamepads() {
  // Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
  // Gampad Diagram: https://w3c.github.io/gamepad/#remapping
  return navigator.getGamepads ? navigator.getGamepads() : [];
}

// Helpers for accessing gamepad
// Similar to: https://github.com/torch2424/picoDeploy/blob/master/src/assets/3pLibs/pico8gamepad/pico8gamepad.js
export function getAnalogStickAxis(gamepad, axisId) {
  if (gamepad) {
    return gamepad.axes[axisId] || 0.0;
  }
  return 0.0;
}

// Function to convert a set of analog booleans to an Axis Number
export function analogBooleanToAxis(positive, negative) {
  if (positive) {
    return 1.0;
  }
  if (negative) {
    return -1.0;
  }
  return 0;
}

// Function to check the gamepad API for the gamepad state
export function updateGamepad() {

  const gamepads = getGamepads();

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
