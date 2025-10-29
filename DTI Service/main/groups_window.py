import customtkinter as ctk
import subprocess
import os
import sys

# Função para obter o diretório base
def get_base_dir():
    if hasattr(sys, '_MEIPASS'):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

BASE_DIR = get_base_dir()

# Função para executar scripts PowerShell e retornar a saída
def run_powershell_script(script_name):
    script_path = os.path.join(BASE_DIR, script_name)
    try:
        result = subprocess.run(["powershell", "-File", script_path], capture_output=True, text=True, check=True)
        return result.stdout.strip().split('\n')
    except subprocess.CalledProcessError as e:
        return [f"Erro ao executar {script_name}: {e.stderr}"]
    except FileNotFoundError:
        return [f"Erro: O script {script_name} não foi encontrado em {script_path}"]
    except Exception as e:
        return [f"Erro inesperado: {str(e)}"]

# Função para criar a janela de grupos
def show_groups_window(root):
    grupos_window = ctk.CTkToplevel(root)
    grupos_window.title("Grupos do Usuário e da Máquina")
    grupos_window.geometry("800x700")

    # Forçar a nova janela a ficar sempre no topo
    grupos_window.attributes("-topmost", True)
    grupos_window.lift()
    grupos_window.focus_force()

    # Remover o atributo "topmost" após a janela ganhar foco
    grupos_window.after(100, lambda: grupos_window.attributes("-topmost", False))

    # Frame para os grupos do usuário
    user_frame = ctk.CTkFrame(grupos_window, corner_radius=10)
    user_frame.pack(side="left", fill="both", expand=True, padx=10, pady=10)

    user_label = ctk.CTkLabel(user_frame, text="Grupos do Usuário", font=("Arial", 14, "bold"))
    user_label.pack(pady=10)

    user_groups = run_powershell_script("UserGroups.ps1")
    for group in user_groups:
        ctk.CTkLabel(user_frame, text=group).pack()

    # Frame para os grupos da máquina
    computer_frame = ctk.CTkFrame(grupos_window, corner_radius=10)
    computer_frame.pack(side="right", fill="both", expand=True, padx=10, pady=10)

    computer_label = ctk.CTkLabel(computer_frame, text="Grupos da Máquina", font=("Arial", 14, "bold"))
    computer_label.pack(pady=10)

    computer_groups = run_powershell_script("ComputerGroups.ps1")
    for group in computer_groups:
        ctk.CTkLabel(computer_frame, text=group).pack()