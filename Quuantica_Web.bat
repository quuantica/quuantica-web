@echo off
chcp 65001 >nul
title QUUANTICA WEB — Servidor de Desarrollo
color 0A

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║          QUUANTICA SERVICIOS TECNOLÓGICOS        ║
echo  ║              Servidor de Desarrollo              ║
echo  ╚══════════════════════════════════════════════════╝
echo.

cd /d "D:\QuuanticaWeb"

:: Verificar Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Node.js no está instalado o no está en el PATH.
    echo  Descárgalo desde: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node --version') do set NODE_VER=%%v
for /f "tokens=*" %%v in ('npm --version') do set NPM_VER=%%v
echo  Node.js: %NODE_VER%    npm: %NPM_VER%
echo.

:: Verificar si node_modules existe y tiene paquetes
if not exist "node_modules\next" (
    echo  [INFO] Dependencias no encontradas. Instalando...
    npm install
    if errorlevel 1 (
        echo  [ERROR] Falló la instalación de dependencias.
        pause
        exit /b 1
    )
    echo.
)

:: Verificar que .env.local existe
if not exist ".env.local" (
    echo  [ADVERTENCIA] No se encontró .env.local
    echo  El chat de IA no funcionará sin ANTHROPIC_API_KEY.
    echo  Copia .env.local.example a .env.local y agrega tu clave.
    echo.
    pause
)

echo  Iniciando servidor Next.js en modo desarrollo...
echo.
echo  ┌─────────────────────────────────────────────────┐
echo  │  URL LOCAL:   http://localhost:3000              │
echo  │  URL RED:     http://%COMPUTERNAME%:3000         │
echo  │                                                  │
echo  │  Presiona Ctrl+C para detener el servidor        │
echo  └─────────────────────────────────────────────────┘
echo.

npm run dev
