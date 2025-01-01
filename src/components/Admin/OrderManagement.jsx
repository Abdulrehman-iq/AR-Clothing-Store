// components/Admin/OrderManagement.jsx
import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, user: 'Abdul Rehman', total: 1999, status: 'pending' },
    { id: 2, user: 'Ubaid', total: 2499, status: 'processing' },
    { id: 3, user: 'Junaid', total: 749, status: 'shipped' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-2xl font-semibold mb-4">Order Management</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-sm font-semibold uppercase">Order ID</th>
              <th className="py-3 px-4 text-sm font-semibold uppercase">Customer</th>
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
                <td className="py-2 px-4 text-sm text-black">Rs {order.total}</td>
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
                    className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => alert(`Order #${order.id} updated to ${order.status}`)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
 