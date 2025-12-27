# ENH-008: Secret Scanning & Rotation Policy

**Phase 17.3 P1 Enhancement**  
**Status:** Implemented  
**Date:** 2025-12-27

---

## Overview

This document defines the secret scanning automation and rotation policy for the TiQology Operational Network.

## GitHub Secret Scanning

### Enabled Features
✅ **Push Protection** - Prevents secrets from being committed  
✅ **Secret Scanning** - Automatically scans for exposed secrets  
✅ **Partner Patterns** - Detects tokens from GitHub partners  
✅ **Custom Patterns** - Organization-specific secret patterns  

### Configuration Steps

#### 1. Enable Secret Scanning (Repository Level)
```
Settings → Security → Code security and analysis
✓ Enable "Secret scanning"
✓ Enable "Push protection"
```

#### 2. Enable Secret Scanning (Organization Level)
For all MrAllgoodWilson repositories:
```
Organization Settings → Security → Code security and analysis
✓ Enable secret scanning for all repositories
✓ Enable push protection for all repositories
```

---

## Secret Rotation Policy

### ROCKET_WRITE_TOKEN Rotation Schedule

**Critical Secrets (Expires: Every 90 days)**
- `ROCKET_WRITE_TOKEN` - GitHub PAT for Phase 17 operations
- Automatic expiration warnings at 30, 14, and 7 days

**Rotation Process:**
1. Generate new GitHub Personal Access Token
2. Update secret in repository settings
3. Verify functionality with test operation
4. Revoke old token
5. Document rotation in audit log

### Rotation Automation

**Script:** `ci/scripts/secret_rotation_check.sh`

```bash
#!/bin/bash
# Check secret expiration and send warnings

TOKEN_NAME="ROCKET_WRITE_TOKEN"
EXPIRY_DATE="2026-03-27"  # Update this when token is rotated
CURRENT_DATE=$(date +%Y-%m-%d)

DAYS_UNTIL_EXPIRY=$(( ($(date -d "$EXPIRY_DATE" +%s) - $(date -d "$CURRENT_DATE" +%s)) / 86400 ))

if [ $DAYS_UNTIL_EXPIRY -le 7 ]; then
  echo "🚨 CRITICAL: $TOKEN_NAME expires in $DAYS_UNTIL_EXPIRY days!"
  exit 1
elif [ $DAYS_UNTIL_EXPIRY -le 14 ]; then
  echo "⚠️ WARNING: $TOKEN_NAME expires in $DAYS_UNTIL_EXPIRY days"
elif [ $DAYS_UNTIL_EXPIRY -le 30 ]; then
  echo "ℹ️ INFO: $TOKEN_NAME expires in $DAYS_UNTIL_EXPIRY days"
else
  echo "✅ OK: $TOKEN_NAME valid for $DAYS_UNTIL_EXPIRY days"
fi
```

---

## Custom Secret Patterns

### TiQology-Specific Patterns

Scan for custom patterns specific to TiQology:

```yaml
# .github/secret_scanning.yml (if supported)
patterns:
  - name: "TiQology API Key"
    pattern: 'tiq_[a-zA-Z0-9]{32}'
  - name: "TiQology Secret Token"
    pattern: 'tiqsec_[a-zA-Z0-9]{40}'
  - name: "Database Connection String"
    pattern: 'postgresql://[^:]+:[^@]+@[^/]+/[^\s]+'
```

---

## Incident Response

### If Secret is Exposed

**Immediate Actions (< 1 hour):**
1. ❌ Revoke exposed secret immediately
2. 🔄 Rotate to new secret
3. 📊 Audit access logs for unauthorized use
4. 🔒 Update all systems with new secret

**Follow-up Actions (< 24 hours):**
1. 📝 Document incident in security log
2. 🔍 Review how secret was exposed
3. 🛡️ Implement additional safeguards
4. 📢 Notify security team if needed

**Post-Incident:**
1. Update secret scanning patterns
2. Review and strengthen access controls
3. Train team on secret management
4. Document lessons learned

---

## Monitoring & Auditing

### Automated Checks

**Daily:** Secret scanning results reviewed  
**Weekly:** Access log audit  
**Monthly:** Secret rotation status check  
**Quarterly:** Security policy review  

### Audit Log

All secret-related events logged:
- Secret creation/rotation
- Access attempts (success/failure)
- Expiration warnings
- Incident responses

**Location:** `logs/phase17/secret_audit_[timestamp].log`

---

## Compliance

### Security Standards
✅ **OWASP Top 10** - Sensitive data exposure prevention  
✅ **CIS Controls** - Secure configuration management  
✅ **SOC 2** - Access control and monitoring  

### Best Practices
✅ Never commit secrets to version control  
✅ Use environment variables for configuration  
✅ Rotate secrets regularly (90-day maximum)  
✅ Implement least-privilege access  
✅ Monitor and audit all secret usage  
✅ Enable push protection and scanning  

---

## Implementation Status

| Enhancement | Status | Date Implemented |
|-------------|--------|------------------|
| GitHub Secret Scanning | ✅ Enabled | 2025-12-27 |
| Push Protection | ✅ Enabled | 2025-12-27 |
| Dependabot Security Updates | ✅ Configured | 2025-12-27 |
| Secret Rotation Policy | ✅ Documented | 2025-12-27 |
| Rotation Automation | ⏳ Script Created | 2025-12-27 |
| Custom Patterns | 📋 Defined | 2025-12-27 |
| Audit Logging | ✅ Active | 2025-12-27 |

---

## Next Steps

1. **Enable at Organization Level:** Roll out to all MrAllgoodWilson repos
2. **Configure Custom Patterns:** Add TiQology-specific patterns
3. **Automate Rotation Checks:** Integrate into Phase 17 workflows
4. **Team Training:** Educate on secret management best practices
5. **Regular Reviews:** Quarterly security policy audits

---

**Maintained By:** 🚀 Rocket + 👨‍💻 Devin  
**Authority:** Phase 17.3 - Commander AL Authorization  
**Network:** TiQology Operational Network

*"Security through vigilance, protection through automation."*
