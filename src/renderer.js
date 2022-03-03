import { Point } from "./canvas.js";
import * as canvas from "./canvas.js";

class Block {
    constructor(pos) {
        this.pos = pos;
        this.line = [];
    }

    add_line(line) {
        this.line[this.line.length] = line;
    }

    draw() {
        var pos = new Point(this.pos.x * scale, this.pos.y * scale);
        this.line.forEach(line => {
            var size = canvas.measure_text(line, 30 * scale);
            canvas.draw_text_background(line, "#000000", "#FF0000", new Point(pos.x + offset.x, pos.y + offset.y), 30 * scale);
            pos.y += size.y;
        });
    }
}

var scale = 1.5;
var offset = new Point(0, 0);

var blocks = [];

function draw() {
    canvas.clear();
    canvas.draw_text("x: " + offset.x + "; " + "y: " + offset.y, "red", 
        new Point(canvas.get_canvas_size().x - canvas.measure_text("x: " + offset.x + "; " + "y: " + offset.y + "00", 20 * scale).x, 0), 20 * scale);
    blocks.forEach(block => {
        block.draw();
    });
}

var last_mouse_pos = new Point(0, 0);
var mouse_delta = new Point(0, 0);
var last_wheel = 0;
var wheel_delta = 0;
function update() {
    var mouse_pos = canvas.get_mouse_position();
    mouse_delta = new Point(mouse_pos.x - last_mouse_pos.x, mouse_pos.y - last_mouse_pos.y);
    last_mouse_pos = mouse_pos;
    var wheel = canvas.get_mouse_wheel();
    wheel_delta = wheel - last_wheel;
    last_wheel = wheel;

    if (canvas.get_mouse_buttons()[1] === true) {
        offset.x += mouse_delta.x;
        offset.y += mouse_delta.y;
    }

    scale += wheel_delta / 500;
    if (scale <= 0) {
        scale = 0.1;
    }
    // blocks[1].pos = new Point(100 * scale, 100 * scale);
}

// _________________________ SETUP _________________________ \\

blocks[0] = new Block(new Point(0, 0));
blocks[0].add_line("main");
blocks[0].add_line("do");
blocks[0].add_line("do");

blocks[1] = new Block(new Point(100, 100));
blocks[1].add_line("if");
blocks[1].add_line("do");
blocks[1].add_line("else");

setInterval(draw, 16);
setInterval(update, 16);