// I am a user that just wants simple gamepad and keyboard controls

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

const myGameLoop = () => {
  const state = ResponsiveGamepad.getState();
};


