@echo off
chcp 65001 >nul
title QUUANTICA WEB — Modo Producción
color 0A

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║       QUUANTICA — Servidor de Producción         ║
echo  ╚══════════════════════════════════════════════════╝
echo.

cd /d "D:\3. QuuanticaWeb"

echo  [1/2] Compilando proyecto para producción...
echo  (Este proceso tarda 1-2 minutos la primera vez)
echo.
npm run build
if errorlevel 1 (
    echo.
    echo  [ERROR] La compilación falló. Revisa los errores arriba.
    pause
    exit /b 1
)

echo.
echo  [2/2] Iniciando servidor de producción...
echo.
echo  ┌─────────────────────────────────────────────────┐
echo  │  URL LOCAL:   http://localhost:3000              │
echo  │  Modo:        PRODUCCIÓN (optimizado)            │
echo  │                                                  │
echo  │  Presiona Ctrl+C para detener el servidor        │
echo  └─────────────────────────────────────────────────┘
echo.
npm start
