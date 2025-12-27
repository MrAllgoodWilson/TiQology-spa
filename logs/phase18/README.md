# Phase 18 Logs Directory

This directory contains operational logs, reports, and data artifacts for Phase 18 (AI-Driven Autonomous Operations).

## Directory Structure

```
logs/phase18/
├── telemetry/          # Raw workflow execution data
├── metrics/            # Aggregated performance metrics
├── anomalies/          # Detected anomaly logs
├── models/             # ML model artifacts (Phase 18.2+)
├── dashboards/         # Visualization data
├── reports/            # Status and pipeline reports
├── processed/          # Structured telemetry (JSON)
├── aggregated/         # Daily/weekly summaries
└── ml_ready/           # Training datasets
```

## Phase 18.1: Telemetry Foundation (COMPLETE ✅)

**Deployment Date:** 2025-12-27 16:48:59 UTC  
**Status:** Operational (Shadow Mode)  
**Mode:** Non-intrusive parallel monitoring

### Available Logs

- `control_plane_[timestamp].log` - Control plane execution logs
- `pipeline_[timestamp].log` - Data pipeline processing logs
- `live_run_[timestamp].log` - Phase 18.1 deployment log
- `control_plane_status.json` - Real-time control plane status
- `PHASE18.1_TELEMETRY_REPORT.md` - Complete telemetry report

### Metrics Files

- `metrics/baseline_[timestamp].json` - Baseline repository metrics
- `aggregated/metrics_summary_[date].json` - Daily metric summaries
- `processed/phase17_historical.json` - Historical Phase 17 data
- `ml_ready/training_data_[date].json` - ML training dataset structure

### Reports

- `reports/pipeline_report_[timestamp].md` - Data pipeline status reports
- `PHASE18.1_TELEMETRY_REPORT.md` - Comprehensive telemetry report (16 KB)

## Data Retention

- **Telemetry Data:** 90 days (GitHub Actions artifacts)
- **Local Logs:** Permanent (excluded from git via .gitignore)
- **Status Reports:** Tracked in repository root

## Accessing Logs

### Local Access

```bash
# View control plane status
cat logs/phase18/control_plane_status.json

# View latest execution log
ls -lt logs/phase18/*.log | head -1

# View telemetry report
cat logs/phase18/PHASE18.1_TELEMETRY_REPORT.md
```

### GitHub Actions Artifacts

Telemetry data is also uploaded as GitHub Actions artifacts with 90-day retention:

```bash
# List artifacts
gh run list --workflow=phase18_telemetry.yml

# Download specific run artifacts
gh run download <run-id>
```

## Integration with Phase 17

Phase 18 logs integrate with Phase 17 operational logs for historical baseline and ML training data:

- Phase 17 readiness baseline: 92/100 (Grade A-)
- Phase 17 security score: 98/100
- Phase 17 performance improvement: 50%+

## Phase 18.2+ (Planned)

Future phases will add:
- ML model training logs (`models/`)
- Advanced anomaly detection reports (`anomalies/`)
- Performance dashboards (`dashboards/`)
- Predictive analytics data

## Documentation

For complete Phase 18 documentation, see:

- **PHASE18_PROPOSAL_DRAFT.md** - Complete Phase 18 scope and architecture (20 KB)
- **PHASE18_DEPLOYMENT_STRATEGY.md** - Deployment plan and safety procedures (22 KB)
- **PHASE18_CONTROL_PLANE_STATUS.md** - Real-time control plane status (16 KB)
- **logs/phase18/PHASE18.1_TELEMETRY_REPORT.md** - Telemetry deployment report (16 KB)

## Notes

- This directory is excluded from git via `.gitignore` (line 2: `logs`)
- Only this README and key reports in root are tracked
- Logs are preserved locally for audit and debugging
- GitHub Actions artifacts provide additional backup

---

**Phase 18.1 Status:** ✅ Operational (Shadow Mode)  
**Last Updated:** 2025-12-27 16:49:06 UTC  
**Managed By:** 🚀 Rocket + 👨‍💻 Devin
