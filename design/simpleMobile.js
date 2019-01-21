// I am a user that just wants simple gamepad, mobile, and keyboard controls

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

// Need to add elements to get mobile/touch support
// 3 types of touch inputs supported:
// DPAD
// Buttons
// Analogs

const removeDpadFunction = ResponsiveGamepad.TouchInput.addDpad(document.querySelector('#dpad'));
const removeLeftAnalgoFunction = ResponsiveGamepad.TouchInput.addLeftAnalogInput(document.querySelector('#left-analog'));
const removeRightAnalgoFunction = ResponsiveGamepad.TouchInput.addRightAnalogInput(document.querySelector('#right-analog'));
const removeButtonFunction = ResponsiveGamepad.TouchInput.addButtonInput(
  document.querySelector('#a-button'),
  ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.A
);

const myGameLoop = () => {
  const state = ResponsiveGamepad.getState();
};


