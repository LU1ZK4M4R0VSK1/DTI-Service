# Verifica se o DWG TrueView está instalado
$trueView = Get-Package -Name "Autodesk DWG TrueView*" -ErrorAction SilentlyContinue

if ($trueView) {
    Write-Host "DWG TrueView encontrado. Iniciando desinstalação..."
    $packageName = $trueView.Name
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/x $($trueView.IdentifyingNumber) /quiet /norestart" -Wait
    Write-Host "Desinstalação concluída."
} else {
    Write-Host "Nenhuma instalação do DWG True View encontrada."
}

# Verifica se a pasta C:\temp existe, se não, cria
$tempFolder = "C:\temp"
if (!(Test-Path -Path $tempFolder)) {
    New-Item -ItemType Directory -Path $tempFolder | Out-Null
    Write-Host "Pasta C:\temp criada."
} else {
    Write-Host "Pasta C:\temp ja existe."
}

# Define o caminho do instalador na rede
$installerPath = "\\wasp\Instaladores\Autodesk DWG True View 2025\Autodesk_DWG_TrueView_2025_en-US_setup_webinstall.exe"

# Copia o arquivo do caminho de rede para o C:\temp
Copy-Item -Path $installerPath -Destination $tempFolder -Force

# Define o caminho do instalador localmente
$localInstaller = "$tempFolder\Autodesk_DWG_TrueView_2025_en-US_setup_webinstall.exe"

# Executa o instalador em modo silencioso
Start-Process -FilePath $localInstaller -ArgumentList "/quiet /norestart" -Wait

# Verifica o status da instalação
if ($LASTEXITCODE -eq 0) {
    Write-Host "Instalação concluída com sucesso."
} else {
    Write-Host "Falha na instalação. Código de erro: $LASTEXITCODE"
}

# Remove o arquivo de instalação após concluir
Remove-Item -Path $localInstaller -Force
Write-Host "Arquivo de instalação removido."
