import axios from 'axios';
import { generateRandomString } from '../utils';
import { supabase } from '../utils/supabaseClient'; // Import supabase client
import { log, logError } from '../utils'; // Import logging utilities

// Create axios instance with default configs
const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

// --- Secure Admin Credential Handling (Supabase via Axios) ---

// Function to get admin credentials from Supabase
const getAdminCredentialsFromSupabase = async (): Promise<{ username: string, password: string }> => {
  const ADMIN_CREDENTIALS_TABLE = 'admin_credentials'; // Define table name

  try {
    // 1. Fetch credentials from Supabase
    const { data, error } = await supabase
      .from(ADMIN_CREDENTIALS_TABLE)
      .select('username, password')
      .limit(1); // Assuming only one set of admin credentials

    if (error) {
      logError('Error fetching admin credentials from Supabase:', error);
      throw new Error(`Failed to fetch admin credentials from database: ${error.message}`);
    }

    if (!data || data.length === 0) {
      // If no data is found, throw an error as credentials are expected to exist
      throw new Error(`Admin credentials not found in database table "${ADMIN_CREDENTIALS_TABLE}". Please ensure they are created.`);
    }

    log('Admin credentials fetched from GravityStack.');
    return data[0]; // Return fetched credentials

  } catch (error: any) {
    logError('Error in getAdminCredentialsFromSupabase:', error);
    throw new Error(`Secure credential handling failed: ${error.message}`);
  }
};


// Function to get OpenStack Admin Token securely
const getAdminTokenSecurely = async (): Promise<string> => {
    const keystoneUrl = import.meta.env.LOGIN_URL; // Use LOGIN_URL
    const defaultDomainName = import.meta.env.VITE_OPENSTACK_DEFAULT_DOMAIN || 'Default'; // Default domain

    if (!keystoneUrl) {
      throw new Error("OpenStack Keystone URL is not configured.");
    }

    try {
        // Get credentials securely from Supabase
        const { username, password } = await getAdminCredentialsFromSupabase();

        // Authenticate with Keystone using the retrieved credentials
        const authResponse = await api.post(`${keystoneUrl}/auth/tokens`, {
            auth: {
                identity: {
                    methods: ['password'],
                    password: {
                        user: {
                            name: username,
                            domain: { name: defaultDomainName },
                            password: password,
                        },
                    },
                },
                scope: {
                    // Admin token typically requires unscoped or domain-scoped authentication
                    // For admin operations like creating users/projects, domain scope is common.
                    // Let's use domain scope for robustness.
                    domain: { name: defaultDomainName }
                },
            },
        });

        if (authResponse.status !== 201) {
            throw new Error(`Admin authentication failed: ${authResponse.statusText}`);
        }

        const token = authResponse.headers['x-subject-token'];

        if (!token) {
            throw new Error('Admin authentication token not found in response headers.');
        }
        log('Admin token obtained securely for GravityStack.');
        return token;

    } catch (error) {
        logError('Error during secure admin token retrieval:', error);
        if (axios.isAxiosError(error) && error.response) {
            logError('Axios Admin Auth Error Details:', error.response.status, error.response.data);
            throw new Error(`Admin Authentication API request failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        }
        throw error;
    }
};

// --- End Secure Admin Credential Handling ---


// Function to create an OpenStack user (Requires Admin Token)
// Now accepts the desired username as an argument
export const createOpenStackUser = async (username: string, password: string): Promise<string> => {
  const adminToken = await getAdminTokenSecurely(); // Use the secure method
  const keystoneUrl = import.meta.env.LOGIN_URL; // Use LOGIN_URL
  const defaultDomainId = import.meta.env.VITE_OPENSTACK_DEFAULT_DOMAIN_ID || 'default'; // Default domain ID

  if (!keystoneUrl) {
    throw new Error("OpenStack Keystone URL is not configured.");
  }

  try {
    const userResponse = await api.post(`${keystoneUrl}/users`, {
      user: {
        name: username, // Use the provided username
        password: password,
        domain_id: defaultDomainId,
        enabled: true,
      },
    }, {
      headers: {
        'X-Auth-Token': adminToken,
      },
    });

    if (userResponse.status !== 201) {
      throw new Error(`Failed to create GravityStack user: ${userResponse.statusText}`);
    }

    return userResponse.data.user.id; // Return the new user ID (OpenStack's internal ID)
  } catch (error) {
    logError('Error creating GravityStack user:', error);
    if (axios.isAxiosError(error) && error.response) {
      logError('Axios Create User Error Details:', error.response.status, error.response.data);
      throw new Error(`Create GravityStack User API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
    }
    throw error;
  }
};

// Function to create an OpenStack project (Requires Admin Token)
export const createOpenStackProject = async (projectName: string): Promise<string> => {
  const adminToken = await getAdminTokenSecurely(); // Use the secure method
  const keystoneUrl = import.meta.env.LOGIN_URL; // Use LOGIN_URL
  const defaultDomainId = import.meta.env.VITE_OPENSTACK_DEFAULT_DOMAIN_ID || 'default'; // Default domain ID

  if (!keystoneUrl) {
    throw new Error("OpenStack Keystone URL is not configured.");
  }

  try {
    const projectResponse = await api.post(`${keystoneUrl}/projects`, {
      project: {
        name: projectName,
        domain_id: defaultDomainId,
        enabled: true,
      },
    }, {
      headers: {
        'X-Auth-Token': adminToken,
      },
    });

    if (projectResponse.status !== 201) {
      throw new Error(`Failed to create GravityStack project: ${projectResponse.statusText}`);
    }

    return projectResponse.data.project.id; // Return the new project ID
  } catch (error) {
    logError('Error creating GravityStack project:', error);
    if (axios.isAxiosError(error) && error.response) {
      logError('Axios Create Project Error Details:', error.response.status, error.response.data);
      throw new Error(`Create GravityStack Project API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
    }
    throw error;
  }
};

// Function to get a role ID by name (Requires Admin Token)
const getRoleId = async (roleName: string): Promise<string> => {
  const adminToken = await getAdminTokenSecurely(); // Use the secure method
  const keystoneUrl = import.meta.env.LOGIN_URL; // Use LOGIN_URL

  if (!keystoneUrl) {
    throw new Error("OpenStack Keystone URL is not configured.");
  }

  try {
    const rolesResponse = await api.get(`${keystoneUrl}/roles`, {
      headers: {
        'X-Auth-Token': adminToken,
      },
    });

    if (rolesResponse.status !== 200) {
      throw new Error(`Failed to fetch GravityStack roles: ${rolesResponse.statusText}`);
    }

    const role = rolesResponse.data.roles.find((r: any) => r.name === roleName);

    if (!role) {
      throw new Error(`Role "${roleName}" not found.`);
    }

    return role.id;
  } catch (error) {
    logError(`Error getting role ID for "${roleName}":`, error);
    if (axios.isAxiosError(error) && error.response) {
      logError('Axios Get Role ID Error Details:', error.response.status, error.response.data);
      throw new Error(`Get Role ID API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
    }
    throw error;
  }
};


// Function to assign a role to a user on a project (Requires Admin Token)
export const assignRoleToUserOnProject = async (userId: string, projectId: string, roleName: string = 'member'): Promise<void> => {
  const adminToken = await getAdminTokenSecurely(); // Use the secure method
  const keystoneUrl = import.meta.env.LOGIN_URL; // Use LOGIN_URL

  if (!keystoneUrl) {
    throw new Error("OpenStack Keystone URL is not configured.");
  }

  try {
    const roleId = await getRoleId(roleName);

    // Send an empty JSON object as the request body - FIX for 400 error
    const assignmentResponse = await api.put(`${keystoneUrl}/projects/${projectId}/users/${userId}/roles/${roleId}`, {}, {
      headers: {
        'X-Auth-Token': adminToken,
      },
    });

    if (assignmentResponse.status !== 204) { // 204 No Content is expected for successful PUT
      throw new Error(`Failed to assign role "${roleName}" to user "${userId}" on project "${projectId}": ${assignmentResponse.statusText}`);
    }
    log(`Role "${roleName}" assigned to user "${userId}" on project "${projectId}" successfully.`);

  } catch (error) {
    logError('Error assigning role to user on project:', error);
    if (axios.isAxiosError(error) && error.response) {
      logError('Axios Assign Role Error Details:', error.response.status, error.response.data);
      throw new Error(`Assign Role API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
    }
    throw error;
  }
};

// Function to list projects for a specific user (Requires Admin Token)
// Note: This requires admin privileges to list all projects and check user assignments.
// A more efficient API might exist depending on the OpenStack version/configuration.
export const listUserProjects = async (openstackUserId: string): Promise<{ id: string, name: string }[]> => {
  const adminToken = await getAdminTokenSecurely(); // Use the secure method
  const keystoneUrl = import.meta.env.LOGIN_URL; // Use LOGIN_URL

  if (!keystoneUrl) {
    throw new Error("OpenStack Keystone URL is not configured.");
  }

  try {
    // Fetch all projects
    const projectsResponse = await api.get(`${keystoneUrl}/projects`, {
      headers: {
        'X-Auth-Token': adminToken,
      },
    });

    if (projectsResponse.status !== 200) {
      throw new Error(`Failed to fetch GravityStack projects: ${projectsResponse.statusText}`);
    }

    const allProjects = projectsResponse.data.projects;

    // Fetch assignments to filter projects by user
    // This endpoint might vary or require specific permissions
    const assignmentsResponse = await api.get(`${keystoneUrl}/role_assignments?user.id=${openstackUserId}`, { // Use the OpenStack user ID
       headers: {
        'X-Auth-Token': adminToken,
      },
    });

     if (assignmentsResponse.status !== 200) {
      logError(`Failed to fetch GravityStack role assignments for user ${openstackUserId}: ${assignmentsResponse.statusText}`);
      throw new Error(`Failed to fetch GravityStack role assignments for user ${openstackUserId}: ${assignmentsResponse.statusText}`);
    }

    const userAssignments = assignmentsResponse.data.role_assignments;

    // Filter projects that the user is assigned to
    const userProjectIds = new Set(userAssignments
        .filter((assignment: any) => assignment.scope && assignment.scope.project)
        .map((assignment: any) => assignment.scope.project.id)
    );

    const userProjects = allProjects
        .filter((project: any) => userProjectIds.has(project.id))
        .map((project: any) => ({ id: project.id, name: project.name }));

    return userProjects;

  } catch (error) {
    logError(`Error listing projects for user ${openstackUserId}:`, error);
     if (axios.isAxiosError(error) && error.response) {
      logError('Axios List User Projects Error Details:', error.response.status, error.response.data);
      throw new Error(`List User Projects API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
    }
    throw error;
  }
};

// Function to authenticate a user with a specific project scope (Does NOT require Admin Token)
// Now accepts the OpenStack username
export const authenticateUserWithProject = async (openstackUsername: string, password: string, projectId: string): Promise<string> => {
  const keystoneUrl = import.meta.env.LOGIN_URL; // Use LOGIN_URL
  const defaultDomainName = import.meta.env.VITE_OPENSTACK_DEFAULT_DOMAIN || 'Default'; // Default domain

  if (!keystoneUrl) {
    throw new Error("OpenStack Keystone URL is not configured.");
  }

  try {
    const authResponse = await api.post(`${keystoneUrl}/auth/tokens`, {
      auth: {
        identity: {
          methods: ['password'],
          password: {
            user: {
              name: openstackUsername, // Use the OpenStack username
              domain: { name: defaultDomainName },
              password: password,
            },
          },
        },
        scope: {
          project: { id: projectId } // Scope to the specific project
        },
      },
    });

    if (authResponse.status !== 201) {
      throw new Error(`User authentication with project failed: ${authResponse.statusText}`);
    }

    const token = authResponse.headers['x-subject-token'];

    if (!token) {
      throw new Error('User authentication token not found in response headers.');
    }
    return token;

  } catch (error) {
    logError(`Error during user authentication with project ${projectId}:`, error);
    if (axios.isAxiosError(error) && error.response) {
      logError('Axios User Project Authentication Error Details:', error.response.status, error.response.data);
      throw new Error(`User Project Authentication API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
    }
    throw error;
  }
};


// Orchestration function for initial OpenStack provisioning during signup (Creates User and Project)
// Now handles generating OpenStack username and storing it in Supabase metadata
export const provisionOpenStackUserAndProject = async (email: string, password: string, baseProjectName: string): Promise<{ userId: string, projectId: string, projectName: string }> => {
  // This function now uses the secure getAdminTokenSecurely method internally.
  try {
    // Generate a unique project name by appending a random string
    const randomSuffix = generateRandomString(6); // e.g., 6 random characters
    const uniqueProjectName = `${baseProjectName}-${randomSuffix}`;

    // Generate a unique OpenStack username (not using email)
    // OpenStack usernames typically have character restrictions.
    // A simple approach is a random string, or a sanitized version of the email prefix + random string.
    // Let's use a sanitized email prefix + random string for better readability/association.
    const emailPrefix = email.split('@')[0];
    const sanitizedEmailPrefix = emailPrefix.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); // Remove non-alphanumeric
    const openstackUsername = `${sanitizedEmailPrefix}-${generateRandomString(8)}`; // Append random string for uniqueness

    log(`[provisionGravityStackUserAndProject] Generated GravityStack username: ${openstackUsername}`); // Log generated username

    // Create the OpenStack user with the generated username
    const openstackUserId = await createOpenStackUser(openstackUsername, password);
    log(`[provisionGravityStackUserAndProject] GravityStack user created with ID: ${openstackUserId}`);

    // Corrected log message to use gravitystack_username
    log(`[provisionGravityStackUserAndProject] Attempting to update Supabase user metadata with gravitystack_user_id: ${openstackUserId}, gravitystack_username: ${openstackUsername}`); // Log data for update

    // Store the OpenStack user ID and username in the Supabase user's metadata
    const { data: { user: supabaseUser }, error: updateError } = await supabase.auth.updateUser({
        data: {
            openstack_user_id: openstackUserId,
            openstack_username: openstackUsername,
        }
    });

    if (updateError) {
        logError('[provisionGravityStackUserAndProject] Error updating Supabase user metadata with GravityStack info:', updateError);
        // Decide how to handle this error - ideally, clean up the created OpenStack user/project
        // For now, we'll throw, but cleanup is important in production.
        throw new Error(`Failed to link GravityStack user to Supabase account: ${updateError.message}`);
    }
    log('[provisionGravityStackUserAndProject] Supabase user metadata updated with GravityStack info.');


    const projectId = await createOpenStackProject(uniqueProjectName);
    log(`[provisionGravityStackUserAndProject] GravityStack project created with ID: ${projectId}`);

    // Assign the role using the OpenStack user ID
    await assignRoleToUserOnProject(openstackUserId, projectId, 'member'); // Assign default role, using 'member'
    log('[provisionGravityStackUserAndProject] User assigned to project successfully.');

    return { userId: openstackUserId, projectId, projectName: uniqueProjectName }; // Return OpenStack user ID
  } catch (error) {
    logError('[provisionGravityStackUserAndProject] Error during GravityStack provisioning orchestration:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

// NEW: Function to add a new project for an existing OpenStack user
export const addProjectToExistingUser = async (openstackUserId: string, baseProjectName: string): Promise<{ id: string, name: string }> => {
    const adminToken = await getAdminTokenSecurely();
    const keystoneUrl = import.meta.env.LOGIN_URL;
    const defaultDomainId = import.meta.env.VITE_OPENSTACK_DEFAULT_DOMAIN_ID || 'default';

    if (!keystoneUrl) {
        throw new Error("OpenStack Keystone URL is not configured.");
    }

    try {
        // Generate a unique project name
        const randomSuffix = generateRandomString(6);
        const uniqueProjectName = `${baseProjectName}-${randomSuffix}`;

        log(`[addProjectToExistingUser] Creating GravityStack project with name: ${uniqueProjectName}`);

        // Create the project
        const projectResponse = await api.post(`${keystoneUrl}/projects`, {
            project: {
                name: uniqueProjectName,
                domain_id: defaultDomainId,
                enabled: true,
            },
        }, {
            headers: {
                'X-Auth-Token': adminToken,
            },
        });

        if (projectResponse.status !== 201) {
            throw new Error(`Failed to create GravityStack project: ${projectResponse.statusText}`);
        }

        const newProjectId = projectResponse.data.project.id;
        log(`[addProjectToExistingUser] GravityStack project created with ID: ${newProjectId}`);

        // Assign the existing user to the new project
        await assignRoleToUserOnProject(openstackUserId, newProjectId, 'member');
        log(`[addProjectToExistingUser] Existing user ${openstackUserId} assigned to new project ${newProjectId} successfully.`);

        return { id: newProjectId, name: uniqueProjectName }; // Return the new project details

    } catch (error) {
        logError('[addProjectToExistingUser] Error during adding project to existing user:', error);
        if (axios.isAxiosError(error) && error.response) {
            logError('Axios Add Project Error Details:', error.response.status, error.response.data);
            throw new Error(`Add Project API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
        }
        throw error;
    }
};
