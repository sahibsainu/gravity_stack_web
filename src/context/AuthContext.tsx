import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, OpenStackProject } from '../types'; // Import OpenStackProject type
import { supabase } from '../utils/supabaseClient'; // Import supabase client
import { listUserProjects, authenticateUserWithProject, addProjectToExistingUser } from '../api/openstack'; // Import new API functions
import { log, logError, getBaseProjectName } from '../utils'; // Import log, logError, and getBaseProjectName
import { User } from '@supabase/supabase-js'; // Import User type from supabase-js

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<OpenStackProject[]>; // Modify login to return projects
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // Modify selectProject to accept openstackUsername
  selectProject: (projectId: string, openstackUsername: string, password?: string) => Promise<void>;
  setUserProjects: (projects: OpenStackProject[]) => void; // Add function to manually set projects
  addProject: (baseProjectName: string) => Promise<OpenStackProject>; // Add function to add a new project
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    openstackToken: null,
    selectedProjectId: null,
    userProjects: [], // Initialize empty project list
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
         // If Supabase session exists, try to load OpenStack state from storage or re-authenticate
         // For simplicity now, we'll just set the user and isAuthenticated
         // A more robust solution would involve storing/retrieving selected project and token
         // or re-authenticating with OpenStack on load if needed.
         // For this flow, we'll assume OpenStack project selection happens after Supabase login.
         setAuthState({
            user: session.user as User, // Cast to User type
            isAuthenticated: true,
            isLoading: false,
            openstackToken: null, // Reset OpenStack state on initial load
            selectedProjectId: null,
            userProjects: [],
         });
      } else {
         setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            openstackToken: null,
            selectedProjectId: null,
            userProjects: [],
         });
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuthState(prev => ({
            ...prev,
            user: session.user as User, // Cast to User type
            isAuthenticated: true,
            isLoading: false,
            // Keep OpenStack state or reset depending on _event
            // For simplicity, let's reset OpenStack state on auth change
            openstackToken: null,
            selectedProjectId: null,
            userProjects: [],
        }));
      } else {
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            openstackToken: null,
            selectedProjectId: null,
            userProjects: [],
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email: string, password: string): Promise<OpenStackProject[]> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // Supabase login successful. Now fetch user's OpenStack projects.
      // Retrieve the OpenStack user ID from Supabase user metadata
      const openstackUserId = data.user?.user_metadata?.openstack_user_id as string | undefined;

      if (!openstackUserId) {
           // This user doesn't have OpenStack resources provisioned yet.
           // This might happen if they signed up but provisioning failed,
           // or if they are an old user before this feature.
           // We should probably guide them to the provisioning step or handle this case.
           // For now, we'll log a warning and return an empty project list.
           logError(`Supabase user ${data.user?.id} does not have openstack_user_id in metadata.`);
           setAuthState(prev => ({
                ...prev,
                user: data.user as User,
                isAuthenticated: true,
                isLoading: false,
                userProjects: [], // No GravityStack projects found
                openstackToken: null,
                selectedProjectId: null,
           }));
           return []; // Return empty array
      }

      // Use the retrieved OpenStack user ID to list projects
      const projects = await listUserProjects(openstackUserId);

      // Map projects to include the displayName
      const projectsWithDisplayName: OpenStackProject[] = projects.map(project => ({
          id: project.id,
          name: project.name,
          displayName: getBaseProjectName(project.name), // Extract base name for display
      }));

      setAuthState(prev => ({
        ...prev,
        user: data.user as User, // Cast to User type
        isAuthenticated: true,
        isLoading: false,
        userProjects: projectsWithDisplayName, // Store projects with display names
        openstackToken: null, // Reset token until project is selected
        selectedProjectId: null, // Reset selected project until selected
      }));

      return projectsWithDisplayName; // Return the list of projects to the component

    } catch (error: any) {
      logError('Error during login and project fetch:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        userProjects: [], // Clear projects on error
        openstackToken: null,
        selectedProjectId: null,
      }));
      throw error;
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // Supabase registration successful.
      // GravityStack provisioning happens in the Signup component after this step
      // The provisioning function will now handle updating the Supabase user metadata
      // with the GravityStack user ID and username.
      setAuthState(prev => ({
        ...prev,
        user: data.user as User, // Cast to User type
        isAuthenticated: true,
        isLoading: false,
        // GravityStack state remains null/empty initially until provisioning is complete
        openstackToken: null,
        selectedProjectId: null,
        userProjects: [],
      }));

    } catch (error: any) {
      logError('Error during registration:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await supabase.auth.signOut();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        openstackToken: null, // Clear GravityStack state on logout
        selectedProjectId: null,
        userProjects: [],
      });
    } catch (error: any) {
      logError('Error during logout:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  // Function to authenticate with OpenStack for a specific project
  // Now accepts openstackUsername as an argument
  const handleSelectProject = async (projectId: string, openstackUsername: string, password?: string) => {
      if (!authState.user || !password) {
          throw new Error("User not authenticated or password not provided for project selection.");
      }

      setAuthState(prev => ({ ...prev, isLoading: true }));

      try {
          // Use the passed openstackUsername for authentication
          const token = await authenticateUserWithProject(openstackUsername, password, projectId);

          setAuthState(prev => ({
              ...prev,
              isLoading: false,
              openstackToken: token,
              selectedProjectId: projectId,
              // userProjects list remains
          }));

      } catch (error: any) {
          logError('Error during project selection and authentication:', error);
          setAuthState(prev => ({
              ...prev,
              isLoading: false,
              openstackToken: null, // Clear token on error
              selectedProjectId: null, // Clear selected project on error
          }));
          throw error;
      }
  };

  // Function to manually set user projects (used after initial login/signup provisioning)
  const handleSetUserProjects = (projects: OpenStackProject[]) => {
      // Map projects to include the displayName
      const projectsWithDisplayName: OpenStackProject[] = projects.map(project => ({
          id: project.id,
          name: project.name,
          displayName: getBaseProjectName(project.name), // Extract base name for display
      }));
      setAuthState(prev => ({
          ...prev,
          userProjects: projectsWithDisplayName,
      }));
  };

  // NEW: Function to add a new project for the current user
  const handleAddProject = async (baseProjectName: string): Promise<OpenStackProject> => {
      if (!authState.user) {
          throw new Error("User not authenticated.");
      }

      const openstackUserId = authState.user.user_metadata?.openstack_user_id as string | undefined;

      if (!openstackUserId) {
          throw new Error("GravityStack user ID not found in user metadata.");
      }

      setAuthState(prev => ({ ...prev, isLoading: true }));

      try {
          // Call the new API function to add the project
          const newProject = await addProjectToExistingUser(openstackUserId, baseProjectName);

          // Map the new project to include displayName
          const newProjectWithDisplayName: OpenStackProject = {
              id: newProject.id,
              name: newProject.name,
              displayName: getBaseProjectName(newProject.name),
          };

          // Update the userProjects list in the state
          setAuthState(prev => ({
              ...prev,
              isLoading: false,
              userProjects: [...prev.userProjects, newProjectWithDisplayName],
              // Optionally select the new project automatically
              // selectedProjectId: newProjectWithDisplayName.id,
          }));

          log(`New project "${newProjectWithDisplayName.displayName}" added successfully.`);
          return newProjectWithDisplayName;

      } catch (error: any) {
          logError('Error adding new project:', error);
          setAuthState(prev => ({
              ...prev,
              isLoading: false,
          }));
          throw error;
      }
  };


  return (
    <AuthContext.Provider
      value={{
        authState,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        selectProject: handleSelectProject, // Provide the updated function
        setUserProjects: handleSetUserProjects, // Provide the new function
        addProject: handleAddProject, // Provide the new function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
