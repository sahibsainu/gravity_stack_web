import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, Shield, BarChart3, Zap, Globe, RefreshCw, Lock, PieChart, ArrowRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const ProductStorage = () => {
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
                Secure <span className="text-primary-400">Object Storage</span> for All Your Data
              </h1>
              <p className="text-xl text-cosmic-200 mb-8">
                S3-compatible cloud storage with unmatched reliability, security, and performance at an affordable price.
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
                <div className="absolute inset-0 bg-cosmic-500 rounded-xl opacity-10 blur-xl transform -rotate-6"></div>
                <div className="relative bg-space-800 rounded-xl p-8 border border-space-700">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <Database className="h-6 w-6 text-cosmic-400 mr-2" />
                      <h3 className="text-xl font-semibold text-white">Object Storage</h3>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-cosmic-500 bg-opacity-20 text-cosmic-400 text-sm">
                      Active
                    </div>
                  </div>
                  
                  <div className="space-y-5 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-cosmic-400">Storage Usage</span>
                        <span className="font-medium text-white">126.5 GB / 500 GB</span>
                      </div>
                      <div className="w-full bg-space-700 rounded-full h-2">
                        <div 
                          className="bg-cosmic-500 rounded-full h-2" 
                          style={{ width: '25%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-cosmic-400">Monthly Transfer</span>
                        <span className="font-medium text-white">2.1 TB / 5.0 TB</span>
                      </div>
                      <div className="w-full bg-space-700 rounded-full h-2">
                        <div 
                          className="bg-primary-500 rounded-full h-2" 
                          style={{ width: '42%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-space-700 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Bucket Count</span>
                        <span className="font-medium text-white">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">S3 Compatibility</span>
                        <span className="font-medium text-white">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cosmic-400">Data Protection</span>
                        <span className="font-medium text-white">11x9 durability</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-space-700">
                    <button className="w-full py-2 rounded-lg bg-cosmic-500 text-white font-medium hover:bg-cosmic-600 transition-colors">
                      Create Bucket
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
              Enterprise-Grade Storage Features
            </h2>
            <p className="text-lg text-cosmic-600">
              GravityStack Object Storage combines reliability, performance, and security with the simplicity of S3-compatible APIs
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
              <div className="w-12 h-12 rounded-lg bg-cosmic-50 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-cosmic-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Performance</h3>
              <p className="text-cosmic-600">
                Faster uploads and downloads with optimized network architecture and distributed storage technology.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-cosmic-50 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-cosmic-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">11 Nines Durability</h3>
              <p className="text-cosmic-600">
                99.999999999% durability ensures your data remains intact and accessible with redundant storage.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-cosmic-50 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-cosmic-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">S3 Compatibility</h3>
              <p className="text-cosmic-600">
                100% compatible with Amazon S3 API, making migration seamless with existing workflows and tools.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-cosmic-50 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-cosmic-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-cosmic-600">
                Access your data from anywhere with our globally distributed edge network for minimal latency.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-cosmic-50 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-cosmic-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
              <p className="text-cosmic-600">
                At-rest and in-transit encryption, IAM policies, bucket policies, and versioning for complete data protection.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-cosmic-50 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-cosmic-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Predictable Pricing</h3>
              <p className="text-cosmic-600">
                Simple, transparent pricing with no egress fees or hidden charges. Pay only for what you store.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Storage Tiers Section */}
      <section className="py-16 md:py-24 bg-cosmic-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Storage Tiers for Every Need
            </h2>
            <p className="text-lg text-cosmic-600">
              Choose the right storage option based on your access patterns and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Standard</h3>
                <p className="text-cosmic-600 mb-4">
                  High-performance storage for frequently accessed data
                </p>
                <div>
                  <span className="text-3xl font-bold text-space-900">$0.006</span>
                  <span className="text-cosmic-500 ml-1">per GB/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Immediate data access</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">No retrieval fees</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Ideal for active data</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">11 nines durability</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg bg-cosmic-500 text-white font-medium hover:bg-cosmic-600 transition-colors">
                Choose Standard
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-soft border-2 border-cosmic-500"
            >
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-cosmic-100 text-cosmic-700 text-sm font-medium rounded-full mb-2">
                  Most Popular
                </div>
                <h3 className="text-2xl font-semibold mb-2">Intelligent Tiering</h3>
                <p className="text-cosmic-600 mb-4">
                  Automated cost optimization based on access patterns
                </p>
                <div>
                  <span className="text-3xl font-bold text-space-900">$0.005</span>
                  <span className="text-cosmic-500 ml-1">per GB/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Automatic cost optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">No retrieval fees</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Ideal for variable access</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Monitoring included</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg bg-cosmic-500 text-white font-medium hover:bg-cosmic-600 transition-colors">
                Choose Intelligent Tiering
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-soft"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Archive</h3>
                <p className="text-cosmic-600 mb-4">
                  Long-term storage for rarely accessed data
                </p>
                <div>
                  <span className="text-3xl font-bold text-space-900">$0.002</span>
                  <span className="text-cosmic-500 ml-1">per GB/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Lowest storage cost</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Retrieval within hours</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Ideal for backups & archives</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cosmic-100 flex items-center justify-center text-cosmic-600 mt-0.5">
                    <ArrowRight size={12} />
                  </div>
                  <span className="ml-2 text-space-700">Minimum 90-day storage</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg bg-cosmic-500 text-white font-medium hover:bg-cosmic-600 transition-colors">
                Choose Archive
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-space-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Store Your Data Securely?
            </h2>
            <p className="text-lg text-cosmic-200 mb-8">
              Start your free trial today and experience the reliability and performance of GravityStack Object Storage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="btn-primary px-8 py-4">
                Get Started
              </Link>
              <Link to="/products/kubernetes" className="btn-outline px-8 py-4">
                Explore Kubernetes Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProductStorage;
