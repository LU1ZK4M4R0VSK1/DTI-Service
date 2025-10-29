Set-ExecutionPolicy RemoteSigned

# Otimizacao de PC - PowerShell 5.1

# 1. Verifica integridade do sistema
Write-Output "Executando DISM ScanHealth..."
DISM /Online /Cleanup-Image /ScanHealth

Write-Output "Executando SFC /scannow..."
sfc /scannow

# 2. Limpeza de arquivos temporarios
Write-Output "Limpando arquivos temporarios..."
$TempFolders = @("C:\\Windows\\Temp", "$env:TEMP", "$env:TMP")
foreach ($folder in $TempFolders) {
    if (Test-Path $folder) {
        Get-ChildItem -Path $folder -Recurse -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
        Write-Output "Arquivos temporarios limpos em: $folder"
    }
}

# 3. Ativando todos os nucleos do processador
Write-Output "Ativando todos os nucleos do processador..."
$bcdedit = bcdedit /set {current} numproc $(Get-WmiObject Win32_Processor | Measure-Object -Property NumberOfCores -Sum).Sum
Write-Output "Todos os nucleos foram ativados."

# 4. Atualizacao de drivers
Write-Output "Atualizando drivers automaticamente..."
$UpdateSession = New-Object -ComObject Microsoft.Update.Session
$UpdateSearcher = $UpdateSession.CreateUpdateSearcher()
$SearchResult = $UpdateSearcher.Search("IsInstalled=0 and Type='Driver'")
foreach ($Update in $SearchResult.Updates) {
    Write-Output "Baixando e instalando: $($Update.Title)"
    $Downloader = $UpdateSession.CreateUpdateDownloader()
    $Downloader.Updates = $SearchResult.Updates
    $Downloader.Download()
    $Installer = New-Object -ComObject Microsoft.Update.Installer
    $Installer.Updates = $SearchResult.Updates
    $Installer.Install()
}
Write-Output "Drivers atualizados com sucesso."

# 5. Limpeza da parte "suja" do HD (Zero-fill em espacos livres)
Write-Output "Limpando espacos nao utilizados no HD..."
$DriveLetter = "C:"
Cipher /w:$DriveLetter
Write-Output "Espacos livres foram limpos com sucesso."


# 6. Desfragmentacao do disco rigido (HDD)
Write-Output "Desfragmentando o disco rigido..."
Optimize-Volume -DriveLetter C -Defrag

# 7. Ajustes de energia para alto desempenho
Write-Output "Alterando para plano de energia de alto desempenho..."
powercfg -setactive SCHEME_MIN

# 8. Limpeza de cache do Windows Update
Write-Output "Limpando cache do Windows Update..."
Stop-Service wuauserv
Remove-Item -Path "C:\\Windows\\SoftwareDistribution\\Download\\*" -Force -Recurse
Start-Service wuauserv

Write-Output "Otimizacao completa!"
