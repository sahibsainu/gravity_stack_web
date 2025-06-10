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
  const [step, setStep] = useState(1); // 1: Supabase signup, 2: OpenStack project name
  const [openstackProjectName, setOpenstackProjectName] = useState('');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningError, setProvisioningError] = useState('');

  const { register, authState, setUserProjects, selectProject } = useAuth(); // Get authState, setUserProjects, selectProject
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

  const handleSupabaseSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
      await register(email, password);
      // Supabase registration successful, move to step 2
      setStep(2);
      // Suggest a default project name based on email
      setOpenstackProjectName(suggestProjectName(email));
    } catch (err: any) {
      logError('[Signup] Supabase signup failed:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenStackProvisioning = async (e: React.FormEvent) => {
    e.preventDefault();
    setProvisioningError('');
    setIsProvisioning(true);

    const trimmedProjectName = openstackProjectName.trim();

    // Basic validation for project name
    if (!trimmedProjectName) {
      setProvisioningError('OpenStack project name cannot be empty.');
      setIsProvisioning(false);
      return;
    }

    // --- Duplicate Project Name Check ---
    // Check if the user already has a project with this base name
    const existingProjectNames = authState.userProjects.map(p => p.displayName.toLowerCase());
    if (existingProjectNames.includes(trimmedProjectName.toLowerCase())) {
        setProvisioningError(`You already have a project named "${trimmedProjectName}". Please choose a different name.`);
        setIsProvisioning(false);
        return;
    }
    // --- End Duplicate Check ---


    try {
      // Use the email as the username for OpenStack as per requirement
      // The provisionOpenStackUserAndProject function now handles adding the random suffix
      await provisionOpenStackUserAndProject(email, password, trimmedProjectName);

      // --- Start: New logic to fetch and select project after provisioning ---
      // Explicitly fetch the latest user data after provisioning completes
      log('[Signup] Fetching updated user after provisioning...');
      const { data: { user: updatedUser }, error: fetchUserError } = await supabase.auth.getUser();

      if (fetchUserError || !updatedUser) {
          logError("[Signup] Failed to fetch updated user after provisioning:", fetchUserError);
          throw new Error("Failed to retrieve user information after provisioning.");
      }

      log("[Signup] Fetched updated user:", updatedUser); // Log the full user object
      // Updated log message for metadata
      log("[Signup] Fetched updated user metadata (GravityStack info):", updatedUser.user_metadata); // Log the metadata

      // Get the OpenStack user ID and username from the *updated* user's metadata
      const openstackUserId = updatedUser.user_metadata?.openstack_user_id as string | undefined;
      const openstackUsername = updatedUser.user_metadata?.openstack_username as string | undefined;

      // Updated log messages
      log(`[Signup] Retrieved gravitystackUserId: ${openstackUserId}`); // Log the retrieved ID
      log(`[Signup] Retrieved gravitystackUsername: ${openstackUsername}`); // Log the retrieved username value

      if (!openstackUserId) {
          logError("[Signup] OpenStack user ID missing in fetched metadata:", updatedUser.user_metadata); // Add log
          throw new Error("OpenStack user ID not found in updated user metadata.");
      }

       if (!openstackUsername) {
           logError("[Signup] OpenStack username missing in fetched metadata:", updatedUser.user_metadata); // Add log
           throw new Error("OpenStack username not found in user metadata.");
      }


      // Fetch the user's projects using the retrieved OpenStack user ID
      // Updated log message
      log(`[Signup] Fetching projects for GravityStack user ID: ${openstackUserId}`);
      const projects = await listUserProjects(openstackUserId);
      log("[Signup] Fetched user projects:", projects);


      if (projects.length === 0) {
          throw new Error("No projects found after provisioning.");
      }

      // Update the auth state in the context with the fetched projects
      // setUserProjects now handles adding the displayName
      setUserProjects(projects);

      // Automatically select the first project and get the token
      const firstProjectId = projects[0].id;
      // Updated log message
      log(`[Signup] Selecting project ID: ${firstProjectId} for GravityStack username: ${openstackUsername}`);
      // Pass the retrieved openstackUsername directly to selectProject
      await selectProject(firstProjectId, openstackUsername, password); // Use the password entered during signup

      // --- End: New logic ---

      // Provisioning successful, navigate to dashboard
      log('[Signup] Provisioning and project setup successful. Navigating to dashboard.');
      navigate('/dashboard');
    } catch (err: any) {
      logError("[Signup] Provisioning and project setup failed:", err);
      setProvisioningError(err.message || 'Failed to provision OpenStack resources or set up project. Please contact support.');
    } finally {
      setIsProvisioning(false);
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
                  {step === 1 ? 'Start Your Free Trial' : 'Setup Your Cloud Project'}
                </h1>
                <p className="text-cosmic-600 mt-2">
                  {step === 1
                    ? 'Get full access to all features for 14 days, no credit card required'
                    : 'Tell us about your first GravityStack project'}
                </p>
              </div>

              {step === 1 && error && (
                <div className="mb-6 bg-error-50 text-error-700 p-3 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

               {step === 2 && provisioningError && (
                <div className="mb-6 bg-error-50 text-error-700 p-3 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{provisioningError}</p>
                </div>
              )}


              {step === 1 && (
                <form onSubmit={handleSupabaseSignup} className="space-y-6">
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
                      <span>Creating Account...</span>
                    ) : (
                      <span>Create Account & Start Free Trial</span>
                    )}
                  </button>
                </form>
              )}

              {step === 2 && (
                 <form onSubmit={handleOpenStackProvisioning} className="space-y-6">
                    <div>
                      <label htmlFor="openstack-project-name" className="label">
                        Project Name
                      </label>
                      <input
                        id="openstack-project-name"
                        type="text"
                        value={openstackProjectName}
                        onChange={(e) => setOpenstackProjectName(e.target.value)}
                        className="input"
                        placeholder="e.g., my-first-project"
                        required
                      />
                       <p className="mt-2 text-sm text-cosmic-600">
                        Choose a name for your primary GravityStack project.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isProvisioning}
                      className={`w-full btn-primary flex justify-center items-center ${
                        isProvisioning ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProvisioning ? (
                        <span>Setting up Project...</span>
                      ) : (
                        <span>Setup My Project</span>
                      )}
                    </button>
                 </form>
              )}


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
