import { Service, Package } from '../types';

export const mockServices: Service[] = [
  {
    id: 'vm-1',
    name: 'Production Web Server',
    type: 'compute',
    status: 'running',
    createdAt: new Date(2023, 0, 15),
    usage: {
      cpu: 45,
      memory: 60,
      storage: 30,
      bandwidth: 70
    }
  },
  {
    id: 'storage-1',
    name: 'Media Assets Bucket',
    type: 'storage',
    status: 'running',
    createdAt: new Date(2023, 1, 5),
    usage: {
      storage: 65,
      bandwidth: 32
    }
  },
  {
    id: 'k8s-1',
    name: 'API Microservices Cluster',
    type: 'kubernetes',
    status: 'running',
    createdAt: new Date(2023, 2, 10),
    usage: {
      cpu: 72,
      memory: 68
    }
  },
  {
    id: 'vm-2',
    name: 'Development Environment',
    type: 'compute',
    status: 'stopped',
    createdAt: new Date(2023, 3, 20)
  }
];

export const pricingPackages: Package[] = [
  {
    id: 'free',
    name: 'Free Trial',
    description: 'Perfect for testing our platform',
    price: 0,
    features: [
      '1 vCPU',
      '2GB RAM',
      '10GB Object Storage',
      'Shared Kubernetes (limited)',
      'Community Support'
    ]
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Ideal for small projects and development',
    price: 29,
    popular: true,
    features: [
      '2 vCPU',
      '8GB RAM',
      '100GB Object Storage',
      '1 Kubernetes Cluster',
      'Email Support',
      'Daily Backups'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For growing teams and production workloads',
    price: 99,
    features: [
      '4 vCPU',
      '16GB RAM',
      '500GB Object Storage',
      'Multiple Kubernetes Clusters',
      '24/7 Priority Support',
      'Hourly Backups',
      'Advanced Monitoring'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: 499,
    features: [
      'Custom vCPU allocation',
      'Custom RAM allocation',
      'Unlimited Object Storage',
      'Dedicated Kubernetes Resources',
      'Dedicated Account Manager',
      'Custom SLAs',
      'Advanced Security Features',
      'On-demand Scaling'
    ]
  }
];
