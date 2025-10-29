class AutoVueInstaller {
    [string]$InstallerPath

    AutoVueInstaller([string]$installerPath) {
        $this.InstallerPath = $installerPath
    }

    [void] InstallAutoVue() {
        $msiArgs = @(
            "/i", "`"$($this.InstallerPath)`"",
            "/quiet",
            "/norestart",
            "/log", "C:\temp\install_log.txt"
        )
        
        Start-Process -FilePath "msiexec.exe" -ArgumentList $msiArgs -NoNewWindow -Wait
    }
}