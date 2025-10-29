# Modules\Uninstall.ps1
<#
.SYNOPSIS
Limpeza completa de instalações anteriores
#>

function Clear-TeamViewerLegacy {
    param($Config)

    try {
        Write-Host "Removendo instalações anteriores..."
        
        # Encerrar processos
        Stop-TeamViewerProcesses

        # Desinstalação via uninstaller
        if (Test-Path $Config.UninstallerPath) {
            Start-Process -FilePath $Config.UninstallerPath -ArgumentList $Config.SilentArguments -Wait
        }

        # Limpeza de registro
        $registryPaths = @(
            "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*",
            "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*",
            "HKCU:\SOFTWARE\TeamViewer",
            "HKLM:\SOFTWARE\TeamViewer"
        )

        $registryPaths | ForEach-Object {
            if (Test-Path $_) {
                Remove-Item -Path $_ -Recurse -Force -ErrorAction SilentlyContinue
                Write-Host "Registro $_ removido"
            }
        }

        # Limpeza de arquivos
        $cleanupPaths = @(
            $Config.LocalTempPath,
            "C:\Program Files (x86)\TeamViewer"
        )

        $cleanupPaths | ForEach-Object {
            if (Test-Path $_) {
                Remove-Item -Path $_ -Recurse -Force -ErrorAction SilentlyContinue
                Write-Host "Pasta $_ removida"
            }
        }
    }
    catch {
        throw "Falha na limpeza: $_"
    }
}