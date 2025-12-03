import { create } from 'zustand';
import { getOrganizations, getOrganization } from '../services/apiClient';

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
  loading: boolean;
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
  loading: false,
  error: null,
  setOrganizations: (organizations) => set({ organizations }),
  selectOrganization: (organization) => set({ selectedOrganization: organization }),
  addOrganization: (organization) =>
    set((state) => ({
      organizations: [...state.organizations, organization],
    })),
  fetchOrganizations: async () => {
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
    }
  },
  setOrganization: (organization) => set({ organization })
}));
