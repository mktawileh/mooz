import Styles from "./styles";
import Wrapper from "./wrapper";

type Options = {
  bgColor?: String;
  bgOpacity?: Number;
};

const defaultOptions: Options = {
  bgColor: "black",
  bgOpacity: 0,
};

/** 
 * A class to create an instance of mooz and
 * do the image zooming and stuff
 */
class Mooz {
  options: Options;
  _wrapper: Wrapper;
  _elements: Array<HTMLElement> = [];
  _handle_click_bound: (MouseEvent) => void;
  
  constructor(options: Options = defaultOptions) {
    this.options = options;
    this._handle_click_bound = this._handle_click.bind(this);
    this._wrapper = new Wrapper();
  }
  
  listen(selector: string | HTMLElement | Array<HTMLElement> | NodeList) {
    let els: Array<HTMLElement> = [];
    if (typeof selector === "string"){ 
      els = Array.from(document.querySelectorAll(selector));
    } else if (typeof selector === "object") {
      if (selector instanceof HTMLElement) els = [selector];
      else if (selector instanceof Array || selector instanceof NodeList) {
        for (let i = 0; i < selector.length; i++) {
          if (selector[i] instanceof HTMLElement)
            els.push(selector[i] as HTMLElement);
        }
      }
    }
    this._elements = els;
    for (let i = 0; i < els.length; i++) {
      els[i].addEventListener("click", this._handle_click_bound);
    }
  }
  
  destroy() {
    for (let i = 0; i < this._elements.length; i++) {
      this._elements[i].removeEventListener("click", this._handle_click_bound);
    }
    this._elements = [];
    // TODO: remove the wrapper
  }

  _handle_click(event: MouseEvent) {
    this._wrapper.attach(event.srcElement as HTMLElement);
  }
}

export default Mooz;
