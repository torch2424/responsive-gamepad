import TouchInputType from './touchInputType';

export default class TouchButton extends TouchInputType {
  constructor(element, input) {
    super(element);

    this.active = false;
    this.input = input;
  }

  onTouchEvent(event, isActiveEvent, isNeutralEvent, isInactiveEvent) {
    if (this.active && isInactiveEvent) {
      this.active = false;
    } else if (!this.active && isActiveEvent) {
      this.active = true;
    }
  } 
}
