import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X, Cpu, Database, Container, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const location = useLocation();
  const { authState } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-soft py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-space-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
            <Cpu className="text-white h-6 w-6 relative z-10" />
          </div>
          <span className={`font-bold text-xl ${scrolled ? 'text-space-900' : 'text-white'}`}>
            GravityStack
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div className="relative group">
            <button 
              className={`flex items-center space-x-1 ${
                scrolled ? 'text-space-800' : 'text-white'
              } hover:text-primary-500 transition-colors duration-200`}
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
            >
              <span>Products</span>
              <ChevronDown size={16} />
            </button>
            
            <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
              <div className="p-2 bg-white rounded-lg shadow-medium">
                <Link to="/product/compute" className="block p-2 rounded-md hover:bg-cosmic-50 transition-colors duration-200">
                  <div className="flex items-start">
                    <Cpu className="h-5 w-5 text-primary-500 mt-0.5 mr-2" />
                    <div>
                      <div className="font-medium">Cloud Computing</div>
                      <div className="text-sm text-space-600">Scalable virtual machines on demand</div>
                    </div>
                  </div>
                </Link>
                <Link to="/product/storage" className="block p-2 rounded-md hover:bg-cosmic-50 transition-colors duration-200">
                  <div className="flex items-start">
                    <Database className="h-5 w-5 text-primary-500 mt-0.5 mr-2" />
                    <div>
                      <div className="font-medium">Object Storage</div>
                      <div className="text-sm text-space-600">Reliable and secure cloud storage</div>
                    </div>
                  </div>
                </Link>
                <Link to="/product/kubernetes" className="block p-2 rounded-md hover:bg-cosmic-50 transition-colors duration-200">
                  <div className="flex items-start">
                    <Container className="h-5 w-5 text-primary-500 mt-0.5 mr-2" />
                    <div>
                      <div className="font-medium">Kubernetes Services</div>
                      <div className="text-sm text-space-600">Managed container orchestration</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <Link 
            to="/pricing" 
            className={`${scrolled ? 'text-space-800' : 'text-white'} hover:text-primary-500 transition-colors duration-200`}
          >
            Pricing
          </Link>
          
          {authState.isAuthenticated ? (
            <Link 
              to="/dashboard" 
              className="btn-primary"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`${scrolled ? 'text-space-800' : 'text-white'} hover:text-primary-500 transition-colors duration-200 flex items-center`}
              >
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="btn-primary"
              >
                Try Free
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? (
            <X className={`h-6 w-6 ${scrolled ? 'text-space-900' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${scrolled ? 'text-space-900' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-medium"
        >
          <div className="container-custom py-4 space-y-4">
            <div>
              <button 
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-left"
              >
                <span className="font-medium">Products</span>
                <ChevronDown size={16} className={`transform transition-transform ${productDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {productDropdownOpen && (
                <div className="mt-2 pl-8 space-y-2">
                  <Link to="/product/compute" className="block py-2">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 text-primary-500 mr-2" />
                      <span>Cloud Computing</span>
                    </div>
                  </Link>
                  <Link to="/product/storage" className="block py-2">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 text-primary-500 mr-2" />
                      <span>Object Storage</span>
                    </div>
                  </Link>
                  <Link to="/product/kubernetes" className="block py-2">
                    <div className="flex items-center">
                      <Container className="h-4 w-4 text-primary-500 mr-2" />
                      <span>Kubernetes Services</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/pricing" className="block px-4 py-2">
              Pricing
            </Link>
            
            {authState.isAuthenticated ? (
              <Link to="/dashboard" className="block px-4 py-2 bg-primary-500 text-white rounded-lg text-center">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
                <Link to="/signup" className="block px-4 py-2 bg-primary-500 text-white rounded-lg text-center">
                  Try Free
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
