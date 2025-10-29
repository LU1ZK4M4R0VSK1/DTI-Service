class JavaInstaller {
    [string]$InstallerPath

    JavaInstaller([string]$installerPath) {
        $this.InstallerPath = $installerPath
    }

    [void] InstallJava() {
        $exeArgs = @(
            "/s",
            "/norestart",
            "/log", "C:\temp\install_log.txt"
        )

        Start-Process -FilePath $this.InstallerPath -ArgumentList $exeArgs -NoNewWindow -Wait
    }
}