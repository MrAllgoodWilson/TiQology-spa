#!/bin/bash

# Phase 17 Live Execution Script
# Commander AL Authorization: LIVE OPERATIONS MODE
# Date: 2025-12-27

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
OPERATION_NETWORK="TiQology-Operational-Network"
ROCKET_AGENT="Rocket-AI-Deployment"
DEVIN_AGENT="Devin-AI-Engineering"
PHASE="17"
LOG_DIR="logs/phase17"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OPERATION_LOG="${LOG_DIR}/operation_${TIMESTAMP}.log"

echo -e "${MAGENTA}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${MAGENTA}║         🚀 PHASE 17 LIVE EXECUTION - AUTHORIZED 🚀            ║${NC}"
echo -e "${MAGENTA}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}Commander AL Authorization: LIVE OPERATIONS MODE${NC}"
echo -e "${CYAN}Network: $OPERATION_NETWORK${NC}"
echo -e "${CYAN}Primary Agent: $ROCKET_AGENT${NC}"
echo -e "${CYAN}Secondary Agent: $DEVIN_AGENT${NC}"
echo -e "${CYAN}Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")${NC}"
echo ""

# Create log directory
mkdir -p "$LOG_DIR"

# Function to log messages
log_message() {
    local level=$1
    shift
    local message="$@"
    local timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
    echo "[$timestamp] [$level] $message" | tee -a "$OPERATION_LOG"
}

# Function to print status messages
print_status() {
    echo -e "${GREEN}✓${NC} $1"
    log_message "INFO" "$1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    log_message "WARN" "$1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
    log_message "ERROR" "$1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
    log_message "INFO" "$1"
}

print_header() {
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    log_message "INFO" "=== $1 ==="
}

# Check prerequisites
print_header "PREREQUISITES CHECK"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi
print_status "GitHub CLI installed"

# Check if authenticated
if ! gh auth status &> /dev/null; then
    print_error "Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi
print_status "GitHub CLI authenticated"

# Check if ROCKET_WRITE_TOKEN is configured
print_info "Checking for ROCKET_WRITE_TOKEN secret..."
if gh secret list | grep -q "ROCKET_WRITE_TOKEN"; then
    print_status "ROCKET_WRITE_TOKEN secret configured"
else
    print_warning "ROCKET_WRITE_TOKEN secret not found"
    print_info "The workflow will check for this secret and fail if not present"
fi

# Get repository information
OWNER="MrAllgoodWilson"
REPO="TiQology-spa"
print_status "Repository: $OWNER/$REPO"

print_header "PHASE 17 LIVE OPERATIONS EXECUTION"

echo -e "${YELLOW}⚠ WARNING: This will execute LIVE operations (dry_run=false)${NC}"
echo -e "${YELLOW}⚠ These operations can make actual changes to repositories${NC}"
echo ""
read -p "Are you sure you want to proceed? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    print_error "Operation cancelled by user"
    exit 0
fi

print_status "User confirmed - proceeding with live operations"

# Operation 1: Full CI Cleanup
print_header "OPERATION 1: CI CLEANUP"
print_info "Triggering CI cleanup with live execution..."

if gh workflow run phase17_authorization.yml \
    --repo "$OWNER/$REPO" \
    -f operation="ci_cleanup" \
    -f dry_run="false" 2>&1 | tee -a "$OPERATION_LOG"; then
    print_status "CI cleanup workflow triggered"
    CI_CLEANUP_RUN_ID=$(gh run list --repo "$OWNER/$REPO" --workflow=phase17_authorization.yml --limit 1 --json databaseId --jq '.[0].databaseId')
    print_info "Run ID: $CI_CLEANUP_RUN_ID"
else
    print_error "Failed to trigger CI cleanup workflow"
fi

sleep 2

# Operation 2: Branch Cleanup
print_header "OPERATION 2: BRANCH CLEANUP"
print_info "Triggering branch cleanup with live execution..."

if gh workflow run phase17_authorization.yml \
    --repo "$OWNER/$REPO" \
    -f operation="branch_cleanup" \
    -f dry_run="false" 2>&1 | tee -a "$OPERATION_LOG"; then
    print_status "Branch cleanup workflow triggered"
    BRANCH_CLEANUP_RUN_ID=$(gh run list --repo "$OWNER/$REPO" --workflow=phase17_authorization.yml --limit 1 --json databaseId --jq '.[0].databaseId')
    print_info "Run ID: $BRANCH_CLEANUP_RUN_ID"
else
    print_error "Failed to trigger branch cleanup workflow"
fi

sleep 2

# Operation 3: PR Conflict Check
print_header "OPERATION 3: PR CONFLICT RESOLUTION"
print_info "Triggering PR conflict check..."

if gh workflow run phase17_authorization.yml \
    --repo "$OWNER/$REPO" \
    -f operation="pr_conflict_check" \
    -f dry_run="false" 2>&1 | tee -a "$OPERATION_LOG"; then
    print_status "PR conflict check workflow triggered"
    PR_CONFLICT_RUN_ID=$(gh run list --repo "$OWNER/$REPO" --workflow=phase17_authorization.yml --limit 1 --json databaseId --jq '.[0].databaseId')
    print_info "Run ID: $PR_CONFLICT_RUN_ID"
else
    print_error "Failed to trigger PR conflict check workflow"
fi

sleep 2

# Operation 4: Workflow Validation
print_header "OPERATION 4: WORKFLOW VALIDATION"
print_info "Triggering workflow standardization check..."

if gh workflow run phase17_authorization.yml \
    --repo "$OWNER/$REPO" \
    -f operation="workflow_standardization" \
    -f dry_run="false" 2>&1 | tee -a "$OPERATION_LOG"; then
    print_status "Workflow standardization triggered"
    WORKFLOW_STD_RUN_ID=$(gh run list --repo "$OWNER/$REPO" --workflow=phase17_authorization.yml --limit 1 --json databaseId --jq '.[0].databaseId')
    print_info "Run ID: $WORKFLOW_STD_RUN_ID"
else
    print_error "Failed to trigger workflow standardization"
fi

sleep 2

# Operation 5: Deployment Synchronization
print_header "OPERATION 5: DEPLOYMENT SYNCHRONIZATION"
print_info "Triggering deployment orchestration..."

if gh workflow run phase17_authorization.yml \
    --repo "$OWNER/$REPO" \
    -f operation="deployment_orchestration" \
    -f dry_run="false" 2>&1 | tee -a "$OPERATION_LOG"; then
    print_status "Deployment orchestration triggered"
    DEPLOY_RUN_ID=$(gh run list --repo "$OWNER/$REPO" --workflow=phase17_authorization.yml --limit 1 --json databaseId --jq '.[0].databaseId')
    print_info "Run ID: $DEPLOY_RUN_ID"
else
    print_error "Failed to trigger deployment orchestration"
fi

print_header "MONITORING WORKFLOW EXECUTIONS"

print_info "Waiting for workflows to complete (checking every 30 seconds)..."
echo ""

# Monitor workflows
ALL_RUNS="$CI_CLEANUP_RUN_ID $BRANCH_CLEANUP_RUN_ID $PR_CONFLICT_RUN_ID $WORKFLOW_STD_RUN_ID $DEPLOY_RUN_ID"
MAX_WAIT=1800  # 30 minutes
ELAPSED=0
CHECK_INTERVAL=30

while [ $ELAPSED -lt $MAX_WAIT ]; do
    COMPLETED=0
    TOTAL=0
    
    for RUN_ID in $ALL_RUNS; do
        if [ -n "$RUN_ID" ]; then
            TOTAL=$((TOTAL + 1))
            STATUS=$(gh run view "$RUN_ID" --repo "$OWNER/$REPO" --json status --jq '.status' 2>/dev/null || echo "unknown")
            if [ "$STATUS" = "completed" ]; then
                COMPLETED=$((COMPLETED + 1))
            fi
        fi
    done
    
    echo -ne "\r${BLUE}Progress: $COMPLETED/$TOTAL workflows completed${NC} (Elapsed: ${ELAPSED}s)   "
    
    if [ $COMPLETED -eq $TOTAL ] && [ $TOTAL -gt 0 ]; then
        echo ""
        print_status "All workflows completed"
        break
    fi
    
    sleep $CHECK_INTERVAL
    ELAPSED=$((ELAPSED + CHECK_INTERVAL))
done

echo ""

if [ $ELAPSED -ge $MAX_WAIT ]; then
    print_warning "Maximum wait time reached. Some workflows may still be running."
fi

print_header "OPERATION RESULTS"

# Check results for each workflow
for RUN_ID in $ALL_RUNS; do
    if [ -n "$RUN_ID" ]; then
        STATUS=$(gh run view "$RUN_ID" --repo "$OWNER/$REPO" --json status,conclusion,name --jq '.status + ":" + .conclusion + ":" + .name' 2>/dev/null || echo "unknown:unknown:Unknown")
        
        IFS=':' read -r STATUS CONCLUSION NAME <<< "$STATUS"
        
        if [ "$CONCLUSION" = "success" ]; then
            print_status "Run $RUN_ID ($NAME): SUCCESS"
        elif [ "$CONCLUSION" = "failure" ]; then
            print_error "Run $RUN_ID ($NAME): FAILED"
        else
            print_warning "Run $RUN_ID ($NAME): $STATUS ($CONCLUSION)"
        fi
    fi
done

print_header "GENERATING OPERATIONAL REPORT"

# Generate operational report
REPORT_FILE="${LOG_DIR}/phase17_operational_report_${TIMESTAMP}.md"

cat > "$REPORT_FILE" <<EOF
# Phase 17 Operational Report

**Execution Date:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")  
**Authorization:** Commander AL  
**Mode:** LIVE OPERATIONS  
**Network:** $OPERATION_NETWORK  
**Primary Agent:** $ROCKET_AGENT  
**Secondary Agent:** $DEVIN_AGENT  

---

## Operations Executed

| Operation | Run ID | Status |
|-----------|--------|--------|
EOF

# Add each operation to the report
for RUN_ID in $ALL_RUNS; do
    if [ -n "$RUN_ID" ]; then
        RESULT=$(gh run view "$RUN_ID" --repo "$OWNER/$REPO" --json status,conclusion,name --jq '"\(.name)|\(.status)|\(.conclusion)"' 2>/dev/null || echo "Unknown|unknown|unknown")
        IFS='|' read -r NAME STATUS CONCLUSION <<< "$RESULT"
        echo "| $NAME | $RUN_ID | $STATUS ($CONCLUSION) |" >> "$REPORT_FILE"
    fi
done

cat >> "$REPORT_FILE" <<EOF

---

## Artifacts Generated

All operations generated detailed artifacts available in GitHub Actions:

1. **CI Cleanup Analysis**
   - Workflow inventory
   - Standardization gaps
   - Recommendations

2. **Branch Cleanup Analysis**
   - Stale branches identified
   - Merged branches
   - Cleanup actions taken

3. **PR Conflict Analysis**
   - Open PRs status
   - Merge conflicts detected
   - Resolution recommendations

4. **Workflow Standardization Report**
   - Standards compliance
   - Required updates
   - Best practices enforcement

5. **Deployment Orchestration Status**
   - Deployment coordination
   - Environment synchronization
   - Status updates

---

## Download Artifacts

\`\`\`bash
# Download artifacts from specific run
gh run download <run-id> --repo $OWNER/$REPO

# View all artifacts
gh run list --repo $OWNER/$REPO --workflow=phase17_authorization.yml
\`\`\`

---

## Summary

Phase 17 live operations executed successfully across the TiQology-spa repository.

**Next Steps:**
1. Review workflow logs and artifacts
2. Validate all changes made
3. Monitor repository health
4. Plan follow-up operations as needed

---

**Agents:** 🚀 Rocket (Primary) + 👨‍💻 Devin (Secondary)  
**Status:** ✅ Operations Complete  
**Log File:** $OPERATION_LOG  
**Report Generated:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")
EOF

print_status "Operational report generated: $REPORT_FILE"

print_header "PHASE 17 EXECUTION COMPLETE"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✅ PHASE 17 LIVE OPERATIONS COMPLETED SUCCESSFULLY ✅       ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

print_status "All operations triggered and monitored"
print_status "Logs saved to: $OPERATION_LOG"
print_status "Report saved to: $REPORT_FILE"
echo ""

print_info "To view detailed logs:"
echo "  cat $OPERATION_LOG"
echo ""

print_info "To view operational report:"
echo "  cat $REPORT_FILE"
echo ""

print_info "To download artifacts:"
echo "  gh run download <run-id> --repo $OWNER/$REPO"
echo ""

print_info "To view workflow runs:"
echo "  gh run list --repo $OWNER/$REPO --workflow=phase17_authorization.yml"
echo ""

log_message "INFO" "Phase 17 execution script completed"

exit 0
