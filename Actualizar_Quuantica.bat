@echo off
chcp 65001 >nul
title QUUANTICA WEB — Actualización de Dependencias
color 0B

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║          QUUANTICA — Actualizar Proyecto         ║
echo  ╚══════════════════════════════════════════════════╝
echo.

cd /d "D:\QuuanticaWeb"

echo  [1/5] Versiones actuales:
echo  ─────────────────────────────────────────
node --version
npm --version
echo  ─────────────────────────────────────────
echo.

echo  [2/5] Limpiando caché de npm...
npm cache clean --force
echo.

echo  [3/5] Eliminando carpetas de compilación anteriores...
if exist ".next" (
    rmdir /s /q ".next"
    echo  Carpeta .next eliminada.
)
echo.

echo  [4/5] Reinstalando dependencias desde package-lock.json...
npm ci
if errorlevel 1 (
    echo  [ADVERTENCIA] npm ci falló. Intentando npm install...
    npm install
)
echo.

echo  [5/5] Verificando vulnerabilidades de seguridad...
npm audit
echo.

echo  ══════════════════════════════════════════════════
echo  Actualización completada.
echo  Para iniciar el servidor ejecuta: Quuantica_Web.bat
echo  ══════════════════════════════════════════════════
echo.
pause
