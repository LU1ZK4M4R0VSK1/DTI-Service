$sourceZip = "\\yes\Instaladores\Protheus\Protheus12.zip"

$localZip = "C:\Protheus12.zip"

$extractPath = "C:\Protheus 12"

$exePath = "C:\Protheus 12\Protheus12\smartclient.exe"

$shortcutName = "Protheus 12.lnk"
 
# Função para remover pastas antigas

function Remove-OldFolders {

    param (

        [string[]]$folders

    )

    foreach ($folder in $folders) {

        if (Test-Path $folder) {

            try {

                Remove-Item -Path $folder -Recurse -Force -ErrorAction Stop

                Write-Host "[SUCESSO] Pasta removida: $folder" -ForegroundColor Green

            } catch {

                Write-Host "[ERRO] Falha ao remover $folder : $_" -ForegroundColor Red

                exit 1

            }

        }

    }

}
 
# Função para remover atalhos antigos

function Remove-OldShortcuts {

    param (

        [string]$name

    )

    $paths = @(

        [Environment]::GetFolderPath("Desktop"),

        [Environment]::GetFolderPath("CommonDesktopDirectory")

    )

    foreach ($path in $paths) {

        $shortcut = Join-Path -Path $path -ChildPath $name

        if (Test-Path $shortcut) {

            Remove-Item -Path $shortcut -Force -ErrorAction SilentlyContinue

            Write-Host "[INFO] Atalho removido: $shortcut" -ForegroundColor Yellow

        }

    }

}
 
# Verificar privilégios de administrador

if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {

    Write-Host "[ERRO] Execute este script como Administrador!" -ForegroundColor Red

    exit 1

}
 
# Etapa 1: Remover instalações anteriores

Write-Host "`n=== REMOVENDO INSTALAÇÕES ANTERIORES ===" -ForegroundColor Cyan

Remove-OldFolders -folders @("C:\Protheus", "C:\Protheus 12")

Remove-OldShortcuts -name "Protheus.lnk"

Remove-OldShortcuts -name $shortcutName
 
# Etapa 2: Copiar nova versão

Write-Host "`n=== COPIANDO NOVA VERSÃO ===" -ForegroundColor Cyan

try {

    if (-not (Test-Path $sourceZip)) {

        throw "Arquivo fonte não encontrado: $sourceZip"

    }
 
    Write-Host "Copiando arquivo ZIP..."

    Copy-Item -Path $sourceZip -Destination $localZip -Force -ErrorAction Stop

    # Etapa 3: Extrair arquivos

    Write-Host "`n=== EXTRAINDO ARQUIVOS ===" -ForegroundColor Cyan

    if (-not (Test-Path $extractPath)) {

        New-Item -ItemType Directory -Path $extractPath -Force | Out-Null

    }

    Expand-Archive -Path $localZip -DestinationPath $extractPath -Force

    Remove-Item -Path $localZip -Force

    # Etapa 4: Criar atalho

    Write-Host "`n=== CONFIGURANDO ATALHO ===" -ForegroundColor Cyan

    if (Test-Path $exePath) {

        $publicDesktop = [Environment]::GetFolderPath("CommonDesktopDirectory")

        $shortcutPath = Join-Path -Path $publicDesktop -ChildPath $shortcutName

        $shell = New-Object -ComObject WScript.Shell

        $shortcut = $shell.CreateShortcut($shortcutPath)

        $shortcut.TargetPath = $exePath

        $shortcut.WorkingDirectory = (Split-Path $exePath -Parent)

        $shortcut.Save()

        Write-Host "[SUCESSO] Atalho criado em: $shortcutPath" -ForegroundColor Green

    } else {

        throw "Arquivo executável não encontrado: $exePath"

    }

} catch {

    Write-Host "[ERRO CRÍTICO] $_" -ForegroundColor Red

    Write-Host "StackTrace: $($_.ScriptStackTrace)" -ForegroundColor DarkYellow

    exit 1

}
 
Write-Host "`nProcesso concluído com sucesso!" -ForegroundColor Green
 