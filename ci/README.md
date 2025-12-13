# TiQology CI - Database Checks

This directory contains automated database checks for Row Level Security (RLS), index health, and query performance monitoring.

## Directory Structure

```
ci/
├── sql/                  # SQL files for database checks
│   ├── rls_checks.sql           # Row Level Security validation
│   ├── index_checks.sql         # Index health and performance
│   └── table_stats.sql          # Table statistics and bloat
├── scripts/              # Bash scripts for running checks
│   ├── run_db_checks.sh                 # Main check runner
│   ├── check_rls_policies.sh            # RLS-specific checks
│   └── analyze_query_performance.sh     # Performance analysis
├── queries/              # Performance test queries
│   ├── performance_tests.sql    # Query performance tests
│   └── benchmark_queries.sql    # Database benchmarks
└── artifacts/            # Output directory for check results
    └── README.md
```

## GitHub Actions Workflow

The `db_checks.yml` workflow in `.github/workflows/` automatically runs these checks:

### Triggers
- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches
- **Scheduled** daily at 2 AM UTC
- **Manual** workflow dispatch

### What It Checks

1. **Row Level Security (RLS)**
   - Verifies RLS is enabled on critical tables
   - Lists all RLS policies
   - Identifies tables that should have RLS enabled

2. **Index Health**
   - Lists all indexes with sizes and usage statistics
   - Identifies unused indexes (potential removal candidates)
   - Finds missing indexes on foreign key columns
   - Detects duplicate indexes

3. **Table Statistics**
   - Table sizes and row counts
   - Table bloat detection (dead tuples ratio)
   - Sequential scans on large tables (potential missing indexes)

4. **Query Performance**
   - Slow query identification from pg_stat_statements
   - Cache hit ratios (should be > 99%)
   - Index hit ratios (should be > 99%)
   - Active connections and lock monitoring

## Local Usage

### Prerequisites

- PostgreSQL client (`psql`) installed
- `DATABASE_URL` environment variable set

```bash
export DATABASE_URL="postgresql://user:password@host:port/database"
```

### Running All Checks

```bash
./ci/scripts/run_db_checks.sh
```

### Running Specific Checks

**RLS Checks Only:**
```bash
./ci/scripts/check_rls_policies.sh
```

**Query Performance Only:**
```bash
./ci/scripts/analyze_query_performance.sh
```

**Individual SQL Files:**
```bash
psql "$DATABASE_URL" -f ci/sql/rls_checks.sql
psql "$DATABASE_URL" -f ci/sql/index_checks.sql
psql "$DATABASE_URL" -f ci/sql/table_stats.sql
```

## GitHub Actions Setup

To enable the workflow in your repository:

1. **Set the `DATABASE_URL` Secret**
   - Go to Settings → Secrets and variables → Actions
   - Add a new repository secret named `DATABASE_URL`
   - Set the value to your PostgreSQL connection string

2. **Enable the Workflow**
   - Go to Actions tab in your repository
   - Find "Database Checks - RLS, Index, and Query Performance"
   - Enable the workflow if it's not already enabled

3. **Test the Workflow**
   - Go to Actions → Database Checks workflow
   - Click "Run workflow" and select "Run full database checks"

## Interpreting Results

### RLS Checks
- **All critical tables should have `rowsecurity = true`**
- Each table with user-specific data should have appropriate RLS policies
- Review tables without RLS to determine if they need protection

### Index Checks
- **Unused indexes** (idx_scan = 0) can potentially be removed to save space
- **Missing indexes on FK columns** can cause performance issues
- **Duplicate indexes** waste storage space

### Performance Checks
- **Cache hit ratio** should be > 99% for good performance
- **Index hit ratio** should be > 99% for good performance
- **Sequential scans on large tables** may indicate missing indexes
- **High dead tuple ratio** indicates need for VACUUM

## Customization

### Adding New Checks

1. Create a new SQL file in `ci/sql/` or `ci/queries/`
2. Update `ci/scripts/run_db_checks.sh` to include the new check
3. Update `.github/workflows/db_checks.yml` if needed

### Adjusting Thresholds

Edit the "Check for Critical Issues" step in `db_checks.yml` to adjust warning thresholds for:
- Cache hit ratio (default: 95%)
- Tables without RLS (default: 0)
- Unused indexes (default: 5)

## Artifacts

All check results are uploaded as GitHub Actions artifacts and stored in `ci/artifacts/` with timestamps. Artifacts are retained for 30 days by default.

## Troubleshooting

### "DATABASE_URL environment variable is not set"
Set the environment variable before running scripts locally.

### "Database connection failed"
Verify your DATABASE_URL is correct and the database is accessible.

### Workflow doesn't run
Check that:
1. The workflow file exists in `.github/workflows/db_checks.yml`
2. The `DATABASE_URL` secret is set in repository settings
3. The workflow is enabled in the Actions tab

## Best Practices

1. **Review RLS policies regularly** to ensure data security
2. **Monitor unused indexes** and remove them if truly unused
3. **Check cache hit ratios** - low ratios indicate configuration issues
4. **Address table bloat** by running VACUUM when dead tuple ratio is high
5. **Investigate sequential scans** on large tables - they may need indexes

## Contributing

When adding new database checks:
- Follow the existing naming conventions
- Add documentation to this README
- Test locally before committing
- Ensure scripts are executable (`chmod +x`)

## Support

For issues or questions about database checks, please contact the DevOps or Database team, or open an issue in the repository.
