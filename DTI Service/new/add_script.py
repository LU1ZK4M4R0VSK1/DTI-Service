import customtkinter as ctk
import json
import os
from tkinter import filedialog

def add_script_window():
    def save_script():
        script_type = type_var.get()
        script_name = name_entry.get()
        script_path = path_var.get().replace("/", "\\")  # Corrige as barras invertidas
        
        if not script_name or not script_path:
            status_label.configure(text="Preencha todos os campos!", text_color="red")
            return
        
        file_name = "\\\\wasp\\Instaladores\\DTI Service\\DTI Service\\data\\programas.json" if script_type == "Programa" else "\\\\wasp\\Instaladores\\DTI Service\\DTI Service\\data\\otimizacoes.json"
        
        if os.path.exists(file_name):
            with open(file_name, "r", encoding="utf-8") as file:
                data = json.load(file)
        else:
            data = {}
        
        data[script_name] = script_path
        
        with open(file_name, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
        
        status_label.configure(text="Script adicionado com sucesso!", text_color="green")
        
        # Fecha a janela após adicionar o script
        window.destroy()

    def browse_file():
        file_path = filedialog.askopenfilename()
        if file_path:
            path_var.set(file_path.replace("/", "\\"))
            browse_button.configure(fg_color="green")  # Muda a cor para verde para indicar seleção
        
        # Mantém a janela na frente
        window.lift()
        window.focus_force()

    window = ctk.CTkToplevel()
    window.title("Adicionar Script")
    window.geometry("400x305")

    # Mantém a janela sempre no topo (remove depois de um tempo)
    window.attributes("-topmost", True)
    window.after(100, lambda: window.attributes("-topmost", False))

    ctk.CTkLabel(window, text="Tipo de Script:").pack(pady=5)
    type_var = ctk.StringVar(value="Programa")
    ctk.CTkOptionMenu(window, variable=type_var, values=["Programa", "Otimização"]).pack(pady=5)

    ctk.CTkLabel(window, text="Nome do Script:").pack(pady=5)
    name_entry = ctk.CTkEntry(window)
    name_entry.pack(pady=5)

    path_var = ctk.StringVar()
    browse_button = ctk.CTkButton(window, text="Buscar Arquivo", command=browse_file)
    browse_button.pack(pady=10)

    add_button = ctk.CTkButton(window, text="Adicionar", command=save_script)
    add_button.pack(pady=20)

    status_label = ctk.CTkLabel(window, text="")
    status_label.pack()