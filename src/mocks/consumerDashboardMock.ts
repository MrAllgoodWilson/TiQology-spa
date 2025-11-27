// Mock data for TiQology Consumer Home Dashboard

export interface HeroData {
  greeting: string;
  userName: string;
  subtitle: string;
  imageUrl?: string;
}

export interface AskKikiData {
  title: string;
  description: string;
  placeholder: string;
  suggestions: string[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  reward: string;
  deadline?: string;
}

export interface MissionsData {
  activeMissions: Mission[];
  completedCount: number;
}

export interface MoneySnapshot {
  totalBalance: number;
  currency: string;
  rewardsEarned: number;
  pendingRewards: number;
  monthlySpending: number;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route?: string;
  badge?: string;
}

export interface QuickActionsData {
  actions: QuickAction[];
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'event' | 'task' | 'reminder';
}

export interface UpcomingData {
  events: UpcomingEvent[];
}

export interface Alert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  actionLabel?: string;
}

export interface AlertsData {
  alerts: Alert[];
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  expiresAt: string;
  imageUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface DealsAndModulesData {
  deals: Deal[];
  modules: Module[];
}

// Mock Hero Data
export const mockHeroData: HeroData = {
  greeting: 'Welcome back',
  userName: 'Alex',
  subtitle: 'Your financial wellness journey continues!',
};

// Mock Ask Kiki Data
export const mockAskKikiData: AskKikiData = {
  title: 'Ask Kiki',
  description: 'Your AI-powered financial assistant',
  placeholder: 'Ask me anything about your finances...',
  suggestions: [
    'How can I save more money?',
    'What are my spending trends?',
    'Show me investment options',
    'Help me budget for next month',
  ],
};

// Mock Missions Data
export const mockMissionsData: MissionsData = {
  activeMissions: [
    {
      id: '1',
      title: 'Complete Your Profile',
      description: 'Add your personal information and preferences',
      progress: 75,
      reward: '50 points',
      deadline: '2025-11-20',
    },
    {
      id: '2',
      title: 'Link Your Bank Account',
      description: 'Connect your bank for automatic tracking',
      progress: 0,
      reward: '100 points',
      deadline: '2025-11-25',
    },
    {
      id: '3',
      title: 'Set Monthly Budget',
      description: 'Create your first budget to track spending',
      progress: 50,
      reward: '75 points',
    },
  ],
  completedCount: 5,
};

// Mock Money Snapshot Data
export const mockMoneySnapshot: MoneySnapshot = {
  totalBalance: 5432.75,
  currency: 'USD',
  rewardsEarned: 1250,
  pendingRewards: 150,
  monthlySpending: 2847.50,
};

// Mock Quick Actions Data
export const mockQuickActionsData: QuickActionsData = {
  actions: [
    {
      id: '1',
      label: 'Pay Bills',
      icon: '💳',
    },
    {
      id: '2',
      label: 'Transfer',
      icon: '💸',
    },
    {
      id: '3',
      label: 'Invest',
      icon: '📈',
      badge: 'New',
    },
    {
      id: '4',
      label: 'Budget',
      icon: '📊',
    },
    {
      id: '5',
      label: 'Rewards',
      icon: '🎁',
    },
    {
      id: '6',
      label: 'Support',
      icon: '💬',
    },
  ],
};

// Mock Upcoming Events Data
export const mockUpcomingData: UpcomingData = {
  events: [
    {
      id: '1',
      title: 'Credit Card Payment Due',
      date: '2025-11-18',
      time: '11:59 PM',
      type: 'task',
    },
    {
      id: '2',
      title: 'Monthly Budget Review',
      date: '2025-11-20',
      time: '09:00 AM',
      type: 'reminder',
    },
    {
      id: '3',
      title: 'Investment Webinar',
      date: '2025-11-22',
      time: '02:00 PM',
      type: 'event',
    },
  ],
};

// Mock Alerts Data
export const mockAlertsData: AlertsData = {
  alerts: [
    {
      id: '1',
      message: 'Your account balance is running low. Consider transferring funds.',
      type: 'warning',
      timestamp: '2025-11-16T08:00:00Z',
      actionLabel: 'Transfer Now',
    },
    {
      id: '2',
      message: 'You earned 50 reward points! Check your rewards dashboard.',
      type: 'success',
      timestamp: '2025-11-15T14:30:00Z',
      actionLabel: 'View Rewards',
    },
    {
      id: '3',
      message: 'New security features available. Update your settings.',
      type: 'info',
      timestamp: '2025-11-14T10:15:00Z',
      actionLabel: 'Learn More',
    },
  ],
};

// Mock Deals and Modules Data
export const mockDealsAndModulesData: DealsAndModulesData = {
  deals: [
    {
      id: '1',
      title: '20% Off Subscription',
      description: 'Upgrade to Premium and get 20% off for 3 months',
      discount: '20% OFF',
      expiresAt: '2025-11-30',
    },
    {
      id: '2',
      title: 'Cashback Bonus',
      description: 'Get 5% cashback on all purchases this month',
      discount: '5% CASHBACK',
      expiresAt: '2025-11-30',
    },
    {
      id: '3',
      title: 'Refer a Friend',
      description: 'Earn $50 when your friend signs up',
      discount: '$50 BONUS',
      expiresAt: '2025-12-31',
    },
  ],
  modules: [
    {
      id: '1',
      title: 'Budgeting Tools',
      description: 'Track and manage your spending',
      icon: '💰',
      isActive: true,
    },
    {
      id: '2',
      title: 'Investment Tracker',
      description: 'Monitor your portfolio performance',
      icon: '📊',
      isActive: true,
    },
    {
      id: '3',
      title: 'Bill Reminders',
      description: 'Never miss a payment',
      icon: '⏰',
      isActive: true,
    },
    {
      id: '4',
      title: 'Credit Score Monitor',
      description: 'Track your credit health',
      icon: '📈',
      isActive: false,
    },
  ],
};
