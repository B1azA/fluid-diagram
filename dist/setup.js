const screen_height = window.screen.height;
const screen_width = window.screen.width;

function resize() {
    var root = document.querySelector(":root");
    root.style.setProperty("--menu_height", screen_height / 40 + "px");
    root.style.setProperty("--content_height", window.innerHeight - screen_height / 40 + "px");
    
    var menu_button = document.querySelectorAll("#menu button");
    menu_button.forEach(button => {
        button.style.setProperty("font-size", screen_height / 80 + "px");
    });

    var tools_button = document.querySelectorAll("#tools button");
    tools_button.forEach(button => {
        button.style.setProperty("font-size", screen_height / 60 + "px");
    })
}

resize();
window.addEventListener("resize", resize);
window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
});