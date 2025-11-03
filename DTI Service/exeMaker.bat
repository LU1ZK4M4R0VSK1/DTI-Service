@echo off
SET "SCRIPT_DIR=%~dp0"
REM Usando o diretório temporário do sistema para evitar problemas de permissão
SET "TEMP_BUILD_DIR=%TEMP%\exeMaker"
SET "SOURCE_DIR=%SCRIPT_DIR%main"
SET "TARGET_EXE_DIR=%SCRIPT_DIR%exe"
SET "IMAGE_PATH=%SCRIPT_DIR%img\logo_itambe.png"
SET "MAIN_PY_TEMP_PATH=%TEMP_BUILD_DIR%\main.py"

SET "DATA_PATH=%SCRIPT_DIR%data"

REM 1 - Limpa e cria o diretório de build temporário
IF EXIST "%TEMP_BUILD_DIR%" (
    rd /s /q "%TEMP_BUILD_DIR%"
)
mkdir "%TEMP_BUILD_DIR%"

REM 2 - Copia os arquivos de origem para o diretório temporário
xcopy "%SOURCE_DIR%\*" "%TEMP_BUILD_DIR%\" /E /Y /I

REM 3 - Limpa a pasta de destino antes de criar o novo executável
IF EXIST "%TARGET_EXE_DIR%\main.exe" (
    del /q "%TARGET_EXE_DIR%\main.exe"
)

REM 4 - Executa o PyInstaller
REM O --distpath já coloca o executável no lugar certo.
REM O --workpath e --specpath organizam os arquivos de build.
pyinstaller --onefile --windowed --add-data "%IMAGE_PATH%;." --add-data "%DATA_PATH%;data" --distpath "%TARGET_EXE_DIR%" --workpath "%TEMP_BUILD_DIR%\build" --specpath "%TEMP_BUILD_DIR%" "%MAIN_PY_TEMP_PATH%"

REM 5 - Limpa o diretório temporário
rd /s /q "%TEMP_BUILD_DIR%"

echo.
echo Executavel criado com sucesso em "%TARGET_EXE_DIR%"
pause
exit
