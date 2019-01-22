// Base Class for all input sources

export default class InputSource {
  constructor() {
  
  }

  enable() {
    throw new Error('enable() must be overridden'); 
  }

  disable() {
    throw new Error('disable() must be overridden'); 
  }

  getState() {
   throw new Error('getState() must be overridden'); 
  }
}
