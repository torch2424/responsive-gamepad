import {Component, h} from 'preact';

import CircleButton from './circleButton';
import DashButton from './dashButton';
import Dpad from './dpad';
import Analog from './analog';

export default class Touchpad extends Component {
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
