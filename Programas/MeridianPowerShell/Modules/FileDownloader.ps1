class FileDownloader {
    [string]$SourcePath
    [string]$DestinationPath

    FileDownloader([string]$source, [string]$destination) {
        $this.SourcePath = $source
        $this.DestinationPath = $destination
    }

    [void] DownloadFiles() {
        if (!(Test-Path -Path $this.DestinationPath)) {
            New-Item -Path $this.DestinationPath -ItemType Directory
        }

        Copy-Item -Path "$($this.SourcePath)\*" -Destination $this.DestinationPath -Recurse
    }
}