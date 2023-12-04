type Pos = {
    x: number;
    y: number;
};
declare class Wrapper {
    _element: HTMLElement;
    _img: HTMLElement | null;
    _dragging: boolean;
    _prev_pos: Pos;
    _img_pos: Pos;
    _img_scale: number;
    _wheel_sens: number;
    _max_zoom: number;
    _min_zoom: number;
    _handle_window_keydown_bound: (KeyboardEvent: any) => void;
    constructor();
    attach(element: HTMLElement): void;
    deattach(): void;
    _createElement(): HTMLDivElement;
    _handle_mousedown(event: MouseEvent): void;
    _handle_mousemove(event: MouseEvent): void;
    _handle_mousewheel(event: WheelEvent): void;
    _handle_mouseup(event: MouseEvent): void;
    _apply_transform(): void;
    _handle_window_keydown(event: KeyboardEvent): void;
}
export default Wrapper;
