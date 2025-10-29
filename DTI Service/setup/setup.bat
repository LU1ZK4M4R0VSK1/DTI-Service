@echo off
setlocal

:: ---------------------------------------------------------------------------
:: SCRIPT DE CRIAÇÃO DE ATALHO v3
:: ---------------------------------------------------------------------------

:: 1. Verificação de privilégios de administrador.
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

:: 2. Definição de variáveis.
set "BASE_PATH=\\wasp\Instaladores"
set "TARGET_EXE=%BASE_PATH%\DTI Service\DTI Service\exe\main.exe"
set "SHORTCUT_NAME=DTI Service.lnk"
set "ICON_PATH=%BASE_PATH%\DTI Service\DTI Service\img\logo_itambe.ico"
set "WORKING_DIR=%BASE_PATH%\DTI Service\DTI Service\exe"
set "SHORTCUT_PATH=%PUBLIC%\Desktop\%SHORTCUT_NAME%"
set "TEMP_ICON=C:\temp\logo_itambe.ico"

:: 3. Verificar e criar pasta temp no C: se não existir
if not exist "C:\temp\" (
    mkdir "C:\temp" >nul 2>&1
    if %errorlevel% neq 0 (
        echo Erro ao criar pasta C:\temp
        exit /b 1
    )
    echo Pasta C:\temp criada com sucesso.
)

:: 4. Copiar o ícone para a pasta temp do C:
copy "%ICON_PATH%" "%TEMP_ICON%" >nul 2>&1
if %errorlevel% neq 0 (
    echo Erro ao copiar o icone para C:\temp
    exit /b 1
)
echo Icone copiado para C:\temp com sucesso.

:: 5. Criação do atalho com PowerShell
powershell -ExecutionPolicy Bypass -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = '%TARGET_EXE%'; $s.WorkingDirectory = '%WORKING_DIR%'; $s.IconLocation = '%TEMP_ICON%'; $s.Save()"

if %errorlevel% neq 0 (
    echo Erro ao criar o atalho
    exit /b 1
)
echo Atalho criado com sucesso.

:: 6. Configuração para executar como administrador via registro.
reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers" /v "%TARGET_EXE%" /t REG_SZ /d "RUNASADMIN" /f > nul

if %errorlevel% neq 0 (
    echo Erro ao configurar execucao como administrador
    exit /b 1
)
echo Configuracao de administrador aplicada com sucesso.

echo Processo concluido!
exit /b