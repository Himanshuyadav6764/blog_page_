# Blog Application Startup Script
# This script starts both backend and frontend servers

Write-Host "🚀 Starting Blog Application..." -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running (optional check)
Write-Host "📦 Checking MongoDB..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService -and $mongoService.Status -eq 'Running') {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
}
else {
    Write-Host "⚠️  MongoDB service not found or not running" -ForegroundColor Yellow
    Write-Host "   Make sure MongoDB is installed and running, or use MongoDB Atlas" -ForegroundColor Yellow
}

Write-Host ""

# Start Backend Server
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\blog-backend'; Write-Host '=== BACKEND SERVER ===' -ForegroundColor Green; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\blog-frontend-main\blog-frontend'; Write-Host '=== FRONTEND SERVER ===' -ForegroundColor Blue; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting..." -ForegroundColor Green
Write-Host ""
Write-Host "📝 Servers will be available at:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Two terminal windows will open. Do not close them!" -ForegroundColor Magenta
Write-Host "   Press Ctrl+C in each terminal to stop the servers" -ForegroundColor Magenta
Write-Host ""
Write-Host "🌐 Open http://localhost:5173 in your browser to view the app" -ForegroundColor Green
Write-Host ""

# Optional: Open browser automatically after a delay
Start-Sleep -Seconds 5
Start-Process "http://localhost:5173"
