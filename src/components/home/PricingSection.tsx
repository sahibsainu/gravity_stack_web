import React from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../ui/PricingCard';
import { pricingPackages } from '../../utils/mockData';

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-cosmic-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent Pricing for Every Scale
          </h2>
          <p className="text-lg text-cosmic-600">
            Choose the perfect plan for your needs with our simple, predictable pricing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPackages.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-cosmic-600 mb-2">
            Need a custom solution? Contact our sales team for enterprise plans.
          </p>
          <button className="btn-secondary">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
