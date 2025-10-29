import customtkinter as ctk
import os
from tkinter import filedialog
from database import adicionar_script


class AddScriptWindow:
    def __init__(self, master, create_widgets):
        self.master = master
        self.create_widgets = create_widgets  # Passando a função create_widgets como parâmetro
        self.window = None
        self.add_script_window()

    def add_script_window(self):
        def save_script():
            # Obtendo os dados do formulário
            script_type = type_var.get()  # Tipo do script (Programa ou Otimização)
            script_name = name_entry.get()  # Nome do script
            script_path = path_var.get().replace("/", "\\")  # Caminho do script

            # Verificando se todos os campos foram preenchidos
            if not script_name or not script_path:
                status_label.configure(text="Preencha todos os campos!", text_color="red")
                return

            # Escolhendo a tabela de acordo com o tipo de script
            tabela = "programas" if script_type == "Programa" else "otimizacoes"

            # Chamando a função para adicionar o script no banco de dados
            try:
                adicionar_script(script_name, script_path, tabela)
                status_label.configure(text="Script adicionado com sucesso!", text_color="green")
                
                # Atualizando a interface com os novos scripts
                self.window.after(100, self.create_widgets)  # Chama create_widgets com um pequeno atraso
            except Exception as e:
                status_label.configure(text=f"Erro ao adicionar script: {e}", text_color="red")

            # Fechar a janela após adicionar o script
            self.window.destroy()

        def browse_file():
            # Função para abrir o diálogo de busca de arquivo
            file_path = filedialog.askopenfilename()
            if file_path:
                path_var.set(file_path.replace("/", "\\"))  # Corrige as barras invertidas para Windows
                browse_button.configure(fg_color="green")  # Muda a cor do botão para verde

            # Manteve a janela no topo
            self.window.lift()
            self.window.focus_force()

        # Criando a janela de adicionar script
        self.window = ctk.CTkToplevel(self.master)
        self.window.title("Adicionar Script")
        self.window.geometry("400x305")

        self.window.attributes("-topmost", True)  # Manter a janela sempre no topo
        self.window.after(100, lambda: self.window.attributes("-topmost", False))  # Retirar a janela do topo após 100ms

        # Adicionando os componentes da janela
        ctk.CTkLabel(self.window, text="Tipo de Script:").pack(pady=5)
        type_var = ctk.StringVar(value="Programa")  # Variável para selecionar o tipo de script
        ctk.CTkOptionMenu(self.window, variable=type_var, values=["Programa", "Otimização"]).pack(pady=5)

        ctk.CTkLabel(self.window, text="Nome do Script:").pack(pady=5)
        name_entry = ctk.CTkEntry(self.window)  # Campo de entrada para o nome do script
        name_entry.pack(pady=5)

        # Variável para o caminho do arquivo
        path_var = ctk.StringVar()
        browse_button = ctk.CTkButton(self.window, text="Buscar Arquivo", command=browse_file)
        browse_button.pack(pady=10)

        add_button = ctk.CTkButton(self.window, text="Adicionar", command=save_script)
        add_button.pack(pady=20)

        status_label = ctk.CTkLabel(self.window, text="")  # Label para mostrar o status
        status_label.pack()


# Exemplo de como usar a classe
if __name__ == "__main__":
    root = ctk.CTk()  # Janela principal
    def create_widgets():
        # Função para criar os widgets da interface principal, que será chamada após a adição de um script
        pass  # Implemente sua função de criar widgets aqui
    
    AddScriptWindow(root, create_widgets)  # Passando a função create_widgets para a janela de adicionar script
    root.mainloop()