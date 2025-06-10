import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

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
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <AuthProvider>
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
          <Route path="/dashboard/storage" element={<ProductStorage />} /> {/* Re-using ProductStorage for now */}
          <Route path="/dashboard/kubernetes" element={<ProductKubernetes />} /> {/* Re-using ProductKubernetes for now */}
          <Route path="/dashboard/environments" element={<NotFound />} /> {/* Placeholder */}
          <Route path="/dashboard/key-pairs" element={<NotFound />} /> {/* Placeholder */}
          <Route path="/dashboard/firewalls" element={<NotFound />} /> {/* Placeholder */}
          <Route path="/dashboard/deployments" element={<NotFound />} /> {/* Placeholder */}
          <Route path="/dashboard/snapshots" element={<NotFound />} /> {/* Placeholder */}
          <Route path="/dashboard/images" element={<NotFound />} /> {/* Placeholder */}
          <Route path="/dashboard/gen-ai" element={<NotFound />} /> {/* Placeholder */}
          <Route path="/dashboard/organization" element={<NotFound />} /> {/* Placeholder */}
          <Route path="/dashboard/api-keys" element={<NotFound />} /> {/* Placeholder */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
