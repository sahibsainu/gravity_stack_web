import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { fetchVolumes } from '../../api/compute'; // Using compute for now, ideally separate API
import { useAuth } from '../../context/AuthContext';
import { Volume } from '../../types/openstack';

const Volumes = () => {
  const { authState } = useAuth();
  const { openstackToken, selectedProjectId } = authState;

  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadVolumes = async () => {
      if (!openstackToken || !selectedProjectId) {
        console.warn("Cannot fetch volumes: GravityStack token or project not available.");
        setVolumes([]);
        setIsLoading(false);
        setError("Please select an OpenStack project to view resources.");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const fetchedVolumes = await fetchVolumes(authState);
        setVolumes(fetchedVolumes);
      } catch (error) {
        console.error('Error fetching volumes:', error);
        setError('Failed to fetch volumes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadVolumes();
  }, [authState, openstackToken, selectedProjectId]);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const filteredVolumes = volumes.filter(volume =>
    volume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volume.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volume.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volume.attachedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-space-900">My Volumes</h1>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cosmic-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for a volume"
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-primary w-full md:w-auto" onClick={openCreateModal}>
              <Plus className="h-5 w-5 mr-2" />
              <span>Create New Volume</span>
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-cosmic-600">Loading volumes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">
              {error}
            </div>
          ) : filteredVolumes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-cosmic-600 mb-4">You have not created any volume yet.</p>
              <p className="text-cosmic-600 mb-6">Click below to create your first volume.</p>
              <button className="btn-primary" onClick={openCreateModal}>
                Create New Volume
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
                      Size (GB)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                      Attached To
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
                  {filteredVolumes.map((volume) => (
                    <tr key={volume.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-space-900">
                        {volume.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {volume.id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {volume.sizeGb}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          volume.status === 'in-use' ? 'bg-primary-100 text-primary-800' :
                          volume.status === 'available' ? 'bg-success-100 text-success-800' :
                          'bg-cosmic-100 text-cosmic-800'
                        }`}>
                          {volume.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {volume.attachedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {volume.creationDate}
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
                <h2 className="text-xl font-bold text-space-900">Create New Volume</h2>
                <button onClick={closeCreateModal} className="text-space-500 hover:text-space-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="volumeName" className="label">
                    Volume Name
                  </label>
                  <input type="text" id="volumeName" className="input" placeholder="e.g., my-data-volume" />
                </div>

                <div>
                  <label htmlFor="volumeSize" className="label">
                    Size (GB)
                  </label>
                  <input type="number" id="volumeSize" className="input" placeholder="e.g., 100" min="1" />
                </div>

                <div>
                  <label htmlFor="volumeType" className="label">
                    Volume Type
                  </label>
                  <input type="text" id="volumeType" className="input" placeholder="e.g., SSD, HDD" />
                </div>

                <div>
                  <label htmlFor="availabilityZone" className="label">
                    Availability Zone
                  </label>
                  <input type="text" id="availabilityZone" className="input" placeholder="e.g., nova" />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Create Volume
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Volumes;
