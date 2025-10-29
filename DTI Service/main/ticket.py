import customtkinter as ctk
from tkinter import messagebox
import psutil
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json
import os

# Função para enviar o e-mail
def enviar_email(comentario, categoria, status, usuario, atendente):
    # Configurações do servidor SMTP
    smtp_server = "smtp.office365.com"
    smtp_port = 587
    smtp_user = "servicedti@cimentoitambe.com.br"
    smtp_password = "Itambe@!@#$%"
    from_address = "servicedti@cimentoitambe.com.br"
    to_address = "helpdesk@cimentoitambe.com.br"
    cc_address = f"{usuario}@cimentoitambe.com.br"
    subject = f"Categoria: {categoria}"
    body = f"""
    E-mail gerado automaticamente pelo Service DTI.

    Solicito a abertura do chamado com as seguintes informações:

    Categoria: {categoria}
    Status: {status}
    Atendente: {atendente}
    Comentários: {comentario}

    Usuário: {usuario}
    """

    # Configuração da mensagem
    msg = MIMEMultipart()
    msg['From'] = from_address
    msg['To'] = to_address
    msg['Cc'] = cc_address
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Conectando ao servidor SMTP e enviando o e-mail
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  # Habilita criptografia
            server.login(smtp_user, smtp_password)  # Faz login
            server.sendmail(from_address, [to_address, cc_address], msg.as_string())  # Envia o e-mail
        print("E-mail enviado com sucesso.")
    except Exception as e:
        print(f"Erro ao enviar e-mail: {e}")

# CLASSE PARA O FRAME DO NOVO CHAMADO --------------------------------------------------------------------------------
class NovoChamadoTag(ctk.CTkFrame):
    def __init__(self, parent):
        super().__init__(parent)

        # Carregar atendentes do JSON
        self.atendentes = self.load_atendentes()

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

        # COMBOBOX DE ATENDENTES ------------------------------------------------------------------------------------
        self.atendente_combobox = ctk.CTkComboBox(self.frame_categoria_status, values=self.atendentes, width=200, state="readonly")
        self.atendente_combobox.set("Selecione o Atendente")  # Define um valor inicial
        self.atendente_combobox.grid(row=1, column=0, columnspan=2, pady=10)


        # BOTÃO PARA ENVIAR O CHAMADO --------------------------------------------------------------------------------
        ctk.CTkButton(self, text="Enviar", command=self.enviar_chamado).pack(pady=10)

    def load_atendentes(self):
        try:
            # Obtém o diretório do script atual
            base_dir = os.path.dirname(os.path.abspath(__file__))
            # Constrói o caminho para o arquivo JSON
            json_path = os.path.join(base_dir, '..', 'data', 'atendentes.json')
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get("atendentes", [])
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Erro ao carregar atendentes: {e}")
            return []

    # FUNÇÃO PARA ENVIAR O CHAMADO ---------------------------------------------------------------------------------
    def enviar_chamado(self):
        comentario = self.comentario_entry.get("1.0", ctk.END).strip()  # Pega o texto do campo de comentário e remove espaços extras
        categoria = self.categoria_combobox.get()  # Pega a categoria selecionada
        status = self.status_combobox.get()  # Pega o status selecionado
        atendente = self.atendente_combobox.get() # Pega o atendente selecionado

        # Obtém o usuário logado
        user = self.get_logged_in_user()

        # Verifica se a categoria e o status foram selecionados corretamente
        if categoria != "Selecione a Categoria" and status != "Selecione o Status" and atendente != "Selecione o Atendente":
            try:
                # Envia o e-mail diretamente, sem o PowerShell
                enviar_email(comentario, categoria, status, user, atendente)
                messagebox.showinfo("Chamado Enviado", "Chamado enviado com sucesso!")
                self.master.destroy()
            except Exception as e:
                messagebox.showerror("Erro", f"Erro ao enviar o chamado: {e}")
        else:
            messagebox.showwarning("Erro", "Por favor, selecione uma categoria, um status e um atendente.")

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