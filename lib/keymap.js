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
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [12],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP
  );

  //Right
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ArrowRight", "Numpad6"],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_RIGHT
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyD"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_RIGHT
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyL"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_RIGHT
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [15],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_RIGHT
  );

  // Down
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ArrowDown", "Numpad5", "Numpad2"],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_DOWN
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyS"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_DOWN
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyK"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_DOWN
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [13],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_DOWN
  );

  // Left
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ArrowLeft", "Numpad4"],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_LEFT
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyA"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_LEFT
  );
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyJ"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_LEFT
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [14],
    RESPONSIVE_GAMEPAD_INPUTS.DPAD_LEFT
  );

  // Left Analog Axis
  ResponsiveGamepad.Gamepad.setGamepadAxesToResponsiveGamepadInput(
    [0],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_HORIZONTAL_AXIS
  );
  ResponsiveGamepad.Gamepad.setGamepadAxesToResponsiveGamepadInput(
    [1],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_ANALOG_VERTICAL_AXIS
  );

  // Right Analog Axis
  ResponsiveGamepad.Gamepad.setGamepadAxesToResponsiveGamepadInput(
    [2],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_HORIZONTAL_AXIS
  );
  ResponsiveGamepad.Gamepad.setGamepadAxesToResponsiveGamepadInput(
    [3],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_ANALOG_VERTICAL_AXIS
  );


  // A
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyX", "Semicolon", "Numpad7"],
    RESPONSIVE_GAMEPAD_INPUTS.A
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [0],
    RESPONSIVE_GAMEPAD_INPUTS.A
  );

  // B
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyZ", "Escape", "Quote", "Backspace", "Numpad9"],
    RESPONSIVE_GAMEPAD_INPUTS.B
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [1],
    RESPONSIVE_GAMEPAD_INPUTS.B
  );

  // X
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyC"],
    RESPONSIVE_GAMEPAD_INPUTS.X
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [2],
    RESPONSIVE_GAMEPAD_INPUTS.X
  );

  // Y
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyV"],
    RESPONSIVE_GAMEPAD_INPUTS.Y
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [3],
    RESPONSIVE_GAMEPAD_INPUTS.Y
  );

  // Left Trigger
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyQ"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_TRIGGER
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [6],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_TRIGGER
  );

  // Left Bumper
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyE"],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_BUMPER
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [4],
    RESPONSIVE_GAMEPAD_INPUTS.LEFT_BUMPER
  );

  // Right Trigger
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyU"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_TRIGGER
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [7],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_TRIGGER
  );

  // Right Bumper
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["KeyO"],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_BUMPER
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [5],
    RESPONSIVE_GAMEPAD_INPUTS.RIGHT_BUMPER
  );

  // Start
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["Enter", "Numpad3"],
    RESPONSIVE_GAMEPAD_INPUTS.START
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [9],
    RESPONSIVE_GAMEPAD_INPUTS.START
  );

  // Select
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["ShiftRight", "ShiftLeft", "Tab", "Numpad1"],
    RESPONSIVE_GAMEPAD_INPUTS.SELECT
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [8],
    RESPONSIVE_GAMEPAD_INPUTS.SELECT
  );

  // Special
  ResponsiveGamepad.Keyboard.setKeysToResponsiveGamepadInput(
    ["Space", "Backslash", "Backquote"],
    RESPONSIVE_GAMEPAD_INPUTS.SPECIAL
  );
  ResponsiveGamepad.Gamepad.setGamepadButtonsToResponsiveGamepadInput(
    [16],
    RESPONSIVE_GAMEPAD_INPUTS.SPECIAL
  );
}

