use std::sync::{Arc, Mutex};
use tauri::{Builder, CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, WindowBuilder};

fn main() {
    let main_window: Arc<Mutex<Option<tauri::Window>>> = Arc::new(Mutex::new(None));

    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("show", "Show"))
        .add_item(CustomMenuItem::new("exit", "Exit"));

    let main_window_clone = main_window.clone();

    Builder::default()
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(move |app, event| {
            let main_window_ref = main_window_clone.clone();

            match event {
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "show" => {
                        let mut main_window_guard = main_window_ref.lock().unwrap();

                        if main_window_guard.is_none() {
                            let app_clone = app.clone();
                            *main_window_guard = Some(
                                WindowBuilder::new(
                                    &app_clone,
                                    "",
                                    tauri::WindowUrl::App("index.html".into()),
                                )
                                .build()
                                .expect("Erro ao criar a janela principal"),
                            );
                        }

                        if let Some(ref window) = *main_window_guard {
                            match window.is_visible() {
                                Ok(is_visible) => {
                                    if is_visible {
                                        window.hide().unwrap();
                                    } else {
                                        window.show().unwrap();
                                    }
                                }
                                Err(e) => {
                                    eprintln!(
                                        "Erro ao verificar a visibilidade da janela: {:?}",
                                        e
                                    );
                                }
                            }
                        }
                    }
                    "exit" => {
                        app.exit(0);
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("Erro ao executar a aplicação Tauri");
}

#[tauri::command]
fn greet() {
    println!("Hello from Tauri!");
}
