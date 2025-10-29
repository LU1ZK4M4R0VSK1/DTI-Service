# Verificar se a pasta "C:\temp" existe e criá-la caso não exista
$TempPath = "C:\temp"
if (-Not (Test-Path -Path $TempPath)) {
    Write-Host "A pasta $TempPath não existe. Criando a pasta..."
    New-Item -ItemType Directory -Path $TempPath | Out-Null
    Write-Host "Pasta criada com sucesso."
} else {
    Write-Host "A pasta $TempPath já existe."
}
 
# Caminho da origem e destino para cópia
$SourcePath = "\\wasp\Instaladores\Oracle\11r2_client.zip"
$DestinationPath = "$TempPath\11r2_client"
$ZipFile = "$TempPath\11r2_client.zip"
 
# Verificar se o destino já contém os arquivos e copiá-los se necessário
if (-Not (Test-Path -Path $DestinationPath)) {
    Write-Host "Copiando arquivos de $SourcePath para $TempPath..."
    Copy-Item -Path $SourcePath -Destination $TempPath
    Write-Host "Arquivo ZIP copiado com sucesso."
 
    # Descompactar o arquivo ZIP
    Write-Host "Descompactando o arquivo ZIP..."
    Expand-Archive -Path $ZipFile -DestinationPath $DestinationPath -Force
    Write-Host "Arquivo descompactado em $DestinationPath."
} else {
    Write-Host "Os arquivos já foram copiados e descompactados em $DestinationPath."
}
 
# Caminho para o arquivo setup.exe
$SetupExe = "$DestinationPath\setup.exe"
 
# Verificar se o arquivo setup.exe existe
if (Test-Path -Path $SetupExe) {
    Write-Host "Iniciando o setup..."
    try {
        Start-Process -FilePath $SetupExe -Wait
        Write-Host "O setup foi iniciado com sucesso."
    } catch {
        Write-Host "Erro ao iniciar o setup. Execute manualmente o seguinte comando no CMD:"
        Write-Host "$SetupExe -debug"
    }
} else {
    Write-Host "O arquivo setup.exe não foi encontrado em $SetupExe. Verifique se os arquivos foram copiados e descompactados corretamente."
}