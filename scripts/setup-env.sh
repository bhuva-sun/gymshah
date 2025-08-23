#!/bin/bash

# GymShah Environment Setup Script
# This script helps set up environment variables

set -e

echo "🔧 Setting up GymShah environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env exists
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}📝 Keeping existing .env file${NC}"
        exit 0
    fi
fi

echo -e "${BLUE}📝 Creating .env file...${NC}"

# Generate AUTH_SECRET
AUTH_SECRET=$(openssl rand -base64 32)

cat > .env << EOF
# Database Configuration
# Get this from Supabase, Neon, or your PostgreSQL provider
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"

# NextAuth Configuration
AUTH_SECRET="${AUTH_SECRET}"

# Google OAuth (optional)
# 1. Go to https://console.cloud.google.com
# 2. Create OAuth 2.0 credentials
# 3. Add authorized redirect URI: http://localhost:3000/api/auth/callback/google
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# GitHub OAuth (optional)
# 1. Go to https://github.com/settings/developers
# 2. Create new OAuth App
# 3. Add callback URL: http://localhost:3000/api/auth/callback/github
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# Pusher Configuration (optional)
# 1. Go to https://pusher.com
# 2. Create new app
# 3. Get credentials from app keys
PUSHER_APP_ID=""
PUSHER_SECRET=""
NEXT_PUBLIC_PUSHER_KEY=""
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"
EOF

echo -e "${GREEN}✅ .env file created successfully!${NC}"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: You need to edit .env with your actual values${NC}"
echo ""
echo -e "${BLUE}📋 Required steps:${NC}"
echo -e "   1. Set up PostgreSQL database (Supabase/Neon recommended)"
echo -e "   2. Update DATABASE_URL with your database connection string"
echo -e "   3. Optionally configure OAuth providers (Google/GitHub)"
echo -e "   4. Optionally configure Pusher for real-time notifications"
echo ""
echo -e "${GREEN}💡 Quick database setup:${NC}"
echo -e "   - Supabase: https://supabase.com (free tier available)"
echo -e "   - Neon: https://neon.tech (free tier available)"
echo -e "   - Railway: https://railway.app (free tier available)"
echo ""
echo -e "${BLUE}🔗 After setting up database, run: npm run setup-db${NC}"

