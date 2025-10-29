from tkinter import messagebox
import os
import customtkinter as ctk

class PrintersTab:
    def __init__(self, notebook):
        self.frame = notebook.tab("Impressoras")  # Obtém a aba correta já existente
        self.create_widgets()

    def create_widgets(self):
        # Rótulo e campo de entrada
        ctk.CTkLabel(self.frame, text="Digite o número da impressora:").pack(pady=10)

        self.campo_entrada = ctk.CTkEntry(self.frame, width=100)
        self.campo_entrada.pack(pady=10)

        # Botão para adicionar impressoras
        ctk.CTkButton(self.frame, text="Adicionar Impressora", command=self.adicionar_impressora).pack(pady=20)

    def formatar_numero(self, numero):
        return f"{int(numero):04}"

    def obter_caminho(self, numero):
        numero_formatado = self.formatar_numero(numero)
        if 601 <= int(numero_formatado) <= 701:
            return f"\\\\prtsrv-fabrica\\IMP-{numero_formatado}"
        else:
            return f"\\\\nirvana\\IMP-{numero_formatado}"

    def adicionar_impressora(self):
        numeros = self.campo_entrada.get().split(',')
        for numero in numeros:
            numero = numero.strip()
            if numero.isdigit() and 0 <= int(numero) <= 9999:
                caminho = self.obter_caminho(numero)
                os.system(f'explorer {caminho}')
            else:
                messagebox.showerror("Erro", f"Número inválido: {numero}")