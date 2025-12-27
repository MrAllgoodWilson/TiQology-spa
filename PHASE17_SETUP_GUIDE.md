# Phase 17 Setup and Configuration Guide

Complete guide for setting up and configuring Phase 17 Write Access Authorization in your repository.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Token Configuration](#token-configuration)
4. [Workflow Enablement](#workflow-enablement)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before setting up Phase 17, ensure you have:

- ✅ Repository admin access
- ✅ GitHub Personal Access Token (or ability to create one)
- ✅ GitHub CLI installed (optional, for command-line operations)
- ✅ Understanding of GitHub Actions

### GitHub CLI Installation (Optional)

```bash
# macOS
brew install gh

# Linux
curl -sS https://webi.sh/gh | sh

# Windows
winget install --id GitHub.cli

# Verify installation
gh --version
gh auth login
```

---

## Initial Setup

### Step 1: Verify Workflow Files

The Phase 17 workflow should already be in your repository:

```bash
# Check if workflow exists
ls -la .github/workflows/phase17_authorization.yml

# View workflow name
grep "^name:" .github/workflows/phase17_authorization.yml
```

**Expected Output:**
```
-rw-r--r-- 1 user user 19K Dec 27 07:53 .github/workflows/phase17_authorization.yml
name: Phase 17 - Write Access Authorization & Orchestration
```

### Step 2: Review Workflow Configuration

Open `.github/workflows/phase17_authorization.yml` and review:

- **Trigger events**: `workflow_dispatch`, `schedule`
- **Permissions**: `contents: write`, `issues: write`, etc.
- **Operations**: All available operation types
- **Safety defaults**: `dry_run: true` by default

---

## Token Configuration

### Step 3: Create GitHub Personal Access Token

Phase 17 requires a Personal Access Token with write permissions.

#### Creating the Token

1. **Go to GitHub Settings**
   - Click your profile picture → Settings
   - Scroll to "Developer settings" (bottom left)
   - Click "Personal access tokens" → "Tokens (classic)"

2. **Generate New Token**
   - Click "Generate new token (classic)"
   - Name: `ROCKET_WRITE_TOKEN_TiQology`
   - Expiration: Choose based on your security policy (90 days recommended)

3. **Select Scopes**
   Required permissions:
   ```
   ✓ repo (Full control of private repositories)
     ✓ repo:status
     ✓ repo_deployment
     ✓ public_repo
     ✓ repo:invite
     ✓ security_events
   
   ✓ workflow (Update GitHub Action workflows)
   
   ✓ write:packages (Upload packages to GitHub Package Registry)
     ✓ read:packages
   ```

4. **Generate and Copy Token**
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately (you won't see it again!)
   - Store it securely (password manager recommended)

### Step 4: Add Token to Repository Secrets

#### Via GitHub Web Interface

1. **Navigate to Repository Settings**
   ```
   Repository → Settings → Secrets and variables → Actions
   ```

2. **Add New Secret**
   - Click "New repository secret"
   - Name: `ROCKET_WRITE_TOKEN`
   - Value: Paste your Personal Access Token
   - Click "Add secret"

3. **Verify Secret Added**
   - You should see `ROCKET_WRITE_TOKEN` in the list
   - Value will be hidden (shown as `***`)

#### Via GitHub CLI

```bash
# Set the secret
gh secret set ROCKET_WRITE_TOKEN

# When prompted, paste your token and press Enter twice

# Verify secret was added
gh secret list
```

**Expected Output:**
```
ROCKET_WRITE_TOKEN  Updated YYYY-MM-DD
```

---

## Workflow Enablement

### Step 5: Enable the Workflow

If the workflow is disabled (common in new repositories):

#### Via GitHub Web Interface

1. **Go to Actions Tab**
   ```
   Repository → Actions
   ```

2. **Find Phase 17 Workflow**
   - Look for "Phase 17 - Write Access Authorization & Orchestration"
   - If you see a banner "This workflow was disabled", click "Enable workflow"

3. **Verify Workflow is Active**
   - Workflow should appear in the workflow list
   - No "disabled" banner should be visible

#### Via GitHub CLI

```bash
# List all workflows
gh workflow list

# Enable the workflow (if needed)
gh workflow enable phase17_authorization.yml

# Verify it's enabled
gh workflow view phase17_authorization.yml
```

---

## Testing

### Step 6: Run Initial Test

Run a safe test operation to verify everything is configured correctly.

#### Via GitHub Web Interface

1. **Navigate to Actions**
   ```
   Repository → Actions → Phase 17 - Write Access Authorization & Orchestration
   ```

2. **Run Workflow**
   - Click "Run workflow" button (top right)
   - Select branch: `main` (or your default branch)
   - Operation: `status_check`
   - Dry run: `true` ✓
   - Click "Run workflow"

3. **Monitor Execution**
   - Workflow run appears in the list
   - Click on it to view progress
   - Wait for completion (usually 1-2 minutes)

4. **Verify Success**
   - All jobs should show green checkmarks ✓
   - Check "Summary" for Phase 17 status report
   - Download artifacts to review detailed reports

#### Via GitHub CLI

```bash
# Run status check
gh workflow run phase17_authorization.yml \
  -f operation=status_check \
  -f dry_run=true

# Wait a moment for the run to start
sleep 5

# Watch the workflow run
gh run watch

# Or list recent runs
gh run list --workflow=phase17_authorization.yml --limit 5
```

### Step 7: Review Test Results

After the workflow completes:

1. **Check Job Status**
   ```bash
   # View the latest run
   gh run view --workflow=phase17_authorization.yml
   ```

2. **Download Artifacts**
   ```bash
   # Get the run ID from the previous command, then:
   gh run download <run-id>
   
   # View status report
   cat phase17-status-report/phase17_status.md
   ```

3. **Expected Results**
   - ✅ Authorization check: Success
   - ✅ Status report generated
   - ✅ All operations marked as "skipped" or "success"
   - ✅ No errors in logs

---

## Validation Checklist

After completing setup, verify:

- [ ] Workflow file exists: `.github/workflows/phase17_authorization.yml`
- [ ] Secret configured: `ROCKET_WRITE_TOKEN` in repository secrets
- [ ] Workflow enabled: Visible in Actions tab
- [ ] Test run successful: Status check completed without errors
- [ ] Artifacts generated: Status report available
- [ ] Authorization confirmed: "✅ Authorization token validated" in logs

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "ROCKET_WRITE_TOKEN not configured"

**Symptom:** Workflow fails at authorization check with warning

**Solution:**
1. Verify secret exists: `gh secret list`
2. Check secret name is exactly: `ROCKET_WRITE_TOKEN`
3. Re-add secret if needed (see Step 4)
4. Ensure token hasn't expired

#### Issue 2: "Workflow not found"

**Symptom:** Cannot find workflow in Actions tab

**Solution:**
1. Verify file exists: `ls .github/workflows/phase17_authorization.yml`
2. Check file is in correct location (must be in `.github/workflows/`)
3. Verify YAML syntax is valid
4. Push changes if file was recently added

#### Issue 3: "Permission denied" errors

**Symptom:** Workflow runs but operations fail with permission errors

**Solution:**
1. Check token has required scopes (see Step 3)
2. Verify repository settings allow Actions to create issues/PRs
3. Go to: Settings → Actions → General → Workflow permissions
4. Select "Read and write permissions"
5. Check "Allow GitHub Actions to create and approve pull requests"

#### Issue 4: Rate limit exceeded

**Symptom:** API errors mentioning rate limits

**Solution:**
1. Check rate limit: `gh api rate_limit`
2. Wait for limit to reset (shows in output)
3. Consider using a different token
4. For frequent operations, contact GitHub about higher limits

#### Issue 5: Workflow runs but no artifacts

**Symptom:** Workflow succeeds but can't download artifacts

**Solution:**
1. Check workflow logs for artifact upload step
2. Verify operation actually ran (wasn't skipped)
3. Check artifact retention period (30-90 days)
4. Ensure disk space available for artifact upload

---

## Advanced Configuration

### Custom Operation Scheduling

To change the automated schedule:

1. Edit `.github/workflows/phase17_authorization.yml`
2. Find the `schedule` section:
   ```yaml
   schedule:
     - cron: '0 3 * * *'  # Daily at 3 AM UTC
   ```
3. Update to your preferred schedule:
   ```yaml
   schedule:
     - cron: '0 6 * * 1'  # Weekly on Monday at 6 AM UTC
   ```
4. Commit and push changes

### Multi-Repository Setup

To enable Phase 17 across multiple repositories:

1. **Copy workflow file to each repository**
   ```bash
   # From this repository, copy to others
   cp .github/workflows/phase17_authorization.yml ../other-repo/.github/workflows/
   ```

2. **Add ROCKET_WRITE_TOKEN to each repository**
   ```bash
   # For each repository
   cd ../other-repo
   gh secret set ROCKET_WRITE_TOKEN
   ```

3. **Use sync script for coordinated operations**
   ```bash
   # From this repository
   ./ci/scripts/phase17_sync.sh status_check true
   ```

---

## Next Steps

After successful setup:

1. **Review Documentation**
   - [PHASE17_OPERATIONS.md](./PHASE17_OPERATIONS.md) - Full operational guide
   - [PHASE17_QUICK_REFERENCE.md](./PHASE17_QUICK_REFERENCE.md) - Quick commands

2. **Plan Operations**
   - Schedule regular status checks
   - Plan branch cleanup operations
   - Review workflow standardization needs

3. **Monitor and Maintain**
   - Check daily automated runs
   - Review artifacts weekly
   - Address warnings promptly
   - Keep token updated (before expiration)

---

## Support Resources

- **Documentation**
  - [Phase 17 Operations Guide](./PHASE17_OPERATIONS.md)
  - [Quick Reference](./PHASE17_QUICK_REFERENCE.md)
  - [AI Agents Documentation](./AI_AGENTS.md)

- **GitHub Resources**
  - [GitHub Actions Documentation](https://docs.github.com/en/actions)
  - [Managing Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
  - [GitHub CLI Manual](https://cli.github.com/manual/)

- **Getting Help**
  - Check workflow logs in Actions tab
  - Review generated artifacts
  - Contact repository maintainers
  - Check GitHub status: https://www.githubstatus.com/

---

**Setup Complete!** 🚀

Phase 17 is now configured and ready for operations. The system will automatically run status checks daily, and you can manually trigger operations as needed.

---

**Last Updated**: 2025-12-27  
**Version**: 1.0  
**Status**: ✅ Production Ready
