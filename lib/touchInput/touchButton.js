import TouchInputType from './touchInputType';

export class TouchButton extends TouchInputType {
  constructor(input) {
    super();

    this.active = false;
    this.input = input;
  }

  onTouchEvent(isActiveEvent) {
    this.active = isActiveEvent;
  } 
}
