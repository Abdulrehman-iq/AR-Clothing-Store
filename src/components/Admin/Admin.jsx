import React, { useState, useEffect } from 'react';
import { FiPieChart, FiUsers, FiPackage, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin');

  // Get admin name if available in localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('adminName');
    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

  const handleLogout = () => {
    // Remove admin status from localStorage
    localStorage.removeItem('isAdmin');
    
    // Dispatch both events for reliability
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('admin-logout'));
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-900 text-white flex flex-col">
        {/* Logo with Link to Home */}
        <div className="p-4 flex flex-col items-center border-b border-primary-800">
          <Link to="/" className="mb-2">
            <img
              className="h-16 w-auto transition-transform duration-300 hover:scale-105"
              src="/assets/fyplogo.png"
              alt="AR Clothing Store Logo"
            />
          </Link>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="mt-4 flex-grow overflow-y-auto">
          <button
            className={`w-full flex items-center px-4 py-3 hover:bg-primary-800 transition ${
              activeTab === 'overview' ? 'bg-primary-800' : ''
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <FiPieChart className="mr-2" />
            Overview
          </button>
          <button
            className={`w-full flex items-center px-4 py-3 hover:bg-primary-800 transition ${
              activeTab === 'users' ? 'bg-primary-800' : ''
            }`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers className="mr-2" />
            Users
          </button>
          <button
            className={`w-full flex items-center px-4 py-3 hover:bg-primary-800 transition ${
              activeTab === 'products' ? 'bg-primary-800' : ''
            }`}
            onClick={() => setActiveTab('products')}
          >
            <FiPackage className="mr-2" />
            Products
          </button>
          <button
            className={`w-full flex items-center px-4 py-3 hover:bg-primary-800 transition ${
              activeTab === 'orders' ? 'bg-primary-800' : ''
            }`}
            onClick={() => setActiveTab('orders')}
          >
            <FiShoppingBag className="mr-2" />
            Orders
          </button>
        </nav>
        <button
          className="w-full flex items-center px-4 py-3 hover:bg-primary-800 transition"
          onClick={handleLogout}
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        {activeTab === 'overview' && (
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome to the Admin Dashboard</h2>
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <p className="text-xl text-gray-700 mb-2">
                Hello, <span className="font-semibold">{adminName}</span>!
              </p>
              <p className="text-gray-600 leading-relaxed">
                Welcome to the AR Clothing Store admin panel. Use the sidebar navigation to manage your store's 
                users, products, and orders. You can also return to the main store at any time by clicking the logo.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'users' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <UserManagement />
          </section>
        )}

        {activeTab === 'products' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Products</h2>
            <ProductManagement />
          </section>
        )}

        {activeTab === 'orders' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <OrderManagement />
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;