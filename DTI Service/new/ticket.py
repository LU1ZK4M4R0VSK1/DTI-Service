import customtkinter as ctk
from tkinter import messagebox
import subprocess
import psutil

# CLASSE PARA O FRAME DO NOVO CHAMADO --------------------------------------------------------------------------------
class NovoChamadoTag(ctk.CTkFrame):
    def __init__(self, parent):
        super().__init__(parent)
        
        # RÓTULO "COMENTÁRIOS" ---------------------------------------------------------------------------------------
        ctk.CTkLabel(self, text="Comentários", font=("Arial", 12)).pack(pady=(10, 0))
        
        # CAMPO DE COMENTÁRIO (Texto) --------------------------------------------------------------------------------
        self.comentario_entry = ctk.CTkTextbox(self, height=100, width=400)  # Campo de texto para o usuário digitar o comentário
        self.comentario_entry.pack(pady=10) 
        
        # FRAME PARA A CATEGORIA E STATUS ---------------------------------------------------------------------------
        self.frame_categoria_status = ctk.CTkFrame(self)
        self.frame_categoria_status.pack(pady=10)
        
        # COMBOBOX DE CATEGORIAS ------------------------------------------------------------------------------------
        self.categorias = [
            "Suporte a Impressao",
            "Instalacao de software",
            "Suporte a sistemas",
            "Suporte a Internet",
            "Autenticacao",
            "Orientacao a Usuario",
            "Suporte a Equipamentos de TI",
            "Otimizacao"
        ]
        
        # Adiciona o Combobox para selecionar a categoria
        self.categoria_combobox = ctk.CTkComboBox(self.frame_categoria_status, values=self.categorias, width=200, state="readonly")
        self.categoria_combobox.set("Selecione a Categoria")  # Define um valor inicial
        self.categoria_combobox.grid(row=0, column=0, padx=5)
        
        # COMBOBOX DE STATUS DO CHAMADO ---------------------------------------------------------------------------
        self.status_opcoes = [
            "Concluido",
            "A Fazer"
        ]
        
        # Adiciona o Combobox para selecionar o status do chamado
        self.status_combobox = ctk.CTkComboBox(self.frame_categoria_status, values=self.status_opcoes, width=200, state="readonly")
        self.status_combobox.set("Selecione o Status")  # Define um valor inicial
        self.status_combobox.grid(row=0, column=1, padx=5)
        
        # BOTÃO PARA ENVIAR O CHAMADO --------------------------------------------------------------------------------
        ctk.CTkButton(self, text="Enviar", command=self.enviar_chamado).pack(pady=10) 

    # FUNÇÃO PARA ENVIAR O CHAMADO ---------------------------------------------------------------------------------
    def enviar_chamado(self):
        comentario = self.comentario_entry.get("1.0", ctk.END).strip()  # Pega o texto do campo de comentário e remove espaços extras
        categoria = self.categoria_combobox.get()  # Pega a categoria selecionada
        status = self.status_combobox.get()  # Pega o status selecionado

        # Obtém o usuário logado
        user = self.get_logged_in_user()

        # Verifica se a categoria e o status foram selecionados corretamente
        if categoria != "Selecione a Categoria" and status != "Selecione o Status":
            try:
                # Executa o script PowerShell e passa os argumentos
                subprocess.run(
                    [
                        "powershell.exe",
                        "-File",
                        "\\\\wasp\\Instaladores\\DTI Service\\DTI Service\\main\\testeEmail.ps1",
                        "-Comentario", comentario,
                        "-Categoria", categoria,
                        "-Status", status,
                        "-Usuario", user
                    ],
                    check=True
                )
                messagebox.showinfo("Chamado Enviado", "Chamado enviado com sucesso!")
                self.master.destroy()
            except Exception as e:
                messagebox.showerror("Erro", f"Erro ao enviar o chamado: {e}")
        else:
            messagebox.showwarning("Erro", "Por favor, selecione uma categoria e um status.")

    def get_logged_in_user(self):
        """Obtém o nome do usuário logado na máquina."""
        users = psutil.users()
        if users:
            return users[0].name
        return "Não disponível"

# CLASSE PRINCIPAL DO APLICATIVO DE CHAMADOS -------------------------------------------------------------------------
class NovoChamadoApp:
    def __init__(self, root):
        self.root = root
        self.root.title("DTI Service - Chamados")  
        self.root.geometry("500x400")  

        # CRIAÇÃO DO FRAME PARA NOVO CHAMADO ---------------------------------------------------------------------
        self.novo_chamado_frame = NovoChamadoTag(self.root)  # Cria a instância do frame de novo chamado
        self.novo_chamado_frame.pack(pady=20)  # Adiciona o frame à interface com algum espaço em torno dele

# EXECUÇÃO DA APLICAÇÃO ---------------------------------------------------------------------------------------------
if __name__ == "__main__":
    root = ctk.CTk()  # Cria a janela principal (root)
    app = NovoChamadoApp(root)  # Cria a instância da aplicação NovoChamadoApp
    root.mainloop()  # Inicia o loop principal da interface gráfica