// Define a keyboard key schema
const keyInputSchema = {
  ACTIVE: false,
  KEY_CODE: false
}

// Define a gamepad button schema
// https://w3c.github.io/gamepad/#remapping
const gamepadInputSchema = {
  ACTIVE: false,
  BUTTON_ID: false,
  JOYSTICK: {
    AXIS_ID: false,
    IS_POSITIVE: true
  }
}

const touchInputSchema = {
  ACTIVE: false,
  ELEMENT: false
  TYPE: false,
  DIRECTION: false
}


// Define our finaly kerboard schema here
const layoutSchema = {
  UP: {
    KEYBOARD: [],
    GAMEPAD: [],
    VIRTUAL_GAMEPAD: []
  },
  RIGHT: {
    KEYBOARD: [],
    GAMEPAD: [],
    VIRTUAL_GAMEPAD: []
  },
  DOWN: {
    KEYBOARD: [],
    GAMEPAD: [],
    VIRTUAL_GAMEPAD: []
  },
  LEFT: {
    KEYBOARD: [],
    GAMEPAD: [],
    VIRTUAL_GAMEPAD: []
  },
  A: {
    KEYBOARD: [],
    GAMEPAD: [],
    VIRTUAL_GAMEPAD: []
  },
  B: {
    KEYBOARD: [],
    GAMEPAD: [],
    VIRTUAL_GAMEPAD: []
  },
  SELECT: {
    KEYBOARD: [],
    GAMEPAD: [],
    VIRTUAL_GAMEPAD: []
  },
  START: {
    KEYBOARD: [],
    GAMEPAD: [],
    VIRTUAL_GAMEPAD: []
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

export function LayoutSchema() {
  return Object.assign({}, layoutSchema);
}
