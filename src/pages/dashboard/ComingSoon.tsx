import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ComingSoon: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full py-20">
        <h1 className="text-4xl font-bold text-space-900 mb-4">Coming Soon!</h1>
        <p className="text-lg text-cosmic-600 text-center max-w-md">
          We're working hard to bring you this feature. Please check back later!
        </p>
        <div className="mt-8">
          {/* You can add a relevant icon or illustration here */}
          <svg
            className="w-24 h-24 text-primary-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComingSoon;
