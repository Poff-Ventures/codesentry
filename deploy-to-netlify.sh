#!/bin/bash

# Deploy CodeSentry to Netlify
echo "🚀 Deploying CodeSentry to Netlify..."

# Create a clean build directory
mkdir -p ../netlify-deploy
cp -r . ../netlify-deploy/
cd ../netlify-deploy

# Remove git and other non-essential files
rm -rf .git
rm -rf node_modules
rm -rf .DS_Store
rm -f deploy-to-netlify.sh
rm -f codesentry-deploy.tar.gz

# Deploy to Netlify
echo "📤 Uploading to Netlify..."
cd /Users/xuetang/Lab/codesentry

# Manual deployment method
echo "📝 Manual deployment steps:"
echo "1. Go to https://app.netlify.com/projects/codesentry-ai"
echo "2. Click 'Deploy' > 'Deploy from Git'"
echo "3. Connect to GitHub repository: Poff-Ventures/codesentry"
echo "4. Set build command: (leave empty)"
echo "5. Set publish directory: ."
echo "6. Deploy!"

echo ""
echo "🔗 Site will be available at: https://codesentry-ai.netlify.app"
echo "📊 Forms will be available at: https://app.netlify.com/projects/codesentry-ai/forms"