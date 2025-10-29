# Caminho de origem do arquivo .ico
$origemIco = "\\wasp\Instaladores\DTI Service\Programas\SoftExpert\Ico\SoftExpert.ico"

# Caminho de destino no disco local C
$destinoTemp = "C:\temp"
$destinoIco = "$destinoTemp\Ico\SoftExpert.ico"

# Verifica se a pasta "temp" existe no disco local C, se não, cria a pasta
if (-not (Test-Path -Path $destinoTemp)) {
    New-Item -Path $destinoTemp -ItemType Directory
}

# Verifica se a pasta "Ico" existe dentro de "temp", se não, cria a pasta
if (-not (Test-Path -Path "$destinoTemp\Ico")) {
    New-Item -Path "$destinoTemp\Ico" -ItemType Directory
}

# Copia o arquivo .ico para a pasta "Ico" no disco local C
Copy-Item -Path $origemIco -Destination $destinoIco -Force

# Caminho da área de trabalho pública
$desktopPath = [Environment]::GetFolderPath("CommonDesktopDirectory")

# Nome do atalho
$atalhoNome = "Soft Expert.lnk"

# Caminho completo do atalho
$atalhoPath = Join-Path -Path $desktopPath -ChildPath $atalhoNome

# URL do site
$url = "https://cimentoitambe.softexpert.com/softexpert/login?page=200361,153&msg=100144"

# Cria o atalho na área de trabalho
$shell = New-Object -ComObject WScript.Shell
$atalho = $shell.CreateShortcut($atalhoPath)
$atalho.TargetPath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$atalho.Arguments = $url
$atalho.IconLocation = $destinoIco
$atalho.Description = "Atalho para o SoftExpert"
$atalho.Save()

Write-Host "Atalho criado com sucesso na área de trabalho pública!"