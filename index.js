import './style';
import { Component } from 'preact';
import { ResponsiveGamepad } from './dist/responsive-gamepad.esm';

export default class App extends Component {

	// Using componentDidMount to wait for the canvas element to be inserted in DOM
	componentDidMount() {
    // Initialize our gamepad
		ResponsiveGamepad.initialize();
	}

	render() {
		return (
			<div>
        hello!
			</div>
		);
	}
}
