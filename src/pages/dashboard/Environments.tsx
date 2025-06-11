import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EnvironmentsTable from '../../components/dashboard/EnvironmentsTable';
import CreateProjectModal from '../../components/dashboard/CreateProjectModal';
import { useAuth } from '../../context/AuthContext';
import { OpenStackProject, DashboardEnvironment } from '../../types';
import { Plus } from 'lucide-react';

const Environments = () => {
  const { authState, selectProject } = useAuth();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [dashboardEnvironments, setDashboardEnvironments] = useState<DashboardEnvironment[]>([]);

  useEffect(() => {
    // Map user projects directly to DashboardEnvironment, as DashboardEnvironment now extends OpenStackProject
    // No need for mock data for operational status, etc., as those fields are removed from the type.
    setDashboardEnvironments(authState.userProjects);
  }, [authState.userProjects]);

  const handleProjectCreated = (newProject: OpenStackProject) => {
    console.log('New project created:', newProject);
    // The AuthContext already updates the userProjects list, which will trigger the useEffect above
  };

  const handleSelectEnvironment = async (projectId: string) => {
    // The selectProject function in AuthContext no longer requires the user's password.
    // It uses admin credentials to get a project-scoped token for the user.
    await selectProject(projectId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-space-900">Your Environments</h1>
          <button onClick={() => setIsCreateProjectModalOpen(true)} className="btn-primary">
            <Plus size={20} className="mr-2" />
            Create New Project
          </button>
        </div>

        <EnvironmentsTable
          environments={dashboardEnvironments}
          onSelectEnvironment={handleSelectEnvironment}
          selectedProjectId={authState.selectedProjectId}
        />
      </div>

      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </DashboardLayout>
  );
};

export default Environments;
