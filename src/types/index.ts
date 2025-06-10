import { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  openstackToken: string | null;
  selectedProjectId: string | null;
  userProjects: OpenStackProject[]; // List of projects the user has access to
}

export interface OpenStackProject {
  id: string;
  name: string; // The actual OpenStack project name (includes suffix)
  displayName: string; // The name displayed to the user (without suffix)
}
