@echo off
setlocal

set "WORKDIR=%TEMP%\DTISetup_%RANDOM%"

if not exist "%WORKDIR%" md "%WORKDIR%"

echo Copiando arquivos para pasta temporaria...
xcopy "%~dp0*" "%WORKDIR%\" /E /I /Y >nul
if errorlevel 1 (
    echo Erro ao copiar arquivos.
    exit /b 1
)

net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -NoProfile -Command "Start-Process -FilePath 'cmd.exe' -ArgumentList '/c \"%WORKDIR%\\%~nx0\"' -Verb RunAs"
    exit /b
)

echo.
echo Executando instalador DTI Service...
echo.

pushd "%WORKDIR%"

powershell -NoProfile -ExecutionPolicy Bypass -File "%WORKDIR%\setup\setup.ps1" -ErrorAction Stop
set "PS_EXIT=%ERRORLEVEL%"

popd

if %PS_EXIT% neq 0 (
    echo.
    echo Erro na instalacao. Codigo: %PS_EXIT%
    rmdir /s /q "%WORKDIR%" >nul 2>&1
    exit /b %PS_EXIT%
)

echo.
echo Instalacao concluida com sucesso.
echo.

rmdir /s /q "%WORKDIR%" >nul 2>&1

exit /b 0