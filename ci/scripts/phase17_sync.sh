#!/bin/bash

# Phase 17 Repository Sync Script
# Coordinates operations across multiple MrAllgoodWilson repositories
# Part of TiQology Operational Network

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
OPERATION_NETWORK="TiQology-Operational-Network"
ROCKET_AGENT="Rocket-AI-Deployment"
DEVIN_AGENT="Devin-AI-Engineering"
PHASE="17"

echo -e "${BLUE}🚀 Phase 17 Repository Sync Script${NC}"
echo "===================================="
echo "Network: $OPERATION_NETWORK"
echo "Agents: $ROCKET_AGENT (Primary) + $DEVIN_AGENT (Secondary)"
echo ""

# Function to print status messages
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    print_error "Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

print_status "GitHub CLI authenticated"

# Get list of repositories
OWNER="MrAllgoodWilson"
print_info "Fetching repositories for $OWNER..."

# List all repos (you can filter this as needed)
REPOS=$(gh repo list "$OWNER" --json name --jq '.[].name' --limit 100)

if [ -z "$REPOS" ]; then
    print_error "No repositories found for $OWNER"
    exit 1
fi

REPO_COUNT=$(echo "$REPOS" | wc -l)
print_status "Found $REPO_COUNT repositories"

# Operation to perform (default: status_check)
OPERATION="${1:-status_check}"
DRY_RUN="${2:-true}"

print_info "Operation: $OPERATION"
print_info "Dry Run Mode: $DRY_RUN"
echo ""

# Function to check if repo has Phase 17 workflow
check_workflow() {
    local repo=$1
    local has_workflow=false
    
    # Check if phase17_authorization.yml exists
    if gh api "/repos/$OWNER/$repo/contents/.github/workflows/phase17_authorization.yml" &> /dev/null; then
        has_workflow=true
    fi
    
    echo "$has_workflow"
}

# Function to trigger workflow in a repository
trigger_workflow() {
    local repo=$1
    local operation=$2
    local dry_run=$3
    
    print_info "Triggering workflow in $repo..."
    
    # Trigger the workflow
    if gh workflow run phase17_authorization.yml \
        --repo "$OWNER/$repo" \
        -f operation="$operation" \
        -f dry_run="$dry_run" 2>/dev/null; then
        print_status "Workflow triggered in $repo"
        return 0
    else
        print_warning "Could not trigger workflow in $repo (workflow may not exist)"
        return 1
    fi
}

# Function to check workflow status
check_workflow_status() {
    local repo=$1
    
    # Get latest workflow run for phase17_authorization
    local status=$(gh run list \
        --repo "$OWNER/$repo" \
        --workflow=phase17_authorization.yml \
        --limit 1 \
        --json status,conclusion \
        --jq '.[0] | "\(.status):\(.conclusion)"' 2>/dev/null || echo "none")
    
    echo "$status"
}

# Initialize counters
TRIGGERED=0
SKIPPED=0
FAILED=0

# Results file
RESULTS_FILE="sync_results_$(date +%Y%m%d_%H%M%S).txt"
echo "Phase 17 Repository Sync Results" > "$RESULTS_FILE"
echo "=================================" >> "$RESULTS_FILE"
echo "Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")" >> "$RESULTS_FILE"
echo "Operation: $OPERATION" >> "$RESULTS_FILE"
echo "Dry Run: $DRY_RUN" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"
echo "Results:" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"

# Process each repository
for repo in $REPOS; do
    echo "---"
    print_info "Processing: $repo"
    
    # Check if workflow exists
    HAS_WORKFLOW=$(check_workflow "$repo")
    
    if [ "$HAS_WORKFLOW" = "true" ]; then
        print_status "Phase 17 workflow found"
        
        # Trigger the workflow
        if trigger_workflow "$repo" "$OPERATION" "$DRY_RUN"; then
            TRIGGERED=$((TRIGGERED + 1))
            echo "✓ $repo - Workflow triggered" >> "$RESULTS_FILE"
        else
            FAILED=$((FAILED + 1))
            echo "✗ $repo - Workflow trigger failed" >> "$RESULTS_FILE"
        fi
    else
        print_warning "Phase 17 workflow not found, skipping"
        SKIPPED=$((SKIPPED + 1))
        echo "⊘ $repo - Workflow not present" >> "$RESULTS_FILE"
    fi
    
    # Small delay to avoid rate limiting
    sleep 1
done

echo ""
echo "=================================="
echo -e "${GREEN}Sync Complete${NC}"
echo "=================================="
echo ""
echo "Summary:"
echo "  Total Repositories: $REPO_COUNT"
echo "  Workflows Triggered: $TRIGGERED"
echo "  Skipped (no workflow): $SKIPPED"
echo "  Failed: $FAILED"
echo ""
echo "Results saved to: $RESULTS_FILE"
echo ""

# Append summary to results file
echo "" >> "$RESULTS_FILE"
echo "Summary:" >> "$RESULTS_FILE"
echo "  Total Repositories: $REPO_COUNT" >> "$RESULTS_FILE"
echo "  Workflows Triggered: $TRIGGERED" >> "$RESULTS_FILE"
echo "  Skipped (no workflow): $SKIPPED" >> "$RESULTS_FILE"
echo "  Failed: $FAILED" >> "$RESULTS_FILE"

# Check status of triggered workflows (optional)
if [ $TRIGGERED -gt 0 ]; then
    echo ""
    print_info "Checking workflow status (30 second delay)..."
    sleep 30
    
    echo "" >> "$RESULTS_FILE"
    echo "Workflow Status Check:" >> "$RESULTS_FILE"
    
    for repo in $REPOS; do
        HAS_WORKFLOW=$(check_workflow "$repo")
        if [ "$HAS_WORKFLOW" = "true" ]; then
            STATUS=$(check_workflow_status "$repo")
            if [ "$STATUS" != "none" ]; then
                echo "  $repo: $STATUS" >> "$RESULTS_FILE"
                print_info "$repo: $STATUS"
            fi
        fi
    done
fi

echo ""
print_status "Phase 17 repository sync completed"
echo ""
echo "To view detailed results:"
echo "  cat $RESULTS_FILE"
echo ""
echo "To check individual repository workflows:"
echo "  gh run list --repo $OWNER/<repo-name> --workflow=phase17_authorization.yml"
echo ""
