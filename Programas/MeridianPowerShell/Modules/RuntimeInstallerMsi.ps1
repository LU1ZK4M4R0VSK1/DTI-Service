class RuntimeInstallerMsi {
    [string]$InstallerPath

    RuntimeInstallerMsi([string]$installerPath) {
        $this.InstallerPath = $installerPath
    }

    [void] Install() {
        $msiArgs = @(
            "/i", "`"$($this.InstallerPath)`"",
            "/quiet",
            "/norestart",
            "/log", "C:\temp\install_log.txt"
        )

        Start-Process -FilePath "msiexec.exe" -ArgumentList $msiArgs -NoNewWindow -Wait
    }
}