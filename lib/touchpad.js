import { RESPONSIVE_GAMEPAD_KEYS } from './schema';

// Functions to update keymap state
// 'this' should be bound by the respective service

// Reset all Direction keys for a DPAD for touch Inputs
function resetTouchDpad() {

  const dpadKeys = [
    RESPONSIVE_GAMEPAD_KEYS.DPAD_UP, 
    RESPONSIVE_GAMEPAD_KEYS.DPAD_RIGHT, 
    RESPONSIVE_GAMEPAD_KEYS.DPAD_DOWN, 
    RESPONSIVE_GAMEPAD_KEYS.DPAD_LEFT
  ];

  dpadKeys.forEach((dpadKey) => {
    this.keyMap[dpadKey].TOUCHPAD.forEach((touchInput) => {
      touchInput.ACTIVE = false;
    });
  });
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
export function updateTouchpad(keyMapKey, touchInput, event) {

  if (!this.enabled) {
    return;
  }

  if (!event || (event.type.includes('touch') && !event.touches)) return;

  //event.stopPropagation();
  event.preventDefault();

  // Check for active event types
  if(event.type === "touchstart" ||
    event.type === "touchmove" ||
    event.type === "mousedown") {
    // Active

    if (touchInput.TYPE === 'DPAD') {

      // Calculate for the correct key
      // Only using the first touch, since we shouldn't be having two fingers on the dpad
      let touch;
      if (event.type.includes('touch')) {
        touch = event.touches[0];
      } else if (event.type.includes('mouse')) {
        touch = event;
      }

      // Find if the horizontal or vertical influence is greater
      // Find our centers of our rectangles, and our unbiased X Y values on the rect
      const rectCenterX = (touchInput.BOUNDING_RECT.right - touchInput.BOUNDING_RECT.left) / 2;
      const rectCenterY = (touchInput.BOUNDING_RECT.bottom - touchInput.BOUNDING_RECT.top) / 2;
      const touchX = touch.clientX - touchInput.BOUNDING_RECT.left;
      let touchY = touch.clientY - touchInput.BOUNDING_RECT.top;

      // Lesson From: picoDeploy
      // Fix for shoot button causing the character to move right on multi touch error
      // + 50 for some buffer
      if(touchX > (rectCenterX + (touchInput.BOUNDING_RECT.width / 2) + 50)) {
        // Ignore the event
        return;
      }

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

          if(isLeft && touchInput.DIRECTION === 'LEFT') {
            touchInput.ACTIVE = true;
          } else if (!isLeft && touchInput.DIRECTION === 'RIGHT') {
            touchInput.ACTIVE = true;
          } else {
            touchInput.ACTIVE = false;
          }
        }
      } else {
        const isUp = touchY < (touchInput.BOUNDING_RECT.height / 2);
        if(isUp && touchInput.DIRECTION === 'UP') {
          touchInput.ACTIVE = true;
        } else if (!isUp && touchInput.DIRECTION === 'DOWN') {
          touchInput.ACTIVE = true;
        } else {
          touchInput.ACTIVE = false;
        }
      }
    }

    // Button Type
    if (touchInput.TYPE === 'BUTTON') {
      touchInput.ACTIVE = true;
    }
  } else {
    // Not active

    // Handle Dpad Type
    if (touchInput.TYPE === 'DPAD') {
      resetTouchDpad.bind(this)();
    }

    // Button Type
    if (touchInput.TYPE === 'BUTTON') {
      touchInput.ACTIVE = false;
    }
  }
}



