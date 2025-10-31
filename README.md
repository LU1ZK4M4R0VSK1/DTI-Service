# DTI Service

## 1. Título e Descrição

O DTI Service é um sistema interno de automação, desenvolvido para agilizar e padronizar as operações da equipe de TI. A ferramenta centraliza funcionalidades críticas, desde a configuração de novas máquinas até a execução de scripts de manutenção, reduzindo o tempo gasto em tarefas repetitivas e minimizando a chance de erros manuais.

Esta aplicação de desktop, construída com Python e CustomTkinter, oferece uma interface gráfica intuitiva para acessar uma variedade de scripts PowerShell, que são o coração da automação. O sistema é projetado para ser dinâmico, permitindo que novos scripts de programas e otimizações sejam adicionados sem a necessidade de alterar o código-fonte da aplicação.

## 2. Funcionalidades Principais

O DTI Service oferece uma gama de funcionalidades para a equipe de TI:

### Configuração de Máquinas
*   **Instalação de Programas:** Permite a instalação de softwares corporativos com um único clique, executando scripts PowerShell pré-configurados.
*   **Adicionar Impressoras:** Facilita a adição de impressoras de rede, bastando inserir o número da impressora.

### Manutenção
*   **Otimizações de Sistema:** Executa uma série de otimizações no sistema operacional, como limpeza de arquivos temporários, verificação da integridade do sistema e desfragmentação de disco.
*   **Atualização da Aplicação:** Permite que a aplicação seja atualizada para a versão mais recente.

### Utilitários
*   **Criação de Chamados:** Oferece um formulário para a criação de chamados de suporte técnico, que são enviados por e-mail para o sistema de helpdesk.
*   **Visualização de Informações do Sistema:** Exibe informações em tempo real sobre o sistema, como usuário logado, nome da máquina, endereço IP, uso de CPU e memória RAM.
*   **Verificação de Grupos de Usuário e Máquina:** Permite visualizar os grupos do Active Directory aos quais o usuário e a máquina pertencem.
*   **Gerenciamento Dinâmico de Scripts:** Através da interface, é possível adicionar novos scripts de instalação de programas e otimizações, que são armazenados em um banco de dados SQLite.

## 3. Tecnologias e Bibliotecas Utilizadas

*   **Python 3:** Linguagem de programação principal da aplicação.
    *   **Por que foi escolhida?** É uma linguagem versátil, com uma vasta gama de bibliotecas e frameworks, ideal para o desenvolvimento de aplicações de desktop.
*   **CustomTkinter:** Biblioteca utilizada para a criação da interface gráfica.
    *   **Por que foi escolhida?** É uma biblioteca moderna e fácil de usar, que permite a criação de interfaces gráficas com um visual agradável e customizável.
*   **PowerShell:** Linguagem de script utilizada para a automação de tarefas no Windows.
    *   **Por que foi escolhido?** É a ferramenta padrão da Microsoft para automação e gerenciamento de sistemas Windows, oferecendo acesso total à API do sistema operacional.
*   **SQLite:** Banco de dados leve e embarcado.
    *   **Por que foi escolhido?** É ideal para armazenar as informações sobre os scripts de programas e otimizações, pois não requer um servidor de banco de dados separado e é facilmente distribuído com a aplicação.
*   **PyInstaller:** Ferramenta para empacotar a aplicação em um único executável.
    *   **Por que foi escolhido?** Facilita a distribuição e a instalação da aplicação nos computadores dos usuários, eliminando a necessidade de instalar o Python e as dependências manualmente.

## 4. Estrutura do Projeto

```
E:/DTI Service/
├── DTI Service/
│   ├── main/
│   │   ├── main.py               # Ponto de entrada da aplicação, cria a janela principal e as abas.
│   │   ├── database.py           # Gerencia o banco de dados SQLite.
│   │   ├── programs.py           # Cria a aba "Programas" e seus botões.
│   │   ├── optimizations.py      # Cria a aba "Otimizações" e seus botões.
│   │   ├── printers.py           # Cria a aba "Impressoras".
│   │   ├── system_info.py        # Exibe as informações do sistema.
│   │   ├── ticket.py             # Módulo para a criação de chamados.
│   │   ├── add_script.py         # Janela para adicionar novos scripts.
│   │   └── groups_window.py      # Janela para exibir os grupos do usuário e da máquina.
│   ├── data/
│   │   ├── atendentes.json       # Lista de atendentes para os chamados.
│   │   ├── otimizacoes.json      # (Legado) Lista de otimizações.
│   │   └── programas.json        # (Legado) Lista de programas.
│   ├── exe/                      # Contém o executável da aplicação.
│   └── ...
├── Optimizations/                # Scripts PowerShell para otimização do sistema.
│   ├── FullOptimization.ps1      # Exemplo de script de otimização.
│   └── ...
├── Programas/                    # Scripts PowerShell para instalação de programas.
│   ├── Adobe/
│   │   └── Main.ps1              # Exemplo de script de instalação.
│   └── ...
└── README.md                     # Este arquivo.
```

## 5. Instalação e Configuração

### Pré-requisitos
*   Windows 10 ou superior.
*   Python 3.8 ou superior.

### Instalação de Dependências
1.  Clone o repositório para a sua máquina local.
2.  Navegue até a pasta `DTI Service/main`.
3.  Instale as dependências do Python usando o pip:
    ```bash
    pip install customtkinter pillow psutil
    ```

## 6. Como Usar

1.  Execute o arquivo `main.py` para iniciar a aplicação:
    ```bash
    python "E:\DTI Service\DTI Service\main\main.py"
    ```
2.  A janela principal será aberta, exibindo as abas "Programas", "Impressoras" e "Otimizações".
3.  Clique nos botões para executar as ações desejadas.

### Casos de Uso Comuns
*   **Instalar um programa:** Navegue até a aba "Programas" e clique no botão correspondente ao software desejado.
*   **Otimizar o PC:** Vá para a aba "Otimizações" e selecione uma das otimizações disponíveis.
*   **Abrir um chamado:** Clique no botão "Novo Chamado", preencha o formulário e clique em "Enviar".

## 7. Manutenção e Desenvolvimento

### Adicionando Novas Funcionalidades
Para adicionar um novo programa ou otimização, utilize a funcionalidade "Adicionar Script" na própria aplicação. Isso garantirá que o script seja adicionado ao banco de dados e que um botão correspondente seja criado na interface.

### Padrões de Código
*   **Organização:** O código é modularizado, com cada funcionalidade principal em seu próprio arquivo.
*   **Interface Gráfica:** A interface é construída com a biblioteca CustomTkinter, seguindo um padrão de criação de frames e widgets.
*   **Scripts:** As tarefas de automação são realizadas por scripts PowerShell, que são chamados a partir do código Python.

### Estrutura Recomendada para Novos Scripts
*   **PowerShell:** Crie scripts PowerShell que sejam auto-suficientes e que possam ser executados sem a necessidade de interação do usuário.
*   **Armazenamento:** Salve os scripts em pastas apropriadas dentro de `Programas` ou `Optimizations`.
*   **Adição:** Utilize a funcionalidade "Adicionar Script" da aplicação para registrar o novo script no banco de dados.
