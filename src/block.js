import { Point } from "./canvas.js"
import { canvas, scale, offset, mouse_pos } from "./app_loops.js"

export class BlockPart {
    constructor(width, height, new_line) {
        this.width = width;
        this.height = height;
        this.new_line = new_line;
        this.color;
    }

    draw(pos) {
    }
}

export class Line extends BlockPart {
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

export class Form extends BlockPart {
    constructor(new_line, color = "#FF0000") {
        var size = canvas.measure_text_background("000000", Block.size * scale);
        super(size.x, size.y, new_line);
        this.color = color;
        this.text = "000000";
        this.is_mouse_on = false;
    }

    draw(pos) {
        canvas.draw_text_background(this.text, "#000000", this.color,
        new Point(pos.x * scale + offset.x * scale, pos.y * scale + offset.y * scale), Block.size * scale);

        
        var rec_pos = new Point(pos.x * scale + offset.x * scale, pos.y * scale + offset.y * scale);
        var width = this.width * scale;
        var height = this.height * scale;
        
        var left_side = rec_pos.x;
        var right_side = rec_pos.x + width;
        var top_side = rec_pos.y;
        var bottom_side = rec_pos.y + height;
        
        this.is_mouse_on = mouse_pos.x > left_side && mouse_pos.x < right_side &&
            mouse_pos.y - 1 > top_side && mouse_pos.y < bottom_side;
    }
}

export class Block {
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

        for (var i = 1; i < this.parts.length; i++) {
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

        return mouse_pos.x > left_side && mouse_pos.x < right_side &&
            mouse_pos.y - 1 > top_side && mouse_pos.y < bottom_side;
    }
}