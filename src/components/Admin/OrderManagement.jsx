// components/Admin/OrderManagement.jsx
import React, { useState, useEffect } from 'react';
import { FiTrash, FiAlertTriangle } from 'react-icons/fi';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

  // Load orders from localStorage when component mounts
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    // Also update in localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Handle delete confirmation for a single order
  const confirmDelete = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  // Handle actual deletion of a single order
  const handleDeleteOrder = () => {
    if (!orderToDelete) return;
    
    const updatedOrders = orders.filter(order => order.id !== orderToDelete);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Close confirmation dialog
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  // Handle deletion of all orders
  const handleDeleteAllOrders = () => {
    setOrders([]);
    localStorage.setItem('orders', JSON.stringify([]));
    setShowDeleteAllConfirm(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Order Management</h3>
        {orders.length > 0 && (
          <button
            onClick={() => setShowDeleteAllConfirm(true)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded flex items-center"
          >
            <FiTrash className="mr-2" />
            Delete All Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Order ID</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Customer</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Date</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Total</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Status</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-none hover:bg-blue-50 transition-colors"
                >
                  <td className="py-2 px-4 text-sm text-black">{order.id}</td>
                  <td className="py-2 px-4 text-sm text-black">{order.user}</td>
                  <td className="py-2 px-4 text-sm text-black">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-sm text-black">Rs {order.total.toLocaleString()}</td>
                  <td className="py-2 px-4 text-sm text-black capitalize">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 text-sm text-black">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded mr-2"
                      onClick={() => alert(`Order #${order.id} updated to ${order.status}`)}
                    >
                      Update
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded mr-2"
                      onClick={() => {
                        const orderDetails = JSON.stringify(order, null, 2);
                        alert(`Order Details:\n${orderDetails}`);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                      onClick={() => confirmDelete(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Order Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center text-red-500 mb-4">
              <FiAlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">Confirm Delete</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this order? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setOrderToDelete(null);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Orders Confirmation Modal */}
      {showDeleteAllConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center text-red-500 mb-4">
              <FiAlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">Delete All Orders</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete ALL orders? This action cannot be undone and will remove {orders.length} orders.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteAllConfirm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllOrders}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;