// components/ProfileDrawer/ProfileDrawer.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiSettings, FiUser, FiLayout } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../Signup/Signup';

const ProfileDrawer = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
      setIsAdmin(adminStatus || user.isAdmin);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    setIsAdmin(user.isAdmin || localStorage.getItem('isAdmin') === 'true');
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setUserInfo(null);
    setIsAdmin(false);
    navigate('/');
  };

  const handleAdminDashboardClick = () => {
    navigate('/admin');
    onClose();
  };

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

        {/* Profile Drawer Tabs */}
        {!isLoggedIn ? (
          <div className="flex gap-2 mt-20 px-6 border-b border-primary-700">
            {['login', 'signup'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded ${
                  activeTab === tab ? 'bg-primary-800 text-white' : 'text-surface-light hover:bg-primary-700'
                }`}
              >
                {tab === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col mt-20 px-6 border-b border-primary-700 pb-4">
            <div className="flex items-center gap-2">
              <FiUser className="text-surface-light" />
              <span className="text-surface-light">{userInfo?.name}</span>
              <button
                onClick={handleLogout}
                className="ml-auto px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </div>
            
            {/* Admin Dashboard Link - only shown for admin users */}
            {isAdmin && (
              <button 
                onClick={handleAdminDashboardClick}
                className="flex items-center gap-2 text-interactive-hover hover:text-accent-light mt-3 self-start"
              >
                <FiLayout />
                Admin Dashboard
              </button>
            )}
          </div>
        )}

        {/* Render Form */}
        <div className="p-6">
          {!isLoggedIn && activeTab === 'login' && <Login onLogin={handleLogin} onRegisterClick={() => setActiveTab('signup')} />}
          {!isLoggedIn && activeTab === 'signup' && <SignUp onSignupSuccess={() => setActiveTab('login')} />}
          
          {isLoggedIn && (
            <div className="text-surface-light">
              <h3 className="text-xl font-semibold mb-4">My Account</h3>
              <div className="space-y-4">
                <p>Welcome back, {userInfo?.name}</p>
                <div className="flex flex-col space-y-2">
               
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;