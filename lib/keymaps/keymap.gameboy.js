import { KeyMapSchema, getKeyInput, getGamepadInput } from '../schema';
import { Key } from '../keyboardCodes';

const keymap = KeyMapSchema();

// Dpad Up
keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.ARROW_UP));
keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.W));
keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.NUMPAD_8));
keymap.DPAD_UP.GAMEPAD.push(getGamepadInput(12));
keymap.DPAD_UP.GAMEPAD.push(getGamepadInput(false, 1, false));
keymap.DPAD_UP.GAMEPAD.push(getGamepadInput(false, 3, false));

// Dpad Right
keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.ARROW_RIGHT));
keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.D));
keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.NUMPAD_6));
keymap.DPAD_RIGHT.GAMEPAD.push(getGamepadInput(15));
keymap.DPAD_RIGHT.GAMEPAD.push(getGamepadInput(false, 0, true));
keymap.DPAD_RIGHT.GAMEPAD.push(getGamepadInput(false, 2, true));

// Dpad Down
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.ARROW_DOWN));
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.S));
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.NUMPAD_5));
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.NUMPAD_2));
keymap.DPAD_DOWN.GAMEPAD.push(getGamepadInput(13));
keymap.DPAD_DOWN.GAMEPAD.push(getGamepadInput(false, 1, true));
keymap.DPAD_DOWN.GAMEPAD.push(getGamepadInput(false, 3, true));

// Dpad Left
keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.ARROW_LEFT));
keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.A));
keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.NUMPAD_4));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(14));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(false, 0, false));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(false, 2, false));

// A
keymap.A.KEYBOARD.push(getKeyInput(Key.X));
keymap.A.KEYBOARD.push(getKeyInput(Key.SEMI_COLON));
keymap.A.KEYBOARD.push(getKeyInput(Key.NUMPAD_7));
keymap.A.GAMEPAD.push(getGamepadInput(0));
keymap.A.GAMEPAD.push(getGamepadInput(1));

// B
keymap.B.KEYBOARD.push(getKeyInput(Key.Z));
keymap.B.KEYBOARD.push(getKeyInput(Key.ESCAPE));
keymap.B.KEYBOARD.push(getKeyInput(Key.SINGLE_QUOTE));
keymap.B.KEYBOARD.push(getKeyInput(Key.BACKSPACE));
keymap.B.KEYBOARD.push(getKeyInput(Key.NUMPAD_9));
keymap.B.GAMEPAD.push(getGamepadInput(2));
keymap.B.GAMEPAD.push(getGamepadInput(3));

// Start
keymap.START.KEYBOARD.push(getKeyInput(Key.RETURN));
keymap.START.KEYBOARD.push(getKeyInput(Key.SPACE));
keymap.START.KEYBOARD.push(getKeyInput(Key.NUMPAD_3));
keymap.START.GAMEPAD.push(getGamepadInput(9));


// Select
keymap.SELECT.KEYBOARD.push(getKeyInput(Key.SHIFT));
keymap.SELECT.KEYBOARD.push(getKeyInput(Key.TAB));
keymap.SELECT.KEYBOARD.push(getKeyInput(Key.BACK_SLASH));
keymap.SELECT.KEYBOARD.push(getKeyInput(Key.NUMPAD_1));
keymap.SELECT.GAMEPAD.push(getGamepadInput(8));


export const KEYMAP = () => {
  return JSON.parse(JSON.stringify(keymap));
};
