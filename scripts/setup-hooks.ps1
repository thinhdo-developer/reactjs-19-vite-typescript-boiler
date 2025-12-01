# PowerShell script for setting up pre-commit hooks on Windows

Write-Host "🔧 Setting up pre-commit hooks..." -ForegroundColor Cyan

# Check if husky is installed
$huskyInstalled = npm list husky 2>$null
if (-not $huskyInstalled) {
    Write-Host "📦 Installing Husky..." -ForegroundColor Yellow
    npm install --save-dev husky
}

# Check if lint-staged is installed
$lintStagedInstalled = npm list lint-staged 2>$null
if (-not $lintStagedInstalled) {
    Write-Host "📦 Installing lint-staged..." -ForegroundColor Yellow
    npm install --save-dev lint-staged
}

# Initialize Husky
Write-Host "🚀 Initializing Husky..." -ForegroundColor Yellow
npx husky init

# Create .lintstagedrc.json if it doesn't exist
if (-not (Test-Path .lintstagedrc.json)) {
    Write-Host "📝 Creating .lintstagedrc.json..." -ForegroundColor Yellow
    @"
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml,css}": [
    "prettier --write"
  ]
}
"@ | Out-File -FilePath .lintstagedrc.json -Encoding utf8
}

# Add pre-commit hook
Write-Host "📌 Adding pre-commit hook..." -ForegroundColor Yellow
if (-not (Test-Path .husky)) {
    New-Item -ItemType Directory -Path .husky | Out-Null
}
"npx lint-staged" | Out-File -FilePath .husky/pre-commit -Encoding utf8 -NoNewline

Write-Host "✅ Pre-commit hooks setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "The following will run on each commit:" -ForegroundColor Cyan
Write-Host "  - ESLint (with auto-fix)" -ForegroundColor White
Write-Host "  - Prettier (formatting)" -ForegroundColor White
Write-Host ""
Write-Host "To skip hooks, use: git commit --no-verify" -ForegroundColor Yellow

