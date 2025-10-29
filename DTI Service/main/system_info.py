import os
import socket
import psutil
import customtkinter as ctk  # Alterando de tkinter para customtkinter
import win32evtlog
import win32security
import datetime
 
class SystemInfo(ctk.CTkFrame):
    def __init__(self, parent):
        super().__init__(parent)  # Torna SystemInfo um Frame dentro de 'parent'
        self.pack(fill="both", expand=True)  # Faz com que o frame ocupe espaço dentro do pai
       
       
        self.info_labels = {}
 
       
        self.create_labels()
        self.update_info()
 
    def create_labels(self):
        # Cria os labels para cada informação
        info_keys = [
            "Usuário logado", "Nome da máquina", "IP da máquina", "Local",
            "Uso do Processador", "Uso da Memória RAM", "Armazenamento"
        ]
        for key in info_keys:
            label = ctk.CTkLabel(self, text=f"{key}: ", anchor="w", justify="left")
            label.pack(pady=2, padx=5, anchor="w")
            self.info_labels[key] = label  # Armazena o label no dicionário
 
    def update_info(self):
        info = {
            "Usuário logado": self.get_logged_in_user(),
            "Nome da máquina": socket.gethostname(),
            "IP da máquina": socket.gethostbyname(socket.gethostname()),
            "Local": self.get_local_info(socket.gethostbyname(socket.gethostname())),
            "Uso do Processador": f"{psutil.cpu_percent()}%",
            "Uso da Memória RAM": f"{psutil.virtual_memory().percent}%",
            "Armazenamento": f"{psutil.disk_usage('C:/').used / (1024 ** 3):.2f} GB de {psutil.disk_usage('C:/').total / (1024 ** 3):.2f} GB"
        }
 
        self.display_info(info)
        self.after(1000, self.update_info)  # Atualiza a cada 1s
 
    def get_logged_in_user(self):
        users = psutil.users()
        return users[0].name if users else "Não disponível"
   
    def get_local_info(self, ip):
        filial_mapping = {
            "0": "SEDE", "15": "FÁBRICA", "1": "CIC", "2": "COLOMBO", "3": "PARANAGUÁ",
            "4": "PONTA GROSSA", "5": "CAMBÉ", "6": "BLUMENAU", "7": "FLORIANÓPOLIS",
            "8": "ITAJAÍ", "9": "JOINVILLE", "10": "MARINGÁ", "11": "SÃO JOSÉ",
            "12": "CAMBORIU", "13": "CD ITAJAI", "14": "CD CASCAVEL", "16": "MINA",
            "17": "ARAQUARI"
        }
        first_octet = ip.split(".")[1]
        return filial_mapping.get(first_octet, "Filial desconhecida")
 
    def display_info(self, info):
        # Atualiza o texto dos labels existentes
        for key, value in info.items():
            self.info_labels[key].configure(text=f"{key}: {value}")