import { create } from "zustand";
import { getDashboardSnapshot } from "../services/apiClient";
import type { Organization } from "./organizationStore";

const isDevelopment = import.meta.env.MODE === 'development';

function logDev(...args: any[]) {
  if (isDevelopment) {
    console.log('[SnapshotStore]', ...args);
  }
}

function logErrorDev(...args: any[]) {
  if (isDevelopment) {
    console.error('[SnapshotStore]', ...args);
  }
}

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
  isLoading: boolean,
  error: string | null,
  setSnapshot: (snapshot: Snapshot) => void;
  fetchSnapshot: () => Promise<void>;
}

export const useSnapshotStore = create<SnapshotState>((set, get) => ({
  snapshot: null,
  isLoading: false,
  error: null,
  setSnapshot: (snapshot) => set({ snapshot: snapshot }),
  fetchSnapshot: async () => {
    // Prevent duplicate fetches
    if (get().isLoading) {
      logDev('Fetch already in progress, skipping...');
      return;
    }
    
    logDev('Fetching dashboard snapshot...');
    set({ isLoading: true, error: null });
    try {
      const data = await getDashboardSnapshot();
      logDev('Dashboard snapshot loaded successfully:', {
        organization: data.organization?.name,
        posts: data.posts?.length,
        events: data.events?.length,
        tasks: data.tasks?.length
      });
      set({ snapshot: data, isLoading: false, error: null });
    } catch (err) {
      logErrorDev('Dashboard fetch error:', err);
      let errorMessage = 'Failed to load dashboard data';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        // Check for common issues
        if (err.message.includes('fetch')) {
          errorMessage = 'Unable to connect to server. Please check your internet connection.';
        } else if (err.message.includes('401') || err.message.includes('Unauthorized')) {
          errorMessage = 'Your session has expired. Please log in again.';
        } else if (err.message.includes('404')) {
          errorMessage = 'Dashboard endpoint not found. The API may not be configured correctly.';
        } else if (err.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.';
        }
      }
      
      set({ snapshot: null, isLoading: false, error: errorMessage });
    }
  }
}))