import {Component, h} from 'preact';
import {ResponsiveGamepad} from '../dist/responsive-gamepad.esm';

export default class ResponsiveGamepadState extends Component {
  componentDidMount() {
    // Continually raf and re-render
    const update = () => {
      requestAnimationFrame(() => {
        this.setState({});
        update();
      });
    }
    update();
  }

  render() {
    return (
      <div class="responsive-gamepad-state">
        <h2>Responsive Gamepad State:</h2>
        <div><b>Enabled:</b> {ResponsiveGamepad.isEnabled().toString()}</div>
        <pre>{JSON.stringify(ResponsiveGamepad.getState(), null, 2)}</pre>
      </div>
    );
  }
}
