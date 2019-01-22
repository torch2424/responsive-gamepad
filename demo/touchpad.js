import {Component, h} from 'preact';
import {ResponsiveGamepad} from '../dist/responsive-gamepad.esm';

import CircleButton from './circleButton';
import DashButton from './dashButton';
import Dpad from './dpad';
import Analog from './analog';

export default class Touchpad extends Component {

  componentDidMount() {

    ResponsiveGamepad.TouchInput.addLeftAnalogInput(
      document.querySelector('#left-analog .analog-stick')
    );

    ResponsiveGamepad.TouchInput.addDpadInput(
      document.getElementById('dpad'),
      {
        allowMultipleDirections: true
      }
    );

    ResponsiveGamepad.TouchInput.addButtonInput(
      document.getElementById('select'),
      ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.SELECT
    );
    ResponsiveGamepad.TouchInput.addButtonInput(
      document.getElementById('start'),
      ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.START
    );
    ResponsiveGamepad.TouchInput.addButtonInput(
      document.getElementById('a-button'),
      ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.A
    );
    ResponsiveGamepad.TouchInput.addButtonInput(
      document.getElementById('b-button'),
      ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.B
    );
  }
  
  render() {
    return (
      <div class="touchpad">
        <Analog id="left-analog" />
        <Dpad id="dpad" />
        <DashButton id="select" text="Select" />
        <DashButton id="start" text="Start" />
        <CircleButton id="a-button" text="A" />
        <CircleButton id="b-button" text="B" />
      </div>
    );
  }
}
