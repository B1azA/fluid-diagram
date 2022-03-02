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

#[derive(serde::Serialize)]
struct Message {
	message: String,
	value: f32
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

fn main() {
	println!("Welcome to FluidDiagram!");
	init();

	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![])
    	.run(tauri::generate_context!())
    	.expect("error while running tauri application");
}

fn init() {
	
}

