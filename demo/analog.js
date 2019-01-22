import {Component, h} from 'preact';

export default class Analog extends Component {
  render({...props}) {
    return (
      <div {...props} class="analog-container">
        <svg class="analog-stick" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="6"/>
        </svg>
        <svg class="analog-background" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12"/>
        </svg>
      </div>
    );
  }
}
