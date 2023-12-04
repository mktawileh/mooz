import Styles from "./styles";

type Pos = {
  x: number;
  y: number;
};

class Wrapper {
  _element: HTMLElement;
  _img: HTMLElement | null;
  _dragging: boolean;
  _prev_pos: Pos;
  _img_pos: Pos;
  _img_scale: number;
  _wheel_sens: number;
  _max_zoom: number;
  _min_zoom: number;
  _handle_window_keydown_bound: (KeyboardEvent) => void;

  constructor() {
    this._element = this._createElement();
    this._img = null;
    this._dragging = false;
    this._prev_pos = { x: 0, y: 0 };
    this._img_pos = { x: 0, y: 0 };
    this._img_scale = 1;
    this._wheel_sens = 0.7;
    this._max_zoom = 3;
    this._min_zoom = 0.8;
    this._handle_window_keydown_bound = this._handle_window_keydown.bind(this);
  }

  attach(element: HTMLElement) {
    const el = element.cloneNode(true) as HTMLElement;
    this._element.appendChild(el);
    this._img = el;
    document.body.appendChild(this._element);
    window.addEventListener('keydown', this._handle_window_keydown_bound);
  }

  deattach() {
    while (this._element.firstChild)
      this._element.removeChild(this._element.firstChild);
    document.body.removeChild(this._element);
    window.removeEventListener('keydown', this._handle_window_keydown_bound);
  }

  _createElement() {
    const div = document.createElement("div");
    div.classList.add("mooz-wrapper");
    div.setAttribute("style", Styles.get("wrapper"));
    div.addEventListener("mousedown", this._handle_mousedown.bind(this));
    div.addEventListener("mouseup", this._handle_mouseup.bind(this));
    div.addEventListener("mousemove", this._handle_mousemove.bind(this));
    div.addEventListener("mousewheel", this._handle_mousewheel.bind(this));
    return div;
  }

  _handle_mousedown(event: MouseEvent) {
    event.preventDefault();
    this._dragging = true;
    this._prev_pos = {
      x: event.clientX,
      y: event.clientY,
    };
    this._img.style.cursor = "grab";
  }

  _handle_mousemove(event: MouseEvent) {
    if (this._dragging) {
      const dx = event.clientX - this._prev_pos.x;
      const dy = event.clientY - this._prev_pos.y;
      this._prev_pos = {
        x: event.clientX,
        y: event.clientY,
      };
      this._img_pos.x += dx;
      this._img_pos.y += dy;
      this._img.style.cursor = "grabbing";
      this._apply_transform();
    }
  }

  _handle_mousewheel(event: WheelEvent) {
    event.preventDefault();
    const value = -event.deltaY / 200 * this._wheel_sens;
    this._img_scale += value;
    this._img_scale = Math.min(this._img_scale, this._max_zoom);
    this._img_scale = Math.max(this._img_scale, this._min_zoom);
    this._apply_transform();
  }

  _handle_mouseup(event: MouseEvent) {
    this._img.style.cursor = "grab";
    if (event.target === this._element) {
      // this.deattach();
    }
    this._dragging = false;
  }

  _apply_transform() {
    const { x, y } = this._img_pos;
    const scale = this._img_scale;
    this._img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  _handle_window_keydown(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.deattach();
    }  
  }
}

export default Wrapper;
