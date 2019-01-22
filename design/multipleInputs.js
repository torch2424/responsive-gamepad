// I am a user who wants to enable/disable multiple inputs for my touch dpad

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

// pass a configuration object on add
const removeDpadFunction = ResponsiveGamepad.TouchInput.addDpadInput(
  document.querySelector('#dpad'),
  {
    allowMultipleDirections: true
  }
);
