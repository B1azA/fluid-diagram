import { appWindow, PhysicalSize } from "@tauri-apps/api/window";
import { resize_canvas } from "./canvas.js";

const screen_height = window.screen.height;
const screen_width = window.screen.width;
const scale = Math.sqrt(screen_width * screen_height);
const root = document.querySelector(":root");
const tools_width = scale / 8;

function resize() {
    root.style.setProperty("--menu_height", scale / 40 + "px");
    root.style.setProperty("--content_height", window.innerHeight - scale / 40 + "px");
    root.style.setProperty("--tools_width", tools_width + "px");
    root.style.setProperty("--content_width", window.innerWidth - tools_width + "px");
    resize_canvas();
    
    var menu_button = document.querySelectorAll("#menu button");
    menu_button.forEach(button => {
        button.style.setProperty("font-size", scale / 80 + "px");
    });

    var tools_button = document.querySelectorAll("#tools button");
    tools_button.forEach(button => {
        button.style.setProperty("font-size", scale / 60 + "px");
    })
}

appWindow.setMinSize(new PhysicalSize(600, 450));
resize();
window.addEventListener("resize", resize);
window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
});

var close_tools_button = document.getElementById("close-tools");
var closed = false;
close_tools_button.onclick = function() {
    if (!closed) {
        closed = true;
        root.style.setProperty("--tools_width", tools_width / 5 + "px");
        root.style.setProperty("--content_width", window.innerWidth - (tools_width / 5) + "px");
        resize_canvas();
        close_tools_button.textContent = ">>>";
    } else {
        closed = false;
        root.style.setProperty("--tools_width", tools_width + "px");
        root.style.setProperty("--content_width", window.innerWidth - tools_width + "px");
        resize_canvas();
        close_tools_button.textContent = "<<<";
    }
}