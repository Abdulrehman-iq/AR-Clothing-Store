// components/ProfileAuth/ProfileAuth.jsx
import React, { useState } from 'react';
import { FiMail, FiLock, FiUser, FiX } from 'react-icons/fi';

const ProfileAuth = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-black shadow-2xl transform transition-transform duration-300 z-50 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <FiX className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Tabs */}
          <div className="flex mb-8 border-b border-gray-800">
            <button 
              className={`pb-2 px-4 text-sm font-medium transition-colors duration-300 
                ${activeTab === 'login' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`pb-2 px-4 text-sm font-medium transition-colors duration-300 
                ${activeTab === 'signup' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {activeTab === 'login' ? (
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                Login
              </button>
            </form>
          ) : (
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileAuth;