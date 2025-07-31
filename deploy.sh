#!/bin/bash

# Deployment script for Instagram Insights OCR Platform

echo "Instagram Insights OCR Platform - Deployment Script"
echo "==================================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for Instagram Insights OCR Platform"
    git branch -M main
    echo "Git repository initialized."
fi

echo ""
echo "To deploy this platform, you have several options:"
echo ""
echo "1. Vercel (Recommended):"
echo "   - Push this code to a GitHub/GitLab/Bitbucket repository"
echo "   - Sign up at https://vercel.com"
echo "   - Import your repository"
echo "   - Add OPENAI_API_KEY as an environment variable"
echo "   - Deploy!"
echo ""
echo "2. Docker Deployment:"
echo "   - Build: docker build -t instagram-insights-ocr ."
echo "   - Run: docker run -p 3000:3000 -e OPENAI_API_KEY=your_key_here instagram-insights-ocr"
echo ""
echo "3. Manual Deployment:"
echo "   - Build: npm run build"
echo "   - Start: OPENAI_API_KEY=your_key_here npm start"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "You can also run this command to see deployment options:"
echo "npm run deploy"
