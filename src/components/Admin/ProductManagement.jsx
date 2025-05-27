// components/Admin/ProductManagement.jsx
import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiRefreshCw } from 'react-icons/fi';
import { shirts as initialShirts } from '../Constants/Shirts';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: 0,
    description: '',
    longDescription: '',
    image: '',
    details: {
      material: '',
      fit: '',
      care: ''
    },
    reviews: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Load products from localStorage or use initial data
  useEffect(() => {
    const savedProducts = localStorage.getItem('shirts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialShirts);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('shirts', JSON.stringify(products));
    }
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      // Handle nested fields like details.material
      const [parent, child] = name.split('.');
      setForm({
        ...form,
        [parent]: {
          ...form[parent],
          [child]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL for display
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, image: imageUrl });
    }
  };

  const generateUniqueId = () => {
    return 'C' + (products.length + 1);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Create a new product object
    const newProduct = {
      ...form,
      price: parseFloat(form.price), // Ensure price is a number
      id: isEditing ? form.id : generateUniqueId()
    };

    if (isEditing) {
      setProducts((prev) => prev.map((product) => (product.id === form.id ? newProduct : product)));
      setIsEditing(false);
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }

    // Reset form
    setForm({
      id: '',
      name: '',
      price: 0,
      description: '',
      longDescription: '',
      image: '',
      details: {
        material: '',
        fit: '',
        care: ''
      },
      reviews: []
    });
    setImageFile(null);
  };

  const handleEditProduct = (product) => {
    setForm(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleReset = () => {
    setProducts(initialShirts);
    localStorage.setItem('shirts', JSON.stringify(initialShirts));
    alert('Product data has been reset to default');
  };

  // New function to reset product positions
  const handleResetPositions = () => {
    // Sort products by ID (assuming IDs like C1, C2, C3)
    const sortedProducts = [...products].sort((a, b) => {
      // Extract numeric parts from IDs for proper numeric sorting
      const numA = parseInt(a.id.replace('C', ''));
      const numB = parseInt(b.id.replace('C', ''));
      return numA - numB;
    });
    
    setProducts(sortedProducts);
    localStorage.setItem('shirts', JSON.stringify(sortedProducts));
    alert('Products have been reordered to their default positions');
  };

  return (
    <div className="bg-primary-800 p-6 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-surface-light">Product Management</h3>
        <div className="flex gap-3">
          <button 
            onClick={handleResetPositions}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            <FiRefreshCw size={16} />
            Reset Positions
          </button>
          
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Reset to Default
          </button>
        </div>
      </div>

      <form onSubmit={handleAddProduct} className="space-y-4 bg-primary-700 p-6 rounded-lg">
        <h4 className="text-xl font-medium text-surface-light mb-4">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-light mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-primary-600 text-surface-light border-primary-500 focus:outline-none focus:ring-2 focus:ring-interactive-hover"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-surface-light mb-2">Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-primary-600 text-surface-light border-primary-500 focus:outline-none focus:ring-2 focus:ring-interactive-hover"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-light mb-2">Short Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg bg-primary-600 text-surface-light border-primary-500 focus:outline-none focus:ring-2 focus:ring-interactive-hover"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-light mb-2">Long Description</label>
          <textarea
            name="longDescription"
            value={form.longDescription}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border rounded-lg bg-primary-600 text-surface-light border-primary-500 focus:outline-none focus:ring-2 focus:ring-interactive-hover"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-light mb-2">Material</label>
            <input
              type="text"
              name="details.material"
              value={form.details.material}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-primary-600 text-surface-light border-primary-500 focus:outline-none focus:ring-2 focus:ring-interactive-hover"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-surface-light mb-2">Fit</label>
            <input
              type="text"
              name="details.fit"
              value={form.details.fit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-primary-600 text-surface-light border-primary-500 focus:outline-none focus:ring-2 focus:ring-interactive-hover"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-surface-light mb-2">Care</label>
            <input
              type="text"
              name="details.care"
              value={form.details.care}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg bg-primary-600 text-surface-light border-primary-500 focus:outline-none focus:ring-2 focus:ring-interactive-hover"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-light mb-2">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg bg-primary-600 text-surface-light border-primary-500 focus:outline-none focus:ring-2 focus:ring-interactive-hover"
            required={!isEditing}
          />
          {form.image && (
            <div className="mt-2">
              <p className="text-sm text-surface-light mb-1">Preview:</p>
              <img 
                src={form.image} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-interactive-hover text-white rounded-lg hover:bg-accent-light transition"
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
          
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  id: '',
                  name: '',
                  price: 0,
                  description: '',
                  longDescription: '',
                  image: '',
                  details: { material: '', fit: '', care: '' },
                  reviews: []
                });
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4 text-surface-light">Product List ({products.length})</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-primary-700 text-surface-light">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold">ID</th>
                <th className="py-3 px-4 text-sm font-semibold">Image</th>
                <th className="py-3 px-4 text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-sm font-semibold">Price</th>
                <th className="py-3 px-4 text-sm font-semibold">Description</th>
                <th className="py-3 px-4 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-primary-600">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-primary-700 last:border-none hover:bg-primary-700 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-surface-light">{product.id}</td>
                  <td className="py-3 px-4 text-sm">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 text-md font-medium text-surface-light">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-surface-light">Rs {product.price?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-surface-light">
                    {product.description?.length > 50 
                      ? product.description.substring(0, 50) + '...' 
                      : product.description}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-yellow-400 hover:text-yellow-300 transition"
                        title="Edit Product"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-500 hover:text-red-400 transition"
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