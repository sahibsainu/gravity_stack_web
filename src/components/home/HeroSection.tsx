import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Database, Container } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pb-24 lg:pt-32 lg:pb-32 bg-space-900 text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-hero-pattern bg-no-repeat bg-cover"></div>
      
      <div className="container-custom relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Cloud Infrastructure That's <span className="text-primary-400">Better, Faster, and Costs Less</span>
          </h1>
          <p className="text-xl md:text-2xl text-cosmic-200 mb-8">
            80% cost savings compared to Hyperscalers. No egress fees. No API charges. Just powerful, affordable cloud infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup" className="btn-primary px-8 py-4 text-lg">
              <span>Try Free for 7 Days</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/products/compute" className="btn-outline px-8 py-4 text-lg">
              Learn More
            </Link>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-space-800 bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-space-700"
          >
            <div className="w-12 h-12 rounded-lg bg-primary-500 bg-opacity-20 flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Cloud Computing</h3>
            <p className="text-cosmic-300">
              High-performance VMs at 80% less cost. Deploy in seconds, scale instantly.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-space-800 bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-space-700"
          >
            <div className="w-12 h-12 rounded-lg bg-space-500 bg-opacity-20 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-space-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Object Storage</h3>
            <p className="text-cosmic-300">
              S3-compatible storage with zero egress fees. Enterprise-grade security.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-space-800 bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-space-700"
          >
            <div className="w-12 h-12 rounded-lg bg-cosmic-500 bg-opacity-20 flex items-center justify-center mb-4">
              <Container className="h-6 w-6 text-cosmic-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Kubernetes Services</h3>
            <p className="text-cosmic-300">
              Managed Kubernetes with predictable pricing. No hidden costs.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center text-cosmic-400 text-sm font-medium"
        >
          <p>Trusted by innovative companies worldwide</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center">
              <div className="h-8 bg-white bg-opacity-10 rounded-md px-4 py-2 text-white font-semibold">
                ACME Corp
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 bg-white bg-opacity-10 rounded-md px-4 py-2 text-white font-semibold">
                TechStack
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 bg-white bg-opacity-10 rounded-md px-4 py-2 text-white font-semibold">
                Quantum Inc
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 bg-white bg-opacity-10 rounded-md px-4 py-2 text-white font-semibold">
                FutureDevs
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
