// Functions to update keymap state
// 'this' should be bound by the respective service

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

// Function to return if we are ignoring input for key events
export function isIgnoringKeyEvents() {

  // Checking for window for preact prerender
  if (typeof window === "undefined") {
    return true;
  }

  return INPUT_HTML_TAGS.some((htmlTag) => {
    if (document.activeElement && document.activeElement.tagName.toLowerCase() === htmlTag.toLowerCase()) {
      return true;
    }
    return false;
  });
}



// Function to handle keyboard update events
export function updateKeyboard(keyEvent) {

  if (!this.enabled) {
    return;
  }

  // Checking for window for preact prerender
  if (typeof window === "undefined") {
    return;
  }

  // Ignore the event if focus on a input-table field
  // https://www.w3schools.com/tags/ref_byfunc.asp
  if (keyEvent && keyEvent.target && keyEvent.target.tagName) {
    let isTargetInputField = INPUT_HTML_TAGS.some((htmlTag) => {
      if (keyEvent && keyEvent.target.tagName.toLowerCase() === htmlTag.toLowerCase()) {
        return true;
      }
      return false;
    });

    if (isTargetInputField) {
      return;
    }
  }

  // Get the new state of the key
  let isPressed = false;
  if (keyEvent.type === 'keydown') {
    isPressed = true;
  }

  // Variable to check if a key has been found
  let keyFound = false;

  // Loop through our keys
  this.keyMapKeys.forEach((key) => {
    this.keyMap[key].KEYBOARD.forEach((keyInput, index) => {
      if(keyInput.KEY_CODE === keyEvent.keyCode) {
        this.keyMap[key].KEYBOARD[index].ACTIVE = isPressed;
        keyFound = true;
      }
    });
  });

  // If we found a key, prevent default so page wont scroll and things
  keyEvent.preventDefault();
}
