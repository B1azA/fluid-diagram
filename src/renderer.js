import { Point } from "./canvas.js";
import * as canvas from "./canvas.js";

class Block {
    constructor(pos) {
        this.pos = new Point(pos.x * scale, pos.y * scale);
        this.color = "#FF0000";
        this.fullsize = new Point(0, 0);
        this.line = [];
        this.size = 30;
    }

    add_line(line) {
        this.line.push(line);
    }

    draw() {
        
        var rec_pos = new Point(this.pos.x * scale + offset.x, this.pos.y * scale + offset.y);
        var width = this.fullsize.x;
        var height = this.fullsize.y;
        canvas.draw_rectangle("#FFFFFF", rec_pos, width, height);

        this.fullsize.y = 0;
        var pos = new Point(this.pos.x * scale, this.pos.y * scale);
        var max_fullsizex = 0;
        this.line.forEach(line => {
            var size = canvas.measure_text(line, this.size * scale);
            canvas.draw_text_background(line, "#000000", this.color, 
                new Point(pos.x + offset.x, pos.y + offset.y), this.size * scale);
            var fulls = canvas.measure_text_background(line, this.size * scale);
            var fullsize = new Point(fulls.x, fulls.y);
            pos.y += size.y;
            this.fullsize.y += size.y;
            
            if (fullsize.x > max_fullsizex) {
                this.fullsize.x = fullsize.x;
                max_fullsizex = fullsize.x;
            }
        });
    }

    is_mouse_on() {
        var rec_pos = new Point(this.pos.x * scale + offset.x, this.pos.y * scale + offset.y);
        var width = this.fullsize.x;
        var height = this.fullsize.y;

        var left_side = rec_pos.x;
        var right_side = rec_pos.x + width;
        var top_side = rec_pos.y;
        var bottom_side = rec_pos.y + height;

        if (mouse_pos.x > left_side && mouse_pos.x < right_side && 
            mouse_pos.y - 1 > top_side && mouse_pos.y < bottom_side) {
            return true;
        }
        return false;
    }
}

var scale = 1.5;
var offset = new Point(0, 0);

var blocks = [];

function draw() {
    canvas.clear();
    blocks.forEach(block => {
        block.draw();
    });

    canvas.draw_text("x: " + offset.x + "; " + "y: " + offset.y, "white", 
        new Point(canvas.get_canvas_size().x - canvas.measure_text("x: " + offset.x + "; " + "y: " + offset.y + "00", 20).x, 0),
        20);
    canvas.draw_text("scale: " + scale.toFixed(2), "white",
        new Point(canvas.get_canvas_size().x - canvas.measure_text("scale: " + scale.toFixed(2) + "00", 20).x, 
            canvas.measure_text("scale: " + scale.toFixed(2), 20).y), 20);
    canvas.draw_text("m_pos: " + mouse_pos.x.toFixed(2) + "; " + mouse_pos.y.toFixed(2), "white",
        new Point(canvas.get_canvas_size().x -
            canvas.measure_text("m_pos: " + mouse_pos.x.toFixed(2) + "; " + mouse_pos.y.toFixed(2) + "00", 20).x,
            canvas.measure_text("m_pos: " + mouse_pos.x.toFixed(2) + "; " + mouse_pos.y.toFixed(2), 20).y + 20), 20);
}

var mouse_pos = canvas.get_mouse_position();
var last_mouse_pos = new Point(0, 0);
var mouse_delta = new Point(0, 0);
var wheel = canvas.get_mouse_wheel();
var last_wheel = 0;
var wheel_delta = 0;
function update() {
    mouse_pos = canvas.get_mouse_position();
    mouse_delta = new Point(mouse_pos.x - last_mouse_pos.x, mouse_pos.y - last_mouse_pos.y);
    last_mouse_pos = mouse_pos;
    wheel = canvas.get_mouse_wheel()
    wheel_delta = wheel - last_wheel;
    last_wheel = wheel;

    if (canvas.get_mouse_buttons()[1] === true) {
        offset.x += mouse_delta.x;
        offset.y += mouse_delta.y;
    }

    scale += wheel_delta / 1000;
    if (scale < 0.1) {
        scale = 0.1;
    }

    blocks.forEach(block => {
        if (block.is_mouse_on()) {
            block.color = "#F0F000";
        } else {
            block.color = "#FF0000";
        }
    })
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