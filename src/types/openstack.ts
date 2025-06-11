export interface VM {
  id: string;
  name: string;
  status: string;
  ipAddress: string; // This will be publicIp
  creationDate: string;
  // New fields based on the design
  gpu?: string; // Assuming GPU info might be available
  image?: string; // Image name/ID
  environment?: string; // Project/environment name
  publicIp?: string; // Redundant with ipAddress but kept for clarity if needed
}

export interface CreateServerParams {
  name: string;
  imageId: string;
  flavorId: string;
  networkId: string;
}

export interface KubernetesCluster {
  id: string;
  name: string;
  status: string;
  nodes: number;
  version: string;
  creationDate: string;
}

export interface Volume {
  id: string;
  name: string;
  sizeGb: number;
  status: string;
  attachedTo: string; // e.g., VM name or ID
  creationDate: string;
}

export interface KeyPair {
  id: string;
  name: string;
  fingerprint: string;
  creationDate: string;
}

export interface Firewall {
  id: string;
  name: string;
  description: string;
  rulesCount: number;
  creationDate: string;
}

export interface Snapshot {
  id: string;
  name: string;
  source: string; // e.g., VM name or Volume name
  sizeGb: number;
  status: string;
  creationDate: string;
}

export interface Image {
  id: string;
  name: string;
  sizeGb: number;
  status: string;
  type: string; // e.g., 'snapshot', 'base', 'custom'
  creationDate: string;
}
