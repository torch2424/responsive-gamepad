import { h, render, Component } from 'preact';
import {ResponsiveGamepad} from '../dist/responsive-gamepad.esm';

import ExamplePlugin from './examplePlugin';

import ResponsiveGamepadState from './state';
import Touchpad from './touchpad';

import './index.css';

// Log onInputsChange to console
ResponsiveGamepad.onInputsChange(
  ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.SELECT, 
  state => {
    console.log('demo: onInputsChange SELECT! State:', state);
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
        <div><b>Version</b>: {ResponsiveGamepad.getVersion()}</div>

        <div class="description">
          This is the example demo for responsive-gamepad.
          Feel free to test this demo with:
          <ul>
            <li>Keyboard</li>
            <li>Gamepad (Feel free to plug one into USB)</li>
            <li>Touchpad (See the floating fixed element at the bottom of the screen)</li>
          </ul>
          Scroll down to see the current state, learn about the api, and test some specific scenarios!
        </div>

        <ResponsiveGamepadState />

        <div class="prevent-default">
          <h2>Prevent Default (Keyboard Only)</h2>
          <p>
            I am very tall to show off `event.preventDefault()`. 
            E.g arrow keys wont scroll if in the keymap. 
            But typing will work on input type form fields!
            Also, keyboard shortcuts will also still work (Refresh the page with Ctrl+R or Cmd+R)
          </p>
          <label>
            input:
            <input type="text" />
          </label>
          <br />
          <label>
            textarea:
            <textarea />
          </label>
					<br />
					<button onClick={() => {console.log('I was the button your pressed a key on.')}}>Press space on me, and check your logs!</button>
					<br />
					<select>
						<option value="use">use arrow keys once selected</option>
						<option value="arrow">use arrow keys once selected</option>
						<option value="keys">use arrow keys once selected</option>
					</select>
        </div>

        <div class="api">
          <h2>API</h2>
          <div>
            To learn more about the Responsive Gamepad API, 
            please see the <a href="https://github.com/torch2424/responsive-gamepad" target="_blank">Github Repo</a>.
          </div>
          <h3>Plugins</h3>
          <div>
            Something worth noting on the demo is the ability to add plugins. 
            Plugins allow for modifying the output from getState(). 
            Which can allow for functionality like:
            <ul>
              <li>Merging multiple inputs into one</li>
              <li>Adding additional keys for something like another input source.</li>
              <li>Etc...</li>
            </ul>
            Please see the Responsive Gamepad State above, and notice the key "EXAMPLE_PLUGIN_ADDED".
          </div>
        </div>
        
        <div class="touchpad-spacing" />

        <Touchpad />
      </div>
    )
  }
}

render(<ResponsiveGamepadDemo />, document.getElementById('root'));
