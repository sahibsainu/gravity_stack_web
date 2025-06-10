import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, RefreshCw, CloudCog, Zap, Shield, Clock, Layers, BarChart3, Globe } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const ProductKubernetes = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-space-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Managed <span className="text-primary-400">Kubernetes Services</span> Made Simple
              </h1>
              <p className="text-xl text-cosmic-200 mb-8">
                Deploy, manage, and scale containerized applications with ease using our fully managed Kubernetes platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="btn-primary px-8 py-4">
                  Get Started
                </Link>
                <Link to="/pricing" className="btn-outline px-8 py-4">
                  View Pricing
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary-500 rounded-xl opacity-10 blur-xl transform -rotate-6"></div>
                <div className="relative bg-space-800 rounded-xl p-8 border border-space-700">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <Container className="h-6 w-6 text-primary-400 mr-2" />
                      <h3 className="text-xl font-semibold text-white">Kubernetes Cluster</h3>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-success-500 bg-opacity-20 text-success-400 text-sm">
                      Healthy
                    </div>
                  </div>
                  
                  <div className="space-y-5 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-cosmic-400">CPU Usage</span>
                        <span className="font-medium text-white">67%</span>
                      </div>
                      <div className="w-full bg-space-700 rounded-full h-2">
                        <div 
                          className="bg-primary-500 rounded-full h-2" 
                          style={{ width: '67%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-cosmic-400">Memory Usage</span>
                        <span className="font-medium text-white">43%</span>
                      </div>
                      <div className="w-full bg-space-700 rounded-full h-2">
                        <div 
                          className="bg-primary-500 rounded-full h-2" 
                          style={{ width: '43%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-space-700 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Worker Nodes</span>
                        <span className="font-medium text-white">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Pods Running</span>
                        <span className="font-medium text-white">28</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Kubernetes Version</span>
                        <span className="font-medium text-white">1.27.3</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-space-700 grid grid-cols-2 gap-3">
                    <button className="py-2 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
                      Scale Cluster
                    </button>
                    <button className="py-2 rounded-lg bg-space-700 text-white font-medium hover:bg-space-600 transition-colors">
                      View Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kubernetes Features That Streamline Operations
            </h2>
            <p className="text-lg text-cosmic-600">
              Focus on your applications while we handle the complexities of Kubernetes infrastructure management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Deployment</h3>
              <p className="text-cosmic-600">
                Deploy Kubernetes clusters in minutes with a simple, intuitive interface. No complex setup required.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <RefreshCw className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto-Scaling</h3>
              <p className="text-cosmic-600">
                Automatically scale your clusters up or down based on workload demands to optimize performance and costs.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <CloudCog className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Updates</h3>
              <p className="text-cosmic-600">
                Stay current with automated Kubernetes version updates and security patches with zero downtime.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-cosmic-600">
                Advanced security features including role-based access control, network policies, and encrypted communication.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Cloud Support</h3>
              <p className="text-cosmic-600">
                Deploy and manage Kubernetes clusters across multiple cloud providers with consistent tooling and workflows.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Monitoring</h3>
              <p className="text-cosmic-600">
                Detailed insights into cluster health, performance metrics, and resource utilization with intuitive dashboards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-cosmic-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose GravityStack Kubernetes?
            </h2>
            <p className="text-lg text-cosmic-600">
              See how our managed Kubernetes service eliminates complexity while providing enterprise-grade features
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-soft">
              <thead>
                <tr className="bg-space-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-space-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-space-900">GravityStack Kubernetes</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-space-900">Self-Managed Kubernetes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic-100">
                <tr>
                  <td className="px-6 py-4 text-space-900">Cluster Provisioning</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">One-click deployment</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Manual setup and configuration</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Maintenance Overhead</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Fully managed</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">High (requires dedicated team)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Control Plane Management</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Included and managed</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Manual setup and management</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Kubernetes Version Updates</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Automatic with zero downtime</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Manual, complex process</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Monitoring & Logging</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Integrated, out of the box</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Requires additional setup</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Security Management</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Enterprise-grade included</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Requires expertise and configuration</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Auto-Scaling</td>
                  <td className="px-6 py-4 text-centertext-cosmic-600">Built-in, easy to configure</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Requires additional setup</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Total Cost of Ownership</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Low and predictable</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">High (infrastructure + expertise)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-space-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Simplify Your Container Orchestration?
            </h2>
            <p className="text-lg text-cosmic-200 mb-8">
              Start your free trial today and experience the power and simplicity of GravityStack Kubernetes Services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="btn-primary px-8 py-4">
                Get Started
              </Link>
              <Link to="/products/compute" className="btn-outline px-8 py-4">
                Explore Cloud Computing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductKubernetes;
