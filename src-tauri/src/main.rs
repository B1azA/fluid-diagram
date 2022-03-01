#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

use std::fs::{File, self};
use std::thread;
use std::path::Path;
use std::io::prelude::*;
use std::process::Command;
use tauri::{Manager};

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

#[tauri::command]
fn create_file() {
	let mut file = File::create("fooooooooo.txt").unwrap();
	file.write_all(b"Ahoj ajshfgjshfgjhsgjh").unwrap();


	println!("created");
}

#[tauri::command]
fn command() {
	thread::spawn(|| {
		let output = if cfg!(target_os = "windows") {
			Command::new("cmd")
				.args(["/C", "python3 -m venv python/fluid-diagram"])
				.output()
				.expect("failed to execute process")
		} else {
			Command::new("sh")
				.args(["-c", "python3 -m venv python/fluid-diagram"])
				.output()
				.expect("failed to execute process")
		};
	
		println!("{}", output.status);
		println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
		println!("stderr: {}", String::from_utf8_lossy(&output.stderr));
	});
}

#[tauri::command]
fn hide_menu(window: tauri::Window) {
	if let Some(menu) = window.get_window("menu") {
		menu.hide().unwrap();
	}
}

#[tauri::command(async)]
async fn show_menu(window: tauri::Window) {
	if let Some(menu) = window.get_window("menu") {
		menu.show().unwrap();
	}
}

fn main() {
	println!("Welcome to FluidDiagram!");
	init();

	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![my_custom_command, hello_command, create_file, hide_menu, show_menu])
    	.run(tauri::generate_context!())
    	.expect("error while running tauri application");
}

fn init() {
	if !Path::new("python").exists() {
		fs::create_dir("python").unwrap();
	}
}

