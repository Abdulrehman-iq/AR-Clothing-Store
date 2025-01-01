import React, { useState } from 'react';
import { FiPieChart, FiUsers, FiPackage, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const stats = {
    totalOrders: 120,
    totalUsers: 75,
    totalProducts: 40,
    totalRevenue: 'Rs 62,000',
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-900 text-white flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
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
          <section>
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-black">Total Orders</h3>
                <p className="text-xl font-bold text-black">{stats.totalOrders}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-black">Total Users</h3>
                <p className="text-xl font-bold text-black">{stats.totalUsers}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-black">Total Products</h3>
                <p className="text-xl font-bold text-black">{stats.totalProducts}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-black">Revenue</h3>
                <p className="text-xl font-bold text-black">{stats.totalRevenue}</p>
              </div>
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
