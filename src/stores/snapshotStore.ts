import { create } from "zustand";
import { getDashboardSnapshot } from "../services/apiClient";
import type { Organization } from "./organizationStore";

export interface Task {
  id: number,
  organization_id: number,
  user_id: number,
  created_by_id: number,
  title: string,
  description: string,
  status: string,
  priority: string,
  due_date: string,
  completed_at: string,
}

export interface Event {
  id: number,
  organization_id: number,
  user_id: number,
  title: string, 
  description: string,
  start_time: string,
  end_time: string,
  timezone: string,
  location_name: string,
  location_address: string,
  event_type: string,
  capacity: number,
  attendees_count: number,
  public: boolean,
  registration_required: boolean,
}

export interface Post {
  id: number,
  organization_id: number,
  user_id: number,
  title: string,
  content: string,
  post_type: string,
  published: boolean,
  published_at: string,
  views_count: number,
  likes_count: number,
  comments_count: number,
}

export interface Snapshot {
  organization: Organization,
  posts: Post[],
  events: Event[],
  tasks: Task[]
}

interface SnapshotState {
  snapshot: Snapshot | null,
  loading: boolean;
  error: string | null;
  setSnapshot: (snapshot: Snapshot) => void;
  fetchSnapshot: () => Promise<void>;
}

export const useSnapshotStore = create<SnapshotState>((set) => ({
  snapshot: null,
  loading: false,
  error: null,
  setSnapshot: (snapshot) => set({ snapshot }),
  fetchSnapshot: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getDashboardSnapshot();
      set({ snapshot: data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard data';
      console.error('Dashboard fetch error:', errorMessage);
      
      // Fallback to mock data structure
      const mockSnapshot: Snapshot = {
        organization: {
          id: '0',
          name: 'Demo Organization',
          organization_type: 'consumer',
          description: 'Using fallback data - API unavailable',
          website: '',
          email: '',
          phone: '',
          logo_url: '',
          region_key: 'us',
          active: true,
          residency: 'us',
          plan: 'free',
          memberCount: 0
        },
        posts: [],
        events: [],
        tasks: []
      };
      
      set({ 
        snapshot: mockSnapshot, 
        loading: false, 
        error: `API Error: ${errorMessage}. Showing fallback data.` 
      });
    }
  }
}))