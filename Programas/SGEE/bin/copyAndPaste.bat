@echo off
set source="\\yes\Aplicativos\DTI\Publico\SGEE_VBN_Instalacao"
set destination="C:\temp\SGEE_VBN_Instalacao"

echo Copiando arquivos de %source% para %destination%...

xcopy %source% %destination% /E /I /Y

if %errorlevel% equ 0 (
    echo Arquivos copiados com sucesso!
) else (
    echo Ocorreu um erro ao copiar os arquivos.
)

pause