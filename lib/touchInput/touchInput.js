import InputSource from '../inputSource';
import {RESPONSIVE_GAMEPAD_INPUTS} from '../constants';

import TouchDpad from './touchDpad';
import TouchAnalog from './touchAnalog';
import TouchButton from './touchButton';

const TOUCH_INPUT_TYPES = {
  DPAD: 'DPAD',
  ANALOG: 'ANALOG',
  BUTTON: 'BUTTON'
}

export default class TouchInput extends InputSource {
  constructor() {
    super();

    this.enabled = false;

    // Organize our element maps to specific input types
    this.dpads = [];
    this.analogs = [];
    this.buttons = [];
  }

  enable() {
    if (typeof window === "undefined") {
      throw new Error('TouchInput can only be used with a browser environment');
      return;
    }

    this.enabled = true;

    this.dpads.forEach(dpad => dpad.listen());
    this.analogs.forEach(analog => analog.listen());
    this.buttons.forEach(button => button.listen());
  }

  disable() {
    if (typeof window === "undefined") {
      throw new Error('TouchInput can only be used with a browser environment');
      return;
    }

    this.enabled = false;

    this.dpads.forEach(dpad => dpad.stopListening());
    this.analogs.forEach(analog => analog.stopListening());
    this.buttons.forEach(button => button.stopListening());
  }

  getState() {
    // TODO:
  }

  addButtonInput(element, input) {
    const touchButton = new TouchButton(element, input);

    if (this.enabled) {
      touchButton.listen();
    }

    this.buttons.push(touchButton);

    // Return a function to remove
    return () => {
      touchButton.stopListening();
      this.buttons.splice(this.buttons.indexOf(touchButton), 1);
    }
  }
}
