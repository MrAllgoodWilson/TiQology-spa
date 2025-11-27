import { create } from "zustand";
import axios from "axios";

import type { Organization } from "./organizationStore";
import { useAuthStore } from "./authStore";

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
  setSnapshot: (snapshot: Snapshot) => void;
  fetchSnapshot: () => Promise<void>;
}

export const useSnapshotStore = create<SnapshotState>((set) => ({
  snapshot: null,
  setSnapshot: (snapshot) => set({ snapshot: snapshot }),
  fetchSnapshot: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/dashboard/snapshot`, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }
    });
    // console.log(response.data);
    set({ snapshot: response.data });
  }
}))