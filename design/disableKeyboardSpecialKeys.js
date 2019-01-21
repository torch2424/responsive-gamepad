// I am a user that doesn't want to ignore special keys for shortcuts 

import ResponsiveGamepad from 'responsive-gamepad';

ResponsiveGamepad.enable();

// Inspired by: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState 
RepsonsiveGamepad.Keyboard.enableIgnoreWhenModifierState();
RepsonsiveGamepad.Keyboard.disableIgnoreWhenModifierState();
