@echo off
REM 1 - Limpa o conteúdo da pasta C:\temp\exeMaker, incluindo subpastas
rd /s /q "C:\temp\exeMaker"
mkdir "C:\temp\exeMaker" REM Cria a pasta novamente

REM 2 - Copia todos os arquivos para a pasta C:\temp\exeMaker
xcopy "\\wasp\Instaladores\DTI Service\DTI Service\main\*" "C:\temp\exeMaker\" /E /Y /I

REM 3 - Executa o comando do pyinstaller
powershell -NoProfile -ExecutionPolicy Bypass -Command "Set-Location 'C:\temp\exeMaker'; pyinstaller --onefile --windowed --add-data '\\wasp\Instaladores\DTI Service\DTI Service\img\logo_itambe.png;.' main.py"

REM 4 - Limpa os arquivos dentro da pasta \\wasp\Instaladores\DTI Service\DTI Service\exe
del /q "\\wasp\Instaladores\DTI Service\DTI Service\exe\*.*"

REM 5 - Copia o arquivo gerado para a pasta exe
copy "C:\temp\exeMaker\dist\main.exe" "\\wasp\Instaladores\DTI Service\DTI Service\exe\"

REM Retorna ao diretório original
popd

exit