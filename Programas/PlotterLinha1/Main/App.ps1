$scriptPath = "\\wasp\Instaladores\DTI Service\Programas\PlotterLinha1\Modules"
. "$scriptPath\PrinterManager.ps1"

$configPath = "\\wasp\Instaladores\DTI Service\Programas\PlotterLinha1\Config\printerConfig.json"
$config = Get-Content -Raw -Path $configPath | ConvertFrom-Json

$printerIP = $config.printerIP
$printerName = $config.printerName
$driverPath = $config.driverPath
$driverName = $config.driverName

$printerManager = [PrinterManager]::new($printerIP, $printerName, $driverPath, $driverName)
$printerManager.SetupPrinter()