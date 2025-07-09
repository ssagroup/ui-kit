#!/bin/bash

echo "🚀 Starting SSA UI Kit Demo E2E Tests"
echo "======================================="

# Navigate to the project directory
cd "$(dirname "$0")"

echo "📁 Current directory: $(pwd)"

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    exit 1
fi

echo "✅ pnpm is available"

# Install dependencies if needed
echo "📦 Installing dependencies..."
pnpm install

# Start the development server in the background
echo "🖥️  Starting development server..."
pnpm dev &
DEV_SERVER_PID=$!

# Wait for the server to start
echo "⏳ Waiting for server to start..."
sleep 10

# Run the Playwright tests
echo "🧪 Running Playwright tests..."
pnpm test:e2e

# Clean up: stop the development server
echo "🛑 Stopping development server..."
kill $DEV_SERVER_PID

echo "✅ Tests completed!"
