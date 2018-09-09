// Define a keyboard key schema
const keyInputSchema = {
  ID: undefined,
  ACTIVE: false,
  KEY_CODE: undefined
}

// Define a gamepad button schema
// https://w3c.github.io/gamepad/#remapping
const gamepadInputSchema = {
  ID: undefined,
  ACTIVE: false,
  BUTTON_ID: undefined,
  JOYSTICK: {
    AXIS_ID: undefined,
    IS_POSITIVE: undefined
  }
}

const touchInputSchema = {
  ID: undefined,
  ACTIVE: false,
  ELEMENT: undefined,
  TYPE: undefined,
  DIRECTION: undefined,
  EVENT_HANDLER: undefined,
  BOUNDING_RECT: undefined
}

// Define our keymap keys
const responsiveGamepadKeys = {
  DPAD_UP: 'DPAD_UP',
  DPAD_RIGHT: 'DPAD_RIGHT',
  DPAD_DOWN: 'DPAD_DOWN',
  DPAD_LEFT: 'DPAD_LEFT',
  LEFT_ANALOG_UP: 'LEFT_ANALOG_UP',
  LEFT_ANALOG_RIGHT: 'LEFT_ANALOG_RIGHT',
  LEFT_ANALOG_DOWN: 'LEFT_ANALOG_DOWN',
  LEFT_ANALOG_LEFT: 'LEFT_ANALOG_LEFT',
  RIGHT_ANALOG_UP: 'RIGHT_ANALOG_UP',
  RIGHT_ANALOG_RIGHT: 'RIGHT_ANALOG_RIGHT',
  RIGHT_ANALOG_DOWN: 'RIGHT_ANALOG_DOWN',
  RIGHT_ANALOG_LEFT: 'RIGHT_ANALOG_LEFT',
  A: 'A',
  B: 'B',
  X: 'X',
  Y: 'Y',
  LEFT_TRIGGER: 'LEFT_TRIGGER',
  LEFT_BUMPER: 'LEFT_BUMPER',
  RIGHT_TRIGGER: 'RIGHT_TRIGGER',
  RIGHT_BUMPER: 'RIGHT_BUMPER',
  SELECT: 'SELECT',
  START: 'START',
  SPECIAL: 'SPECIAL'
}


// Define our keymap schema generator
export function KeyMapSchema() {
  const keyMapSchema = {}
  Object.keys(responsiveGamepadKeys).forEach(key => {
    keyMapSchema[key] = {
      KEYBOARD: [],
      GAMEPAD: [],
      TOUCHPAD: []
    }
  });
  return keyMapSchema;
}

// Function to return an ID for our input
// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function getInputId() {

  const idGenerator = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

  const stringId = `${idGenerator()}${idGenerator()}`;
  return stringId.slice();
}

export function getKeyInput(keyCode) {
  const input = Object.assign({}, keyInputSchema);
  input.ID = getInputId();
  input.KEY_CODE = keyCode;
  return input
}

export function getGamepadInput(gamepadButtonId, axisId, axisIsPositive) {
  const input = Object.assign({}, gamepadInputSchema);
  input.ID = getInputId();
  input.JOYSTICK = Object.assign({}, gamepadInputSchema.JOYSTICK);
  if(gamepadButtonId || gamepadButtonId === 0) {
    input.BUTTON_ID = gamepadButtonId;
  } else if (axisId !== undefined && axisIsPositive !== undefined) {
    input.JOYSTICK.AXIS_ID = axisId;
    input.JOYSTICK.IS_POSITIVE = axisIsPositive;
  }
  return input;
}

export function getTouchInput(element, eventHandler, inputType) {
  const touchInput = Object.assign({}, touchInputSchema);

  touchInput.ID = getInputId();

  // TODO: Check the type for a valid type

  // Add our passed parameters
  touchInput.ELEMENT = element;
  touchInput.EVENT_HANDLER = eventHandler;
  touchInput.TYPE = inputType;
  
  // If DPAD type, get the direction
  if (touchInput.TYPE === 'DPAD') {
   touchInput.DIRECTION = arguments[3];
  }

  // Add our bounding rect
  const boundingRect = touchInput.ELEMENT.getBoundingClientRect();
  touchInput.BOUNDING_RECT = boundingRect;

  // Define our eventListener functions
  const eventListenerCallback = (event) => {
    if (touchInput.EVENT_HANDLER) {
      touchInput.EVENT_HANDLER(touchInput, event);
    }
  }

  // Add event listeners to the element
  touchInput.ELEMENT.addEventListener("touchstart", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("touchmove", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("touchend", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mousedown", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mouseup", eventListenerCallback);

  return touchInput;
}

export const RESPONSIVE_GAMEPAD_KEYS = responsiveGamepadKeys;
