// I am a user that wants to respond to a certain key event,
// Or key combination

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

// Certain Key Event
const unsubscribeFunction = ResponsiveGamepad.onInputsActive(
  ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.DPAD_DOWN, 
  ResponsiveGamepadState => {
    // Do Stuff
  }
);

// Key Combination
const unsubscribeFunction = ResponsiveGamepad.onInputsActive(
  [
    ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.SPECIAL,
    ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.DPAD_DOWN,
  ], ResponsiveGamepadState => {
  // Do Stuff
});
