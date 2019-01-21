// I am a user who wants a plugin to modify the gamepad state

import ResponsiveGamepad from 'responsive-gamepad';
import ResponsiveGamepadPluginExample from 'responsive-gamepad-plugin-example';

const removePlugin = ResponsiveGamepad.addPlugin(ResponsiveGamepadPluginExample());

ResponsiveGamepad.enable();

const stopIntervalFunction = ResponsiveGamepad.setInterval(ResponsiveGamepadState => {
  // State will be modified here
  // Could have extra inputs, 
  // or inputs merged together, 
  // Some hacked together support for another input source,
  // etc...
}, 16);

