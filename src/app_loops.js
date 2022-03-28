import { Point } from "./canvas.js";
import * as cnvs from "./canvas.js";
import { Block, BlockPart, Form, Line } from "./block.js";

export var canvas = cnvs;
export var scale = 1.5;
export var offset = new Point(0, 0);

var blocks = [];

function draw() {
    canvas.clear();
    blocks.forEach(block => {
        block.draw();
    });

    canvas.draw_text("x: " + offset.x.toFixed(2) + "; " + "y: " + offset.y.toFixed(2), "white", 
        new Point(canvas.get_canvas_size().x - canvas.measure_text("x: " + offset.x.toFixed(2) + "; " + "y: " + offset.y.toFixed(2) + "00", 20).x, 0),
        20);
    canvas.draw_text("scale: " + scale.toFixed(2), "white",
        new Point(canvas.get_canvas_size().x - canvas.measure_text("scale: " + scale.toFixed(2) + "00", 20).x, 
            canvas.measure_text("scale: " + scale.toFixed(2), 20).y), 20);
    canvas.draw_text("m_pos: " + mouse_pos.x.toFixed(2) + "; " + mouse_pos.y.toFixed(2), "white",
        new Point(canvas.get_canvas_size().x -
            canvas.measure_text("m_pos: " + mouse_pos.x.toFixed(2) + "; " + mouse_pos.y.toFixed(2) + "00", 20).x,
            canvas.measure_text("m_pos: " + mouse_pos.x.toFixed(2) + "; " + mouse_pos.y.toFixed(2), 20).y + 20), 20);
}

export var mouse_pos = canvas.get_mouse_position();
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
        update_block(block);

        if (block.is_mouse_on()) {
            block.parts.forEach(part => {
                part.color = "#F0F000";
                update_block_part(block, part);
            });
        } else {
            block.parts.forEach(part => {
                part.color = "#FF0000";
                update_block_part(block, part);
            });
        }
    })
}

function update_block(block) {

}

function update_block_part(block, part) {
    if (part.constructor === Form) {
        var form = part;
        if (form.is_mouse_on && canvas.get_mouse_buttons()[0]) {
            form.color = "#00FF00";
        }
    }
}

// _________________________ SETUP _________________________ \\
scale = 1;

blocks[0] = new Block(new Point(0, 0));
blocks[0].add_part(new Line("main", false));
blocks[0].add_part(new Line("do", false));
blocks[0].add_part(new Line("do", true));
blocks[0].add_part(new Line("if", false));
blocks[0].add_part(new Form(true));

blocks[1] = new Block(new Point(150, 150));
blocks[1].add_part(new Line("main", false));
blocks[1].add_part(new Line("do", false));
blocks[1].add_part(new Line("do", true));
blocks[1].add_part(new Line("if", false));

setInterval(draw, 16);
setInterval(update, 16);