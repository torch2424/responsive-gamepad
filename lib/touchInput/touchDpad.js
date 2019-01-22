import TouchInputType from './touchInputType';

import {getDirectionalTouch} from './directional';

export default class TouchDpad extends TouchInputType {
  constructor(element, config) {
    super(element);
    
    if (config) {
      this.config = config;
    } else {
      this.config = {
        allowMultipleDirections: false
      };
    }

    this._resetState();
  }

  _resetState() {
    this.state = {
      DPAD_UP: false,
      DPAD_RIGHT: false,
      DPAD_DOWN: false,
      DPAD_LEFT: false
    };
  }

  onTouchEvent(event) {
    
    // If we are not in the active state,
    // simply reset and return
    if (!this.active) {
      this._resetState()
      return;
    }

    // Get our directional values
    const {rectCenterX, rectCenterY, touchX, touchY} = getDirectionalTouch(event, this.boundingClientRect);

    // Find if the horizontal or vertical influence is greater
    // Lesson From: picoDeploy
    // Fix for shoot button causing the character to move right on multi touch error
    // + 50 for some buffer
    if(touchX > (rectCenterX + (this.boundingClientRect.width / 2) + 50)) {
      // Ignore the event
      return;
    }

    // We forsure know we have input
    // Reset previous DPAD State
    this._resetState();

    // Check if we are allowing multiple directions
    if (this.config.allowMultipleDirections) {
      this.setHorizontalState(touchX);
      this.setVerticalState(touchY);
      return;
    }

    // Create an additonal influece for horizontal, to make it feel better
    const horizontalInfluence = this.boundingClientRect.width / 8;

    // Determine if we are horizontal or vertical
    const isHorizontal = Math.abs(rectCenterX - touchX) + horizontalInfluence > Math.abs(rectCenterY - touchY);

    // Find if left or right from width, vice versa for height
    if(isHorizontal) {
      this.setHorizontalState(touchX);
    } else {
      this.setVerticalState(touchY);
    }
  }

  setHorizontalState(touchX) {
    // Add a horizontal dead zone
    const deadzoneSize = this.boundingClientRect.width / 20;
    if(Math.abs((this.boundingClientRect.width / 2) - touchX) > deadzoneSize) {

      const isLeft = touchX < (this.boundingClientRect.width / 2);

      if(isLeft) {
        this.state.DPAD_LEFT = true;
      } else {
        this.state.DPAD_RIGHT = true;
      }
    }
  }

  setVerticalState(touchY) {
    const isUp = touchY < (this.boundingClientRect.height / 2);
    if(isUp) {
      this.state.DPAD_UP = true;
    } else {
      this.state.DPAD_DOWN = true;
    }
  }
}
