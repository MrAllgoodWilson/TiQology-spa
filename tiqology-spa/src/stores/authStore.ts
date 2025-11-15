import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // Mock login - in real app this would call an API
    // Password validation would happen here
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    // In production: validate password against backend
    console.log('Mock login with password:', password ? '***' : '');
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
