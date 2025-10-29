class ShortcutManager {
    [string]$PublicDesktopPath = "$env:PUBLIC\Desktop"
    [string]$PowerUserSourcePath
    [string]$PowerUserProgramPath = "C:\Program Files\BC-Meridian\Program"
    [string]$PowerUserUProgramPath = "C:\Program Files (x86)\BC-Meridian\Program"

    ShortcutManager([string]$powerUserSourcePath) {
        $this.PowerUserSourcePath = $powerUserSourcePath
    }

    [void] RemoveShortcuts() {
        $shortcut1 = "$this.PublicDesktopPath\Meridian PowerUser (64-bit).lnk"
        $shortcut2 = "$this.PublicDesktopPath\Meridian PowerUser.lnk"

        if (Test-Path $shortcut1) {
            Remove-Item $shortcut1
        }

        if (Test-Path $shortcut2) {
            Remove-Item $shortcut2
        }
    }

    [void] CopyFilesAndCreateShortcuts() {

        Copy-Item -Path "$($this.PowerUserSourcePath)\PowerUser.exe" -Destination $this.PowerUserProgramPath
        Copy-Item -Path "$($this.PowerUserSourcePath)\PowerUserU.exe" -Destination $this.PowerUserUProgramPath

        $shortcutPath1 = "$this.PublicDesktopPath\Meridian PowerUser.lnk"
        $targetPath1 = "$this.PowerUserProgramPath\PowerUser.exe"

        $shortcutPath2 = "$this.PublicDesktopPath\Meridian PowerUser (64-bit).lnk"
        $targetPath2 = "$this.PowerUserUProgramPath\PowerUserU.exe"

        $WScriptShell = New-Object -ComObject WScript.Shell
        
        $shortcut1 = $WScriptShell.CreateShortcut($shortcutPath1)
        $shortcut1.TargetPath = $targetPath1
        $shortcut1.Save()

        $shortcut2 = $WScriptShell.CreateShortcut($shortcutPath2)
        $shortcut2.TargetPath = $targetPath2
        $shortcut2.Save()
    }
}