# Caminho absoluto para o arquivo progress.txt
$progressFile = "\\wasp\Instaladores\DTI Service\DTI Service\Instalation\progress.txt"

# Inicializa o arquivo de progresso (se não existir)
if (-not (Test-Path -Path $progressFile)) {
    Set-Content -Path $progressFile -Value "0"
}

# Função para atualizar o progresso
function Atualizar-Progresso {
    param (
        [int]$Porcentagem
    )
    Set-Content -Path $progressFile -Value $Porcentagem
}

# Verifica se a pasta C:\temp existe, senão cria
if (-not (Test-Path -Path "C:\temp")) {
    New-Item -ItemType Directory -Path "C:\temp" | Out-Null
    Write-Host "Pasta C:\temp criada."
    Atualizar-Progresso -Porcentagem 10
} else {
    Write-Host "Pasta C:\temp já existe."
    Atualizar-Progresso -Porcentagem 10
}

# Caminhos
$tempPath = "C:\temp\OfficeSetup.exe"
$networkPath = "\\wasp\Instaladores\Office 365\OfficeSetup.exe"

# Verifica se o executável existe no C:\temp
if (Test-Path -Path $tempPath) {
    Write-Host "Executável OfficeSetup.exe encontrado no C:\temp. Executando..."
    Atualizar-Progresso -Porcentagem 50
    Start-Process -FilePath $tempPath -NoNewWindow
    Atualizar-Progresso -Porcentagem 100
} else {
    Write-Host "Executável OfficeSetup.exe não encontrado no C:\temp."
    Atualizar-Progresso -Porcentagem 20

    # Verifica se o executável existe na pasta de rede
    if (Test-Path -Path $networkPath) {
        Write-Host "Copiando OfficeSetup.exe do compartilhamento de rede para C:\temp..."
        Atualizar-Progresso -Porcentagem 40
        Copy-Item -Path $networkPath -Destination "C:\temp" -Force

        if (Test-Path -Path $tempPath) {
            Write-Host "Arquivo copiado com sucesso. Executando OfficeSetup.exe..."
            Atualizar-Progresso -Porcentagem 70
            Start-Process -FilePath $tempPath -NoNewWindow
            Atualizar-Progresso -Porcentagem 100
        } else {
            Write-Host "Falha ao copiar o arquivo para C:\temp. Verifique as permissões e o caminho."
            Atualizar-Progresso -Porcentagem 50
        }
    } else {
        Write-Host "O arquivo OfficeSetup.exe não foi encontrado no compartilhamento de rede. Verifique o caminho."
        Atualizar-Progresso -Porcentagem 30
    }
}
