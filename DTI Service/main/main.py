import tkinter as tk
from tkinter import ttk  # Importar ttk para usar abas
from tkinter import messagebox
from PIL import Image, ImageTk
import programs
import printers

# JANELA PRINCIPAL ---------------------------------------------------------------------------------------------
root = tk.Tk()
root.title("DTI Service")
root.geometry("400x500")  # Aumentar a janela para acomodar melhor os elementos

# IMAGEM --------------------------------------------------------------------------------------------------------
try:
    img_original = Image.open("C:/Windows/logo_itambe.png")  # Abrir a imagem
    img_redimensionada = img_original.resize((100, 100))  # Redimensionar a imagem
    image = ImageTk.PhotoImage(img_redimensionada)  # Converter para usar no Tkinter
    image_label = tk.Label(root, image=image)
    image_label.pack(pady=10)
except:
    image_label = tk.Label(root, text="Imagem")
    image_label.pack(pady=10)

# ABAS -----------------------------------------------------------------------------------------------------------
notebook = ttk.Notebook(root)
notebook.pack(pady=10, expand=True)

# ABA PROGRAMA ---------------------------------------------------------------------------------------------------
programas_frame = ttk.Frame(notebook)
notebook.add(programas_frame, text="Programas")

# Adicionar widgets para programas
programs.create_program_widgets(programas_frame)

# ABA IMPRESSORA -------------------------------------------------------------------------------------------------
impressoras_frame = ttk.Frame(notebook)
notebook.add(impressoras_frame, text="Impressoras")

# Adicionar widgets para impressoras
printers.create_printer_widgets(impressoras_frame)

# INICIA A INTERFACE ---------------------------------------------------------------------------------------------
root.mainloop()
