import { invoke } from '@tauri-apps/api/tauri'
import { BaseDirectory } from '@tauri-apps/api/fs';

const body = document.body

const element = document.createElement("h2")
element.textContent = "HELLO"
body.appendChild(element)

invoke("my_custom_command", { message: "Čus :D" })
invoke("hello_command").then((message) => console.log(element.textContent = message.message))