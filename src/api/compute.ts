import axios from 'axios';
import { AuthState } from '../types'; // Assuming AuthState is defined in types
import { VM, KubernetesCluster, Volume, KeyPair, Firewall, Snapshot, Image } from '../types/openstack'; // Import all new interfaces
import { getCommonConfig } from '../utils/config'; // Import the new config utility

// Create axios instance for Compute API
const computeApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the Compute (Nova) URL from environment variables
const getComputeUrl = async (): Promise<string> => {
  // Read the URL from the COMPUTE_URL environment variable
  const computeUrl = await getCommonConfig('COMPUTE_URL'); // Use getCommonConfig
  if (!computeUrl) {
    throw new Error("OpenStack Nova URL is not configured. Please set the COMPUTE_URL environment variable.");
  }
  return computeUrl;
};


// Function to fetch list of VMs for the authenticated user's project
export const fetchVMs = async (authState: AuthState): Promise<VM[]> => {
  const computeUrl = await getComputeUrl(); // Get the URL using the new function

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

    // Map the raw OpenStack server data to our VM interface
    // This is a simplified mapping. Real OpenStack responses are complex.
    // You'll need to adjust this based on the actual structure of your Nova API response.
    const servers: VM[] = response.data.servers.map((server: any) => {
      // Extract IP address (assuming a single fixed IP for simplicity)
      const ipAddress = server.addresses ? Object.values(server.addresses)[0][0]?.addr : 'N/A';
      const creationDate = server.created ? new Date(server.created).toLocaleDateString() : 'N/A';

      return {
        id: server.id,
        name: server.name,
        status: server.status,
        ipAddress: ipAddress, // Using ipAddress for publicIp
        creationDate: creationDate,
        gpu: server.flavor?.gpus ? `${server.flavor.gpus} GPU(s)` : 'N/A', // Placeholder/example
        image: server.image?.name || 'N/A', // Image name
        environment: authState.userProjects.find(p => p.id === authState.selectedProjectId)?.displayName || 'N/A', // Project name
        publicIp: ipAddress, // Redundant but matches table header
      };
    });

    return servers;

  } catch (error) {
    console.error('Error fetching VMs:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Axios Fetch VMs Error Details:', error.response.status, error.response.data);
      throw new Error(`Fetch VMs API request failed: ${error.response.status} - ${error.response.data ? JSON.stringify(error.response.data) : 'No response data'}`);
    }
    throw error;
  }
};

// Placeholder API functions for other resources
export const fetchKubernetesClusters = async (authState: AuthState): Promise<KubernetesCluster[]> => {
  console.log('Fetching Kubernetes Clusters for project:', authState.selectedProjectId);
  // Mock data for demonstration
  return [
    {
      id: 'k8s-12345',
      name: 'dev-cluster-01',
      status: 'ACTIVE',
      nodes: 3,
      version: '1.27.3',
      creationDate: '2023-01-15',
    },
    {
      id: 'k8s-67890',
      name: 'prod-cluster-east',
      status: 'BUILD',
      nodes: 1,
      version: '1.28.0',
      creationDate: '2023-03-20',
    },
  ];
};

export const fetchVolumes = async (authState: AuthState): Promise<Volume[]> => {
  console.log('Fetching Volumes for project:', authState.selectedProjectId);
  // Mock data for demonstration
  return [
    {
      id: 'vol-abcde',
      name: 'data-disk-01',
      sizeGb: 100,
      status: 'in-use',
      attachedTo: 'vm-webserver-01',
      creationDate: '2023-02-01',
    },
    {
      id: 'vol-fghij',
      name: 'backup-storage',
      sizeGb: 500,
      status: 'available',
      attachedTo: 'N/A',
      creationDate: '2023-04-10',
    },
  ];
};

export const fetchKeyPairs = async (authState: AuthState): Promise<KeyPair[]> => {
  console.log('Fetching Key Pairs for project:', authState.selectedProjectId);
  // Mock data for demonstration
  return [
    {
      id: 'kp-1',
      name: 'my-ssh-key',
      fingerprint: 'SHA256:abcdef12345...',
      creationDate: '2022-11-01',
    },
    {
      id: 'kp-2',
      name: 'admin-key',
      fingerprint: 'SHA256:fedcba98765...',
      creationDate: '2023-01-20',
    },
  ];
};

export const fetchFirewalls = async (authState: AuthState): Promise<Firewall[]> => {
  console.log('Fetching Firewalls for project:', authState.selectedProjectId);
  // Mock data for demonstration
  return [
    {
      id: 'sg-1',
      name: 'web-access',
      description: 'Allows HTTP/HTTPS traffic',
      rulesCount: 2,
      creationDate: '2022-10-05',
    },
    {
      id: 'sg-2',
      name: 'internal-only',
      description: 'Restricts all external access',
      rulesCount: 5,
      creationDate: '2023-03-15',
    },
  ];
};

export const fetchSnapshots = async (authState: AuthState): Promise<Snapshot[]> => {
  console.log('Fetching Snapshots for project:', authState.selectedProjectId);
  // Mock data for demonstration
  return [
    {
      id: 'snap-1',
      name: 'vm-backup-daily',
      source: 'webserver-vm',
      sizeGb: 50,
      status: 'available',
      creationDate: '2023-05-01',
    },
    {
      id: 'snap-2',
      name: 'volume-archive',
      source: 'data-volume-prod',
      sizeGb: 200,
      status: 'creating',
      creationDate: '2023-05-02',
    },
  ];
};

export const fetchImages = async (authState: AuthState): Promise<Image[]> => {
  console.log('Fetching Images for project:', authState.selectedProjectId);
  // Mock data for demonstration
  return [
    {
      id: 'img-1',
      name: 'Ubuntu 22.04 LTS',
      sizeGb: 10,
      status: 'active',
      type: 'base',
      creationDate: '2022-09-01',
    },
    {
      id: 'img-2',
      name: 'My Custom App Image',
      sizeGb: 15,
      status: 'active',
      type: 'custom',
      creationDate: '2023-04-20',
    },
  ];
};
