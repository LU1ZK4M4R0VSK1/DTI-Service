import os
import sys
import ctypes
import customtkinter as ctk
from PIL import Image

# Definindo o diretório base onde os módulos estão localizados
BASE_DIR = r"\\wasp\Instaladores\DTI Service\DTI Service\main"
sys.path.append(BASE_DIR)

from system_info import SystemInfo
from programs import ProgramsTab
from printers import PrintersTab
from optimizations import OptimizationsTab
from ticket import NovoChamadoApp
from groups_window import show_groups_window
from add_script import add_script_window

# Configuração principal
ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("green")

# Criando a janela
root = ctk.CTk()
root.title("Painel de Controle")
root.geometry("1000x600")

# Frame principal
main_frame = ctk.CTkFrame(root, width=700, height=300, corner_radius=15)
main_frame.pack(pady=60, padx=20, fill="both", expand=True)

# Frame esquerdo para informações do usuário
info_frame = ctk.CTkFrame(main_frame, width=200, corner_radius=10)
info_frame.pack(side="left", fill="y", padx=10, pady=10)

# Adicionando informações dinâmicas do sistema
system_info = SystemInfo(info_frame)
system_info.pack(pady=20)

# Botão para ver grupos
ver_grupos_button = ctk.CTkButton(info_frame, text="Ver Grupos", command=lambda: show_groups_window(root))
ver_grupos_button.pack(pady=15)

# Ícone centralizado
icon_image = ctk.CTkImage(light_image=Image.open(os.path.join(BASE_DIR, "logo_itambe.png")), size=(60, 60))
icon_label = ctk.CTkLabel(root, image=icon_image, text="")
icon_label.place(relx=0.5, rely=0.01, anchor="n")

# Notebook (abas)
tabview = ctk.CTkTabview(main_frame, width=320, height=200)
tabview.pack(pady=30, padx=30, fill="both", expand=True)

# Criando as abas do notebook
tabview.add("Programas")
tabview.add("Impressoras")
tabview.add("Otimizações")

# Instancia a aba de Programas
ProgramsTab(tabview)
PrintersTab(tabview)
OptimizationsTab(tabview)

# Botões no canto inferior direito
button_frame = ctk.CTkFrame(root, fg_color="transparent")
button_frame.place(relx=0.85, rely=0.9, anchor="se")

# Função para abrir a janela de novo chamado
def abrir_novo_chamado():
    ticket_window = ctk.CTkToplevel(root)
    ticket_window.title("Novo Chamado")
    ticket_window.geometry("500x400")
    ticket_window.attributes("-topmost", True)
    ticket_window.lift()
    ticket_window.focus_force()
    ticket_window.after(100, lambda: ticket_window.attributes("-topmost", False))
    NovoChamadoApp(ticket_window)

# Função para abrir o atalho como admin e fechar o programa atual
def atualizar():
    atalho = r"C:\\Users\\Public\\Desktop\\DTI Service.lnk"
    ctypes.windll.shell32.ShellExecuteW(None, "runas", atalho, None, None, 1)
    root.quit()
    sys.exit()

# Botão para abrir a janela de novo chamado
novo_chamado_button = ctk.CTkButton(button_frame, text="Novo Chamado", command=abrir_novo_chamado)
novo_chamado_button.pack(side="left", padx=10)

adicionar_script_button = ctk.CTkButton(button_frame, text="Adicionar Script", command=add_script_window)
adicionar_script_button.pack(side="left", padx=10)

# Botão para atualizar
atualizar_button = ctk.CTkButton(button_frame, text="Atualizar", command=atualizar)
atualizar_button.pack(side="left", padx=10)

# Maximizar a janela após iniciar
root.after(100, lambda: root.state("zoomed"))

# Iniciar o loop principal
root.mainloop()