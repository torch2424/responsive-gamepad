// I am a user that wants to add multiplayer support for gamepads

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

// Player 1
RepsonsiveGamepad.Gamepad.getState(0);
// Player 2
RepsonsiveGamepad.Gamepad.getState(1);

// Etc...
