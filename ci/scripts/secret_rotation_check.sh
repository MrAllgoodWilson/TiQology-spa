#!/bin/bash

# ENH-008: Secret Rotation Check Script
# Phase 17.3 P1 Enhancement Implementation
# Checks secret expiration and sends warnings

set -e

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
TOKEN_NAME="ROCKET_WRITE_TOKEN"
# IMPORTANT: Update EXPIRY_DATE when token is rotated
EXPIRY_DATE="${SECRET_EXPIRY_DATE:-2026-03-27}"  # Default 90 days from 2025-12-27
CURRENT_DATE=$(date +%Y-%m-%d)

echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}Secret Rotation Status Check - Phase 17.3${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

# Calculate days until expiry
DAYS_UNTIL_EXPIRY=$(( ($(date -d "$EXPIRY_DATE" +%s) - $(date -d "$CURRENT_DATE" +%s)) / 86400 ))

echo "Secret: $TOKEN_NAME"
echo "Current Date: $CURRENT_DATE"
echo "Expiry Date: $EXPIRY_DATE"
echo "Days Until Expiry: $DAYS_UNTIL_EXPIRY"
echo ""

# Determine status and action
if [ $DAYS_UNTIL_EXPIRY -le 0 ]; then
  echo -e "${RED}🚨 EXPIRED: $TOKEN_NAME has expired!${NC}"
  echo "IMMEDIATE ACTION REQUIRED:"
  echo "1. Generate new GitHub Personal Access Token"
  echo "2. Update secret in repository settings"
  echo "3. Test with: gh workflow run phase17_authorization.yml -f operation=status_check"
  echo "4. Revoke old token"
  echo "5. Update EXPIRY_DATE in this script"
  exit 2
elif [ $DAYS_UNTIL_EXPIRY -le 7 ]; then
  echo -e "${RED}🚨 CRITICAL: $TOKEN_NAME expires in $DAYS_UNTIL_EXPIRY days!${NC}"
  echo "URGENT ACTION REQUIRED:"
  echo "1. Plan immediate token rotation"
  echo "2. Schedule maintenance window"
  echo "3. Prepare new token generation"
  exit 1
elif [ $DAYS_UNTIL_EXPIRY -le 14 ]; then
  echo -e "${YELLOW}⚠️ WARNING: $TOKEN_NAME expires in $DAYS_UNTIL_EXPIRY days${NC}"
  echo "RECOMMENDED ACTIONS:"
  echo "1. Schedule token rotation within next week"
  echo "2. Review rotation procedure documentation"
  echo "3. Notify team of upcoming rotation"
  exit 0
elif [ $DAYS_UNTIL_EXPIRY -le 30 ]; then
  echo -e "${YELLOW}ℹ️ INFO: $TOKEN_NAME expires in $DAYS_UNTIL_EXPIRY days${NC}"
  echo "ADVISORY:"
  echo "Token rotation should be planned within the month"
  exit 0
else
  echo -e "${GREEN}✅ OK: $TOKEN_NAME is valid for $DAYS_UNTIL_EXPIRY days${NC}"
  echo "No action required at this time"
  exit 0
fi
