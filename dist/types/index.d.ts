type Options = {
    bgColor?: String;
    bgOpacity?: Number;
};
/**
 * A class to create an instance of mooz and
 * do the image zooming and stuff
 */
declare class Mooz {
    options: Options;
    _elements: Array<HTMLElement>;
    constructor(options?: Options);
}
export default Mooz;
