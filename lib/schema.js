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

const touchInputTypes = {
  BUTTON: "BUTTON",
  DPAD: "DPAD",
  ANALOG: "ANALOG"
};

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

export function createTouchInput(element, inputType, updateTouchInputRect, updateTouchInput, keyMap, analogMaps, additionalArguments) {

  if (!Object.keys(touchInputTypes).includes(inputType)) {
    return false;
  }

  // Create our basic touch input attributes
  const touchInput = Object.assign({}, touchInputSchema);
  touchInput.ID = getInputId();
  touchInput.ELEMENT = element;
  touchInput.TYPE = inputType;
  
  // Add our bounding rect
  const updateRectHandler = updateTouchInputRect;
  updateRectHandler(touchInput)

  // Define our eventListener functions
  const eventListenerCallback = (event) => {
    updateTouchInput(touchInput, keyMap, analogMaps[touchInput.ID], additionalArguments, event);
  }

  // Add event listeners to the element
  window.addEventListener("resize", updateRectHandler);
  touchInput.ELEMENT.addEventListener("touchstart", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("touchmove", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("touchend", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mousedown", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mousemove", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mouseup", eventListenerCallback);
  touchInput.ELEMENT.addEventListener("mouseleave", eventListenerCallback);

  // Create a dispose function on the touch input
  touchInput.UNLISTEN = () => {
    window.removeEventListener("resize", updateRectHandler);
    touchInput.ELEMENT.removeEventListener("touchstart", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("touchmove", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("touchend", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("mousedown", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("mousemove", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("mouseup", eventListenerCallback);
    touchInput.ELEMENT.removeEventListener("mouseleave", eventListenerCallback);
  }


  // Add the touch input to the appropriate keymap
  if (inputType === touchInputTypes.BUTTON) {
    // Add the button to the additional keyMapKey argument
    keyMap[additionalArguments[0]].TOUCHPAD.push(touchInput);
  } else if(inputType === touchInputTypes.DPAD) {
    // Spread the touch input over the DPAD_X inputs
    (['UP', 'RIGHT', 'DOWN', 'LEFT']).forEach(direction => {
      const directionalTouchInput = Object.assign({}, touchInput);
      directionalTouchInput.DIRECTION = direction;
      keyMap[`DPAD_${direction}`].TOUCHPAD.push(directionalTouchInput);
    });
  } else if(inputType === touchInputTypes.ANALOG) {
    // Since we are axes, and not on/off handled in updateTouchpad
    analogMaps[touchInput.ID] = {
      TOUCH_INPUT: touchInput
    };
  }

  return touchInput.ID;
}

// Helper function for creating new gamepads
export function mergeInputs(baseKey) {

  // Get our extra arguments
  const originalArguments = [
    ...arguments
  ];
  const extraArguments = [
    ...originalArguments.slice(1)
  ];

  // Create our new merged key
  let mergedKey = {
    KEYBOARD: [
      ...baseKey.KEYBOARD
    ],
    GAMEPAD: [
      ...baseKey.GAMEPAD
    ],
    TOUCHPAD: [
      ...baseKey.TOUCHPAD
    ]
  };

  extraArguments.forEach(key => {
    mergedKey = {
      KEYBOARD: [
        ...mergedKey.KEYBOARD,
        ...key.KEYBOARD
      ],
      GAMEPAD: [
        ...mergedKey.GAMEPAD,
        ...key.GAMEPAD
      ],
      TOUCHPAD: [
        ...mergedKey.TOUCHPAD,
        ...key.TOUCHPAD
      ]
    }
  });
  
  return mergedKey;
}

export const RESPONSIVE_GAMEPAD_KEYS = responsiveGamepadKeys;
export const TOUCH_INPUT_TYPES = touchInputTypes;
