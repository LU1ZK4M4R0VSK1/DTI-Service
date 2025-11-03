@echo off
setlocal

:: =============================================
:: Instalador DTI Service (robusto para UNC share)
:: Copia os arquivos para %TEMP% e executa elevado
:: =============================================

:: Nome da pasta temporária (única)
set "WORKDIR=%TEMP%\DTISetup_%RANDOM%"

:: Cria a pasta temporária
if not exist "%WORKDIR%" md "%WORKDIR%"

echo Copiando arquivos para pasta temporaria...
:: Copia todos os arquivos e subpastas da pasta onde está este .bat
xcopy "%~dp0*" "%WORKDIR%\" /E /I /Y >nul
if errorlevel 1 (
    echo Erro ao copiar arquivos para %WORKDIR%.
    pause
    exit /b 1
)

:: Função: verifica se está em modo administrador
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ================================================
    echo    ELEVACAO DE PRIVILEGIOS REQUERIDA
    echo ================================================
    echo.
    echo Este instalador requer privilegios de administrador.
    echo.
    echo Será solicitado o consentimento do UAC ou as
    echo credenciais de administrador para continuar.
    echo.
    pause

    :: Reexecuta o mesmo .bat que foi copiado para %WORKDIR% como administrador
    powershell -NoProfile -Command ^
      "Start-Process -FilePath 'cmd.exe' -ArgumentList '/c \"%WORKDIR%\\%~nx0\"' -Verb RunAs" 
    :: Sai do processo atual (não elevado)
    exit /b
)

:: A partir daqui estamos elevados (ou já estávamos)
echo.
echo ================================================
echo    EXECUTANDO INSTALADOR DTI SERVICE (ELEVADO)
echo ================================================
echo.

:: Muda o diretório para a cópia local em %WORKDIR%
pushd "%WORKDIR%"

echo Executando script PowerShell...
echo.

:: Executa o script PowerShell que está dentro da subpasta "setup"
:: Ajuste aqui caso o setup.ps1 esteja em outro local relativo
powershell -NoProfile -ExecutionPolicy Bypass -File "%WORKDIR%\setup\setup.ps1" -ErrorAction Stop
set "PS_EXIT=%ERRORLEVEL%"

:: Volta ao diretório anterior
popd

:: Verifica se houve erro na execução do PowerShell
if %PS_EXIT% neq 0 (
    echo.
    echo ================================================
    echo                ERRO NA INSTALACAO
    echo ================================================
    echo.
    echo Ocorreu um erro durante a execucao do script PowerShell.
    echo Codigo do erro: %PS_EXIT%
    echo.
    pause
    :: tenta remover a pasta temporaria (ignora erros)
    rmdir /s /q "%WORKDIR%" >nul 2>&1
    exit /b %PS_EXIT%
)

echo.
echo ================================================
echo         INSTALACAO CONCLUIDA COM SUCESSO
echo ================================================
echo.
echo O atalho do DTI Service foi criado na area de trabalho.
echo.

:: Limpa a pasta temporaria (opcional, silencioso)
rmdir /s /q "%WORKDIR%" >nul 2>&1

pause
exit /b 0
