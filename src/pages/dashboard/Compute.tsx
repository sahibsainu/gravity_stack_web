import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, ServerStack, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { fetchVMs } from '../../api/compute.ts'; // Added .ts extension
import { useAuth } from '../../context/AuthContext'; // Import useAuth

interface VM {
  id: string;
  name: string;
  status: string;
  ipAddress: string;
  creationDate: string;
}

const Compute = () => {
  const { authState } = useAuth(); // Get authState from context
  const { openstackToken, selectedProjectId } = authState; // Extract token and project ID

  const [vms, setVms] = useState<VM[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVMs = async () => { // Renamed function to avoid conflict with imported fetchVMs
      // Only fetch if authenticated and a project is selected
      if (!openstackToken || !selectedProjectId) {
        console.warn("Cannot fetch VMs: GravityStack token or project not available.");
        setVms([]); // Clear VMs if not authenticated/selected
        setIsLoading(false);
        setError("Please select an OpenStack project to view resources.");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        // Pass the authState object to fetchVMs
        const servers = await fetchVMs(authState); // Corrected function call
        setVms(servers);
      } catch (error) {
        console.error('Error fetching VMs:', error);
        setError('Failed to fetch virtual machines. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadVMs(); // Call the renamed function
    // Re-fetch whenever the token or selected project changes
  }, [authState, openstackToken, selectedProjectId]); // Added authState to dependency array

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* VM Listing */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-space-900">Your Virtual Machines</h2>
            <button className="btn-primary" onClick={openCreateModal}>
              <Plus className="h-5 w-5 mr-2" />
              <span>Create VM</span>
            </button>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <p className="text-cosmic-600">Loading virtual machines...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl shadow-soft p-6 text-center text-red-600">
              {error}
            </div>
          ) : vms.length === 0 ? (
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <p className="text-cosmic-600">No virtual machines found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {vms.map((vm) => (
                <motion.div
                  key={vm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-soft p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-space-900">{vm.name}</h3>
                      <p className="text-cosmic-500 text-sm">Status: {vm.status}</p>
                    </div>
                    <div>
                      <p className="text-space-700 text-sm">IP Address: {vm.ipAddress}</p>
                      <p className="text-cosmic-500 text-sm">Created: {vm.creationDate}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Create VM Modal */}
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
                <h2 className="text-xl font-bold text-space-900">Create New Virtual Machine</h2>
                <button onClick={closeCreateModal} className="text-space-500 hover:text-space-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* VM Creation Form */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="image" className="label">
                    Image
                  </label>
                  <input type="text" id="image" className="input" placeholder="Image ID" />
                </div>

                <div>
                  <label htmlFor="flavor" className="label">
                    Flavor
                  </label>
                  <input type="text" id="flavor" className="input" placeholder="Flavor ID" />
                </div>

                <div>
                  <label htmlFor="network" className="label">
                    Network
                  </label>
                  <input type="text" id="network" className="input" placeholder="Network ID" />
                </div>

                <div>
                  <label htmlFor="securityGroups" className="label">
                    Security Groups
                  </label>
                  <input
                    type="text"
                    id="securityGroups"
                    className="input"
                    placeholder="Security Group IDs (comma-separated)"
                  />
                </div>

                <div>
                  <label htmlFor="keyPair" className="label">
                    Key Pair
                  </label>
                  <input type="text" id="keyPair" className="input" placeholder="Key Pair Name" />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Create VM
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Compute;
