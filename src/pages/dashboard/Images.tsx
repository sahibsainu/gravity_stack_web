import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { fetchImages } from '../../api/compute'; // Using compute for now, ideally separate API
import { useAuth } from '../../context/AuthContext';
import { Image } from '../../types/openstack';

const Images = () => {
  const { authState } = useAuth();
  const { openstackToken, selectedProjectId } = authState;

  const [images, setImages] = useState<Image[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      if (!openstackToken || !selectedProjectId) {
        console.warn("Cannot fetch images: GravityStack token or project not available.");
        setImages([]);
        setIsLoading(false);
        setError("Please select an OpenStack project to view resources.");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const fetchedImages = await fetchImages(authState);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [authState, openstackToken, selectedProjectId]);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-space-900">My Images</h1>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cosmic-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for an image"
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-primary w-full md:w-auto" onClick={openCreateModal}>
              <Plus className="h-5 w-5 mr-2" />
              <span>Create New Image</span>
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-cosmic-600">Loading images...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">
              {error}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-cosmic-600 mb-4">You have not created any image yet.</p>
              <p className="text-cosmic-600 mb-6">Click below to create your first image.</p>
              <button className="btn-primary" onClick={openCreateModal}>
                Create New Image
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
                      Type
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
                  {filteredImages.map((image) => (
                    <tr key={image.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-space-900">
                        {image.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {image.id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {image.sizeGb}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          image.status === 'active' ? 'bg-success-100 text-success-800' :
                          image.status === 'queued' ? 'bg-warning-100 text-warning-800' :
                          'bg-cosmic-100 text-cosmic-800'
                        }`}>
                          {image.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {image.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                        {image.creationDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-2">View</button>
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
                <h2 className="text-xl font-bold text-space-900">Create New Image</h2>
                <button onClick={closeCreateModal} className="text-space-500 hover:text-space-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="imageName" className="label">
                    Image Name
                  </label>
                  <input type="text" id="imageName" className="input" placeholder="e.g., my-custom-os" />
                </div>

                <div>
                  <label htmlFor="imageSource" className="label">
                    Image Source (URL or File)
                  </label>
                  <input type="text" id="imageSource" className="input" placeholder="e.g., http://example.com/image.qcow2" />
                </div>

                <div>
                  <label htmlFor="imageVisibility" className="label">
                    Visibility
                  </label>
                  <select id="imageVisibility" className="input">
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Create Image
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Images;
