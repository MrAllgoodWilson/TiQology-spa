-- Benchmark Queries for Performance Testing
-- These queries help establish performance baselines

-- Connection and database information
SELECT
    version() AS postgres_version,
    current_database() AS database_name,
    pg_size_pretty(pg_database_size(current_database())) AS database_size;

-- Active connections and their states
SELECT
    datname,
    count(*) as connections,
    state
FROM pg_stat_activity
WHERE datname IS NOT NULL
GROUP BY datname, state
ORDER BY datname, state;

-- Cache hit ratio (should be > 99%)
SELECT
    sum(heap_blks_read) as heap_read,
    sum(heap_blks_hit) as heap_hit,
    sum(heap_blks_hit) / NULLIF(sum(heap_blks_hit) + sum(heap_blks_read), 0) * 100 AS cache_hit_ratio
FROM pg_statio_user_tables;

-- Index hit ratio (should be > 99%)
SELECT
    sum(idx_blks_read) as idx_read,
    sum(idx_blks_hit) as idx_hit,
    sum(idx_blks_hit) / NULLIF(sum(idx_blks_hit) + sum(idx_blks_read), 0) * 100 AS index_hit_ratio
FROM pg_statio_user_indexes;

-- Lock monitoring
SELECT
    pg_stat_activity.pid,
    pg_class.relname,
    pg_locks.locktype,
    pg_locks.mode,
    pg_locks.granted,
    pg_stat_activity.query
FROM pg_locks
JOIN pg_class ON pg_locks.relation = pg_class.oid
JOIN pg_stat_activity ON pg_locks.pid = pg_stat_activity.pid
WHERE pg_locks.mode LIKE '%Exclusive%'
    AND NOT pg_locks.granted;
