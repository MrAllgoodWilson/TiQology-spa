import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin } from '../services/apiClient';

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  isSecurity: () => boolean;
  isEnterpriseAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: '',
      login: async (email: string, password: string) => {
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
        
        // const mockUser: User = {
        //   id: '1',
        //   email,
        //   name: email.split('@')[0],
        //   roles,
        // };
        const response = await apiLogin({ email, password });
        const { user, token } = response;

        // In production: validate password against backend
        // console.log('Mock login with password:', password ? '***' : '');
        localStorage.setItem('token', token);
        set({ user: user, isAuthenticated: true, token: token });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, token: null });
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
    }),{
      name: "session-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  ));
