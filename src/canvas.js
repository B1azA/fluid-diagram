const content = document.getElementById("content");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function get_ratio() {
    var ctx = document.getElementById("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
}


function resize_canvas() {
    canvas.width = content.style.width;
    canvas.height = content.style.height;

    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var ratio = get_ratio();
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
}

export function draw() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
    ctx.fillStyle = "#000000";
    ctx.font = "48px serif";
    ctx.fillText("Hello", 10, 100, 50);
}


window.addEventListener("resize", resize_canvas());
