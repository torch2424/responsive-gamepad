// I am a user who wants to re-configure parts of the default keymap
// (Where reconfiguring the entire keymap, should probably be done by a plugin)

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput([
  ["ArrowUp", "Numpad8", "KeyW"],
], ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP);
