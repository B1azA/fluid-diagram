import { invoke } from '@tauri-apps/api/tauri'
import "./setup.js"
import { draw } from "./canvas.js"

    // -------------------- MAIN CODE -------------------- \\

var file = document.getElementById("file");
file.onclick = function() {
    /* const menu = new WebviewWindow("menu", {
    url: "menu.html"
    }); */
}
var project = document.getElementById("project");
project.onclick = function () {
    // invoke("hide_menu");
}

draw();

invoke("my_custom_command", { message: "Čus :D" })
invoke("hello_command").then((message) => console.log(message.message))