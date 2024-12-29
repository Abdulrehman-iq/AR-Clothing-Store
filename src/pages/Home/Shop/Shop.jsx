// components/Shop/Shop.jsx
import React, { useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { useCart } from '../../../context/CartContext';
import Navbar from '../../../components/Navbar/Navbar';
import AddToCart from '../../../components/Buttons/AddToCart';
import TryOnButton from '../../../components/Buttons/TryonButton';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['All', 'T-Shirts', 'Shirts', 'Hoodies'];
  
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "Rs 499",
      category: "Shirts",
      image: "/assets/C1.png",
      description: "Essential cotton blend formal shirt"
    },
    {
      id: 2,
      name: "Denim Casual Shirt",
      price: "Rs 1,999",
      category: "Shirts",
      image: "/assets/C2.png",
      description: "Comfortable casual denim shirt"
    },
    {
      id: 3,
      name: "Printed Summer Shirt",
      price: "Rs 1,799",
      category: "Shirts",
      image: "/assets/C3.png",
      description: "Trendy printed summer collection"
    },
    {
      id: 4,
      name: "Plain Winter Jersey",
      price: "Rs 799",
      category: "Hoodies",
      image: "/assets/C4.png",
      description: "Warm winter collection jersey"
    },
    {
      id: 5,
      name: "Classic Jersey",
      price: "Rs 1,799",
      category: "Hoodies",
      image: "/assets/C5.png",
      description: "Premium cotton blend jersey"
    },
    {
      id: 6,
      name: "Casual Jersey",
      price: "Rs 1,799",
      category: "Hoodies",
      image: "/assets/C6.png",
      description: "Comfortable casual wear jersey"
    }
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-300
                           hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">{product.name}</h3>
                <p className="text-content-light mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-900">{product.price}</span>
                  <div className="flex space-x-2">
                    <AddToCart product={product} />
                    <TryOnButton />
                  </div>
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