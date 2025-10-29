import sqlite3
import os
import sys

# Função para obter o diretório base, seja em modo de desenvolvimento ou empacotado
def get_base_dir():
    if hasattr(sys, '_MEIPASS'):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

BASE_DIR = get_base_dir()
DB_PATH = os.path.join(BASE_DIR, "database", "dti_service.db")

def inicializar_banco():
    """Cria o banco de dados e as tabelas, se não existirem."""
    # Garante que o diretório do banco de dados exista
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS programas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT UNIQUE NOT NULL,
            caminho TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS otimizacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT UNIQUE NOT NULL,
            caminho TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    inicializar_banco()


def adicionar_script(nome, caminho, tabela="programas"):
    """Adiciona um novo script ao banco de dados."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO {tabela} (nome, caminho) VALUES (?, ?)", (nome, caminho))
        conn.commit()
    except sqlite3.IntegrityError:
        print(f"Erro: Já existe um script chamado '{nome}' ")
    finally:
        conn.close()


def obter_scripts(tabela="programas"):
    """Retorna todos os scripts armazenados no banco de dados."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"SELECT nome, caminho FROM {tabela}")
    scripts = {row[0]: row[1] for row in cursor.fetchall()}
    conn.close()
    return scripts