import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Clock, Zap, Globe, PieChart, BarChart3, 
  Monitor, Layers, Lock
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary-500" />,
      title: 'High Performance',
      description: 'State-of-the-art hardware for lightning-fast workloads and optimal application performance.'
    },
    {
      icon: <Shield className="h-6 w-6 text-primary-500" />,
      title: 'Advanced Security',
      description: 'Enterprise-grade security with encryption at rest and in transit for all your data.'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-500" />,
      title: 'Simple Scaling',
      description: 'Scale up or down instantaneously based on your workload demands without downtime.'
    },
    {
      icon: <Globe className="h-6 w-6 text-primary-500" />,
      title: 'Global Network',
      description: 'Strategically located data centers ensure low-latency access from anywhere in the world.'
    },
    {
      icon: <PieChart className="h-6 w-6 text-primary-500" />,
      title: 'Transparent Pricing',
      description: 'Predictable and competitive pricing with no hidden fees or unexpected charges.'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary-500" />,
      title: 'Real-time Monitoring',
      description: 'Comprehensive monitoring tools to keep track of your resources and optimize costs.'
    },
    {
      icon: <Monitor className="h-6 w-6 text-primary-500" />,
      title: 'Intuitive Dashboard',
      description: 'Clean and powerful interface to manage all your cloud resources from one place.'
    },
    {
      icon: <Layers className="h-6 w-6 text-primary-500" />,
      title: 'Flexible API',
      description: 'Robust API for programmatic control and integration with your existing tools.'
    },
    {
      icon: <Lock className="h-6 w-6 text-primary-500" />,
      title: 'Data Sovereignty',
      description: 'Choose where your data resides to meet compliance and regulatory requirements.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Cloud Infrastructure
          </h2>
          <p className="text-lg text-cosmic-600">
            GravityStack provides everything you need to build, deploy, and scale your applications with confidence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-cosmic-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
