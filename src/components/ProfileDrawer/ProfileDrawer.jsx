import React, { useState } from 'react';
import { FiMail, FiLock, FiUser, FiX } from 'react-icons/fi';

const ProfileDrawer = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-primary-900/50 backdrop-blur-sm transition-opacity duration-300 z-50 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-[400px] bg-primary-900 shadow-2xl 
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-surface-light hover:text-interactive-hover transition-colors duration-300"
        >
          <FiX className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="p-8 pt-16">
          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-primary-700">
            <button 
              className={`pb-4 px-4 text-base font-medium transition-colors duration-300
                ${activeTab === 'login' 
                  ? 'text-surface-light border-b-2 border-interactive-hover' 
                  : 'text-content-light hover:text-surface-light'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`pb-4 px-4 text-base font-medium transition-colors duration-300
                ${activeTab === 'signup' 
                  ? 'text-surface-light border-b-2 border-interactive-hover' 
                  : 'text-content-light hover:text-surface-light'}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          <form className="space-y-6">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-surface-light text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-content-light" />
                  <input
                    type="text"
                    className="w-full bg-primary-800 text-surface-light rounded-lg pl-12 pr-4 py-3 
                             border border-primary-700 focus:outline-none focus:border-interactive-focus
                             placeholder-content-light transition-colors duration-300"
                    placeholder="Enter your name"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-surface-light text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-content-light" />
                <input
                  type="email"
                  className="w-full bg-primary-800 text-surface-light rounded-lg pl-12 pr-4 py-3 
                           border border-primary-700 focus:outline-none focus:border-interactive-focus
                           placeholder-content-light transition-colors duration-300"
                  placeholder="Enter your email"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-surface-light text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-content-light" />
                <input
                  type="password"
                  className="w-full bg-primary-800 text-surface-light rounded-lg pl-12 pr-4 py-3 
                           border border-primary-700 focus:outline-none focus:border-interactive-focus
                           placeholder-content-light transition-colors duration-300"
                  placeholder="Enter your password"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-interactive-hover text-primary-900 py-3 rounded-lg font-medium
                       hover:bg-accent-light transition-colors duration-300
                       focus:outline-none focus:ring-2 focus:ring-interactive-focus focus:ring-offset-2
                       focus:ring-offset-primary-900"
            >
              {activeTab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;