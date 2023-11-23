type Options = {
  bgColor?: String;
  bgOpacity?: Number;
}

const defaultOptions: Options = {
  bgColor: 'black',
  bgOpacity: 0,
}

/**
 * A class to create an instance of mooz and
 * do the image zooming and stuff
 */
class Mooz {
  options: Options;
  _elements: Array<HTMLElement> = [];
  constructor(options: Options = defaultOptions) {
    this.options = options;
  }

  // TODO
}

export default Mooz;
