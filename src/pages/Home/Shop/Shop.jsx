// components/Shop/Shop.jsx
import React, { useState } from 'react';
import { FiFilter, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../../context/CartContext';
import Navbar from '../../../components/Navbar/Navbar';

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['All', 'T-Shirts', 'Shirts', 'Hoodies'];
  
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "Rs 1,499",
      category: "Shirts",
      image: "/src/assets/C1.png",
      description: "Essential cotton blend formal shirt"
    },
    {
      id: 2,
      name: "Plain Winter Jersey",
      price: "Rs 1,799",
      category: "Hoodies",
      image: "/src/assets/C2.png",
      description: "Warm and comfortable winter jersey"
    },
    // Add more products...
  ];

  return (
    <div className="pt-28 min-h-screen bg-surface-default">
      <Navbar />
      {/* Header */}
      <div className="bg-primary-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-surface-light mb-4">Our Collection</h1>
          <p className="text-content-light">Discover our curated selection of premium clothing</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-full transition-colors duration-300
                  ${selectedCategory === category.toLowerCase()
                    ? 'bg-interactive-hover text-primary-900'
                    : 'bg-primary-800 text-surface-light hover:bg-primary-700'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-content-light" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-full bg-primary-800 text-surface-light
                       border border-primary-700 focus:outline-none focus:border-interactive-hover"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300
                           hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary-900">{product.name}</h3>
                <p className="text-content-light text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-900">{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center space-x-2 px-4 py-2 bg-interactive-hover
                             text-primary-900 rounded-full hover:bg-accent-light
                             transition-colors duration-300"
                  >
                    <FiShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className="w-10 h-10 rounded-full flex items-center justify-center
                         transition-colors duration-300
                         hover:bg-interactive-hover hover:text-primary-900
                         bg-primary-800 text-surface-light"
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;