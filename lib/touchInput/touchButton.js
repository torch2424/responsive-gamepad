import TouchInputType from './touchInputType';

export default class TouchButton extends TouchInputType {
  constructor(element, input) {
    super(element);
    this.input = input;
  }
}
