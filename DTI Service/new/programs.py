import customtkinter as ctk
import json
import subprocess
from tkinter import messagebox

class ProgramsTab:
    def __init__(self, tabview):
        # Criar a aba dentro do tabview
        self.frame = tabview.tab("Programas")

        # Carregar o dicionário de programas do JSON
        self.opcoes = self.carregar_programas()

        # Criar um frame interno para os botões
        self.button_frame = ctk.CTkFrame(self.frame)
        self.button_frame.pack(fill="both", expand=True, padx=10, pady=10)

        # Configurar redimensionamento automático
        self.frame.bind("<Configure>", self.reorganizar_botoes)

        self.create_widgets()

    def carregar_programas(self):
        """Carrega a lista de programas a partir do arquivo JSON"""
        try:
            with open(r"\\wasp\Instaladores\DTI Service\DTI Service\data\programas.json", "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            messagebox.showerror("Erro", f"Não foi possível carregar os programas.\n{e}")
            return {}

    def create_widgets(self):
        """Cria os botões dinamicamente"""
        self.botoes = []  # Lista para armazenar os botões

        for programa, caminho in self.opcoes.items():
            btn = ctk.CTkButton(
                self.button_frame,
                text=programa,
                command=lambda p=caminho: self.executar_script(p)
            )
            self.botoes.append(btn)

        # Chamar a função para organizar os botões imediatamente
        self.frame.after(100, self.reorganizar_botoes)  

    def reorganizar_botoes(self, event=None):
        """Organiza os botões dinamicamente com base no tamanho do frame"""
        for widget in self.button_frame.winfo_children():
            widget.grid_forget()  # Remove os botões da grade antes de reorganizar

        largura_frame = self.button_frame.winfo_width()  # Obtém a largura atual do frame
        if largura_frame == 1:  # Evita erro caso a largura ainda não tenha sido calculada
            return

        tamanho_botao = 150  # Defina um tamanho base para os botões
        espaco_extra = 10  # Espaço entre os botões
        max_colunas = max(1, largura_frame // (tamanho_botao + espaco_extra))  # Define o número máximo de colunas baseado no tamanho do frame

        linha, coluna = 0, 0
        for btn in self.botoes:
            btn.grid(row=linha, column=coluna, padx=5, pady=5, sticky="ew")
            coluna += 1
            if coluna >= max_colunas:
                coluna = 0
                linha += 1

        # Configurar a expansão das colunas
        for i in range(max_colunas):
            self.button_frame.grid_columnconfigure(i, weight=1)

    def executar_script(self, caminho_script):
        """Executa o script do programa selecionado"""
        try:
            subprocess.run(["powershell.exe", "-ExecutionPolicy", "Bypass", "-File", caminho_script], check=True)
            messagebox.showinfo("Sucesso", f"Executado com sucesso!\n{caminho_script}")
        except subprocess.CalledProcessError:
            messagebox.showerror("Erro", f"Falha ao executar:\n{caminho_script}")