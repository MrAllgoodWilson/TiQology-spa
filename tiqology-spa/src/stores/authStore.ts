import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
  isSecurity: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // Mock login - in real app this would call an API
    // Password validation would happen here
    // Demo: users with "security" in email get security role
    const isSecurity = email.toLowerCase().includes('security');
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      roles: isSecurity ? ['user', 'security', 'admin'] : ['user'],
    };
    // In production: validate password against backend
    console.log('Mock login with password:', password ? '***' : '');
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  hasRole: (role: string) => {
    const { user } = get();
    return user?.roles?.includes(role) ?? false;
  },
  isSecurity: () => {
    const { hasRole } = get();
    return hasRole('security');
  },
}));
