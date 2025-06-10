import React, { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Server as ServerStack,
  Database,
  Menu,
  X,
  Container,
  Home,
  Settings,
  CreditCard,
  LogOut,
  User,
  Monitor,
  ChevronDown,
  HardDrive, // For Volumes
  Cloud, // For Environments
  Key, // For Key Pairs
  Shield, // For Firewalls (using Shield as a close match)
  Package, // For Deployments
  Camera, // For Snapshots
  Image, // For Images
  Sparkles, // For Gen AI
  Users, // For My Organization
  KeySquare, // For API Keys
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [environmentsDropdownOpen, setEnvironmentsDropdownOpen] = useState(false); // State for Environments dropdown
  const { authState, logout, selectProject } = useAuth(); // Get selectProject
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Find the currently selected project object
  const selectedProject = authState.userProjects.find(
    (p) => p.id === authState.selectedProjectId
  );

  // Handle project selection from dropdown
  const handleProjectSelect = async (projectId: string) => {
    if (authState.user?.user_metadata?.openstack_username && authState.user?.user_metadata?.password) {
        // Assuming password is still available or can be re-prompted/stored securely
        // For this example, we'll use the password from user_metadata (NOT SECURE FOR PRODUCTION)
        // A production app would handle this differently (e.g., re-prompting, token refresh)
        await selectProject(projectId, authState.user.user_metadata.openstack_username, authState.user.user_metadata.password);
        setEnvironmentsDropdownOpen(false); // Close dropdown after selection
    } else {
        // Handle case where username or password is not available
        console.error("Cannot switch project: OpenStack username or password not available.");
        // Potentially navigate to a re-authentication or project selection page
    }
  };


  return (
    <div className="flex h-screen bg-cosmic-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-soft">
        <div className="flex items-center justify-center h-16 px-4 border-b border-cosmic-100">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-space-900 flex items-center justify-center">
              <ServerStack className="text-primary-500 h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-space-900">GravityStack</span>
          </NavLink>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>

          <div className="pt-4 pb-2">
            <div className="text-xs font-semibold text-cosmic-500 uppercase tracking-wider">
              Cloud
            </div>
          </div>

          <NavLink
            to="/dashboard/compute"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <ServerStack size={20} />
            <span>Virtual Machines</span>
          </NavLink>

          <NavLink
            to="/dashboard/kubernetes"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Container size={20} />
            <span>Kubernetes</span>
          </NavLink>

          <NavLink
            to="/dashboard/storage"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <HardDrive size={20} />
            <span>Volumes</span>
          </NavLink>

          {/* Environments Section with Project Dropdown */}
          <div>
            <button
              onClick={() => setEnvironmentsDropdownOpen(!environmentsDropdownOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${
                environmentsDropdownOpen
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`}
            >
              <div className="flex items-center space-x-2">
                <Cloud size={20} />
                <span>Environments</span>
              </div>
              <ChevronDown size={16} className={`transform transition-transform ${environmentsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {environmentsDropdownOpen && (
              <div className="pl-8 py-1 space-y-1">
                {authState.userProjects.length > 0 ? (
                  authState.userProjects.map((project) => (
                    <button
                      key={project.id}
                      className={`block w-full text-left px-4 py-2 rounded-lg text-sm ${
                        authState.selectedProjectId === project.id
                          ? 'bg-primary-100 text-primary-800 font-semibold'
                          : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                      } transition-colors duration-200`}
                      onClick={() => handleProjectSelect(project.id)}
                    >
                      {project.displayName}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-cosmic-500">No projects found.</p>
                )}
              </div>
            )}
          </div>

          <NavLink
            to="/dashboard/key-pairs"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Key size={20} />
            <span>Key Pairs</span>
          </NavLink>

          <NavLink
            to="/dashboard/firewalls"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Shield size={20} />
            <span>Firewalls</span>
          </NavLink>

          <NavLink
            to="/dashboard/deployments"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Package size={20} />
            <span>Deployments</span>
          </NavLink>

          <NavLink
            to="/dashboard/snapshots"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Camera size={20} />
            <span>Snapshots</span>
          </NavLink>

          <NavLink
            to="/dashboard/images"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Image size={20} />
            <span>Images</span>
          </NavLink>

          <NavLink
            to="/dashboard/gen-ai"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Sparkles size={20} />
            <span>Gen AI</span>
          </NavLink>

          <div className="pt-4 pb-2">
            <div className="text-xs font-semibold text-cosmic-500 uppercase tracking-wider">
              Account
            </div>
          </div>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <User size={20} />
            <span>My Account</span>
          </NavLink>

          <NavLink
            to="/dashboard/billing"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <CreditCard size={20} />
            <span>Billing</span>
          </NavLink>

          <NavLink
            to="/dashboard/organization"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <Users size={20} />
            <span>My Organization</span>
          </NavLink>

          <NavLink
            to="/dashboard/api-keys"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
              } transition-colors duration-200`
            }
          >
            <KeySquare size={20} />
            <span>API Keys</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-cosmic-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 w-full text-left text-space-600 hover:bg-cosmic-50 hover:text-space-900 rounded-lg transition-colors duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <div
            className="absolute inset-0 bg-cosmic-900 bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />

          <nav className="relative w-80 max-w-[calc(100%-4rem)] h-full bg-white shadow-soft overflow-y-auto">
            <div className="flex items-center justify-between h-16 px-6 border-b border-cosmic-100">
              <NavLink to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-space-900 flex items-center justify-center">
                  <ServerStack className="text-primary-500 h-5 w-5" />
                </div>
                <span className="font-bold text-lg text-space-900">GravityStack</span>
              </NavLink>

              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} className="text-space-500" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </NavLink>

              <div className="pt-4 pb-2">
                <div className="text-xs font-semibold text-cosmic-500 uppercase tracking-wider">
                  Cloud
                </div>
              </div>

              <NavLink
                to="/dashboard/compute"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <ServerStack size={20} />
                <span>Virtual Machines</span>
              </NavLink>

              <NavLink
                to="/dashboard/kubernetes"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Container size={20} />
                <span>Kubernetes</span>
              </NavLink>

              <NavLink
                to="/dashboard/storage"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <HardDrive size={20} />
                <span>Volumes</span>
              </NavLink>

              {/* Environments Section with Project Dropdown (Mobile) */}
              <div>
                <button
                  onClick={() => setEnvironmentsDropdownOpen(!environmentsDropdownOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${
                    environmentsDropdownOpen
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`}
                >
                  <div className="flex items-center space-x-2">
                    <Cloud size={20} />
                    <span>Environments</span>
                  </div>
                  <ChevronDown size={16} className={`transform transition-transform ${environmentsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {environmentsDropdownOpen && (
                  <div className="pl-8 py-1 space-y-1">
                    {authState.userProjects.length > 0 ? (
                      authState.userProjects.map((project) => (
                        <button
                          key={project.id}
                          className={`block w-full text-left px-4 py-2 rounded-lg text-sm ${
                            authState.selectedProjectId === project.id
                              ? 'bg-primary-100 text-primary-800 font-semibold'
                              : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                          } transition-colors duration-200`}
                          onClick={() => {
                            handleProjectSelect(project.id);
                            setSidebarOpen(false); // Close mobile sidebar on selection
                          }}
                        >
                          {project.displayName}
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-sm text-cosmic-500">No projects found.</p>
                    )}
                  </div>
                )}
              </div>

              <NavLink
                to="/dashboard/key-pairs"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Key size={20} />
                <span>Key Pairs</span>
              </NavLink>

              <NavLink
                to="/dashboard/firewalls"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Shield size={20} />
                <span>Firewalls</span>
              </NavLink>

              <NavLink
                to="/dashboard/deployments"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Package size={20} />
                <span>Deployments</span>
              </NavLink>

              <NavLink
                to="/dashboard/snapshots"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Camera size={20} />
                <span>Snapshots</span>
              </NavLink>

              <NavLink
                to="/dashboard/images"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Image size={20} />
                <span>Images</span>
              </NavLink>

              <NavLink
                to="/dashboard/gen-ai"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Sparkles size={20} />
                <span>Gen AI</span>
              </NavLink>

              <div className="pt-4 pb-2">
                <div className="text-xs font-semibold text-cosmic-500 uppercase tracking-wider">
                  Account
                </div>
              </div>

              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <User size={20} />
                <span>My Account</span>
              </NavLink>

              <NavLink
                to="/dashboard/billing"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <CreditCard size={20} />
                <span>Billing</span>
              </NavLink>

              <NavLink
                to="/dashboard/organization"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Users size={20} />
                <span>My Organization</span>
              </NavLink>

              <NavLink
                to="/dashboard/api-keys"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-space-600 hover:bg-cosmic-50 hover:text-space-900'
                  } transition-colors duration-200`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <KeySquare size={20} />
                <span>API Keys</span>
              </NavLink>
            </div>

            <div className="p-4 border-t border-cosmic-100">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 w-full text-left text-space-600 hover:bg-cosmic-50 hover:text-space-900 rounded-lg transition-colors duration-200"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </motion.div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-soft z-10">
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-space-500 hover:text-space-700"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 flex justify-end items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-space-900">
                    {authState.user?.user_metadata?.firstName || authState.user?.email}
                  </p>
                  <p className="text-xs text-cosmic-500">
                    {authState.user?.user_metadata?.firstName ? authState.user?.email : 'User'}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <User size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-cosmic-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
