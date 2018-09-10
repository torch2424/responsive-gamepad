# responsive-gamepad

<!-- Badges -->
[![Build Status](https://travis-ci.org/torch2424/responsive-gamepad.svg?branch=master)](https://travis-ci.org/torch2424/responsive-gamepad)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/responsive-gamepad.svg)
![npm](https://img.shields.io/npm/dt/responsive-gamepad.svg)
![GitHub](https://img.shields.io/github/license/torch2424/responsive-gamepad.svg)
[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/torch2424)

Handle Keyboard, Gamepad, and Touch Controls in the browser under a single API.

[Demo](https://torch2424.github.io/responsive-gamepad/)

<img src="./assets/readmeDemo.png" width="500px" />

# Table Of Contents

TODO:

# Quick Start

This is a quick **Tl;DR** on installing and using responsive-gamepad:

1. `npm install --save responsive-gamepad`

2. `import { ResponsiveGamepad } from 'responsive-gamepad';`

3. `ResponsiveGamepad.enable();`

4. `ResponsiveGamepad.getState();`

# Notable Projects

* [WasmBoy](https://github.com/torch2424/wasmBoy) - Gameboy / Gameboy Color Emulator written for Web Assembly using AssemblyScript.

# Instalation

*See the [index.js](./index.js) at the root of the project, for a proper usage, and touch input example*

`npm install --save responsive-gamepad`

# API Usage

TODO:

# Keymaps

Keymaps can be found under the [lib/keymaps directory](./lib/keymaps). To use a keymap, pass it in with the `.enable()` function:

```
import {ResponsiveGamepad, KEYMAP_GAMEBOY} from 'responsive-gamepad';

ResponsiveGamepad.enable(KEYMAP_GAMEBOY());
```

The default keymap, `KEYMAP` and `KEYMAP_DEFAULT`, is based on the **"Standard"** controller. Here is a modified image from the [w3c gamepad draft](https://w3c.github.io/gamepad/#remapping) on how it correlates to the default keymap:


TODO:

### Custom Keymaps

Custom keymaps can also be created and used! All functions used to create keymaps are exported by the lib, and are from the [`lib/schema.js`](./lib/schema.js) file. Please view how the keymaps are constructed within [`./lib/keymaps`](./lib/keymaps).

If you think the keymap should ba a part of the library, feel free to open a PR!

# Contributing

Feel free to fork the project, open up a PR, and give any contributions! I'd suggest opening an issue first however, just so everyone is aware and can discuss the proposed changes.

### Installation

Just your standard node app. Install Node with [nvm](https://github.com/creationix/nvm), `git clone` the project, and `npm install`, and you should be good to go!

### CLI Commands / Npm Scripts

```bash
# Command to serve the project, and watch the debugger, wasm, and lib for changes
# Uses concurrently: https://github.com/kimmobrunfeldt/concurrently
# Concurrently helps cleanup the output and organizes all three watchers/servers
npm start

# Alias for npm start
npm run dev

# Serve the demo (index.js)
npm run demo

# Serve the demo and watch for changes
npm run demo:serve

# Alias for npm run demo:serve
npm run demo:watch

# Build the demo
npm run demo:build

# Build and serve the demo
npm run demo:build:serve

# Watch for changes and build the library source (/lib)
npm run lib:watch

# Build the library souce
npm run lib:build
```

# LICENSE

LICENSE under [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)

# Other Notes

* Touch Input SVGS on the responsive gamepad demo, are [Google Material Icons](https://material.io/tools/icons/?style=baseline)

* XInput vs. DirectInput - [Microsoft Article](https://docs.microsoft.com/en-us/windows/desktop/xinput/xinput-and-directinput), [Reddit thread](https://www.reddit.com/r/pcgaming/comments/4zlbrx/what_is_the_difference_between_directinput_and/)
