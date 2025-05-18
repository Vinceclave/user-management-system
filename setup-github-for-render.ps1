# This script helps you create a GitHub repository and push your server code for Render.com deployment

# Set up variables
Write-Host "Setting up GitHub repository for your User Management System server..." -ForegroundColor Green
$GITHUB_USERNAME = Read-Host -Prompt "Enter your GitHub username"
$REPO_NAME = Read-Host -Prompt "Enter repository name [user-management-api]"
if ([string]::IsNullOrWhiteSpace($REPO_NAME)) {
    $REPO_NAME = "user-management-api"
}

# Navigate to the server directory
Set-Location -Path .\server

# Initialize Git repository if not already initialized
if (-Not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Create .gitignore if it doesn't exist
if (-Not (Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore file..." -ForegroundColor Yellow
    @"
# Dependency directories
node_modules/

# Environment variables
.env
.env.*
config.json

# Logs
logs
*.log
npm-debug.log*

# IDE / editors
.idea/
.vscode/
*.swp
*.swo
"@ | Out-File -FilePath ".gitignore"
}

# Stage all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Prepare server for Render.com deployment"

# Check if GitHub CLI is installed
$ghInstalled = $null
try {
    $ghInstalled = Get-Command gh -ErrorAction SilentlyContinue
} catch {
    $ghInstalled = $null
}

if ($ghInstalled) {
    # Create GitHub repository using GitHub CLI
    Write-Host "Creating GitHub repository: $GITHUB_USERNAME/$REPO_NAME" -ForegroundColor Yellow
    gh repo create $REPO_NAME --public --source=. --remote=origin
    
    # Push to GitHub
    Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    if ($LASTEXITCODE -ne 0) {
        git push -u origin master
    }
} else {
    Write-Host "GitHub CLI not installed. Please install it from https://cli.github.com/" -ForegroundColor Red
    Write-Host "Then create a repository manually and push your code with:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ Repository created and code pushed!" -ForegroundColor Green
Write-Host "Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Go to https://dashboard.render.com/" -ForegroundColor White
Write-Host "2. Create a new Web Service and connect to this GitHub repository" -ForegroundColor White
Write-Host "3. Follow the RENDER_DEPLOYMENT_GUIDE.md instructions to complete the deployment" -ForegroundColor White
Write-Host ""

# Return to the original directory
Set-Location ..
