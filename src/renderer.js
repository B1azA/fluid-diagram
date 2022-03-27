import { Point } from "./canvas.js";
import * as canvas from "./canvas.js";

class BlockPart {
    constructor(width, height, new_line) {
        this.width = width;
        this.height = height;
        this.new_line = new_line;
        this.color;
    }

    draw(pos) {
    }
}

class Line extends BlockPart {
    constructor(text, new_line, color = "#FF0000") {
        var size = canvas.measure_text_background(text, Block.size * scale);
        super(size.x, size.y, new_line);
        this.text = text;
        this.color = color;
    }

    draw(pos) {
        canvas.draw_text_background(this.text, "#000000", this.color,
            new Point(pos.x * scale + offset.x * scale, pos.y * scale + offset.y * scale), Block.size * scale);
    }
}


class Block {
    constructor(pos) {
        this.pos = new Point(pos.x * scale, pos.y * scale);
        this.fullsize = new Point(0, 0);
        this.lines = [];
        this.inputs = [];
        this.type = "";
        this.parts = [];
    }

    static size = 30;

    add_part(block_part) {
        this.parts.push(block_part);
    }

    add_line(line) {
        this.lines.push(line);
    }

    draw() {
        this.fullsize.y = 0;
        var pos = new Point(this.pos.x * scale, this.pos.y * scale);
        /* var max_fullsizex = 0;
        this.lines.forEach(line => {
            var size = canvas.measure_text(line.text, Block.size * scale);
            canvas.draw_text_background(line.text, "#000000", this.color, 
                new Point(pos.x + offset.x, pos.y + offset.y), Block.size * scale);
            var fulls = canvas.measure_text_background(line.text, Block.size * scale);
            var fullsize = new Point(fulls.x, fulls.y);
            pos.y += size.y;
            this.fullsize.y += size.y;
            
            if (fullsize.x > max_fullsizex) {
                this.fullsize.x = fullsize.x;
                max_fullsizex = fullsize.x;
            }
        }); */

        this.fullsize = new Point(0, 0);

        var move = new Point(0, 0);
        var first_move = new Point(0, 0);

        var part = this.parts[0];
        if (part.new_line) {
            first_move.y += (part.height);
            part.draw(new Point(this.pos.x, this.pos.y + first_move.y));
            first_move.x = part.width - 1; // added minus one to remove black line between parts
            if (first_move.x > this.fullsize.x) {
                this.fullsize.x = first_move.x;
            }
        } else {
            first_move.y += (part.height);
            part.draw(new Point(this.pos.x + move.x, this.pos.y + move.y));
            move.x += part.width - 1;  // added minus one to remove black line between parts
            if (move.x > this.fullsize.x) {
                this.fullsize.x = move.x;
            }
        }

        for (var i = 1; i < this.parts.length - 1; i++) {
            var part = this.parts[i];
            if (part.new_line) {
                move.y += (part.height);
                part.draw(new Point(this.pos.x, this.pos.y + move.y));
                move.x = part.width - 1; // added minus one to remove black line between parts
                if (move.x > this.fullsize.x) {
                    this.fullsize.x = move.x;
                }
                if (move.y + first_move.y > this.fullsize.y) {
                    this.fullsize.y = move.y + first_move.y;
                }
            } else {
                part.draw(new Point(this.pos.x + move.x, this.pos.y + move.y));
                move.x += part.width - 1;  // added minus one to remove black line between parts
                if (move.x > this.fullsize.x) {
                    this.fullsize.x = move.x;
                }
            }
        }
        /* this.parts.forEach(part => {
        }) */
    }

    is_mouse_on() {
        var rec_pos = new Point(this.pos.x * scale + offset.x * scale, this.pos.y * scale + offset.y * scale);
        var width = this.fullsize.x * scale;
        var height = this.fullsize.y * scale;

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
        offset.x += mouse_delta.x / scale;
        offset.y += mouse_delta.y / scale;
    }

    scale += wheel_delta / 1000;
    if (scale < 0.1) {
        scale = 0.1;
    }

    blocks.forEach(block => {
        if (block.is_mouse_on()) {
            block.parts.forEach(part => {
                part.color = "#F0F000";
            });
        } else {
            block.parts.forEach(part => {
                part.color = "#FF0000";
            });
        }
    })
}

// _________________________ SETUP _________________________ \\
scale = 1;

blocks[0] = new Block(new Point(0, 0));
blocks[0].add_part(new Line("main", false));
blocks[0].add_part(new Line("do", false));
blocks[0].add_part(new Line("do", true));
blocks[0].add_part(new Line("if", false));

blocks[1] = new Block(new Point(100, 100));
blocks[1].add_part(new Line("main", false));
blocks[1].add_part(new Line("do", false));
blocks[1].add_part(new Line("do", true));
blocks[1].add_part(new Line("if", false));

setInterval(draw, 16);
setInterval(update, 16);