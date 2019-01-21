import {ResponsiveGamepad} from '../dist/responsive-gamepad.esm';

ResponsiveGamepad.enable();

ResponsiveGamepad.onInputsChange('DPAD_UP', state => {
  console.log('demo: DPAD_UP!', state.DPAD_UP);
})

console.log('demo');
