import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server as ServerStack, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import { provisionOpenStackUserAndProject, listUserProjects } from '../api/openstack'; // Import listUserProjects
import { generateRandomString, getBaseProjectName, log, logError } from '../utils'; // Import utilities
import { supabase } from '../utils/supabaseClient'; // Import supabase client

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provisioningError, setProvisioningError] = useState(''); // Keep provisioning error state

  const { register, setUserProjects, selectProject } = useAuth(); // Get setUserProjects, selectProject
  const navigate = useNavigate();

  // Function to suggest a default project name
  const suggestProjectName = (email: string): string => {
    // Simple suggestion: use the part before '@' and sanitize
    const usernamePart = email.split('@')[0];
    // Replace non-alphanumeric characters with hyphens, convert to lowercase
    const sanitizedName = usernamePart.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    // Remove leading/trailing hyphens and multiple consecutive hyphens
    return sanitizedName.replace(/^-+|-+$/g, '').replace(/-+/g, '-');
  };

  const handleSignupAndProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProvisioningError(''); // Clear provisioning error

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Supabase registration
      await register(email, password);
      log('[Signup] Supabase registration successful.');

      // Step 2: Provision OpenStack user and a default project
      const defaultProjectName = suggestProjectName(email);
      log(`[Signup] Provisioning OpenStack user and default project: ${defaultProjectName}`);
      const { userId: openstackUserId, projectId: provisionedProjectId, openstackUsername } = await provisionOpenStackUserAndProject(email, password, defaultProjectName);
      log(`[Signup] OpenStack user ID: ${openstackUserId}, Project ID: ${provisionedProjectId}, Username: ${openstackUsername}`);

      // Step 3: Fetch updated user and projects from Supabase after metadata update
      log('[Signup] Fetching updated user after provisioning...');
      const { data: { user: updatedUser }, error: fetchUserError } = await supabase.auth.getUser();

      if (fetchUserError || !updatedUser) {
          logError("[Signup] Failed to fetch updated user after provisioning:", fetchUserError);
          throw new Error("Failed to retrieve user information after provisioning.");
      }

      log("[Signup] Fetched updated user:", updatedUser);
      log("[Signup] Fetched updated user metadata (GravityStack info):", updatedUser.user_metadata);

      // Step 4: Fetch the user's projects using the retrieved OpenStack user ID
      log(`[Signup] Fetching projects for GravityStack user ID: ${openstackUserId}`);
      const projects = await listUserProjects(openstackUserId);
      log("[Signup] Fetched user projects:", projects);

      if (projects.length === 0) {
          throw new Error("No projects found after provisioning.");
      }

      // Step 5: Update the auth state in the context with the fetched projects
      setUserProjects(projects);

      // Step 6: Automatically select the first project and get the token
      log(`[Signup] Selecting project ID: ${provisionedProjectId}`);
      await selectProject(provisionedProjectId); // No need to pass password here, selectProject now uses admin token
      log('[Signup] Project selected successfully.');

      // Provisioning successful, navigate to dashboard environments page
      log('[Signup] Provisioning and project setup successful. Navigating to dashboard environments.');
      navigate('/dashboard/environments');
    } catch (err: any) {
      logError('[Signup] Signup and provisioning failed:', err);
      setProvisioningError(err.message || 'Failed to create account or provision cloud resources. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-cosmic-50 pt-20 pb-12">
        <div className="container-custom">
          <div className="max-w-lg mx-auto">
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
                <h1 className="text-2xl font-bold text-space-900">
                  Start Your Free Trial
                </h1>
                <p className="text-cosmic-600 mt-2">
                  Get full access to all features for 14 days, no credit card required
                </p>
              </div>

              {error && (
                <div className="mb-6 bg-error-50 text-error-700 p-3 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

               {provisioningError && (
                <div className="mb-6 bg-error-50 text-error-700 p-3 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{provisioningError}</p>
                </div>
              )}

                <form onSubmit={handleSignupAndProvision} className="space-y-6">
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
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="label">
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          type="checkbox"
                          required
                          className="w-4 h-4 border rounded focus:ring-primary-500 text-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-cosmic-600">
                          I agree to the{' '}
                          <Link to="#" className="text-primary-600 hover:text-primary-700">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="#" className="text-primary-600 hover:text-primary-700">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full btn-primary flex justify-center items-center ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <span>Creating Account & Project...</span>
                    ) : (
                      <span>Create Account & Start Free Trial</span>
                    )}
                  </button>
                </form>

              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                  </div>
                  <p className="ml-2 text-sm text-cosmic-600">
                    <span className="font-medium text-space-900">No credit card required</span> — Start your 14-day trial without any payment information
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                  </div>
                  <p className="ml-2 text-sm text-cosmic-600">
                    <span className="font-medium text-space-900">Full access to all features</span> — Try everything GravityStack has to offer
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                  </div>
                  <p className="ml-2 text-sm text-cosmic-600">
                    <span className="font-medium text-space-900">Easy cancelation</span> — Cancel at any time, no questions asked
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center pt-6 border-t border-cosmic-100">
                <p className="text-cosmic-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign in
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

export default Signup;
