import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CloudCog, Database, Container } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import PricingCard from '../components/ui/PricingCard';
import { pricingPackages } from '../utils/mockData';
import { ArrowRight } from 'lucide-react';

const PricingPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
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
              Simple, Transparent <span className="text-primary-400">Pricing</span>
            </h1>
            <p className="text-xl md:text-2xl text-cosmic-200 mb-8">
              Choose the perfect plan for your needs with no hidden fees or complicated pricing structures.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="btn-primary px-8 py-4 text-lg">
                <span>Try Free for 7 Days</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="#" className="btn-outline px-8 py-4 text-lg">
                Contact Sales
              </Link>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPackages.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PricingCard plan={plan} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Compare Plans Feature by Feature
            </h2>
            <p className="text-lg text-cosmic-600">
              All plans include our core cloud infrastructure with different resource allocations
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-soft">
              <thead>
                <tr className="bg-space-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-space-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-space-900">Free Trial</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-space-900">Developer</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-space-900">Business</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-space-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-space-900" colSpan={5}>
                    <div className="flex items-center">
                      <CloudCog className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Cloud Computing</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">vCPUs</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">1</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">2</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">4</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Custom</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">RAM</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">2GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">8GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">16GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Custom</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">SSD Storage</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">20GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">50GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">100GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Custom</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-space-900" colSpan={5}>
                    <div className="flex items-center">
                      <Database className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Object Storage</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Storage Capacity</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">10GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">100GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">500GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Monthly Transfer</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">100GB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">1TB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">5TB</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Custom</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Buckets</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">2</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">10</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">50</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-space-900" colSpan={5}>
                    <div className="flex items-center">
                      <Container className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Kubernetes Services</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Clusters</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Shared</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">1</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">3</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Custom</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Worker Nodes</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">1</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">3</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">10</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Custom</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Auto-Scaling</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">
                    <div className="flex justify-center">—</div>
                  </td>
                  <td className="px-6 py-4 text-center text-cosmic-600">
                    <div className="flex justify-center">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-cosmic-600">
                    <div className="flex justify-center">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-cosmic-600">
                    <div className="flex justify-center">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-space-900" colSpan={5}>
                    <span>Support & Extras</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Support</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Community</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Email</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">24/7 Priority</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Dedicated Manager</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">Backups</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Weekly</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Daily</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Hourly</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Custom Schedule</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-space-900">SLA</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">—</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">99.9%</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">99.95%</td>
                  <td className="px-6 py-4 text-center text-cosmic-600">Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-cosmic-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-cosmic-600">
              Find answers to common questions about our pricing and plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold mb-3">How does the free trial work?</h3>
              <p className="text-cosmic-600">
                Our 7-day free trial gives you access to all Developer plan features. No credit card is required to sign up, and you'll receive a notification before the trial ends.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold mb-3">Can I upgrade or downgrade my plan?</h3>
              <p className="text-cosmic-600">
                Yes, you can change your plan at any time through your account dashboard. Changes take effect at the start of the next billing cycle, with prorated charges for upgrades.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold mb-3">What happens if I exceed my plan limits?</h3>
              <p className="text-cosmic-600">
                We'll never shut off your services unexpectedly. If you exceed your limits, you'll be charged for the additional usage at our standard overage rates, or we'll contact you about upgrading.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold mb-3">Do you offer discounts for annual billing?</h3>
              <p className="text-cosmic-600">
                Yes, we offer a 15% discount when you choose annual billing instead of monthly. This option is available for all paid plans during checkout or in your billing settings.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold mb-3">Is there a discount for startups or non-profits?</h3>
              <p className="text-cosmic-600">
                Yes, we offer special pricing for eligible startups, educational institutions, and non-profit organizations. Contact our sales team to learn more about our discount programs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-cosmic-600">
                We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank transfers for annual plans. Enterprise plans can also be invoiced.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-500 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Try GravityStack free for 7 days with no commitment or credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="bg-white text-primary-600 hover:bg-primary-50 btn px-8 py-4 text-lg">
                Start Free Trial
              </Link>
              <Link to="#" className="btn border-2 border-white text-white hover:bg-primary-400 px-8 py-4 text-lg">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default PricingPage;
