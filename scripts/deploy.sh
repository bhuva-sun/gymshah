#!/bin/bash

# GymShah Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

echo "🚀 Starting GymShah deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Git not initialized. Running git init...${NC}"
    git init
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  No remote origin found. Adding GitHub remote...${NC}"
    git remote add origin https://github.com/bhuva-sun/gymshah.git
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
    cp .env.example .env 2>/dev/null || {
        echo -e "${YELLOW}⚠️  .env.example not found. Creating basic .env...${NC}"
        cat > .env << EOF
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"

# NextAuth
AUTH_SECRET="$(openssl rand -base64 32)"

# OAuth Providers (optional)
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# Pusher (optional)
PUSHER_APP_ID=""
PUSHER_SECRET=""
NEXT_PUBLIC_PUSHER_KEY=""
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"
EOF
    }
    echo -e "${YELLOW}⚠️  Please edit .env with your actual values before continuing${NC}"
    echo -e "${BLUE}📝 Edit .env file and run this script again${NC}"
    exit 1
fi

# Stage all changes
echo -e "${BLUE}📦 Staging changes...${NC}"
git add -A

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "feat: update GymShah e-commerce app $(date +%Y-%m-%d)"
fi

# Push to GitHub
echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null || {
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    echo -e "${YELLOW}⚠️  Make sure you have:${NC}"
    echo -e "   1. Created the repository at https://github.com/bhuva-sun/gymshah"
    echo -e "   2. Have proper GitHub credentials configured"
    exit 1
}

echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
echo -e "${BLUE}🌐 Your repository: https://github.com/bhuva-sun/gymshah${NC}"
echo ""
echo -e "${GREEN}🎉 Next steps:${NC}"
echo -e "   1. Go to https://vercel.com"
echo -e "   2. Import your gymshah repository"
echo -e "   3. Add environment variables from .env"
echo -e "   4. Deploy!"
echo ""
echo -e "${BLUE}💡 Run 'npm run vercel-help' for Vercel deployment assistance${NC}"
