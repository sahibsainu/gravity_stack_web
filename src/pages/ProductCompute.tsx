import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server as ServerStack, Clock, Zap, Shield, CreditCard, Cpu, CloudCog, Gauge } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const ProductCompute = () => {
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
                Scalable <span className="text-primary-400">Cloud Computing</span> for Any Workload
              </h1>
              <p className="text-xl text-cosmic-200 mb-8">
                High-performance virtual machines designed for your most demanding applications. Deploy in seconds, scale with ease.
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
                      <ServerStack className="h-6 w-6 text-primary-400 mr-2" />
                      <h3 className="text-xl font-semibold text-white">Virtual Machine</h3>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary-500 bg-opacity-20 text-primary-400 text-sm">
                      Running
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Cpu className="h-5 w-5 text-cosmic-400 mr-2" />
                        <span className="text-cosmic-300">CPU</span>
                      </div>
                      <span className="font-medium text-white">4 vCPUs</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-cosmic-400 mr-2" />
                        <span className="text-cosmic-300">Memory</span>
                      </div>
                      <span className="font-medium text-white">16 GB</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CloudCog className="h-5 w-5 text-cosmic-400 mr-2" />
                        <span className="text-cosmic-300">Storage</span>
                      </div>
                      <span className="font-medium text-white">100 GB SSD</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-cosmic-400 mr-2" />
                        <span className="text-cosmic-300">Uptime</span>
                      </div>
                      <span className="font-medium text-white">99.9%</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-space-700">
                    <button className="w-full py-2 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
                      Deploy Now
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
              Powerful Computing Features
            </h2>
            <p className="text-lg text-cosmic-600">
              Our cloud computing platform is designed to provide the performance, reliability, and flexibility your applications demand
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
                <Cpu className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High-Performance CPUs</h3>
              <p className="text-cosmic-600">
                Latest generation processors optimized for compute-intensive workloads with predictable performance.
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
                <Gauge className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Scaling</h3>
              <p className="text-cosmic-600">
                Scale your resources up or down in seconds to match your application demands without service interruption.
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
              <h3 className="text-xl font-semibold mb-2">SSD Storage</h3>
              <p className="text-cosmic-600">
                All virtual machines include fast SSD storage for superior I/O performance and reliability.
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
                <Clock className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rapid Deployment</h3>
              <p className="text-cosmic-600">
                Deploy new virtual machines in under 55 seconds with our streamlined provisioning process.
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
                <Shield className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-cosmic-600">
                Built-in firewalls, encrypted storage, and secure private networking to protect your workloads.
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
                <CreditCard className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Predictable Pricing</h3>
              <p className="text-cosmic-600">
                Simple, transparent pricing with no hidden fees. Pay only for what you use with per-second billing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* VM Sizes Section */}
      <section className="py-16 md:py-24 bg-cosmic-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Virtual Machine Configurations
            </h2>
            <p className="text-lg text-cosmic-600">
              Choose the right VM size for your workload
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-soft">
              <thead>
                <tr className="bg-space-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-space-900">Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-space-900">vCPUs</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-space-900">Memory</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-space-900">Storage</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-space-900">Transfer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-space-900">Price</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic-100">
                <tr>
                  <td className="px-6 py-4 text-space-900 font-medium">Basic</td>
                  <td className="px-6 py-4 text-cosmic-600">1</td>
                  <td className="px-6 py-4 text-cosmic-600">2 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">25 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">1 TB</td>
                  <td className="px-6 py-4 text-space-900 font-semibold">$10/mo</td>
                  <td className="px-6 py-4">
                    <Link to="/signup" className="text-primary-500 font-medium hover:text-primary-600">
                      Deploy
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900 font-medium">Standard</td>
                  <td className="px-6 py-4 text-cosmic-600">2</td>
                  <td className="px-6 py-4 text-cosmic-600">4 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">50 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">2 TB</td>
                  <td className="px-6 py-4 text-space-900 font-semibold">$20/mo</td>
                  <td className="px-6 py-4">
                    <Link to="/signup" className="text-primary-500 font-medium hover:text-primary-600">
                      Deploy
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900 font-medium">Performance</td>
                  <td className="px-6 py-4 text-cosmic-600">4</td>
                  <td className="px-6 py-4 text-cosmic-600">8 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">100 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">3 TB</td>
                  <td className="px-6 py-4 text-space-900 font-semibold">$40/mo</td>
                  <td className="px-6 py-4">
                    <Link to="/signup" className="text-primary-500 font-medium hover:text-primary-600">
                      Deploy
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900 font-medium">Professional</td>
                  <td className="px-6 py-4 text-cosmic-600">8</td>
                  <td className="px-6 py-4 text-cosmic-600">16 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">200 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">5 TB</td>
                  <td className="px-6 py-4 text-space-900 font-semibold">$80/mo</td>
                  <td className="px-6 py-4">
                    <Link to="/signup" className="text-primary-500 font-medium hover:text-primary-600">
                      Deploy
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900 font-medium">Enterprise</td>
                  <td className="px-6 py-4 text-cosmic-600">16</td>
                  <td className="px-6 py-4 text-cosmic-600">32 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">400 GB</td>
                  <td className="px-6 py-4 text-cosmic-600">10 TB</td>
                  <td className="px-6 py-4 text-space-900 font-semibold">$160/mo</td>
                  <td className="px-6 py-4">
                    <Link to="/signup" className="text-primary-500 font-medium hover:text-primary-600">
                      Deploy
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-cosmic-600 mb-4">
              Need a custom configuration? Contact our sales team for specialized VM options.
            </p>
            <button className="btn-primary">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-space-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Power Your Applications?
            </h2>
            <p className="text-lg text-cosmic-200 mb-8">
              Start with a free trial and experience the performance of GravityStack Cloud Computing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="btn-primary px-8 py-4">
                Get Started
              </Link>
              <Link to="/products/storage" className="btn-outline px-8 py-4">
                Explore Object Storage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductCompute;
