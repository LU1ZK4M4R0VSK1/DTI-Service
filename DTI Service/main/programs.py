import tkinter as tk
from tkinter import messagebox
import subprocess

# ADICIONAR PROGRAMAS -------------------------------------------------------------------------------------------------------
opcoes = {
    "Protheus": "Instaladores\\DTI Service\\Programas\\Protheus\\Main.ps1",
    "TeamViewer": "Instaladores\\DTI Service\\Programas\\TeamViewer\\Main.ps1",
    "SGEE": "Instaladores\\DTI Service\\Programas\\SGEE\\Main.ps1",
    "Adobe Reader": "Instaladores\\DTI Service\\Programas\\Adobe\\Main.ps1",
    "Meridian": "Instaladores\\DTI Service\\Programas\\MeridianPowerShell\\main\\App.ps1",
    "Otimizacao": "Instaladores\\DTI Service\\Programas\\Otimizar\\Main\\App.ps1"
}

#FUNCAO GRAFICA ------------------------------------------------------------------------------------------------------------

def create_program_widgets(parent):
    # Adicionar a escolha do servidor
    servidor_label = tk.Label(parent, text="Escolha o Servidor:")
    servidor_label.pack(pady=5)

    servidor_combo = tk.StringVar()
    servidor_dropdown = tk.OptionMenu(parent, servidor_combo, "wasp", "yes")
    servidor_dropdown.pack(pady=5)

    # Criar o ComboBox (caixa de seleção) para o programa
    programa_label = tk.Label(parent, text="Escolha o Programa:")
    programa_label.pack(pady=5)

    combo = tk.StringVar()
    dropdown = tk.OptionMenu(parent, combo, *opcoes.keys())
    dropdown.pack(pady=5)

    # Criar o botão "OK"
    ok_button = tk.Button(parent, text="OK", command=lambda: on_button_click(combo.get(), servidor_combo.get()))
    ok_button.pack(pady=10)
    
    
#FUNCOES ------------------------------------------------------------------------------------------------------------

def on_button_click(escolha, servidor):
    if escolha and servidor:
        caminho_base = f"\\\\{servidor}\\"  # Monta o caminho base com o servidor escolhido
        caminho_script = caminho_base + opcoes.get(escolha)  # Adiciona o caminho do script
        executar_script(caminho_script, escolha)  # Chama a função genérica
    else:
        messagebox.showwarning("Aviso", "Nenhuma opção válida foi selecionada.")

# Função genérica para executar scripts PowerShell
def executar_script(caminho_script, nome_programa):
    try:
        subprocess.run(["powershell.exe", "-ExecutionPolicy", "Bypass", "-File", caminho_script], check=True)
        messagebox.showinfo("Sucesso", f"{nome_programa} executado com sucesso!")
    except subprocess.CalledProcessError:
        messagebox.showerror("Erro", f"Falha ao executar {nome_programa}.")