import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, Calendar, Check, ArrowRight, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PricingCard from '../../components/ui/PricingCard';
import { pricingPackages } from '../../utils/mockData';

const Billing = () => {
  // Mock billing history
  const billingHistory = [
    {
      id: 'INV-001',
      date: 'Oct 1, 2023',
      amount: '$0.00',
      status: 'Free Trial',
      downloadUrl: '#'
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h1 className="text-2xl font-bold text-space-900">Billing & Subscription</h1>
          <p className="text-cosmic-600">Manage your subscription and payment methods</p>
        </div>
        
        {/* Current Plan */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-space-900 mb-6">Current Plan</h2>
          
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h3 className="text-lg font-semibold text-space-900">Developer Plan - Trial</h3>
                <p className="text-cosmic-600 mt-1">Your free trial ends in 10 days</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="btn-primary">
                  Upgrade Plan
                </button>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-soft">
                <h4 className="text-sm font-medium text-cosmic-500">Computing</h4>
                <p className="text-xl font-semibold text-space-900 mt-1">2 vCPUs, 8GB RAM</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-soft">
                <h4 className="text-sm font-medium text-cosmic-500">Storage</h4>
                <p className="text-xl font-semibold text-space-900 mt-1">100GB Object Storage</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-soft">
                <h4 className="text-sm font-medium text-cosmic-500">Kubernetes</h4>
                <p className="text-xl font-semibold text-space-900 mt-1">1 Cluster</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-warning-50 text-warning-800 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">
              Your trial will end on October 24, 2023. Add a payment method to continue using your services without interruption.
            </p>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-space-900 mb-6">Payment Methods</h2>
          
          <div className="bg-cosmic-50 rounded-lg p-6 text-center">
            <CreditCard className="h-10 w-10 mx-auto text-cosmic-500 mb-4" />
            <h3 className="text-lg font-medium text-space-800 mb-2">No payment methods added yet</h3>
            <p className="text-cosmic-600 mb-4">
              Add a payment method to ensure uninterrupted service after your trial ends
            </p>
            <button className="btn-primary">
              Add Payment Method
            </button>
          </div>
        </div>
        
        {/* Billing History */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-space-900 mb-6">Billing History</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-cosmic-100">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-cosmic-500 uppercase tracking-wider">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-cosmic-100">
                {billingHistory.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-space-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={invoice.downloadUrl} className="text-primary-600 hover:text-primary-900">
                        <Download className="h-5 w-5 inline" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Available Plans */}
        <div>
          <h2 className="text-xl font-semibold text-space-900 mb-6">Available Plans</h2>
          
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
      </div>
    </DashboardLayout>
  );
};

export default Billing;
