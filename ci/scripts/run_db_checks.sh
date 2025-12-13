#!/bin/bash
# Database Checks Runner Script
# This script runs all database checks and generates reports

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CI_DIR="$(dirname "$SCRIPT_DIR")"
SQL_DIR="$CI_DIR/sql"
QUERIES_DIR="$CI_DIR/queries"
ARTIFACTS_DIR="$CI_DIR/artifacts"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================================"
echo "TiQology Database Checks"
echo "================================================"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}ERROR: DATABASE_URL environment variable is not set${NC}"
    echo "Please set DATABASE_URL to your PostgreSQL connection string"
    exit 1
fi

# Create artifacts directory if it doesn't exist
mkdir -p "$ARTIFACTS_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo -e "${YELLOW}Running RLS Checks...${NC}"
psql "$DATABASE_URL" -f "$SQL_DIR/rls_checks.sql" > "$ARTIFACTS_DIR/rls_checks_$TIMESTAMP.txt" 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ RLS checks completed${NC}"
else
    echo -e "${RED}✗ RLS checks failed${NC}"
fi

echo -e "${YELLOW}Running Index Checks...${NC}"
psql "$DATABASE_URL" -f "$SQL_DIR/index_checks.sql" > "$ARTIFACTS_DIR/index_checks_$TIMESTAMP.txt" 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Index checks completed${NC}"
else
    echo -e "${RED}✗ Index checks failed${NC}"
fi

echo -e "${YELLOW}Running Table Stats...${NC}"
psql "$DATABASE_URL" -f "$SQL_DIR/table_stats.sql" > "$ARTIFACTS_DIR/table_stats_$TIMESTAMP.txt" 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Table stats completed${NC}"
else
    echo -e "${RED}✗ Table stats failed${NC}"
fi

echo -e "${YELLOW}Running Performance Tests...${NC}"
psql "$DATABASE_URL" -f "$QUERIES_DIR/performance_tests.sql" > "$ARTIFACTS_DIR/performance_tests_$TIMESTAMP.txt" 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Performance tests completed${NC}"
else
    echo -e "${RED}✗ Performance tests failed${NC}"
fi

echo -e "${YELLOW}Running Benchmark Queries...${NC}"
psql "$DATABASE_URL" -f "$QUERIES_DIR/benchmark_queries.sql" > "$ARTIFACTS_DIR/benchmark_queries_$TIMESTAMP.txt" 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Benchmark queries completed${NC}"
else
    echo -e "${RED}✗ Benchmark queries failed${NC}"
fi

echo ""
echo "================================================"
echo "Database Checks Complete"
echo "================================================"
echo "Results saved to: $ARTIFACTS_DIR"
echo ""
echo "Latest results:"
ls -lh "$ARTIFACTS_DIR"/*_$TIMESTAMP.txt
