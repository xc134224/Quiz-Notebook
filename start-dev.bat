@echo off
setlocal

cd /d "%~dp0"

set "NODE_VERSION=22.21.1"
set "NODE_DIR=%CD%\.local-node"
set "NODE_ZIP=%CD%\.local-node.zip"
set "NODE_EXTRACT_DIR=%CD%\node-v%NODE_VERSION%-win-x64"
set "LOCAL_NPM=%NODE_DIR%\npm.cmd"

where npm >nul 2>nul
if not errorlevel 1 (
  set "NPM_CMD=npm"
  goto install_dependencies
)

if exist "%LOCAL_NPM%" (
  set "NPM_CMD=%LOCAL_NPM%"
  goto install_dependencies
)

echo npm not found. Downloading portable Node.js v%NODE_VERSION%...

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-win-x64.zip' -OutFile '%NODE_ZIP%' } catch { Write-Host $_; exit 1 }"
if errorlevel 1 (
  echo [ERROR] Failed to download Node.js. Check your network connection.
  pause
  exit /b 1
)

echo Extracting portable Node.js...
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Expand-Archive -Path '%NODE_ZIP%' -DestinationPath '%CD%' -Force } catch { Write-Host $_; exit 1 }"
if errorlevel 1 (
  echo [ERROR] Failed to extract Node.js.
  pause
  exit /b 1
)

if exist "%NODE_DIR%" (
  rmdir /s /q "%NODE_DIR%"
)

ren "%NODE_EXTRACT_DIR%" ".local-node"
if errorlevel 1 (
  echo [ERROR] Failed to prepare portable Node.js.
  pause
  exit /b 1
)

del "%NODE_ZIP%" >nul 2>nul

if not exist "%LOCAL_NPM%" (
  echo [ERROR] Portable npm was not found after setup.
  pause
  exit /b 1
)

set "NPM_CMD=%LOCAL_NPM%"

:install_dependencies
echo Using npm: %NPM_CMD%

if not exist "package-lock.json" (
  echo [ERROR] package-lock.json not found. Please keep it with the project files.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call "%NPM_CMD%" install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo Starting local quiz app...
start "" "http://localhost:5173"
call "%NPM_CMD%" run dev

pause
