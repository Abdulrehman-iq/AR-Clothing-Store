// components/SearchBar/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { shirts } from '../Constants/Shirts'; // Import shirts data

const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const inputRef = useRef(null);

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
      const filtered = shirts.filter(product =>
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
                  placeholder="Search shirts..."
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
                          src={product.image} // This expects a URL, but Shirts.jsx has imported React components
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-surface-light font-medium">{product.name}</h3>
                          <p className="text-content-light text-sm">{product.description}</p>
                          {/* Add a placeholder price since it's not in the shirts data */}
                          <p className="text-interactive-hover font-medium mt-1">Rs 1,499</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery && (
                  <div className="bg-primary-800 rounded-lg p-8 text-center">
                    <p className="text-content-light">No shirts found matching "{searchQuery}"</p>
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