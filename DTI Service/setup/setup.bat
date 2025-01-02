@echo off

REM 1 - Verifica se o script está sendo executado como administrador
NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Este script deve ser executado como administrador.
    echo.
    echo Tentando reiniciar como administrador...
    powershell -Command "Start-Process -File '%0' -Verb RunAs"
    exit /b
)

REM 2 - Copia o atalho para a área de trabalho pública
copy "\\wasp\Instaladores\DTI Service\DTI Service\shortcuts\DTI Service.lnk" "C:\Users\Public\Desktop\" /Y

REM 3 - Copia os arquivos de imagem para a pasta C:\Windows
copy "\\wasp\Instaladores\DTI Service\DTI Service\img\logo_itambe.ico" "C:\Windows\" /Y
copy "\\wasp\Instaladores\DTI Service\DTI Service\img\logo_itambe.png" "C:\Windows\" /Y

REM 4 - Cria uma chave de registro para que o atalho seja executado como administrador
reg add "HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers" /v "\\wasp\Instaladores\DTI Service\DTI Service\exe\main.exe" /t REG_SZ /d "RUNASADMIN" /f

exit /b