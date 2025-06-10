import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-500">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Experience Cloud Computing at Its Best?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Start with a risk-free 14-day trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/signup" 
              className="bg-white text-primary-600 hover:bg-primary-50 btn"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/products/compute" 
              className="btn border-2 border-white text-white hover:bg-primary-400"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
