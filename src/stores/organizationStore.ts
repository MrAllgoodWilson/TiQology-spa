import { create } from 'zustand';
import { getOrganizations, getOrganization } from '../services/apiClient';
<<<<<<< HEAD

const isDevelopment = import.meta.env.MODE === 'development';

function logDev(...args: unknown[]) {
  if (isDevelopment) {
    console.log('[OrganizationStore]', ...args);
  }
}

function logErrorDev(...args: unknown[]) {
  if (isDevelopment) {
    console.error('[OrganizationStore]', ...args);
  }
}
=======
>>>>>>> origin/main

export interface Organization {
  id: string;
  name: string;
  organization_type: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  logo_url: string;
  region_key: string;
  active: boolean;
  residency: string;
  plan: string;
  memberCount: number;
}

interface OrganizationState {
  organizations: Organization[];
  organization: Organization | null;
  selectedOrganization: Organization | null;
<<<<<<< HEAD
  isLoading: boolean;
=======
  loading: boolean;
>>>>>>> origin/main
  error: string | null;
  setOrganizations: (organizations: Organization[]) => void;
  selectOrganization: (organization: Organization) => void;
  addOrganization: (organization: Organization) => void;
  fetchOrganizations: () => Promise<void>;
  fetchOrganization: (id: number) => Promise<void>;
  setOrganization: (organization: Organization) => void;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  organizations: [],
  organization: null,
  selectedOrganization: null,
<<<<<<< HEAD
  isLoading: false,
=======
  loading: false,
>>>>>>> origin/main
  error: null,
  setOrganizations: (organizations) => set({ organizations }),
  selectOrganization: (organization) => set({ selectedOrganization: organization }),
  addOrganization: (organization) =>
    set((state) => ({
      organizations: [...state.organizations, organization],
    })),
  fetchOrganizations: async () => {
<<<<<<< HEAD
    set({ isLoading: true, error: null });
    logDev('Fetching organizations...');
    try {
      const data = await getOrganizations();
      logDev('Organizations loaded:', data.organizations?.length, 'organizations');
      set({ organizations: data.organizations, isLoading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load organizations';
      logErrorDev('Organizations fetch error:', err);
      set({ organizations: [], isLoading: false, error: errorMessage });
    }
  },
  fetchOrganization: async (id: number) => {
    set({ isLoading: true, error: null });
    logDev(`Fetching organization ${id}...`);
    try {
      const data = await getOrganization(id);
      logDev('Organization loaded:', data.name);
      set({ organization: data, isLoading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load organization';
      logErrorDev('Organization fetch error:', err);
      set({ organization: null, isLoading: false, error: errorMessage });
=======
    set({ loading: true, error: null });
    try {
      const data = await getOrganizations();
      set({ organizations: data.organizations, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load organizations';
      console.error('Organizations fetch error:', errorMessage);
      set({ 
        organizations: [], 
        loading: false, 
        error: errorMessage 
      });
    }
  },
  fetchOrganization: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const data = await getOrganization(id);
      set({ organization: data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load organization';
      console.error('Organization fetch error:', errorMessage);
      set({ 
        organization: null, 
        loading: false, 
        error: errorMessage 
      });
>>>>>>> origin/main
    }
  },
  setOrganization: (organization) => set({ organization })
}));
