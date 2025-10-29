import customtkinter as ctk
import json
import subprocess
from tkinter import messagebox
 
class OptimizationsTab:
    def __init__(self, tabview):
        # Criar a aba dentro do tabview
        self.frame = tabview.tab("Otimizações")
 
        # Carregar o dicionário de otimizações do JSON
        self.opcoes = self.carregar_otimizacoes()
 
        # Criar um frame interno para os botões
        self.button_frame = ctk.CTkFrame(self.frame)
        self.button_frame.pack(fill="both", expand=True, padx=0, pady=10)
 
        # Criar os botões dinamicamente
        self.create_widgets()
 
    def carregar_otimizacoes(self):
        """Carrega a lista de otimizações a partir do arquivo JSON"""
        try:
            with open(r"\\wasp\Instaladores\DTI Service\DTI Service\data\otimizacoes.json", "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            messagebox.showerror("Erro", f"Não foi possível carregar as otimizações.\n{e}")
            return {}
 
    def create_widgets(self):
        """Cria os botões dinamicamente"""
        for otimizacao, caminho in self.opcoes.items():
            btn = ctk.CTkButton(
                self.button_frame,
                text=otimizacao,
                command=lambda p=caminho: self.executar_script(p)
            )
            btn.pack(pady=5, padx=10, fill="x")  # Organiza os botões verticalmente
 
    def executar_script(self, caminho_script):
        """Executa o script de otimização selecionado"""
        try:
            subprocess.run(["powershell.exe", "-ExecutionPolicy", "Bypass", "-File", caminho_script], check=True)
            messagebox.showinfo("Sucesso", f"Executado com sucesso!\n{caminho_script}")
        except subprocess.CalledProcessError:
            messagebox.showerror("Erro", f"Falha ao executar:\n{caminho_script}")