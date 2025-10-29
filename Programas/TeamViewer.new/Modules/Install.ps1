# Modules\Install.ps1
<#
.SYNOPSIS
Funções de instalação e inicialização
#>

function Install-TeamViewer {
    param($Config)

    try {
        Write-Host "Iniciando instalação..."
        
        Initialize-Environment -Config $Config

        # Copiar arquivo do servidor
        Copy-Item -Path $Config.ServerExePath -Destination $Config.LocalTempPath -Force

        # Instalação silenciosa
        $installer = Join-Path -Path $Config.LocalTempPath -ChildPath "TeamViewer_Host_Setup.exe"
        Start-Process -FilePath $installer -ArgumentList $Config.SilentArguments -Wait -NoNewWindow

        Write-Host "Instalação concluída"
    }
    catch {
        throw "Erro na instalação: $_"
    }
}

function Restart-TeamViewerAsAdmin {
    param($Config)

    try {
        # Garantir que o processo está fechado
        Stop-TeamViewerProcesses
        Start-Sleep -Seconds 2

        # Iniciar como administrador
        if (Test-Path $Config.TeamViewerExe) {
            Start-Process -FilePath $Config.TeamViewerExe -Verb RunAs
            Start-Sleep -Seconds 2
            Start-Process -FilePath $Config.TeamViewerExe -Verb RunAs
            Write-Host "TeamViewer iniciado com privilégios administrativos"
        }
        else {
            throw "Arquivo executável não encontrado"
        }
    }
    catch {
        throw "Falha ao reiniciar o TeamViewer: $_"
    }
}