import './style';
import { Component } from 'preact';
import { ResponsiveGamepad, DEFAULT_KEYMAP } from './dist/responsive-gamepad.esm';

export default class App extends Component {

	// Using componentDidMount to wait for the canvas element to be inserted in DOM
	componentDidMount() {
    // Initialize our gamepad
		ResponsiveGamepad.initialize(DEFAULT_KEYMAP);

		// Add our touch inputs
		const dpadElement = document.getElementById('gamepadDpad');
		const startElement = document.getElementById('gamepadStart');
		const selectElement = document.getElementById('gamepadSelect');
		const aElement = document.getElementById('gamepadA');
		const bElement = document.getElementById('gamepadB');

		ResponsiveGamepad.addTouchInput('UP', dpadElement, 'DPAD', 'UP');
		ResponsiveGamepad.addTouchInput('RIGHT', dpadElement, 'DPAD', 'RIGHT');
		ResponsiveGamepad.addTouchInput('DOWN', dpadElement, 'DPAD', 'DOWN');
		ResponsiveGamepad.addTouchInput('LEFT', dpadElement, 'DPAD', 'LEFT');
		ResponsiveGamepad.addTouchInput('A', aElement, 'BUTTON');
		ResponsiveGamepad.addTouchInput('B', bElement, 'BUTTON');
		ResponsiveGamepad.addTouchInput('START', startElement, 'BUTTON');
		ResponsiveGamepad.addTouchInput('SELECT', selectElement, 'BUTTON');

    requestAnimationFrame(() => {
      this.displayGamepadState();
    });
	}

  displayGamepadState() {
    const gamepadStateElement = document.getElementById("gamepadState");
    gamepadStateElement.innerHTML = JSON.stringify(ResponsiveGamepad.getState(), null, 4);

    requestAnimationFrame(() => {
      this.displayGamepadState();
    });
  }

	render() {
		return (
			<div>
        <h1>Responsive Gamepad State:</h1>
        <pre id="gamepadState">
        </pre>

				<div class="preventDefault">
					<h3>I am very tall to show off `event.preventDefault()`. E.g arrow keys wont scroll if in the keymap</h3>
					<p>But typing will work on input type form fields!</p>
					<input type="text" />
					<br />
					<textarea />
					<br />
					<button onClick={() => {console.log('I was the button your pressed a key on.')}}>Press space on me, and check your logs!</button>
					<br />
					<select>
					  <option value="use">use</option>
					  <option value="arrow">arrow</option>
					  <option value="keys">keys</option>
					</select>
				</div>

				<div class="gamepad">

					{/* DPAD */}
					<svg id="gamepadDpad" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M0 0h24v24H0z" fill="none"/>
					    <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
					</svg>

					{/* Start */}
					<svg id="gamepadStart" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M19 13H5v-2h14v2z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
					</svg>

					{/* Select */}
					<svg id="gamepadSelect" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M19 13H5v-2h14v2z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
					</svg>

					{/* A */}
					<svg id="gamepadA" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
					</svg>

					{/* B */}
					<svg id="gamepadB" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
					</svg>
				</div>
			</div>
		);
	}
}
