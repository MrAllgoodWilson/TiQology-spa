import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin } from '../services/apiClient';

const isDevelopment = import.meta.env.MODE === 'development';

function logDev(...args: unknown[]) {
  if (isDevelopment) {
    console.log('[AuthStore]', ...args);
  }
}

function logErrorDev(...args: unknown[]) {
  if (isDevelopment) {
    console.error('[AuthStore]', ...args);
  }
}

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
        logDev('Attempting login for:', email);
        try {
          const response = await apiLogin({ email, password });
          const { user, token } = response;

          localStorage.setItem('token', token);
          logDev('Login successful:', user.email, 'Roles:', user.roles);
          set({ user: user, isAuthenticated: true, token: token });
        } catch (error) {
          logErrorDev('Login failed:', error);
          throw error;
        }
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
