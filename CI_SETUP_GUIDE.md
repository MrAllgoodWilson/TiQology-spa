# CI Database Checks Setup Complete ✅

This guide explains what has been created and how to enable the automated database checks workflow.

## What Was Created

### 1. CI Directory Structure (`ci/`)

All database check files have been created and committed:

```
ci/
├── README.md                           # Comprehensive documentation
├── sql/                                # SQL check queries
│   ├── rls_checks.sql                 # Row Level Security validation
│   ├── index_checks.sql               # Index health and performance
│   └── table_stats.sql                # Table statistics and bloat detection
├── scripts/                            # Bash execution scripts
│   ├── run_db_checks.sh              # Main runner for all checks
│   ├── check_rls_policies.sh         # RLS-specific validation
│   └── analyze_query_performance.sh  # Query performance analysis
├── queries/                            # Performance test queries
│   ├── performance_tests.sql         # Query performance tests
│   └── benchmark_queries.sql         # Database benchmarks
└── artifacts/                          # Output directory
    └── README.md                      # Artifacts documentation
```

### 2. GitHub Actions Workflow (`.github/workflows/db_checks.yml`)

A comprehensive automated workflow that:

- ✅ Validates Row Level Security (RLS) policies
- ✅ Checks index health and usage
- ✅ Monitors table statistics and bloat
- ✅ Analyzes query performance
- ✅ Generates detailed reports
- ✅ Creates issues on failures (scheduled runs)
- ✅ Uploads artifacts for 30 days

**Workflow Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Daily scheduled runs at 2 AM UTC
- Manual workflow dispatch

## How to Enable the Workflow

### Step 1: Set DATABASE_URL Secret

The workflow requires a PostgreSQL connection string to run database checks.

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `DATABASE_URL`
5. Value: Your PostgreSQL connection string (format: `postgresql://user:password@host:port/database`)
6. Click **Add secret**

### Step 2: Enable the Workflow

1. Go to the **Actions** tab in your repository
2. Find "Database Checks - RLS, Index, and Query Performance" in the workflow list
3. If it's disabled, click the **Enable workflow** button

### Step 3: Test the Workflow (Optional)

1. Go to **Actions** → **Database Checks - RLS, Index, and Query Performance**
2. Click **Run workflow** button (top right)
3. Select the branch (e.g., `main`)
4. Check "Run full database checks" if desired
5. Click **Run workflow**

The workflow will execute and you can monitor its progress in the Actions tab.

## Local Usage

You can also run these checks locally if you have PostgreSQL client tools installed:

```bash
# Set your database connection
export DATABASE_URL="postgresql://user:password@host:port/database"

# Run all checks
./ci/scripts/run_db_checks.sh

# Or run specific checks
./ci/scripts/check_rls_policies.sh
./ci/scripts/analyze_query_performance.sh

# Or run individual SQL files
psql "$DATABASE_URL" -f ci/sql/rls_checks.sql
psql "$DATABASE_URL" -f ci/sql/index_checks.sql
```

## What the Checks Do

### Row Level Security (RLS) Checks
- Verifies RLS is enabled on all critical tables
- Lists all existing RLS policies
- Identifies tables that should have RLS but don't
- **Why it matters:** RLS ensures users can only access data they're authorized to see

### Index Health Checks
- Lists all indexes with usage statistics
- Identifies unused indexes (candidates for removal)
- Finds missing indexes on foreign key columns
- Detects duplicate indexes wasting space
- **Why it matters:** Proper indexes improve query performance, but unused indexes slow down writes

### Table Statistics
- Shows table sizes and row counts
- Detects table bloat (dead tuples)
- Identifies sequential scans on large tables
- **Why it matters:** Helps optimize storage and identify missing indexes

### Query Performance Analysis
- Identifies slow queries from pg_stat_statements
- Checks cache hit ratios (should be > 99%)
- Monitors index hit ratios (should be > 99%)
- Tracks active connections and locks
- **Why it matters:** Poor performance metrics indicate configuration or query optimization needs

## Viewing Results

### In GitHub Actions

1. Go to **Actions** → Select a workflow run
2. Click on the "Database Health Checks" job
3. View the step-by-step execution logs
4. Download artifacts from the "Artifacts" section (available for 30 days)

### Artifacts Include

- `rls_checks_*.txt` - RLS validation results
- `index_checks_*.txt` - Index analysis
- `table_stats_*.txt` - Table statistics
- `performance_tests_*.txt` - Performance results
- `benchmark_queries_*.txt` - Benchmark results

## Interpreting Results

### ✅ Good Signs
- Cache hit ratio > 99%
- Index hit ratio > 99%
- All critical tables have RLS enabled
- No unused indexes (or very few)
- Low dead tuple ratios

### ⚠️ Warning Signs
- Cache hit ratio < 95%
- Tables without RLS that contain user data
- Many unused indexes
- High dead tuple ratios (> 10%)
- Sequential scans on large tables

### 🔴 Critical Issues
- Database connection failures
- Missing RLS on sensitive tables
- Cache hit ratio < 90%
- Excessive table bloat (> 20% dead tuples)

## Customization

See `ci/README.md` for detailed instructions on:
- Adding new checks
- Adjusting warning thresholds
- Customizing the workflow
- Best practices

## Support

For questions or issues:
- Review `ci/README.md` for detailed documentation
- Check workflow logs in the Actions tab
- Contact DevOps or Database team
- Open an issue in the repository

## Next Steps

1. ✅ **Merge this PR** to get the changes into the main branch
2. ✅ **Set the DATABASE_URL secret** in repository settings
3. ✅ **Enable the workflow** in the Actions tab
4. ✅ **Run a test** to verify everything works
5. 📊 **Monitor results** and address any issues found

---

**Created by:** Rocket 🚀 (TiQology Deployment AI)  
**Date:** 2025-12-13  
**Status:** Ready for production use
