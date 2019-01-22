import {Component, h} from 'preact';

export default class DashButton extends Component {
  render({text, ...props}) {
    return (
      <svg {...props} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 13H5v-2h14v2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
        <text x="3.5" y="18.5">{text}</text>
      </svg>
    );
  }
}
