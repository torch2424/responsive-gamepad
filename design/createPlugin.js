// I am a developer that wants to write a plugin
// to Extend Responsive gamepad

// Plugins want to try and follow the rollup plugin design:
// https://rollupjs.org/guide/en#plugins-overview
export default function ResponsivGamepadExamplePlugin () => {
  return {
    onAddPlugin: () => {
      // Function called when the plugin is added
    },
    onGetState: () => {
      // Function called whenever the state is being
      // created for ResponsiveGamepad.getState
    }
  }
};
