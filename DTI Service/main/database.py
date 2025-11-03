import json
import os
import sys

def get_data_dir():
    """Retorna o caminho absoluto para o diretório 'data', funcionando em modo dev e bundled."""
    print(f"[INFO] CWD atual: {os.getcwd()}")
    if getattr(sys, 'frozen', False):
        # Se estiver rodando como um executável (PyInstaller)
        base_dir = sys._MEIPASS
        print(f"[INFO] Modo Bundled detectado. BaseDir (_MEIPASS): {base_dir}")
    else:
        # Se estiver rodando como um script .py
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
        print(f"[INFO] Modo Desenvolvimento detectado. BaseDir: {base_dir}")
    
    data_dir = os.path.join(base_dir, 'data')
    print(f"[DEBUG] Diretório de dados final configurado para: {data_dir}")
    return data_dir

DATA_DIR = get_data_dir()

def obter_scripts(tipo="programas"):
    """Retorna todos os scripts de um arquivo JSON específico."""
    arquivo_json = os.path.join(DATA_DIR, f"{tipo}.json")
    print(f"[DEBUG JSON PATH] Caminho completo para o JSON: {arquivo_json}")
    
    # Fallback com dados de exemplo
    dados_exemplo = {
        "Exemplo 1 (Falha no carregamento)": "N/A",
        "Exemplo 2 (Falha no carregamento)": "N/A"
    }

    try:
        with open(arquivo_json, 'r', encoding='utf-8') as f:
            scripts = json.load(f)
        
        # Log dos 3 primeiros itens
        primeiros_itens = dict(list(scripts.items())[:3])
        print(f"[SUCCESS] Dados de '{tipo}.json' carregados com sucesso.")
        print(f"[DEBUG JSON DATA] 3 primeiros itens: {primeiros_itens}")
        return scripts
    except FileNotFoundError:
        print(f"[ERROR] Arquivo JSON não encontrado em: {arquivo_json}")
        print("[WARNING] Carregando dados de exemplo para a GUI.")
        return dados_exemplo
    except json.JSONDecodeError:
        print(f"[ERROR] Erro ao decodificar o JSON: {arquivo_json}")
        print("[WARNING] Carregando dados de exemplo para a GUI.")
        return dados_exemplo

def adicionar_script(nome, caminho, tipo="programas"):
    """Adiciona um novo script ao arquivo JSON correspondente."""
    arquivo_json = os.path.join(DATA_DIR, f"{tipo}.json")
    try:
        dados = obter_scripts(tipo)
        # Evita salvar dados de exemplo no arquivo
        if "Exemplo 1 (Falha no carregamento)" in dados:
            dados = {}
        
        dados[nome] = caminho
        os.makedirs(DATA_DIR, exist_ok=True)
        with open(arquivo_json, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)
        print(f"[INFO] Script '{nome}' adicionado com sucesso.")
    except Exception as e:
        print(f"[ERROR] Falha ao adicionar script: {e}")

# Funções de alias
def obter_programas():
    return obter_scripts("programas")

def obter_otimizacoes():
    return obter_scripts("otimizacoes")
