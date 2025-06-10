import React from 'react';
import { Check } from 'lucide-react';
import { Package } from '../../types';
import { motion } from 'framer-motion';

interface PricingCardProps {
  plan: Package;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`rounded-xl overflow-hidden shadow-soft ${
        plan.popular ? 'border-2 border-primary-500' : 'border border-cosmic-200'
      }`}
    >
      {plan.popular && (
        <div className="bg-primary-500 py-1.5 text-center">
          <span className="text-white text-sm font-medium">Most Popular</span>
        </div>
      )}
      
      <div className="p-6 bg-white">
        <h3 className="text-xl font-semibold text-space-900">{plan.name}</h3>
        <p className="text-cosmic-500 mt-1">{plan.description}</p>
        
        <div className="mt-4 mb-6">
          <span className="text-4xl font-bold text-space-900">${plan.price}</span>
          {plan.price > 0 && <span className="text-cosmic-500 ml-1">/month</span>}
        </div>
        
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mt-0.5">
                <Check size={12} />
              </div>
              <span className="ml-2 text-space-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button 
          className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
            plan.popular 
              ? 'bg-primary-500 text-white hover:bg-primary-600' 
              : 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50'
          }`}
        >
          {plan.price === 0 ? 'Start Free Trial' : 'Choose Plan'}
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
