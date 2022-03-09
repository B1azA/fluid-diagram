var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/* function get_ratio() {
    var dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
} */

function resize_canvas() {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    canvas.width = w;
    canvas.height = h;
}

var mouse_pos = new Point(0, 0);
var mouse_buttons = [false, false, false];
var wheel = 0;

function update_mouse_pos(event) {
    var rect = canvas.getBoundingClientRect();
    mouse_pos = new Point(event.clientX - rect.left, event.clientY - rect.top);
}

function update_mouse_buttons_up(event) {
    switch (event.button) {
        case 0:
            mouse_buttons[0] = false;
            break;
        case 1:
            mouse_buttons[1] = false;
            break;
        case 2:
            mouse_buttons[2] = false;
            break;
    }
}

function update_mouse_buttons_down(event) {
    switch (event.button) {
        case 0:
            mouse_buttons[0] = true;
            break;
        case 1:
            mouse_buttons[1] = true;
            break;
        case 2:
            mouse_buttons[2] = true;
            break;
    }
}

function update_wheel(event) {
    wheel += event.deltaY;
}

export function get_mouse_wheel() {
    return wheel;
}

export function get_canvas_size() {
    return new Point(canvas.clientWidth, canvas.clientHeight);
}

export function get_mouse_buttons() {
    return mouse_buttons;
}

export function get_mouse_position() {
    return mouse_pos;
}

export function is_mouse_on_canvas() {
    var is = false;
    var pos = mouse_pos;
    if (pos.x >= 0 && pos.y >= 0) {
        is = true;
    }

    return is;
}

export function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function draw() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
    ctx.fillStyle = "#000000";
    ctx.font = "48px serif";
    ctx.fillText("Hello", 10, 100, 50);
}

export function draw_rectangle(color, pos, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, width, height);
}

export function measure_text(text, size) {
    ctx.font = size + "px serif";
    ctx.textAlign = "middle";
    var metrics = ctx.measureText(text);
    return new Point(metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent);
}

export function measure_text_background(text, size) {
    ctx.font = size + "px serif";
    ctx.textAlign = "middle";
    var metrics = measure_text(text);
    return new Point(metrics.x + size / 2.5, metrics.y);
}

export function draw_text(text, color, pos, size) {
    ctx.fillStyle = color;
    ctx.textAlign = "middle";
    ctx.font = size + "px serif";
    var metrics = measure_text(text, size);
    ctx.fillText(text, pos.x + size / 5, pos.y + metrics.y - size / 3.333);
}

export function draw_text_background(text, color, background_color, pos, size) {
    var metrics = measure_text(text, size);
    draw_rectangle(background_color, new Point(pos.x, pos.y), metrics.x + size / 2.5, metrics.y);
    draw_text(text, color, pos, size);
}

resize_canvas();
const content = document.getElementById("content");
addEventListener("resize", resize_canvas);
content.addEventListener("mousemove", update_mouse_pos);
addEventListener("mouseup", update_mouse_buttons_up);
addEventListener("mousedown", update_mouse_buttons_down);
addEventListener("wheel", update_wheel);
