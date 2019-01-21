// Keymaps should all be using: KeyboardEvent.code
// As it represents physical location relative to a US QWERTY Layout.
// And not the value of the key pressed.
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

// For KeyCodes Table, see: https://www.w3.org/TR/uievents-code/#code-value-tables
// KeyCode Tester: http://keycode.info/

import {RESPONSIVE_GAMEPAD_INPUTS} from './constants';

export default function setDefaultKeymap(ResponsiveGamepad) {
  // Up
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ArrowUp", "Numpad8"],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyW"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyI"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP
  );

  //Right
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ArrowRight", "Numpad6"],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyD"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyL"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP
  );

  // Down
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ArrowDown", "Numpad5", "Numpad2"],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyS"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyK"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP
  );

  // Left
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ArrowLeft", "Numpad4"],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyA"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_UP
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyJ"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_UP
  );

  // A
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyX", "Semicolon", "Numpad7"],
    RESPONSIVE_GAMEPAD_INPUTS.A
  );

  // B
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyZ", "Escape", "Quote", "Backspace", "Numpad9"],
    RESPONSIVE_GAMEPAD_INPUTS.B
  );

  // X
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyC"],
    RESPONSIVE_GAMEPAD_INPUTS.X
  );

  // Y
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyV"],
    RESPONSIVE_GAMEPAD_INPUTS.Y
  );

  // Left Trigger
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyQ"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_TRIGGER
  );

  // Left Bumper
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyE"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_BUMPER
  );

  // Right Trigger
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyU"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_TRIGGER
  );

  // Right Bumper
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyO"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_BUMPER
  );

  // Start
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["Enter", "Numpad3"],
    RESPONSIVE_GAMEPAD_INPUTS.START
  );

  // Select
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ShiftRight", "ShiftLeft", "Tab", "Numpad1"],
    RESPONSIVE_GAMEPAD_INPUTS.SELECT
  );

  // Special
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["Space", "Backslash", "Backquote"],
    RESPONSIVE_GAMEPAD_INPUTS.SPECIAL
  );
}

