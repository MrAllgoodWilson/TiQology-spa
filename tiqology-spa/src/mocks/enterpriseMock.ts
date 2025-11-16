// Mock data for Enterprise Hub module

export interface Seat {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'pending' | 'inactive';
  lastActive: string;
}

export interface Playbook {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  status: 'published' | 'draft';
}

export interface EnterpriseData {
  orgSummary: {
    name: string;
    plan: string;
    totalSeats: number;
    usedSeats: number;
    activeUsers: number;
    departments: number;
  };
  billing: {
    currentPlan: string;
    billingCycle: string;
    nextBillingDate: string;
    amount: number;
    paymentMethod: string;
    status: 'active' | 'overdue' | 'pending';
  };
  usage: {
    apiCalls: {
      current: number;
      limit: number;
      percentage: number;
    };
    storage: {
      current: number;
      limit: number;
      percentage: number;
      unit: string;
    };
    bandwidth: {
      current: number;
      limit: number;
      percentage: number;
      unit: string;
    };
  };
  seats: Seat[];
  playbooks: Playbook[];
  support: {
    plan: string;
    responseTime: string;
    email: string;
    phone: string;
    availableHours: string;
    accountManager: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

export const enterpriseMockData: EnterpriseData = {
  orgSummary: {
    name: 'TiQology Enterprises Inc.',
    plan: 'Enterprise Pro',
    totalSeats: 50,
    usedSeats: 37,
    activeUsers: 34,
    departments: 5,
  },
  billing: {
    currentPlan: 'Enterprise Pro',
    billingCycle: 'Annual',
    nextBillingDate: '2026-03-15',
    amount: 24999,
    paymentMethod: 'Corporate Card •••• 4242',
    status: 'active',
  },
  usage: {
    apiCalls: {
      current: 847532,
      limit: 1000000,
      percentage: 85,
    },
    storage: {
      current: 245,
      limit: 500,
      percentage: 49,
      unit: 'GB',
    },
    bandwidth: {
      current: 1847,
      limit: 5000,
      percentage: 37,
      unit: 'GB',
    },
  },
  seats: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@tiqology.com',
      role: 'owner',
      department: 'Executive',
      status: 'active',
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@tiqology.com',
      role: 'admin',
      department: 'IT',
      status: 'active',
      lastActive: '30 minutes ago',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@tiqology.com',
      role: 'admin',
      department: 'Finance',
      status: 'active',
      lastActive: '1 hour ago',
    },
    {
      id: '4',
      name: 'James Williams',
      email: 'james.williams@tiqology.com',
      role: 'user',
      department: 'Sales',
      status: 'active',
      lastActive: '5 hours ago',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@tiqology.com',
      role: 'user',
      department: 'Marketing',
      status: 'active',
      lastActive: '15 minutes ago',
    },
    {
      id: '6',
      name: 'David Kim',
      email: 'david.kim@tiqology.com',
      role: 'user',
      department: 'Engineering',
      status: 'active',
      lastActive: '3 hours ago',
    },
    {
      id: '7',
      name: 'Jennifer Martinez',
      email: 'jennifer.martinez@tiqology.com',
      role: 'user',
      department: 'HR',
      status: 'pending',
      lastActive: 'Never',
    },
    {
      id: '8',
      name: 'Robert Taylor',
      email: 'robert.taylor@tiqology.com',
      role: 'user',
      department: 'Sales',
      status: 'inactive',
      lastActive: '30 days ago',
    },
  ],
  playbooks: [
    {
      id: '1',
      title: 'Employee Onboarding Guide',
      description: 'Complete guide for onboarding new team members to the TiQology platform',
      category: 'HR',
      lastUpdated: '2025-11-10',
      status: 'published',
    },
    {
      id: '2',
      title: 'Security Best Practices',
      description: 'Security guidelines and best practices for enterprise users',
      category: 'Security',
      lastUpdated: '2025-11-12',
      status: 'published',
    },
    {
      id: '3',
      title: 'API Integration Handbook',
      description: 'Step-by-step guide for integrating TiQology APIs with enterprise systems',
      category: 'Technical',
      lastUpdated: '2025-11-08',
      status: 'published',
    },
    {
      id: '4',
      title: 'Financial Reporting Standards',
      description: 'Enterprise-wide standards for financial reporting and analytics',
      category: 'Finance',
      lastUpdated: '2025-11-05',
      status: 'published',
    },
    {
      id: '5',
      title: 'Incident Response Protocol',
      description: 'Emergency procedures and escalation guidelines',
      category: 'Security',
      lastUpdated: '2025-11-14',
      status: 'draft',
    },
  ],
  support: {
    plan: 'Premium Enterprise Support',
    responseTime: '< 2 hours',
    email: 'enterprise-support@tiqology.com',
    phone: '+1 (555) 123-4567',
    availableHours: '24/7',
    accountManager: {
      name: 'Alex Thompson',
      email: 'alex.thompson@tiqology.com',
      phone: '+1 (555) 987-6543',
    },
  },
};
