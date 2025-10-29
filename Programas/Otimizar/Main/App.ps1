$scriptPath = "\\wasp\Instaladores\DTI Service\Programas\Otimizar\Modules\PCOptimization.ps1"

. $scriptPath

$optimizer = [PCOptimization]::new()

$optimizer.SetPowerPlan()
$optimizer.DisableGraphicsEffects()
$optimizer.ClearTempFiles()
$optimizer.SetMaxProcessors()