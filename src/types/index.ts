import { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  openstackToken: string | null;
  selectedProjectId: string | null;
  userProjects: OpenStackProject[];
}

export interface OpenStackProject {
  id: string;
  name: string;
  displayName: string; // A user-friendly name derived from the OpenStack project name
  createdAt?: string; // Added creation timestamp
}

// Updated DashboardEnvironment to only include fields available from OpenStackProject
export interface DashboardEnvironment extends OpenStackProject {
  // Added for new columns, but might not be directly populated by current API calls
  availabilityZone?: string; // Placeholder for AZ, not directly from Keystone project API
  assignedUsersCount?: number; // Placeholder for user count, requires additional API calls
}
