// components/ProfileDrawer/ProfileDrawer.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiSettings, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../Signup/Signup';

const ProfileDrawer = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate('/');
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
          <div className="flex items-center gap-2 mt-20 px-6 border-b border-primary-700">
            <FiUser className="text-surface-light" />
            <span className="text-surface-light">{userInfo?.name}</span>
            <button
              onClick={handleLogout}
              className="ml-auto px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}

        {/* Render Form */}
        <div className="p-6">
          {!isLoggedIn && activeTab === 'login' && <Login onLogin={handleLogin} />}
          {!isLoggedIn && activeTab === 'signup' && <SignUp />}
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;