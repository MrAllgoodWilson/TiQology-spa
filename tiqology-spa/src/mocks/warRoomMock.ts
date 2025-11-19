// Mock data for War Room Deployment Tracker Dashboard

export type ModuleStatus = 'Planned' | 'In Progress' | 'Live' | 'Needs Backend';

export interface WarRoomModule {
  id: string;
  name: string;
  description: string;
  route?: string;
  status: ModuleStatus;
  category: string;
}

export const mockWarRoomModules: WarRoomModule[] = [
  {
    id: 'consumer-dashboard',
    name: 'Consumer Dashboard',
    description: 'Main consumer home dashboard with financial wellness features, missions, and quick actions',
    route: '/dashboard',
    status: 'Live',
    category: 'Core',
  },
  {
    id: 'bookit',
    name: 'BookIt',
    description: 'Marketplace for browsing and booking professional services from verified providers',
    route: '/bookit',
    status: 'Live',
    category: 'Marketplace',
  },
  {
    id: 'money-engine',
    name: 'Money Engine 2.0',
    description: 'Advanced financial management and analytics engine for tracking income, expenses, and investments',
    route: undefined,
    status: 'Needs Backend',
    category: 'Finance',
  },
  {
    id: 'voice-engine',
    name: 'Voice Engine',
    description: 'AI-powered voice assistant for hands-free interaction and voice commands',
    route: undefined,
    status: 'Planned',
    category: 'AI',
  },
  {
    id: 'tqtv',
    name: 'TQTV',
    description: 'Video streaming platform for educational content, tutorials, and community events',
    route: undefined,
    status: 'In Progress',
    category: 'Media',
  },
  {
    id: 'creator-studio',
    name: 'Creator Studio',
    description: 'Content creation and publishing platform for TiQology creators and influencers',
    route: undefined,
    status: 'Planned',
    category: 'Content',
  },
  {
    id: 'quad-core',
    name: 'Quad-Core',
    description: 'Core infrastructure for multi-platform synchronization and data management',
    route: undefined,
    status: 'In Progress',
    category: 'Infrastructure',
  },
  {
    id: 'trustshield',
    name: 'TrustShield Lite',
    description: 'Security monitoring and threat management module with real-time alerts',
    route: '/trustshield',
    status: 'Live',
    category: 'Security',
  },
  {
    id: 'alerts-center',
    name: 'Alerts & Notifications Center',
    description: 'Centralized hub for viewing and managing all user notifications and alerts',
    route: '/alerts',
    status: 'Live',
    category: 'Core',
  },
  {
    id: 'profile-management',
    name: 'Profile Management',
    description: 'User profile and preferences management with gamification features',
    route: '/profile',
    status: 'Live',
    category: 'Core',
  },
  {
    id: 'organizations',
    name: 'Organizations',
    description: 'Multi-organization management and switching capabilities',
    route: '/organizations',
    status: 'Live',
    category: 'Core',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Dashboard',
    description: 'Enterprise-level analytics, billing, and team management features',
    route: '/enterprise',
    status: 'Live',
    category: 'Enterprise',
  },
  {
    id: 'kiki-ai',
    name: 'Ask Kiki AI Assistant',
    description: 'AI-powered financial assistant with contextual suggestions and smart recommendations',
    route: undefined,
    status: 'Needs Backend',
    category: 'AI',
  },
  {
    id: 'rewards-program',
    name: 'TiQ Rewards Program',
    description: 'Gamification system with points, levels, and reward redemption',
    route: undefined,
    status: 'In Progress',
    category: 'Gamification',
  },
  {
    id: 'social-hub',
    name: 'Social Hub',
    description: 'Community features including feeds, messaging, and social interactions',
    route: undefined,
    status: 'Planned',
    category: 'Social',
  },
];

export const getModulesByStatus = (status: ModuleStatus): WarRoomModule[] => {
  return mockWarRoomModules.filter(module => module.status === status);
};

export const getModulesByCategory = (category: string): WarRoomModule[] => {
  return mockWarRoomModules.filter(module => module.category === category);
};

export const getStatusCounts = () => {
  return {
    live: getModulesByStatus('Live').length,
    inProgress: getModulesByStatus('In Progress').length,
    planned: getModulesByStatus('Planned').length,
    needsBackend: getModulesByStatus('Needs Backend').length,
    total: mockWarRoomModules.length,
  };
};
