import React from 'react';
import { ArrowUpRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Service } from '../../types';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getStatusIcon = () => {
    switch (service.status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'stopped':
        return <AlertCircle className="h-5 w-5 text-warning-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-error-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (service.status) {
      case 'running':
        return 'Running';
      case 'stopped':
        return 'Stopped';
      case 'failed':
        return 'Failed';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (service.status) {
      case 'running':
        return 'bg-success-100 text-success-800';
      case 'stopped':
        return 'bg-warning-100 text-warning-800';
      case 'failed':
        return 'bg-error-100 text-error-800';
      default:
        return '';
    }
  };

  const getServiceTypeIcon = () => {
    switch (service.type) {
      case 'compute':
        return 'bg-primary-50 text-primary-600';
      case 'storage':
        return 'bg-cosmic-100 text-cosmic-600';
      case 'kubernetes':
        return 'bg-space-100 text-space-600';
      default:
        return '';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-soft overflow-hidden"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getServiceTypeIcon()}`}>
              {/* Icon based on service type would go here */}
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-space-900">{service.name}</h3>
              <p className="text-sm text-cosmic-500">Created {service.createdAt.toLocaleDateString()}</p>
            </div>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </div>
        </div>
        
        {service.usage && (
          <div className="space-y-3 mb-4">
            {service.usage.cpu !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-cosmic-500">CPU</span>
                  <span className="font-medium text-space-800">{service.usage.cpu}%</span>
                </div>
                <div className="w-full bg-cosmic-100 rounded-full h-2">
                  <div 
                    className="bg-primary-500 rounded-full h-2" 
                    style={{ width: `${service.usage.cpu}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {service.usage.memory !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-cosmic-500">Memory</span>
                  <span className="font-medium text-space-800">{service.usage.memory}%</span>
                </div>
                <div className="w-full bg-cosmic-100 rounded-full h-2">
                  <div 
                    className="bg-primary-500 rounded-full h-2" 
                    style={{ width: `${service.usage.memory}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {service.usage.storage !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-cosmic-500">Storage</span>
                  <span className="font-medium text-space-800">{service.usage.storage}%</span>
                </div>
                <div className="w-full bg-cosmic-100 rounded-full h-2">
                  <div 
                    className="bg-space-500 rounded-full h-2" 
                    style={{ width: `${service.usage.storage}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {service.usage.bandwidth !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-cosmic-500">Bandwidth</span>
                  <span className="font-medium text-space-800">{service.usage.bandwidth}%</span>
                </div>
                <div className="w-full bg-cosmic-100 rounded-full h-2">
                  <div 
                    className="bg-cosmic-500 rounded-full h-2" 
                    style={{ width: `${service.usage.bandwidth}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="px-5 py-3 bg-cosmic-50 border-t border-cosmic-100">
        <button className="w-full text-primary-600 font-medium flex justify-center items-center">
          <span>Manage</span>
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
