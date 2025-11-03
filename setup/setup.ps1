# Script para criar atalho para o DTI Service na área de trabalho pública
# Não precisa modificar politica de execução permanentemente

# Define os caminhos
$sourceExe = "\\wasp\Instaladores\DTI Service\DTI Service\exe\main.exe"
$sourceIcon = "\\wasp\Instaladores\DTI Service\DTI Service\img\logo_itambe.ico"
$publicDesktopPath = [System.Environment]::GetFolderPath('CommonDesktopDirectory')
$tempDir = "C:\temp"
$destinationIconPath = Join-Path $tempDir "logo_itambe.ico"
$shortcutPath = Join-Path $publicDesktopPath "DTI Service.lnk"

# Cria a pasta C:\temp se não existir
if (-not (Test-Path -Path $tempDir)) {
    New-Item -Path $tempDir -ItemType Directory -Force
}

# Copia o ícone para C:\temp
Copy-Item -Path $sourceIcon -Destination $destinationIconPath -Force

# Cria o atalho
$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $sourceExe
$shortcut.IconLocation = $destinationIconPath
$shortcut.Description = "Ferramenta de Atendimento DTI"
$shortcut.Save()

Write-Host "Atalho 'DTI Service' criado com sucesso na Área de Trabalho Pública."