// The default keymap, is very specifc to the "Standard Controller"

import { KeyMapSchema, getKeyInput, getGamepadInput } from '../schema';
import { Key } from '../keyboardCodes';

const keymap = KeyMapSchema();

// Dpad Up
keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.ARROW_UP));
keymap.DPAD_UP.KEYBOARD.push(getKeyInput(Key.NUMPAD_8));
keymap.DPAD_UP.GAMEPAD.push(getGamepadInput(12));

// Left Analog Up
keymap.LEFT_ANALOG_UP.KEYBOARD.push(getKeyInput(Key.W));
keymap.LEFT_ANALOG_UP.GAMEPAD.push(getGamepadInput(false, 1, false));

// Right Analog Up
keymap.RIGHT_ANALOG_UP.KEYBOARD.push(getKeyInput(Key.I));
keymap.RIGHT_ANALOG_UP.GAMEPAD.push(getGamepadInput(false, 3, false));

// Dpad Right
keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.ARROW_RIGHT));
keymap.DPAD_RIGHT.KEYBOARD.push(getKeyInput(Key.NUMPAD_6));
keymap.DPAD_RIGHT.GAMEPAD.push(getGamepadInput(15));

// Left Analog Right
keymap.LEFT_ANALOG_RIGHT.KEYBOARD.push(getKeyInput(Key.D));
keymap.LEFT_ANALOG_RIGHT.GAMEPAD.push(getGamepadInput(false, 0, true));

// Right Analog Right
keymap.RIGHT_ANALOG_RIGHT.KEYBOARD.push(getKeyInput(Key.L));
keymap.RIGHT_ANALOG_RIGHT.GAMEPAD.push(getGamepadInput(false, 2, true));

// Dpad Down
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.ARROW_DOWN));
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.NUMPAD_5));
keymap.DPAD_DOWN.KEYBOARD.push(getKeyInput(Key.NUMPAD_2));
keymap.DPAD_DOWN.GAMEPAD.push(getGamepadInput(13));

// Left Analog Down
keymap.LEFT_ANALOG_DOWN.KEYBOARD.push(getKeyInput(Key.S));
keymap.LEFT_ANALOG_DOWN.GAMEPAD.push(getGamepadInput(false, 1, true));

// Right Analog Down
keymap.RIGHT_ANALOG_DOWN.KEYBOARD.push(getKeyInput(Key.K));
keymap.RIGHT_ANALOG_DOWN.GAMEPAD.push(getGamepadInput(false, 3, true));

// Dpad Left
keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.ARROW_LEFT));
keymap.DPAD_LEFT.KEYBOARD.push(getKeyInput(Key.NUMPAD_4));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(14));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(false, 0, false));
keymap.DPAD_LEFT.GAMEPAD.push(getGamepadInput(false, 2, false));

// Left Analog Left
keymap.LEFT_ANALOG_LEFT.KEYBOARD.push(getKeyInput(Key.A));
keymap.LEFT_ANALOG_LEFT.GAMEPAD.push(getGamepadInput(false, 0, false));

// Right Analog Left
keymap.RIGHT_ANALOG_LEFT.KEYBOARD.push(getKeyInput(Key.J));
keymap.RIGHT_ANALOG_LEFT.GAMEPAD.push(getGamepadInput(false, 2, false));

// A
keymap.A.KEYBOARD.push(getKeyInput(Key.X));
keymap.A.KEYBOARD.push(getKeyInput(Key.SEMI_COLON));
keymap.A.KEYBOARD.push(getKeyInput(Key.NUMPAD_7));
keymap.A.GAMEPAD.push(getGamepadInput(0));

// B
keymap.B.KEYBOARD.push(getKeyInput(Key.Z));
keymap.B.KEYBOARD.push(getKeyInput(Key.ESCAPE));
keymap.B.KEYBOARD.push(getKeyInput(Key.SINGLE_QUOTE));
keymap.B.KEYBOARD.push(getKeyInput(Key.BACKSPACE));
keymap.B.KEYBOARD.push(getKeyInput(Key.NUMPAD_9));
keymap.B.GAMEPAD.push(getGamepadInput(1));


// X
keymap.X.KEYBOARD.push(getKeyInput(Key.C));
keymap.X.GAMEPAD.push(getGamepadInput(2));

// Y
keymap.X.KEYBOARD.push(getKeyInput(Key.V));
keymap.Y.GAMEPAD.push(getGamepadInput(3));

// Left Trigger
keymap.LEFT_TRIGGER.KEYBOARD.push(getKeyInput(Key.Q));
keymap.LEFT_TRIGGER.GAMEPAD.push(getGamepadInput(6));

// Left Bumper
keymap.LEFT_BUMPER.KEYBOARD.push(getKeyInput(Key.E));
keymap.LEFT_BUMPER.GAMEPAD.push(getGamepadInput(4));

// Right Trigger
keymap.RIGHT_TRIGGER.KEYBOARD.push(getKeyInput(Key.U));
keymap.RIGHT_TRIGGER.GAMEPAD.push(getGamepadInput(7));

// Right Bumper
keymap.RIGHT_BUMPER.KEYBOARD.push(getKeyInput(Key.O));
keymap.RIGHT_BUMPER.GAMEPAD.push(getGamepadInput(5));


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

// Special
keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.ALT));
keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.CTRL));
keymap.SPECIAL.KEYBOARD.push(getKeyInput(Key.META));
keymap.SELECT.GAMEPAD.push(getGamepadInput(16));

export const KEYMAP = () => {
  return JSON.parse(JSON.stringify(keymap));
};
