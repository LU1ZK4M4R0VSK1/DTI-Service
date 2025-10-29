class PrinterManager {
    [string]$PrinterIP
    [string]$PrinterName
    [string]$DriverPath
    [string]$DriverName

    PrinterManager([string]$ip, [string]$name, [string]$driverPath, [string]$driverName) {
        $this.PrinterIP = $ip
        $this.PrinterName = $name
        $this.DriverPath = $driverPath
        $this.DriverName = $driverName
    }

    [void]CreateTcpIpPort() {
        Write-Host "Criando porta TCP/IP para o IP $($this.PrinterIP)"
        Add-PrinterPort -Name "IP_$($this.PrinterIP)" -PrinterHostAddress $this.PrinterIP
    }

    [void]InstallDriver() {
        Write-Host "Instalando o driver $($this.DriverName) a partir de $($this.DriverPath)"
        
        # Especificando o caminho completo do arquivo .inf
        $driverInfPath = Join-Path -Path $this.DriverPath -ChildPath "hpi2144.inf"
        
        if (Test-Path $driverInfPath) {
            Write-Host "Driver encontrado: $driverInfPath"
            # Instalando o driver usando pnputil
            pnputil.exe /add-driver "$driverInfPath" /install
        
            if (-not (Get-PrinterDriver | Where-Object { $_.Name -eq $this.DriverName })) {
                Write-Host "Adicionando o driver..."
                Add-PrinterDriver -Name $this.DriverName
            }
        } else {
            Write-Host "O caminho para o driver não é válido: $driverInfPath"
            throw "Caminho do driver inválido."
        }
    }
    
       

    [void]AddPrinter() {
        Write-Host "Adicionando a impressora $($this.PrinterName) com IP $($this.PrinterIP)"
        Add-Printer -Name $this.PrinterName -DriverName $this.DriverName -PortName "IP_$($this.PrinterIP)"
    }

    [void]SetupPrinter() {
        $this.CreateTcpIpPort()
        $this.InstallDriver()
        $this.AddPrinter()
        Write-Host "Configuração da impressora $($this.PrinterName) concluída."
    }
}