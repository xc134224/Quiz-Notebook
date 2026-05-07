@echo off
setlocal EnableExtensions

cd /d "%~dp0"

set "NODE_VERSION=22.21.1"
set "NODE_DIR=%CD%\.local-node"
set "NODE_ZIP=%CD%\.local-node.zip"
set "NODE_EXTRACT_DIR=%CD%\node-v%NODE_VERSION%-win-x64"
set "LOCAL_NODE=%NODE_DIR%\node.exe"
set "LOCAL_NPM=%NODE_DIR%\npm.cmd"
set "NPM_CMD="

call :select_npm
if errorlevel 1 goto fail

echo Using npm: %NPM_CMD%
call "%NPM_CMD%" --version >nul 2>nul
if errorlevel 1 (
  echo Selected npm is broken. Reinstalling portable Node.js...
  if exist "%NODE_DIR%" rmdir /s /q "%NODE_DIR%"
  call :setup_local_node
  if errorlevel 1 goto fail
  call :use_local_npm
)

if not exist "package-lock.json" (
  echo [ERROR] package-lock.json not found. Please keep it with the project files.
  goto fail
)

if not exist "node_modules\" (
  call :install_dependencies
  if errorlevel 1 goto fail
) else if not exist "node_modules\.bin\vite.cmd" (
  echo Dependencies are incomplete. Reinstalling dependencies...
  rmdir /s /q "node_modules"
  call :install_dependencies
  if errorlevel 1 goto fail
)

echo Starting Quiz Notebook...
start "" "http://localhost:5173"
call "%NPM_CMD%" run dev

pause
exit /b 0

:select_npm
if exist "%LOCAL_NPM%" (
  call :use_local_npm
  exit /b 0
)

set "SYSTEM_NPM="
for /f "delims=" %%I in ('where npm 2^>nul') do (
  if not defined SYSTEM_NPM set "SYSTEM_NPM=%%I"
)

if defined SYSTEM_NPM (
  call "%SYSTEM_NPM%" --version >nul 2>nul
  if not errorlevel 1 (
    set "NPM_CMD=%SYSTEM_NPM%"
    exit /b 0
  )
  echo System npm exists but is broken: %SYSTEM_NPM%
  echo Falling back to portable Node.js.
)

call :setup_local_node
if errorlevel 1 exit /b 1
call :use_local_npm
exit /b 0

:use_local_npm
set "PATH=%NODE_DIR%;%PATH%"
set "NPM_CMD=%LOCAL_NPM%"
exit /b 0

:setup_local_node
if exist "%LOCAL_NPM%" exit /b 0

if exist "%NODE_DIR%" (
  echo Existing portable Node.js is incomplete. Reinstalling...
  rmdir /s /q "%NODE_DIR%"
)

if exist "%NODE_EXTRACT_DIR%" rmdir /s /q "%NODE_EXTRACT_DIR%"
if exist "%NODE_ZIP%" del "%NODE_ZIP%" >nul 2>nul

echo Downloading portable Node.js v%NODE_VERSION%...
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-win-x64.zip' -OutFile '%NODE_ZIP%' } catch { Write-Host $_; exit 1 }"
if errorlevel 1 (
  echo [ERROR] Failed to download Node.js. Check your network connection.
  exit /b 1
)

echo Extracting portable Node.js...
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Expand-Archive -Path '%NODE_ZIP%' -DestinationPath '%CD%' -Force } catch { Write-Host $_; exit 1 }"
if errorlevel 1 (
  echo [ERROR] Failed to extract Node.js.
  exit /b 1
)

ren "%NODE_EXTRACT_DIR%" ".local-node"
if errorlevel 1 (
  echo [ERROR] Failed to prepare portable Node.js.
  exit /b 1
)

del "%NODE_ZIP%" >nul 2>nul

if not exist "%LOCAL_NODE%" (
  echo [ERROR] Portable node.exe was not found after setup.
  exit /b 1
)

if not exist "%LOCAL_NPM%" (
  echo [ERROR] Portable npm.cmd was not found after setup.
  exit /b 1
)

exit /b 0

:install_dependencies
echo Installing dependencies...
call "%NPM_CMD%" install
if errorlevel 1 (
  echo [ERROR] npm install failed.
  exit /b 1
)
exit /b 0

:fail
echo.
echo Setup failed. See the error message above.
pause
exit /b 1
