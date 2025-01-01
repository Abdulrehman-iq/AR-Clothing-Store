import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Abdulrehman', email: 'AR@example.com', status: 'active', role: 'user' },
    { id: 2, name: 'Ubaid', email: 'Ubaid@example.com', status: 'active', role: 'user' },
    { id: 3, name: 'Junaid', email: 'Junaid@example.com', status: 'disabled', role: 'user' },
  ]);

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'active' ? 'disabled' : 'active' }
          : user
      )
    );
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div
      className="bg-white p-4 rounded shadow mt-4 transform transition-all duration-500 ease-in-out
                 animate-[fadeIn_0.5s_ease-in-out_forwards]"
    >
      <h3 className="text-2xl font-semibold mb-4">User Management</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="py-3 px-4 text-sm font-semibold uppercase">ID</th>
              <th className="py-3 px-4 text-sm font-semibold uppercase">Name</th>
              <th className="py-3 px-4 text-sm font-semibold uppercase">Email</th>
              <th className="py-3 px-4 text-sm font-semibold uppercase">Status</th>
              <th className="py-3 px-4 text-sm font-semibold uppercase">Role</th>
              <th className="py-3 px-4 text-sm font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b last:border-none hover:bg-purple-100 transition-colors"
              >
                <td className="py-2 px-4 text-sm text-black">{user.id}</td>
                <td className="py-2 px-4 text-md font-medium text-primary-900">{user.name}</td>
                <td className="py-2 px-4 text-sm text-black">{user.email}</td>
                <td className="py-2 px-4 text-sm text-black capitalize">{user.status}</td>
                <td className="py-2 px-4 text-sm text-black capitalize">{user.role}</td>
                <td className="py-2 px-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete User"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
