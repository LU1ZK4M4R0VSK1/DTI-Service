import customtkinter as ctk
import subprocess
from tkinter import messagebox
from database import obter_scripts

class OptimizationsTab:
    def __init__(self, tabview):
        self.frame = tabview.tab("Otimizações")
        self.opcoes = self.obter_scripts("otimizacoes")  # Obter os scripts
        print(f"[DEBUG Optimizations] Dados recebidos: {self.opcoes}")  # Log de depuração
        self.button_frame = ctk.CTkFrame(self.frame)
        self.button_frame.pack(fill="both", expand=True, padx=0, pady=10)
        self.create_widgets()

    def obter_scripts(self, tipo):
        """
        Função para obter os scripts do banco de dados.
        """
        try:
            opcoes = obter_scripts(tipo)
            if not opcoes:
                print(f"Nenhum script encontrado para {tipo}")
            return opcoes
        except Exception as e:
            print(f"Erro ao obter scripts para {tipo}: {e}")
            return {}

    def create_widgets(self):
        """
        Função para criar os botões dinamicamente a partir das opções de scripts.
        """
        print(f"[DEBUG GUI Optimizations] Tentando criar widgets com as opções: {self.opcoes}")
        if not self.opcoes:
            print("[WARNING GUI Optimizations] Nenhuma opção encontrada. Exibindo aviso.")
            label_aviso = ctk.CTkLabel(self.button_frame, text="Nenhuma otimização carregada.\nVerifique os logs.", text_color="gray")
            label_aviso.pack(pady=20, padx=10)
            return

        for otimizacao, caminho in self.opcoes.items():
            btn = ctk.CTkButton(self.button_frame, text=otimizacao, command=lambda p=caminho: self.executar_script(p))
            btn.pack(pady=5, padx=10, fill="x")

    def executar_script(self, caminho_script):
        """
        Função para executar o script PowerShell.
        """
        try:
            subprocess.run(["powershell.exe", "-ExecutionPolicy", "Bypass", "-File", caminho_script], check=True)
            messagebox.showinfo("Sucesso", f"Executado com sucesso!\n{caminho_script}")
        except subprocess.CalledProcessError:
            messagebox.showerror("Erro", f"Falha ao executar:\n{caminho_script}")