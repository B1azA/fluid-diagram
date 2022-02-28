#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

#[tauri::command]
fn my_custom_command(message: String) {
	println!("{}", message);
}

#[derive(serde::Serialize)]
struct Message {
	message: String,
	value: f32
}

#[tauri::command]
fn hello_command() -> Message {
	Message {
		message: String::from("Hello, how are you doing?"),
		value: 1.0132
	}
}

fn main() {
	println!("Welcome to FluidDiagram!");
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![my_custom_command, hello_command])
    	.run(tauri::generate_context!())
    	.expect("error while running tauri application");
  	println!("{}", "hello mi amigo!!!");
}

