// I am a user who wants to re-configure parts of the default keymap
// (Where reconfiguring the entire keymap, should probably be done by a plugin)

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

// Keyboard
ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput([
  "ArrowUp", 
  "Numpad8", 
  "KeyW"
], ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP);

// Gamepad
ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
  [12],
  RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP
);

ResponsiveGamepad.Gamepad.setGamepadAxisToResponsiveGamepadInput(
  [0],
  RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_HORIZONTAL_AXIS
);

