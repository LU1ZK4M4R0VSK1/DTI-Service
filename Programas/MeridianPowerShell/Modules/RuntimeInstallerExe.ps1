class RuntimeInstallerExe {
    [string]$InstallerPath

    RuntimeInstallerExe([string]$installerPath) {
        $this.InstallerPath = $installerPath
    }

    [void] Install() {
        $exeArgs = @(
            "/s",
            "/norestart",
            "/log", "C:\temp\install_log.txt"
        )

        Start-Process -FilePath $this.InstallerPath -ArgumentList $exeArgs -NoNewWindow -Wait
    }
}