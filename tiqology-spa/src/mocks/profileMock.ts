// Mock data for Profile Page

export interface ProfileSummary {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  memberSince: string;
  accountType: string;
  tiQPoints: number;
  level: number;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showActivity: boolean;
    shareData: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
  timezone: string;
}

export interface ProfileData {
  summary: ProfileSummary;
  preferences: UserPreferences;
}

export const mockProfileData: ProfileData = {
  summary: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    memberSince: '2023-01-15',
    accountType: 'Premium',
    tiQPoints: 15420,
    level: 7,
  },
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisible: true,
      showActivity: true,
      shareData: false,
    },
    theme: 'auto',
    language: 'en-US',
    currency: 'USD',
    timezone: 'America/New_York',
  },
};
