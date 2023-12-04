import Wrapper from "./wrapper";
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
    _wrapper: Wrapper;
    _elements: Array<HTMLElement>;
    _handle_click_bound: (MouseEvent: any) => void;
    constructor(options?: Options);
    listen(selector: string | HTMLElement | Array<HTMLElement> | NodeList): void;
    destroy(): void;
    _handle_click(event: MouseEvent): void;
}
export default Mooz;
