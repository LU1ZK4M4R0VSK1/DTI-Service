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
    
    # Exibe os caminhos gerados para o usuário (ou processa conforme necessário)
    messagebox.showinfo("Caminhos das Impressoras", "\n".join(caminhos))

# Configuração da interface gráfica
janela = tk.Tk()
janela.title("Instalação de Impressoras")

# Rótulo e campo de entrada
rotulo = tk.Label(janela, text="Digite os números das impressoras (separados por vírgula):")
rotulo.pack(pady=10)

campo_entrada = tk.Entry(janela, width=30)
campo_entrada.pack(pady=10)

# Botão para adicionar impressoras
botao_adicionar = tk.Button(janela, text="Adicionar Impressora", command=adicionar_impressora)
botao_adicionar.pack(pady=20)

# Inicia a interface gráfica
janela.mainloop()
