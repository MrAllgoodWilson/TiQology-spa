# Phase 17 Quick Reference Guide

Quick commands and references for Phase 17 operations.

## Setup

### 1. Configure ROCKET_WRITE_TOKEN Secret

```bash
# In GitHub Repository Settings → Secrets and variables → Actions
# Add secret: ROCKET_WRITE_TOKEN
# Value: GitHub Personal Access Token with repo, workflow, and write:packages permissions
```

### 2. Enable the Workflow

- Go to Actions tab in GitHub
- Find "Phase 17 - Write Access Authorization & Orchestration"
- Enable if disabled

## Running Operations

### Via GitHub UI

1. Go to **Actions** tab
2. Select **Phase 17 - Write Access Authorization & Orchestration**
3. Click **Run workflow**
4. Choose operation and settings
5. Click **Run workflow** button

### Via GitHub CLI

```bash
# Status check
gh workflow run phase17_authorization.yml -f operation=status_check -f dry_run=true

# CI cleanup
gh workflow run phase17_authorization.yml -f operation=ci_cleanup -f dry_run=true

# Branch cleanup
gh workflow run phase17_authorization.yml -f operation=branch_cleanup -f dry_run=true

# PR conflict check
gh workflow run phase17_authorization.yml -f operation=pr_conflict_check

# Workflow standardization
gh workflow run phase17_authorization.yml -f operation=workflow_standardization

# Full sync (all operations)
gh workflow run phase17_authorization.yml -f operation=full_sync -f dry_run=false
```

## Multi-Repository Sync

Run Phase 17 operations across all MrAllgoodWilson repositories:

```bash
# Make script executable (first time only)
chmod +x ci/scripts/phase17_sync.sh

# Run sync (default: status_check in dry-run mode)
./ci/scripts/phase17_sync.sh

# Run specific operation
./ci/scripts/phase17_sync.sh ci_cleanup true

# Run with actual changes (not dry-run)
./ci/scripts/phase17_sync.sh branch_cleanup false
```

## Operations Reference

| Operation | Description | Safe Mode |
|-----------|-------------|-----------|
| `status_check` | Check overall system status | ✅ Always safe |
| `ci_cleanup` | Analyze CI/CD workflows | ✅ Read-only |
| `branch_cleanup` | Analyze branches for cleanup | ⚠️ Can delete with dry_run=false |
| `pr_conflict_check` | Check PRs for conflicts | ✅ Read-only |
| `workflow_standardization` | Validate workflow standards | ✅ Read-only |
| `deployment_orchestration` | Coordinate deployments | ⚠️ Can trigger deploys |
| `full_sync` | Run all operations | ⚠️ Use with caution |

## Viewing Results

### GitHub Actions Dashboard

```bash
# View recent workflow runs
gh run list --workflow=phase17_authorization.yml --limit 10

# View specific run
gh run view <run-id>

# View logs
gh run view <run-id> --log

# Download artifacts
gh run download <run-id>
```

### Artifacts

All operations generate artifacts in the workflow run:

- **ci-cleanup-analysis**: CI/CD workflow analysis
- **branch-cleanup-analysis**: Branch cleanup recommendations
- **pr-conflict-analysis**: PR status and conflicts
- **workflow-standardization-report**: Standards compliance
- **phase17-status-report**: Comprehensive status (90 day retention)

## Monitoring

### Scheduled Runs

- Daily at 3 AM UTC: Automatic status check
- Check Actions tab for automated run results

### Manual Monitoring

```bash
# Check workflow status
gh workflow view phase17_authorization.yml

# List recent runs
gh run list --workflow=phase17_authorization.yml

# Watch active run
gh run watch
```

## Troubleshooting

### Common Issues

**Authorization Failed**
```bash
# Check if secret is configured
gh secret list

# Set ROCKET_WRITE_TOKEN
gh secret set ROCKET_WRITE_TOKEN
```

**Workflow Not Found**
```bash
# Verify workflow file exists
ls -la .github/workflows/phase17_authorization.yml

# Check workflow syntax
gh workflow view phase17_authorization.yml
```

**Rate Limit Exceeded**
```bash
# Check rate limit status
gh api rate_limit

# Wait for rate limit reset or use different token
```

## Safety Features

### Dry Run Mode

- Default for all destructive operations
- Must explicitly set `dry_run=false` for actual changes
- Always test with dry run first

### Authorization Check

- Every run validates ROCKET_WRITE_TOKEN
- Operations fail gracefully if not authorized
- Clear error messages in logs

## Agent Communication

### Rocket (Primary)
- Executes operations
- Manages infrastructure
- Handles deployments

### Devin (Secondary)
- Validates code quality
- Reviews configurations
- Ensures best practices

## Best Practices

1. **Always use dry run first**
   ```bash
   gh workflow run phase17_authorization.yml -f operation=branch_cleanup -f dry_run=true
   ```

2. **Review artifacts before applying**
   ```bash
   gh run download <run-id>
   cat branch-cleanup-analysis/branch_analysis.txt
   ```

3. **Coordinate with team**
   - Notify team before running operations
   - Schedule during low-activity periods
   - Have rollback plan ready

4. **Monitor results**
   ```bash
   gh run watch
   gh run list --workflow=phase17_authorization.yml
   ```

5. **Check status regularly**
   - Review daily automated status checks
   - Address warnings promptly
   - Keep artifacts for audit trail

## Quick Links

- **Full Documentation**: [PHASE17_OPERATIONS.md](./PHASE17_OPERATIONS.md)
- **AI Agents Info**: [AI_AGENTS.md](./AI_AGENTS.md)
- **CI Setup Guide**: [CI_SETUP_GUIDE.md](./CI_SETUP_GUIDE.md)
- **GitHub Actions**: [.github/workflows/](.github/workflows/)

## Support

- Check workflow logs in Actions tab
- Review generated artifacts
- Consult documentation files
- Contact repository maintainers

---

**Last Updated**: 2025-12-27  
**Phase**: 17  
**Status**: ✅ Operational
