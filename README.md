# responsive-gamepad

<!-- Badges -->
[![Build Status](https://travis-ci.org/torch2424/responsive-gamepad.svg?branch=master)](https://travis-ci.org/torch2424/responsive-gamepad)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/responsive-gamepad.svg)
![npm](https://img.shields.io/npm/dt/responsive-gamepad.svg)
![npm version](https://img.shields.io/npm/v/responsive-gamepad.svg)
![GitHub](https://img.shields.io/github/license/torch2424/responsive-gamepad.svg)

Handle Keyboard, Gamepad, and Touch Controls in the browser under a single API, (< 5KB).

[Demo](https://torch2424.github.io/responsive-gamepad/)

<img src="./assets/responsiveGamepadDemo.gif" width="500px" />

# Table Of Contents

* [Quick Start](#quick-start)
* [Projects Using responsive-gamepad](#projects-using-responsive-gamepad)
* [Instalation](#instalation)
* [API](#api)
  * [ResponsiveGamepad](#responsivegamepad)
    * [Keyboard](#keyboard)
    * [Gamepad](#gamepad)
    * [TouchInput](#touchinput)
* [Input Map](#input-map)
* [Plugins](#plugins)
  * [How to build plugins](#how-to-build-plugins)
  * [Featured Plugins](#featured-plugins)
* [Contributing](#contributing)
  * [Installation](#installation)
  * [CLI Commands / Npm Scripts](#cli-commands--npm-scripts)
* [LICENSE](#license)
* [Other Notes](#other-notes)

# Quick Start

This is a quick **Tl;DR** on installing and using responsive-gamepad:

1. `npm install --save responsive-gamepad`

2. `import { ResponsiveGamepad } from 'responsive-gamepad';`

3. `ResponsiveGamepad.enable();`

4. `ResponsiveGamepad.getState();`

Please see the [Input Map](#input-map) section for what Responsive Gamepad Keys represent on a "Standard" Controller.

# Projects Using `responsive-gamepad`

* [WasmBoy](https://github.com/torch2424/wasmBoy) - Gameboy / Gameboy Color Emulator written for Web Assembly using AssemblyScript.

# Instalation

*See the [demo/index.js](./demo/index.js), for a proper usage, and touch input example*

`npm install --save responsive-gamepad`

# API

*Additional information/exports concerning  can be found in the [Input Map](#input-map) section.*

*For user journeys, and common How-To use cases, see the [design](./design) directory*

First, import the `ResponsiveGamepad` singleton service with:

`import ResponsiveGamepad from 'responsive-gamepad'`

## ResponsiveGamepad

*Properties accessed from: `ResponsiveGamepad`.*

* `getVersion()`: string - Returns the current version of the lib.

* `enable()`: void - Enables `ResponsiveGamepad`, and listens for events.

* `disable()`: void - Removes all listeners from ResponsiveGamepad, and stops listening.

* `isEnabled()`: boolean - Returns if `ResponsiveGamepad` is currently enabled.

* `addPlugin(myPlugin)`: function - Adds a plugin to be used with the lib. Returns a function to remove the added plugin.

* `getState()`: ResponsiveGamepadState - Returns an object with the current state of ResponsiveGamepad. See the [Demo](https://torch2424.github.io/responsive-gamepad/) and the [Input Map](#input-map). 

* `onInputsChange(ArrayOfResponsiveGamepadInputs, callback)`: function - Function to listen for changes on the array of specified `ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS`, and calls a callback whenever they change. Returns a function to stop listening.

* `clearInputMap()`: Remove all input mappings. Useful if you don't want (some of) the default input map.

### Keyboard

*Properties accessed from: `ResponsiveGamepad.Keyboard`.*

* `enableIgnoreWhenInputElementFocused()`: void - Enables ignoring ResponsiveGamepad Keyboard input when focused on form input type elements. Enabled by default.

* `disableIgnoreWhenInputElementFocused()`: void - Disables the above.

* `enableIgnoreWhenModifierState()`: void - Enables ignoring ResponsiveGamepad Keyboard input when a [Modifier](./lib/keyboard/keyboard.js) key is pressed. See [KeyboardEvent.getModifierState()](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState) for more reference. Enabled by default.

* `disableIgnoreWhenModifierState()`: void - Disables the above.

* `setKeysToResponsiveGamepadInput(ArrayOfKeyboardEventCodes, ResponsiveGamepadInput)`: void - Function used for modifying the input map. Takes and array of [KeyboardEvent.code](https://www.w3.org/TR/uievents-code/#code-value-tables) and a single [`ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS`](./lib/constants).

### Gamepad

*Properties accessed from: `ResponsiveGamepad.Gamepad`.*

* `getState(PlayerIndex: number)`: GamepadState - Function that takes in a player index (0, 1, 2) from the connected gamepads. Returns a `ResponsiveGamepad.getState()` like Object. Can be used for multiplayer.

* `setGamepadButtonsToResponsiveGamepadInput(ArrayOfGamepadButtonIds, NonAxisResponsiveGamepadInput)`: void - Function used for modifying the input map. Takes and array of [Gamepad Button Ids](https://www.w3.org/TR/gamepad/#remapping) and a single [`ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS`](./lib/constants).

* `setGamepadAxisToResponsiveGamepadInput(GamepadAxisIds, AxisResponsiveGamepadInput)`: void - Function used for modifying the input map. Takes a single [Gamepad Axis Id](https://www.w3.org/TR/gamepad/#remapping) and a single [`ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS`](./lib/constants).

### TouchInput

*Properties accessed from: `ResponsiveGamepad.TouchInput`.*

The functions that add inputs to the `ResponsiveGamepad` have additional functionality outside of what is shown below. When inputs are added, they will have styles applied to help with them being touchable. Also, When the touch input becomes active, it will add the CSS class `active` to the element.

* `addButtonInput(HTMLElement, ResponsiveGamepadInput)`: void - Function that takes in a HTML Element (e.g `document.getElementById`), and a [`ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS`](./lib/constants). Will add the element as an interactive button for the ResponsiveGamepad.

* `addDpadInput(HTMLElement, configurationObject)`: void - Function that takes in a HTML Element (e.g `document.getElementById`), and a `configurationObject`. Will add the element as an interactive dpad for the `DPAD_UP`, `DPAD_RIGHT`, `DPAD_LEFT`, and `DPAD_DOWN` inputs. The configuration object is outilined below:

```
const configurationObject = {
  allowMultipleDirections: false // False by default. This will allow for multiple directions (diagonal) inputs.
}
```

* `addLeftAnalogInput(HTMLElement)`: void - Function that takes in a HTML Element (e.g `document.getElementById`). Will add the element as an interactive virtual joystick for the `LEFT_ANALOG_HORIZONTAL_AXIS`, `LEFT_ANALOG_VERTICAL_AXIS`, `LEFT_ANALOG_UP`, `LEFT_ANALOG_RIGHT`, `LEFT_ANALOG_DOWN`, `LEFT_ANALOG_LEFT` inputs.

* `addRightAnalogInput(HTMLElement)`: void - Function that takes in a HTML Element (e.g `document.getElementById`). Will add the element as an interactive virtual joystick for the `RIGHT_ANALOG_HORIZONTAL_AXIS`, `RIGHT_ANALOG_VERTICAL_AXIS`, `RIGHT_ANALOG_UP`, `RIGHT_ANALOG_RIGHT`, `RIGHT_ANALOG_DOWN`, `RIGHT_ANALOG_LEFT` inputs.

# Input Map

The default input map is based on the **"Standard"** controller. Here is a modified image from the [w3c gamepad draft](https://w3c.github.io/gamepad/#remapping) on how it correlates to the default input map:

**Note: The X in something like `INPUT_X` represents one of the many directions or axis it represents**

![Standard Controller Diagram](./assets/readmeStandardControllerLayout.jpg)

To see how the keyboard relates to the input map, please see the [default input map](./lib/keymap.js). The library uses [KeyBoardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) to denote all of it's keyboard keys.

# Plugins

Plugins allow for modifying the output from getState(). Which can allow for functionality like:

* Merging multiple inputs into one
 
* Adding additional keys for something like another input source.

* Etc...

`responsive-gamepad` Plugins should follow the [rollup plugin conventions](https://rollupjs.org/guide/en#conventions):

* Plugins should have a clear name with `responsive-gamepad-plugin-` prefix.

* Include `rollup-plugin` keyword in package.json.

* Document your plugin in English.

## How to build plugins

**For and example, see the demo [ExamplePlugin](./demo/examplePlugin.js).**

Plugins are simply functions that return an object. See the following example, for what functions the return object could have:

```
export default function ReadmePlugin() {
  return {
    onAddPlugin: () => {
      // Called when the plugin is added with: 'ResponsiveGamepad.addPlugin()'
    },
    onGetState: (CurrentResponsiveGamepadState) => {
      // Called whenever 'ResponsiveGamepad.getState()' is called.
      return CurrentResponsiveGamepadState
    }
  }
}
```

## Featured Plugins

*Open a PR to have your plugin featured here!*

# Contributing

Feel free to fork the project, open up a PR, and give any contributions! I'd suggest opening an issue first however, just so everyone is aware and can discuss the proposed changes.

### Installation

Just your standard node app. Install Node with [nvm](https://github.com/creationix/nvm), `git clone` the project, and `npm install`, and you should be good to go!

### CLI Commands / Npm Scripts

```bash
# Command to serve the demo/lib and watch for changes (No livereload)
npm start

# Alias for npm start
npm run dev

# Build the library and demo souce
npm run build
```

# LICENSE

LICENSE under [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)

# Other Notes

* Touch Input SVGS on the responsive gamepad demo, are [Google Material Icons](https://material.io/tools/icons/?style=baseline)

* XInput vs. DirectInput - [Microsoft Article](https://docs.microsoft.com/en-us/windows/desktop/xinput/xinput-and-directinput), [Reddit thread](https://www.reddit.com/r/pcgaming/comments/4zlbrx/what_is_the_difference_between_directinput_and/)
