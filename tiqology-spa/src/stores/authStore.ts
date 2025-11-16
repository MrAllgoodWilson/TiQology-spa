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
  isEnterpriseAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // Mock login - in real app this would call an API
    // Password validation would happen here
    // Demo: users with "security" in email get security role
    // Demo: users with "owner" or "admin" in email get enterprise access
    const isSecurity = email.toLowerCase().includes('security');
    const isOwner = email.toLowerCase().includes('owner');
    const isAdmin = email.toLowerCase().includes('admin');
    
    const roles = ['user'];
    if (isSecurity) roles.push('security');
    if (isOwner) roles.push('owner');
    if (isAdmin && !isOwner) roles.push('admin');
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      roles,
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
  isEnterpriseAdmin: () => {
    const { hasRole } = get();
    return hasRole('owner') || hasRole('admin');
  },
}));
