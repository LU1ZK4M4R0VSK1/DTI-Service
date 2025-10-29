class PCOptimization {
    [void] SetPowerPlan() {
        Write-Host "Definindo plano de energia para alto desempenho..."

        powercfg /change standby-timeout-ac 2700
        powercfg /change monitor-timeout-ac 2700
        powercfg /change monitor-timeout-dc 2700
        powercfg /change sleep-timeout-ac 2700
        powercfg /change sleep-timeout-dc 2700
        
        powercfg /setactive SCHEME_MIN
        Write-Host "Plano de energia alterado para alto desempenho, e todos os tempos ajustados para 45 minutos."
    }

    [void] DisableGraphicsEffects() {
        Write-Host "Desabilitando efeitos gráficos..."

        $keyPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer"
        $keyName = "VisualEffects"
        $effectKey = Get-Item -Path $keyPath -ErrorAction SilentlyContinue

        if (-not $effectKey) {
            Write-Host "Chave de registro não encontrada. Criando..."
            New-Item -Path $keyPath -Name $keyName -Force
        }

        Set-ItemProperty -Path "$keyPath\$keyName" -Name "VisualFXSetting" -Value 2
        Write-Host "Efeitos gráficos desabilitados."
    }

    [void] ClearTempFiles() {
        Write-Host "Limpando arquivos temporários..."
        $tempPath = [System.IO.Path]::GetTempPath()
        Remove-Item -Path "$tempPath*" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Arquivos temporários removidos."
    }

    [void] SetMaxProcessors() {
        Write-Host "Abrindo opções avançadas de inicialização..."
        Start-Process -FilePath "msconfig.exe"
        Write-Host "Abra as Opções Avançadas de Inicialização e configure o número de processadores manualmente."
    }
}