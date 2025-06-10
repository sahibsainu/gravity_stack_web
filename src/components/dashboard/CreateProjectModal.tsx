import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OpenStackProject } from '../../types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: OpenStackProject) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authState, addProject } = useAuth();

  const handleCreateProject = async () => {
    setError(null); // Clear previous errors

    // Basic validation
    if (!projectName.trim()) {
      setError('Project name cannot be empty.');
      return;
    }

    // Check for duplicate display names among existing projects
    const isDuplicate = authState.userProjects.some(
      (project) => project.displayName.toLowerCase() === projectName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setError(`A project with the name "${projectName.trim()}" already exists.`);
      return;
    }

    setIsLoading(true);
    try {
      const newProject = await addProject(projectName.trim());
      onProjectCreated(newProject); // Notify parent component
      setProjectName(''); // Clear input
      onClose(); // Close modal
    } catch (err: any) {
      console.error('Failed to create project:', err);
      setError(err.message || 'Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-soft p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-space-900">Create New Project</h2>
          <button onClick={onClose} className="text-cosmic-500 hover:text-cosmic-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="bg-danger-100 text-danger-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="projectName" className="block text-sm font-medium text-cosmic-700 mb-2">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="form-input w-full"
            placeholder="e.g., My First Project"
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="btn-outline" disabled={isLoading}>
            Cancel
          </button>
          <button onClick={handleCreateProject} className="btn-primary" disabled={isLoading || !projectName.trim()}>
            {isLoading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
