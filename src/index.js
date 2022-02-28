import { invoke } from '@tauri-apps/api/tauri'
import { appWindow, PhysicalSize } from "@tauri-apps/api/window"


function setup() {
    appWindow.setMinSize(new PhysicalSize(600, 450));
}

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

const content = document.getElementById("content");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

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
    console.log(canvas.width, canvas.height);
}

setup();

let button = document.getElementById("file");

button.onclick = function() {
    invoke("create_file");
}

window.addEventListener("resize", resize_canvas());

ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
ctx.fillStyle = "#000000";
ctx.font = "48px serif"
ctx.fillText("Hello", 10, 100, 50);

invoke("my_custom_command", { message: "Čus :D" })
invoke("hello_command").then((message) => console.log(message.message))