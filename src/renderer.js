import { Point } from "./canvas.js";
import * as canvas from "./canvas.js";

class Block {
    constructor(pos, width, height) {
        this.pos = pos;
        this.height = height;
        this.width = width;
        this.line = [];
    }

    add_line(line) {
        this.line[this.line.length] = line;
    }

    draw() {
        var pos = new Point(0, 0);
        this.line.forEach(line => {
            var size = canvas.measure_text(line, 30);
            canvas.draw_text_background(line, "#000000", "#FF0000", new Point(pos.x + offset.x, pos.y + offset.y), 30);
            pos.y += size.y;
        });
    }
}

var scale = 1.0;
var offset = new Point(0, 0);

var block = new Block(0, 0, 100, 100);
block.add_line("if");
block.add_line("do");
block.add_line("else");


function draw_block() {
    block.draw();
}

function draw() {
    canvas.clear();
    draw_block();
    console.log(canvas.is_mouse_on_canvas());
};

setInterval(draw, 16);