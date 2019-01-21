// I am a user that just wants simple gamepad and keyboard controls

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

const stopIntervalFunction = ResponsiveGamepad.setInterval(ResponsiveGamepadState => {
  // Do Stuff
}, 16);


