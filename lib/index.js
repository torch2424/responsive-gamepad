import {RESPONSIVE_GAMEPAD_INPUTS} from './constants';
import Keyboard from './keyboard';
import setDefaultKeymap from './keymap';

class ResponsiveGamepadService {
  constructor() {
    console.log('constructor');

    this.Keyboard = new Keyboard();
    setDefaultKeymap(this);
  }

  enable() {
    this.Keyboard.enable();
  }

  disable() {
    this.Keyboard.disable();
  }
}

export const ResponsiveGamepad = new ResponsiveGamepadService();
