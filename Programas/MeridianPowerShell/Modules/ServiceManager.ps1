class ServiceManager {
    [string]$ServiceName
    [string]$StartupType

    ServiceManager([string]$serviceName, [string]$startupType) {
        $this.ServiceName = $serviceName
        $this.StartupType = $startupType
    }

    [void] ConfigureService() {
        Set-Service -Name $this.ServiceName -StartupType $this.StartupType
        Start-Service -Name $this.ServiceName
    }
}