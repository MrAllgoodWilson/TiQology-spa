import { create } from 'zustand';

export interface Organization {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

interface OrganizationState {
  organizations: Organization[];
  selectedOrganization: Organization | null;
  setOrganizations: (organizations: Organization[]) => void;
  selectOrganization: (organization: Organization) => void;
  addOrganization: (organization: Organization) => void;
}

// Mock data
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    description: 'Leading provider of innovative solutions',
    memberCount: 150,
  },
  {
    id: '2',
    name: 'Tech Innovators Inc',
    description: 'Building the future of technology',
    memberCount: 75,
  },
  {
    id: '3',
    name: 'Global Services Ltd',
    description: 'Worldwide service excellence',
    memberCount: 200,
  },
];

export const useOrganizationStore = create<OrganizationState>((set) => ({
  organizations: mockOrganizations,
  selectedOrganization: null,
  setOrganizations: (organizations) => set({ organizations }),
  selectOrganization: (organization) => set({ selectedOrganization: organization }),
  addOrganization: (organization) =>
    set((state) => ({
      organizations: [...state.organizations, organization],
    })),
}));
