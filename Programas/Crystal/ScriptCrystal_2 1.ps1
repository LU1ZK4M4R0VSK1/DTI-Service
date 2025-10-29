# Caminhos dos arquivos e pastas
$sourcePath = "\\yes\aplicativos\DTI\PUBLICO\Oracle"
$filesToCopy = @("tnsnames.ora", "sqlnet.ora")
$adminPath = "C:\app\product\11.2.0\client_1\network\admin"

# Copie os arquivos para a pasta "admin" como primeira etapa
# Verifique se a pasta de destino existe, caso contrário, crie
if (-not (Test-Path -Path $adminPath)) {
    New-Item -Path $adminPath -ItemType Directory | Out-Null
    Write-Host "A pasta $adminPath foi criada com sucesso."
}

foreach ($file in $filesToCopy) {
    $sourceFile = Join-Path -Path $sourcePath -ChildPath $file
    $destinationFile = Join-Path -Path $adminPath -ChildPath $file

    if (Test-Path -Path $sourceFile) {
        Copy-Item -Path $sourceFile -Destination $destinationFile -Force
        Write-Host "Arquivo $file copiado para $adminPath com sucesso e substituído, se necessário."
    } else {
        Write-Warning "O arquivo $file não foi encontrado no caminho $sourcePath."
    }
}

# Caminho base e outras variáveis usadas no restante do script
$basePath = "C:\app\product"
$clientVersionPath = Get-ChildItem -Path $basePath -Directory | Where-Object {
    $_.Name -match "^\d+\.\d+\.\d+$" # Filtra versões como 11.2.0
} | Select-Object -ExpandProperty FullName

$networkPath = Join-Path -Path $clientVersionPath -ChildPath "client_1\network"

# Função para configurar permissões se necessário
function Set-Permissions {
    param (
        [string]$Path
    )

    Write-Host "Configurando permissões na pasta: $Path"

    # Adicionar o grupo "Todos" com controle total na pasta
    $acl = Get-Acl -Path $Path
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("Todos", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.AddAccessRule($accessRule)

    try {
        Set-Acl -Path $Path -AclObject $acl
        Write-Host "Permissões configuradas com sucesso."
    } catch {
        Write-Error "Falha ao configurar permissões na pasta $Path. Erro: $_"
    }
}

# Configurar permissões na pasta "network" se necessário
try {
    # Tenta acessar a pasta "network" para verificar permissões
    Get-ChildItem -Path $networkPath -ErrorAction Stop | Out-Null
} catch {
    Write-Warning "Permissão negada na pasta $networkPath. Configurando permissões..."
    Set-Permissions -Path $networkPath
}

# Caminho do arquivo a ser copiado
$installerSourcePath = "\\yes\Instaladores\Protheus\ProtheusCrystalIntegration\protheus_crystal_integration.msi"
$tempFolder = "$env:TEMP"
$installerDestinationPath = Join-Path -Path $tempFolder -ChildPath "protheus_crystal_integration.msi"

# Função para instalar o arquivo MSI
function Install-MSI {
    param (
        [string]$FilePath
    )

    Write-Host "Iniciando a instalação do arquivo MSI: $FilePath"

    try {
        Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$FilePath`" /quiet /norestart" -Wait -NoNewWindow
        Write-Host "Instalação concluída com sucesso."
    } catch {
        Write-Error "Erro durante a instalação do arquivo MSI. Detalhes: $_"
    }
}

# Verifica se o arquivo de origem existe
if (Test-Path -Path $installerSourcePath) {
    # Copia o arquivo para a pasta temporária
    Copy-Item -Path $installerSourcePath -Destination $installerDestinationPath -Force
    Write-Host "Arquivo copiado para a pasta temporária: $installerDestinationPath"

    # Executa a instalação
    Install-MSI -FilePath $installerDestinationPath
} else {
    Write-Error "O arquivo de origem não foi encontrado: $installerSourcePath"
}

# Criar a chave de registro no local especificado
$registryPath = "HKLM:\SOFTWARE\WOW6432Node\ORACLE"
$propertyName = "TNS_ADMIN"
$propertyValue = "\\yes\aplicativos\DTI\Publico\Oracle"

# Verifica se o caminho de registro existe
if (-not (Test-Path $registryPath)) {
    New-Item -Path $registryPath -Force | Out-Null
}

# Define o valor da cadeia de caracteres no registro
Set-ItemProperty -Path $registryPath -Name $propertyName -Value $propertyValue

Write-Host "Registro atualizado com sucesso. Caminho: $registryPath, Nome: $propertyName, Valor: $propertyValue"

# Caminho do odbcad32.exe
$odbcPath = "C:\Windows\SysWOW64\odbcad32.exe"

# Verifica se o arquivo existe
if (Test-Path $odbcPath) {
    Write-Host "Iniciando o ODBC Administrator como administrador..."
    Start-Process -FilePath $odbcPath -Verb RunAs
} else {
    Write-Host "O arquivo odbcad32.exe não foi encontrado em: $odbcPath"
}
