#!/bin/bash

# GymShah Database Setup Script
# This script helps set up the database and run migrations

set -e

echo "🗄️  Setting up GymShah database..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    echo -e "${BLUE}💡 Run 'npm run setup-env' first${NC}"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env; then
    echo -e "${RED}❌ DATABASE_URL not found in .env${NC}"
    echo -e "${BLUE}💡 Please set DATABASE_URL in your .env file${NC}"
    exit 1
fi

# Check if DATABASE_URL is not the placeholder
if grep -q "DATABASE_URL=\"postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public\"" .env; then
    echo -e "${RED}❌ DATABASE_URL is still set to placeholder value${NC}"
    echo -e "${BLUE}💡 Please update DATABASE_URL in .env with your actual database connection string${NC}"
    exit 1
fi

echo -e "${BLUE}🔍 Checking database connection...${NC}"

# Test database connection
if ! npx prisma db pull > /dev/null 2>&1; then
    echo -e "${RED}❌ Cannot connect to database${NC}"
    echo -e "${YELLOW}⚠️  Please check:${NC}"
    echo -e "   1. Database is running and accessible"
    echo -e "   2. DATABASE_URL is correct"
    echo -e "   3. Database user has proper permissions"
    exit 1
fi

echo -e "${GREEN}✅ Database connection successful!${NC}"

# Run migrations
echo -e "${BLUE}🔄 Running database migrations...${NC}"
npx prisma migrate dev --name init

# Generate Prisma client
echo -e "${BLUE}⚙️  Generating Prisma client...${NC}"
npx prisma generate

echo -e "${GREEN}✅ Database setup complete!${NC}"
echo ""
echo -e "${BLUE}🌱 Optional: Seed database with sample data${NC}"
echo -e "   Run: npm run seed (if available)"
echo ""
echo -e "${GREEN}🚀 You can now:${NC}"
echo -e "   1. Start development: npm run dev"
echo -e "   2. Deploy to production: npm run deploy"
echo -e "   3. View database: npx prisma studio"

