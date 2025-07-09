@echo off
echo Starting SSA UI Kit Demo E2E Tests
echo ===================================

cd /d "%~dp0"

echo Current directory: %cd%

REM Check if pnpm is available
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo pnpm is not installed. Please install pnpm first.
    exit /b 1
)

echo pnpm is available

REM Install dependencies if needed
echo Installing dependencies...
pnpm install

REM Start the development server in the background
echo Starting development server...
start /b pnpm dev

REM Wait for the server to start
echo Waiting for server to start...
timeout /t 15 /nobreak

REM Run the Playwright tests
echo Running Playwright tests...
pnpm test:e2e

echo Tests completed!
