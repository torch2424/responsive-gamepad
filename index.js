import './style';
import { Component } from 'preact';
import { ResponsiveGamepad } from './dist/responsive-gamepad.esm';

export default class App extends Component {

	// Using componentDidMount to wait for the canvas element to be inserted in DOM
	componentDidMount() {
    // Initialize our gamepad
		ResponsiveGamepad.initialize();

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
			</div>
		);
	}
}
