#!/bin/bash

# This script helps you create a GitHub repository and push your server code for Render.com deployment

# Set up variables
echo "Setting up GitHub repository for your User Management System server..."
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter repository name [user-management-api]: " REPO_NAME
REPO_NAME=${REPO_NAME:-user-management-api}

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "Creating .gitignore file..."
    cat > .gitignore << EOL
# Dependency directories
node_modules/

# Environment variables
.env
.env.*

# Logs
logs
*.log
npm-debug.log*

# IDE / editors
.idea/
.vscode/
*.swp
*.swo
EOL
fi

# Stage all files
echo "Adding files to Git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Prepare server for Render.com deployment"

# Create GitHub repository
echo "Creating GitHub repository: $GITHUB_USERNAME/$REPO_NAME"
gh repo create "$REPO_NAME" --public --source=. --remote=origin

# Push to GitHub
echo "Pushing code to GitHub..."
git push -u origin main || git push -u origin master

echo ""
echo "✅ Repository created and code pushed!"
echo "Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "Next steps:"
echo "1. Go to https://dashboard.render.com/"
echo "2. Create a new Web Service and connect to this GitHub repository"
echo "3. Follow the RENDER_DEPLOYMENT_GUIDE.md instructions to complete the deployment"
echo ""
