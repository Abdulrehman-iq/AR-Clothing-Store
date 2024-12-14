import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-navy-900 shadow-lg backdrop-blur-sm'
        : 'bg-navy-900/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28"> {/* Increased height */}
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                className="h-20 w-auto transition-transform duration-300 hover:scale-105" /* Increased logo size */
                src="/src/assets/Fyplogo.jpg" 
                alt="Store Logo" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12"> {/* Increased spacing */}
            <Link to="/" className="text-gray-300 hover:text-accent-orange transition-colors duration-300 font-medium text-xl"> {/* Increased text size */}
              Home
            </Link>
            <Link to="/shop" className="text-gray-300 hover:text-accent-orange transition-colors duration-300 font-medium text-xl">
              Shop
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-accent-orange transition-colors duration-300 font-medium text-xl">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-accent-orange transition-colors duration-300 font-medium text-xl">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-8">
            <FiSearch className="h-7 w-7 text-gray-300 hover:text-accent-orange transition-colors duration-300 cursor-pointer" />
            <Link to="/cart">
              <FiShoppingCart className="h-7 w-7 text-gray-300 hover:text-accent-orange transition-colors duration-300" />
            </Link>
            <Link to="/profileA">
              <FiUser className="h-7 w-7 text-gray-300 hover:text-accent-orange transition-colors duration-300" />
            </Link>
            <button 
              className="md:hidden text-gray-300 hover:text-accent-orange"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <FiX className="h-8 w-8" /> : 
                <FiMenu className="h-8 w-8" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
            <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-accent-orange hover:bg-navy-800 rounded-md transition-all duration-300">
              Home
            </Link>
            <Link to="/shop" className="block px-3 py-2 text-gray-300 hover:text-accent-orange hover:bg-navy-800 rounded-md transition-all duration-300">
              Shop
            </Link>
            <Link to="/about" className="block px-3 py-2 text-gray-300 hover:text-accent-orange hover:bg-navy-800 rounded-md transition-all duration-300">
              About Us
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-300 hover:text-accent-orange hover:bg-navy-800 rounded-md transition-all duration-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;