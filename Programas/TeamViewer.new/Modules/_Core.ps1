# Modules\_Core.ps1
<#
.SYNOPSIS
Funções essenciais e compartilhadas
#>

function Initialize-Environment {
    param($Config)
    
    # Criar pasta temporária se não existir
    if (-not (Test-Path $Config.LocalTempPath)) {
        New-Item -Path $Config.LocalTempPath -ItemType Directory -Force | Out-Null
    }
}

function Stop-TeamViewerProcesses {
    Get-Process -Name "*TeamViewer*" -ErrorAction SilentlyContinue | ForEach-Object {
        try {
            Stop-Process -Id $_.Id -Force -ErrorAction Stop
            Write-Host "Processo $($_.Name) encerrado"
        }
        catch {
            Write-Warning "Falha ao encerrar processo $($_.Name)"
        }
    }
}