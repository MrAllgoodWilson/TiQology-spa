#!/bin/bash
# Query Performance Analysis Script
# This script analyzes query performance and identifies slow queries

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CI_DIR="$(dirname "$SCRIPT_DIR")"
QUERIES_DIR="$CI_DIR/queries"
ARTIFACTS_DIR="$CI_DIR/artifacts"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "================================================"
echo "Query Performance Analysis"
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
OUTPUT_FILE="$ARTIFACTS_DIR/query_performance_$TIMESTAMP.txt"

echo -e "${BLUE}Analyzing query performance...${NC}" | tee "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

# Run performance tests
psql "$DATABASE_URL" -f "$QUERIES_DIR/performance_tests.sql" | tee -a "$OUTPUT_FILE"

echo "" | tee -a "$OUTPUT_FILE"

# Run benchmark queries
echo -e "${BLUE}Running benchmark queries...${NC}" | tee -a "$OUTPUT_FILE"
psql "$DATABASE_URL" -f "$QUERIES_DIR/benchmark_queries.sql" | tee -a "$OUTPUT_FILE"

echo "" | tee -a "$OUTPUT_FILE"
echo "================================================" | tee -a "$OUTPUT_FILE"
echo "Query Performance Analysis Complete" | tee -a "$OUTPUT_FILE"
echo "================================================" | tee -a "$OUTPUT_FILE"
echo "Results saved to: $OUTPUT_FILE" | tee -a "$OUTPUT_FILE"

# Check for critical performance issues
echo "" | tee -a "$OUTPUT_FILE"
echo -e "${YELLOW}Performance Recommendations:${NC}" | tee -a "$OUTPUT_FILE"
echo "- Cache hit ratio should be > 99%" | tee -a "$OUTPUT_FILE"
echo "- Index hit ratio should be > 99%" | tee -a "$OUTPUT_FILE"
echo "- Watch for queries with high mean_exec_time" | tee -a "$OUTPUT_FILE"
echo "- Review sequential scans on large tables" | tee -a "$OUTPUT_FILE"
