// Keymaps should all be using: KeyboardEvent.code
// As it represents physical location relative to a US QWERTY Layout.
// And not the value of the key pressed.
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

// For KeyCodes Table, see: https://www.w3.org/TR/uievents-code/#code-value-tables
// KeyCode Tester: http://keycode.info/

import {RESPONSIVE_GAMEPAD_KEYS} from './constants';

export function setKeyboardKeysToKeymapResponsiveGamepadKey(keys, keymap, responsiveGamepadKey) {
  keymap[responsiveGamepadKey] = keys;
}

const RESPONSIVE_GAMEPAD_DEFAULT_KEYBOARD_KEYMAP = {};
setKeyboardKeysToKeymapResponsiveGamepadKey(
  ["ArrowUp", "Numpad8"],
  RESPONSIVE_GAMEPAD_DEFAULT_KEYMAP,
  RESPONSIVE_GAMEPAD_KEYS.DPAD_UP
);
setKeyboardKeysToKeymapResponsiveGamepadKey(
  ["KeyW"],
  RESPONSIVE_GAMEPAD_DEFAULT_KEYMAP,
  RESPONSIVE_GAMEPAD_KEYS.LEFT_ANALOG_UP
);
