-- Row Level Security (RLS) Checks
-- This file contains SQL queries to validate RLS policies are properly configured

-- Check if RLS is enabled on critical tables
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY tablename;

-- Validate RLS policies exist for user-specific data
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
ORDER BY schemaname, tablename, policyname;

-- Check for tables without RLS enabled that should have it
SELECT 
    t.table_schema,
    t.table_name
FROM information_schema.tables t
LEFT JOIN pg_tables pt ON t.table_name = pt.tablename
WHERE t.table_schema NOT IN ('pg_catalog', 'information_schema')
    AND t.table_type = 'BASE TABLE'
    AND (pt.rowsecurity IS NULL OR pt.rowsecurity = false)
ORDER BY t.table_schema, t.table_name;
