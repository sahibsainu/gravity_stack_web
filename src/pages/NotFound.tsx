import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ServerOff } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-cosmic-100 flex items-center justify-center">
              <ServerOff className="h-10 w-10 text-cosmic-500" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-space-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-cosmic-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/" className="btn-primary">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Return Home</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
