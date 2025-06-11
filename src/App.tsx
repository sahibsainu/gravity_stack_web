import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Removed: import { AuthProvider } from './context/AuthContext'; // This import is no longer needed here

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PricingPage from './pages/PricingPage';
import ProductCompute from './pages/ProductCompute';
import ProductStorage from './pages/ProductStorage';
import ProductKubernetes from './pages/ProductKubernetes';
import Dashboard from './pages/dashboard/Dashboard';
import Settings from './pages/dashboard/Settings';
import Billing from './pages/dashboard/Billing';
import Compute from './pages/dashboard/Compute';
import Environments from './pages/dashboard/Environments'; // Import the new Environments page
import Kubernetes from './pages/dashboard/Kubernetes'; // Import new Kubernetes page
import Volumes from './pages/dashboard/Volumes'; // Import new Volumes page
import KeyPairs from './pages/dashboard/KeyPairs'; // Import new KeyPairs page
import Firewalls from './pages/dashboard/Firewalls'; // Import new Firewalls page
import Snapshots from './pages/dashboard/Snapshots'; // Import new Snapshots page
import Images from './pages/dashboard/Images'; // Import new Images page
import ComingSoon from './pages/dashboard/ComingSoon'; // Import ComingSoon page
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    // Removed: <AuthProvider> // This redundant AuthProvider caused the error
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/product/compute" element={<ProductCompute />} />
          <Route path="/product/storage" element={<ProductStorage />} />
          <Route path="/product/kubernetes" element={<ProductKubernetes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route path="/dashboard/compute" element={<Compute />} />
          {/* New routes for dashboard menu items */}
          <Route path="/dashboard/storage" element={<Volumes />} /> {/* Volumes page */}
          <Route path="/dashboard/kubernetes" element={<Kubernetes />} /> {/* Kubernetes page */}
          <Route path="/dashboard/environments" element={<Environments />} /> {/* Dedicated Environments page */}
          <Route path="/dashboard/key-pairs" element={<KeyPairs />} /> {/* Key Pairs page */}
          <Route path="/dashboard/firewalls" element={<Firewalls />} /> {/* Firewalls page */}
          <Route path="/dashboard/deployments" element={<ComingSoon />} /> {/* Coming Soon */}
          <Route path="/dashboard/snapshots" element={<Snapshots />} /> {/* Snapshots page */}
          <Route path="/dashboard/images" element={<Images />} /> {/* Images page */}
          <Route path="/dashboard/gen-ai" element={<ComingSoon />} /> {/* Coming Soon */}
          <Route path="/dashboard/organization" element={<ComingSoon />} /> {/* Coming Soon */}
          <Route path="/dashboard/api-keys" element={<ComingSoon />} /> {/* Coming Soon */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    // Removed: </AuthProvider>
  );
};

export default App;
