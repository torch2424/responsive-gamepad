import { h, render, Component } from 'preact';
import {ResponsiveGamepad} from '../dist/responsive-gamepad.esm';

import ExamplePlugin from './examplePlugin';

import ResponsiveGamepadState from './state';
import Touchpad from './touchpad';

import './index.css';

ResponsiveGamepad.onInputsChange(
  ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.DPAD_UP, 
  state => {
    console.log('demo: DPAD_UP!', state.DPAD_UP);
    console.log('demo: state', state);
  }
);

class ResponsiveGamepadDemo extends Component {
  componentDidMount() {
    ResponsiveGamepad.addPlugin(ExamplePlugin());
    ResponsiveGamepad.enable();
  }

  render() {
    return (
      <div>

        <h1>Responsive Gamepad Demo</h1>
        <a href="https://github.com/torch2424/responsive-gamepad" target="_blank">Fork me on Github</a>

        <div class="description">
          This is the example demo for responsive-gamepad.
          Feel free to test this demo with:
          <ul>
            <li>Keyboard</li>
            <li>Gamepad (Feel free to plug one into USB)</li>
            <li>Touchpad (See the floating fixed element at the bottom of the screen)</li>
          </ul>
          Please scroll down to see the different features and examples the API provides.
        </div>

        <ResponsiveGamepadState />
        
        <div class="touchpad-spacing" />

        <Touchpad />
      </div>
    )
  }
}

render(<ResponsiveGamepadDemo />, document.getElementById('root'));
