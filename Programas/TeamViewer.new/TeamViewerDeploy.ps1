# TeamViewerDeploy.ps1 (Script Principal)
<#
.SYNOPSIS
Script automatizado para instalação e configuração do TeamViewer
#>

# Configurações iniciais
Set-ExecutionPolicy Bypass -Scope Process -Force
$ErrorActionPreference = "Stop"

# Carregar módulos
. "$PSScriptRoot\Modules\_Core.ps1"
. "$PSScriptRoot\Modules\Uninstall.ps1"
. "$PSScriptRoot\Modules\Install.ps1"

try {
    # Configurações fixas
    $config = @{
        ServerExePath    = "\\wasp\Instaladores\DTI Service\Programas\TeamViewer.new\Files\TeamViewer_Host_Setup.exe"
        LocalTempPath    = "C:\TempTV"
        TeamViewerExe    = "C:\Program Files (x86)\TeamViewer\TeamViewer.exe"
        UninstallerPath  = "C:\Program Files (x86)\TeamViewer\uninstall.exe"
        SilentArguments  = "/S"
    }

    # Fluxo principal
    Clear-TeamViewerLegacy -Config $config
    Install-TeamViewer -Config $config
    Start-Sleep -Seconds 3
    Restart-TeamViewerAsAdmin -Config $config
    Start-Sleep -Seconds 3

    Write-Host "Processo concluido com sucesso!" -ForegroundColor Green
}
catch {
    Write-Host "Falha crítica: $_" -ForegroundColor Red
    exit 1
}