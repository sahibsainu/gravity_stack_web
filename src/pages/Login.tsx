import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server as ServerStack, LogIn, AlertCircle, ChevronDown } from 'lucide-react'; // Import ChevronDown
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import { OpenStackProject } from '../types'; // Import OpenStackProject type

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Supabase login form, 2: Project selection
  const [userProjects, setUserProjects] = useState<OpenStackProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [projectSelectionError, setProjectSelectionError] = useState('');
  const [isProjectLoading, setIsProjectLoading] = useState(false);


  const { login, selectProject, authState } = useAuth(); // Get the new selectProject function and authState
  const navigate = useNavigate();

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const projects = await login(email, password); // login now returns projects
      setUserProjects(projects);

      if (projects.length === 0) {
          // Handle case where user has no projects
          setProjectSelectionError("No OpenStack projects found for this user. Please contact support or create a project.");
          setStep(2); // Still move to step 2 to show the message
      } else {
          // Automatically select the first project or leave for user selection
          // For now, let user select
          setStep(2); // Move to project selection step
          setSelectedProjectId(projects[0].id); // Pre-select the first project
      }

    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
      setStep(1); // Stay on step 1 on Supabase login error
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectSelection = async (e: React.FormEvent) => {
      e.preventDefault();
      setProjectSelectionError('');
      setIsProjectLoading(true);

      if (!selectedProjectId) {
          setProjectSelectionError("Please select a project.");
          setIsProjectLoading(false);
          return;
      }

      // Retrieve the OpenStack username from the authenticated user's metadata
      const openstackUsername = authState.user?.user_metadata?.openstack_username as string | undefined;

      if (!authState.user || !openstackUsername) {
          // This should ideally not happen if Supabase login was successful,
          // but adding a check for robustness.
          setProjectSelectionError("User authentication state is incomplete. Please try logging in again.");
          setIsProjectLoading(false);
          return;
      }


      try {
          // Use the password entered in step 1 and the retrieved openstackUsername
          await selectProject(selectedProjectId, openstackUsername, password);
          navigate('/dashboard'); // Navigate to dashboard after successful project authentication
      } catch (err: any) {
          setProjectSelectionError(err.message || 'Failed to authenticate with OpenStack project. Please try again.');
      } finally {
          setIsProjectLoading(false);
      }
  };


  return (
    <MainLayout>
      <div className="min-h-screen bg-cosmic-50 pt-20 pb-12">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-soft p-8"
            >
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-space-900 flex items-center justify-center">
                    <ServerStack className="h-6 w-6 text-primary-500" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-space-900">Sign in to GravityStack</h1>
                <p className="text-cosmic-600 mt-2">
                  Access your cloud infrastructure
                </p>
              </div>

              {step === 1 && error && (
                <div className="mb-6 bg-error-50 text-error-700 p-3 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

               {step === 2 && projectSelectionError && (
                <div className="mb-6 bg-error-50 text-error-700 p-3 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{projectSelectionError}</p>
                </div>
              )}


              {step === 1 && (
                <form onSubmit={handleSupabaseLogin} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="label">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label htmlFor="password" className="label">
                        Password
                      </label>
                      <Link to="#" className="text-sm text-primary-600 hover:text-primary-700">
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full btn-primary flex justify-center items-center ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <span>Signing in...</span>
                    ) : (
                      <>
                        <LogIn className="h-5 w-5 mr-2" />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {step === 2 && userProjects.length > 0 && (
                  <form onSubmit={handleProjectSelection} className="space-y-6">
                      <div>
                          <label htmlFor="project-select" className="label">
                              Select Your Project
                          </label>
                          <div className="relative">
                              <select
                                  id="project-select"
                                  value={selectedProjectId}
                                  onChange={(e) => setSelectedProjectId(e.target.value)}
                                  className="input appearance-none pr-10" // Add padding-right for icon
                                  required
                               >
                                  {/* Use project.displayName for the visible text */}
                                  {userProjects.map(project => (
                                      <option key={project.id} value={project.id}>
                                          {project.displayName}
                                      </option>
                                  ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cosmic-600">
                                  <ChevronDown className="h-4 w-4" />
                              </div>
                          </div>
                      </div>
                       <button
                          type="submit"
                          disabled={isProjectLoading}
                          className={`w-full btn-primary flex justify-center items-center ${
                            isProjectLoading ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isProjectLoading ? (
                            <span>Loading Project...</span>
                          ) : (
                            <span>Access Project</span>
                          )}
                        </button>
                  </form>
              )}

               {step === 2 && userProjects.length === 0 && !isProjectLoading && (
                   <div className="text-center text-cosmic-600">
                       <p>No OpenStack projects found for your account.</p>
                       <p className="mt-2">Please contact support or create a project via the signup process.</p>
                   </div>
               )}


              <div className="mt-6 text-center pt-6 border-t border-cosmic-100">
                <p className="text-cosmic-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                    Start a free trial
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
