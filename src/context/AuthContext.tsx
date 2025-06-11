import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, OpenStackProject } from '../types';
import { supabase } from '../utils/supabaseClient';
import { listUserProjects, authenticateUserWithProject, addProjectToExistingUser, getProjectScopedTokenForUser } from '../api/openstack';
import { log, logError, getBaseProjectName } from '../utils';
import { User } from '@supabase/supabase-js';

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<OpenStackProject[]>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  selectProject: (projectId: string) => Promise<void>; // Removed password parameter
  setUserProjects: (projects: OpenStackProject[]) => void;
  addProject: (baseProjectName: string) => Promise<OpenStackProject>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Local Storage Keys
const LOCAL_STORAGE_OPENSTACK_TOKEN_KEY = 'openstack_token';
const LOCAL_STORAGE_SELECTED_PROJECT_KEY = 'selected_project_id';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    openstackToken: null,
    selectedProjectId: null,
    userProjects: [],
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const openstackUserId = session.user.user_metadata?.openstack_user_id as string | undefined;
        let projects: OpenStackProject[] = [];
        let storedOpenstackToken: string | null = null;
        let storedSelectedProjectId: string | null = null;

        if (openstackUserId) {
          try {
            projects = await listUserProjects(openstackUserId);
            // Map projects to include the displayName
            projects = projects.map(project => ({
                id: project.id,
                name: project.name,
                displayName: getBaseProjectName(project.name),
            }));
          } catch (error) {
            logError('Error fetching user projects on session check:', error);
            // Continue without projects if there's an error
          }
        }

        // Attempt to restore OpenStack token and selected project from local storage
        storedOpenstackToken = localStorage.getItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
        storedSelectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);

        setAuthState({
            user: session.user as User,
            isAuthenticated: true,
            isLoading: false,
            openstackToken: storedOpenstackToken,
            selectedProjectId: storedSelectedProjectId,
            userProjects: projects,
        });
      } else {
        // Clear local storage if no Supabase session
        localStorage.removeItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);
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
        const openstackUserId = session.user.user_metadata?.openstack_user_id as string | undefined;
        let projects: OpenStackProject[] = [];
        let storedOpenstackToken: string | null = null;
        let storedSelectedProjectId: string | null = null;

        if (openstackUserId) {
          try {
            listUserProjects(openstackUserId).then(fetchedProjects => {
              projects = fetchedProjects.map(project => ({
                  id: project.id,
                  name: project.name,
                  displayName: getBaseProjectName(project.name),
              }));
              setAuthState(prev => ({
                ...prev,
                userProjects: projects,
              }));
            }).catch(error => {
              logError('Error fetching user projects on auth state change:', error);
            });
          } catch (error) {
            logError('Error fetching user projects on auth state change:', error);
          }
        }

        // Attempt to restore OpenStack token and selected project from local storage
        storedOpenstackToken = localStorage.getItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
        storedSelectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);

        setAuthState(prev => ({
            ...prev,
            user: session.user as User,
            isAuthenticated: true,
            isLoading: false,
            openstackToken: storedOpenstackToken,
            selectedProjectId: storedSelectedProjectId,
            // userProjects will be updated by the promise above
        }));
      } else {
        // Clear local storage if no Supabase session
        localStorage.removeItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);
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

      // Clear any previous OpenStack state from local storage on new login
      localStorage.removeItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);

      const openstackUserId = data.user?.user_metadata?.openstack_user_id as string | undefined;
      let projectsWithDisplayName: OpenStackProject[] = [];

      if (!openstackUserId) {
           logError(`Supabase user ${data.user?.id} does not have openstack_user_id in metadata.`);
      } else {
        const projects = await listUserProjects(openstackUserId);
        projectsWithDisplayName = projects.map(project => ({
            id: project.id,
            name: project.name,
            displayName: getBaseProjectName(project.name),
        }));

        // Automatically select the first project if available and get its token
        if (projectsWithDisplayName.length > 0) {
            const firstProjectId = projectsWithDisplayName[0].id;
            // Use the user's password to get the initial project-scoped token
            const token = await authenticateUserWithProject(
                data.user.user_metadata.openstack_username, // Use the OpenStack username from metadata
                password,
                firstProjectId
            );
            localStorage.setItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY, token);
            localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, firstProjectId);
            setAuthState(prev => ({
                ...prev,
                openstackToken: token,
                selectedProjectId: firstProjectId,
            }));
        }
      }

      setAuthState(prev => ({
        ...prev,
        user: data.user as User,
        isAuthenticated: true,
        isLoading: false,
        userProjects: projectsWithDisplayName,
      }));

      return projectsWithDisplayName;

    } catch (error: any) {
      logError('Error during login and project fetch:', error);
      localStorage.removeItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        userProjects: [],
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

      // Clear any previous OpenStack state from local storage on new registration
      localStorage.removeItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);

      setAuthState(prev => ({
        ...prev,
        user: data.user as User,
        isAuthenticated: true,
        isLoading: false,
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
      // Clear OpenStack state from local storage on logout
      localStorage.removeItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        openstackToken: null,
        selectedProjectId: null,
        userProjects: [],
      });
    } catch (error: any) {
      logError('Error during logout:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  // Updated selectProject to use getProjectScopedTokenForUser
  const handleSelectProject = async (projectId: string) => {
      if (!authState.user) {
          throw new Error("User not authenticated for project selection.");
      }

      const openstackUserId = authState.user.user_metadata?.openstack_user_id as string | undefined;

      if (!openstackUserId) {
          throw new Error("OpenStack user ID not found in user metadata. Cannot select project.");
      }

      setAuthState(prev => ({ ...prev, isLoading: true }));

      try {
          // Use the new function to get a project-scoped token using admin credentials
          const token = await getProjectScopedTokenForUser(openstackUserId, projectId);

          // Store token and selected project ID in local storage
          localStorage.setItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY, token);
          localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY, projectId);

          setAuthState(prev => ({
              ...prev,
              isLoading: false,
              openstackToken: token,
              selectedProjectId: projectId,
          }));

      } catch (error: any) {
          logError('Error during project selection and authentication:', error);
          // Clear token and selected project from local storage on error
          localStorage.removeItem(LOCAL_STORAGE_OPENSTACK_TOKEN_KEY);
          localStorage.removeItem(LOCAL_STORAGE_SELECTED_PROJECT_KEY);
          setAuthState(prev => ({
              ...prev,
              isLoading: false,
              openstackToken: null,
              selectedProjectId: null,
          }));
          throw error;
      }
  };

  const handleSetUserProjects = (projects: OpenStackProject[]) => {
      const projectsWithDisplayName: OpenStackProject[] = projects.map(project => ({
          id: project.id,
          name: project.name,
          displayName: getBaseProjectName(project.name),
      }));
      setAuthState(prev => ({
          ...prev,
          userProjects: projectsWithDisplayName,
      }));
  };

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
          const newProject = await addProjectToExistingUser(openstackUserId, baseProjectName);

          const newProjectWithDisplayName: OpenStackProject = {
              id: newProject.id,
              name: newProject.name,
              displayName: getBaseProjectName(newProject.name),
          };

          setAuthState(prev => ({
              ...prev,
              isLoading: false,
              userProjects: [...prev.userProjects, newProjectWithDisplayName],
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
        selectProject: handleSelectProject,
        setUserProjects: handleSetUserProjects,
        addProject: handleAddProject,
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
