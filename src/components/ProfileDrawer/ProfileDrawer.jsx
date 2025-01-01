import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Login from '../Login/Login';
import SignUp from '../Signup/Signup';

const ProfileDrawer = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div 
        className={`fixed right-0 top-0 h-full w-[400px] bg-primary-900 shadow-2xl 
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-surface-light hover:text-interactive-hover p-2"
        >
          <FiX className="h-6 w-6" />
        </button>

        {/* Tab Buttons */}
        <div className="flex gap-4 mt-20 px-6 border-b border-primary-700">
  <button
    className={`w-1/2 py-4 px-8 text-lg font-medium transition-all duration-300 rounded-t-lg
      ${activeTab === 'login' 
        ? 'text-surface-light border-b-2 border-interactive-hover bg-primary-800/30' 
        : 'text-content-light hover:text-surface-light hover:bg-primary-800/20'}`}
    onClick={() => setActiveTab('login')}
  >
    Login
  </button>
  <button
    className={`w-1/2 py-4 px-8 text-lg font-medium transition-all duration-300 rounded-t-lg
      ${activeTab === 'signup' 
        ? 'text-surface-light border-b-2 border-interactive-hover bg-primary-800/30' 
        : 'text-content-light hover:text-surface-light hover:bg-primary-800/20'}`}
    onClick={() => setActiveTab('signup')}
  >
    Sign Up
  </button>
</div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-100px)] px-6">
          {activeTab === 'login' ? <Login /> : <SignUp />}
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;