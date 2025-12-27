# 🚀 Phase 17 Live Execution Guide

**Authorization:** Commander AL  
**Mode:** LIVE OPERATIONS (dry_run=false)  
**Date:** 2025-12-27  
**Status:** AUTHORIZED FOR EXECUTION  

---

## ⚠️ IMPORTANT NOTICE

This guide covers **LIVE EXECUTION** of Phase 17 operations. These operations will make **actual changes** to repositories, including:
- Deleting merged/stale branches
- Modifying workflow configurations
- Triggering deployments
- Creating/modifying issues and PRs

**Ensure you have proper authorization before proceeding.**

---

## Prerequisites

### 1. Required Tools
- ✅ GitHub CLI (`gh`) installed and authenticated
- ✅ Access to MrAllgoodWilson/TiQology-spa repository
- ✅ Repository admin permissions

### 2. Required Secrets
- ✅ `ROCKET_WRITE_TOKEN` configured in repository secrets
  - GitHub Personal Access Token with scopes:
    - `repo` (Full control)
    - `workflow` (Update workflows)
    - `write:packages` (Upload packages)

### 3. Verify Setup
```bash
# Check GitHub CLI
gh --version
gh auth status

# Check repository access
gh repo view MrAllgoodWilson/TiQology-spa

# Check if secret is configured
gh secret list --repo MrAllgoodWilson/TiQology-spa | grep ROCKET_WRITE_TOKEN
```

---

## Execution Methods

### Method 1: Automated Script (Recommended)

The automated script handles all operations sequentially:

```bash
# Navigate to repository
cd /path/to/TiQology-spa

# Run the live execution script
./ci/scripts/phase17_execute_live.sh
```

**What it does:**
1. Validates prerequisites
2. Triggers all 5 Phase 17 operations sequentially
3. Monitors workflow executions
4. Generates comprehensive operational report
5. Saves logs to `logs/phase17/`

**Output:**
- Live operation log: `logs/phase17/operation_YYYYMMDD_HHMMSS.log`
- Operational report: `logs/phase17/phase17_operational_report_YYYYMMDD_HHMMSS.md`

---

### Method 2: Manual GitHub CLI Execution

Execute operations individually for more control:

#### Operation 1: CI Cleanup
```bash
gh workflow run phase17_authorization.yml \
  --repo MrAllgoodWilson/TiQology-spa \
  -f operation="ci_cleanup" \
  -f dry_run="false"

# Monitor execution
gh run watch --repo MrAllgoodWilson/TiQology-spa
```

#### Operation 2: Branch Cleanup
```bash
gh workflow run phase17_authorization.yml \
  --repo MrAllgoodWilson/TiQology-spa \
  -f operation="branch_cleanup" \
  -f dry_run="false"

# Monitor execution
gh run watch --repo MrAllgoodWilson/TiQology-spa
```

#### Operation 3: PR Conflict Resolution
```bash
gh workflow run phase17_authorization.yml \
  --repo MrAllgoodWilson/TiQology-spa \
  -f operation="pr_conflict_check" \
  -f dry_run="false"

# Monitor execution
gh run watch --repo MrAllgoodWilson/TiQology-spa
```

#### Operation 4: Workflow Validation
```bash
gh workflow run phase17_authorization.yml \
  --repo MrAllgoodWilson/TiQology-spa \
  -f operation="workflow_standardization" \
  -f dry_run="false"

# Monitor execution
gh run watch --repo MrAllgoodWilson/TiQology-spa
```

#### Operation 5: Deployment Synchronization
```bash
gh workflow run phase17_authorization.yml \
  --repo MrAllgoodWilson/TiQology-spa \
  -f operation="deployment_orchestration" \
  -f dry_run="false"

# Monitor execution
gh run watch --repo MrAllgoodWilson/TiQology-spa
```

#### Full Sync (All Operations)
```bash
gh workflow run phase17_authorization.yml \
  --repo MrAllgoodWilson/TiQology-spa \
  -f operation="full_sync" \
  -f dry_run="false"

# Monitor execution
gh run watch --repo MrAllgoodWilson/TiQology-spa
```

---

### Method 3: GitHub Web Interface

1. **Navigate to Actions Tab**
   ```
   https://github.com/MrAllgoodWilson/TiQology-spa/actions
   ```

2. **Select Workflow**
   - Click "Phase 17 - Write Access Authorization & Orchestration"

3. **Run Workflow**
   - Click "Run workflow" button (top right)
   - Select branch: `main` or current working branch
   - Choose operation from dropdown
   - **IMPORTANT:** Set `dry_run` to `false`
   - Click "Run workflow"

4. **Monitor Execution**
   - Click on the running workflow
   - View real-time logs
   - Check job status

---

## Multi-Repository Execution

To execute Phase 17 across ALL MrAllgoodWilson repositories:

### Prerequisites
- Phase 17 workflow must be deployed to each target repository
- `ROCKET_WRITE_TOKEN` must be configured in each repository

### Execution
```bash
# Using the sync script with LIVE mode
cd /path/to/TiQology-spa

# Execute across all repos (LIVE mode)
REPO_LIMIT=200 SYNC_DELAY=2 \
  ./ci/scripts/phase17_sync.sh ci_cleanup false

# Or execute all operations
REPO_LIMIT=200 SYNC_DELAY=2 \
  ./ci/scripts/phase17_sync.sh full_sync false
```

**Note:** The sync script will:
1. List all MrAllgoodWilson repositories
2. Check each for Phase 17 workflow
3. Trigger operations in repositories that have it
4. Generate sync results report

---

## Monitoring and Results

### View Running Workflows
```bash
# List recent runs
gh run list --repo MrAllgoodWilson/TiQology-spa \
  --workflow=phase17_authorization.yml \
  --limit 10

# Watch specific run
gh run watch <run-id> --repo MrAllgoodWilson/TiQology-spa

# View run details
gh run view <run-id> --repo MrAllgoodWilson/TiQology-spa
```

### Download Artifacts
```bash
# Download artifacts from specific run
gh run download <run-id> --repo MrAllgoodWilson/TiQology-spa

# List available artifacts
gh run view <run-id> --repo MrAllgoodWilson/TiQology-spa
```

### Check Logs
```bash
# View logs from automated script
cat logs/phase17/operation_YYYYMMDD_HHMMSS.log

# View operational report
cat logs/phase17/phase17_operational_report_YYYYMMDD_HHMMSS.md

# View GitHub Actions logs
gh run view <run-id> --log --repo MrAllgoodWilson/TiQology-spa
```

---

## Expected Outcomes

### CI Cleanup
- **Analysis Generated:** Workflow inventory and standardization report
- **Actions Taken:** Identified non-compliant workflows
- **Artifacts:** `ci-cleanup-analysis/ci_analysis.txt`

### Branch Cleanup
- **Analysis Generated:** List of stale and merged branches
- **Actions Taken:** Branches marked for deletion (if safe)
- **Artifacts:** `branch-cleanup-analysis/branch_analysis.txt`

### PR Conflict Resolution
- **Analysis Generated:** Open PR status and conflict detection
- **Actions Taken:** Issues created for conflicting PRs
- **Artifacts:** `pr-conflict-analysis/pr_analysis.txt`, `pr-conflict-analysis/open_prs.json`

### Workflow Validation
- **Analysis Generated:** Standards compliance report
- **Actions Taken:** Recommendations generated
- **Artifacts:** `workflow-standardization-report/workflow_standards.txt`

### Deployment Synchronization
- **Analysis Generated:** Deployment status across environments
- **Actions Taken:** Coordination signals sent
- **Artifacts:** Deployment status reports

---

## Safety Checks

### Before Execution
- [ ] Verify `ROCKET_WRITE_TOKEN` is configured
- [ ] Confirm no critical operations in progress
- [ ] Review current repository state
- [ ] Ensure backups are available
- [ ] Notify team of planned operations

### During Execution
- [ ] Monitor workflow logs in real-time
- [ ] Watch for error messages
- [ ] Check artifact generation
- [ ] Verify authorization checks pass

### After Execution
- [ ] Review all generated artifacts
- [ ] Validate changes made to repository
- [ ] Check for any errors or warnings
- [ ] Document any issues encountered
- [ ] Update team on results

---

## Rollback Procedures

If issues are encountered during execution:

### 1. Stop Running Workflows
```bash
# Cancel specific run
gh run cancel <run-id> --repo MrAllgoodWilson/TiQology-spa

# View cancellation status
gh run view <run-id> --repo MrAllgoodWilson/TiQology-spa
```

### 2. Revert Branch Deletions
If branches were incorrectly deleted:
```bash
# List recent deletions from logs
cat logs/phase17/operation_YYYYMMDD_HHMMSS.log | grep "deleted"

# Restore from reflog (if available)
git reflog
git checkout -b <branch-name> <commit-sha>
git push origin <branch-name>
```

### 3. Review and Fix Issues
```bash
# Download artifacts to analyze what was changed
gh run download <run-id> --repo MrAllgoodWilson/TiQology-spa

# Review changes made
git log --oneline --since="1 hour ago"
```

---

## Troubleshooting

### Authorization Failed
**Problem:** Workflow fails at authorization check

**Solution:**
1. Verify `ROCKET_WRITE_TOKEN` exists: `gh secret list`
2. Check token hasn't expired
3. Ensure token has required permissions
4. Re-add token if needed

### Workflow Not Found
**Problem:** Cannot trigger workflow

**Solution:**
1. Verify workflow file exists: `ls .github/workflows/phase17_authorization.yml`
2. Check workflow is enabled in Actions tab
3. Ensure you're on correct branch
4. Try refreshing GitHub cache

### Operation Failures
**Problem:** Specific operation fails during execution

**Solution:**
1. Check workflow logs: `gh run view <run-id> --log`
2. Review error messages in artifacts
3. Verify repository state
4. Check for rate limiting issues
5. Re-run failed operation individually

### Artifacts Not Generated
**Problem:** Expected artifacts missing

**Solution:**
1. Check if operation completed successfully
2. Review workflow logs for upload errors
3. Verify artifact retention hasn't expired
4. Check repository storage limits

---

## Post-Execution Checklist

- [ ] All workflows completed successfully
- [ ] All artifacts downloaded and reviewed
- [ ] Operational report generated
- [ ] Team notified of results
- [ ] Any issues documented
- [ ] Follow-up actions identified
- [ ] Logs archived for audit trail

---

## Support

### Getting Help
1. Check workflow logs in Actions tab
2. Review operational report in `logs/phase17/`
3. Consult Phase 17 documentation:
   - `PHASE17_OPERATIONS.md`
   - `PHASE17_QUICK_REFERENCE.md`
   - `PHASE17_SETUP_GUIDE.md`
4. Contact repository maintainers

### Reporting Issues
If problems are encountered:
1. Save all logs and artifacts
2. Document steps taken
3. Note error messages
4. Create issue with details
5. Tag relevant team members

---

## Summary

Phase 17 live operations are now authorized and ready for execution. Use the automated script (`phase17_execute_live.sh`) for streamlined execution, or manually trigger operations for more control.

**Remember:**
- ✅ This is LIVE mode - changes will be permanent
- ✅ Monitor executions in real-time
- ✅ Review all artifacts
- ✅ Document results
- ✅ Keep audit trail

---

**Authorization:** Commander AL  
**Primary Agent:** 🚀 Rocket  
**Secondary Agent:** 👨‍💻 Devin  
**Network:** TiQology Operational Network  
**Status:** AUTHORIZED FOR LIVE EXECUTION ✅

**Execute with confidence. The system is ready.**
