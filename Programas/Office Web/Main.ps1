# Caminho da pasta de origem dos ícones
$origemIcones = "\\wasp\Instaladores\DTI Service\Programas\Office Web\Ico"

# Caminho da pasta temporária local
$tempPath = "C:\temp"
$icoPath = Join-Path -Path $tempPath -ChildPath "Ico"

# Criar pasta temp e Ico se não existirem
if (!(Test-Path -Path $tempPath)) {
    New-Item -Path $tempPath -ItemType Directory | Out-Null
}
if (!(Test-Path -Path $icoPath)) {
    New-Item -Path $icoPath -ItemType Directory | Out-Null
}

# Copiar ícones para a pasta local
Copy-Item -Path "$origemIcones\*" -Destination $icoPath -Force -Recurse

# Lista de atalhos a serem criados
$atalhos = @(
    @{
        Nome = "Excel.lnk"
        URL = "https://m365.cloud.microsoft/launch/Excel/?auth=2"
        Icone = "$icoPath\Excel.ico"
    },
    @{
        Nome = "Teams.lnk"
        URL = "https://teams.microsoft.com/v2/"
        Icone = "$icoPath\TeamsIco.ico"
    },
    @{
        Nome = "Outlook.lnk"
        URL = "https://outlook.office.com/mail/"
        Icone = "$icoPath\Outlook.ico"
    },
    @{
        Nome = "Word.lnk"
        URL = "https://m365.cloud.microsoft/launch/Word/?auth=2"
        Icone = "$icoPath\Word.ico"
    },
    @{
        Nome = "Power Point.lnk"
        URL = "https://m365.cloud.microsoft/launch/PowerPoint/?auth=2"
        Icone = "$icoPath\PowerPoint.ico"
    }
)

# Caminho para a área de trabalho pública
$desktopPath = [Environment]::GetFolderPath("CommonDesktopDirectory")

# Criando os atalhos com ícones locais
foreach ($atalho in $atalhos) {
    $shortcutPath = Join-Path -Path $desktopPath -ChildPath $atalho.Nome
    $WshShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut($shortcutPath)
    
    # Define a URL como destino do atalho
    $Shortcut.TargetPath = $atalho.URL
    $Shortcut.IconLocation = $atalho.Icone
    $Shortcut.Save()
    Write-Host "Atalho $($atalho.Nome) criado com sucesso."
}

Write-Host "Processo concluído."