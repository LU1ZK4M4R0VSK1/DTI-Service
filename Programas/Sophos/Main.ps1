# Verifica se a pasta "C:\temp" existe
if (!(Test-Path -Path "C:\temp")) {
    # Cria a pasta "C:\temp" caso não exista
    New-Item -ItemType Directory -Path "C:\temp"
    Write-Host "A pasta 'C:\temp' foi criada."

    # Verifica se o arquivo "sophos.exe" já existe na pasta
    if (Test-Path -Path "C:\temp\sophos.exe") {
        # Executa o arquivo existente
        Start-Process -FilePath "C:\temp\sophos.exe" -Wait
        Write-Host "O arquivo 'sophos.exe' já existe e foi executado."
        return
    }
} else {
    Write-Host "A pasta 'C:\temp' já existe."
}

# Define o caminho da pasta de origem e do arquivo
$origem = "\\wasp\instaladores\Install DELL"
$arquivo = "SophosSetup.exe"
$destino = "C:\temp\$arquivo"

# Verifica se o arquivo de origem existe
if (Test-Path -Path "$origem\$arquivo") {
    # Copia o arquivo para "C:\temp"
    Copy-Item -Path "$origem\$arquivo" -Destination $destino -Force
    Write-Host "O arquivo '$arquivo' foi copiado para 'C:\temp'."

    # Executa o arquivo copiado
    Start-Process -FilePath $destino -Wait
    Write-Host "O arquivo '$arquivo' foi executado com sucesso."
} else {
    Write-Host "O arquivo '$arquivo' não foi encontrado na origem: $origem."
}
