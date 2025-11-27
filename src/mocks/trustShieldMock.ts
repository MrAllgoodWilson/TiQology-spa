// Mock data for TrustShield Lite Security Module

export interface SecuritySummary {
  overallScore: number;
  lastScan: string;
  activeThreats: number;
  resolvedThreats: number;
  recommendations: number;
}

export interface Threat {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'resolved';
  detectedAt: string;
  affectedArea: string;
  actionLabel?: string;
}

export interface SecurityInsight {
  id: string;
  title: string;
  description: string;
  category: 'authentication' | 'data-protection' | 'network' | 'device';
  icon: string;
  recommendation: string;
}

export interface TrustShieldData {
  summary: SecuritySummary;
  threats: Threat[];
  insights: SecurityInsight[];
}

export const mockTrustShieldData: TrustShieldData = {
  summary: {
    overallScore: 87,
    lastScan: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    activeThreats: 2,
    resolvedThreats: 15,
    recommendations: 3,
  },
  threats: [
    {
      id: 't1',
      title: 'Unusual Login Location',
      description: 'A login attempt was detected from an unfamiliar location: Moscow, Russia',
      severity: 'high',
      status: 'active',
      detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      affectedArea: 'Account Access',
      actionLabel: 'Review Login',
    },
    {
      id: 't2',
      title: 'Weak Password Detected',
      description: 'Your current password does not meet the recommended security standards',
      severity: 'medium',
      status: 'active',
      detectedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      affectedArea: 'Authentication',
      actionLabel: 'Update Password',
    },
    {
      id: 't3',
      title: 'Multiple Failed Login Attempts',
      description: '5 failed login attempts detected in the past 24 hours',
      severity: 'medium',
      status: 'investigating',
      detectedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      affectedArea: 'Account Security',
    },
    {
      id: 't4',
      title: 'Suspicious API Request',
      description: 'Unusual API activity detected - possible unauthorized access attempt',
      severity: 'critical',
      status: 'resolved',
      detectedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      affectedArea: 'API Security',
    },
    {
      id: 't5',
      title: 'Outdated Security Settings',
      description: 'Two-factor authentication is not enabled on your account',
      severity: 'high',
      status: 'resolved',
      detectedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      affectedArea: 'Account Protection',
    },
  ],
  insights: [
    {
      id: 'i1',
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      category: 'authentication',
      icon: '🔐',
      recommendation: 'Enable 2FA using an authenticator app or SMS to protect against unauthorized access',
    },
    {
      id: 'i2',
      title: 'Review Connected Devices',
      description: '8 devices are currently connected to your account',
      category: 'device',
      icon: '📱',
      recommendation: 'Review and remove any unfamiliar devices from your account',
    },
    {
      id: 'i3',
      title: 'Update Security Questions',
      description: 'Your security questions were set 2 years ago',
      category: 'authentication',
      icon: '❓',
      recommendation: 'Update your security questions to ensure account recovery options are current',
    },
    {
      id: 'i4',
      title: 'Data Backup Recommended',
      description: 'Regular backups help protect your important data',
      category: 'data-protection',
      icon: '💾',
      recommendation: 'Enable automatic backups of your account data and financial records',
    },
    {
      id: 'i5',
      title: 'VPN Usage Detected',
      description: 'Using a VPN adds an extra layer of privacy',
      category: 'network',
      icon: '🛡️',
      recommendation: 'Continue using VPN when accessing your account from public networks',
    },
  ],
};
