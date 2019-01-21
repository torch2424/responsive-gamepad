// I am a user who just wants the gamepad state now, synchronously.

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

const gamepadState = ResponsiveGamepad.getState();
