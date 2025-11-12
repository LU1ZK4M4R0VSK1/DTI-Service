@echo off
echo Compilando aplicacao...
C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe /out:Setup.exe /platform:anycpu /unsafe Setup.cs
echo Compilacao concluida!
pause