import './style';
import { Component } from 'preact';
import { ResponsiveGamepad, KEYMAP_DEFAULT } from './dist/responsive-gamepad.esm';

export default class App extends Component {

	constructor() {
		super();
	}

	// Using componentDidMount to wait for the canvas element to be inserted in DOM
	componentDidMount() {
		this.enableGamepad();

		requestAnimationFrame(() => {
			this.displayGamepadState();
		});
	}

  displayGamepadState() {
    const gamepadStateElement = document.getElementById("gamepadState");
		this.setState({
			...this.state,
			gamepadState: JSON.stringify(ResponsiveGamepad.getState(), null, 4)
		})

    requestAnimationFrame(() => {
      this.displayGamepadState();
    });
	}

	enableGamepad() {
		// Initialize our gamepad
		ResponsiveGamepad.enable(KEYMAP_DEFAULT());

		// Add our touch inputs
		const dpadElement = document.getElementById('gamepadDpad');
		const startElement = document.getElementById('gamepadStart');
		const aElement = document.getElementById('gamepadA');
		const bElement = document.getElementById('gamepadB');

		ResponsiveGamepad.addTouchInput('UP', dpadElement, 'DPAD', 'UP');
		ResponsiveGamepad.addTouchInput('RIGHT', dpadElement, 'DPAD', 'RIGHT');
		ResponsiveGamepad.addTouchInput('DOWN', dpadElement, 'DPAD', 'DOWN');
		ResponsiveGamepad.addTouchInput('LEFT', dpadElement, 'DPAD', 'LEFT');
		ResponsiveGamepad.addTouchInput('A', aElement, 'BUTTON');
		ResponsiveGamepad.addTouchInput('B', bElement, 'BUTTON');
		ResponsiveGamepad.addTouchInput('START', startElement, 'BUTTON');

		this.setState({
			...this.state,
			touchSelectId: undefined
		});
		this.toggleTouchSelectInput();
	}

	disableGamepad() {
		ResponsiveGamepad.disable();

		this.setState({
			...this.state,
			touchSelectId: undefined
		});
	}

	toggleResponsiveGamepad() {
		if (ResponsiveGamepad.isEnabled()) {
			this.disableGamepad();
		} else {
			this.enableGamepad();
		}
	}

	toggleTouchSelectInput() {
		if (this.state.touchSelectId) {
			ResponsiveGamepad.removeTouchInput('SELECT', this.state.touchSelectId);
			this.setState({
				...this.state,
				touchSelectId: undefined
			});
		} else {

			const selectElement = document.getElementById('gamepadSelect');
			const touchSelectId = ResponsiveGamepad.addTouchInput('SELECT', selectElement, 'BUTTON');

			this.setState({
				touchSelectId: touchSelectId
			});
		}
	}

	render() {
		return (
			<div>
				<h1>Responsive Gamepad</h1>
				<div class="githubLink">
					<a href="https://github.com/torch2424/responsive-gamepad" target="_blank">Fork me on github</a>
				</div>

				<div class="gamepadState">
					<h3>Responsive Gamepad State:</h3>
					<div>Enabled: {ResponsiveGamepad.isEnabled().toString()}</div>
					<div>Is Ignoring Keyboard Input from Focusing on Input Element: {ResponsiveGamepad.isIgnoringKeyEvents().toString()}</div>
					<pre id="gamepadState">
						{this.state.gamepadState}
					</pre>
				</div>

				<div class="addRemoveTouch">
					<h3>Enabled/Disable</h3>
					<p>Responsive Gamepad can be enabled and disabled (as a whole) as needed</p>
					<div>
						<button onClick={() => this.toggleResponsiveGamepad()} >
							{ResponsiveGamepad.isEnabled() ? `Disable Responsive Gamepad` : 'Enable Responsive Gamepad'}
						</button>
					</div>
				</div>

				<div class="addRemoveTouch">
					<h3>Dynamic Touch Input</h3>
					<p>Touch inputs can be added/removed on the fly!</p>
					<div>
						<button onClick={() => this.toggleTouchSelectInput()} disabled={!ResponsiveGamepad.isEnabled()}>
							{this.state.touchSelectId ? `Disable SELECT Touch Input (current Id: ${this.state.touchSelectId})` : 'Enable SELECT Touch Input'}
						</button>
					</div>
				</div>

				<div class="preventDefault">
					<h3>Prevent Default</h3>
					<p>I am very tall to show off `event.preventDefault()`. E.g arrow keys wont scroll if in the keymap. But typing will work on input type form fields!</p>
					<input type="text" />
					<br />
					<textarea />
					<br />
					<button onClick={() => {console.log('I was the button your pressed a key on.')}}>Press space on me, and check your logs!</button>
					<br />
					<select>
						<option value="use">use arrow keys once selected</option>
						<option value="arrow">use arrow keys once selected</option>
						<option value="keys">use arrow keys once selected</option>
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
