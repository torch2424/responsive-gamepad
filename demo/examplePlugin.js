// Example Plugin for the libarary

export default function ExamplePlugin() {
  return {
    onAddPlugin: () => console.log('ExamplePlugin addPlugin()'),
    onGetState: (CurrentResponsiveGamepadState) => {
      CurrentResponsiveGamepadState.EXAMPLE_PLUGIN_ADDED =  true;
      return CurrentResponsiveGamepadState;
    }
  }
}
