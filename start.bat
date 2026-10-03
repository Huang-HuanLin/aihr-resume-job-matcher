@echo off
chcp 65001 >nul
echo ================================================
echo       AI Job Matcher - Quick Start
echo ================================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"

if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    npm install
)

echo [INFO] Starting development server...
echo [INFO] Server will be available at: http://localhost:5173/
echo [INFO] If port 5173 is busy, another port will be used.
echo.

start /min powershell -Command "npm run dev"

timeout /t 4 /nobreak >nul

for /f "tokens=*" %%A in ('powershell -Command "Get-NetTCPConnection -LocalPort 5173,5174,5175,5176 -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty LocalPort"') do (
    set "PORT=%%A"
)

if defined PORT (
    start "" "http://localhost:%PORT%/"
    echo [INFO] Server running at http://localhost:%PORT%/
) else (
    start "" "http://localhost:5173/"
    echo [INFO] Server running at http://localhost:5173/
)

echo.
echo [INFO] Done! Browser should open automatically.
echo [INFO] Press any key to close this window...
pause >nul