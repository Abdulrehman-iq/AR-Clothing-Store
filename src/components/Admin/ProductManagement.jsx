// components/Admin/ProductManagement.jsx
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Classic White Shirt', price: '₹499', description: 'Essential cotton blend formal shirt', image: '' },
    { id: 2, name: 'Denim Casual Shirt', price: '₹1,999', description: 'Comfortable casual denim shirt', image: '' },
  ]);

  const [form, setForm] = useState({ id: '', name: '', price: '', description: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts((prev) => prev.map((product) => (product.id === form.id ? form : product)));
      setIsEditing(false);
    } else {
      setProducts((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setForm({ id: '', name: '', price: '', description: '', image: '' });
  };

  const handleEditProduct = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <h3 className="text-2xl font-semibold mb-6">Product Management</h3>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4">Product List</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold uppercase">ID</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Name</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Price</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Description</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Image</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b last:border-none hover:bg-blue-50 transition-colors"
                >
                  <td className="py-2 px-4 text-sm">{product.id}</td>
                  <td className="py-2 px-4 text-md font-medium text-primary-900">{product.name}</td>
                  <td className="py-2 px-4 text-sm">{product.price}</td>
                  <td className="py-2 px-4 text-sm">{product.description}</td>
                  <td className="py-2 px-4 text-sm">
                    {product.image && <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />}
                  </td>
                  <td className="py-2 px-4 text-sm">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete Product"
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
    </div>
  );
};

export default ProductManagement;