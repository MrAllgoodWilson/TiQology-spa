-- Performance Test Queries
-- This file contains queries to test database performance

-- Test query performance with EXPLAIN ANALYZE
-- These are example queries that should be customized for your schema

-- Example: Test user lookup performance
-- EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
-- SELECT * FROM users WHERE id = 1;

-- Example: Test transaction query performance
-- EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
-- SELECT t.*, u.name as user_name
-- FROM transactions t
-- JOIN users u ON t.user_id = u.id
-- WHERE t.created_at >= NOW() - INTERVAL '30 days'
-- ORDER BY t.created_at DESC
-- LIMIT 100;

-- Example: Test organization query performance
-- EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
-- SELECT o.*, COUNT(u.id) as member_count
-- FROM organizations o
-- LEFT JOIN organization_members om ON o.id = om.organization_id
-- LEFT JOIN users u ON om.user_id = u.id
-- GROUP BY o.id;

-- Query to identify slow queries from pg_stat_statements
SELECT
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    max_exec_time,
    stddev_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 20;
