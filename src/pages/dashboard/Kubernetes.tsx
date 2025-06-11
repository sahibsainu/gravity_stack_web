import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { fetchKubernetesClusters } from '../../api/compute'; // Using compute for now, ideally separate API
import { useAuth } from '../../context/AuthContext';
import { KubernetesCluster } from '../../types/openstack';

const Kubernetes = () => {
  const { authState } = useAuth();
  const { openstackToken, selectedProjectId } = authState;

  const [clusters, setClusters] = useState<KubernetesCluster[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadClusters = async () => {
      if (!openstackToken || !selectedProjectId) {
        console.warn("Cannot fetch Kubernetes clusters: GravityStack token or project not available.");
        setClusters([]);
        setIsLoading(false);
        setError("Please select an OpenStack project to view resources.");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const fetchedClusters = await fetchKubernetesClusters(authState);
        setClusters(fetchedClusters);
      } catch (error) {
        console.error('Error fetching Kubernetes clusters:', error);
        setError('Failed to fetch Kubernetes clusters. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadClusters();
  }, [authState, openstackToken, selectedProjectId]);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const filteredClusters = clusters.filter(cluster =>
    cluster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cluster.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cluster.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cluster.version.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-space-900">My Kubernetes Clusters</h1>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cosmic-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for a Kubernetes cluster"
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-primary w-full md:w-auto" onClick={openCreateModal}>
              <Plus className="h-5 w-5 mr-2" />
              <span>Deploy New Kubernetes Cluster</span>
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-cosmic-600">Loading Kubernetes clusters...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">
              {error}
            </div>
          ) : filteredClusters.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-cosmic-600 mb-4">You have not created any Kubernetes cluster yet.</p>
              <p className="text-cosmic-600 mb-6">Click below to create your first Kubernetes cluster.</p>
              <button className="btn-primary" onClick={openCreateModal}>
                Deploy New Kubernetes Cluster
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-cosmic-200">
                <thead className="bg-cosmic-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      Nodes
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      Version
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-cosmic-200">
                  {filteredClusters.map((cluster) => (
                    <tr key={cluster.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-space-900">
                        {cluster.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {cluster.id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          cluster.status === 'ACTIVE' ? 'bg-success-100 text-success-800' :
                          cluster.status === 'BUILD' ? 'bg-warning-100 text-warning-800' :
                          'bg-cosmic-100 text-cosmic-800'
                        }`}>
                          {cluster.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {cluster.nodes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {cluster.version}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {cluster.creationDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-2">Manage</button>
                        <button className="text-danger-600 hover:text-danger-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-900 bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-soft p-8 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-space-900">Create New Kubernetes Cluster</h2>
                <button onClick={closeCreateModal} className="text-space-500 hover:text-space-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="clusterName" className="label">
                    Cluster Name
                  </label>
                  <input type="text" id="clusterName" className="input" placeholder="e.g., my-prod-cluster" />
                </div>

                <div>
                  <label htmlFor="k8sVersion" className="label">
                    Kubernetes Version
                  </label>
                  <input type="text" id="k8sVersion" className="input" placeholder="e.g., 1.27.3" />
                </div>

                <div>
                  <label htmlFor="nodeCount" className="label">
                    Node Count
                  </label>
                  <input type="number" id="nodeCount" className="input" placeholder="e.g., 3" min="1" />
                </div>

                <div>
                  <label htmlFor="flavor" className="label">
                    Node Flavor
                  </label>
                  <input type="text" id="flavor" className="input" placeholder="e.g., m1.small" />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Create Cluster
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Kubernetes;
