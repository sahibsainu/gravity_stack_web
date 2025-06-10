import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server as ServerStack, Database, Container, Plus, ArrowRight, Clock, BarChart3, Shield } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ServiceCard from '../../components/ui/ServiceCard';
import { mockServices } from '../../utils/mockData';
import { useAuth } from '../../context/AuthContext';
import CreateProjectModal from '../../components/dashboard/CreateProjectModal'; // Import the new modal component
import { OpenStackProject } from '../../types'; // Import OpenStackProject type

const Dashboard = () => {
  const { authState } = useAuth();
  const runningServices = mockServices.filter(service => service.status === 'running').length;

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  const handleProjectCreated = (newProject: OpenStackProject) => {
    // Optional: Do something after project is created, e.g., show a success message
    console.log('New project created:', newProject);
    // The AuthContext already updates the userProjects list
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-space-900 mb-2">
                Welcome back, {authState.user?.user_metadata?.firstName || 'User'}!
              </h1>
              <p className="text-cosmic-600">
                Your cloud infrastructure at a glance
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              {/* Placeholder for Create Resource/Project */}
              {/* This button could potentially lead to a page/modal to select resource type */}
              {/* Removed the "Create Resource" button */}
              {/* <Link to="/dashboard/create-resource" className="btn-primary">
                <Plus className="h-5 w-5 mr-2" />
                <span>Create Resource</span>
              </Link> */}
              {/* Button to open the Create New Project modal */}
              <button onClick={() => setIsCreateProjectModalOpen(true)} className="btn-outline">
                <span>Create New Project</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-cosmic-500 text-sm">Active Services</p>
                <h3 className="text-3xl font-bold text-space-900 mt-1">{runningServices}</h3>
              </div>
              <div className="bg-primary-100 p-2 rounded-lg">
                <ServerStack className="h-6 w-6 text-primary-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className="text-success-500 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  100% Uptime
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-cosmic-500 text-sm">Storage Used</p>
                <h3 className="text-3xl font-bold text-space-900 mt-1">156.2 GB</h3>
              </div>
              <div className="bg-cosmic-100 p-2 rounded-lg">
                <Database className="h-6 w-6 text-cosmic-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-cosmic-100 rounded-full h-2">
                <div className="bg-cosmic-500 rounded-full h-2" style={{ width: '35%' }}></div>
              </div>
              <p className="text-cosmic-500 text-xs mt-1">35% of 500 GB</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-cosmic-500 text-sm">Billing Status</p>
                <h3 className="text-3xl font-bold text-space-900 mt-1">$29.00</h3>
              </div>
              <div className="bg-success-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-success-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className="text-cosmic-600">
                  Trial ends in 10 days
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-space-900">Your Services</h2>
            <Link to="/dashboard" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
              <span>View All</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: mockServices.length * 0.1 }}
              className="border-2 border-dashed border-cosmic-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px] text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-cosmic-50 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-cosmic-500" />
              </div>
              <h3 className="font-medium text-space-900 mb-2">Add New Service</h3>
              <p className="text-cosmic-500 text-sm mb-4">Deploy compute, storage, or Kubernetes</p>
              {/* This button could also potentially open the Create Resource flow */}
              <button className="btn-outline">
                Create Service
              </button>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-space-900 mb-6">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/dashboard/compute"
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mr-4">
                  <ServerStack className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-medium text-space-900">Deploy Virtual Machine</h3>
                  <p className="text-cosmic-500 text-sm">Create a new VM instance</p>
                </div>
              </div>
            </Link>

            <Link
              to="/dashboard/storage"
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-cosmic-50 flex items-center justify-center mr-4">
                  <Database className="h-5 w-5 text-cosmic-500" />
                </div>
                <div>
                  <h3 className="font-medium text-space-900">Create Storage Bucket</h3>
                  <p className="text-cosmic-500 text-sm">Add S3-compatible storage</p>
                </div>
              </div>
            </Link>

            <Link
              to="/dashboard/kubernetes"
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-space-50 flex items-center justify-center mr-4">
                  <Container className="h-5 w-5 text-space-500" />
                </div>
                <div>
                  <h3 className="font-medium text-space-900">Launch Kubernetes Cluster</h3>
                  <p className="text-cosmic-500 text-sm">Deploy containerized apps</p>
                </div>
              </div>
            </Link>

            <Link
              to="/dashboard/billing"
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-success-50 flex items-center justify-center mr-4">
                  <BarChart3 className="h-5 w-5 text-success-500" />
                </div>
                <div>
                  <h3 className="font-medium text-space-900">View Usage Reports</h3>
                  <p className="text-cosmic-500 text-sm">Monitor your resource usage</p>
                </div>
              </div>
            </Link>

            <Link
              to="/dashboard/settings"
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-warning-50 flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-warning-500" />
                </div>
                <div>
                  <h3 className="font-medium text-space-900">Security Settings</h3>
                  <p className="text-cosmic-500 text-sm">Manage access controls</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
