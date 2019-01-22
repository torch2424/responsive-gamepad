import InputSource from '../inputSource';
import {RESPONSIVE_GAMEPAD_INPUTS} from '../constants';

import TouchDpad from './touchDpad';
import TouchAnalog from './touchAnalog';
import TouchButton from './touchButton';

const TOUCH_INPUT_TYPES = {
  DPAD: 'DPAD',
  ANALOG: 'ANALOG',
  BUTTON: 'BUTTON'
};

const ANALOG_TYPES = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

export default class TouchInput extends InputSource {
  constructor() {
    super();

    this.enabled = false;

    // Organize our element maps to specific input types
    this.dpads = [];
    this.leftAnalogs = [];
    this.rightAnalogs = [];
    this.buttons = [];
  }

  enable() {
    if (typeof window === "undefined") {
      throw new Error('TouchInput can only be used with a browser environment');
      return;
    }

    this.enabled = true;

    this.dpads.forEach(dpad => dpad.listen());
    this.leftAnalogs.forEach(analog => analog.listen());
    this.rightAnalogs.forEach(analog => analog.listen());
    this.buttons.forEach(button => button.listen());
  }

  disable() {
    if (typeof window === "undefined") {
      throw new Error('TouchInput can only be used with a browser environment');
      return;
    }

    this.enabled = false;

    this.dpads.forEach(dpad => dpad.stopListening());
    this.leftAnalogs.forEach(analog => analog.stopListening());
    this.rightAnalogs.forEach(analog => analog.stopListening());
    this.buttons.forEach(button => button.stopListening());
  }

  getState() {

    const state = {
      ...RESPONSIVE_GAMEPAD_INPUTS
    };

    this.buttons.forEach(button => {
     state[button.input] = button.active; 
    });

    this.dpads.forEach(dpad => {
      Object.keys(dpad.state).forEach(stateKey => {
        state[stateKey] = dpad.state[stateKey] || state[stateKey];
      });
    });

    // Remove any remainig strings I may have
    Object.keys(state).forEach(stateKey => {
      if (typeof state[stateKey] === 'string') {
        delete state[stateKey];
      }
    });
    
    return state;
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

  addDpadInput(element) {
    const touchDpad = new TouchDpad(element);

    if (this.enabled) {
      touchDpad.listen();
    }

    this.dpads.push(touchDpad);

    // Return a function to remove
    return () => {
      touchDpad.stopListening();
      this.dpads.splice(this.dpads.indexOf(touchDpad), 1);
    }
  }

  addLeftAnalogInput(element) {
    this.addAnalogInput(element, ANALOG_TYPES.LEFT);
  }

  addRightAnalogInput(element) {
    this.addAnalogInput(element, ANALOG_TYPES.RIGHT)
  }

  addAnalogInput(element, analogType) {
    const touchAnalog = new TouchAnalog(element);

    if (this.enabled) {
      touchAnalog.listen();
    }
    
    if (analogType === ANALOG_TYPES.LEFT) {
      this.leftAnalogs.push(touchAnalog);
      // Return a function to remove
      return () => {
        touchDpad.stopListening();
        this.leftAnalogs.splice(this.leftAnalogs.indexOf(touchAnalog), 1);
      }
    } else {
      this.rightAnalogs.push(touchAnalog);
      // Return a function to remove
      return () => {
        touchDpad.stopListening();
        this.rightAnalogs.splice(this.rightAnalogs.indexOf(touchAnalog), 1);
      }
    }
  }
}
