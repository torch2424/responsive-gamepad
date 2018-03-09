// Define a keyboard key schema
const keyInputSchema = {
  ACTIVE: false,
  KEY_CODE: undefined
}

// Define a gamepad button schema
// https://w3c.github.io/gamepad/#remapping
const gamepadInputSchema = {
  ACTIVE: false,
  BUTTON_ID: undefined,
  JOYSTICK: {
    AXIS_ID: undefined,
    IS_POSITIVE:undefined
  }
}

const touchInputSchema = {
  ACTIVE: false,
  ELEMENT: undefined,
  TYPE: undefined,
  DIRECTION: undefined
}


// Define our finaly kerboard schema here
const keyMapSchema = {
  UP: {
    KEYBOARD: [],
    GAMEPAD: [],
    TOUCHPAD: []
  },
  RIGHT: {
    KEYBOARD: [],
    GAMEPAD: [],
    TOUCHPAD: []
  },
  DOWN: {
    KEYBOARD: [],
    GAMEPAD: [],
    TOUCHPAD: []
  },
  LEFT: {
    KEYBOARD: [],
    GAMEPAD: [],
    TOUCHPAD: []
  },
  A: {
    KEYBOARD: [],
    GAMEPAD: [],
    TOUCHPAD: []
  },
  B: {
    KEYBOARD: [],
    GAMEPAD: [],
    TOUCHPAD: []
  },
  SELECT: {
    KEYBOARD: [],
    GAMEPAD: [],
    TOUCHPAD: []
  },
  START: {
    KEYBOARD: [],
    GAMEPAD: [],
    TOUCHPAD: []
  }
}

export function getKeyInput(keyCode) {
  const input = Object.assign({}, keyInputSchema);
  input.KEY_CODE = keyCode;
  return input
}

export function getGamepadInput(gamepadButtonId, axisId, axisIsPositive) {
  const input = Object.assign({}, gamepadInputSchema);
  if(gamepadButtonId || gamepadButtonId === 0) {
    input.BUTTON_ID = gamepadButtonId;
  } else if (axisId !== undefined && axisIsPositive !== undefined) {
    input.JOYSTICK.AXIS_ID = axisId;
    input.JOYSTICK.IS_POSITIVE = axisIsPositive;
  }
  return input;
}

export function getTouchInput(element, type, direction) {
  const input = Object.assign({}, touchInputSchema);
  // TODO:
  return input
}

export function KeyMapSchema() {
  return Object.assign({}, keyMapSchema);
}
