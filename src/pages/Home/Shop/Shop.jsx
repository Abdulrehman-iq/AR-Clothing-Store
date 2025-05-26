import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import AddToCart from '../../../components/Buttons/AddToCart';
import TryOnButton from '../../../components/Buttons/TryonButton';
import SearchBar from '../../../components/SearchBar/SearchBar';
import Filter from '../../../components/Filter/Filter';
import { shirts } from '../../../components/Constants/Shirts';

const Shop = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    colors: [],
  });

  const categories = ['All', 'T-Shirts', 'Shirts', 'Hoodies'];
  
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };
  
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking buttons
  };

  // Filtered products based on category, price, and color
  const filteredProducts = shirts.filter((product) => {
    const isCategoryMatch = selectedCategory === 'all' || 
      (selectedCategory === 'shirts' && (product.id.startsWith('C1') || product.id.startsWith('C2') || product.id.startsWith('C3'))) ||
      (selectedCategory === 'hoodies' && (product.id.startsWith('C4') || product.id.startsWith('C5') || product.id.startsWith('C6')));
    
    const isPriceMatch =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
      
    // You may need to add a color property to your shirts data
    const isColorMatch =
      filters.colors.length === 0 || 
      (product.color && filters.colors.includes(product.color));

    return isCategoryMatch && isPriceMatch && isColorMatch;
  });

  return (
    <div className="min-h-screen bg-surface-default">
      <Navbar />

      {/* Header */}
      <div className="bg-primary-900 py-12 mt-28">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-surface-light mb-4">Our Collection</h1>
          <p className="text-content-light">Discover our curated selection of premium clothing</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative">
          <div className="flex items-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-interactive-hover text-primary-900'
                    : 'bg-primary-800 text-surface-light hover:bg-primary-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative z-10">
            <Filter onFilterChange={(newFilters) => setFilters(newFilters)} />
          </div>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-surface-light hover:text-interactive-hover transition-colors duration-300 
                       bg-primary-800 rounded-full hover:bg-primary-700 ml-auto"
          >
            <FiSearch className="h-5 w-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-surface-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">{product.name}</h3>
                <p className="text-content-light mb-4">{product.description}</p>
                <div className="flex justify-between items-center" onClick={handleButtonClick}>
                  <span className="text-lg font-bold text-primary-900">Rs {product.price.toLocaleString()}</span>
                  <div className="flex space-x-2">
                    <AddToCart product={product} preventNavigation={true} />
                    <TryOnButton shirtImage={product.image} shirtName={product.name} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <Footer />
    </div>
  );
};

export default Shop;