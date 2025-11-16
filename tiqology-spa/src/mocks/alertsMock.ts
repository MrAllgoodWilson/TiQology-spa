// Mock data for Alerts & Notifications Center

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'system' | 'payment' | 'security' | 'mission' | 'social';
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

export interface AlertFilters {
  categories: string[];
  types: string[];
  readStatus: string[];
}

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Payment Successful',
    message: 'Your payment of $250.00 to Electric Company has been processed successfully.',
    type: 'success',
    category: 'payment',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionLabel: 'View Receipt',
    actionUrl: '/transactions/1',
  },
  {
    id: '2',
    title: 'Security Alert',
    message: 'New login detected from Chrome on Windows in New York, NY',
    type: 'warning',
    category: 'security',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionLabel: 'Review',
    actionUrl: '/security/sessions',
  },
  {
    id: '3',
    title: 'Mission Completed',
    message: 'Congratulations! You completed "First Investment" mission and earned 500 TiQ points!',
    type: 'success',
    category: 'mission',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionLabel: 'Claim Reward',
    actionUrl: '/missions',
  },
  {
    id: '4',
    title: 'Bill Due Soon',
    message: 'Your Internet Service bill of $89.99 is due in 3 days.',
    type: 'warning',
    category: 'payment',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionLabel: 'Pay Now',
    actionUrl: '/bills/internet',
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM EST. Some services may be unavailable.',
    type: 'info',
    category: 'system',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: '6',
    title: 'New Friend Request',
    message: 'Sarah Johnson wants to connect with you on TiQology.',
    type: 'info',
    category: 'social',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionLabel: 'View Profile',
    actionUrl: '/social/users/sarah-johnson',
  },
  {
    id: '7',
    title: 'Password Change Required',
    message: 'For security reasons, please update your password. It has been 90 days since your last change.',
    type: 'error',
    category: 'security',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionLabel: 'Update Password',
    actionUrl: '/settings/security',
  },
  {
    id: '8',
    title: 'Investment Update',
    message: 'Your portfolio has increased by 3.2% this week. Great job!',
    type: 'success',
    category: 'payment',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: '9',
    title: 'New Feature Available',
    message: 'Check out our new TrustShield security module to protect your account.',
    type: 'info',
    category: 'system',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionLabel: 'Learn More',
    actionUrl: '/trustshield',
  },
];

export const mockAlertFilters: AlertFilters = {
  categories: ['all', 'system', 'payment', 'security', 'mission', 'social'],
  types: ['all', 'info', 'success', 'warning', 'error'],
  readStatus: ['all', 'unread', 'read'],
};
