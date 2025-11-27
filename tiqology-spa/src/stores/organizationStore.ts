import axios from 'axios';
import { create } from 'zustand';
import { useAuthStore } from './authStore';

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
  setOrganizations: (organizations) => set({ organizations }),
  selectOrganization: (organization) => set({ selectedOrganization: organization }),
  addOrganization: (organization) =>
    set((state) => ({
      organizations: [...state.organizations, organization],
    })),
  fetchOrganizations: async () => {
    console.log(import.meta.env.VITE_API_BASE_URL);
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/organizations`, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }
    })
    set({ organizations: response.data.organizations })
  },
  fetchOrganization: async (id: number) => {
    console.log(import.meta.env.VITE_API_BASE_URL);
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/organizations/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }
    })
    set({ organization: response.data })
  },
  setOrganization: (organization) => set({ organization: organization })
}));
