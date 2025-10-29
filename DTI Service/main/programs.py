import customtkinter as ctk
import subprocess
from tkinter import messagebox
from database import obter_scripts

class ProgramsTab:
    def __init__(self, tabview):
        self.frame = tabview.tab("Programas")
        self.opcoes = self.obter_scripts("programas")  # Obter os scripts
        self.button_frame = ctk.CTkFrame(self.frame)
        self.button_frame.pack(fill="both", expand=True, padx=10, pady=10)
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
        if not self.opcoes:
            print("Nenhum script encontrado, não foi possível criar os botões.")
            return

        for programa, caminho in self.opcoes.items():
            btn = ctk.CTkButton(self.button_frame, text=programa, command=lambda p=caminho: self.executar_script(p))
            btn.pack(pady=5, padx=10, fill="x")


    def reorganizar_botoes(self, event=None):
        """
        Função para reorganizar os botões conforme o tamanho da tela.
        """
        for widget in self.button_frame.winfo_children():
            widget.grid_forget()

        largura_frame = self.button_frame.winfo_width()
        if largura_frame == 1:
            return
        
        tamanho_botao = 150
        espaco_extra = 10
        max_colunas = max(1, largura_frame // (tamanho_botao + espaco_extra))
        
        linha, coluna = 0, 0
        for btn in self.botoes:
            btn.grid(row=linha, column=coluna, padx=5, pady=5, sticky="ew")
            coluna += 1
            if coluna >= max_colunas:
                coluna = 0
                linha += 1
        
        for i in range(max_colunas):
            self.button_frame.grid_columnconfigure(i, weight=1)

    def executar_script(self, caminho_script):
        """
        Função para executar o script PowerShell.
        """
        try:
            subprocess.run(["powershell.exe", "-ExecutionPolicy", "Bypass", "-File", caminho_script], check=True)
            messagebox.showinfo("Sucesso", f"Executado com sucesso!\n{caminho_script}")
        except subprocess.CalledProcessError:
            messagebox.showerror("Erro", f"Falha ao executar:\n{caminho_script}")