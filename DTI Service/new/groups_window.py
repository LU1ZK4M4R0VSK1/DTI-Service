import customtkinter as ctk
import subprocess

# Função para executar scripts PowerShell e retornar a saída
def run_powershell_script(script_path):
    try:
        result = subprocess.run(["powershell", "-File", script_path], capture_output=True, text=True)
        if result.returncode == 0:
            return result.stdout.strip().split('\n')
        else:
            return ["Erro ao executar o script."]
    except Exception as e:
        return [f"Erro: {str(e)}"]

# Função para criar a janela de grupos
def show_groups_window(root):
    grupos_window = ctk.CTkToplevel(root)
    grupos_window.title("Grupos do Usuário e da Máquina")
    grupos_window.geometry("800x700")

    # Forçar a nova janela a ficar sempre no topo
    grupos_window.attributes("-topmost", True)  # Mantém a janela no topo
    grupos_window.lift()  # Traz a janela para o topo
    grupos_window.focus_force()  # Força o foco para a nova janela

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