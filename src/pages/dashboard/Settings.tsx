import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Key } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { authState } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    email: authState.user?.email || '',
    company: '',
    jobTitle: ''
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h1 className="text-2xl font-bold text-space-900">Account Settings</h1>
          <p className="text-cosmic-600">Manage your account preferences and settings</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <nav className="lg:w-64 bg-white rounded-xl shadow-soft p-4 h-fit">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === 'security'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50'
                  }`}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  <span>Security</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50'
                  }`}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  <span>Notifications</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('api')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === 'api'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50'
                  }`}
                >
                  <Key className="h-5 w-5 mr-3" />
                  <span>API Keys</span>
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Content Area */}
          <div className="flex-1 bg-white rounded-xl shadow-soft p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-space-900 mb-6">Profile Information</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="label">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="label">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="label">Email Address</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-cosmic-200 bg-cosmic-50 text-cosmic-500">
                        <Mail className="h-5 w-5" />
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="input rounded-l-none"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-cosmic-500 mt-1">Email addresses cannot be changed.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="label">Company (Optional)</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={profile.company}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="jobTitle" className="label">Job Title (Optional)</label>
                      <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        value={profile.jobTitle}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-cosmic-100">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-space-900 mb-6">Security Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-space-800 mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="label">Current Password</label>
                        <input
                          id="currentPassword"
                          type="password"
                          className="input"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="label">New Password</label>
                        <input
                          id="newPassword"
                          type="password"
                          className="input"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="label">Confirm New Password</label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className="input"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <button type="submit" className="btn-primary">
                        Update Password
                      </button>
                    </form>
                  </div>
                  
                  <div className="pt-6 border-t border-cosmic-100">
                    <h3 className="text-lg font-medium text-space-800 mb-4">Two-Factor Authentication</h3>
                    <p className="text-cosmic-600 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button className="btn-outline">
                      Enable 2FA
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t border-cosmic-100">
                    <h3 className="text-lg font-medium text-space-800 mb-4">Active Sessions</h3>
                    <div className="bg-cosmic-50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-space-800">Current Session</p>
                          <p className="text-sm text-cosmic-600">
                            Last active: Just now
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                    <button className="btn-ghost text-error-600 hover:text-error-700 hover:bg-error-50">
                      Sign Out All Other Sessions
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-space-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-space-800 mb-4">Email Notifications</h3>
                    
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-space-800">Service Alerts</p>
                          <p className="text-sm text-cosmic-600">
                            Receive alerts when your services experience issues
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-cosmic-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-cosmic-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </li>
                      
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-space-800">Billing Updates</p>
                          <p className="text-sm text-cosmic-600">
                            Receive notifications about billing and invoices
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-cosmic-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-cosmic-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </li>
                      
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-space-800">Security Alerts</p>
                          <p className="text-sm text-cosmic-600">
                            Receive notifications about security-related events
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-cosmic-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-cosmic-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </li>
                      
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-space-800">Product Updates</p>
                          <p className="text-sm text-cosmic-600">
                            Receive updates about new features and improvements
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-cosmic-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-cosmic-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-6 border-t border-cosmic-100">
                    <button type="submit" className="btn-primary">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* API Keys */}
            {activeTab === 'api' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-space-900 mb-6">API Keys</h2>
                
                <div className="space-y-6">
                  <p className="text-cosmic-600">
                    Create and manage API keys to interact with GravityStack programmatically.
                  </p>
                  
                  <button className="btn-primary">
                    Generate New API Key
                  </button>
                  
                  <div className="bg-cosmic-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-cosmic-600 mb-1">
                      No API keys have been created yet.
                    </p>
                    <p className="text-sm text-cosmic-600">
                      API keys allow you to authenticate with the GravityStack API and perform actions programmatically.
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-cosmic-100">
                    <h3 className="text-lg font-medium text-space-800 mb-4">API Documentation</h3>
                    <p className="text-cosmic-600 mb-4">
                      Access our comprehensive API documentation to learn how to integrate with GravityStack.
                    </p>
                    <a href="#" className="btn-outline">
                      View API Documentation
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
