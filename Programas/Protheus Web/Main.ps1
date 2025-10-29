# Script para instalação e configuração do Protheus Web
# Autor: Assistente
# Data: $(Get-Date)

Write-Host "Iniciando processo de instalação do Protheus Web..." -ForegroundColor Green

# Função para executar processo como usuário atual
function Invoke-AsCurrentUser {
    param(
        [string]$FilePath,
        [string]$Arguments = "",
        [string]$WorkingDirectory = ""
    )
    
    try {
        # Usando o schtasks para executar como usuário atual
        $taskName = "RunAsUser_$(Get-Random)"
        $xmlTemplate = @"
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <Principals>
    <Principal id="Author">
      <UserId>$([System.Security.Principal.WindowsIdentity]::GetCurrent().Name)</UserId>
      <LogonType>InteractiveToken</LogonType>
      <RunLevel>LeastPrivilege</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <AllowHardTerminate>false</AllowHardTerminate>
    <StartWhenAvailable>false</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
    <IdleSettings>
      <StopOnIdleEnd>false</StopOnIdleEnd>
      <RestartOnIdle>false</RestartOnIdle>
    </IdleSettings>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <Hidden>false</Hidden>
    <RunOnlyIfIdle>false</RunOnlyIfIdle>
    <WakeToRun>false</WakeToRun>
    <ExecutionTimeLimit>PT1H</ExecutionTimeLimit>
    <Priority>7</Priority>
  </Settings>
  <Actions Context="Author">
    <Exec>
      <Command>$([Security.SecurityElement]::Escape($FilePath))</Command>
      <Arguments>$([Security.SecurityElement]::Escape($Arguments))</Arguments>
      <WorkingDirectory>$([Security.SecurityElement]::Escape($WorkingDirectory))</WorkingDirectory>
    </Exec>
  </Actions>
</Task>
"@
        
        # Criar arquivo XML temporário
        $xmlPath = [System.IO.Path]::GetTempFileName() + ".xml"
        $xmlTemplate | Out-File -FilePath $xmlPath -Encoding Unicode
        
        # Registrar e executar a tarefa
        schtasks /Create /TN $taskName /XML $xmlPath /F 2>&1 | Out-Null
        schtasks /Run /TN $taskName 2>&1 | Out-Null
        
        # Aguardar execução
        Start-Sleep -Seconds 5
        
        # Limpar
        schtasks /Delete /TN $taskName /F 2>&1 | Out-Null
        Remove-Item $xmlPath -Force -ErrorAction SilentlyContinue
        
        return $true
    } catch {
        Write-Host "Erro ao executar como usuário: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Função para instalar o Web Agent como usuário atual
function Install-WebAgent {
    $installerPath = "\\wasp\instaladores\Web Agent\web-agent-1.0.22-windows-x64-release.setup.exe"
    
    Write-Host "Verificando acesso ao instalador..." -ForegroundColor Yellow
    if (Test-Path $installerPath) {
        Write-Host "Instalando Web Agent como usuário atual..." -ForegroundColor Yellow
        
        # Copiar instalador para temp local para evitar problemas de permissão de rede
        $localInstallerPath = Join-Path $env:TEMP "web-agent-setup.exe"
        try {
            Copy-Item $installerPath $localInstallerPath -Force
        } catch {
            Write-Host "Não foi possível copiar o instalador localmente. Tentando executar diretamente da rede." -ForegroundColor Yellow
            $localInstallerPath = $installerPath
        }
        
        # Executar como usuário atual
        $success = Invoke-AsCurrentUser -FilePath $localInstallerPath -Arguments "/S" -WorkingDirectory (Split-Path $localInstallerPath -Parent)
        
        if ($success) {
            Write-Host "Web Agent instalado com sucesso como usuário atual!" -ForegroundColor Green
            
            # Limpar instalador local se foi copiado
            if ($localInstallerPath -ne $installerPath -and (Test-Path $localInstallerPath)) {
                Remove-Item $localInstallerPath -Force -ErrorAction SilentlyContinue
            }
            
            return $true
        } else {
            Write-Host "Falha na instalação do Web Agent como usuário atual." -ForegroundColor Red
            return $false
        }
    } else {
        Write-Host "Instalador não encontrado em: $installerPath" -ForegroundColor Red
        Write-Host "Verifique a conectividade com a rede e o caminho do arquivo." -ForegroundColor Yellow
        return $false
    }
}

# Função para copiar ícone para um diretório público
function Copy-IconToPublicLocation {
    $remoteIconPath = "\\wasp\instaladores\DTI Service\Icons\Ico\ProtheusWeb.ico"
    # Usar C:\ProgramData, que é uma pasta pública
    $publicIconDir = Join-Path ([Environment]::GetFolderPath("CommonApplicationData")) "ProtheusWeb"
    $localIconPath = Join-Path $publicIconDir "ProtheusWeb.ico"
    
    try {
        # Criar o diretório se ele não existir
        if (-not (Test-Path $publicIconDir)) {
            New-Item -Path $publicIconDir -ItemType Directory -Force | Out-Null
        }

        if (Test-Path $remoteIconPath) {
            Copy-Item $remoteIconPath $localIconPath -Force
            Write-Host "Ícone copiado para diretório público: $localIconPath" -ForegroundColor Green
            
            # Adicionado: Garantir permissões de leitura para o ícone
            try {
                Write-Host "Garantindo permissões de leitura para todos os usuários no ícone..." -ForegroundColor Yellow
                $acl = Get-Acl $localIconPath
                # Usar o grupo "Usuários" (BUILTIN\Users) que é independente de idioma
                $rule = New-Object System.Security.AccessControl.FileSystemAccessRule("BUILTIN\Users", "Read, ReadAndExecute", "Allow")
                $acl.SetAccessRule($rule)
                Set-Acl -Path $localIconPath -AclObject $acl
                Write-Host "Permissões do ícone atualizadas com sucesso." -ForegroundColor Green
            } catch {
                Write-Host "Aviso: Não foi possível definir permissões explícitas no arquivo de ícone. $($_.Exception.Message)" -ForegroundColor Yellow
            }

            return $localIconPath
        } else {
            Write-Host "Ícone remoto não encontrado: $remoteIconPath" -ForegroundColor Yellow
            return $null
        }
    } catch {
        Write-Host "Erro ao copiar ícone para local público: $($_.Exception.Message)" -ForegroundColor Yellow
        return $null
    }
}

# Função para criar atalho na área de trabalho pública com ícone personalizado
function Create-Shortcut {
    $publicDesktopPath = [Environment]::GetFolderPath("CommonDesktopDirectory")
    # Alterar a extensão para .url para um atalho de internet mais robusto
    $shortcutPath = Join-Path $publicDesktopPath "Protheus Web.url"
    $url = "https://protheus.cimentoitambe.net:1200/webapp/"
    
    Write-Host "Criando atalho na área de trabalho pública..." -ForegroundColor Yellow
    
    # Primeiro, copiar o ícone para um diretório público
    $iconPath = Copy-IconToPublicLocation
    
    # Construir o conteúdo para o arquivo .url
    $shortcutContent = "[InternetShortcut]`r`n"
    $shortcutContent += "URL=$url`r`n"
    
    if ($iconPath) {
        $shortcutContent += "IconFile=$iconPath`r`n"
        $shortcutContent += "IconIndex=0`r`n"
        Write-Host "Usando ícone personalizado em: $iconPath" -ForegroundColor Green
    } else {
        Write-Host "Ícone personalizado não encontrado. O atalho usará o ícone padrão do navegador." -ForegroundColor Yellow
    }
    
    try {
        # Escrever o conteúdo no arquivo .url
        Set-Content -Path $shortcutPath -Value $shortcutContent -Encoding "Ascii" -Force
        
        if (Test-Path $shortcutPath) {
            Write-Host "Atalho 'Protheus Web.url' criado com sucesso!" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Falha ao criar o atalho .url." -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Erro ao criar atalho .url: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Função para abrir o navegador no Protheus Web
function Open-ProtheusWeb {
    $url = "https://protheus.cimentoitambe.net:1200/webapp/"
    
    Write-Host "Abrindo Protheus Web no navegador padrão..." -ForegroundColor Yellow
    Start-Process $url
}

# Função principal
function Main {
    Write-Host "=== INSTALAÇÃO PROTHEUS WEB ===" -ForegroundColor Cyan
    
    # Etapa 1: Instalar o Web Agent como usuário atual
    Write-Host "\n1. Instalando Web Agent como usuário atual..." -ForegroundColor White
    $installationSuccess = Install-WebAgent
    
    if ($installationSuccess) {
        # Etapa 2: Abrir o navegador com a URL do Protheus
        Write-Host "\n2. Acessando o sistema Protheus..." -ForegroundColor White
        Open-ProtheusWeb
        
        # Dar tempo para o navegador abrir
        Start-Sleep -Seconds 3
        
        # Etapa 3: Criar atalho com ícone personalizado
        Write-Host "\n3. Criando atalho na área de trabalho pública..." -ForegroundColor White
        $shortcutSuccess = Create-Shortcut
        
        if ($shortcutSuccess) {
            Write-Host "\nProcesso concluído com sucesso!" -ForegroundColor Green
            Write-Host "Atalho 'Protheus Web' criado na área de trabalho pública." -ForegroundColor Green
        } else {
            Write-Host "\nProcesso concluído com avisos." -ForegroundColor Yellow
            Write-Host "O Web Agent foi instalado, mas o atalho não pôde ser criado." -ForegroundColor Yellow
        }
    } else {
        Write-Host "\nFalha na instalação do Web Agent." -ForegroundColor Red
        Write-Host "O processo não pôde ser concluído." -ForegroundColor Red
    }
    
    # Mensagem final sem pressionar tecla
    Write-Host "\n=== PROCESSO FINALIZADO ===" -ForegroundColor Cyan
}

# Executar o script principal
try {
    # Verificar se está sendo executado com privilégios de administrador
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $adminRole = [Security.Principal.WindowsBuiltInRole]::Administrator
    $isAdmin = ([Security.Principal.WindowsPrincipal]$currentUser).IsInRole($adminRole)
    
    if (-not $isAdmin) {
        Write-Host "Este script requer privilégios de administrador para algumas operações." -ForegroundColor Yellow
        Write-Host "Algumas funcionalidades podem não funcionar corretamente." -ForegroundColor Yellow
    }
    
    Main
} catch {
    Write-Host "Erro inesperado: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Entre em contato com o suporte técnico." -ForegroundColor Yellow
}