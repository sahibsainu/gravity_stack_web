import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server as ServerStack, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
// Removed: import { OpenStackProject } from '../types'; // No longer needed for project selection here

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // The login function in AuthContext now handles automatic project selection
      // and token storage for the first project.
      await login(email, password);
      navigate('/dashboard'); // Navigate directly to dashboard on successful login
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
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

              {error && (
                <div className="mb-6 bg-error-50 text-error-700 p-3 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
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
