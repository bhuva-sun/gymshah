#!/bin/bash

# GymShah Vercel Deployment Helper Script
# This script provides guidance for Vercel deployment

echo "🚀 Vercel Deployment Helper for GymShah"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}📋 Prerequisites Checklist:${NC}"
echo "   ✅ GitHub repository created and code pushed"
echo "   ✅ PostgreSQL database set up (Supabase/Neon/Railway)"
echo "   ✅ .env file configured with production values"
echo ""

echo -e "${BLUE}🔧 Step 1: Prepare for Vercel${NC}"
echo "   1. Ensure your code is pushed to GitHub"
echo "   2. Have your .env values ready"
echo ""

echo -e "${BLUE}🌐 Step 2: Deploy to Vercel${NC}"
echo "   1. Go to https://vercel.com"
echo "   2. Sign in with GitHub"
echo "   3. Click 'New Project'"
echo "   4. Import your 'gymshah' repository"
echo "   5. Keep default settings and click 'Deploy'"
echo ""

echo -e "${BLUE}⚙️  Step 3: Configure Environment Variables${NC}"
echo "   In Vercel Project Settings → Environment Variables, add:"
echo ""

# Read .env file and display variables
if [ -f ".env" ]; then
    echo -e "${YELLOW}📝 Copy these from your .env file:${NC}"
    grep -E '^(DATABASE_URL|AUTH_|PUSHER_)' .env | while read -r line; do
        if [[ $line == *"="* ]]; then
            var_name=$(echo "$line" | cut -d'=' -f1)
            echo "   $var_name"
        fi
    done
else
    echo -e "${RED}❌ .env file not found${NC}"
    echo "   Run 'npm run setup-env' first"
fi

echo ""
echo -e "${BLUE}🔄 Step 4: Run Database Migrations${NC}"
echo "   After deployment, in Vercel Project Settings:"
echo "   1. Go to 'Build & Development Settings'"
echo "   2. Add Postbuild Command:"
echo "      npx prisma migrate deploy && npx prisma generate"
echo "   3. Redeploy your project"
echo ""

echo -e "${BLUE}🔗 Step 5: Configure OAuth Callbacks${NC}"
echo "   Update your OAuth provider settings:"
echo "   - Google: https://console.cloud.google.com"
echo "   - GitHub: https://github.com/settings/developers"
echo "   - Add callback URL: https://your-domain.vercel.app/api/auth/callback/[provider]"
echo ""

echo -e "${GREEN}🎉 After Deployment:${NC}"
echo "   1. Test all pages: /, /shop, /cart, /checkout, /account"
echo "   2. Test authentication (if configured)"
echo "   3. Test shopping cart functionality"
echo "   4. Monitor Vercel function logs for any errors"
echo ""

echo -e "${YELLOW}⚠️  Troubleshooting:${NC}"
echo "   - Database errors: Check DATABASE_URL in Vercel env vars"
echo "   - Auth errors: Verify AUTH_SECRET is set"
echo "   - Build errors: Check Vercel build logs"
echo "   - Runtime errors: Check Vercel function logs"
echo ""

echo -e "${BLUE}💡 Need help?${NC}"
echo "   - Vercel Docs: https://vercel.com/docs"
echo "   - Prisma Docs: https://pris.ly/d/deployment"
echo "   - NextAuth Docs: https://next-auth.js.org"
echo ""

echo -e "${GREEN}🚀 Ready to deploy? Run: npm run deploy${NC}"

