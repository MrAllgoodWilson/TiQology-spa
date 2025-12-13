#!/bin/bash
# RLS Policy Validator Script
# This script specifically validates Row Level Security policies

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CI_DIR="$(dirname "$SCRIPT_DIR")"
SQL_DIR="$CI_DIR/sql"
ARTIFACTS_DIR="$CI_DIR/artifacts"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================================"
echo "RLS Policy Validation"
echo "================================================"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}ERROR: DATABASE_URL environment variable is not set${NC}"
    exit 1
fi

# Create artifacts directory if it doesn't exist
mkdir -p "$ARTIFACTS_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="$ARTIFACTS_DIR/rls_validation_$TIMESTAMP.txt"

echo "Checking RLS policies..." | tee "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

# Run RLS checks
psql "$DATABASE_URL" -f "$SQL_DIR/rls_checks.sql" | tee -a "$OUTPUT_FILE"

echo "" | tee -a "$OUTPUT_FILE"
echo "================================================" | tee -a "$OUTPUT_FILE"
echo "RLS Validation Complete" | tee -a "$OUTPUT_FILE"
echo "================================================" | tee -a "$OUTPUT_FILE"
echo "Results saved to: $OUTPUT_FILE" | tee -a "$OUTPUT_FILE"
