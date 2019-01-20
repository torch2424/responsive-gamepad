// File to to test ideas for the new API

// Export Default our lib
import ResponsiveGamepad from 'responsive-gamepad';

// Plugins should be like rollup styles
import ResponsiveGamepadPluginGameBoy from 'responsive-gamepad-plugin-gameboy';

// Must enable befoe doing anything else
ResponsiveGamepad.enable();

// Plugins are just syntatical sugar. They are functions that return an object with 
// functions that should be run on events.
ResponsiveGamepad.addPlugin(ResponsiveGamepadPluginGameBoy());

// Basic usage
// We can set interval our selves. No second param, Default is raf, can pass a time in ms in second param
ResponsiveGamepad.setInterval(ResponsiveGamepadState => {
  // Do Stuff
}, 16);

// Can also get state manually
ResponsiveGamepad.getState();


// PLUGIN EXAMPLE
