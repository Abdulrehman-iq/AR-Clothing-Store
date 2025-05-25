import React, { useState, useEffect } from 'react';
import { FiTrash2, FiSearch, FiRefreshCw } from 'react-icons/fi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const loadUsers = () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      setUsers(storedUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error loading users:', error);
      setNotification({
        show: true,
        message: 'Failed to load users. Please try again.',
        type: 'error'
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setNotification({
          show: true,
          message: 'User deleted successfully',
          type: 'success'
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        setNotification({
          show: true,
          message: 'Failed to delete user. Please try again.',
          type: 'error'
        });
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    setLoading(true);
    loadUsers();
    setNotification({
      show: true,
      message: 'User list refreshed',
      type: 'success'
    });
  };

  return (
    <div className="p-6 bg-primary-900 text-surface-light rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 py-2 px-4 bg-interactive-hover text-primary-900 rounded-lg hover:bg-accent-light transition-colors"
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>
      
      {notification.show && (
        <div className={`p-3 mb-4 rounded-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {notification.message}
        </div>
      )}

      <div className="mb-6 relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="w-full pl-10 pr-4 py-3 bg-primary-800 text-surface-light rounded-lg border border-primary-700 focus:outline-none focus:border-interactive-hover"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-interactive-hover"></div>
        </div>
      ) : (
        <div className="bg-primary-800 shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-primary-700">
            <thead className="bg-primary-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registered On</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                    {searchTerm ? 'No users matching your search' : 'No users registered yet'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-primary-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-light">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(user.registeredOn).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-400 hover:text-red-300 focus:outline-none"
                      >
                        <FiTrash2 className="inline-block mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-400">
        Total Users: {filteredUsers.length}
      </div>
    </div>
  );
};

export default UserManagement;