// Keyboard Codes
// http://keycode.info/

// Keymaps should all be using: KeyboardEvent.code
// As it represents physical location according to US Layout.
// And not the value of the key pressed.
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

import {RESPONSIVE_GAMEPAD_KEYS} from './constants';

export function setKeyboardKeysToKeymapResponsiveGamepadKey(keys, keymap, responsiveGamepadKey) {
  keymap[responsiveGamepadKey] = keys;
}

const RESPONSIVE_GAMEPAD_DEFAULT_KEYBOARD_KEYMAP = {};
setKeyboardKeysToKeymapResponsiveGamepadKey(
  ['ArrowUp', 'KeyW'],
  RESPONSIVE_GAMEPAD_DEFAULT_KEYMAP,
  RESPONSIVE_GAMEPAD_KEYS.DPAD_UP
);
