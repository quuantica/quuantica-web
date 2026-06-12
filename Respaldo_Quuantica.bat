@echo off
chcp 65001 >nul
title QUUANTICA WEB — Respaldo Automático
color 0E

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║          QUUANTICA — Respaldo del Proyecto       ║
echo  ╚══════════════════════════════════════════════════╝
echo.

:: Definir rutas
set "SRC=D:\QuuanticaWeb"
set "BACKUP_BASE=D:\Backups_QuuanticaWeb"

:: Crear nombre de carpeta con fecha y hora
for /f "tokens=1-3 delims=/" %%a in ("%date%") do (
    set "DIA=%%a"
    set "MES=%%b"
    set "ANIO=%%c"
)
for /f "tokens=1-2 delims=:." %%a in ("%time%") do (
    set "HH=%%a"
    set "MM=%%b"
)
:: Limpiar espacios del día/hora
set "HH=%HH: =0%"
set "BACKUP_NAME=Respaldo_%ANIO%-%MES%-%DIA%_%HH%%MM%"
set "BACKUP_DST=%BACKUP_BASE%\%BACKUP_NAME%"

echo  Fecha del respaldo: %ANIO%-%MES%-%DIA% %HH%:%MM%
echo  Destino: %BACKUP_DST%
echo.

:: Crear carpeta de backups si no existe
if not exist "%BACKUP_BASE%" (
    mkdir "%BACKUP_BASE%"
    echo  Carpeta de backups creada: %BACKUP_BASE%
)

:: Crear el respaldo excluyendo node_modules y .next
echo  Copiando archivos (excluyendo node_modules y .next)...
robocopy "%SRC%" "%BACKUP_DST%" /E /XD "node_modules" ".next" /XF "*.log" /NP /NFL /NDL

if errorlevel 8 (
    echo  [ERROR] Falló el proceso de respaldo.
    pause
    exit /b 1
)

:: Mostrar estadísticas del respaldo
set /a FILECOUNT=0
for /f %%f in ('dir "%BACKUP_DST%" /s /b /a-d 2^>nul ^| find /c /v ""') do set FILECOUNT=%%f
echo.
echo  ══════════════════════════════════════════════════
echo  RESPALDO COMPLETADO EXITOSAMENTE
echo  Archivos copiados: %FILECOUNT%
echo  Ubicación: %BACKUP_DST%
echo  ══════════════════════════════════════════════════
echo.

:: Limpiar respaldos con más de 10 días de antigüedad (opcional)
echo  Limpiando respaldos antiguos (más de 30 días)...
forfiles /p "%BACKUP_BASE%" /d -30 /c "cmd /c if @isdir==TRUE rmdir /s /q @path" 2>nul
echo  Limpieza completada.
echo.
pause
