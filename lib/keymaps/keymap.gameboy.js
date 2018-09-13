import { KEYMAP as KEYMAP_DEFAULT } from './keymap';
import { mergeInputs } from '../schema';

const keymap = KEYMAP_DEFAULT();

// Simply Alias some of our buttons

// Analog -> DPAD
keymap.DPAD_UP = mergeInputs(keymap.DPAD_UP, keymap.LEFT_ANALOG_UP, keymap.RIGHT_ANALOG_UP);
keymap.DPAD_RIGHT = mergeInputs(keymap.DPAD_RIGHT, keymap.LEFT_ANALOG_RIGHT, keymap.RIGHT_ANALOG_RIGHT);
keymap.DPAD_LEFT = mergeInputs(keymap.DPAD_LEFT, keymap.LEFT_ANALOG_LEFT, keymap.RIGHT_ANALOG_LEFT);
keymap.DPAD_DOWN = mergeInputs(keymap.DPAD_DOWN, keymap.LEFT_ANALOG_DOWN, keymap.RIGHT_ANALOG_DOWN);

// X/Y -> A/B
keymap.A = mergeInputs(keymap.A, keymap.X);
keymap.B = mergeInputs(keymap.B, keymap.Y); 

// Triggers -> A
keymap.A = mergeInputs(keymap.A, keymap.LEFT_TRIGGER, keymap.RIGHT_TRIGGER);

// Bumpers -> B
keymap.B = mergeInputs(keymap.B, keymap.LEFT_BUMPER, keymap.RIGHT_BUMPER);


export const KEYMAP = () => {
  return JSON.parse(JSON.stringify(keymap));
};
