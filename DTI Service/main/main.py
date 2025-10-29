import os
import sys
import ctypes
import customtkinter as ctk
import subprocess
from PIL import Image

# Função para obter o diretório base, seja em modo de desenvolvimento ou empacotado
def get_base_dir():
    # PyInstaller cria uma pasta temporária e armazena o caminho em _MEIPASS
    if hasattr(sys, '_MEIPASS'):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

# Definindo o diretório base onde os módulos e recursos estão localizados
BASE_DIR = get_base_dir()
sys.path.append(BASE_DIR)

from system_info import SystemInfo
from programs import ProgramsTab
from printers import PrintersTab
from optimizations import OptimizationsTab
from ticket import NovoChamadoApp
from groups_window import show_groups_window
from add_script import AddScriptWindow
from database import inicializar_banco

# Inicializar banco de dados ao iniciar
try:
    inicializar_banco()
except Exception as e:
    print(f"Erro ao inicializar o banco: {e}")

# Configuração principal
ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("green")

# Criando a janela
root = ctk.CTk()
root.title("Painel de Controle")
root.geometry("1000x600")

# Container principal com scroll
main_container = ctk.CTkScrollableFrame(
    root, 
    orientation="vertical",
    scrollbar_button_color="#2b2b2b",
    scrollbar_button_hover_color="#3b3b3b"
)
main_container.pack(fill="both", expand=True, padx=0, pady=0)

# Frame principal (mantendo a estrutura original)
main_frame = ctk.CTkFrame(main_container, width=700, height=300, corner_radius=15)
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

# Ícone centralizado (agora dentro do container scrollável)
logo_path = os.path.join(BASE_DIR, "logo_itambe.png")
icon_image = ctk.CTkImage(light_image=Image.open(logo_path), size=(60, 60))
icon_label = ctk.CTkLabel(main_container, image=icon_image, text="")
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

def atualizar():
    # Caminho do atalho
    caminho_atalho = r"C:\Users\Public\Desktop\DTI Service.lnk"
    
    # Executar o atalho como administrador
    # A opção 'runas' é necessária para executar com permissões elevadas
    subprocess.run(['runas', '/user:Administrator', caminho_atalho], shell=True)

    # Fechar o programa atual
    root.quit()

# Função de callback para o botão "Adicionar Script"
def on_add_script_button_click():
    # Função para criar widgets após adicionar script (pode ser personalizada)
    def create_widgets():
        pass  # Lógica para atualizar os widgets após adicionar script

    # Cria a janela AddScriptWindow
    AddScriptWindow(root, create_widgets)

# Botões no canto inferior direito (agora dentro do container scrollável)
button_frame = ctk.CTkFrame(main_container, fg_color="transparent")
button_frame.pack(side="bottom", anchor="se", pady=20, padx=20)

# Botão para abrir a janela de novo chamado
novo_chamado_button = ctk.CTkButton(button_frame, text="Novo Chamado", command=abrir_novo_chamado)
novo_chamado_button.pack(side="left", padx=10)

# Botão para adicionar script
adicionar_script_button = ctk.CTkButton(button_frame, text="Adicionar Script", command=on_add_script_button_click)
adicionar_script_button.pack(side="left", padx=10)

# Botão para atualizar
atualizar_button = ctk.CTkButton(button_frame, text="Atualizar", command=atualizar)
atualizar_button.pack(side="left", padx=10)

# Maximizar a janela após iniciar
root.after(100, lambda: root.state("zoomed"))

# Iniciar o loop principal
root.mainloop()