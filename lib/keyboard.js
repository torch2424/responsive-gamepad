import InputSource from './inputSource';
import {RESPONSIVE_GAMEPAD_INPUTS} from './constants';

// HTML Tags that can be focused on, where the library should be disabled
// https://www.w3schools.com/tags/ref_byfunc.asp
const INPUT_HTML_TAGS = [
  'input',
  'textarea',
  'button',
  'select',
  'option',
  'optgroup',
  'label',
  'datalist'
];

// Modified Keys Ignored
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
const MODIFIER_KEYS = [
  "Alt",
  "Control",
  "Meta",
  "OS"
];

export default class Keyboard extends InputSource {
  constructor() {
    super();
    
    // Create our keymap to our inputs
    this.keymap = {};
    Object.keys(RESPONSIVE_GAMEPAD_INPUTS).forEach(input => {
      this.keymap[input] = {
        keys: [],
        value: undefined
      };
    });

    // Some settings pertaining to the keyboard
    this.enableIgnoreWhenInputElementFocused();
    this.enableIgnoreWhenModifierState();

    // Our bound updateFunction
    this._boundUpdateKeymapValues = this._updateKeymapValues.bind(this);
  }

  enable() {
    if (typeof window === "undefined") {
      throw new Error('Keyboard can only be used with a browser environment');
      return;
    }

    window.addEventListener('keyup', this._boundUpdateKeymapValues)
    window.addEventListener('keydown', this._boundUpdateKeymapValues)
  }

  disable() {
    if (typeof window === "undefined") {
      throw new Error('Keyboard can only be used with a browser environment');
      return;
    }

    window.removeEventListener('keyup', this._boundUpdateKeymapValues)
    window.removeEventListener('keydown', this._boundUpdateKeymapValues)
  }

  getState() {
    const state = {
      ...RESPONSIVE_GAMEPAD_INPUTS
    };

    Object.keys(this.keymap).forEach(key => {
      state[key] = this.keymap[key].value;
    });

    return state;
  }

  enableIgnoreWhenInputElementFocused() {
    this.ignoreWhenInputElementFocused = true;

  }

  disableIgnoreWhenInputElementFocused() {
    this.ignoreWhenInputElementFocused = false;
  }

  enableIgnoreWhenModifierState() {
    this.ignoreOnModifierState = true;
  }

  disableIgnoreWhenModifierState() {
    this.ignoreOnModifierState = false;
  }

  setKeysToResponsiveGamepadInput(codes, responsiveGamepadInput) {
    if (!codes || !responsiveGamepadInput || codes.length === 0) {
      throw new Error('Could not set the specificed keyboard keys to input');
    }

    if (typeof codes === 'string') {
      codes = [codes];
    }

    this.keymap[responsiveGamepadInput].keys = codes;
  }

  _isFocusedOnInputElement() {
    return INPUT_HTML_TAGS.some((htmlTag) => {
      if (document.activeElement && document.activeElement.tagName.toLowerCase() === htmlTag.toLowerCase()) {
        return true;
      }
      return false;
    });
  }

  _isInModifierState(event) {
    return MODIFIER_KEYS.some(key => event.getModifierState(key) || event.code === key);
  }

  _updateKeymapValues(event) {

    // Check if we should be ignoring the event
    if (this.ignoreWhenInputElementFocused && this._isFocusedOnInputElement()) {
      return;
    }

    if (this.ignoreOnModifierState && this._isInModifierState(event)) {
      return;
    }

    event.preventDefault();

    // Update the keymap accordingly to the key event
    Object.keys(this.keymap).some(key => {
      return key.keys.some(code => {
        if (code === event.code) {

          if (event.type === 'keydown') {
            this.keymap[key].value = true;
          } else {
            this.keymap[key].value = false;
          }

          return true;
        }
        return false;
      });
    });
  }
}
