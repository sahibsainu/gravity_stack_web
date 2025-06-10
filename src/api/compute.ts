import axios from 'axios';
import { AuthState } from '../types'; // Assuming AuthState is defined in types

// Create axios instance for Compute API
const computeApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the Compute (Nova) URL from environment variables
const getComputeUrl = (): string => {
  // Read the URL from the COMPUTE_URL environment variable
  const computeUrl = import.meta.env.COMPUTE_URL;
  if (!computeUrl) {
    throw new Error("OpenStack Nova URL is not configured. Please set the COMPUTE_URL environment variable.");
  }
  return computeUrl;
};


// Function to fetch list of VMs for the authenticated user's project
export const fetchVMs = async (authState: AuthState): Promise<any[]> => {
  const computeUrl = getComputeUrl(); // Get the URL using the new function

  // Ensure we have the necessary authentication details
  if (!authState.openstackToken || !authState.selectedProjectId) {
    throw new Error("User is not authenticated with a project scope.");
  }

  try {
    // Fetch servers (VMs) for the selected project
    // Note: The Nova API endpoint for listing servers is typically /servers/detail or /servers
    // The project ID is implicitly handled by the project-scoped token.
    const response = await computeApi.get(`${computeUrl}/servers/detail`, {
      headers: {
        'X-Auth-Token': authState.openstackToken, // Use the project-scoped token
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch VMs: ${response.statusText}`);
    }

    return response.data.servers; // Assuming the response contains a 'servers' array

  } catch (error) {
    console.error('Error fetching VMs:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Axios Fetch VMs Error Details:', error.response.status, error.response.data);
      throw new Error(`Fetch VMs API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
    }
    throw error;
  }
};

// Add other compute-related API functions here (create VM, delete VM, etc.)
// These functions would also use the computeApi instance and require the project-scoped token.
