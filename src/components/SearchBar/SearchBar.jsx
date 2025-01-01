// components/SearchBar/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const inputRef = useRef(null);

  const allProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "Rs 499",
      image: "/assets/C1.png",
      description: "Essential cotton blend formal shirt"
    },
    {
      id: 2,
      name: "Denim Casual Shirt",
      price: "Rs 1,999",
      image: "/assets/C2.png",
      description: "Comfortable casual denim shirt"
    },
    {
      id: 3,
      name: "Printed Summer Shirt",
      price: "Rs 1,799",
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

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-900/95 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 w-full z-50 pt-28 px-4"
          >
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-content-light" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-12 py-4 bg-primary-800 text-surface-light rounded-lg
                           border border-primary-700 focus:outline-none focus:border-interactive-hover
                           placeholder-content-light"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-content-light
                           hover:text-surface-light transition-colors"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-lg">
                {filteredProducts.length > 0 ? (
                  <div className="bg-primary-800 rounded-lg divide-y divide-primary-700">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 hover:bg-primary-700/50 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-surface-light font-medium">{product.name}</h3>
                          <p className="text-content-light text-sm">{product.description}</p>
                          <p className="text-interactive-hover font-medium mt-1">{product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery && (
                  <div className="bg-primary-800 rounded-lg p-8 text-center">
                    <p className="text-content-light">No products found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;