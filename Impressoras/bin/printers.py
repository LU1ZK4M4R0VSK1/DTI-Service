import tkinter as tk
from tkinter import messagebox

def formatar_numero(numero):
    # Formata para 4 dígitos com zeros à esquerda
    return f"{int(numero):04}"

def obter_caminho(numero):
    numero_formatado = formatar_numero(numero)
    # Verifica o intervalo para escolher o caminho correto
    if 601 <= int(numero_formatado) <= 704:
        return f"\\\\prtsrv-fabrica\\IMP-{numero_formatado}"
    else:
        return f"\\\\nirvana\\IMP-{numero_formatado}"

def adicionar_impressora():
    numeros = campo_entrada.get().split(',')
    for numero in numeros:
        numero = numero.strip()  # Remove espaços extras
        if numero.isdigit() and 0 <= int(numero) <= 9999:
            caminho = obter_caminho(numero)
            # Usa o comando explorer.exe diretamente
            os.system(f'explorer {caminho}')
        else:
            messagebox.showerror("Erro", f"Número inválido: {numero}")
            return