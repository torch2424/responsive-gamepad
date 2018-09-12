import { RESPONSIVE_GAMEPAD_KEYS } from './schema';

// Functions to update keymap state
// 'this' should be bound by the respective service

const dpadKeys = [
  RESPONSIVE_GAMEPAD_KEYS.DPAD_UP, 
  RESPONSIVE_GAMEPAD_KEYS.DPAD_RIGHT, 
  RESPONSIVE_GAMEPAD_KEYS.DPAD_DOWN, 
  RESPONSIVE_GAMEPAD_KEYS.DPAD_LEFT
];

// Reset all Direction keys for a DPAD for touch Inputs
function resetTouchDpad() {

  dpadKeys.forEach((dpadKey) => {
    this.keyMap[dpadKey].TOUCHPAD.forEach((touchInput) => {
      touchInput.ACTIVE = false;
    });
  });
}

// Find a Dpad Touch element with Direction and ID
function findDpadTouchInput(keyMap, id, direction) {
  let foundTouchInput;

  keyMap[`DPAD_${direction}`].TOUCHPAD.some((touchInput) => {
    if (touchInput.ID === id) {
      foundTouchInput = touchInput;
      return true;
    }
    return false;
  });

  return foundTouchInput;
}

// Function to set the axes of an analog to zero
function resetTouchAnalog(touchInput, analogMap, additionalArguments) {
  analogMap[`${additionalArguments[0]}_ANALOG_HORIZONTAL_AXIS`] = 0.0;
  analogMap[`${additionalArguments[0]}_ANALOG_VERTICAL_AXIS`] = 0.0;
  analogMap[`${additionalArguments[0]}_ANALOG_UP`] = false;
  analogMap[`${additionalArguments[0]}_ANALOG_RIGHT`] = false;
  analogMap[`${additionalArguments[0]}_ANALOG_DOWN`] = false;
  analogMap[`${additionalArguments[0]}_ANALOG_LEFT`] = false;

  touchInput.ELEMENT.style.transform = `translate(0px, 0px)`;
}

// Function to update touch button position and size
export function updateTouchpadRect() {
  // Read from the DOM, and get each of our elements position, doing this here, as it is best to read from the dom in sequence
  // use element.getBoundingRect() top, bottom, left, right to get clientX and clientY in touch events :)
  // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
  //console.log("GamepadComponent: Updating Rect()...");
  this.keyMapKeys.forEach((key) => {
    this.keyMap[key].TOUCHPAD.forEach((touchInput, index) => {
      const boundingRect = this.keyMap[key].TOUCHPAD[index].ELEMENT.getBoundingClientRect();
      this.keyMap[key].TOUCHPAD[index].BOUNDING_RECT = boundingRect;
    });
  });
}

// Function called on an event of a touchInput SVG Element
export function updateTouchpad(touchInput, keyMap, analogMap, additionalArguments, event) {

  if (!this.enabled) {
    return;
  }

  if (!event || (event.type.includes('touch') && !event.touches)) return;

  //event.stopPropagation();
  event.preventDefault();

  // Check if we still have our requirements
  if ((touchInput.TYPE === 'DPAD' && !keyMap) ||
    touchInput.TYPE === 'ANALOG' && !analogMap) {
    return;
  }

  // Check for active event types
  if(event.type === "touchstart" ||
    event.type === "touchmove" ||
    event.type === "mousedown" ||
    event.type === "mousemove") {
    // Active

    if (event.type === "mousemove" && !touchInput.MOUSEDOWN) {
      return;
    }

    if (event.type === "mousedown") {

      touchInput.MOUSEDOWN = true;
    }

    // Button Type
    if (touchInput.TYPE === 'BUTTON' && event.type !== "mousemove") {
      touchInput.ACTIVE = true;
      return;
    } 

    // DIRECTIONAL
    // We will need these  calculations for when if we are dpad or analog

    // Calculate for the correct key
    // Only using the first touch, since we shouldn't be having two fingers on the dpad
    let touch;
    if (event.type.includes('touch')) {
      touch = event.touches[0];
    } else if (event.type.includes('mouse')) {
      touch = event;
    }

    // We will need these  calculations for when if we are dpad or analog
    // Find our centers of our rectangles, and our unbiased X Y values on the rect
    const rectCenterX = (touchInput.BOUNDING_RECT.right - touchInput.BOUNDING_RECT.left) / 2;
    const rectCenterY = (touchInput.BOUNDING_RECT.bottom - touchInput.BOUNDING_RECT.top) / 2;
    const touchX = touch.clientX - touchInput.BOUNDING_RECT.left;
    let touchY = touch.clientY - touchInput.BOUNDING_RECT.top;



    if (touchInput.TYPE === 'DPAD') {

      // Find if the horizontal or vertical influence is greater
      // Lesson From: picoDeploy
      // Fix for shoot button causing the character to move right on multi touch error
      // + 50 for some buffer
      if(touchX > (rectCenterX + (touchInput.BOUNDING_RECT.width / 2) + 50)) {
        // Ignore the event
        return;
      }

      // We forsure know we have input
      // Reset previous DPAD State
      resetTouchDpad.bind(this)();

      // Create an additonal influece for horizontal, to make it feel better
      const horizontalInfluence = touchInput.BOUNDING_RECT.width / 8;

      // Determine if we are horizontal or vertical
      const isHorizontal = Math.abs(rectCenterX - touchX) + horizontalInfluence > Math.abs(rectCenterY - touchY);

      // Find if left or right from width, vice versa for height
      if(isHorizontal) {
        // Add a horizontal dead zone
        const deadzoneSize = touchInput.BOUNDING_RECT.width / 20;
        if(Math.abs((touchInput.BOUNDING_RECT.width / 2) - touchX) > deadzoneSize) {

          const isLeft = touchX < (touchInput.BOUNDING_RECT.width / 2);

          if(isLeft) {
            // Set DPAD_LEFT Touch Input Active
            findDpadTouchInput(keyMap, touchInput.ID, 'LEFT').ACTIVE = true;
          } else {
            findDpadTouchInput(keyMap, touchInput.ID, 'RIGHT').ACTIVE = true;
          }       
        }
      } else {
        const isUp = touchY < (touchInput.BOUNDING_RECT.height / 2);
        if(isUp) {
          findDpadTouchInput(keyMap, touchInput.ID, 'UP').ACTIVE = true;
        } else {
          findDpadTouchInput(keyMap, touchInput.ID, 'DOWN').ACTIVE = true;
        }      
      }
    }

    // Analog Type
    if (touchInput.TYPE === 'ANALOG') {
      // Find our Horizontal Axis
      const horizontalDifferenceFromCenter = touchX - rectCenterX;
      let horizontalAxis = horizontalDifferenceFromCenter / rectCenterX;
      if (horizontalAxis > 1) {
        horizontalAxis = 1.0;
      } else if (horizontalAxis < -1) {
        horizontalAxis = -1.0;
      }

      // Find our Vertical Axis
      const verticalDifferenceFromCenter = touchY - rectCenterY;
      let verticalAxis = verticalDifferenceFromCenter / rectCenterY;
      if (verticalAxis > 1) {
        verticalAxis = 1.0;
      } else if (verticalAxis < -1) {
        verticalAxis = -1.0;
      }

      // Apply styles to element
      const translateX = (rectCenterX * horizontalAxis) / 2;
      const translateY = (rectCenterY * verticalAxis) / 2;
      touchInput.ELEMENT.style.transform = `translate(${translateX}px, ${translateY}px)`;

      // Set Axis on keyMap
      analogMap[`${additionalArguments[0]}_ANALOG_HORIZONTAL_AXIS`] = horizontalAxis;
      analogMap[`${additionalArguments[0]}_ANALOG_VERTICAL_AXIS`] = verticalAxis;

      // Set Analog Direction State
      analogMap[`${additionalArguments[0]}_ANALOG_UP`] = verticalAxis < 0;
      analogMap[`${additionalArguments[0]}_ANALOG_RIGHT`] = horizontalAxis > 0;
      analogMap[`${additionalArguments[0]}_ANALOG_DOWN`] = verticalAxis > 0;
      analogMap[`${additionalArguments[0]}_ANALOG_LEFT`] = horizontalAxis < 0;
    }
  } else {
    // Not active

    touchInput.MOUSEDOWN = false;

    // Button Type
    if (touchInput.TYPE === 'BUTTON') {
      touchInput.ACTIVE = false;
      return;
    }

    // Handle Dpad Type
    if (touchInput.TYPE === 'DPAD') {
      resetTouchDpad.bind(this)();
      return;
    }

    if (touchInput.TYPE === 'ANALOG') {
      resetTouchAnalog(touchInput, analogMap, additionalArguments);
      return;
    }
  }
}



