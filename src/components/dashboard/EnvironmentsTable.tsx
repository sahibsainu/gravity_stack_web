import React from 'react';
import { DashboardEnvironment } from '../../types';
// Removed unused icons as their corresponding columns are removed
// import { CheckCircle, XCircle, AlertTriangle, Loader } from 'lucide-react';

interface EnvironmentsTableProps {
  environments: DashboardEnvironment[];
  onSelectEnvironment: (projectId: string) => void;
  selectedProjectId: string | null;
}

const EnvironmentsTable: React.FC<EnvironmentsTableProps> = ({ environments, onSelectEnvironment, selectedProjectId }) => {
  // Removed getStatusIcon and getStatusColor as operationalStatus column is removed
  /*
  const getStatusIcon = (status: DashboardEnvironment['operationalStatus']) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case 'Inactive':
        return <XCircle className="h-4 w-4 text-error-500" />;
      case 'Degraded':
        return <AlertTriangle className="h-4 w-4 text-warning-500" />;
      case 'Deploying':
        return <Loader className="h-4 w-4 text-primary-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: DashboardEnvironment['operationalStatus']) => {
    switch (status) {
      case 'Active':
        return 'text-success-700 bg-success-100';
      case 'Inactive':
        return 'text-error-700 bg-error-100';
      case 'Degraded':
        return 'text-warning-700 bg-warning-100';
      case 'Deploying':
        return 'text-primary-700 bg-primary-100';
      default:
        return 'text-cosmic-700 bg-cosmic-100';
    }
  };
  */

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-cosmic-100">
          <thead className="bg-cosmic-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider"
              >
                Environment Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider"
              >
                Creation Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider"
              >
                Availability Zone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-cosmic-500 uppercase tracking-wider"
              >
                Assigned Users
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-cosmic-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cosmic-100">
            {environments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-cosmic-500">
                  No environments found. Create a new project to get started!
                </td>
              </tr>
            ) : (
              environments.map((env) => (
                <tr key={env.id} className="hover:bg-cosmic-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-space-900">{env.displayName}</div>
                    <div className="text-xs text-cosmic-500">{env.name}</div> {/* Show full name as subtitle */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                    {env.createdAt ? new Date(env.createdAt).toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                    {env.availabilityZone || 'N/A'} {/* Placeholder for AZ */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cosmic-600">
                    {env.assignedUsersCount !== undefined ? env.assignedUsersCount.toString() : 'N/A'} {/* Placeholder for user count */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onSelectEnvironment(env.id)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200
                        ${selectedProjectId === env.id
                          ? 'bg-primary-500 text-white cursor-not-allowed'
                          : 'text-primary-600 hover:bg-primary-50 hover:text-primary-700'
                        }`}
                      disabled={selectedProjectId === env.id}
                    >
                      {selectedProjectId === env.id ? 'Selected' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnvironmentsTable;
