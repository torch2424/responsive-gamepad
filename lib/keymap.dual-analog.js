import { KeyMapSchema, getKeyInput, getGamepadInput } from './schema';
import { Key } from './keyboardCodes';

const keymap = KeyMapSchema();



export const KEYMAP = () => {
  return JSON.parse(JSON.stringify(keymap));
};
