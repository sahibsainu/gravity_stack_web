import React from 'react';
import { Link } from 'react-router-dom';
import { Server as ServerStack, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-space-900 text-white relative">
      <div className="absolute inset-0 w-full h-full bg-footer-pattern bg-no-repeat bg-cover opacity-20"></div>
      
      <div className="container-custom relative pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <ServerStack className="text-primary-500 h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-white">GravityStack</span>
            </Link>
            <p className="text-cosmic-300 mb-6">
              Scalable cloud infrastructure for modern applications. Powerful computing, secure storage, and simplified Kubernetes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products/compute" className="text-cosmic-300 hover:text-white transition-colors">
                  Cloud Computing
                </Link>
              </li>
              <li>
                <Link to="/products/storage" className="text-cosmic-300 hover:text-white transition-colors">
                  Object Storage
                </Link>
              </li>
              <li>
                <Link to="/products/kubernetes" className="text-cosmic-300 hover:text-white transition-colors">
                  Kubernetes Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-cosmic-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-cosmic-300 hover:text-white transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-cosmic-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cosmic-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GravityStack. All rights reserved.
          </p>
          
          <div className="flex flex-wrap space-x-4 text-sm text-cosmic-400">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
