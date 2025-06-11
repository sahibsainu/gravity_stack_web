import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, HardDrive } from 'lucide-react'; // Added Monitor, HardDrive
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { authState } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section & Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h1 className="text-2xl font-bold text-space-900 mb-2">
              Hi {authState.user?.user_metadata?.firstName || 'User'}
            </h1>
            <p className="text-cosmic-600">
              Welcome back! Here, you have access to check the summary of your resource usage.
              You can also access your resources through the shortcut buttons to learn more.
            </p>
          </motion.div>

          {/* Balance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h2 className="text-xl font-bold text-space-900 mb-4">Balance overview</h2>
            <div className="flex justify-between items-center mb-6">
              <p className="text-cosmic-600">Current credit balance</p>
              <span className="text-primary-500 font-bold text-lg">$0.00</span>
            </div>
            <Link to="/dashboard/billing" className="btn-primary w-full text-center">
              Access Billing
            </Link>
          </motion.div>
        </div>

        {/* Virtual Machines Overview & Volumes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Virtual Machines Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mr-3">
                <Monitor className="h-6 w-6 text-primary-500" />
              </div>
              <h2 className="text-xl font-bold text-space-900">Virtual Machines Overview</h2>
            </div>
            <ul className="space-y-2 text-cosmic-600 mb-6">
              <li className="flex justify-between"><span>Total VMs:</span> <span className="font-medium text-space-900">0</span></li>
              <li className="flex justify-between"><span>CPUs:</span> <span className="font-medium text-space-900">0</span></li>
              <li className="flex justify-between"><span>GPUs:</span> <span className="font-medium text-space-900">0</span></li>
              <li className="flex justify-between"><span>RAM:</span> <span className="font-medium text-space-900">0 GB</span></li>
            </ul>
            <div className="flex justify-between items-center border-t border-cosmic-100 pt-4">
              <span className="text-cosmic-600">Cost per hour</span>
              <span className="font-bold text-space-900">$0.00</span>
            </div>
            <Link to="/dashboard/compute" className="btn-outline w-full text-center mt-4">
              View all Virtual Machines
            </Link>
          </motion.div>

          {/* Volumes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-cosmic-50 flex items-center justify-center mr-3">
                <HardDrive className="h-6 w-6 text-cosmic-500" />
              </div>
              <h2 className="text-xl font-bold text-space-900">Volumes</h2>
            </div>
            <ul className="space-y-2 text-cosmic-600 mb-6">
              <li className="flex justify-between"><span>Total Volumes:</span> <span className="font-medium text-space-900">0</span></li>
              <li className="flex justify-between"><span>Currently using</span> <span className="font-medium text-space-900">0 GB</span></li>
            </ul>
            <div className="flex justify-between items-center border-t border-cosmic-100 pt-4">
              <span className="text-cosmic-600">Cost per hour</span>
              <span className="font-bold text-space-900">$0.00</span>
            </div>
            <Link to="/dashboard/storage" className="btn-outline w-full text-center mt-4">
              View all Volumes
            </Link>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
