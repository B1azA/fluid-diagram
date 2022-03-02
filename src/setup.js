import { appWindow, PhysicalSize } from "@tauri-apps/api/window"

const screen_height = window.screen.height;
const screen_width = window.screen.width;
const scale = Math.sqrt(screen_width * screen_height);

function resize() {
    var root = document.querySelector(":root");
    root.style.setProperty("--menu_height", scale / 40 + "px");
    root.style.setProperty("--content_height", window.innerHeight - scale / 40 + "px");
    
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