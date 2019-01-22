import TouchInputType from './touchInputType';

import {getDirectionalTouch} from './directional';

export default class TouchAnalog extends TouchInputType {
  constructor(element) {
    super(element);

    this._resetState();
  }

  _resetState() {
    this.state = {
      HORIZONTAL_AXIS: 0,
      VERTICAL_AXIS: 0
    };

    this.element.style.transform = `translate(0px, 0px)`;
  }

  onTouchEvent(event) {

    // If we are not in the active state,
    // simply reset and return
    if (!this.active) {
      this._resetState();
      return;
    }

    // Get our directional values
    const {rectCenterX, rectCenterY, touchX, touchY} = getDirectionalTouch(event, this.boundingClientRect);

    // Find our Horizontal Axis
    const horizontalDifferenceFromCenter = touchX - rectCenterX;
    let horizontalAxis = horizontalDifferenceFromCenter / rectCenterX;
    if (horizontalAxis > 1) {
      horizontalAxis = 1.0;
    } else if (horizontalAxis < -1) {
      horizontalAxis = -1.0;
    }

    // Find our Vertical Axis
    const verticalDifferenceFromCenter = touchY - rectCenterY;
    let verticalAxis = verticalDifferenceFromCenter / rectCenterY;
    if (verticalAxis > 1) {
      verticalAxis = 1.0;
    } else if (verticalAxis < -1) {
      verticalAxis = -1.0;
    }

    // Apply styles to element
    const translateX = (rectCenterX * horizontalAxis) / 2;
    const translateY = (rectCenterY * verticalAxis) / 2;
    this.element.style.transform = `translate(${translateX}px, ${translateY}px)`;

    // Set Axis on keyMap
    this.state.HORIZONTAL_AXIS = horizontalAxis;
    this.state.VERTICAL_AXIS = verticalAxis;
  }
}
