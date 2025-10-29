$scriptPath = "\\wasp\Instaladores\DTI Service\Programas\MeridianPowerShell\Modules"

. "$scriptPath\FileDownloader.ps1"
. "$scriptPath\JavaInstaller.ps1"
. "$scriptPath\ShortcutManager.ps1"
. "$scriptPath\ServiceManager.ps1"
. "$scriptPath\AutoVueInstaller.ps1"
. "$scriptPath\BatchInstaller.ps1"
. "$scriptPath\RuntimeInstallerExe.ps1"
. "$scriptPath\RuntimeInstallerMsi.ps1"

$downloader = [FileDownloader]::new("\\pearljam\InstaladoresMeridian\2021\Meridian2021ClientSetup", "C:\temp\Meridian2021ClientSetup")
$downloader.DownloadFiles()

$javaInstaller = [JavaInstaller]::new("C:\temp\Meridian2021ClientSetup\jre-8u202-windows-i586.exe")
$javaInstaller.InstallJava()

$runtimeInstallerExe64 = [RuntimeInstallerExe]::new("C:\temp\Meridian2021ClientSetup\SSCERuntime_x64-PTB 4.0.exe")
$runtimeInstallerExe64.Install()

$runtimeInstallerExe86 = [RuntimeInstallerExe]::new("C:\temp\Meridian2021ClientSetup\SSCERuntime_x86-PTB 4.0.exe")
$runtimeInstallerExe86.Install()

$runtimeInstallerMsi64 = [RuntimeInstallerMsi]::new("C:\temp\Meridian2021ClientSetup\SSCERuntime_x64-ENU 3.5 SP2.msi")
$runtimeInstallerMsi64.Install()

$runtimeInstallerMsi86 = [RuntimeInstallerMsi]::new("C:\temp\Meridian2021ClientSetup\SSCERuntime_x86-ENU 3.5 SP2.msi")
$runtimeInstallerMsi86.Install()

$batchInstaller = [BatchInstaller]::new("C:\temp\Meridian2021ClientSetup\InstallMeridian.bat")
$batchInstaller.ExecuteSilently()

$shortcutManager = [ShortcutManager]::new("\\wasp\Instaladores\DTI Service\Programas\MeridianPowerShell\Resources\PowerUsers")
$shortcutManager.RemoveShortcuts()
$shortcutManager.CopyFilesAndCreateShortcuts()

$serviceManager = [ServiceManager]::new("AxInstSV", "Automatic")
$serviceManager.ConfigureService()

$autoVueInstaller = [AutoVueInstaller]::new("C:\temp\Meridian2021ClientSetup\AutoVueSetup.exe")
$autoVueInstaller.InstallAutoVue()