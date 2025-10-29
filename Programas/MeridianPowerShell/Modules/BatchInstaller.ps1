class BatchInstaller {
    [string]$BatchFilePath

    BatchInstaller([string]$batchFilePath) {
        $this.BatchFilePath = $batchFilePath
    }

    [void] ExecuteSilently() {
        Start-Process -FilePath $this.BatchFilePath -ArgumentList "/silent" -NoNewWindow -Wait
    }
}